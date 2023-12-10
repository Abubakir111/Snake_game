const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const ground = new Image()
ground.src = './img/game_ground.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'
const snake_game = new Image()
snake_game.src = './img/snake_game.png'

let box = 32
let score = 0
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
}
let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box,
}
let dir
direction = (e) => {
  if (e.key == 'ArrowLeft' && dir != 'right') dir = 'left'
  else if (e.key == 'ArrowRight' && dir != 'left') dir = 'right'
  else if (e.key == 'ArrowUp' && dir != 'down') dir = 'up'
  else if (e.key == 'ArrowDown' && dir != 'up') dir = 'down'
}
document.addEventListener('keydown', direction)
etTill = (head, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game)
    }
  }
}
drawGame = () => {
  ctx.drawImage(ground, 0, 0)
  ctx.drawImage(foodImg, food.x, food.y)
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'green'
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }
  ctx.fillStyle = 'white'
  ctx.font = '50px Arial'
  ctx.fillText(score, box * 2.5, box * 1.7)
  let snakeX = snake[0].x
  let snakeY = snake[0].y
  if (snakeY == food.y && snakeX == food.x) {
    score++
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    }
  } else {
    snake.pop()
  }
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * 3 ||
    snakeY > box * 17
  ) {
    clearInterval(game)
  }
  if (dir == 'left') snakeX -= box
  if (dir == 'right') snakeX += box
  if (dir == 'up') snakeY -= box
  if (dir == 'down') snakeY += box
  let newHead = {
    x: snakeX,
    y: snakeY,
  }
  etTill(newHead, snake)
  snake.unshift(newHead)
}
let game = setInterval(drawGame, 150)

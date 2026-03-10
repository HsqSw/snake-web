const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_TICK = 150;
const MIN_TICK = 60;
const SPEED_STEP = 5;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let snake;
let direction;
let queuedDirection;
let food;
let score;
let tickMs;
let timer;
let started;
let gameOver;

function reset() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  queuedDirection = direction;
  score = 0;
  tickMs = INITIAL_TICK;
  started = false;
  gameOver = false;
  placeFood();
  updateHud();
  statusEl.textContent = 'Press any direction key to start.';
  stopLoop();
  draw();
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
}

function updateHud() {
  scoreEl.textContent = score;
  speedEl.textContent = tickMs;
}

function startLoop() {
  if (timer) clearInterval(timer);
  timer = setInterval(step, tickMs);
}

function stopLoop() {
  if (timer) clearInterval(timer);
  timer = null;
}

function step() {
  if (gameOver) return;

  direction = queuedDirection;
  const head = snake[0];
  const next = { x: head.x + direction.x, y: head.y + direction.y };

  if (
    next.x < 0 ||
    next.x >= GRID_SIZE ||
    next.y < 0 ||
    next.y >= GRID_SIZE ||
    snake.some((part) => part.x === next.x && part.y === next.y)
  ) {
    gameOver = true;
    statusEl.textContent = 'Game Over. Press Restart or R.';
    draw();
    stopLoop();
    return;
  }

  snake.unshift(next);

  if (next.x === food.x && next.y === food.y) {
    score += 1;
    tickMs = Math.max(MIN_TICK, tickMs - SPEED_STEP);
    updateHud();
    placeFood();
    startLoop();
  } else {
    snake.pop();
  }

  draw();
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
}

function draw() {
  ctx.fillStyle = '#111934';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.forEach((part, i) => drawCell(part.x, part.y, i === 0 ? '#8bffb0' : '#4fd878'));
  drawCell(food.x, food.y, '#ff5f8f');
}

function setDirection(nextX, nextY) {
  // Apply on next tick; block direct 180 turns
  if (direction.x === -nextX && direction.y === -nextY) return;
  queuedDirection = { x: nextX, y: nextY };

  if (!started && !gameOver) {
    started = true;
    statusEl.textContent = 'Playing...';
    startLoop();
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') setDirection(0, -1);
  if (key === 'arrowdown' || key === 's') setDirection(0, 1);
  if (key === 'arrowleft' || key === 'a') setDirection(-1, 0);
  if (key === 'arrowright' || key === 'd') setDirection(1, 0);
  if (key === 'r') reset();
});

restartBtn.addEventListener('click', reset);

reset();

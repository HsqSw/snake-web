import { CELL_SIZE } from '../config.js';

export function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
}

export function drawGame(ctx, canvas, snake, food) {
  ctx.fillStyle = '#111934';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.forEach((part, i) => drawCell(ctx, part.x, part.y, i === 0 ? '#8bffb0' : '#4fd878'));
  drawCell(ctx, food.x, food.y, '#ff5f8f');
}

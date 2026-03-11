import { GRID_SIZE } from '../config.js';
import { computeCurrentTickMs } from './tick.js';
import { placeFoodAvoidingSnake } from './food.js';

export function isIllegalReverse(direction, next) {
  return direction.x === -next.x && direction.y === -next.y;
}

export function setQueuedDirection(state, next) {
  // Apply on next tick; block direct 180 turns.
  if (isIllegalReverse(state.direction, next)) return;
  state.queuedDirection = next;
}

export function computeNextHead(state) {
  const head = state.snake[0];
  const dir = state.queuedDirection;
  return { x: head.x + dir.x, y: head.y + dir.y };
}

export function isCollision(state, next) {
  return (
    next.x < 0 ||
    next.x >= GRID_SIZE ||
    next.y < 0 ||
    next.y >= GRID_SIZE ||
    state.snake.some((part) => part.x === next.x && part.y === next.y)
  );
}

export function step(state) {
  if (state.gameOver) return { type: 'noop' };

  state.direction = state.queuedDirection;

  const next = computeNextHead(state);

  if (isCollision(state, next)) {
    state.gameOver = true;
    return { type: 'game_over' };
  }

  state.snake.unshift(next);

  const ateFood = next.x === state.food.x && next.y === state.food.y;
  if (ateFood) {
    state.score += 1;
    state.foodEatenCount += 1;
    state.tickMs = computeCurrentTickMs(state.baseTickMs, state.foodEatenCount);
    state.food = placeFoodAvoidingSnake(state.snake);
    return { type: 'ate_food' };
  }

  state.snake.pop();
  return { type: 'moved' };
}

export function resetTickFromBase(state) {
  state.tickMs = computeCurrentTickMs(state.baseTickMs, state.foodEatenCount);
}

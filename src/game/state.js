import { INITIAL_TICK_MS } from '../config.js';
import { computeCurrentTickMs } from './tick.js';
import { placeFoodAvoidingSnake } from './food.js';

export function createInitialSnake() {
  return [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
}

export function createInitialState() {
  const snake = createInitialSnake();
  const baseTickMs = INITIAL_TICK_MS;
  const foodEatenCount = 0;

  return {
    snake,
    direction: { x: 1, y: 0 },
    queuedDirection: { x: 1, y: 0 },
    food: placeFoodAvoidingSnake(snake),
    score: 0,
    foodEatenCount,
    baseTickMs,
    tickMs: computeCurrentTickMs(baseTickMs, foodEatenCount),
    started: false,
    gameOver: false,
    gameOverRecorded: false,
  };
}

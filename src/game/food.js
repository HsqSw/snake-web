import { GRID_SIZE } from '../config.js';
import { randInt } from '../utils/random.js';

export function placeFoodAvoidingSnake(snake) {
  let food;
  do {
    food = { x: randInt(GRID_SIZE), y: randInt(GRID_SIZE) };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
  return food;
}

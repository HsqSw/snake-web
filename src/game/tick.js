import { MIN_TICK_MS, SPEED_STEP_MS } from '../config.js';

export function computeCurrentTickMs(baseTickMs, foodEatenCount) {
  return Math.max(MIN_TICK_MS, baseTickMs - foodEatenCount * SPEED_STEP_MS);
}

import { createInitialState } from './game/state.js';
import { step, setQueuedDirection, resetTickFromBase } from './game/engine.js';
import { computeCurrentTickMs } from './game/tick.js';
import { createIntervalLoop } from './loop/intervalLoop.js';
import { getDom } from './ui/dom.js';
import { drawGame } from './ui/render.js';
import { syncSpeedSlider, updateHud } from './ui/hud.js';
import {
  createLeaderboardStore,
  loadLeaderboard,
  renderLeaderboard,
  upsertScore,
} from './ui/leaderboard.js';
import { hideGameOverPanel, showGameOverPanel, copyShareText } from './ui/gameOverPanel.js';

const dom = getDom();
const ctx = dom.canvas.getContext('2d');

const loop = createIntervalLoop();
const leaderboardStore = createLeaderboardStore();

let state = createInitialState();
let shareText = '';

function render() {
  drawGame(ctx, dom.canvas, state.snake, state.food);
}

function setStatus(text) {
  dom.statusEl.textContent = text;
}

function applyTickMs(nextTickMs) {
  const tickChanged = state.tickMs !== nextTickMs;
  state.tickMs = nextTickMs;

  // Always update HUD even if tick is clamped; base speed must reflect slider changes.
  updateHud(dom, state);

  if (tickChanged && state.started && !state.gameOver) {
    loop.start(onTick, state.tickMs);
  }
}

function resetGame() {
  state = createInitialState();
  shareText = '';

  // UI defaults (no persistence).
  syncSpeedSlider(dom, state);

  hideGameOverPanel(dom);

  updateHud(dom, state);
  setStatus('Press any direction key to start.');

  loop.stop();
  render();
}

function onTick() {
  const result = step(state);

  if (result.type === 'game_over') {
    state.gameOver = true;
    setStatus('Game Over. Press Restart or R.');

    // Record the run exactly once per game.
    if (!state.gameOverRecorded) {
      state.gameOverRecorded = true;
      upsertScore(leaderboardStore, state.score);
      renderLeaderboard(dom, leaderboardStore);
    }

    shareText = showGameOverPanel(dom, state.score);

    render();
    loop.stop();
    return;
  }

  if (result.type === 'ate_food') {
    applyTickMs(state.tickMs);
  }

  render();
}

function startIfNeeded() {
  if (!state.started && !state.gameOver) {
    state.started = true;
    setStatus('Playing...');
    hideGameOverPanel(dom);
    loop.start(onTick, state.tickMs);
  }
}

function handleDirection(nextX, nextY) {
  setQueuedDirection(state, { x: nextX, y: nextY });
  startIfNeeded();
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') handleDirection(0, -1);
  if (key === 'arrowdown' || key === 's') handleDirection(0, 1);
  if (key === 'arrowleft' || key === 'a') handleDirection(-1, 0);
  if (key === 'arrowright' || key === 'd') handleDirection(1, 0);
  if (key === 'r') resetGame();
});

dom.speedSlider.addEventListener('input', () => {
  state.baseTickMs = Number(dom.speedSlider.value);
  dom.speedSliderValueEl.textContent = String(state.baseTickMs);

  // tick recalculation depends on eaten count.
  const next = computeCurrentTickMs(state.baseTickMs, state.foodEatenCount);
  applyTickMs(next);
});

dom.copyBtn?.addEventListener('click', () => {
  copyShareText(dom, shareText);
});

dom.restartBtn.addEventListener('click', resetGame);

// Leaderboard and initial render
loadLeaderboard(leaderboardStore);
renderLeaderboard(dom, leaderboardStore);
resetGame();

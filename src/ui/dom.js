export function getDom() {
  return {
    canvas: document.getElementById('game'),
    scoreEl: document.getElementById('score'),
    speedEl: document.getElementById('speed'),
    baseSpeedEl: document.getElementById('baseSpeed'),
    speedSlider: document.getElementById('speedSlider'),
    speedSliderValueEl: document.getElementById('speedSliderValue'),
    statusEl: document.getElementById('status'),
    restartBtn: document.getElementById('restartBtn'),

    leaderboardListEl: document.getElementById('leaderboardList'),
    leaderboardHintEl: document.getElementById('leaderboardHint'),

    gameOverPanelEl: document.getElementById('gameOverPanel'),
    shareTextEl: document.getElementById('shareText'),
    copyBtn: document.getElementById('copyBtn'),
    copyStatusEl: document.getElementById('copyStatus'),
    copyFallbackEl: document.getElementById('copyFallback'),
  };
}

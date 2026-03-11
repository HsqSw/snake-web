export function updateHud(dom, state) {
  dom.scoreEl.textContent = state.score;
  dom.speedEl.textContent = state.tickMs;
  dom.baseSpeedEl.textContent = state.baseTickMs;
}

export function syncSpeedSlider(dom, state) {
  dom.speedSlider.value = String(state.baseTickMs);
  dom.speedSliderValueEl.textContent = String(state.baseTickMs);
}

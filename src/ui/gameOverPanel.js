import { PROJECT_HOME_URL } from '../config.js';

export function buildShareText(score) {
  return `I scored ${score} in Snake Web!\n${PROJECT_HOME_URL}`;
}

export function hideGameOverPanel(dom) {
  if (!dom.gameOverPanelEl) return;
  dom.gameOverPanelEl.hidden = true;

  if (dom.copyStatusEl) dom.copyStatusEl.textContent = '';
  if (dom.copyFallbackEl) {
    dom.copyFallbackEl.hidden = true;
    dom.copyFallbackEl.value = '';
  }
}

export function showGameOverPanel(dom, score) {
  if (!dom.gameOverPanelEl) return '';
  const text = buildShareText(score);
  dom.shareTextEl.textContent = text;
  dom.gameOverPanelEl.hidden = false;
  return text;
}

export async function copyShareText(dom, shareText) {
  const text = shareText || dom.shareTextEl?.textContent || '';

  if (dom.copyStatusEl) dom.copyStatusEl.textContent = '';
  if (dom.copyFallbackEl) {
    dom.copyFallbackEl.hidden = true;
    dom.copyFallbackEl.value = '';
  }

  try {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
      throw new Error('Clipboard API unavailable');
    }
    await navigator.clipboard.writeText(text);
    if (dom.copyStatusEl) dom.copyStatusEl.textContent = 'Copied to clipboard.';
  } catch (e) {
    if (dom.copyFallbackEl) {
      dom.copyFallbackEl.hidden = false;
      dom.copyFallbackEl.value = text;
      dom.copyFallbackEl.focus();
      dom.copyFallbackEl.select();
    }
    if (dom.copyStatusEl) dom.copyStatusEl.textContent = 'Copy failed. Please manually copy the text below.';
  }
}

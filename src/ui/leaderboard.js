import { LEADERBOARD_KEY } from '../config.js';

export function safeParseLeaderboard(value) {
  if (!value) return [];
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((item) => item && typeof item.score === 'number' && typeof item.at === 'string')
    .map((item) => ({ score: item.score, at: item.at }));
}

export function createLeaderboardStore() {
  return {
    available: true,
    cache: [],
  };
}

export function loadLeaderboard(store) {
  store.available = true;
  try {
    const testKey = '__snake_ls_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);

    store.cache = safeParseLeaderboard(localStorage.getItem(LEADERBOARD_KEY));
  } catch (e) {
    store.available = false;
    store.cache = [];
  }
}

export function saveLeaderboard(store, next) {
  store.cache = next;
  if (store.available) {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(next));
    } catch (e) {
      store.available = false;
    }
  }
}

export function upsertScore(store, scoreValue) {
  const record = { score: scoreValue, at: new Date().toISOString() };
  const next = [...store.cache, record]
    .sort((a, b) => (b.score - a.score) || (b.at.localeCompare(a.at)))
    .slice(0, 10);

  saveLeaderboard(store, next);
}

export function renderLeaderboard(dom, store) {
  if (!dom.leaderboardListEl) return;

  dom.leaderboardListEl.innerHTML = '';

  if (!store.available) {
    dom.leaderboardHintEl.textContent = 'Local storage unavailable; scores will not persist after refresh.';
  } else if (store.cache.length === 0) {
    dom.leaderboardHintEl.textContent = 'No records yet. Play a round!';
  } else {
    dom.leaderboardHintEl.textContent = '';
  }

  store.cache.forEach((entry) => {
    const li = document.createElement('li');

    const left = document.createElement('span');
    left.textContent = `${entry.score}`;

    const right = document.createElement('span');
    right.className = 'muted';

    const d = new Date(entry.at);
    const label = Number.isNaN(d.getTime()) ? entry.at : d.toISOString().slice(0, 16).replace('T', ' ');
    right.textContent = label;

    li.append(left, right);
    dom.leaderboardListEl.appendChild(li);
  });
}

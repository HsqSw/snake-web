# Snake Web (docs-only drill deliverable)

Minimal web Snake game using HTML + Canvas + JS.

## Files
- `index.html` (landing page)
- `game.html` (game page)
- `style.css`
- `game.js`

## Run
Open `index.html` directly in a browser.
- Click **Start Game** to enter `game.html`

## Rules (Plan v2 mapping)
- Grid: 20x20
- No wall wrap (hit wall = game over)
- Default base tick: 150ms (slider)
- Manual speed control: slider sets **base tick (ms)**, range 60–300ms, step 5ms
- Speed-up: each food eaten reduces tick by 5ms, floor 60ms
- Input applies on next tick
- Food never spawns on snake body

## Manual validation steps (QA)
### Speed slider (Issue #1)
1. Open `index.html`; game shows score, current speed (ms), and base speed (ms).
2. Before starting, drag the base speed slider; confirm displayed base speed changes and current speed matches it.
3. Press Arrow/WASD; snake starts moving.
4. While playing, drag the slider; confirm snake speed changes immediately (no restart needed).
5. Eat food; score increments and speed decreases by 5ms each time until minimum 60ms.
6. Refresh page; confirm slider resets back to 150ms (no persistence).
7. Hit wall or self; game shows Game Over panel.
8. Press `R` or Restart button; state resets (score 0, base 150ms, speed 150ms) and panel hides.

### Share score (Copy text) (Issue #5)
1. Play a round, then hit a wall/self to trigger Game Over.
2. Confirm Game Over panel shows a Share text block (score + project URL).
3. Click Copy.
   - If Clipboard API works: show "Copied to clipboard."
   - If Clipboard API fails/blocked: show a textarea with the share text selected + hint "Please manually copy".

### Local leaderboard Top10 (Issue #3)
1. Start a game, eat a few foods, then hit a wall to trigger Game Over.
2. Confirm the score is appended into **Local Top 10** list.
3. Refresh page; confirm the leaderboard still shows prior records (localStorage persistence).
4. Produce >10 records (11 game-overs); confirm list keeps **only 10 entries**.
5. Tie-breaker: when two records have the same score, confirm the **newer record is shown earlier** (at desc).

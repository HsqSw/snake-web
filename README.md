# Snake Web (docs-only drill deliverable)

Minimal web Snake game using HTML + Canvas + JS.

## Files
- `index.html`
- `style.css`
- `game.js`

## Run
Open `index.html` directly in a browser.

## Rules (Plan v2 mapping)
- Grid: 20x20
- No wall wrap (hit wall = game over)
- Default base tick: 150ms (slider)
- Manual speed control: slider sets **base tick (ms)**, range 60–300ms, step 5ms
- Speed-up: each food eaten reduces tick by 5ms, floor 60ms
- Input applies on next tick
- Food never spawns on snake body

## Manual validation steps (QA)
1. Open `index.html`; game shows score, current speed (ms), and base speed (ms).
2. Before starting, drag the base speed slider; confirm displayed base speed changes and current speed matches it.
3. Press Arrow/WASD; snake starts moving.
4. While playing, drag the slider; confirm snake speed changes immediately (no restart needed).
5. Eat food; score increments and speed decreases by 5ms each time until minimum 60ms.
6. Refresh page; confirm slider resets back to 150ms (no persistence).
7. Hit wall or self; game shows Game Over.
8. Press `R` or Restart button; state resets (score 0, base 150ms, speed 150ms).

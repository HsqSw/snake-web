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
- Initial tick: 150ms
- Speed-up: -5ms per food, floor 60ms
- Input applies on next tick
- Food never spawns on snake body

## Manual validation steps (QA)
1. Open `index.html`; game shows score and speed.
2. Press Arrow/WASD; snake starts moving.
3. Eat food; score increments and snake length increases.
4. Confirm speed value decreases until minimum 60ms.
5. Hit wall or self; game shows Game Over.
6. Press `R` or Restart button; state resets.

# Snake Web

A minimal Snake game built with **pure static** HTML/CSS/JavaScript + Canvas.

- `index.html`: landing page
- `game.html`: game page

## Local run (http server only)
This project uses native **ES modules** (`import/export`). Many browsers restrict ESM under `file://`.

We **only guarantee running via a local static HTTP server (http://)**.

Run one of these commands from the repo root:

### Option A: Python (recommended)
```bash
python -m http.server 5173
# or
python3 -m http.server 5173
```

### Option B: Node (no dependencies)
```bash
node -e "require('http').createServer((req,res)=>{const fs=require('fs');const path=require('path');const u=decodeURIComponent((req.url||'/').split('?')[0]);const p=u==='/'?'/index.html':u;const f=path.join(process.cwd(),p);fs.createReadStream(f).on('error',()=>{res.statusCode=404;res.end('Not found');}).pipe(res);}).listen(5173); console.log('http://127.0.0.1:5173')"
```

Then open (Chrome verified):
- http://127.0.0.1:5173/index.html

## Gameplay
- Move: Arrow keys / WASD
- Restart (in-game): `R` or the Restart button

## Rules
- Grid: 20x20
- No wall wrap (hit wall = game over)
- Default base tick: 150ms (slider)
- Manual speed control: slider sets **base tick (ms)**, range 60–300ms, step 5ms
- Auto speed-up: each food reduces tick by 5ms, floor 60ms
- Direction input applies on the **next tick**
- Food never spawns on the snake body

## Project structure
- `index.html` / `game.html`: entry pages (paths are invariant)
- `style.css`: styles
- `src/`: ESM source code
  - `src/main.js`: bootstrap + orchestration
  - `src/game/`: gameplay logic
  - `src/ui/`: DOM + rendering
  - `src/utils/`: tiny helpers
  - `src/loop/`: tick loop helper
- `docs/AGENT.md`: agent-readable architecture notes

## Regression verification checklist (QA)
- [ ] Open `index.html` (via http server) shows landing page; click "Start Game" enters `game.html`.
- [ ] Landing page is responsive at `360px` and desktop/tablet widths, with visible hover/focus states on interactive elements.
- [ ] Game page is responsive at `360px` and desktop/tablet widths, with visible hover/focus/active states on interactive elements.
- [ ] No horizontal scroll appears on either page at the narrow mobile viewport.
- [ ] Direction input is applied on **next tick**.
- [ ] Rapid consecutive inputs behave correctly (no illegal 180° reversal; queued input behavior unchanged).
- [ ] Eat food: score increments; snake length increases.
- [ ] Auto speed-up: tick interval decreases by **-5ms per food**, with floor **60ms**.
- [ ] Hit wall => Game Over.
- [ ] Hit self => Game Over.
- [ ] Restart button / press `R` resets: snake position/body, direction, score, food, and speed state back to initial values.

## Issue #11 QA evidence
- Landing page at `360px`: `qa/issue-11-landing-360.png`
- Landing page at `1024px`: `qa/issue-11-landing-1024.png`
- Game page at `360px`: `qa/issue-11-game-360.png`
- Game page at `1024px`: `qa/issue-11-game-1024.png`

To reproduce the layout checks:
1. Start a local server from the repo root with `python3 -m http.server 5173`.
2. Capture screenshots with a headless browser or open `http://127.0.0.1:5173/index.html` and `http://127.0.0.1:5173/game.html`.
3. For the no-horizontal-scroll check, open `http://127.0.0.1:5173/qa/check-scroll.html?page=index.html` and `http://127.0.0.1:5173/qa/check-scroll.html?page=game.html`.

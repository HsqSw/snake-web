# Snake Web — Agent Guide

This document is written for **coding agents / contributors**.

## Project constraints
- Pure static site: **HTML + CSS + JS only**.
- No bundler (Vite/Webpack), no TypeScript.
- Uses native **ESM** (`import/export`).
- Runtime guarantee: **http:// via a local static server** (not `file://`).

## Entry points
- `index.html` (repo root): landing page.
  - Links to `game.html` via `href="game.html"`.
- `game.html` (repo root): game page.
  - Loads the game via ESM:
    - `<script type="module" src="src/main.js"></script>`

**Invariant:** `index.html` and `game.html` must remain at repo root with the same filenames/paths.

## High-level runtime flow
1. Browser opens `index.html` (over http server)
2. User clicks **Start Game** → navigates to `game.html`
3. `game.html` loads `src/main.js`
4. `src/main.js`
   - reads DOM nodes
   - creates initial game state
   - binds keyboard / UI events
   - starts the tick loop after the first direction key

## Modules overview

### `src/main.js`
App bootstrap + glue:
- owns the `state` object
- owns the interval loop (`createIntervalLoop`)
- dispatches key events → `setQueuedDirection`
- on each tick calls `step(state)` and updates UI

### `src/config.js`
All shared constants:
- grid/cell sizes
- tick defaults and limits
- leaderboard key
- project URL (for share text)

### `src/game/*`
Core gameplay logic.

- `src/game/state.js`
  - `createInitialState()` creates the initial state
- `src/game/engine.js`
  - `setQueuedDirection(state, next)`
    - blocks illegal 180° reversal
    - direction is applied on **next tick**
  - `step(state)`
    - moves snake by one tick
    - handles collision
    - handles eating food / growth / score
- `src/game/tick.js`
  - `computeCurrentTickMs(baseTickMs, foodEatenCount)`
- `src/game/food.js`
  - places food avoiding snake body

### `src/ui/*`
DOM/UI rendering.

- `src/ui/dom.js`: centralized DOM lookup
- `src/ui/hud.js`: score/speed rendering + slider sync
- `src/ui/render.js`: canvas drawing
- `src/ui/leaderboard.js`: localStorage Top10 store + render
- `src/ui/gameOverPanel.js`: game over share panel + clipboard fallback

### `src/loop/intervalLoop.js`
Tiny wrapper around `setInterval`.

## Key data structures

### Game state (`state`)
- `snake: Array<{x:number,y:number}>` (head at index 0)
- `direction: {x,y}` current direction
- `queuedDirection: {x,y}` next direction, applied on the next tick
- `food: {x,y}`
- `score: number`
- `foodEatenCount: number`
- `baseTickMs: number` (from slider)
- `tickMs: number` (actual current tick interval)
- `started: boolean`
- `gameOver: boolean`

## Common modifications guide

### Add a new UI element
- Add markup in `game.html`
- Register it in `src/ui/dom.js`
- Update it in a small UI module (or in `main.js` if truly minimal)

### Change game rules
- Prefer editing `src/game/engine.js` and/or `src/game/*`
- Keep `main.js` as orchestration only

### Change speed logic
- Constants live in `src/config.js`
- Tick calculation lives in `src/game/tick.js`
- Slider handler lives in `src/main.js`

## Regression checklist (must stay true)
- Direction input applies on **next tick**
- No 180° reversal
- Eat food: +score, +length
- Auto speed-up: **-5ms per food**, floor **60ms**
- Hit wall/self → game over
- Restart button / `R` resets full state

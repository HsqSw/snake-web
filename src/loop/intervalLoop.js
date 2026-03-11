export function createIntervalLoop() {
  let timer = null;

  function start(stepFn, tickMs) {
    stop();
    timer = setInterval(stepFn, tickMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function isRunning() {
    return Boolean(timer);
  }

  return { start, stop, isRunning };
}

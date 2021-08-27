const { Worker } = require("worker_threads");
const tasker = require("./tasker");

module.exports = function (
  palabrasEnPatron = [],
  palabrasPotenciales = [],
  callbacks = {}
) {
  const numberOfCPUCores = require("os").cpus().length;
  const workers = new Array(numberOfCPUCores)
    .fill(null)
    .map(() => new Worker("./lib/thread.js"));
  const tasks = tasker(palabrasPotenciales);
  let remaining = tasks.length,
    chunks = palabrasPotenciales[0].length / remaining,
    done = 0,
    results = [];
  workers.forEach((worker, index) => {
    worker.on("message", (incomingResults) => {
      done++;
      callbacks.progreso?.(chunks);
      results = [...results, ...incomingResults];
      if (remaining) worker.postMessage([palabrasEnPatron, tasks[--remaining]]);
      else {
        worker.terminate();
        if (done == tasks.length) callbacks.finalizado?.(results);
      }
    });
    worker.postMessage([palabrasEnPatron, tasks[--remaining]]);
  });
};

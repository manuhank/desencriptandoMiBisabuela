const backtrack = require("./backtracking-patrones");
const chequear = require("./patrones");

const { parentPort } = require('worker_threads');
  parentPort.on('message', (message) => {
    parentPort.postMessage(backtrack(message[0], message[1], chequear));
  });


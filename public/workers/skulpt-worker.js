/* eslint-disable no-undef */
/**
 * Web Worker that executes Python 3 code offline using local Skulpt bundles.
 * Keeps UI responsive on mobile devices with a 3-second CPU execution limit
 * and async Console Terminal input() support.
 */

let skulptReady = false;
let skulptInitError = null;

try {
  importScripts('/vendor/skulpt/skulpt.min.js', '/vendor/skulpt/skulpt-stdlib.js');
  skulptReady = typeof Sk !== 'undefined';
} catch (err) {
  skulptInitError = err && err.message ? err.message : String(err);
}

const pendingInputs = new Map();
let inputSeq = 0;

function adjustExecStartForPause(pausedAt) {
  const elapsed = Date.now() - pausedAt;
  if (elapsed <= 0) return;
  if (typeof Sk !== 'undefined') {
    if (Sk.execStart instanceof Date) {
      Sk.execStart = new Date(Sk.execStart.getTime() + elapsed);
    } else if (typeof Sk.execStart === 'number') {
      Sk.execStart += elapsed;
    }
  }
}

function rejectPendingInputsForRun(runId, reason) {
  for (const [reqId, entry] of pendingInputs.entries()) {
    if (entry.runId === runId) {
      pendingInputs.delete(reqId);
      entry.reject(new Error(reason));
    }
  }
}

function formatSkulptError(err) {
  if (!err) return 'RuntimeError: Unknown error';
  if (typeof err.toString === 'function') {
    const str = err.toString();
    if (str && str !== '[object Object]') {
      return str;
    }
  }
  if (err.args && err.args.v && err.args.v[0] && err.args.v[0].v) {
    return `${err.tp$name || 'Error'}: ${err.args.v[0].v}`;
  }
  return String(err);
}

async function handleRun(message) {
  const { runId, code, execLimitMs = 3000, stdinQueue } = message;

  if (!skulptReady || skulptInitError) {
    self.postMessage({
      type: 'result',
      runId,
      ok: false,
      stdout: '',
      errorRaw: skulptInitError || 'Skulpt engine failed to initialize in worker.',
      durationMs: 0,
    });
    return;
  }

  let stdout = '';
  let stdinIndex = 0;
  const hasFixedStdin = Array.isArray(stdinQueue);
  const startedAt = Date.now();

  Sk.configure({
    output: function (text) {
      stdout += text;
      self.postMessage({
        type: 'stdout',
        runId,
        chunk: text,
      });
    },
    read: function (filename) {
      if (
        typeof Sk.builtinFiles === 'undefined' ||
        typeof Sk.builtinFiles.files[filename] === 'undefined'
      ) {
        throw new Error(`File not found: '${filename}'`);
      }
      return Sk.builtinFiles.files[filename];
    },
    __future__: Sk.python3,
    execLimit: execLimitMs,
    inputfunTakesPrompt: true,
    inputfun: function (prompt) {
      if (hasFixedStdin) {
        const nextVal = stdinIndex < stdinQueue.length ? String(stdinQueue[stdinIndex]) : '';
        stdinIndex += 1;
        return Promise.resolve(nextVal);
      }

      inputSeq += 1;
      const requestId = `${runId}_in_${inputSeq}`;
      const pausedAt = Date.now();

      return new Promise((resolve, reject) => {
        pendingInputs.set(requestId, {
          runId,
          pausedAt,
          resolve,
          reject,
        });

        self.postMessage({
          type: 'input_request',
          runId,
          requestId,
          prompt: prompt === undefined || prompt === null ? '' : String(prompt),
        });
      });
    },
  });

  Sk.execStart = new Date();

  try {
    await Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody('<stdin>', false, code, true);
    });

    self.postMessage({
      type: 'result',
      runId,
      ok: true,
      stdout,
      durationMs: Date.now() - startedAt,
    });
  } catch (err) {
    rejectPendingInputsForRun(runId, 'Execution ended');
    self.postMessage({
      type: 'result',
      runId,
      ok: false,
      stdout,
      errorRaw: formatSkulptError(err),
      durationMs: Date.now() - startedAt,
    });
  }
}

self.onmessage = function (event) {
  const data = event.data;
  if (!data || typeof data !== 'object') return;

  if (data.type === 'run') {
    void handleRun(data);
    return;
  }

  if (data.type === 'input_response') {
    const entry = pendingInputs.get(data.requestId);
    if (entry && entry.runId === data.runId) {
      pendingInputs.delete(data.requestId);
      adjustExecStartForPause(entry.pausedAt);
      entry.resolve(data.value === undefined || data.value === null ? '' : String(data.value));
    }
    return;
  }

  if (data.type === 'input_cancel') {
    const entry = pendingInputs.get(data.requestId);
    if (entry && entry.runId === data.runId) {
      pendingInputs.delete(data.requestId);
      adjustExecStartForPause(entry.pausedAt);
      entry.reject(new Error('Input cancelled by learner'));
    }
  }
};

if (skulptReady) {
  self.postMessage({ type: 'ready' });
} else {
  self.postMessage({ type: 'init_error', error: skulptInitError || 'Skulpt failed to load' });
}

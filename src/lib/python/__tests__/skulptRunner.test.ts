import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  SkulptWorkerRunner,
  composeCodeWithPrefix,
  evaluateStdoutCheck,
  formatPythonErrorAr,
} from '../skulptRunner';

function createRealWorkerHarness() {
  const workerPath = path.resolve(process.cwd(), 'public/workers/skulpt-worker.js');
  const skulptMinPath = path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt.min.js');
  const skulptStdlibPath = path.resolve(process.cwd(), 'public/vendor/skulpt/skulpt-stdlib.js');

  const listeners = new Map<string, (msg: unknown) => void>();
  let readyReceived = false;

  const ctx: Record<string, unknown> = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Date,
    Promise,
    Error,
    Math,
    RegExp,
    Array,
    Object,
    String,
    Number,
    Boolean,
    JSON,
    Map,
    Set,
    Uint8Array,
    MessageChannel,
  };
  ctx.global = ctx;
  ctx.self = ctx;
  ctx.importScripts = (...urls: string[]) => {
    for (const url of urls) {
      if (url.endsWith('skulpt.min.js')) {
        vm.runInContext(fs.readFileSync(skulptMinPath, 'utf8'), ctx);
      } else if (url.endsWith('skulpt-stdlib.js')) {
        vm.runInContext(fs.readFileSync(skulptStdlibPath, 'utf8'), ctx);
      } else {
        throw new Error(`Unexpected importScripts url: ${url}`);
      }
    }
  };
  ctx.postMessage = (msg: { type: string; runId?: string }) => {
    if (msg.type === 'ready') {
      readyReceived = true;
    }
    if (msg.runId && listeners.has(msg.runId)) {
      listeners.get(msg.runId)!(msg);
    }
  };

  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(workerPath, 'utf8'), ctx);

  function runInWorker(
    code: string,
    opts: {
      stdinQueue?: string[];
      execLimitMs?: number;
      onInput?: (prompt: string) => Promise<string>;
    } = {},
  ): Promise<{ ok: boolean; stdout: string; errorRaw?: string }> {
    return new Promise((resolve) => {
      const runId = `wtest_${Math.random().toString(36).slice(2)}`;
      listeners.set(runId, async (rawMsg) => {
        const msg = rawMsg as {
          type: string;
          runId: string;
          requestId?: string;
          prompt?: string;
          ok?: boolean;
          stdout?: string;
          errorRaw?: string;
        };

        if (msg.type === 'input_request' && msg.requestId) {
          const val = opts.onInput ? await opts.onInput(msg.prompt ?? '') : '';
          (ctx.onmessage as (e: { data: unknown }) => void)({
            data: {
              type: 'input_response',
              runId,
              requestId: msg.requestId,
              value: val,
            },
          });
          return;
        }

        if (msg.type === 'result') {
          listeners.delete(runId);
          resolve({
            ok: Boolean(msg.ok),
            stdout: msg.stdout ?? '',
            errorRaw: msg.errorRaw,
          });
        }
      });

      (ctx.onmessage as (e: { data: unknown }) => void)({
        data: {
          type: 'run',
          runId,
          code,
          execLimitMs: opts.execLimitMs ?? 3000,
          stdinQueue: opts.stdinQueue,
        },
      });
    });
  }

  return { readyReceived, runInWorker };
}

describe('python/skulptRunner helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('produces friendly Arabic error messages and hints for SyntaxError, ValueError, ZeroDivisionError, and more', () => {
    const syntax = formatPythonErrorAr('SyntaxError: bad input on line 4', 1);
    expect(syntax.errorType).toBe('SyntaxError');
    expect(syntax.line).toBe(3);
    expect(syntax.hintAr).toContain(':');

    const val = formatPythonErrorAr("ValueError: invalid literal for int() with base 10: 'abc' on line 2");
    expect(val.errorType).toBe('ValueError');
    expect(val.line).toBe(2);
    expect(val.hintAr).toContain('try / except');

    const zero = formatPythonErrorAr('ZeroDivisionError: integer division or modulo by zero on line 1');
    expect(zero.errorType).toBe('ZeroDivisionError');
    expect(zero.friendlyMessageAr).toContain('صفر');

    const name = formatPythonErrorAr("NameError: name 'area' is not defined on line 5");
    expect(name.errorType).toBe('NameError');

    const timeout = formatPythonErrorAr('TimeLimitError: Program exceeded run time limit.');
    expect(timeout.errorType).toBe('TimeLimitError');
    expect(timeout.friendlyMessageAr).toContain('٣ ثوانٍ');
  });

  it('composes hiddenPrefix and adjusts line offsets cleanly', () => {
    const composed = composeCodeWithPrefix('print(x)', 'x = 10\ny = 20');
    expect(composed.prefixLines).toBe(2);
    expect(composed.fullCode).toBe('x = 10\ny = 20\nprint(x)');
  });

  it('evaluates stdout checks using regex and contains rules', () => {
    const passRegex = evaluateStdoutCheck(
      'المتوسط = 85.5\n',
      { id: 'c1', stdin: ['80', '90', '86.5'], expectedOutputRegex: '85\\.5' },
      true,
    );
    expect(passRegex.passed).toBe(true);

    const passContains = evaluateStdoutCheck(
      'الرقم زوجي\n',
      { id: 'c2', stdin: ['8'], contains: ['زوجي'] },
      true,
    );
    expect(passContains.passed).toBe(true);

    const failContains = evaluateStdoutCheck(
      'الرقم فردي\n',
      { id: 'c3', stdin: ['8'], contains: 'زوجي' },
      true,
    );
    expect(failContains.passed).toBe(false);
    expect(failContains.reasonAr).toContain('زوجي');
  });

  it('returns passed: false instead of throwing when expectedOutputRegex is invalid', () => {
    const invalidRegexResult = evaluateStdoutCheck(
      '42\n',
      {
        id: 'bad-regex',
        label: 'فحص النمط',
        stdin: [],
        expectedOutputRegex: '[unclosed(',
      },
      true,
    );
    expect(invalidRegexResult).toEqual({
      checkId: 'bad-regex',
      label: 'فحص النمط',
      passed: false,
      stdout: '42\n',
      reasonAr: 'تعذر التحقق من نمط الإجابة المتوقع في هذا التمرين.',
    });
  });

  it('bridges Worker messages for interactive input(), stdout streaming, and runCodeLabChecks', async () => {
    class MockWorker {
      private listeners = new Map<string, Set<(ev: unknown) => void>>();
      terminated = false;

      addEventListener(type: string, cb: (ev: unknown) => void) {
        if (!this.listeners.has(type)) this.listeners.set(type, new Set());
        this.listeners.get(type)!.add(cb);
      }

      removeEventListener(type: string, cb: (ev: unknown) => void) {
        this.listeners.get(type)?.delete(cb);
      }

      emit(type: string, data: unknown) {
        for (const cb of this.listeners.get(type) ?? []) {
          cb({ data });
        }
      }

      postMessage(msg: { type: string; runId: string; requestId?: string; stdinQueue?: string[]; value?: string }) {
        if (msg.type === 'run') {
          if (msg.stdinQueue && msg.stdinQueue.length > 0) {
            const out = `sum=${Number(msg.stdinQueue[0]) + Number(msg.stdinQueue[1])}\n`;
            this.emit('message', { type: 'stdout', runId: msg.runId, chunk: out });
            this.emit('message', { type: 'result', runId: msg.runId, ok: true, stdout: out, durationMs: 5 });
          } else {
            this.emit('message', {
              type: 'input_request',
              runId: msg.runId,
              requestId: 'req_1',
              prompt: 'Enter name:',
            });
          }
        } else if (msg.type === 'input_response') {
          const out = `أهلاً ${msg.value}\n`;
          this.emit('message', { type: 'stdout', runId: msg.runId, chunk: out });
          this.emit('message', { type: 'result', runId: msg.runId, ok: true, stdout: out, durationMs: 8 });
        }
      }

      terminate() {
        this.terminated = true;
      }
    }

    vi.stubGlobal('Worker', MockWorker as unknown as typeof Worker);

    const runner = new SkulptWorkerRunner();
    const streamed: string[] = [];
    const interactiveRes = await runner.run('name = input("Enter name:")', {
      onStdout: (chunk) => streamed.push(chunk),
      onInputRequest: async (prompt) => {
        expect(prompt).toBe('Enter name:');
        return 'سارة';
      },
    });
    expect(interactiveRes.ok).toBe(true);
    expect(interactiveRes.stdout).toBe('أهلاً سارة\n');
    expect(streamed).toEqual(['أهلاً سارة\n']);

    const evalRes = await runner.runCodeLabChecks('print(a + b)', [
      { id: 't1', stdin: ['3', '4'], contains: 'sum=7' },
      { id: 't2', stdin: ['10', '5'], expectedOutputRegex: 'sum=15' },
    ]);
    expect(evalRes.allPassed).toBe(true);
    expect(evalRes.passedCount).toBe(2);
  });
});

describe('public/workers/skulpt-worker.js real Skulpt integration (15 textbook examples + Arabic)', () => {
  const harness = createRealWorkerHarness();

  it('initializes local Skulpt bundles cleanly inside worker', () => {
    expect(harness.readyReceived).toBe(true);
  });

  it('executes all 15 Egyptian Prep 3 Term 1 textbook Python examples accurately', async () => {
    // 1. Add two numbers (Station 1)
    const ex1 = await harness.runInWorker(
      'a = int(input("Num 1: "))\nb = int(input("Num 2: "))\nprint(a + b)',
      { stdinQueue: ['7', '8'] },
    );
    expect(ex1.ok).toBe(true);
    expect(ex1.stdout.trim()).toBe('15');

    // 2. Even or Odd with Arabic output (Station 1)
    const ex2 = await harness.runInWorker(
      'num = int(input("الرقم: "))\nif num % 2 == 0:\n    print("زوجي")\nelse:\n    print("فردي")',
      { stdinQueue: ['14'] },
    );
    expect(ex2.ok).toBe(true);
    expect(ex2.stdout.trim()).toBe('زوجي');

    // 3. Average of 3 grades using float precision (Station 1)
    const ex3 = await harness.runInWorker(
      'a = float(input())\nb = float(input())\nc = float(input())\navg = (a + b + c) / 3\nprint(avg)',
      { stdinQueue: ['80', '90', '85'] },
    );
    expect(ex3.ok).toBe(true);
    expect(ex3.stdout.trim()).toBe('85.0');

    // 4. Rectangle area (Station 1)
    const ex4 = await harness.runInWorker(
      'length = float(input())\nwidth = float(input())\nprint(length * width)',
      { stdinQueue: ['5', '4'] },
    );
    expect(ex4.ok).toBe(true);
    expect(ex4.stdout.trim()).toBe('20.0');

    // 5. Larger of two numbers (Station 1)
    const ex5 = await harness.runInWorker(
      'a = int(input())\nb = int(input())\nif a > b:\n    print(a)\nelse:\n    print(b)',
      { stdinQueue: ['12', '25'] },
    );
    expect(ex5.ok).toBe(true);
    expect(ex5.stdout.trim()).toBe('25');

    // 6. Sum 1..5 using for/range (Station 1)
    const ex6 = await harness.runInWorker(
      'total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)',
    );
    expect(ex6.ok).toBe(true);
    expect(ex6.stdout.trim()).toBe('15');

    // 7. Student pass/fail from 3 grades (Station 1 activity)
    const ex7 = await harness.runInWorker(
      'a = int(input())\nb = int(input())\nc = int(input())\navg = (a + b + c) / 3\nif avg >= 50:\n    print("ناجح")\nelse:\n    print("غير ناجح")',
      { stdinQueue: ['60', '70', '80'] },
    );
    expect(ex7.ok).toBe(true);
    expect(ex7.stdout.trim()).toBe('ناجح');

    // 8. Algorithm: linear search in list (Station 2)
    const ex8 = await harness.runInWorker(
      'nums = [4, 10, 22, 8]\nfound = False\nfor n in nums:\n    if n == 10:\n        found = True\n        break\nif found:\n    print("Found")',
    );
    expect(ex8.ok).toBe(true);
    expect(ex8.stdout.trim()).toBe('Found');

    // 9. Strings: positive/negative indexing, len, upper, in (Station 3)
    const ex9 = await harness.runInWorker(
      'text = "hello"\nprint(len(text), text[0], text[-1], text.upper(), "e" in text)',
    );
    expect(ex9.ok).toBe(true);
    expect(ex9.stdout.trim()).toBe('5 h o HELLO True');

    // 10. Lists: append, remove, list(text) (Station 3)
    const ex10 = await harness.runInWorker(
      'names = ["Ali", "Mona"]\nnames.append("Sara")\nnames.remove("Ali")\nprint(names, list("hi"))',
    );
    expect(ex10.ok).toBe(true);
    expect(ex10.stdout.trim()).toBe("['Mona', 'Sara'] ['h', 'i']");

    // 11. Password strength checker (Station 3 project)
    const ex11 = await harness.runInWorker(
      'pw = input()\nscore = 0\nif len(pw) >= 6:\n    score += 1\nfor ch in pw:\n    if ch in "@#$%&":\n        score += 1\n        break\nprint("score:", score)',
      { stdinQueue: ['Pass@123'] },
    );
    expect(ex11.ok).toBe(true);
    expect(ex11.stdout.trim()).toBe('score: 2');

    // 12. Functions with parameters & return (Station 4)
    const ex12 = await harness.runInWorker(
      'def circle_area(radius):\n    pi = 3.14\n    return pi * radius * radius\nresult = circle_area(10)\nprint(result)',
    );
    expect(ex12.ok).toBe(true);
    expect(ex12.stdout.trim()).toBe('314.0');

    // 13. Exception handling ValueError & ZeroDivisionError (Station 5)
    const ex13 = await harness.runInWorker(
      'try:\n    x = int(input())\n    print(10 / x)\nexcept ValueError:\n    print("اكتب رقم")\nexcept ZeroDivisionError:\n    print("ممنوع القسمة على صفر")',
      { stdinQueue: ['0'] },
    );
    expect(ex13.ok).toBe(true);
    expect(ex13.stdout.trim()).toBe('ممنوع القسمة على صفر');

    // 14. Validation loop while True + try/except + break (Station 5)
    const ex14 = await harness.runInWorker(
      'while True:\n    try:\n        age = int(input())\n        print("العمر:", age)\n        break\n    except ValueError:\n        print("خطأ")',
      { stdinQueue: ['abc', '14'] },
    );
    expect(ex14.ok).toBe(true);
    expect(ex14.stdout).toBe('خطأ\nالعمر: 14\n');

    // 15. AI linear prediction model y = w*x + b (Station 6)
    const ex15 = await harness.runInWorker(
      'def predict_grade(x):\n    w = 5\n    b = 10\n    return w * x + b\nprint(predict_grade(3))',
    );
    expect(ex15.ok).toBe(true);
    expect(ex15.stdout.trim()).toBe('25');
  });

  it('catches SyntaxError, ValueError, ZeroDivisionError, and infinite-loop timeout while allowing slow interactive input()', async () => {
    const syntax = await harness.runInWorker('if True\n    print(1)');
    expect(syntax.ok).toBe(false);
    expect(formatPythonErrorAr(syntax.errorRaw ?? '').errorType).toBe('SyntaxError');

    const valErr = await harness.runInWorker('int("abc")');
    expect(valErr.ok).toBe(false);
    expect(formatPythonErrorAr(valErr.errorRaw ?? '').errorType).toBe('ValueError');

    const zeroErr = await harness.runInWorker('print(10 / 0)');
    expect(zeroErr.ok).toBe(false);
    expect(formatPythonErrorAr(zeroErr.errorRaw ?? '').errorType).toBe('ZeroDivisionError');

    const slowInput = await harness.runInWorker('x = int(input("Num:"))\nprint(x * 2)', {
      execLimitMs: 300,
      onInput: () => new Promise((resolve) => setTimeout(() => resolve('21'), 450)),
    });
    expect(slowInput.ok).toBe(true);
    expect(slowInput.stdout.trim()).toBe('42');

    const infiniteLoop = await harness.runInWorker('while True:\n    pass', {
      execLimitMs: 250,
    });
    expect(infiniteLoop.ok).toBe(false);
    expect(formatPythonErrorAr(infiniteLoop.errorRaw ?? '').errorType).toBe('TimeLimitError');
  });
});

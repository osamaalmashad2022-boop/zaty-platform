import type { CodeLabCheck } from '@/types/curriculum';

export type PythonErrorType =
  | 'SyntaxError'
  | 'IndentationError'
  | 'ValueError'
  | 'ZeroDivisionError'
  | 'NameError'
  | 'TypeError'
  | 'IndexError'
  | 'TimeLimitError'
  | 'RuntimeError';

export interface PythonErrorInfo {
  errorType: PythonErrorType;
  line?: number;
  rawMessage: string;
  friendlyMessageAr: string;
  hintAr: string;
}

export interface PythonRunOptions {
  execLimitMs?: number;
  hiddenPrefix?: string;
  stdinQueue?: string[];
  onStdout?: (chunk: string, fullStdout: string) => void;
  onInputRequest?: (prompt: string) => Promise<string>;
  signal?: AbortSignal;
}

export interface PythonRunResult {
  ok: boolean;
  stdout: string;
  durationMs: number;
  error?: PythonErrorInfo;
}

export interface CodeLabCheckResult {
  checkId: string;
  label?: string;
  passed: boolean;
  stdout: string;
  error?: PythonErrorInfo;
  reasonAr?: string;
}

export interface CodeLabEvaluationResult {
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  results: CodeLabCheckResult[];
}

export function formatPythonErrorAr(rawError: string, lineOffset = 0): PythonErrorInfo {
  const rawMessage = (rawError || 'RuntimeError').trim();
  const lineMatch = rawMessage.match(/on line (\d+)/i) ?? rawMessage.match(/line (\d+)/i);
  const parsedLine = lineMatch ? Number.parseInt(lineMatch[1], 10) - lineOffset : undefined;
  const line = parsedLine !== undefined && parsedLine > 0 ? parsedLine : undefined;

  if (/IndentationError/i.test(rawMessage)) {
    return {
      errorType: 'IndentationError',
      line,
      rawMessage,
      friendlyMessageAr: 'في خطأ في المسافات البادئة (IndentationError)',
      hintAr:
        'الأسطر اللي جوه if أو for أو def أو try لازم تبدأ بمسافات بادئة متساوية (٤ مسافات مثلًا).',
    };
  }

  if (/SyntaxError|ParseError|TokenError/i.test(rawMessage)) {
    return {
      errorType: 'SyntaxError',
      line,
      rawMessage,
      friendlyMessageAr: 'في خطأ في قواعد كتابة الكود (SyntaxError)',
      hintAr:
        'تأكد من إغلاق الأقواس () وعلامات التنصيص ""، ووجود النقطتين : في نهاية جمل if و for و while و def.',
    };
  }

  if (/ValueError/i.test(rawMessage)) {
    return {
      errorType: 'ValueError',
      line,
      rawMessage,
      friendlyMessageAr: 'القيمة المدخلة مش مناسبة للتحويل (ValueError)',
      hintAr:
        'دالة int() أو float() محتاجة رقم صحيح أو عشري؛ لو أدخلت حروف أو قيمة فاضية بيظهر ValueError. تقدر تحميها بـ try / except.',
    };
  }

  if (/ZeroDivisionError/i.test(rawMessage)) {
    return {
      errorType: 'ZeroDivisionError',
      line,
      rawMessage,
      friendlyMessageAr: 'مينفعش نقسم على صفر! (ZeroDivisionError)',
      hintAr:
        'تأكد إن الرقم اللي بتقسم عليه (المقام) مش بيساوي 0، أو عالج الحالة باستخدام except ZeroDivisionError.',
    };
  }

  if (/NameError/i.test(rawMessage)) {
    return {
      errorType: 'NameError',
      line,
      rawMessage,
      friendlyMessageAr: 'اسم متغير أو دالة غير متعرّف (NameError)',
      hintAr:
        'تأكد من كتابة اسم المتغير أو الدالة بشكل مطابق، وإنك عرّفته قبل ما تستخدمه (المتغيرات اللي جوه الدالة بتكون محلية جواها بس).',
    };
  }

  if (/TypeError/i.test(rawMessage)) {
    return {
      errorType: 'TypeError',
      line,
      rawMessage,
      friendlyMessageAr: 'عدم توافق بين أنواع البيانات (TypeError)',
      hintAr:
        'مينفعش تجمع نص مع رقم مباشرة من غير تحويل، وكمان تأكد إنك بتمرر عدد المعاملات الصحيح للدالة.',
    };
  }

  if (/IndexError/i.test(rawMessage)) {
    return {
      errorType: 'IndexError',
      line,
      rawMessage,
      friendlyMessageAr: 'الفهرس المطلوب بره حدود النص أو القائمة (IndexError)',
      hintAr:
        'تذكر إن العدّ في Python بيبدأ من 0، وآخر عنصر بيكون فهرسه -1 أو len(items) - 1.',
    };
  }

  if (/TimeLimitError|exceeded run time limit/i.test(rawMessage)) {
    return {
      errorType: 'TimeLimitError',
      line,
      rawMessage,
      friendlyMessageAr: 'البرنامج استغرق وقتًا أطول من ٣ ثوانٍ وتوقف تلقائيًا',
      hintAr:
        'راجع الحلقات التكرارية (زي while True) وتأكد إن في شرط توقف أو break علشان البرنامج ما يلفش للأبد.',
    };
  }

  return {
    errorType: 'RuntimeError',
    line,
    rawMessage,
    friendlyMessageAr: 'حصل خطأ أثناء تشغيل البرنامج',
    hintAr: 'راجع السطر الموضح في الرسالة وتأكد من المدخلات وأسماء المتغيرات.',
  };
}

export function composeCodeWithPrefix(
  code: string,
  hiddenPrefix?: string,
): { fullCode: string; prefixLines: number } {
  if (!hiddenPrefix || hiddenPrefix.trim().length === 0) {
    return { fullCode: code, prefixLines: 0 };
  }
  const normalizedPrefix = hiddenPrefix.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  const prefixLines = normalizedPrefix.split('\n').length;
  return {
    fullCode: `${normalizedPrefix}\n${code}`,
    prefixLines,
  };
}

export function evaluateStdoutCheck(
  stdout: string,
  check: CodeLabCheck,
  runOk: boolean,
  error?: PythonErrorInfo,
): CodeLabCheckResult {
  if (!runOk) {
    return {
      checkId: check.id,
      label: check.label,
      passed: false,
      stdout,
      error,
      reasonAr: error?.friendlyMessageAr ?? 'توقف البرنامج بسبب خطأ قبل إخراج النتيجة.',
    };
  }

  const normalizedOut = stdout.replace(/\r\n/g, '\n');

  if (check.expectedOutputRegex) {
    const regex = new RegExp(check.expectedOutputRegex, 'm');
    if (!regex.test(normalizedOut)) {
      return {
        checkId: check.id,
        label: check.label,
        passed: false,
        stdout: normalizedOut,
        reasonAr: 'المخرجات ما طابقتش النتيجة المطلوبة في الاختبار. راجع المطلوب وجرّب تاني.',
      };
    }
  }

  if (check.contains !== undefined) {
    const needles = Array.isArray(check.contains) ? check.contains : [check.contains];
    const missing = needles.filter((needle) => !normalizedOut.includes(needle));
    if (missing.length > 0) {
      return {
        checkId: check.id,
        label: check.label,
        passed: false,
        stdout: normalizedOut,
        reasonAr: `المخرجات ناقصة القيمة المتوقعة: ${missing.join(' ، ')}`,
      };
    }
  }

  return {
    checkId: check.id,
    label: check.label,
    passed: true,
    stdout: normalizedOut,
  };
}

type WorkerInboundMessage =
  | { type: 'ready' }
  | { type: 'init_error'; error: string }
  | { type: 'stdout'; runId: string; chunk: string }
  | { type: 'input_request'; runId: string; requestId: string; prompt: string }
  | {
      type: 'result';
      runId: string;
      ok: boolean;
      stdout: string;
      errorRaw?: string;
      durationMs: number;
    };

export class SkulptWorkerRunner {
  private worker: Worker | null = null;
  private workerUrl: string;
  private runSeq = 0;

  constructor(workerUrl = '/workers/skulpt-worker.js') {
    this.workerUrl = workerUrl;
  }

  private ensureWorker(): Worker {
    if (typeof Worker === 'undefined') {
      throw new Error('Web Workers are only available in browser environments.');
    }
    if (!this.worker) {
      this.worker = new Worker(this.workerUrl);
    }
    return this.worker;
  }

  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  run(code: string, options: PythonRunOptions = {}, lineOffset = 0): Promise<PythonRunResult> {
    const execLimitMs = options.execLimitMs ?? 3000;
    const composed = options.hiddenPrefix
      ? composeCodeWithPrefix(code, options.hiddenPrefix)
      : { fullCode: code, prefixLines: lineOffset };
    const effectiveCode = composed.fullCode;
    const effectiveLineOffset = composed.prefixLines;
    const worker = this.ensureWorker();
    this.runSeq += 1;
    const runId = `py_${Date.now()}_${this.runSeq}`;

    return new Promise<PythonRunResult>((resolve) => {
      let stdout = '';
      let settled = false;
      let waitingForInput = false;
      let watchdogId: ReturnType<typeof setTimeout> | null = null;

      const clearWatchdog = () => {
        if (watchdogId !== null) {
          clearTimeout(watchdogId);
          watchdogId = null;
        }
      };

      const startWatchdog = () => {
        clearWatchdog();
        watchdogId = setTimeout(() => {
          if (settled || waitingForInput) return;
          this.terminate();
          finish({
            ok: false,
            stdout,
            durationMs: execLimitMs,
            error: formatPythonErrorAr('TimeLimitError: Program exceeded run time limit.'),
          });
        }, execLimitMs + 2500);
      };

      const cleanup = () => {
        clearWatchdog();
        worker.removeEventListener('message', onMessage);
        worker.removeEventListener('error', onError);
        if (options.signal) {
          options.signal.removeEventListener('abort', onAbort);
        }
      };

      const finish = (result: PythonRunResult) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(result);
      };

      const onAbort = () => {
        this.terminate();
        finish({
          ok: false,
          stdout,
          durationMs: 0,
          error: {
            errorType: 'RuntimeError',
            rawMessage: 'Cancelled by learner',
            friendlyMessageAr: 'تم إيقاف تشغيل البرنامج.',
            hintAr: 'تقدر تعدل الكود وتشغّله تاني في أي وقت.',
          },
        });
      };

      const onError = (err: ErrorEvent) => {
        this.terminate();
        finish({
          ok: false,
          stdout,
          durationMs: 0,
          error: formatPythonErrorAr(err.message || 'Worker runtime error', effectiveLineOffset),
        });
      };

      const onMessage = async (event: MessageEvent<WorkerInboundMessage>) => {
        const msg = event.data;
        if (!msg || typeof msg !== 'object') return;

        if (msg.type === 'init_error') {
          finish({
            ok: false,
            stdout,
            durationMs: 0,
            error: formatPythonErrorAr(msg.error, effectiveLineOffset),
          });
          return;
        }

        if (!('runId' in msg) || msg.runId !== runId) {
          return;
        }

        if (msg.type === 'stdout') {
          stdout += msg.chunk;
          options.onStdout?.(msg.chunk, stdout);
          return;
        }

        if (msg.type === 'input_request') {
          waitingForInput = true;
          clearWatchdog();
          try {
            const value = options.onInputRequest
              ? await options.onInputRequest(msg.prompt)
              : '';
            if (settled) return;
            waitingForInput = false;
            startWatchdog();
            worker.postMessage({
              type: 'input_response',
              runId,
              requestId: msg.requestId,
              value,
            });
          } catch {
            if (settled) return;
            waitingForInput = false;
            worker.postMessage({
              type: 'input_cancel',
              runId,
              requestId: msg.requestId,
            });
          }
          return;
        }

        if (msg.type === 'result') {
          if (msg.ok) {
            finish({
              ok: true,
              stdout: msg.stdout,
              durationMs: msg.durationMs,
            });
          } else {
            finish({
              ok: false,
              stdout: msg.stdout,
              durationMs: msg.durationMs,
              error: formatPythonErrorAr(msg.errorRaw || 'RuntimeError', effectiveLineOffset),
            });
          }
        }
      };

      if (options.signal?.aborted) {
        onAbort();
        return;
      }

      options.signal?.addEventListener('abort', onAbort, { once: true });
      worker.addEventListener('message', onMessage);
      worker.addEventListener('error', onError);

      startWatchdog();
      worker.postMessage({
        type: 'run',
        runId,
        code: effectiveCode,
        execLimitMs,
        stdinQueue: options.stdinQueue,
      });
    });
  }

  async runCodeLabChecks(
    code: string,
    checks: CodeLabCheck[],
    hiddenPrefix?: string,
    execLimitMs = 3000,
  ): Promise<CodeLabEvaluationResult> {
    const { fullCode, prefixLines } = composeCodeWithPrefix(code, hiddenPrefix);

    if (checks.length === 0) {
      const runRes = await this.run(
        fullCode,
        { execLimitMs, stdinQueue: [] },
        prefixLines,
      );
      const singleResult: CodeLabCheckResult = {
        checkId: 'default-run',
        passed: runRes.ok,
        stdout: runRes.stdout,
        error: runRes.error,
        reasonAr: runRes.ok ? undefined : runRes.error?.friendlyMessageAr,
      };
      return {
        allPassed: runRes.ok,
        passedCount: runRes.ok ? 1 : 0,
        totalCount: 1,
        results: [singleResult],
      };
    }

    const results: CodeLabCheckResult[] = [];
    for (const check of checks) {
      const runRes = await this.run(
        fullCode,
        { execLimitMs, stdinQueue: check.stdin ?? [] },
        prefixLines,
      );
      results.push(evaluateStdoutCheck(runRes.stdout, check, runRes.ok, runRes.error));
    }

    const passedCount = results.filter((r) => r.passed).length;
    return {
      allPassed: passedCount === results.length,
      passedCount,
      totalCount: results.length,
      results,
    };
  }
}

let sharedRunner: SkulptWorkerRunner | null = null;

export function getSkulptRunner(): SkulptWorkerRunner {
  if (!sharedRunner) {
    sharedRunner = new SkulptWorkerRunner();
  }
  return sharedRunner;
}

export function runPython(
  code: string,
  options?: PythonRunOptions,
): Promise<PythonRunResult> {
  return getSkulptRunner().run(code, options);
}

export function runCodeLabChecks(
  code: string,
  checks: CodeLabCheck[],
  hiddenPrefix?: string,
  execLimitMs?: number,
): Promise<CodeLabEvaluationResult> {
  return getSkulptRunner().runCodeLabChecks(code, checks, hiddenPrefix, execLimitMs);
}

export function terminateSkulptWorker(): void {
  if (sharedRunner) {
    sharedRunner.terminate();
  }
}

import React from 'react';

const PYTHON_KEYWORDS = new Set([
  'False',
  'None',
  'True',
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
]);

const PYTHON_BUILTINS = new Set([
  'print',
  'input',
  'int',
  'float',
  'str',
  'bool',
  'list',
  'dict',
  'set',
  'tuple',
  'len',
  'range',
  'sum',
  'min',
  'max',
  'abs',
  'round',
  'sorted',
  'type',
  'enumerate',
  'zip',
  'ValueError',
  'ZeroDivisionError',
  'TypeError',
  'NameError',
  'IndexError',
  'Exception',
]);

type TokenType =
  | 'comment'
  | 'string'
  | 'keyword'
  | 'builtin'
  | 'number'
  | 'operator'
  | 'plain';

interface Token {
  type: TokenType;
  value: string;
}

const TOKEN_CLASSES: Record<TokenType, string> = {
  comment: 'text-[#89A8A4] italic',
  string: 'text-[#8CE9C8]',
  keyword: 'text-[#FF9EB1] font-semibold',
  builtin: 'text-[#67E8F9]',
  number: 'text-[#FCD34D]',
  operator: 'text-[#A7F3D0]',
  plain: 'text-[#F4F9FC]',
};

/**
 * Tokenizes a single line of Python code without external dependencies
 * so syntax highlighting works 100% offline with zero bundle overhead.
 */
export function tokenizePythonLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    // Comment to end of line
    if (ch === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // String literals (single or double quotes, handling escaped quotes)
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === '\\' && j + 1 < line.length) {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[0-9._]/.test(line[j])) {
        j += 1;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords / builtins
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) {
        j += 1;
      }
      const word = line.slice(i, j);
      if (PYTHON_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (PYTHON_BUILTINS.has(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }

    // Operators and punctuation
    if (/[+\-*/%=<>!&|^~:]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[=<>/*]/.test(line[j]) && j - i < 2) {
        j += 1;
      }
      tokens.push({ type: 'operator', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Whitespace / brackets / other characters
    let j = i + 1;
    while (j < line.length && !/[#'"0-9A-Za-z_+\-*/%=<>!&|^~:]/.test(line[j])) {
      j += 1;
    }
    tokens.push({ type: 'plain', value: line.slice(i, j) });
    i = j;
  }

  return tokens;
}

export interface PythonHighlightProps {
  code: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export function PythonCodeLines({
  code,
  highlightLines = [],
  showLineNumbers = true,
}: PythonHighlightProps) {
  const highlighted = new Set(highlightLines);
  const lines = code.replace(/\r\n/g, '\n').split('\n');

  return (
    <div dir="ltr" className="font-mono text-sm leading-7 text-left overflow-x-auto">
      <div className="min-w-max py-3">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlighted.has(lineNumber);
          const tokens = tokenizePythonLine(line);

          return (
            <div
              key={lineNumber}
              className={`flex items-start px-4 transition-colors ${
                isHighlighted
                  ? 'bg-[#009179]/25 border-l-2 border-[#2EC4B6]'
                  : 'hover:bg-white/5'
              }`}
            >
              {showLineNumbers && (
                <span
                  aria-hidden="true"
                  className="select-none w-8 shrink-0 pr-3 text-right text-xs leading-7 text-[#6E928E]"
                >
                  {lineNumber}
                </span>
              )}
              <code className="whitespace-pre font-mono">
                {tokens.length === 0 ? (
                  '\u00A0'
                ) : (
                  tokens.map((token, tokenIdx) => (
                    <span key={tokenIdx} className={TOKEN_CLASSES[token.type]}>
                      {token.value}
                    </span>
                  ))
                )}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

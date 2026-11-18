import React from 'react';
import { PythonCodeLines } from './pythonHighlight';

interface FormattedTextProps {
  text: string;
  className?: string;
}

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

/**
 * Renders inline Markdown formatting (**bold**, *italic*, `inline code`)
 * while isolating LTR code tokens inside native Arabic RTL prose.
 */
export function InlineFormatted({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          const inner = part.slice(1, -1);
          return (
            <code
              key={idx}
              dir="ltr"
              className="mx-0.5 inline-block rounded-md bg-[#E5F1EE] px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[#163A3A]"
            >
              {inner}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong key={idx} className="font-bold text-[#163A3A]">
              <InlineFormatted text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
          return (
            <em key={idx} className="italic">
              <InlineFormatted text={part.slice(1, -1)} />
            </em>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}

/**
 * Renders lightweight structured Arabic/Markdown blocks:
 * headings (#/##/###), fenced ```python blocks, bullet lists, and paragraphs.
 */
export function FormattedText({ text, className = '' }: FormattedTextProps) {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  // Split by fenced code blocks first so multiline code stays intact
  const segments = normalized.split(/(```[\s\S]*?```)/g);

  return (
    <div className={`space-y-3 text-[17px] sm:text-[18px] leading-[1.75] text-[#3B5A58] ${className}`}>
      {segments.map((segment, segIndex) => {
        const trimmed = segment.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
          const withoutFence = trimmed.slice(3, -3);
          const firstNewline = withoutFence.indexOf('\n');
          const codeBody =
            firstNewline >= 0 ? withoutFence.slice(firstNewline + 1) : withoutFence;
          return (
            <div
              key={segIndex}
              className="overflow-hidden rounded-xl bg-[#0F2929] border border-[#1E4745] shadow-sm"
            >
              <PythonCodeLines code={codeBody.trimEnd()} showLineNumbers={false} />
            </div>
          );
        }

        const blocks = trimmed.split(/\n{2,}/);
        return blocks.map((block, blockIdx) => {
          const lines = block.split('\n').map((l) => l.trimEnd());
          const firstLine = lines[0]?.trim() ?? '';

          if (firstLine.startsWith('### ')) {
            return (
              <h4
                key={`${segIndex}-${blockIdx}`}
                className="text-base sm:text-lg font-bold text-[#163A3A] pt-1"
              >
                <InlineFormatted text={firstLine.slice(4)} />
              </h4>
            );
          }
          if (firstLine.startsWith('## ') || firstLine.startsWith('# ')) {
            const headingText = firstLine.replace(/^#{1,2}\s+/, '');
            return (
              <h3
                key={`${segIndex}-${blockIdx}`}
                className="text-lg sm:text-xl font-bold text-[#163A3A] pt-1"
              >
                <InlineFormatted text={headingText} />
              </h3>
            );
          }

          const isBulletList = lines.every((l) => /^[-•*]\s+/.test(l.trim()));
          if (isBulletList) {
            return (
              <ul key={`${segIndex}-${blockIdx}`} className="space-y-2 pr-1">
                {lines.map((line, liIdx) => (
                  <li key={liIdx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#006E5A]"
                    />
                    <span className="flex-1">
                      <InlineFormatted text={line.trim().replace(/^[-•*]\s+/, '')} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={`${segIndex}-${blockIdx}`} className="whitespace-pre-line">
              <InlineFormatted text={block.trim()} />
            </p>
          );
        });
      })}
    </div>
  );
}

import React from 'react';
import type { TableBlockData } from '@/types/curriculum';
import { InlineFormatted } from './FormattedText';

export interface TableBlockProps {
  data: TableBlockData;
  className?: string;
}

function shouldIsolateLtr(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Isolate pure negative numbers, slices, or code-like ASCII cells so RTL doesn't flip `-5` to `5-`
  if (/^-\d+(\.\d+)?$/.test(trimmed)) return true;
  if (/^[A-Za-z0-9_[\]().'"+\-*/%=<>:,\s]+$/.test(trimmed) && /[A-Za-z_[\]()]/.test(trimmed)) {
    return true;
  }
  return false;
}

function renderCellContent(value: string) {
  if (shouldIsolateLtr(value)) {
    return (
      <bdi dir="ltr" className="font-mono text-sm sm:text-[15px]">
        {value}
      </bdi>
    );
  }
  return <InlineFormatted text={value} />;
}

export function TableBlock({ data, className = '' }: TableBlockProps) {
  const highlightCol = data.highlightColumn;

  return (
    <section
      dir="rtl"
      className={`rounded-xl border border-[#E2ECE9] bg-[#FFFFFF] p-4 sm:p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.08)] space-y-3 ${className}`}
    >
      {data.heading && (
        <h3 className="text-lg sm:text-xl font-bold text-[#163A3A]">{data.heading}</h3>
      )}

      {data.headers.length >= 4 && (
        <p className="text-xs text-[#3B5A58] sm:hidden">
          اسحب الجدول أفقيًا لو الأعمدة كتير علشان تشوف كل التفاصيل.
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-[#E2ECE9]">
        <table className="w-full min-w-max border-collapse text-right text-[15px] sm:text-base">
          <thead>
            <tr className="bg-[#163A3A] text-white">
              {data.headers.map((header, colIdx) => {
                const isHighlighted = highlightCol === colIdx;
                return (
                  <th
                    key={colIdx}
                    scope="col"
                    className={`border-b border-[#1E4745] px-4 py-3 font-bold ${
                      isHighlighted ? 'bg-[#009179] text-white' : ''
                    }`}
                  >
                    {renderCellContent(header)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F6FAF9]'}
              >
                {row.map((cell, colIdx) => {
                  const isHighlighted = highlightCol === colIdx;
                  return (
                    <td
                      key={colIdx}
                      className={`border-t border-[#E2ECE9] px-4 py-3 leading-relaxed ${
                        isHighlighted
                          ? 'bg-[#E5F1EE]/80 font-semibold text-[#163A3A]'
                          : 'text-[#3B5A58]'
                      }`}
                    >
                      {renderCellContent(cell)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.caption && (
        <p className="text-sm text-[#3B5A58] leading-relaxed">{data.caption}</p>
      )}
    </section>
  );
}

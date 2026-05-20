import type { ReactElement, ReactNode } from "react";

interface LegalTableProps {
  caption?: string;
  headers: string[];
  rows: ReactNode[][];
}

export function LegalTable({
  caption,
  headers,
  rows,
}: Readonly<LegalTableProps>): ReactElement {
  return (
    <div className="not-prose mt-4 overflow-x-auto rounded-2xl border border-conteo-light bg-white shadow-[0_4px_24px_rgba(42,42,66,0.04)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {caption ? (
          <caption className="px-5 pt-4 pb-2 text-left text-xs font-medium uppercase tracking-wider text-conteo-text-muted">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-b border-conteo-light bg-conteo-light/50">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-conteo-dark/80"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              // eslint-disable-next-line react/no-array-index-key
              key={rowIndex}
              className="border-b border-conteo-light/70 last:border-b-0 hover:bg-conteo-light/30"
            >
              {row.map((cell, cellIndex) => (
                <td
                  // eslint-disable-next-line react/no-array-index-key
                  key={cellIndex}
                  className="px-5 py-4 align-top text-conteo-dark/85"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

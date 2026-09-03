import { cn } from '@/utils/cn';

// Renders as a real table on md+ screens, and a stacked card list on mobile,
// so admin tables never just overflow horizontally on small screens.
export default function Table({ columns, data, keyField = 'id', emptyState, isLoading, skeletonRows = 5 }) {
  if (!isLoading && (!data || data.length === 0)) {
    return emptyState || null;
  }

  return (
    <div className="w-full">
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto rounded-card border border-paper-line bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-paper-line bg-paper-dim/60">
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium text-ink/60">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-paper-line">
            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3.5">
                        <div className="skeleton h-4 w-full max-w-[140px] rounded-md" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row) => (
                  <tr key={row[keyField]} className="hover:bg-paper-dim/40 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className={cn('px-4 py-3.5 align-middle', col.className)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-28 w-full rounded-card" />
            ))
          : data.map((row) => (
              <div key={row[keyField]} className="rounded-card border border-paper-line bg-white p-4">
                {columns.map((col) => (
                  <div key={col.key} className="flex items-center justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
                    <span className="text-xs font-medium uppercase tracking-wide text-ink/40">{col.header}</span>
                    <span className="text-right text-sm text-ink">{col.render ? col.render(row) : row[col.key]}</span>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
}

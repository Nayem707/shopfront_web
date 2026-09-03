import { cn } from '@/utils/cn';

export default function Skeleton({ className }) {
  return <div className={cn('skeleton rounded-md', className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full rounded-card" />
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3.5 w-1/3" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4 w-full max-w-[140px]" />
        </td>
      ))}
    </tr>
  );
}

import { cn } from '@/utils/cn';

export default function Tabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn('flex gap-1 overflow-x-auto border-b border-paper-line', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors',
            active === tab.value ? 'text-ink' : 'text-ink/45 hover:text-ink/70'
          )}
        >
          {tab.label}
          {tab.count != null && (
            <span className="ml-1.5 text-xs text-ink/40">({tab.count})</span>
          )}
          {active === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-accent" />
          )}
        </button>
      ))}
    </div>
  );
}

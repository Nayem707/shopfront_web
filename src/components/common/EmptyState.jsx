import Button from './Button';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction, actionTo, className }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-paper-line bg-white/50 px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-dim">
          <Icon className="h-6 w-6 text-ink/40" />
        </div>
      )}
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink/55">{description}</p>}
      {actionLabel && (
        <Button as={actionTo ? 'a' : 'button'} href={actionTo} onClick={onAction} variant="primary" size="sm" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

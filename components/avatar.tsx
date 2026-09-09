import { cn } from '@/lib/utils';

export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('') || 'U';

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn('rounded-full border border-border object-cover', className ?? 'h-10 w-10')}
      />
    );
  }

  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full border border-border bg-tint font-semibold text-ink',
        className ?? 'h-10 w-10 text-sm',
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

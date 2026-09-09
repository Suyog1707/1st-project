import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-primary-foreground" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight">VideoTube</span>
    </Link>
  );
}

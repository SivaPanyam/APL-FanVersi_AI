interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ label, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-verse-600 border-t-energy-neon`}
        role="status"
        aria-label="loading"
      />
      {label && (
        <span className="text-xs font-medium text-ink-400 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}

type ErrorBannerProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorBanner({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-100"
    >
      <p className="font-medium text-red-200">{title}</p>
      <p className="mt-1 text-red-100/90">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-red-900/60 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-800/80"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

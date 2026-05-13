export function MatchCardSkeleton() {
  return (
    <div className="glass-card animate-pulse overflow-hidden">
      <div className="h-10 bg-white/5 border-b border-white/5" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-16 w-16 bg-ink-800/50 rounded-xl" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-24 bg-ink-800/50 rounded-lg" />
            <div className="h-4 w-16 bg-ink-800/50 rounded-md" />
          </div>
          <div className="h-16 w-16 bg-ink-800/50 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-24 bg-ink-800/50 rounded-full" />
          <div className="h-1.5 w-full bg-ink-800/50 rounded-full" />
        </div>
        <div className="h-16 w-full bg-ink-800/20 rounded-xl" />
        <div className="h-10 w-full bg-ink-800/50 rounded-lg" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  );
}

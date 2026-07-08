export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-border/60">
          <div className="skeleton aspect-square w-full" />
          <div className="flex flex-col gap-2 p-4">
            <div className="skeleton h-4 w-3/4 rounded-sm" />
            <div className="skeleton h-3 w-1/2 rounded-sm" />
            <div className="skeleton h-4 w-1/3 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

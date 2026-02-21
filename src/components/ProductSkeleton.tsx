export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-surface rounded-full w-16" />
        <div className="h-4 bg-surface rounded-full w-3/4" />
        <div className="h-3 bg-surface rounded-full w-24" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-surface rounded-full w-20" />
          <div className="w-9 h-9 bg-surface rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      <div className="h-4 bg-surface rounded w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-square bg-surface rounded-2xl" />
        <div className="space-y-4">
          <div className="h-3 bg-surface rounded w-20" />
          <div className="h-8 bg-surface rounded w-3/4" />
          <div className="h-4 bg-surface rounded w-32" />
          <div className="h-8 bg-surface rounded w-28" />
          <div className="h-20 bg-surface rounded" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-8 bg-surface rounded-full w-24" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

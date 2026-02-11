'use client';

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded"></div>
        <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded w-5/6"></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-20 bg-dark-800 dark:bg-dark-700 rounded"></div>
        <div className="h-20 bg-dark-800 dark:bg-dark-700 rounded"></div>
        <div className="h-20 bg-dark-800 dark:bg-dark-700 rounded"></div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-6 bg-dark-800 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded"></div>
        <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded w-5/6"></div>
        <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="w-12 h-12 bg-dark-800 dark:bg-dark-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-dark-800 dark:bg-dark-700 rounded w-3/4"></div>
            <div className="h-3 bg-dark-800 dark:bg-dark-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

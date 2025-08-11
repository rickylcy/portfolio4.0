export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-16 animate-pulse">
      <div className="h-8 w-52 rounded bg-gray-200 dark:bg-zinc-800" />
      <div className="mt-4 h-4 w-80 rounded bg-gray-200 dark:bg-zinc-800" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl bg-gray-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    </div>
  );
}

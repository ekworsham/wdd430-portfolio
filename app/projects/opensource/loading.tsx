export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="space-y-10">
      <section className="space-y-4">
        <div className="h-10 w-72 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full max-w-3xl rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-4/5 max-w-2xl rounded bg-gray-200 animate-pulse" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="h-24 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-24 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-24 rounded-lg bg-gray-200 animate-pulse" />
      </section>

      <section className="space-y-4">
        <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="grid gap-4">
          <div className="h-28 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-28 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-28 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </section>
    </main>
  );
}

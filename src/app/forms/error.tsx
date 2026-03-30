"use client";

export default function FormsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/60 dark:bg-rose-950/40">
      <p className="text-sm text-rose-700 dark:text-rose-300">Failed to load forms.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white dark:bg-rose-500 dark:text-slate-900 dark:hover:bg-rose-400"
      >
        Retry
      </button>
    </div>
  );
}

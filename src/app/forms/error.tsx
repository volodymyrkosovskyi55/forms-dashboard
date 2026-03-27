"use client";

export default function FormsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
      <p className="text-sm text-rose-700">Failed to load forms.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
      >
        Retry
      </button>
    </div>
  );
}

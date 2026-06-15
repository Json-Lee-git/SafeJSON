"use client";

import { formatBytes } from "../hooks/useJsonWorker";

export default function LocalProcessingNote({
  processing,
  sizeBytes,
}: {
  processing?: boolean;
  sizeBytes?: number;
}) {
  const showProgress = Boolean(processing && sizeBytes && sizeBytes > 1024 * 1024);

  return (
    <div className="border-b border-zinc-800 bg-zinc-950/40 px-4 py-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          Handles files locally in your browser - no pasted-content upload.
        </p>
        {showProgress && (
          <p className="text-xs text-emerald-400">
            Parsing {formatBytes(sizeBytes || 0)} JSON file...
          </p>
        )}
      </div>
      {showProgress && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-400" />
        </div>
      )}
    </div>
  );
}

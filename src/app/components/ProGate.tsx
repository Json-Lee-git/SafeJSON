"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 5;
const DEV_KEY = "safejson_dev";

function getUsageKey(tool: string): string {
  return `safejson_usage_${tool}`;
}

export function useProUsage(tool: string) {
  const [count, setCount] = useState(0);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(getUsageKey(tool));
    setCount(stored ? parseInt(stored, 10) : 0);
    setIsDev(localStorage.getItem(DEV_KEY) === "1");
  }, [tool]);

  const increment = () => {
    const next = count + 1;
    localStorage.setItem(getUsageKey(tool), String(next));
    setCount(next);
  };

  const isOverLimit = !isDev && count >= FREE_LIMIT;

  return { count, increment, isOverLimit, limit: FREE_LIMIT, isDev };
}

export function ProBanner({ tool }: { tool: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(localStorage.getItem(DEV_KEY) === "1");

    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        const next = localStorage.getItem(DEV_KEY) !== "1";
        localStorage.setItem(DEV_KEY, next ? "1" : "0");
        setIsDev(next);
        if (next) setDismissed(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (dismissed || isDev) return null;

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-400/5 border border-emerald-400/10 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full shrink-0">
          Pro
        </span>
        <span className="text-xs text-zinc-400">
          {tool} is a Pro feature. Free for occasional use, unlimited with Pro.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/pricing"
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Get Pro — $5/mo
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 5;
const DEV_KEY = "safejson_dev";
const PRO_KEY = "safejson_pro_unlocked";
const PRO_REF_KEY = "safejson_pro_reference";

function getUsageKey(tool: string): string {
  return `safejson_usage_${tool}`;
}

function readUsage(tool: string): number {
  if (typeof window === "undefined") return 0;
  const stored = window.localStorage.getItem(getUsageKey(tool));
  const parsed = stored ? parseInt(stored, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function readUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.localStorage.getItem(PRO_KEY) === "1" ||
    window.localStorage.getItem(DEV_KEY) === "1"
  );
}

export function useProUsage(tool: string) {
  const [count, setCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setCount(readUsage(tool));
      setIsUnlocked(readUnlocked());
    }, 0);

    return () => window.clearTimeout(handle);
  }, [tool]);

  const increment = () => {
    const next = Math.max(count, readUsage(tool)) + 1;
    window.localStorage.setItem(getUsageKey(tool), String(next));
    setCount(next);
  };

  const canUse = isUnlocked || count < FREE_LIMIT;
  const isOverLimit = !isUnlocked && count >= FREE_LIMIT;
  const remaining = isUnlocked ? Infinity : Math.max(FREE_LIMIT - count, 0);

  return {
    count,
    increment,
    canUse,
    isOverLimit,
    limit: FREE_LIMIT,
    remaining,
    isUnlocked,
  };
}

export function ProBanner({ tool }: { tool: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setIsUnlocked(readUnlocked());

      // Check URL param: any page with ?dev activates developer mode
      if (window.location.search.includes("dev")) {
        window.localStorage.setItem(DEV_KEY, "1");
        setIsUnlocked(true);
        setDismissed(true);
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  if (dismissed || isUnlocked) return null;

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
          Get Pro - $5/mo
        </Link>
        <Link
          href="/unlock"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Unlock
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

export function ProLimitNotice({
  tool,
  remaining,
  limit,
  isUnlocked,
}: {
  tool: string;
  remaining: number;
  limit: number;
  isUnlocked: boolean;
}) {
  if (isUnlocked) {
    return (
      <div className="mb-4 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-4 py-3 text-xs text-emerald-300">
        Pro unlocked in this browser. {tool} is unlimited.
      </div>
    );
  }

  if (remaining > 0) {
    return (
      <div className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-xs text-zinc-500">
        {tool}: {remaining} of {limit} free runs left in this browser.
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-4">
      <p className="text-sm font-semibold text-amber-300">
        Free {tool} runs used up
      </p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
        Upgrade to Pro for unlimited Diff, JWT, JSONPath, and Schema tools. All
        processing still happens locally in your browser.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href="/pricing"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400"
        >
          Get Pro
        </Link>
        <Link
          href="/unlock"
          className="text-xs font-medium text-zinc-400 hover:text-zinc-200"
        >
          Already paid? Unlock this browser
        </Link>
      </div>
    </div>
  );
}

export function unlockPro(reference: string) {
  const normalized = reference.trim();
  if (normalized.length < 4) {
    return false;
  }
  window.localStorage.setItem(PRO_KEY, "1");
  window.localStorage.setItem(PRO_REF_KEY, normalized);
  return true;
}

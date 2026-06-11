"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { unlockPro } from "../components/ProGate";

export default function UnlockPage() {
  const [reference, setReference] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("paid") === "1") {
        setReference(params.get("ref") || "");
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  function handleUnlock() {
    setError("");
    if (!unlockPro(reference)) {
      setError("Enter the order email or license key from your purchase.");
      return;
    }
    setUnlocked(true);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80"
          >
            <span className="text-emerald-400">{`{`}</span>
            SafeJSON
            <span className="text-emerald-400">{`}`}</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            SafeJSON Pro
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Unlock Pro in this browser
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Enter the email or license key from your Lemon Squeezy purchase.
            SafeJSON stores the unlock locally in this browser so Pro tools stay
            100% client-side.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          {unlocked ? (
            <div>
              <p className="text-sm font-semibold text-emerald-300">
                Pro is unlocked in this browser.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                You can now use Diff, JWT, JSONPath, and Schema without the free
                run limit.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/diff"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Open Diff
                </Link>
                <Link
                  href="/"
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500"
                >
                  Back to Formatter
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor="purchase-reference"
                className="text-sm font-medium text-zinc-300"
              >
                Order email or license key
              </label>
              <input
                id="purchase-reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="you@example.com or LS-..."
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-400 focus:outline-none"
              />
              {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
              <button
                onClick={handleUnlock}
                className="mt-4 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Unlock Pro
              </button>
              <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                Early access note: account sync and automated license checks are
                not required for local processing. If you switch browsers,
                unlock again with the same purchase reference.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/20 p-5">
          <p className="text-sm font-semibold text-zinc-300">
            Not purchased yet?
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Pro is $5/month or $39/year. Payment is handled by Lemon Squeezy;
            SafeJSON never sees your payment details.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            View pricing
          </Link>
        </div>
      </main>
    </div>
  );
}

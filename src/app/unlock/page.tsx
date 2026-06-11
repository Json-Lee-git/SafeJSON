"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  activateProLicense,
  validateStoredProLicense,
  type ProLicenseResult,
} from "../components/ProGate";

export default function UnlockPage() {
  const [licenseKey, setLicenseKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [paidReturn, setPaidReturn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProLicenseResult | null>(null);

  useEffect(() => {
    let active = true;
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("paid") === "1") {
        setPaidReturn(true);
      }

      validateStoredProLicense()
        .then((valid) => {
          if (active && valid) setUnlocked(true);
        })
        .catch(() => {});
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(handle);
    };
  }, []);

  async function handleUnlock() {
    setError("");
    setResult(null);
    setLoading(true);

    const activation = await activateProLicense(licenseKey).catch(() => ({
      ok: false,
      error: "Could not reach the license server. Try again in a moment.",
    }));

    setLoading(false);

    if (!activation.ok) {
      setError(activation.error || "This license could not be activated.");
      return;
    }

    setResult(activation);
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
            Enter the license key from your Lemon Squeezy purchase. SafeJSON
            activates this browser as one device, then stores the unlock locally
            so Pro tools stay client-side.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          {paidReturn && !unlocked && (
            <div className="mb-5 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3">
              <p className="text-sm font-semibold text-emerald-300">
                Payment complete.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Lemon Squeezy will send your license key by email. Paste it
                below to activate this browser.
              </p>
            </div>
          )}

          {unlocked ? (
            <div>
              <p className="text-sm font-semibold text-emerald-300">
                SafeJSON Pro is active in this browser.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                You can now use Diff, JWT, JSONPath, and Schema without the free
                run limit.
              </p>
              {result && (
                <p className="mt-3 text-xs text-zinc-600">
                  Activated as {result.instanceName || "this browser"}
                  {result.activationUsage && result.activationLimit
                    ? ` (${result.activationUsage}/${result.activationLimit} devices used)`
                    : ""}
                  .
                </p>
              )}
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
                Lemon Squeezy license key
              </label>
              <input
                id="purchase-reference"
                value={licenseKey}
                onChange={(event) => setLicenseKey(event.target.value)}
                placeholder="Paste your license key"
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-400 focus:outline-none"
              />
              {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
              <button
                onClick={handleUnlock}
                disabled={loading}
                className="mt-4 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Activating..." : "Activate Pro"}
              </button>
              <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                Each license can be activated on up to 2 devices. If you switch
                browsers, paste the same license key again to activate the new
                browser.
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

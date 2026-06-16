"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "./analytics";

const FREE_LIMIT = 5;
const DEV_KEY = "safejson_dev";
const PRO_KEY = "safejson_pro_unlocked";
const LICENSE_KEY = "safejson_pro_license_key";
const INSTANCE_ID_KEY = "safejson_pro_instance_id";
const INSTANCE_NAME_KEY = "safejson_pro_instance_name";
const LICENSE_STATUS_KEY = "safejson_pro_license_status";
const LICENSE_LAST_VALIDATED_KEY = "safejson_pro_last_validated";
const VALIDATION_TTL_MS = 12 * 60 * 60 * 1000;
const DEV_UNLOCK_ENABLED = process.env.NODE_ENV === "development";

export type ProLicenseResult = {
  ok: boolean;
  error?: string;
  instanceName?: string;
  activationUsage?: number | null;
  activationLimit?: number | null;
  variantName?: string;
  expiresAt?: string | null;
};

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

  if (DEV_UNLOCK_ENABLED && window.localStorage.getItem(DEV_KEY) === "1") {
    return true;
  }

  if (window.localStorage.getItem(PRO_KEY) !== "1") {
    return false;
  }

  if (
    !window.localStorage.getItem(LICENSE_KEY) ||
    !window.localStorage.getItem(INSTANCE_ID_KEY)
  ) {
    return false;
  }

  if (window.localStorage.getItem(LICENSE_STATUS_KEY) !== "active") {
    return false;
  }

  const lastValidated = parseInt(
    window.localStorage.getItem(LICENSE_LAST_VALIDATED_KEY) || "0",
    10
  );

  return Date.now() - lastValidated < VALIDATION_TTL_MS;
}

function makeInstanceName() {
  if (typeof window === "undefined") {
    return "SafeJSON Browser";
  }

  const stored = window.localStorage.getItem(INSTANCE_NAME_KEY);
  if (stored) return stored;

  const suffix =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  const platform = window.navigator.platform || "Browser";
  const name = `SafeJSON ${platform} ${suffix}`;
  window.localStorage.setItem(INSTANCE_NAME_KEY, name);
  return name;
}

function storeLicense(
  licenseKey: string,
  result: {
    licenseStatus?: string;
    instance?: { id?: string; name?: string } | null;
    validatedAt?: string;
  }
) {
  window.localStorage.setItem(PRO_KEY, "1");
  window.localStorage.setItem(LICENSE_KEY, licenseKey);
  window.localStorage.setItem(
    LICENSE_STATUS_KEY,
    result.licenseStatus || "active"
  );
  window.localStorage.setItem(
    LICENSE_LAST_VALIDATED_KEY,
    String(result.validatedAt ? Date.parse(result.validatedAt) : Date.now())
  );

  if (result.instance?.id) {
    window.localStorage.setItem(INSTANCE_ID_KEY, result.instance.id);
  }

  if (result.instance?.name) {
    window.localStorage.setItem(INSTANCE_NAME_KEY, result.instance.name);
  }
}

function lockStoredLicense() {
  window.localStorage.removeItem(PRO_KEY);
  window.localStorage.setItem(LICENSE_STATUS_KEY, "inactive");
  window.localStorage.removeItem(LICENSE_LAST_VALIDATED_KEY);
}

async function readJson(response: Response) {
  return response.json().catch(() => ({}));
}

export async function activateProLicense(
  licenseKey: string
): Promise<ProLicenseResult> {
  const normalized = licenseKey.trim();

  if (normalized.length < 8) {
    return { ok: false, error: "Enter a valid Lemon Squeezy license key." };
  }

  const response = await fetch("/api/lemonsqueezy/license/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      licenseKey: normalized,
      instanceName: makeInstanceName(),
    }),
  });

  const data = await readJson(response);

  if (!response.ok || !data.valid) {
    lockStoredLicense();
    return {
      ok: false,
      error:
        typeof data.error === "string"
          ? data.error
          : "This license could not be activated.",
    };
  }

  storeLicense(normalized, data);

  return {
    ok: true,
    instanceName: data.instance?.name,
    activationUsage: data.activationUsage,
    activationLimit: data.activationLimit,
    variantName: data.variant?.name,
    expiresAt: data.expiresAt,
  };
}

export async function validateStoredProLicense(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const licenseKey = window.localStorage.getItem(LICENSE_KEY);
  const instanceId = window.localStorage.getItem(INSTANCE_ID_KEY);

  if (!licenseKey || !instanceId) {
    lockStoredLicense();
    return false;
  }

  const response = await fetch("/api/lemonsqueezy/license/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ licenseKey, instanceId }),
  });

  const data = await readJson(response);

  if (!response.ok || !data.valid) {
    lockStoredLicense();
    return false;
  }

  storeLicense(licenseKey, data);
  return true;
}

export function useProUsage(tool: string) {
  const [count, setCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    let active = true;
    const handle = window.setTimeout(() => {
      const storedUsage = readUsage(tool);
      const storedUnlocked = readUnlocked();

      setCount(storedUsage);
      setIsUnlocked(storedUnlocked);
      trackEvent("pro_tool_viewed", {
        tool,
        pro_unlocked: storedUnlocked,
        free_usage_count: storedUsage,
      });

      validateStoredProLicense()
        .then((valid) => {
          if (active) setIsUnlocked(valid || readUnlocked());
        })
        .catch(() => {
          if (active) setIsUnlocked(readUnlocked());
        });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(handle);
    };
  }, [tool]);

  const increment = () => {
    const next = Math.max(count, readUsage(tool)) + 1;
    window.localStorage.setItem(getUsageKey(tool), String(next));
    setCount(next);
    trackEvent("tool_run", {
      tool,
      pro_unlocked: isUnlocked,
      free_usage_count: next,
    });

    if (!isUnlocked && next === FREE_LIMIT) {
      trackEvent("pro_limit_reached", {
        tool,
        free_limit: FREE_LIMIT,
      });
    }
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

      // Developer-only escape hatch for local testing. Never unlocks production.
      if (
        DEV_UNLOCK_ENABLED &&
        new URLSearchParams(window.location.search).has("dev")
      ) {
        window.localStorage.setItem(DEV_KEY, "1");
        setIsUnlocked(true);
        setDismissed(true);
      }
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  if (dismissed || isUnlocked) return null;

  return (
    <div className="flex flex-col gap-3 px-4 py-2.5 bg-emerald-400/5 border border-emerald-400/10 rounded-lg sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full shrink-0">
          Pro
        </span>
        <span className="text-xs text-zinc-400">
          {tool} is a Pro feature. Free for occasional use, unlimited with Pro.
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <Link
          href="/pricing"
          onClick={() =>
            trackEvent("pro_banner_pricing_click", { tool })
          }
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Get Pro - $5/mo
        </Link>
        <Link
          href="/unlock"
          onClick={() => trackEvent("pro_banner_unlock_click", { tool })}
          className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Unlock
        </Link>
        <button
          onClick={() => {
            setDismissed(true);
            trackEvent("pro_banner_dismiss", { tool });
          }}
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
        Upgrade to Pro for Diff, JWT, JSONPath, and Schema workflows with no
        pasted-content upload for core tools.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href="/pricing"
          onClick={() => trackEvent("pro_limit_pricing_click", { tool })}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400"
        >
          Get Pro
        </Link>
        <Link
          href="/unlock"
          onClick={() => trackEvent("pro_limit_unlock_click", { tool })}
          className="text-xs font-medium text-zinc-400 hover:text-zinc-200"
        >
          Already paid? Unlock this browser
        </Link>
      </div>
    </div>
  );
}

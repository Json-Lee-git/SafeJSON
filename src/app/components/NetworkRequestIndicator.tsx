"use client";

import { useEffect, useRef, useState } from "react";

export default function NetworkRequestIndicator() {
  const [uploadCount, setUploadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    const originalFetch = window.fetch;
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    let activationTimer: number | undefined;

    const activate = () => {
      activationTimer = window.setTimeout(() => {
        activeRef.current = true;
      }, 1000);
    };

    const shouldCountUpload = (
      method: string | undefined,
      resource: RequestInfo | URL | string | undefined
    ) => {
      if (!activeRef.current) return false;

      const rawUrl =
        typeof resource === "string"
          ? resource
          : resource instanceof URL
            ? resource.href
            : resource?.url;

      const normalizedMethod = method?.toUpperCase() || "GET";
      if (normalizedMethod === "GET" || normalizedMethod === "HEAD") {
        return false;
      }

      try {
        const url = new URL(rawUrl || window.location.href, window.location.href);
        if (url.hostname.includes("google-analytics.com")) return false;
        if (url.hostname.includes("googletagmanager.com")) return false;

        if (url.origin === window.location.origin) {
          if (url.pathname.startsWith("/_next/")) return false;
          if (url.searchParams.has("_rsc")) return false;
          if (url.search.includes("__flight__")) return false;
        }
      } catch {
        return true;
      }

      return true;
    };

    window.fetch = (...args) => {
      const resource = args[0];
      const init = args[1];
      const method =
        init?.method ||
        (resource instanceof Request ? resource.method : undefined);

      if (shouldCountUpload(method, resource)) {
        setUploadCount((count) => count + 1);
      }
      return originalFetch(...args);
    };

    XMLHttpRequest.prototype.open = function patchedOpen(
      this: XMLHttpRequest & { __safejsonMethod?: string; __safejsonUrl?: string },
      method: string,
      url: string | URL,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ) {
      this.__safejsonMethod = method;
      this.__safejsonUrl = String(url);
      return originalOpen.call(this, method, url, async ?? true, username, password);
    };

    XMLHttpRequest.prototype.send = function patchedSend(
      this: XMLHttpRequest & { __safejsonMethod?: string; __safejsonUrl?: string },
      body?: Document | XMLHttpRequestBodyInit | null
    ) {
      if (shouldCountUpload(this.__safejsonMethod, this.__safejsonUrl)) {
        setUploadCount((count) => count + 1);
      }
      return originalSend.call(this, body);
    };

    if (document.readyState === "complete") {
      activate();
    } else {
      window.addEventListener("load", activate, { once: true });
    }

    return () => {
      if (activationTimer) window.clearTimeout(activationTimer);
      window.removeEventListener("load", activate);
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.open = originalOpen;
      XMLHttpRequest.prototype.send = originalSend;
    };
  }, []);

  const safe = uploadCount === 0;

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div
          className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs ${
            safe
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
              : "border-amber-400/20 bg-amber-400/10 text-amber-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              safe ? "bg-emerald-400" : "bg-amber-300"
            }`}
          />
          {uploadCount} data upload requests
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-10 rounded px-2 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          How to verify?
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="network-verify-title"
        >
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="network-verify-title"
                  className="text-base font-semibold text-zinc-100"
                >
                  Verify SafeJSON yourself
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Open DevTools -&gt; Network tab -&gt; paste JSON -&gt; format
                  or view it. You should not see any request containing your
                  pasted JSON while it is processed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-10 min-w-10 rounded-lg px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
                aria-label="Close verification guide"
              >
                x
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs leading-relaxed text-zinc-400">
              For an even stronger test, switch DevTools Network to Offline
              after this page loads. SafeJSON keeps formatting locally because
              pasted JSON is not uploaded.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const LOAD_DELAY_MS = 4500;
const SCRIPT_ID = "safejson-gtag";

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });
}

export default function LazyGoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    if (!gaId || document.getElementById(SCRIPT_ID)) return;

    let loaded = false;
    const controller = new AbortController();

    const load = () => {
      if (loaded || document.getElementById(SCRIPT_ID)) return;
      loaded = true;
      window.clearTimeout(timer);

      ensureGtagQueue();
      window.gtag?.("js", new Date());
      window.gtag?.("config", gaId, { send_page_view: true });

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        gaId,
      )}`;
      document.head.appendChild(script);
    };

    const passiveOptions = {
      once: true,
      passive: true,
      signal: controller.signal,
    };

    window.addEventListener("pointerdown", load, passiveOptions);
    window.addEventListener("touchstart", load, passiveOptions);
    window.addEventListener("scroll", load, passiveOptions);
    window.addEventListener("keydown", load, {
      once: true,
      signal: controller.signal,
    });
    const timer = window.setTimeout(load, LOAD_DELAY_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [gaId]);

  return null;
}

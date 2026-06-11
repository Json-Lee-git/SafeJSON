"use client";

import { sendGAEvent } from "@next/third-parties/google";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function inputSizeBucket(text: string): string {
  const bytes = new TextEncoder().encode(text).length;

  if (bytes < 1_024) return "<1kb";
  if (bytes < 100 * 1_024) return "1kb-100kb";
  if (bytes < 1024 * 1024) return "100kb-1mb";
  if (bytes < 10 * 1024 * 1024) return "1mb-10mb";
  return "10mb+";
}

export function trackEvent(
  name: string,
  params: AnalyticsParams = {},
): void {
  if (typeof window === "undefined") return;

  sendGAEvent("event", name, {
    app: "safejson",
    ...params,
  });
}

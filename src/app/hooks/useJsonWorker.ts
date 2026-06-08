"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JsonValue } from "../components/JsonTreeView";

type WorkerAction = "parse" | "format";

type JsonWorkerResult = {
  data: JsonValue;
  formatted: string;
};

export type JsonWorkerState = {
  processing: boolean;
  error: string | null;
  result: JsonWorkerResult | null;
  sizeBytes: number;
};

const workerSource = `
self.onmessage = (event) => {
  const { id, action, input } = event.data;
  try {
    const data = JSON.parse(input);
    self.postMessage({
      id,
      ok: true,
      data,
      formatted: action === "format" ? JSON.stringify(data, null, 2) : ""
    });
  } catch (error) {
    let message = error instanceof Error ? error.message : String(error);
    const match = message.match(/at position (\\d+)/);
    if (match) {
      const position = Number(match[1]);
      const lines = input.slice(0, position).split("\\n");
      message = "Line " + lines.length + ", Column " + (lines[lines.length - 1].length + 1) + ": " + message;
    }
    self.postMessage({
      id,
      ok: false,
      error: message
    });
  }
};
`;

function createWorker() {
  const blob = new Blob([workerSource], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  URL.revokeObjectURL(url);
  return worker;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function useJsonWorker() {
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const [state, setState] = useState<JsonWorkerState>({
    processing: false,
    error: null,
    result: null,
    sizeBytes: 0,
  });

  const run = useCallback((action: WorkerAction, input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      setState({
        processing: false,
        error: null,
        result: null,
        sizeBytes: 0,
      });
      return;
    }

    if (!workerRef.current) {
      workerRef.current = createWorker();
    }

    const worker = workerRef.current;
    const id = requestIdRef.current + 1;
    requestIdRef.current = id;

    setState({
      processing: true,
      error: null,
      result: null,
      sizeBytes: new Blob([input]).size,
    });

    worker.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        id: number;
        ok: boolean;
        data?: JsonValue;
        formatted?: string;
        error?: string;
      };

      if (message.id !== requestIdRef.current) return;

      if (message.ok && message.data !== undefined) {
        setState({
          processing: false,
          error: null,
          result: {
            data: message.data,
            formatted: message.formatted || "",
          },
          sizeBytes: new Blob([input]).size,
        });
        return;
      }

      setState({
        processing: false,
        error: message.error || "Invalid JSON",
        result: null,
        sizeBytes: new Blob([input]).size,
      });
    };

    worker.onerror = (event) => {
      if (id !== requestIdRef.current) return;
      setState({
        processing: false,
        error: event.message || "JSON worker failed",
        result: null,
        sizeBytes: new Blob([input]).size,
      });
    };

    worker.postMessage({ id, action, input });
  }, []);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    setState({
      processing: false,
      error: null,
      result: null,
      sizeBytes: 0,
    });
  }, []);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  return { state, run, reset };
}

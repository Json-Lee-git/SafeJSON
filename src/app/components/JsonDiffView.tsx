"use client";

import { useMemo } from "react";

type DiffValue =
  | string
  | number
  | boolean
  | null
  | DiffValue[]
  | { [key: string]: DiffValue };

type DiffEntry = {
  key: string;
  type: "unchanged" | "added" | "removed" | "changed";
  left?: DiffValue;
  right?: DiffValue;
  children?: DiffEntry[];
};

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  )
    return false;
  const ka = Object.keys(a as object);
  const kb = Object.keys(b as object);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}

function computeDiff(
  left: DiffValue | undefined,
  right: DiffValue | undefined
): DiffEntry[] {
  const leftObj =
    left && typeof left === "object" && !Array.isArray(left)
      ? (left as Record<string, DiffValue>)
      : {};
  const rightObj =
    right && typeof right === "object" && !Array.isArray(right)
      ? (right as Record<string, DiffValue>)
      : {};

  const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);
  const result: DiffEntry[] = [];

  for (const key of [...allKeys].sort()) {
    const hasLeft = key in leftObj;
    const hasRight = key in rightObj;

    if (hasLeft && !hasRight) {
      result.push({ key, type: "removed", left: leftObj[key] });
    } else if (!hasLeft && hasRight) {
      result.push({ key, type: "added", right: rightObj[key] });
    } else if (hasLeft && hasRight) {
      const lv = leftObj[key];
      const rv = rightObj[key];
      if (deepEqual(lv, rv)) {
        result.push({ key, type: "unchanged", left: lv, right: rv });
      } else {
        const entry: DiffEntry = {
          key,
          type: "changed",
          left: lv,
          right: rv,
        };
        // If both are objects, drill down
        if (
          lv !== null &&
          rv !== null &&
          typeof lv === "object" &&
          typeof rv === "object" &&
          !Array.isArray(lv) &&
          !Array.isArray(rv)
        ) {
          entry.children = computeDiff(lv, rv);
        }
        result.push(entry);
      }
    }
  }

  return result;
}

function formatDiffValue(value: DiffValue | undefined): string {
  if (value === undefined) return "-";
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  return JSON.stringify(value);
}

function typeColor(type: DiffEntry["type"]): string {
  switch (type) {
    case "added":
      return "text-emerald-400";
    case "removed":
      return "text-red-400";
    case "changed":
      return "text-amber-400";
    default:
      return "text-zinc-400";
  }
}

function DiffRow({ entry, depth = 0 }: { entry: DiffEntry; depth?: number }) {
  const indent = depth * 20;

  return (
    <>
      <div
        className={`flex items-start font-mono text-sm leading-6 hover:bg-white/[0.02] rounded px-1 -mx-1`}
        style={{ paddingLeft: indent + 4 }}
      >
        {/* Left value */}
        <span className="w-[44%] shrink-0 pr-2 truncate">
          {entry.type === "added" ? (
            <span className="text-zinc-700">-</span>
          ) : (
            <span className={typeColor(entry.type)}>
              {formatDiffValue(entry.left)}
            </span>
          )}
        </span>
        {/* Key */}
        <span className="shrink-0 text-purple-400 w-[12%] pr-2 truncate text-right">
          {entry.key}
        </span>
        {/* Right value */}
        <span className="flex-1 truncate">
          {entry.type === "removed" ? (
            <span className="text-zinc-700">-</span>
          ) : (
            <span className={typeColor(entry.type)}>
              {formatDiffValue(entry.right)}
            </span>
          )}
        </span>
      </div>
      {entry.children?.map((child) => (
        <DiffRow key={child.key} entry={child} depth={depth + 1} />
      ))}
    </>
  );
}

interface JsonDiffViewProps {
  left: DiffValue;
  right: DiffValue;
}

export default function JsonDiffView({ left, right }: JsonDiffViewProps) {
  const diffs = useMemo(() => computeDiff(left, right), [left, right]);

  const stats = {
    added: diffs.filter((d) => d.type === "added").length,
    removed: diffs.filter((d) => d.type === "removed").length,
    changed: diffs.filter((d) => d.type === "changed").length,
    unchanged: diffs.filter((d) => d.type === "unchanged").length,
  };

  return (
    <div className="overflow-auto max-h-[600px]">
      {/* Stats bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">
        <span className="text-emerald-400">{stats.added} added</span>
        <span className="text-red-400">{stats.removed} removed</span>
        <span className="text-amber-400">{stats.changed} changed</span>
        <span>{stats.unchanged} unchanged</span>
      </div>

      {/* Column headers */}
      <div className="flex items-center px-1 py-2 border-b border-zinc-800/50 text-xs text-zinc-600 font-mono bg-zinc-900/30">
        <span className="w-[44%] shrink-0 pr-2 pl-2">LEFT (old)</span>
        <span className="shrink-0 w-[12%] pr-2 text-right">key</span>
        <span className="flex-1 pl-1">RIGHT (new)</span>
      </div>

      {/* Diff rows */}
      <div className="p-2">
        {diffs.map((entry) => (
          <DiffRow key={entry.key} entry={entry} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, memo } from "react";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface TreeNodeProps {
  keyName?: string;
  value: JsonValue;
  path: string;
  initiallyOpen?: boolean;
  depth?: number;
}

function getValueType(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function getTypeColor(type: string): string {
  switch (type) {
    case "string":
      return "text-emerald-400 dark:text-emerald-300";
    case "number":
      return "text-amber-400 dark:text-amber-300";
    case "boolean":
      return "text-cyan-400 dark:text-cyan-300";
    case "null":
      return "text-gray-400 dark:text-gray-500 italic";
    default:
      return "";
  }
}

function formatValue(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

function getCollapsedPreview(value: JsonValue, maxLen: number = 60): string {
  if (value === null) return "null";
  if (typeof value === "string") {
    const escaped = JSON.stringify(value);
    return escaped.length > maxLen ? escaped.slice(0, maxLen) + "...\"" : escaped;
  }
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (Array.isArray(value)) return `Array(${value.length})`;
  const keys = Object.keys(value);
  return `{${keys.length} ${keys.length === 1 ? "key" : "keys"}}`;
}

const TreeNode = memo(function TreeNode({
  keyName,
  value,
  path,
  initiallyOpen = false,
  depth = 0,
}: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(
    initiallyOpen || depth < 2
  );
  const type = getValueType(value);
  const isContainer = type === "array" || type === "object";
  const [copied, setCopied] = useState(false);

  const handleCopyPath = useCallback(async () => {
    if (!keyName) return;
    await navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [keyName, path]);

  const handleCopyValue = useCallback(async () => {
    if (isContainer) return;
    await navigator.clipboard.writeText(formatValue(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [value, isContainer]);

  if (!isContainer) {
    // Primitive value (string, number, boolean, null)
    return (
      <div className="flex items-center gap-1 font-mono text-sm leading-6 hover:bg-white/5 rounded px-1 -mx-1 group">
        {keyName !== undefined && (
          <>
            <button
              onClick={handleCopyPath}
              className="text-purple-400 dark:text-purple-300 hover:underline cursor-pointer"
              title={`Copy path: ${path}`}
            >
              {keyName}
            </button>
            <span className="text-gray-500 dark:text-gray-600">:</span>
          </>
        )}
        <button
          onClick={handleCopyValue}
          className={`${getTypeColor(type)} cursor-pointer hover:opacity-80`}
          title="Click to copy"
        >
          {formatValue(value)}
        </button>
        {keyName === undefined && (
          <span className="text-gray-600 dark:text-gray-700">,</span>
        )}
        {copied && (
          <span className="text-xs text-emerald-400 animate-pulse">Copied!</span>
        )}
      </div>
    );
  }

  // Container (object or array)
  const entries =
    type === "array"
      ? (value as JsonValue[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, JsonValue>);

  const bracket = type === "array" ? ["[", "]"] : ["{", "}"];

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-1 hover:bg-white/5 rounded px-1 -mx-1 group">
        {keyName !== undefined && (
          <>
            <button
              onClick={handleCopyPath}
              className="text-purple-400 dark:text-purple-300 hover:underline cursor-pointer"
              title={`Copy path: ${path}`}
            >
              {keyName}
            </button>
            <span className="text-gray-500 dark:text-gray-600">:</span>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-300 cursor-pointer select-none w-4 text-center"
        >
          {isOpen ? "▾" : "▸"}
        </button>
        <span className="text-gray-500 dark:text-gray-400">{bracket[0]}</span>
        {!isOpen && (
          <span className="text-gray-500 dark:text-gray-500 text-xs italic">
            {getCollapsedPreview(value)}
          </span>
        )}
        {!isOpen && (
          <span className="text-gray-500 dark:text-gray-400">{bracket[1]}</span>
        )}
        {copied && (
          <span className="text-xs text-emerald-400 animate-pulse">Copied!</span>
        )}
      </div>

      {isOpen && (
        <div className="ml-4 border-l border-gray-700/50 dark:border-gray-300/10 pl-3">
          {entries.map(([k, v]) => (
            <TreeNode
              key={k}
              keyName={k}
              value={v}
              path={
                type === "array"
                  ? `${path}[${k}]`
                  : `${path}.${k}`
              }
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {isOpen && (
        <div className="text-gray-500 dark:text-gray-400 ml-0">
          {bracket[1]}
        </div>
      )}
    </div>
  );
});

interface JsonTreeViewProps {
  data: JsonValue;
}

export default function JsonTreeView({ data }: JsonTreeViewProps) {
  return (
    <div className="p-4 overflow-auto max-h-[600px]">
      <TreeNode value={data} path="$" />
    </div>
  );
}

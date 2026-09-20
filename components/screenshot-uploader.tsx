"use client";

import { useEffect, useRef, useState } from "react";
import { HiPhoto, HiXMark } from "react-icons/hi2";

import { MAX_SCREENSHOTS } from "@/lib/constants";
import { formatNumberAr } from "@/lib/formatters";
import {
  validateScreenshot,
  validateScreenshotCount,
} from "@/lib/ticket-schemas";
import { cn } from "@/lib/utils";

interface Pick {
  file: File;
  url: string;
}

export function ScreenshotUploader({ formPending }: { formPending: boolean }) {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const picksRef = useRef<Pick[]>([]);
  picksRef.current = picks;

  useEffect(() => {
    if (formPending) return;
    const dt = new DataTransfer();
    for (const p of picks) dt.items.add(p.file);
    if (inputRef.current) inputRef.current.files = dt.files;
  }, [picks, formPending]);

  useEffect(
    () => () => {
      for (const p of picksRef.current) URL.revokeObjectURL(p.url);
    },
    [],
  );

  function addFiles(list: FileList | null) {
    if (!list) return;
    const room = MAX_SCREENSHOTS - picks.length;
    const incoming = [...list];
    if (incoming.length > room) {
      setError(
        validateScreenshotCount(picks.length + incoming.length) ??
          "الحد الأقصى صورتان",
      );
    }
    const accepted: Pick[] = [];
    for (const file of incoming.slice(0, Math.max(room, 0))) {
      const fileError = validateScreenshot(file);
      if (fileError) {
        setError(`${file.name}: ${fileError}`);
        continue;
      }
      accepted.push({ file, url: URL.createObjectURL(file) });
    }
    if (accepted.length > 0) {
      setError(null);
      setPicks((prev) => [...prev, ...accepted]);
    }
  }

  function removePick(url: string) {
    setPicks((prev) => {
      const target = prev.find((p) => p.url === url);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.url !== url);
    });
    setError(null);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        name="screenshots"
        accept="image/*"
        multiple
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "border-border flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed px-3 py-6 text-sm transition-colors",
          dragging
            ? "border-accent bg-accent-soft text-accent"
            : "text-muted hover:border-accent hover:text-accent",
        )}
      >
        <HiPhoto className="size-6" aria-hidden="true" />
        <span>اسحب الصور هنا أو اضغط للاختيار</span>
        <span className="text-xs">
          حتى صورتين، ١٠ م.ب لكل صورة
          {picks.length > 0
            ? ` - تم اختيار ${formatNumberAr(picks.length)}`
            : null}
        </span>
      </button>
      {error ? <p className="text-danger mt-2 text-sm">{error}</p> : null}
      {picks.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {picks.map((p) => (
            <div
              key={p.url}
              className="border-border relative aspect-square overflow-hidden rounded-md border"
            >
              {/* biome-ignore lint/performance/noImgElement: object-URL preview, not a remote image */}
              <img
                src={p.url}
                alt={p.file.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePick(p.url)}
                aria-label={`إزالة ${p.file.name}`}
                className="bg-background/80 text-foreground hover:bg-danger absolute inset-e-1 top-1 flex size-6 cursor-pointer items-center justify-center rounded-md transition-colors hover:text-white"
              >
                <HiXMark className="size-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

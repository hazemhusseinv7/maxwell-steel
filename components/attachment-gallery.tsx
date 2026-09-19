"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { formatNumberAr } from "@/lib/formatters";

export function AttachmentGallery({ attachments }: { attachments: string[] }) {
  const [index, setIndex] = useState(-1);
  if (attachments.length === 0) return null;

  return (
    <>
      <span className="mt-2 flex flex-wrap gap-3">
        {attachments.map((url, i) => (
          <button
            key={url}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`عرض مرفق ${formatNumberAr(i + 1)}`}
            className="border-border cursor-zoom-in overflow-hidden rounded-none border transition-colors hover:border-accent"
          >
            <Image
              src={url}
              alt={`مرفق ${formatNumberAr(i + 1)}`}
              width={160}
              height={120}
              className="h-auto w-40 object-cover"
            />
          </button>
        ))}
      </span>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        on={{ view: ({ index: next }) => setIndex(next) }}
        slides={attachments.map((src, i) => ({
          src,
          description: `مرفق ${formatNumberAr(i + 1)}`,
        }))}
        plugins={[Zoom, Thumbnails, Counter, Download, Captions]}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        controller={{ closeOnBackdropClick: true }}
        thumbnails={{ position: "top" }}
        labels={{
          Previous: "السابق",
          Next: "التالي",
          Close: "إغلاق",
        }}
      />
    </>
  );
}

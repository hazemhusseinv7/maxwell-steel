import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og's default font cannot render Arabic - load Cairo from the repo.
async function arabicFont(): Promise<ArrayBuffer | null> {
  try {
    const path = join(process.cwd(), "public", "fonts", "Cairo.ttf");
    const data = await readFile(path);
    return data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const [post, fontData] = await Promise.all([
    getPostBySlug(slug),
    arabicFont(),
  ]);
  const title = post?.title ?? "مقرات";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#0f172a",
        color: "#ffffff",
        fontFamily: fontData ? "Cairo" : "sans-serif",
        direction: "rtl",
        padding: "80px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 16,
          backgroundColor: "#059669",
        }}
      />
      <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.4 }}>
        {title}
      </div>
      <div
        style={{ marginTop: 32, fontSize: 32, color: "#94a3b8" }}
      >{`${siteUrl()} · مقرات`}</div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: "Cairo", data: fontData, weight: 800, style: "normal" }]
        : undefined,
    },
  );
}

import { getYouTubeId } from "@/lib/constants";

export function PostVideo({
  fileUrl,
  youtubeUrl,
  caption,
}: {
  fileUrl?: string | null;
  youtubeUrl?: string | null;
  caption?: string | null;
}) {
  const youtubeId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;
  if (!fileUrl && !youtubeId) return null;
  return (
    <section aria-label="فيديو المقال" className="mt-10 space-y-4">
      {fileUrl ? (
        // biome-ignore lint/a11y/useMediaCaption: uploader-supplied files carry no timed text tracks
        <video
          className="w-full rounded-none"
          controls
          preload="metadata"
          playsInline
          src={fileUrl}
        />
      ) : null}
      {youtubeId ? (
        <div className="aspect-video w-full overflow-hidden rounded-none">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title="Youtube video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : null}
      {caption ? (
        <p className="text-muted text-center text-sm">{caption}</p>
      ) : null}
    </section>
  );
}

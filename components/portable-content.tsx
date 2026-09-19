import { Link } from "@heroui/react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { FaqAccordion } from "@/components/faq-accordion";
import { safeImageUrl } from "@/sanity/lib/image";
import type { PostBody } from "@/sanity/lib/queries";

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={value._key}
        className="font-display mt-10 scroll-mt-24 text-2xl leading-10 font-bold"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={value._key}
        className="font-display mt-8 scroll-mt-24 text-xl leading-9 font-bold"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display mt-6 text-lg leading-8 font-bold">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent bg-surface-tertiary text-foreground border-s-4 px-4 py-3">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-foreground leading-8">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 ps-6 pe-4 leading-8">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 ps-6 pe-4 leading-8">{children}</ol>
    ),
  },
  marks: {
    // biome-ignore lint/suspicious/noExplicitAny: PortableText mark props are loosely typed
    link: ({ children, value }: any) => (
      <Link href={value?.href ?? "#"} className="text-accent">
        {children}
      </Link>
    ),
    code: ({ children }) => (
      <code
        dir="ltr"
        className="bg-default-soft rounded px-1.5 py-0.5 text-[0.85em]"
      >
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = safeImageUrl(value, 1200, 80);
      if (!src) return null;
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="h-auto w-full rounded-none"
          />
          {value.alt ? (
            <figcaption className="text-muted mt-2 text-center text-sm">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    // biome-ignore lint/suspicious/noExplicitAny: PortableText block values are loosely typed
    faq: ({ value }: any) => (
      <FaqAccordion items={Array.isArray(value?.items) ? value.items : []} />
    ),
  },
};

export function PortableContent({ body }: { body: PostBody }) {
  return (
    <div className="space-y-5">
      <PortableText value={body as never} components={components} />
    </div>
  );
}

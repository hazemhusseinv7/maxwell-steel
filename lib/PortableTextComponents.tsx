import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import {
  PortableText as PortableTextRenderer,
  PortableTextComponents as PortableTextComponentsType,
} from "@portabletext/react";
import { cn } from "@/lib/utils";

export const PortableTextComponents: PortableTextComponentsType = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Image"}
            width={800}
            height={600}
            className="mx-auto rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 last:mb-0 dark:text-white">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="mt-8 mb-6 text-4xl font-bold first:mt-0 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-6 mb-4 text-3xl font-bold first:mt-0 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-5 mb-3 text-2xl font-bold first:mt-0 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-4 mb-2 text-xl font-bold first:mt-0 dark:text-white">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="mt-4 mb-2 text-lg font-bold first:mt-0 dark:text-white">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="mt-4 mb-2 text-base font-bold first:mt-0 dark:text-white">
        {children}
      </h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    "strike-through": ({ children }: any) => (
      <s className="line-through">{children}</s>
    ),
    code: ({ children }: any) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 list-disc pl-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-4 list-decimal pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
};

interface PortableTextProps {
  value: any;
  className?: string;
  components?: Partial<PortableTextComponentsType>;
}

export const PortableText = ({
  value,
  className,
  components,
}: PortableTextProps) => {
  return (
    <div
      className={cn("prose prose-lg dark:prose-invert max-w-none", className)}
    >
      <PortableTextRenderer
        value={value}
        components={{
          ...PortableTextComponents,
          ...components,
        }}
      />
    </div>
  );
};

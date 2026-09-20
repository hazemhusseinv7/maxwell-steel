import Image from "next/image";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";

export function ShowcaseImage() {
  return (
    <div className="relative mt-8">
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <div className="mx-auto w-full max-w-80 px-4">
        <Image
          alt="صورة تعريفية"
          src="/hero.png"
          width={1920}
          height={1832}
          sizes="(max-width: 1024px) 100vw, 320px"
          className="pointer-events-none h-auto w-full select-none"
        />
      </div>
      <FullWidthDivider contained className="-bottom-px" />
    </div>
  );
}

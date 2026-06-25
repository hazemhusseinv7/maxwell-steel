"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { GoChevronRight } from "react-icons/go";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from "@/components/ui/carousel";

interface ProductCardProps {
  name: string;
  slug: string;
  description?: string;
  images: string[];
  categories?: string[];
}

export default function ProductCard({
  name,
  slug,
  description,
  images,
  categories,
}: ProductCardProps) {
  const t = useTranslations("Products");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Link
      href={`/products/${slug}`}
      className="group rounded-xl bg-gray-200/70 p-5 transition hover:bg-gray-300/70 focus:bg-gray-100 focus:outline-hidden dark:bg-white/5 dark:hover:bg-white/20 dark:focus:bg-white/10"
    >
      <div className="relative aspect-16/10" dir="ltr">
        {images.length > 0 && (
          <Carousel className="size-full">
            <CarouselContent className="h-full">
              {images.map((image, i) => (
                <CarouselItem key={i}>
                  <Image
                    className="size-full rounded-xl object-cover"
                    width={400}
                    height={250}
                    src={image}
                    alt={`${name} - Image ${i + 1}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <div onClick={(e) => e.stopPropagation()}>
                  <CarouselNavigation alwaysShow />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CarouselIndicator />
                </div>
              </>
            )}
          </Carousel>
        )}
        {categories && categories.length > 0 && (
          <div dir={dir} className="absolute top-3 start-3 z-10 flex flex-wrap gap-1.5">
            {categories.slice(0, 2).map((cat, i) => (
              <span
                key={i}
                className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="mt-5 block text-xl text-gray-800 dark:text-neutral-300 dark:hover:text-white">
        {name}
      </span>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      <div className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
        {t("viewDetails")}
        <GoChevronRight className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1 group-focus:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-focus:translate-x-1" />
      </div>
    </Link>
  );
}

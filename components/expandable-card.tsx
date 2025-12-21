"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

export interface CardItem {
  name: string;
  description: string;
  images: string[];
  features?: string[];
  specifications?: string[];
}

export interface CardList {
  list: CardItem[];
}

export interface ExpandableCardProps {
  items: CardList[];
  className?: string;
}

export default function ExpandableCard({
  items,
  className,
}: ExpandableCardProps) {
  const t = useTranslations("Products");

  const [current, setCurrent] = useState<CardItem | null>(null);
  const ref = useOutsideClick(() => setCurrent(null));

  const truncateText = (text: string, maxLength: number = 170) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="relative z-20">
      <AnimatePresence>
        {current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/50 bg-opacity-10 pointer-events-none absolute inset-0 z-10 backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {current ? (
          <>
            <div className="fixed inset-0 z-20 mx-4 grid place-items-center">
              <motion.div
                className="bg-background flex h-fit w-full max-w-2xl cursor-pointer flex-col items-start gap-4 rounded-md border p-4 max-lg:max-h-[70%] max-lg:overflow-x-hidden max-lg:overflow-y-scroll lg:overflow-hidden"
                ref={ref}
                layoutId={`cardItem-${current.name}`}
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <motion.div
                    layoutId={`cardItemImage-${current.name}`}
                    className="h-40 w-full overflow-hidden rounded-[0.8rem] lg:h-60"
                  >
                    <div className="relative mx-auto size-full" dir="ltr">
                      <Carousel className="size-full">
                        <CarouselContent className="h-full">
                          {current.images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="flex h-full items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                <Image
                                  src={image}
                                  alt={`${current.name} - Image ${index + 1}`}
                                  width={400}
                                  height={400}
                                  className="pointer-events-none size-full object-cover"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselNavigation alwaysShow />
                        <CarouselIndicator />
                      </Carousel>
                    </div>
                  </motion.div>
                  <div className="flex max-w-[95%] grow items-center justify-between">
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex w-full flex-row justify-between gap-0.5">
                        <motion.div
                          className="text-primary-blue font-medium"
                          layoutId={`cardItemName-${current.name}`}
                        >
                          {current.name}
                        </motion.div>
                      </div>
                      <motion.p
                        layoutId={`cardItemDescription-${current.description}`}
                        className="text-primary-blue text-sm"
                      >
                        {current.description}
                      </motion.p>

                      {current.specifications &&
                        current.specifications.length > 0 && (
                          <motion.div
                            layoutId={`cardItemSpecifications-${current.name}`}
                            className="mt-4 px-4"
                          >
                            <h4 className="text-primary-blue mb-2">
                              {t("specifications")}:
                            </h4>
                            <motion.ul
                              className="list-disc space-y-1 ps-5"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {current.specifications.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="text-primary-blue text-sm"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                  {item}
                                </motion.li>
                              ))}
                            </motion.ul>
                          </motion.div>
                        )}

                      {current.features && current.features.length > 0 && (
                        <motion.div
                          layoutId={`cardItemFeatures-${current.name}`}
                          className="mt-4 px-4"
                        >
                          <h4 className="text-primary-blue mb-2">
                            {t("features")}:
                          </h4>
                          <motion.ul
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {current.features.map((item, index) => (
                              <motion.li
                                key={index}
                                className="bg-primary-blue flex items-center gap-1 rounded-full px-2 py-1 text-sm text-nowrap text-white"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                              >
                                <RiVerifiedBadgeFill />
                                <span> {item}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <div
        className={cn("relative flex flex-col items-center gap-14", className)}
      >
        {items.map((list, i) => (
          <div key={i} className="w-full">
            <div className="relative grid w-full gap-4 px-4 lg:grid-cols-2">
              {list.list.map((item) => (
                <motion.div
                  layoutId={`cardItem-${item.name}`}
                  key={item.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-background flex w-full cursor-pointer flex-col items-center gap-4 rounded-[8px] border p-2 text-xl font-semibold shadow-md md:p-4"
                >
                  <motion.div
                    layoutId={`cardItemImage-${item.name}`}
                    className="relative h-40 w-full overflow-hidden rounded-[0.7rem] lg:h-60"
                  >
                    <div className="relative mx-auto size-full" dir="ltr">
                      <Carousel className="size-full">
                        <CarouselContent className="h-full">
                          {item.images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="flex h-full items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                <Image
                                  src={image}
                                  alt={`${item.name} - Image ${index + 1}`}
                                  width={400}
                                  height={400}
                                  className="pointer-events-none size-full object-cover"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselNavigation alwaysShow />
                        <CarouselIndicator />
                      </Carousel>
                    </div>
                  </motion.div>
                  <div
                    className="flex w-full flex-col items-center justify-between gap-0.5 lg:items-start"
                    onClick={() => {
                      setCurrent(item);
                    }}
                  >
                    <motion.div
                      className="font-medium text-slate-800 max-lg:text-center max-lg:text-sm"
                      layoutId={`cardItemName-${item.name}`}
                    >
                      {item.name}
                    </motion.div>
                    <motion.div
                      className="text-sm font-light text-slate-700"
                      layoutId={`cardItemDescription-${item.description}`}
                    >
                      {truncateText(item.description)}
                    </motion.div>

                    <motion.div className="flex w-full justify-end">
                      <HiMiniArrowTopRightOnSquare className="text-primary-blue rtl:rotate-270" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  return ref;
};

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface CardItem {
  name: string;
  description: string;
  image: string;
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

  const truncateText = (text: string, maxLength: number = 120) => {
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
            className="pointer-events-none absolute inset-0 z-10 bg-background/50 bg-opacity-10 backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {current ? (
          <>
            <div className="fixed inset-0 z-10 grid place-items-center mx-4">
              <motion.div
                className="flex max-lg:max-h-[70%] h-fit w-full max-w-xl cursor-pointer flex-col items-start gap-4 max-lg:overflow-x-hidden max-lg:overflow-y-scroll lg:overflow-hidden rounded-md border bg-background p-4"
                ref={ref}
                layoutId={`cardItem-${current.name}`}
              >
                <div className="flex flex-col w-full items-start gap-4">
                  <motion.div
                    layoutId={`cardItemImage-${current.name}`}
                    className="w-full h-20 lg:h-40 rounded-[0.8rem] overflow-hidden"
                  >
                    <Image
                      src={current.image}
                      alt={current.name}
                      width={400}
                      height={400}
                      className="size-full object-cover"
                    />
                  </motion.div>
                  <div className="flex grow items-center justify-between">
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex w-full flex-row justify-between gap-0.5">
                        <motion.div
                          className="font-medium text-teal-800"
                          layoutId={`cardItemName-${current.name}`}
                        >
                          {current.name}
                        </motion.div>
                      </div>
                      <motion.p
                        layoutId={`cardItemDescription-${current.description}`}
                        className="text-sm text-teal-900"
                      >
                        {current.description}
                      </motion.p>

                      {current.features && current.features.length > 0 && (
                        <motion.div
                          layoutId={`cardItemFeatures-${current.name}`}
                          className="mt-4 px-4"
                        >
                          <h4 className="mb-2 text-teal-800">
                            {t("features")}:
                          </h4>
                          <motion.ul
                            className="space-y-1 pl-5 list-disc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {current.features.map((item, index) => (
                              <motion.li
                                key={index}
                                className="text-sm text-teal-900"
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

                      {current.specifications &&
                        current.specifications.length > 0 && (
                          <motion.div
                            layoutId={`cardItemSpecifications-${current.name}`}
                            className="mt-4 px-4"
                          >
                            <h4 className="mb-2 text-teal-800">
                              {t("specifications")}:
                            </h4>
                            <motion.ul
                              className="space-y-1 pl-5 list-disc"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {current.specifications.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="text-sm text-teal-900"
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
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "relative flex flex-col items-center gap-14 p-6",
          className
        )}
      >
        {items.map((list, i) => (
          <div key={i} className="w-full">
            <div className="relative w-full grid grid-cols-2 lg:grid-cols-2 gap-4 px-2">
              {list.list.map((item) => (
                <motion.div
                  layoutId={`cardItem-${item.name}`}
                  key={item.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col w-full cursor-pointer items-center gap-4 rounded-md border bg-background p-2 shadow-md md:p-4"
                  onClick={() => {
                    setCurrent(item);
                  }}
                >
                  <motion.div
                    layoutId={`cardItemImage-${item.name}`}
                    className="w-full h-20 lg:h-52 rounded-[0.8rem] overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="size-full object-cover"
                    />
                  </motion.div>
                  <div className="flex w-full flex-col items-center lg:items-start justify-between gap-0.5">
                    <motion.div
                      className="font-medium text-teal-800 max-lg:text-center max-lg:text-sm"
                      layoutId={`cardItemName-${item.name}`}
                    >
                      {item.name}
                    </motion.div>
                    <motion.div
                      className="max-lg:hidden text-xs text-teal-900"
                      layoutId={`cardItemDescription-${item.description}`}
                    >
                      {truncateText(item.description)}
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

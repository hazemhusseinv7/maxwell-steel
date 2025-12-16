"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RiVerifiedBadgeFill } from "react-icons/ri";

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

  const truncateText = (text: string, maxLength: number = 200) => {
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
            <div className="fixed inset-0 z-10 mx-4 grid place-items-center">
              <motion.div
                className="bg-background flex h-fit w-full max-w-xl cursor-pointer flex-col items-start gap-4 rounded-md border p-4 max-lg:max-h-[70%] max-lg:overflow-x-hidden max-lg:overflow-y-scroll lg:overflow-hidden"
                ref={ref}
                layoutId={`cardItem-${current.name}`}
              >
                <div className="flex w-full flex-col items-start gap-4">
                  <motion.div
                    layoutId={`cardItemImage-${current.name}`}
                    className="h-20 w-full overflow-hidden rounded-[0.8rem] lg:h-40"
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
                          className="font-medium text-blue-800"
                          layoutId={`cardItemName-${current.name}`}
                        >
                          {current.name}
                        </motion.div>
                      </div>
                      <motion.p
                        layoutId={`cardItemDescription-${current.description}`}
                        className="text-sm text-blue-900"
                      >
                        {current.description}
                      </motion.p>

                      {current.specifications &&
                        current.specifications.length > 0 && (
                          <motion.div
                            layoutId={`cardItemSpecifications-${current.name}`}
                            className="mt-4 px-4"
                          >
                            <h4 className="mb-2 text-blue-800">
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
                                  className="text-sm text-blue-900"
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
                          <h4 className="mb-2 text-blue-800">
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
                                className="flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 text-sm text-nowrap text-white"
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
        className={cn(
          "relative flex flex-col items-center gap-14 p-6",
          className,
        )}
      >
        {items.map((list, i) => (
          <div key={i} className="w-full">
            <div className="relative grid w-full grid-cols-2 gap-4 px-2 lg:grid-cols-2">
              {list.list.map((item) => (
                <motion.div
                  layoutId={`cardItem-${item.name}`}
                  key={item.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-background flex w-full cursor-pointer flex-col items-center gap-4 rounded-md border p-2 text-xl font-semibold shadow-md md:p-4"
                  onClick={() => {
                    setCurrent(item);
                  }}
                >
                  <motion.div
                    layoutId={`cardItemImage-${item.name}`}
                    className="h-20 w-full overflow-hidden rounded-[0.8rem] lg:h-52"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="size-full object-cover"
                    />
                  </motion.div>
                  <div className="flex w-full flex-col items-center justify-between gap-0.5 lg:items-start">
                    <motion.div
                      className="font-medium text-slate-800 max-lg:text-center max-lg:text-sm"
                      layoutId={`cardItemName-${item.name}`}
                    >
                      {item.name}
                    </motion.div>
                    <motion.div
                      className="text-sm font-light text-slate-700 max-lg:hidden"
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

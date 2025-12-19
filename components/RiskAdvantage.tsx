"use client";

import { useState } from "react";
import Image from "next/image";

import { Card, CardHeader, CardBody, Switch } from "@heroui/react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import { urlFor } from "@/lib/sanity/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const RiskAdvantageCards = ({
  riskAdvantage: data,
}: {
  riskAdvantage: RiskAdvantageType | null;
}) => {
  const [isSelected, setIsSelected] = useState(true);

  if (!data) return;

  const currentList = isSelected ? data?.onCards : data?.offCards;

  return (
    <section className="relative min-h-screen pt-40 pb-21">
      {data.title && (
        <h2 className="z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold text-blue-700 lg:text-7xl">
          {data.title}
        </h2>
      )}
      <div className="mx-auto flex max-w-[85rem] flex-col items-center justify-center gap-10 px-4 max-lg:flex-col">
        <Switch
          isSelected={isSelected}
          onValueChange={setIsSelected}
          thumbIcon={({ isSelected }) =>
            isSelected ? (
              <IoCheckmark className="text-slate-950" />
            ) : (
              <IoCloseOutline className="text-slate-950" />
            )
          }
        >
          <div className="relative">
            <svg
              className="absolute end-10 rtl:-end-28 -top-8 rtl:me-50"
              width="45"
              height="25"
              viewBox="0 0 45 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                fill="currentColor"
                className="fill-blue-700 dark:fill-neutral-700"
              />
            </svg>
            <span className="block">{data.toggleLabel}</span>
          </div>
        </Switch>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSelected ? "on" : "off"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex w-full items-center justify-center gap-2 max-md:flex-col lg:gap-8"
          >
            {currentList.map(({ title, description, image }, i) => (
              <motion.div
                key={`${isSelected ? "on" : "off"}-${i}`}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex w-full flex-1"
              >
                <Card className="flex w-full flex-1 py-2">
                  <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
                    <h3 className="font-bold uppercase">{title}</h3>
                    <p className="text-default-500">{description}</p>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt={title}
                      className="h-50 w-full rounded-[8px] object-cover"
                      src={urlFor(image).url()}
                      width={300}
                      height={200}
                    />
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RiskAdvantageCards;

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
        <h2 className="z-200 mx-auto mb-10 w-fit text-center text-4xl font-semibold text-blue-700 lg:text-7xl">
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
          {data.toggleLabel}
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
                    <h3 className="text-tiny font-bold uppercase">{title}</h3>
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

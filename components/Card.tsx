"use client";

import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { JSX, useRef } from "react";
import Image from "next/image";

export default function index({
  title,
  cards,
}: {
  title?: string;
  cards?: {
    title: string;
    description: string;
    image: string;
  }[];
}): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={container}>
      <>
        <div className="grid h-[40vh] w-full place-content-center text-white">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[54px_54px]"></div>

          {title && (
            <h2 className="px-8 text-center text-5xl leading-[120%] font-semibold tracking-tight text-blue-950 2xl:text-7xl">
              {title}
            </h2>
          )}
        </div>
      </>

      <div className="w-full text-white">
        {cards?.map(({ title, description, image }, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              image={image}
              title={title}
              description={description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  image: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  image,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`relative -top-[25%] flex h-[450px] w-[90%] origin-top flex-col rounded-md bg-linear-to-tr from-blue-700 to-blue-900 p-4 lg:h-[450px] lg:w-[70%] lg:p-10`}
      >
        <h2 className="text-center text-2xl font-semibold max-lg:mt-2">
          {title}
        </h2>
        <div className="mt-1 flex h-full gap-10 max-lg:flex-col lg:mt-8">
          <div className="relative top-[10%] max-lg:mb-4 w-full lg:w-[40%] lg:text-xl">
            {description}
          </div>

          <div className="relative h-full overflow-hidden rounded-lg lg:w-[60%]">
            <motion.div
              className={`h-full w-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={image} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

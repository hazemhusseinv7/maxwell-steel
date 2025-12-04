"use client";

import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { JSX, useRef } from "react";
import Image from "next/image";

export default function index({
  list,
}: {
  list: {
    title: string;
    description: string[];
    image: string;
    color: string;
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
        <div className="text-white h-[40vh]  w-full grid place-content-center ">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <h2 className="2xl:text-7xl text-teal-950 text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
            Risk Advantage Comparison
          </h2>
        </div>
      </>

      <div className="text-white w-full">
        {list.map(({ title, description, image, color }, i) => {
          const targetScale = 1 - (list.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              image={image}
              title={title}
              color={color}
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
  description: string[];
  image: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  image,
  color,
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
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[90%] lg:w-[70%] rounded-md lg:p-10 p-4 origin-top`}
      >
        <h2 className="text-2xl text-center font-semibold max-lg:mt-2">
          {title}
        </h2>
        <div className={`flex max-lg:flex-col h-full mt-1 lg:mt-5 gap-10`}>
          <ul className={`flex flex-col gap-2 lg:w-[40%] relative top-[10%]`}>
            {description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div
            className={`relative lg:w-[60%] h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
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

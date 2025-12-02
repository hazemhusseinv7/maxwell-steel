"use client";

import { useRef } from "react";

import { TimelineContent } from "@/components/ui/timeline-animation";
import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";

import {
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaLinkedin,
} from "react-icons/fa6";
import { RiWhatsappLine } from "react-icons/ri";

const AboutUs = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 1,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  const socialMedia = [
    {
      name: "LinkedIn",
      link: process.env.NEXT_PUBLIC_LINKEDIN,
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      link: process.env.NEXT_PUBLIC_TWITTER,
      icon: FaXTwitter,
    },
    {
      name: "Tiktok",
      link: process.env.NEXT_PUBLIC_TIKTOK,
      icon: FaTiktok,
    },
    {
      name: "Instagram",
      link: process.env.NEXT_PUBLIC_INSTAGRAM,
      icon: FaInstagram,
    },
    {
      name: "Snapchat",
      link: process.env.NEXT_PUBLIC_SNAPCHAT,
      icon: FaSnapchat,
    },
    {
      name: "Whatsapp",
      link: process.env.NEXT_PUBLIC_WHATSAPP,
      icon: RiWhatsappLine,
    },
  ].filter((item) => item.link);

  return (
    <section
      id="about-us"
      className="bg-linear-to-t from-muted-foreground/5 relative"
      ref={heroRef}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-32">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute left-0 lg:top-2 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2 text-xl">
              <TimelineContent
                as="h2"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm lg:text-2xl font-medium text-gray-600 dark:text-gray-300"
              >
                About Us
              </TimelineContent>
            </div>
            <div className="flex gap-4">
              {socialMedia.map(({ name, link, icon: Icon }) => (
                <TimelineContent
                  key={name}
                  as="a"
                  animationNum={0}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="md:size-8 size-6 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-teal-500 transition-colors duration-300 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <Icon className="max-sm:size-3" />
                </TimelineContent>
              ))}
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width="100%"
              height="100%"
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                href="/about-us/about-us.jpg"
              />
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm rtl:sm:flex-row-reverse">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-teal-700 font-bold">20+</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Years of Experience
                </span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-teal-700 font-bold">304 & 316</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Premium Materials
                </span>
              </div>
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col lg:gap-0 gap-4 lg:ps-5">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <p className="text-teal-700 font-semibold">
                  Dedicated
                  {/* <span className="text-gray-600 dark:text-gray-300 font-normal"></span> */}
                </p>
                <span className="text-gray-600 uppercase">Team</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-teal-700 dark:text-gray-300 font-bold text-xl lg:text-2xl">
                  Global
                </span>
                <p className="text-gray-600">Technologies</p>
                <span className="text-gray-300 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <TimelineContent
              as="p"
              animationNum={8}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-4xl md:text-5xl leading-[110%]! font-semibold text-teal-800 mb-8"
            >
              Who We Are?
            </TimelineContent>
            <p className="sm:text-3xl md:text-4xl text-xl leading-[170%]! font-semibold text-gray-900 dark:text-gray-300 mb-8 max-w-3xl">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                Two Decades of Integrated Stainless Steel Manufacturing
                Solutions
              </VerticalCutReveal>
            </p>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-gray-600 dark:text-gray-400"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs space-y-4"
              >
                <p className="leading-relaxed text-justify">
                  At Fine Edge, we have over two decades of experience in the
                  engineering industries, providing integrated solutions for
                  manufacturing stainless steel products. We adhere to the
                  highest standards of quality and safety by utilizing the
                  latest global technologies and premium raw materials—304 (AISI
                  18/10) and 316 (AISI 18/10/2).
                </p>
                <p className="leading-relaxed text-justify">
                  Our products serve various sectors, including food factories,
                  healthcare facilities, hotels, restaurants, health clubs, and
                  public establishments. We offer both standard and customized
                  solutions that meet the unique needs of each client, all while
                  maintaining the highest standards of quality and precision in
                  manufacturing.
                </p>
                <p className="leading-relaxed text-justify">
                  We take pride in keeping pace with global industrial
                  developments while preserving our local identity, producing
                  100% Egyptian-made products that meet the needs of the
                  domestic market and compete internationally. This is supported
                  by a specialized technical team that provides continuous
                  assistance.
                </p>
              </TimelineContent>
              {/* <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify"></p>
              </TimelineContent> */}
            </TimelineContent>
          </div>

          {/* <div className="md:col-span-1 lg:pt-8">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 text-teal-700 dark:text-teal-700 text-2xl font-bold mb-2"
              ></TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 dark:text-gray-400 text-sm mb-8 ltr:text-left"
              ></TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-gray-900 dark:text-gray-400 font-medium mb-4"></p>
              </TimelineContent>

              <TimelineContent
                as="a"
                href="#"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="bg-teal-700 hover:bg-teal-600 shadow-2xl shadow-teal-800 hover:shadow-teal-500 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
              >
                Contact Us
                <GoArrowUpRight className="rtl:rotate-270" />
              </TimelineContent>
            </div>
          </div> */}
        </div>
      </div>

      {/* Copper Forge Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 rotate-180"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(96, 108, 56, 0.25), transparent 70%)",
        }}
      />
      {/* Your Content/Components */}
    </section>
  );
};

export default AboutUs;

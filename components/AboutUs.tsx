"use client";

import { useRef } from "react";
import Image from "next/image";

import { TimelineContent } from "@/components/ui/timeline-animation";
import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";

import {
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
import { RiWhatsappLine } from "react-icons/ri";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="mx-auto rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

const AboutUs = ({
  settings,
  aboutUs,
}: {
  settings: SettingsType | null;
  aboutUs: AboutUsType | null;
}) => {
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
      link: settings?.linkedin,
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      link: settings?.twitter,
      icon: FaXTwitter,
    },
    {
      name: "TikTok",
      link: settings?.tiktok,
      icon: FaTiktok,
    },
    {
      name: "Instagram",
      link: settings?.instagram,
      icon: FaInstagram,
    },
    {
      name: "Snapchat",
      link: settings?.snapchat,
      icon: FaSnapchat,
    },
    {
      name: "WhatsApp",
      link: settings?.whatsapp,
      icon: RiWhatsappLine,
    },
    {
      name: "Facebook",
      link: settings?.facebook,
      icon: FaFacebook,
    },
    {
      name: "YouTube",
      link: settings?.youtube,
      icon: FaYoutube,
    },
  ].filter((item) => item.link);

  return (
    <section
      id="about-us"
      className="relative mt-20 bg-linear-to-t from-blue-50"
      ref={heroRef}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-8 py-20">
        <div className="relative">
          {/* Header with social icons */}
          <div className="absolute -top-3 left-0 z-10 mb-8 flex w-[85%] items-center justify-between sm:-top-2 md:top-0 lg:top-2">
            <div className="flex items-center gap-2 text-xl">
              <TimelineContent
                as="h2"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600 lg:text-2xl dark:text-gray-300"
              >
                {aboutUs?.title}
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
                  className="flex size-6 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-gray-100 transition-colors duration-300 hover:bg-blue-500 md:size-8 dark:border-gray-700 dark:bg-gray-800"
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
            className="group relative"
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
                href={urlFor(aboutUs?.heroImage).url()}
              />
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-between py-3 text-sm lg:justify-start rtl:sm:flex-row-reverse">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="text-primary-blue font-bold">
                  {aboutUs?.leftTopStat.value}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {aboutUs?.leftTopStat.label}
                </span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="text-primary-blue font-bold">
                  {aboutUs?.leftBottomStat.value}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {aboutUs?.leftBottomStat.label}
                </span>
              </div>
            </TimelineContent>
            <div className="right-0 bottom-16 flex gap-4 lg:absolute lg:flex-col lg:gap-0 lg:ps-5">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl"
              >
                <p className="text-primary-blue font-semibold">
                  {aboutUs?.rightTopStat.value}
                  {/* <span className="text-gray-600 dark:text-gray-300 font-normal"></span> */}
                </p>
                <span className="text-gray-600 uppercase">
                  {aboutUs?.rightTopStat.label}
                </span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-xs sm:text-base"
              >
                <span className="text-primary-blue text-xl font-bold lg:text-2xl dark:text-gray-300">
                  {aboutUs?.rightBottomStat.value}
                </span>
                <p className="text-gray-600">
                  {aboutUs?.rightBottomStat.label}
                </p>
                <span className="block text-gray-300 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <TimelineContent
              as="p"
              animationNum={8}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-primary-blue mb-8 text-4xl leading-[110%]! font-semibold md:text-5xl"
            >
              {aboutUs?.heading}
            </TimelineContent>
            <p className="mb-8 max-w-3xl text-xl leading-[170%]! font-semibold text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-300">
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
                {aboutUs?.subheading}
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
                className="space-y-4 text-center"
              >
                <PortableText
                  value={aboutUs?.content}
                  components={portableTextComponents}
                />
              </TimelineContent>
            </TimelineContent>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20 px-8 pt-20 pb-32 max-lg:text-center lg:gap-32">
        <div className="flex items-center justify-between gap-4 max-lg:flex-col">
          <div className="max-w-xl max-lg:order-2">
            <h2 className="text-primary-blue mb-8 text-4xl leading-[110%]! font-semibold md:text-5xl">
              {aboutUs?.ourVision?.title}
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <PortableText
                value={aboutUs?.ourVision?.content}
                components={portableTextComponents}
              />
            </div>
          </div>
          <div className="relative w-70 max-lg:order-1 lg:w-100">
            <TimelineContent
              as="figure"
              animationNum={11}
              timelineRef={heroRef}
              customVariants={scaleVariants}
              className="group relative"
            >
              <svg
                className="w-full"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
              >
                <defs>
                  <clipPath
                    id="clip-inverted-2"
                    clipPathUnits="objectBoundingBox"
                  >
                    <path
                      d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
                      fill="#D9D9D9"
                    />
                  </clipPath>
                </defs>
                <image
                  clipPath="url(#clip-inverted-2)"
                  preserveAspectRatio="xMidYMid slice"
                  width="100%"
                  height="100%"
                  href={urlFor(aboutUs?.heroImage).url()}
                />
              </svg>
            </TimelineContent>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 max-lg:flex-col">
          <div className="relative w-70 lg:w-100">
            <TimelineContent
              as="figure"
              animationNum={12}
              timelineRef={heroRef}
              customVariants={scaleVariants}
              className="group relative"
            >
              <svg
                className="w-full"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
              >
                <defs>
                  <clipPath
                    id="clip-inverted-2"
                    clipPathUnits="objectBoundingBox"
                  >
                    <path
                      d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
                      fill="#D9D9D9"
                    />
                  </clipPath>
                </defs>
                <image
                  clipPath="url(#clip-inverted-2)"
                  preserveAspectRatio="xMidYMid slice"
                  width="100%"
                  height="100%"
                  href={urlFor(aboutUs?.heroImage).url()}
                />
              </svg>
            </TimelineContent>
          </div>
          <div className="max-w-xl">
            <h2 className="text-primary-blue mb-8 text-4xl leading-[110%]! font-semibold md:text-5xl">
              {aboutUs?.ourMission?.title}
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <PortableText
                value={aboutUs?.ourMission?.content}
                components={portableTextComponents}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

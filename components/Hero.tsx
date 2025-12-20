import Image from "next/image";

import { getLocale } from "next-intl/server";
import { urlFor } from "@/lib/sanity/image";

import Aurora from "@/components/Aurora";
import { LiquidGlassCard } from "@/components/liquid-glass";
import { TextEffect } from "@/components/ui/text-effect";

import { getHeroData } from "@/lib/sanity/queries";

const Hero = async () => {
  const locale = await getLocale();
  const data: HeroType | null = await getHeroData(locale);

  const img = urlFor(data?.image).url();
  const badge = urlFor(data?.certificateBadge).url() || undefined;

  return (
    <section className="relative mt-16">
      <Aurora
        colorStops={["#636566", "#828485", "#a1a3a4"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="rounded-3xl bg-white/50 p-2 shadow-xl shadow-neutral-200">
          <div className="relative h-120 overflow-hidden rounded-2xl md:h-[80dvh]">
            {img && (
              <Image
                src={img}
                alt={data?.title || "Hero image"}
                width={1920}
                height={1080}
                priority
                fetchPriority="high"
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            )}

            <div className="absolute right-0 bottom-0 left-0 px-5 pb-22 md:px-10 md:pb-10 lg:pb-5">
              <LiquidGlassCard
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="12px"
                blurIntensity="lg"
                draggable
                className="w-fit p-4 max-md:mx-auto"
              >
                {data?.title && (
                  <TextEffect
                    per="word"
                    preset="fade"
                    as="h1"
                    className="relative text-xl font-medium text-neutral-100 md:text-3xl lg:text-7xl"
                  >
                    {data?.title}
                  </TextEffect>
                )}
              </LiquidGlassCard>
            </div>
          </div>
        </div>

        {badge && (
          <Image
            className="absolute end-1 -bottom-8 z-20 size-32 lg:end-2 lg:size-50"
            src={badge}
            width={200}
            height={200}
            alt="Certificate Badge"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;

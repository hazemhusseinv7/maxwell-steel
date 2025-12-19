import { getHeroData } from "@/lib/sanity/queries";
import Aurora from "./Aurora";
import { LiquidGlassCard } from "./liquid-glass";
import { TextEffect } from "./ui/text-effect";
import { getLocale } from "next-intl/server";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";

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
          <div
            className="flex h-120 flex-col rounded-2xl bg-cover bg-center bg-no-repeat md:h-[80dvh]"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="mt-auto px-5 pb-22 md:px-10 md:pb-10 lg:pb-5">
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

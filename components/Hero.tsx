 import { LiquidGlassCard } from "./liquid-glass";
import { TextEffect } from "./motion-primitives/text-effect";

const Hero = () => {
  return (
    <section className="py-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="h-120 md:h-[80dvh] flex flex-col bg-[url('/hero/hero.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl">
          <div className="mt-auto px-5 pb-5 md:px-10 md:pb-10">
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="sm"
              borderRadius="12px"
              blurIntensity="lg"
              draggable
              className="p-4 w-fit max-md:mx-auto"
            >
              <TextEffect
                per="word"
                preset="fade"
                as="h1"
                className="text-xl md:text-3xl lg:text-7xl text-neutral-100 relative"
              >
                Decades of Steel. Unmatched Quality
              </TextEffect>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

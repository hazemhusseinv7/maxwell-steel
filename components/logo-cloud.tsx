import Image from "next/image";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface LogoCloudProps {
  logos: {
    url: string;
    companyName?: string;
    alt?: string;
  }[];
}

export const LogoCloud = ({ logos }: LogoCloudProps) => {
  return (
    <section className="overflow-hidden pb-28 md:pb-12" dir="ltr">
      <div className="group relative m-auto max-md:px-0">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative w-full py-6">
            <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
              {logos.map((logo, i) => (
                <div key={i} className="flex items-center justify-center">
                  <Image
                    className="mx-auto h-fit w-20"
                    src={logo.url}
                    alt={logo.alt || logo.companyName || "Client logo"}
                    height={80}
                    width={80}
                  />
                </div>
              ))}
            </InfiniteSlider>

            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l" />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 left-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 right-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

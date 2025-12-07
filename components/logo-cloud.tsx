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
          <div className="relative py-6 w-full">
            <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
              {logos.map((logo, i) => (
                <div key={i} className="flex">
                  <Image
                    className="mx-auto h-12 w-fit"
                    src={logo.url}
                    alt={logo.alt || logo.companyName || "Client logo"}
                    height={48}
                    width={48}
                  />
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-linear-to-r absolute inset-y-0 left-0 w-20" />
            <div className="bg-linear-to-l absolute inset-y-0 right-0 w-20" />
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

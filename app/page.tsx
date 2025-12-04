import ReactLenis from "lenis/react";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import RiskAdvantageCards from "@/components/RiskAdvantageCards";

export default function Home() {
  return (
    <ReactLenis root className="min-h-[200vh] overflow-hidden">
      <Hero />
      <RiskAdvantageCards />
      <AboutUs />
    </ReactLenis>
  );
}

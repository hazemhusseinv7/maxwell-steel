import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <main className="min-h-[200vh] overflow-hidden">
      <Hero />
      <AboutUs />
    </main>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { ConfidenceMap } from "@/components/story/ConfidenceMap";
import { PrototypeSection } from "@/components/story/PrototypeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        <HeroSection />
        <BentoGrid />
        <ConfidenceMap />
        <PrototypeSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ModesSection } from "@/components/sections/ModesSection";
import { BedtimeSection } from "@/components/sections/BedtimeSection";
import { GrowSection } from "@/components/sections/GrowSection";
import { ParentsSection } from "@/components/sections/ParentsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { IphoneWaitlistSection } from "@/components/sections/IphoneWaitlistSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyCTA } from "@/components/shared/MobileStickyCTA";

export default function Home() {
  const currentYear: number = new Date().getFullYear();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <HowItWorksSection />
        <ModesSection />
        <BedtimeSection />
        <GrowSection />
        <ParentsSection />
        <FAQSection />
        <IphoneWaitlistSection />
        <FinalCTASection />
      </main>
      <Footer currentYear={currentYear} />
      <MobileStickyCTA />
    </>
  );
}

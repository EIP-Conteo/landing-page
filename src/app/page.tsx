import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { CursorSparklesWrapper } from "@/components/shared/CursorSparklesWrapper";

export default function Home() {
  const currentYear: number = new Date().getFullYear();

  return (
    <main>
      <CursorSparklesWrapper />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer currentYear={currentYear} />
    </main>
  );
}

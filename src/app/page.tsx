import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}

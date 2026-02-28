import { HeroSection } from "@/components/marketing/hero/HeroSection";
import { TrustBar } from "@/components/marketing/TrustBar";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FormatShowcase } from "@/components/marketing/FormatShowcase";
import { UseCaseSpotlight } from "@/components/marketing/UseCaseSpotlight";
import { SocialProof } from "@/components/marketing/SocialProof";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <HowItWorks />
      <FormatShowcase />
      <UseCaseSpotlight />
      <SocialProof />
      <FinalCTA />
    </>
  );
}

import HeroSection from '@/components/sections/HeroSection';
import PipelineSection from '@/components/sections/PipelineSection';
import BuilderShowcaseSection from '@/components/sections/BuilderShowcaseSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import ExploreSection from '@/components/sections/ExploreSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import CtaSection from '@/components/sections/CtaSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <PipelineSection />
      <BuilderShowcaseSection />
      <UseCasesSection />
      <ExploreSection />
      <CapabilitiesSection />
      <CtaSection />
    </>
  );
}

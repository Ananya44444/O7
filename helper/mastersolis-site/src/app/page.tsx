import HeroSection from '@/components/sections/HeroSection';
import ServiceHighlights from '@/components/sections/ServiceHighlights';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceHighlights />
      <TestimonialCarousel />
      <CTASection />
    </div>
  );
}

import React, { Suspense } from "react";
import { FloatingCustomerButton } from "@/components/buttons/floating-customer-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const MainLayout = React.lazy(() => import("@/components/layouts/MainLayout"));
const CookiePopup = React.lazy(
  () => import("@/components/sections/landing-page/cookie-popup")
);
const Hero = React.lazy(() => import("@/components/sections/landing-page/hero"));
const Faq = React.lazy(() => import("@/components/sections/landing-page/faq"));
const MoreServices = React.lazy(
  () => import("@/components/sections/landing-page/more-services")
);
const Newsletter = React.lazy(
  () => import("@/components/sections/landing-page/newsletter")
);
const OurMession = React.lazy(
  () => import("@/components/sections/landing-page/our-mession")
);
const Partners = React.lazy(
  () => import("@/components/sections/landing-page/partners")
);
const Plans = React.lazy(() => import("@/components/sections/landing-page/plans"));
const Services = React.lazy(
  () => import("@/components/sections/landing-page/services")
);
const Testimonials = React.lazy(
  () => import("@/components/sections/landing-page/testimonials")
);

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient"><img src="/assets/logos/logo-icon.svg" alt="Loading" className="w-16 h-16 animate-pulse" /></div>}>
      <MainLayout>
        <FloatingCustomerButton />
        <Hero />
        <div className="responsive">
          <ScrollReveal variant="slideUp">
            <Partners />
          </ScrollReveal>
          <ScrollReveal variant="slideRight" delay={0.08}>
            <OurMession />
          </ScrollReveal>
        </div>
        <ScrollReveal variant="slideLeft">
          <Services />
        </ScrollReveal>
        <div className="responsive">
          <ScrollReveal variant="scale">
            <MoreServices />
          </ScrollReveal>
        </div>
        <ScrollReveal variant="slideUpScale">
          <Testimonials />
        </ScrollReveal>
        <div className="responsive">
          <ScrollReveal variant="slideDown">
            <Faq />
          </ScrollReveal>
        </div>
        <ScrollReveal variant="slideLeftFade">
          <Plans />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <Newsletter />
        </ScrollReveal>
        <CookiePopup />
      </MainLayout>
    </Suspense>
  );
}

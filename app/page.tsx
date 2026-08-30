import { CertificationsSection } from "@/components/certifications-section";
import { ClientsSection } from "@/components/clients-section";
import { HeroSection } from "@/components/hero-section";
import { PillarsSection } from "@/components/pillars-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TopBar } from "@/components/top-bar";

export default function Home() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <HeroSection />
        <PillarsSection />
        <ClientsSection />
        <CertificationsSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}

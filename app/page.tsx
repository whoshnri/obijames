import { BlogsSection } from "@/components/blogs-section";
import { BookFeatureSection } from "@/components/book-feature-section";
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
    <div className="max-w-8xl">
      <TopBar />
      <SiteHeader />
      <main>
        <HeroSection />
        <PillarsSection />
        <BookFeatureSection />
        <ClientsSection />
        <CertificationsSection />
        <TestimonialsSection />
        <BlogsSection />
      </main>
      <SiteFooter />
    </div>
  );
}

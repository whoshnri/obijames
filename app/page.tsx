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
import { fetchPublishedBlogs, toBlogCard } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const posts = (await fetchPublishedBlogs(4)).map(toBlogCard);

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
        <BlogsSection posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}

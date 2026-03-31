import NavBar from "@/components/navbar";
import HeroScene from "@/components/hero-scene";
import WorkSection from "@/components/work-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <HeroScene />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

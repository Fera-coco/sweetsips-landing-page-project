import { ArtDefs } from "@/components/art/defs";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MenuSection from "@/components/MenuSection";
import ParfaitStory from "@/components/ParfaitStory";
import BuildYourOwn from "@/components/BuildYourOwn";
import HowItWorks from "@/components/HowItWorks";
import AboutTeam from "@/components/AboutTeam";
import { Contact, Footer } from "@/components/ContactFooter";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => (
  <div className="min-h-screen bg-cream">
    <a href="#menu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-cream">Skip to menu</a>
    <ArtDefs />
    <Navbar />
    <main>
      <Hero />
      <Marquee />
      <MenuSection />
      <ParfaitStory />
      <BuildYourOwn />
      <HowItWorks />
      <AboutTeam />
      <Contact />
    </main>
    <Footer />
    <FloatingButtons />
  </div>
);
export default Index;

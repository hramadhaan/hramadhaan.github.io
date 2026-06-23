import { Hero } from "@/components/Hero";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { ProcessShowcase } from "@/components/ProcessShowcase";
import { WhySection } from "@/components/WhySection";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowcaseSection />
      <ProcessShowcase />
      <WhySection />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}

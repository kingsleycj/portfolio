import { WaveDivider } from "@/components/art/WaveDivider";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/layout/Marquee";
import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Currently } from "@/components/sections/Currently";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

const PAPER = "var(--color-paper)";
const PAPER_DEEP = "var(--color-paper-deep)";
const ESPRESSO = "var(--color-espresso)";

/**
 * Sections meet on curves rather than straight edges. Every boundary is declared
 * here so the page's colour sequence — paper, deep, paper, deep, espresso, paper —
 * can be read top to bottom in one place, and no section can drift out of step
 * with the divider above it.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />

        <WaveDivider from={PAPER} fill={PAPER_DEEP} depth="soft" curve={1} />
        <Experience />

        <WaveDivider from={PAPER_DEEP} fill={PAPER} depth="soft" curve={2} />
        <Projects />

        <WaveDivider from={PAPER} fill={PAPER_DEEP} depth="soft" curve={3} flip />
        <Skills />

        <WaveDivider from={PAPER_DEEP} fill={ESPRESSO} curve={0} />
        <Currently />

        <WaveDivider from={ESPRESSO} fill={PAPER} curve={2} flip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

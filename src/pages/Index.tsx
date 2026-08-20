import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import WhatIBuild from "@/components/WhatIBuild";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import GithubShowcase from "@/components/GithubShowcase";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#070910] text-[#F5F7FF] selection:bg-amber-500/30 selection:text-amber-200">
      <Navigation />
      <main id="main-content">
        <Hero />
        <Highlights />
        <WhatIBuild />
        <Projects />
        <Journey />
        <Skills />
        <GithubShowcase />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

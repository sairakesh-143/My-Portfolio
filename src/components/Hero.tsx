import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Github, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-hero pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 mb-4">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Frontend Web Developer</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-primary">Bhargava Sai</span>
            <br />
            <span className="text-foreground">Rakesh Reddy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Crafting beautiful, responsive websites with clean HTML & CSS.
            Passionate about semantic markup and pixel-perfect designs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              asChild
            >
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
              asChild
            >
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/rakesh-reddy-450787321/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

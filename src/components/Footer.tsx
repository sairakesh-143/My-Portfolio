import { Github, Linkedin, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/",
      ariaLabel: "Visit my GitHub profile"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rakesh-reddy-450787321/",
      ariaLabel: "Connect with me on LinkedIn"
    }
  ];

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo/Name */}
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">
                <span className="text-primary">Bhargava Sai</span>
                <span className="text-muted-foreground"> Rakesh Reddy</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#certificates" className="text-muted-foreground hover:text-primary transition-colors">
                Certificates
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            {/* Copyright */}
            <div className="text-center text-sm text-muted-foreground pt-6 border-t border-border w-full">
              <p>© {new Date().getFullYear()} Bhargava Sai Rakesh Reddy. Built with HTML & CSS.</p>
              <p className="mt-1">Frontend Web Developer specializing in responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Restaurant Website",
    description: "A modern, responsive restaurant website featuring an elegant menu showcase, online reservations, and seamless user experience with clean HTML & CSS.",
    url: "https://dbsr.netlify.app/",
    tags: ["HTML5", "CSS3", "Responsive", "Grid"],
  },
  {
    title: "Portfolio Website",
    description: "A professional portfolio showcasing web development projects with smooth animations, responsive layouts, and accessible design patterns.",
    url: "https://lnkd.in/eK5ND3hj",
    tags: ["HTML5", "CSS3", "Flexbox", "Mobile-First"],
  },
  {
    title: "Blog Website",
    description: "A clean and minimalist blog platform with semantic HTML structure, optimized typography, and reader-focused design.",
    url: "https://brsml.netlify.app/",
    tags: ["HTML5", "CSS3", "Typography", "Accessibility"],
  },
  {
    title: "Resume Website",
    description: "An interactive online resume with elegant layout, smooth scrolling sections, and print-optimized styling using pure CSS.",
    url: "https://lnkd.in/eFbEk2UD",
    tags: ["HTML5", "CSS3", "Print Styles", "Animations"],
  },
  {
    title: "HTML Tags Reference",
    description: "A comprehensive HTML tags reference guide demonstrating semantic markup and proper tag usage with live examples.",
    url: "https://lnkd.in/e9VFAWPV",
    tags: ["HTML5", "Semantic HTML", "Documentation", "CSS3"],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-title text-center"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            A showcase of my work demonstrating clean code, responsive design, and attention to detail.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="card-hover h-full bg-card/50 backdrop-blur-sm border-border overflow-hidden">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Github className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/80 text-foreground border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Button
                        className="w-full bg-primary/10 hover:bg-primary text-foreground hover:text-primary-foreground border border-primary/30 hover:border-primary group/btn transition-all duration-300"
                        asChild
                      >
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

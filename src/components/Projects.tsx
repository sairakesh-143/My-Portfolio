import { ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Restaurant Website",
      description: "A modern restaurant website featuring menu displays, reservation system, and responsive design with smooth animations.",
      link: "https://dbsr.netlify.app/",
      tags: ["HTML5", "CSS3", "Responsive Design"]
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing web development projects with clean layout and interactive elements.",
      link: "https://lnkd.in/eK5ND3hj",
      tags: ["HTML5", "CSS3", "Flexbox"]
    },
    {
      title: "Blog Website",
      description: "Content-focused blog platform with article layouts, category filtering, and mobile-optimized reading experience.",
      link: "https://brsml.netlify.app/",
      tags: ["HTML5", "CSS Grid", "Semantic HTML"]
    },
    {
      title: "Resume Website",
      description: "Professional online resume with downloadable format, showcasing experience and skills in an elegant design.",
      link: "https://lnkd.in/eFbEk2UD",
      tags: ["HTML5", "CSS3", "Print Styles"]
    },
    {
      title: "HTML Tags Project",
      description: "Comprehensive demonstration of HTML elements and their proper usage with visual examples and code snippets.",
      link: "https://lnkd.in/e9VFAWPV",
      tags: ["HTML5", "Documentation", "Education"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Featured Projects</h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent web development projects built with HTML & CSS
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <article
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Code className="w-8 h-8 text-primary" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

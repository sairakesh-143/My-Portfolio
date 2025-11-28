import { Code2, Layout, Smartphone, Accessibility } from "lucide-react";

const About = () => {
  const skills = [
    "HTML5",
    "CSS3",
    "Responsive Web Design",
    "Semantic HTML",
    "CSS Flexbox",
    "CSS Grid",
    "HTML Forms",
    "CSS Animations",
    "Accessibility",
    "Mobile-First Design"
  ];

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing semantic, maintainable HTML & CSS that follows best practices"
    },
    {
      icon: Layout,
      title: "Responsive Design",
      description: "Creating layouts that work beautifully on all devices and screen sizes"
    },
    {
      icon: Smartphone,
      title: "Mobile-First",
      description: "Building with mobile users in mind, then enhancing for larger screens"
    },
    {
      icon: Accessibility,
      title: "Accessible",
      description: "Ensuring everyone can use and enjoy the websites I create"
    }
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm a passionate Frontend Web Developer specializing in HTML and CSS. 
            I love turning design concepts into pixel-perfect, responsive websites 
            that provide exceptional user experiences across all devices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-xl border border-border card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Technical Skills</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

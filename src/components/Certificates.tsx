import { Award, CheckCircle2 } from "lucide-react";

const Certificates = () => {
  const certificate = {
    title: "HTML Course Certification",
    issuer: "ManaClg LevelUp Frontend Development BootCamp",
    description: "Comprehensive HTML course covering semantic markup, forms, accessibility, and modern HTML5 features.",
    skills: ["HTML5", "Semantic HTML", "Web Forms", "Accessibility", "Best Practices"]
  };

  return (
    <section id="certificates" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Certifications</h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professional certifications that validate my expertise in web development
        </p>

        <div className="max-w-2xl mx-auto">
          <article className="bg-secondary rounded-xl border border-border p-8 card-hover">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{certificate.title}</h3>
                <p className="text-primary font-medium">{certificate.issuer}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {certificate.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Skills Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-lg border border-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Certificates;

import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-title text-center"
          >
            Get In Touch
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's create something amazing together!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-hover bg-card/50 backdrop-blur-sm border-border overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">Email Me</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        Prefer email? Drop me a message and I'll get back to you as soon as possible.
                      </p>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground group px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                        asChild
                      >
                        <a
                          href="mailto:your.email@example.com"
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Email
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">Connect on Social</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Find me on GitHub and LinkedIn to see my latest projects and professional journey.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              Based in <span className="text-primary font-semibold">India</span> • Available for freelance opportunities
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

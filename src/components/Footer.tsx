import { Github, Linkedin, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/sairakesh-143",
    ariaLabel: "Visit my GitHub profile"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/rakesh-reddy-450787321/",
    ariaLabel: "Connect with me on LinkedIn"
  },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold">
                <span className="gradient-text">BRS</span>
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-6"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-border/50 text-center"
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Built with <Heart className="w-4 h-4 text-primary animate-pulse" /> using HTML & CSS
              <span className="mx-2">•</span>
              © {new Date().getFullYear()} Bhargava Sai Rakesh Reddy
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

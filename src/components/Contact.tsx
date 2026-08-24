import { useState } from "react";
import { Mail, Send, MapPin, Linkedin, Github, CheckCircle2, AlertCircle, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { messageStore } from "@/lib/messageStore";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      messageStore.addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Contact Inquiry",
        message: formData.message,
      });

      setLoading(false);
      setSentSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I will get back to you soon.",
      });

      setTimeout(() => setSentSuccess(false), 5000);
    } catch (err) {
      setLoading(false);
      toast({
        title: "Failed to send message",
        description: "Please try reaching out via direct email.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Have a project idea, internship opportunity, or want to collaborate? Let's build something great together.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl bg-[#0E1322]/90 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-purple-400" />
              <span>Send Me a Message</span>
            </h3>

            {sentSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Your message has been delivered to my admin inbox. Thank you!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Internship Opportunity / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your project, ideas, or opportunity..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Contact Cards & Direct Reachout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="group block p-5 rounded-2xl bg-[#0E1322]/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Email Me</div>
                  <div className="text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                    {portfolioData.personal.email}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group block p-5 rounded-2xl bg-[#0E1322]/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-semibold uppercase">LinkedIn</div>
                  <div className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                    linkedin.com/in/rakesh-reddy
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="group block p-5 rounded-2xl bg-[#0E1322]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-semibold uppercase">GitHub</div>
                  <div className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    github.com/sairakesh-143
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-[#0E1322]/80 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Location</div>
                  <div className="text-sm font-bold text-white">
                    {portfolioData.personal.location}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

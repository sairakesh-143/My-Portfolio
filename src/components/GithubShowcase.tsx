import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Code2, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  Python: "bg-amber-400",
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
};

const GithubShowcase = () => {
  const { githubShowcase } = portfolioData;

  return (
    <section id="github" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
              <Github className="w-3.5 h-3.5" />
              Proof of Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Open Source & GitHub
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Transparent, open-source repositories and clean commit histories that demonstrate day-to-day coding and software craft.
            </p>
          </div>

          <Button
            size="lg"
            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-white/[0.25] text-white font-medium px-5 py-2.5 rounded-xl transition-all gap-2 self-start md:self-auto"
            asChild
          >
            <a
              href={githubShowcase.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {githubShowcase.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-[#0b0f1d]/80 border border-white/[0.08] backdrop-blur-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-mono text-slate-400">{stat.label}</p>
                <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-400">
                <Activity className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {githubShowcase.topRepos.map((repo, repoIdx) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: repoIdx * 0.08 }}
              className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || "bg-indigo-400"}`} />
                  <span className="text-slate-300 font-medium">{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-indigo-300 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GithubShowcase;

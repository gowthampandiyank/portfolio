import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[92vh] flex items-center relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-center">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-semibold">Open to new opportunities</span>
            </motion.div>

            <motion.p
              className="text-sm font-mono text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              className="font-display font-black leading-[0.95] tracking-tight text-[clamp(3rem,7vw,6.5rem)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Gowtham
              <br />
              <span className="gradient-text">Pandiyan.</span>
            </motion.h1>

            <motion.h2
              className="mt-6 text-xl md:text-2xl font-semibold text-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              IT Support Engineer · Technical Professional
            </motion.h2>

            <motion.p
              className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              4+ years of hands-on experience supporting desktops, laptops, servers and
              basic networking. I troubleshoot practical technology problems, support users,
              and build modern digital projects in my spare time.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <button onClick={() => scrollTo("#work")} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                View My Work
              </button>
              <a href="/portfolio/gowtham-pandiyan.pdf" target="_blank" className="px-6 py-3 border border-border text-foreground rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2">
                <Download className="w-4 h-4" /> Resume
              </a>
            </motion.div>

            <div className="flex items-center gap-4 mt-7">
              <a href="https://github.com/gowthampandiyank" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-border bg-card shadow-2xl">
                <img src="/portfolio/gp1.jpg" alt="Gowtham Pandiyan" className="w-full aspect-[4/5] object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent pt-24">
                  <p className="text-white text-sm font-semibold">Support · Systems · Technology</p>
                  <p className="text-white/70 text-xs mt-1">Professional portfolio</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl bg-card border border-border shadow-xl">
                <p className="text-2xl font-bold text-primary">4+</p>
                <p className="text-xs text-muted-foreground">Years experience</p>
              </div>
            </div>
          </motion.div>
        </div>

        <button onClick={() => scrollTo("#about")} className="hidden md:flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground hover:text-primary transition-colors">
          Scroll to explore <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

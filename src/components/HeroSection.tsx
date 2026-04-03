import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden py-16 md:py-0">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-12 items-center">

          {/* Text content */}
          <div className="flex flex-col">
            <motion.div
              className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">Available for new opportunities</span>
            </motion.div>

            <motion.h1
              className="font-display font-extrabold leading-[1] tracking-tight text-[clamp(2rem,5vw,4.5rem)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="text-foreground">Crafting</span>
              <br />
              <span className="text-foreground">data into</span>
              <br />
              <span className="gradient-text italic">insights</span>
              <span className="text-foreground"> &</span>
              <br />
              <span className="text-foreground">web into</span>
              <br />
              <span className="gradient-text italic">experiences.</span>
            </motion.h1>

            <motion.p
              className="mt-5 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hi, I'm Gowtham Pandiyan, a Data Analyst crafting data-driven
              web experiences. I combine analysis tools and dev skills to build digital
              products that look beautiful and tell the real story.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:-translate-y-0.5 transition-transform"
              >
                View Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-2.5 border border-border text-foreground rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Avatar / Illustration */}
          <motion.div
            className="hidden md:flex justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-full max-w-sm xl:max-w-md">
              {/* Blurred glow behind the card */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-60 pointer-events-none"
                style={{ background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffe000, #40e0d0, #0080ff, #8000ff, #ff0080)", animation: "rgb-spin 4s linear infinite" }}
              />

              {/* Border wrapper: clips the spinning gradient to a 4px border */}
              <div className="relative rounded-3xl overflow-hidden p-[4px] w-full aspect-square">
                {/* The spinning gradient — rotates inside the clipping wrapper */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: "-100%",
                    background: "conic-gradient(from 0deg, #ff0080, #ff8c00, #ffe000, #40e0d0, #0080ff, #8000ff, #ff0080)",
                    animation: "rgb-spin 4s linear infinite",
                  }}
                />
                {/* Inner image card */}
                <div className="relative w-full h-full rounded-[calc(1.5rem-4px)] overflow-hidden">
  <img
    src="/portfolio/gp1.jpg"
    alt="Gowtham Pandiyan"
    className="w-full h-full object-cover object-top"
  />
</div>
              </div>

              <div className="absolute -top-5 -right-5 w-10 h-10 rounded-full bg-primary/20" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-accent/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

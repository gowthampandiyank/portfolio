import ScrollReveal from "./ScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-soft">
      <div className="container">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="rounded-2xl overflow-hidden border border-border bg-card">
                <img src="/portfolio/gp2.png" alt="Gowtham Pandiyan" className="w-full aspect-square object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-card border border-border rounded-xl px-5 py-3 shadow-lg">
                <p className="text-2xl font-bold text-primary">IT</p>
                <p className="text-xs text-muted-foreground">Support & Technology</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <p className="text-xs font-mono text-primary mb-3">01 / ABOUT</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Practical support. <span className="gradient-text">Reliable technology.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                I'm a technology professional focused on IT support and day-to-day technical operations.
                My experience includes desktop and laptop support, server basics, hardware and software
                troubleshooting, basic networking, and Microsoft Office environments.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Alongside support work, I enjoy building websites and software projects. This gives me
                a practical understanding of both the user side and the technology behind the tools people use.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  ["4+", "Years experience"],
                  ["IT", "Support focus"],
                  ["Web", "Project building"],
                ].map(([value, label]) => (
                  <div key={label} className="p-4 rounded-xl border border-border bg-card">
                    <p className="text-xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

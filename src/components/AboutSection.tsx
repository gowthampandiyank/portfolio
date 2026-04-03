import ScrollReveal from "./ScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-soft">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Left - Image / Avatar */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 aspect-[4/5] flex items-center justify-center border border-border">
                <span className="text-7xl font-display font-bold text-primary/15"><img
    src="/portfolio/gp1.jpg"
    alt="Gowtham Pandiyan"
    className="w-full h-full object-cover object-top"
  /></span>
              </div>
              {/* Stats badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-5 py-3 shadow-lg">
                <p className="text-2xl font-bold text-primary">4+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Content */}
          <ScrollReveal direction="right">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                The <span className="gradient-text">Analyst</span> who codes.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                My journey didn't follow a straight line. It was built on spreadsheets, visual reports, 
                and a curiosity about how data tells stories. I learned to ask the right questions, 
                build the right tools, and present findings that drive action.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                But it wasn't long before I found myself building things with code, too. 
                Data taught me the WHY behind decisions. 
                <span className="text-foreground font-medium"> SQL, Python, and Power BI</span> on the data 
                side and <span className="text-foreground font-medium">HTML, CSS, and JavaScript</span> on 
                the web side became my daily tools.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Now, I develop entire digital experiences that are data-informed, visually sharp, 
                and easy to use. I'm ready to bring this blend of skill sets to every project.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "SQL", sub: "Queries" },
                  { label: "JS", sub: "Front-end" },
                  { label: "BI", sub: "Analytics" },
                ].map((badge) => (
                  <div key={badge.label} className="text-center">
                    <p className="text-2xl font-display font-bold text-primary">{badge.label}</p>
                    <p className="text-xs text-muted-foreground">{badge.sub}</p>
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

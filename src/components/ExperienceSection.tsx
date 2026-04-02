import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    title: "Collections & Data Operations Analyst",
    company: "Forte Management Services",
    period: "Jun 2024 – Present",
    points: [
      "Analyzed debtor aging reports to prioritize high-value recovery and optimize daily collection workflows.",
      "Maintained high-integrity data entries in CRM systems, ensuring 100% accuracy for repayment updates.",
      "Monitored customer record accuracy and ensured ethical communication standards during recovery processes.",
    ],
  },
  {
    title: "Retail Operations & Sales Analyst",
    company: "Khadim's India Ltd",
    period: "Dec 2020 – Sep 2021",
    points: [
      "Monitored daily footfall and customer conversion rates to prepare weekly performance summaries.",
      "Analyzed stock arrangement and assisted in optimizing product displays based on sales trends.",
    ],
  },
  {
    title: "Sales Merchandiser (Data Support)",
    company: "Lifestyle International",
    period: "Oct 2018 – Jun 2020",
    points: [
      "Monitored sales and inventory movement across multiple stores for replenishment and demand planning.",
      "Developed Excel-based dashboards to analyze sell-through rates and stock levels.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-soft">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Journey</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              My professional path: from sales floors to data dashboards, one insight at a time.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div className="timeline-line hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute top-4 w-4 h-4 rounded-full bg-primary border-4 border-background"
                    style={{ [i % 2 === 0 ? "right" : "left"]: "-2.5rem" }}
                  />

                  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-sm text-primary mt-0.5">{exp.company}</p>
                    <ul className="mt-3 space-y-1.5">
                      {exp.points.map((point, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1 shrink-0">›</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    title: "Collections & Data Operations Analyst",
    company: "Forte Management Services",
    period: "Jun 2024 – Present",
    points: [
      "Managed operational records and customer data with attention to accuracy, follow-up and process compliance.",
      "Worked with CRM systems and day-to-day digital workflows to maintain reliable customer information.",
      "Handled customer communication and issue follow-up while maintaining professional service standards.",
    ],
  },
  {
    title: "Retail Operations & Sales Analyst",
    company: "Khadim's India Ltd",
    period: "Dec 2020 – Sep 2021",
    points: [
      "Monitored daily operations, customer activity and store performance to support routine business decisions.",
      "Supported stock, product and operational processes across the retail environment.",
    ],
  },
  {
    title: "Sales Merchandiser",
    company: "Lifestyle International",
    period: "Oct 2018 – Jun 2020",
    points: [
      "Supported sales and inventory operations across multiple stores.",
      "Maintained operational records and used Excel for reporting, stock tracking and daily coordination.",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 bg-soft">
    <div className="container">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-primary mb-3">03 / EXPERIENCE</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Professional Journey</h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Experience across operations, customer support, technology and structured digital workflows.
          </p>
        </div>
      </ScrollReveal>
      <div className="relative max-w-3xl mx-auto">
        <div className="timeline-line hidden md:block" />
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <div className="hidden md:block absolute top-4 w-4 h-4 rounded-full bg-primary border-4 border-background" style={{ [i % 2 === 0 ? "right" : "left"]: "-2.5rem" }} />
                <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">{exp.period}</span>
                  <h3 className="text-base font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-sm text-primary mt-0.5">{exp.company}</p>
                  <ul className="mt-3 space-y-1.5">
                    {exp.points.map((point, j) => <li key={j} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary mt-1 shrink-0">›</span><span>{point}</span></li>)}
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

export default ExperienceSection;

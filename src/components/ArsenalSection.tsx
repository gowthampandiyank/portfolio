import ScrollReveal from "./ScrollReveal";
import { Code2, Wrench, Users } from "lucide-react";

const arsenalData = [
  {
    title: "Technologies",
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "SQL (MySQL)", "Python (Pandas, NumPy)"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["Excel", "Adobe Express", "Git & GitHub", "Power BI", "Figma", "Jupyter Notebook"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    items: ["Analytical Thinking", "Communication", "Team Collaboration", "Problem Solving", "Time Management", "Adaptability"],
  },
];

const ArsenalSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">My Skills</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              The tools and technologies I use to turn data problems into elegant solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {arsenalData.map((category, i) => (
            <ScrollReveal key={category.title} delay={i * 0.15}>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-muted rounded-md text-xs text-muted-foreground font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;

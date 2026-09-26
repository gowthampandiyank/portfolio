import ScrollReveal from "./ScrollReveal";
import { MonitorCog, Network, Code2 } from "lucide-react";

const arsenalData = [
  {
    title: "IT Support",
    icon: MonitorCog,
    items: ["Desktop Support", "Laptop Support", "Hardware Troubleshooting", "Software Troubleshooting", "Microsoft Office"],
  },
  {
    title: "Systems & Networking",
    icon: Network,
    items: ["Server Basics", "Basic Networking", "System Setup", "User Support", "Troubleshooting"],
  },
  {
    title: "Development & Tools",
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "React", "Git & GitHub", "Supabase", "SQL"],
  },
];

const ArsenalSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-primary mb-3">02 / SKILLS</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Technical Toolkit</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              A practical mix of support, systems, networking and modern web-development skills.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {arsenalData.map((category, i) => (
            <ScrollReveal key={category.title} delay={i * 0.15}>
              <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-muted rounded-md text-xs text-muted-foreground font-medium">
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

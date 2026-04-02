import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "./ScrollReveal";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="work" className="py-20 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Selected Work</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              A glimpse into my projects where data meets creative design.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-4xl font-display font-bold text-primary/15">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{project.category}</span>
                  <h3 className="text-base font-semibold text-foreground mt-1">{project.title}</h3>
                  {project.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.subtitle}</p>
                  )}
                  <div className="flex gap-3 mt-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                    {project.view_url && project.view_url !== "#" && (
                      <a href={project.view_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <Link
            to="/works"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:-translate-y-0.5 transition-transform"
          >
            View All Projects
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;

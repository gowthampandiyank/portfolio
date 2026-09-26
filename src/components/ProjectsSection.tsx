import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ProjectsSection = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("is_featured", true).order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="work" className="py-28 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-mono text-primary mb-3">04 / SELECTED WORK</p>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">Things I've built.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">Hover a project to reveal the interface and move your cursor across the card for a subtle depth effect.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <motion.article whileHover="hover" initial="rest" className="group relative overflow-hidden rounded-2xl border border-border bg-card min-h-[260px] md:min-h-[330px]">
                <div className="absolute inset-0 overflow-hidden">
                  {project.image_url ? (
                    <motion.img
                      src={project.image_url}
                      alt=""
                      variants={{ rest: { scale: 1.04, filter: "grayscale(100%) brightness(.8)" }, hover: { scale: 1, filter: "grayscale(0%) brightness(.72)" } }}
                      transition={{ duration: .8, ease: [0.22,1,0.36,1] }}
                      className="w-full h-full object-cover"
                    />
                  ) : <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                <div className="relative z-10 min-h-[260px] md:min-h-[330px] p-6 md:p-9 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">{project.category || "Project"}</span>
                    <motion.div variants={{ rest: { rotate: 0, x: 0 }, hover: { rotate: 45, x: 3 } }} transition={{ duration: .3 }} className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center text-white"><ArrowUpRight className="w-4 h-4" /></motion.div>
                  </div>
                  <div>
                    <motion.h3 variants={{ rest: { y: 8 }, hover: { y: 0 } }} transition={{ duration: .45 }} className="text-2xl md:text-4xl font-display font-bold text-white">{project.title}</motion.h3>
                    {project.subtitle && <p className="mt-2 text-sm text-white/75 max-w-xl">{project.subtitle}</p>}
                    <div className="flex gap-4 mt-5 opacity-70 group-hover:opacity-100 transition-opacity">
                      {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white hover:text-white"><Github className="w-3.5 h-3.5" /> Code</a>}
                      {project.view_url && project.view_url !== "#" && <a href={project.view_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white"><ExternalLink className="w-3.5 h-3.5" /> Preview</a>}
                    </div>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10">
          <Link to="/works" className="group inline-flex items-center gap-3 text-sm font-semibold text-foreground border-b border-foreground/30 pb-2 hover:border-primary transition-colors">
            View all projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;

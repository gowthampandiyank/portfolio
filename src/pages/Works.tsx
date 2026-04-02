import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";

type Category = "all" | "data" | "web" | "ui";

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Data", value: "data" },
  { label: "Web", value: "web" },
  { label: "UI / UX", value: "ui" },
];

const Works = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProjects = [] } = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesFilter = activeFilter === "all" || p.category === activeFilter;
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, allProjects]);

  return (
    <div className="min-h-screen bg-background">
      <header className="py-8 text-center relative">
        <Link
          to="/"
          className="absolute left-5 top-4 text-sm text-primary hover:text-accent-strong transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h2 className="text-2xl font-semibold text-foreground">My Full Work Collection</h2>
      </header>

      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-soft text-muted-foreground border-transparent hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background border border-border">
            <Search className="w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-40"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filteredProjects.map((project, i) => (
          <motion.article
            key={project.id}
            className="rounded-xl overflow-hidden bg-foreground/95 group cursor-pointer relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500 overflow-hidden">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-primary/30">{project.title.charAt(0)}</span>
              )}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-sm font-semibold text-background text-center">{project.title}</h3>
              <p className="text-[10px] text-background/70 text-center line-clamp-4">{project.description}</p>
              <div className="flex gap-2">
                {project.view_url && project.view_url !== "#" && (
                  <a
                    href={project.view_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-semibold hover:bg-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-semibold hover:bg-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}

        {filteredProjects.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">No projects found.</p>
        )}
      </div>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        © 2025 Gowtham Pandiyan — All Rights Reserved.
      </footer>
    </div>
  );
};

export default Works;

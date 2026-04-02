import { Edit, Trash2, Image, Video, Music, ExternalLink, Github } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  activeTab: string;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const tabs = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "cloud", label: "Cloud" },
  { key: "data", label: "Data" },
  { key: "ui", label: "UI / UX" },
];

const ProjectList = ({ projects, loading, activeTab, onEdit, onDelete }: ProjectListProps & { activeTab: string }) => {
  const filtered = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div>
      {loading ? (
        <p className="text-center text-muted-foreground py-12">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No {activeTab === "all" ? "" : activeTab + " "}projects yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              {/* Thumbnail */}
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Image className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium uppercase">
                    {project.category}
                  </span>
                  {project.is_featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">
                      ★ Featured
                    </span>
                  )}
                </div>
                {project.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{project.subtitle}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>

                {/* Media & Link indicators */}
                <div className="flex items-center gap-3 mt-2">
                  {project.video_url && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Video className="w-3 h-3" /> Video
                    </span>
                  )}
                  {(project as any).audio_url && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Music className="w-3 h-3" /> Audio
                    </span>
                  )}
                  {project.view_url && (
                    <a
                      href={project.view_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-primary flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-primary flex items-center gap-1 hover:underline"
                    >
                      <Github className="w-3 h-3" /> GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this project?")) onDelete(project.id);
                  }}
                  className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { tabs };
export default ProjectList;

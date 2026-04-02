import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList, { tabs } from "@/components/admin/ProjectList";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  category: "web",
  image_url: "",
  video_url: "",
  audio_url: "",
  view_url: "",
  github_url: "",
  is_featured: false,
  display_order: 0,
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    navigate("/admin/login");
    return;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast.error("Unable to verify user");
    return;
  }

  const { data: roles, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user?.id)
    .eq("role", "admin");

  if (roleError || !roles || roles.length === 0) {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast.error("Admin access required");
  }
};

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) toast.error("Failed to load projects");
    else setProjects(data || []);
    setLoading(false);
  };

  const handleSubmit = async (formData: typeof emptyForm) => {
    if (editing) {
      const { error } = await supabase
        .from("projects")
        .update(formData)
        .eq("id", editing.id);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Project updated!");
    } else {
      const { error } = await supabase.from("projects").insert(formData);
      if (error) { toast.error("Failed to add"); return; }
      toast.success("Project added!");
    }
    resetForm();
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Project deleted");
    fetchProjects();
  };

  const startEdit = (project: Project) => {
    setEditing(project);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader
        onAddProject={() => { resetForm(); setShowForm(true); }}
        onLogout={handleLogout}
      />

      <div className="container py-8">
        {showForm && (
          <ProjectForm
            initialData={
              editing
                ? {
                    title: editing.title,
                    subtitle: editing.subtitle || "",
                    description: editing.description || "",
                    category: editing.category,
                    image_url: editing.image_url || "",
                    video_url: editing.video_url || "",
                    audio_url: (editing as any).audio_url || "",
                    view_url: editing.view_url || "",
                    github_url: editing.github_url || "",
                    is_featured: editing.is_featured || false,
                    display_order: editing.display_order || 0,
                  }
                : emptyForm
            }
            isEditing={!!editing}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              {tab.key !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({projects.filter((p) => p.category === tab.key).length})
                </span>
              )}
              {tab.key === "all" && (
                <span className="ml-1.5 text-[10px] opacity-70">({projects.length})</span>
              )}
            </button>
          ))}
        </div>

        <ProjectList
          projects={projects}
          loading={loading}
          activeTab={activeTab}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

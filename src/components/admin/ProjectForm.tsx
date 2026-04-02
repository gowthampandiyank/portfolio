import { useState } from "react";
import { Upload, Image, Video, Music, Link, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProjectFormData {
  title: string;
  subtitle: string | null;
  description: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  audio_url: string | null;
  view_url: string | null;
  github_url: string | null;
  is_featured: boolean | null;
  display_order: number | null;
}

interface ProjectFormProps {
  initialData: ProjectFormData;
  isEditing: boolean;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors";

const ProjectForm = ({ initialData, isEditing, onSubmit, onCancel }: ProjectFormProps) => {
  const [form, setForm] = useState<ProjectFormData>(initialData);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileUpload = async (
    file: File,
    type: "image" | "video" | "audio"
  ) => {
    setUploading(type);
    const fileExt = file.name.split(".").pop();
    const fileName = `${type}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      toast.error(`Upload failed: ${error.message}`);
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("projects")
      .getPublicUrl(data.path);

    const urlField = type === "image" ? "image_url" : type === "video" ? "video_url" : "audio_url";
    setForm((prev) => ({ ...prev, [urlField]: urlData.publicUrl }));
    toast.success(`${type} uploaded!`);
    setUploading(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const FileUploadField = ({
    label,
    type,
    icon: Icon,
    urlField,
    accept,
  }: {
    label: string;
    type: "image" | "video" | "audio";
    icon: typeof Image;
    urlField: "image_url" | "video_url" | "audio_url";
    accept: string;
  }) => (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground font-medium block">{label}</label>
      <div className="border border-dashed border-border rounded-lg p-4 hover:border-primary/40 transition-colors">
        {form[urlField] ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              {type === "image" && (
                <img
                  src={form[urlField]!}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}
              {type !== "image" && (
                <p className="text-xs text-muted-foreground truncate">{form[urlField]}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, [urlField]: "" })}
              className="p-1 rounded hover:bg-muted text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Icon className="w-6 h-6 text-muted-foreground" />
            <div className="flex gap-2">
              <label className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                {uploading === type ? "Uploading..." : "Upload File"}
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  disabled={uploading === type}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, type);
                  }}
                />
              </label>
              <span className="text-xs text-muted-foreground self-center">or</span>
            </div>
            <input
              type="url"
              placeholder="Paste URL..."
              value={form[urlField] || ""}
              onChange={(e) => setForm({ ...form, [urlField]: e.target.value })}
              className="w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-8 p-6 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Project Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Subtitle</label>
              <input
                type="text"
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                <option value="web">Web</option>
                <option value="cloud">Cloud</option>
                <option value="data">Data</option>
                <option value="ui">UI / UX</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <textarea
                rows={4}
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass + " resize-y"}
              />
            </div>
          </div>
        </div>

        {/* Media Uploads */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <FileUploadField
              label="Project Image"
              type="image"
              icon={Image}
              urlField="image_url"
              accept="image/*"
            />
            <FileUploadField
              label="Project Video"
              type="video"
              icon={Video}
              urlField="video_url"
              accept="video/*"
            />
            <FileUploadField
              label="Project Audio"
              type="audio"
              icon={Music}
              urlField="audio_url"
              accept="audio/*"
            />
          </div>
        </div>

        {/* Links */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                <Link className="w-3 h-3" /> Live / View URL
              </label>
              <input
                type="url"
                value={form.view_url || ""}
                onChange={(e) => setForm({ ...form, view_url: e.target.value })}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                <Link className="w-3 h-3" /> GitHub URL
              </label>
              <input
                type="url"
                value={form.github_url || ""}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className={inputClass}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center gap-6 pt-2 border-t border-border">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured || false}
              onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
              className="accent-primary"
            />
            Featured on homepage
          </label>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Display Order</label>
            <input
              type="number"
              value={form.display_order || 0}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="w-20 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:-translate-y-0.5 transition-transform"
        >
          {isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;

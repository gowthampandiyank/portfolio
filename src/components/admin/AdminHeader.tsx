import { Plus, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface AdminHeaderProps {
  onAddProject: () => void;
  onLogout: () => void;
}

const AdminHeader = ({ onAddProject, onLogout }: AdminHeaderProps) => (
  <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="container flex items-center justify-between py-3">
      <h1 className="text-lg font-bold text-foreground">
        <span className="text-primary">Admin</span> Dashboard
      </h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={onAddProject}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:-translate-y-0.5 transition-transform"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-muted-foreground rounded-md text-sm hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  </header>
);

export default AdminHeader;

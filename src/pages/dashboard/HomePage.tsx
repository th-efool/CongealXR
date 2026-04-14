import { useState } from "react";
import { Plus, FolderOpen, LayoutTemplate, GraduationCap, Play, Heart, Gamepad2, BookOpen, TrendingUp, Eye, Edit, Trash2, Upload, EyeOff, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  type: "Game" | "AR Lesson";
  status: "Published" | "Draft";
  lastEdited: string;
  plays: number;
  thumbnail: string;
}

const quickActions = [
  { title: "Create New Game", icon: Plus, description: "Start from scratch", route: "/app/studio" },
  { title: "Open Last Project", icon: FolderOpen, description: "Continue where you left off", route: "/app/creations" },
  { title: "Browse Templates", icon: LayoutTemplate, description: "Pick a starting point", route: "/app/templates" },
  { title: "Create AR Lesson", icon: GraduationCap, description: "Build interactive lessons", route: "/app/anchor" },
];

const initialProjects: Project[] = [
  { id: 1, title: "Space Tap Shooter", type: "Game", status: "Published", lastEdited: "2 hours ago", plays: 1240, thumbnail: "🚀" },
  { id: 2, title: "Biology Cell Explorer", type: "AR Lesson", status: "Draft", lastEdited: "Yesterday", plays: 0, thumbnail: "🧬" },
  { id: 3, title: "Math Quiz Runner", type: "Game", status: "Published", lastEdited: "3 days ago", plays: 890, thumbnail: "🧮" },
  { id: 4, title: "Solar System Tour", type: "AR Lesson", status: "Published", lastEdited: "1 week ago", plays: 2100, thumbnail: "🪐" },
  { id: 5, title: "Chemistry Molecules", type: "AR Lesson", status: "Draft", lastEdited: "2 weeks ago", plays: 0, thumbnail: "⚗️" },
  { id: 6, title: "Word Collect", type: "Game", status: "Published", lastEdited: "3 weeks ago", plays: 456, thumbnail: "📝" },
];

const stats = [
  { label: "Total Plays", value: "4,686", icon: Play, change: "+12%" },
  { label: "Games Created", value: "8", icon: Gamepad2, change: "+2" },
  { label: "AR Lessons", value: "4", icon: BookOpen, change: "+1" },
  { label: "Likes", value: "312", icon: Heart, change: "+28" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", type: "Game", template: "", tags: "" });

  function deleteProject(id: number) {
    setProjects(prev => prev.filter(p => p.id !== id));
    setMenuOpen(null);
  }

  function togglePublish(id: number) {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === "Published" ? "Draft" as const : "Published" as const }
          : p
      )
    );
    setMenuOpen(null);
  }

  function handleEdit(id: number) {
    const project = projects.find(p => p.id === id);
    setEditingProject(project || null);
    setMenuOpen(null);
  }

  function handleView(id: number) {
    console.log("View project:", id);
    setMenuOpen(null);
  }

  const handleQuickAction = (action: typeof quickActions[number]) => {
    if (action.title.toLowerCase().includes("create")) {
      setCreateModal(true);
    } else {
      navigate(action.route);
    }
  };

  const handleCreate = () => {
    setCreateModal(false);
    if (newProject.type === "Game") {
      navigate("/app/studio");
    } else {
      navigate("/app/anchor");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, User</h1>
        <p className="text-muted-foreground mt-1">Pick up where you left off or start something new</p>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => handleQuickAction(action)}
              className="glass-card rounded-xl p-5 text-left group cursor-pointer hover-lift glow-hover"
            >
              <action.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-sm">{action.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Projects</h2>
          <button onClick={() => navigate("/app/creations")} className="text-xs text-primary hover:text-primary/80 transition-colors">View All →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} onClick={() => handleEdit(project.id)} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift glow-hover relative">
              <div className="aspect-video bg-secondary/20 flex items-center justify-center text-4xl relative">
                {project.thumbnail}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(project.id); }} className="p-2 rounded-lg bg-primary/80 text-primary-foreground hover:bg-primary transition-colors"><Edit className="h-3.5 w-3.5" /></button>
                  {project.status === "Published" && (
                    <button onClick={(e) => { e.stopPropagation(); handleView(project.id); }} className="p-2 rounded-lg bg-secondary/50 text-foreground backdrop-blur-sm hover:bg-secondary/70 transition-colors"><Eye className="h-3.5 w-3.5" /></button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); togglePublish(project.id); }} className="p-2 rounded-lg bg-secondary/50 text-foreground backdrop-blur-sm hover:bg-secondary/70 transition-colors">
                    {project.status === "Published" ? <EyeOff className="h-3.5 w-3.5" /> : <Upload className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="p-2 rounded-lg bg-destructive/80 text-destructive-foreground hover:bg-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm truncate flex-1">{project.title}</h3>
                  <div className="relative">
                    <button onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === project.id ? null : project.id); }} className="p-1 rounded hover:bg-secondary/50">
                      <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    {menuOpen === project.id && (
                      <div className="absolute right-0 top-6 z-10 bg-card border border-border rounded-lg py-1 min-w-[120px] animate-fade-in shadow-xl">
                        <button onClick={(e) => { e.stopPropagation(); handleEdit(project.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2"><Edit className="h-3 w-3" /> Edit</button>
                        <button onClick={(e) => { e.stopPropagation(); togglePublish(project.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2">
                          {project.status === "Published" ? <><EyeOff className="h-3 w-3" /> Unpublish</> : <><Upload className="h-3 w-3" /> Publish</>}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2 text-destructive"><Trash2 className="h-3 w-3" /> Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.type === "Game" ? "badge-game" : "badge-ar"}`}>{project.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.status === "Published" ? "badge-published" : "badge-draft"}`}>{project.status}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{project.lastEdited}</span>
                </div>
                {project.plays > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Play className="h-3 w-3" /> {project.plays.toLocaleString()} plays
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="space-y-4">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 glow-hover hover-lift cursor-default">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-primary/60" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-[10px] text-green-500">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setEditingProject(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-80 space-y-4 shadow-2xl shadow-primary/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold">Edit Project</h2>
            <input
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
            />
            <select
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={editingProject.type}
              onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value as "Game" | "AR Lesson" })}
            >
              <option value="Game">Game</option>
              <option value="AR Lesson">AR Lesson</option>
            </select>
            <div className="flex gap-2 justify-end pt-2">
              <button className="text-xs px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors" onClick={() => setEditingProject(null)}>Cancel</button>
              <button
                className="text-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => {
                  setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
                  setEditingProject(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setCreateModal(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-96 space-y-4 shadow-2xl shadow-primary/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold">Create New Project</h2>
            <input
              placeholder="Project Name"
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <select
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={newProject.type}
              onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
            >
              <option value="Game">Game</option>
              <option value="AR Lesson">AR Lesson</option>
            </select>
            <input
              placeholder="Template (optional)"
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={newProject.template}
              onChange={(e) => setNewProject({ ...newProject, template: e.target.value })}
            />
            <input
              placeholder="Tags (comma separated)"
              className="w-full bg-secondary/50 p-2.5 rounded-lg text-xs border border-border outline-none focus:ring-1 focus:ring-primary"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button className="px-4 py-2 text-xs bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors" onClick={() => setCreateModal(false)}>Cancel</button>
              <button
                className="px-4 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newProject.title}
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

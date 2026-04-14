import { Play, Star, MoreVertical, Edit, Eye, Trash2, Upload, EyeOff } from "lucide-react";
import { useState } from "react";

interface Creation {
  id: number;
  title: string;
  type: "Game" | "AR Lesson";
  status: "Published" | "Draft";
  plays: number;
  rating: number;
  thumbnail: string;
  lastEdited: string;
}

const initialCreations: Creation[] = [
  { id: 1, title: "Space Tap Shooter", type: "Game", status: "Published", plays: 1240, rating: 4.5, thumbnail: "🚀", lastEdited: "2h ago" },
  { id: 2, title: "Biology Cell Explorer", type: "AR Lesson", status: "Draft", plays: 0, rating: 0, thumbnail: "🧬", lastEdited: "1d ago" },
  { id: 3, title: "Math Quiz Runner", type: "Game", status: "Published", plays: 890, rating: 4.2, thumbnail: "🧮", lastEdited: "3d ago" },
  { id: 4, title: "Solar System Tour", type: "AR Lesson", status: "Published", plays: 2100, rating: 4.8, thumbnail: "🪐", lastEdited: "1w ago" },
  { id: 5, title: "Chemistry Molecules", type: "AR Lesson", status: "Draft", plays: 0, rating: 0, thumbnail: "⚗️", lastEdited: "2w ago" },
  { id: 6, title: "Word Collect", type: "Game", status: "Published", plays: 456, rating: 3.9, thumbnail: "📝", lastEdited: "3w ago" },
  { id: 7, title: "Anatomy AR", type: "AR Lesson", status: "Published", plays: 780, rating: 4.6, thumbnail: "🫀", lastEdited: "1m ago" },
  { id: 8, title: "Color Match", type: "Game", status: "Draft", plays: 0, rating: 0, thumbnail: "🎨", lastEdited: "1m ago" },
];

export default function MyCreationsPage() {
  const [projects, setProjects] = useState<Creation[]>(initialCreations);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Creation | null>(null);

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

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Creations</h1>
        <span className="text-xs text-muted-foreground">{projects.length} projects</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((item) => (
          <div key={item.id} onClick={() => handleEdit(item.id)} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift glow-hover relative">
            <div className="aspect-video bg-secondary/20 flex items-center justify-center text-4xl relative">
              {item.thumbnail}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }} className="p-2 rounded-lg bg-primary/80 text-primary-foreground hover:bg-primary transition-colors"><Edit className="h-3.5 w-3.5" /></button>
                {item.status === "Published" && (
                  <button onClick={(e) => { e.stopPropagation(); handleView(item.id); }} className="p-2 rounded-lg bg-secondary/50 text-foreground backdrop-blur-sm hover:bg-secondary/70 transition-colors"><Eye className="h-3.5 w-3.5" /></button>
                )}
                <button onClick={(e) => { e.stopPropagation(); togglePublish(item.id); }} className="p-2 rounded-lg bg-secondary/50 text-foreground backdrop-blur-sm hover:bg-secondary/70 transition-colors">
                  {item.status === "Published" ? <EyeOff className="h-3.5 w-3.5" /> : <Upload className="h-3.5 w-3.5" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteProject(item.id); }} className="p-2 rounded-lg bg-destructive/80 text-destructive-foreground hover:bg-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="p-3.5 space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm truncate flex-1">{item.title}</h3>
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === item.id ? null : item.id); }} className="p-1 rounded hover:bg-secondary/50">
                    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  {menuOpen === item.id && (
                    <div className="absolute right-0 top-6 z-10 glass-panel rounded-lg py-1 min-w-[120px] animate-fade-in shadow-xl">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2"><Edit className="h-3 w-3" /> Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); togglePublish(item.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2">
                        {item.status === "Published" ? <><EyeOff className="h-3 w-3" /> Unpublish</> : <><Upload className="h-3 w-3" /> Publish</>}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteProject(item.id); }} className="w-full px-3 py-1.5 text-left text-xs hover:bg-secondary/30 flex items-center gap-2 text-destructive"><Trash2 className="h-3 w-3" /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.type === "Game" ? "badge-game" : "badge-ar"}`}>{item.type}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === "Published" ? "badge-published" : "badge-draft"}`}>{item.status}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                {item.plays > 0 && <span className="flex items-center gap-1"><Play className="h-3 w-3" />{item.plays.toLocaleString()}</span>}
                {item.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" />{item.rating}</span>}
                <span className="ml-auto">{item.lastEdited}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingProject(null)}>
          <div className="glass-card p-6 rounded-xl w-80 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm font-bold">Edit Project</h2>
            <input
              className="w-full bg-secondary/30 p-2 rounded text-xs border border-border"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
            />
            <select
              className="w-full bg-secondary/30 p-2 rounded text-xs border border-border"
              value={editingProject.type}
              onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value as "Game" | "AR Lesson" })}
            >
              <option value="Game">Game</option>
              <option value="AR Lesson">AR Lesson</option>
            </select>
            <div className="flex gap-2 justify-end">
              <button className="text-xs px-3 py-1 rounded bg-secondary/50 hover:bg-secondary/70 transition-colors" onClick={() => setEditingProject(null)}>Cancel</button>
              <button
                className="text-xs px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
    </div>
  );
}

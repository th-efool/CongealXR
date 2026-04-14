import { Plus, FolderOpen, LayoutTemplate, GraduationCap, Play, Heart, Gamepad2, BookOpen, TrendingUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { title: "Create New Game", icon: Plus, description: "Start from scratch", route: "/app/studio" },
  { title: "Open Last Project", icon: FolderOpen, description: "Continue where you left off", route: "/app/creations" },
  { title: "Browse Templates", icon: LayoutTemplate, description: "Pick a starting point", route: "/app/templates" },
  { title: "Create AR Lesson", icon: GraduationCap, description: "Build interactive lessons", route: "/app/anchor" },
];

const recentProjects = [
  { id: 1, title: "Space Tap Shooter", type: "Game" as const, status: "Published" as const, lastEdited: "2 hours ago", plays: 1240, thumbnail: "🚀" },
  { id: 2, title: "Biology Cell Explorer", type: "AR Lesson" as const, status: "Draft" as const, lastEdited: "Yesterday", plays: 0, thumbnail: "🧬" },
  { id: 3, title: "Math Quiz Runner", type: "Game" as const, status: "Published" as const, lastEdited: "3 days ago", plays: 890, thumbnail: "🧮" },
  { id: 4, title: "Solar System Tour", type: "AR Lesson" as const, status: "Published" as const, lastEdited: "1 week ago", plays: 2100, thumbnail: "🪐" },
  { id: 5, title: "Chemistry Molecules", type: "AR Lesson" as const, status: "Draft" as const, lastEdited: "2 weeks ago", plays: 0, thumbnail: "⚗️" },
  { id: 6, title: "Word Collect", type: "Game" as const, status: "Published" as const, lastEdited: "3 weeks ago", plays: 456, thumbnail: "📝" },
];

const stats = [
  { label: "Total Plays", value: "4,686", icon: Play, change: "+12%" },
  { label: "Games Created", value: "8", icon: Gamepad2, change: "+2" },
  { label: "AR Lessons", value: "4", icon: BookOpen, change: "+1" },
  { label: "Likes", value: "312", icon: Heart, change: "+28" },
];

export default function HomePage() {
  const navigate = useNavigate();

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
              onClick={() => navigate(action.route)}
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
          {recentProjects.map((project) => (
            <div key={project.id} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift glow-hover">
              <div className="aspect-video bg-secondary/20 flex items-center justify-center text-4xl relative">
                {project.thumbnail}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                    Edit
                  </button>
                  {project.status === "Published" && (
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium backdrop-blur-sm hover:bg-white/20 transition-colors">
                      <Eye className="h-3 w-3 inline mr-1" />Preview
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-sm truncate">{project.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.type === "Game" ? "badge-game" : "badge-ar"}`}>
                    {project.type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.status === "Published" ? "badge-published" : "badge-draft"}`}>
                    {project.status}
                  </span>
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
    </div>
  );
}

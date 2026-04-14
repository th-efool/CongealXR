import { Plus, FolderOpen, LayoutTemplate, GraduationCap } from "lucide-react";

const quickActions = [
  { title: "Create New Game", icon: Plus, description: "Start from scratch" },
  { title: "Open Last Project", icon: FolderOpen, description: "Continue where you left off" },
  { title: "Browse Templates", icon: LayoutTemplate, description: "Pick a starting point" },
  { title: "Create AR Lesson", icon: GraduationCap, description: "Build interactive lessons" },
];

export default function HomePage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, User</h1>
        <p className="text-muted-foreground mt-1">
          Pick up where you left off or start something new
        </p>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              className="glass-card rounded-xl p-5 text-left group cursor-pointer"
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
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-video bg-secondary/30" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-secondary/50 rounded" />
                <div className="h-3 w-1/2 bg-secondary/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["Total Projects", "Published", "Total Views", "Avg. Rating"].map((label) => (
            <div key={label} className="glass-card rounded-xl p-5">
              <p className="text-xs text-muted-foreground">{label}</p>
              <div className="h-8 w-16 bg-secondary/50 rounded mt-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

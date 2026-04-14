import { TrendingUp, Eye, Users, Clock, Star } from "lucide-react";

const stats = [
  { label: "Total Views", value: "12,486", icon: Eye, change: "+18%", color: "text-blue-400" },
  { label: "Unique Users", value: "3,241", icon: Users, change: "+9%", color: "text-green-400" },
  { label: "Avg. Session", value: "4m 32s", icon: Clock, change: "+12%", color: "text-yellow-400" },
  { label: "Engagement", value: "76%", icon: TrendingUp, change: "+5%", color: "text-purple-400" },
];

const chartData = [20, 35, 45, 30, 55, 70, 65, 80, 75, 90, 85, 95];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const topProjects = [
  { name: "Solar System Tour", plays: 2100, rating: 4.8, type: "AR Lesson" },
  { name: "Space Tap Shooter", plays: 1240, rating: 4.5, type: "Game" },
  { name: "Math Quiz Runner", plays: 890, rating: 4.2, type: "Game" },
  { name: "Anatomy AR", plays: 780, rating: 4.6, type: "AR Lesson" },
];

const typeBreakdown = [
  { label: "Games", count: 4, pct: 57, color: "bg-purple-500" },
  { label: "AR Lessons", count: 3, pct: 43, color: "bg-blue-500" },
];

export default function AnalyticsPage() {
  const maxVal = Math.max(...chartData);

  return (
    <div className="space-y-8 max-w-6xl animate-fade-in">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5 hover-lift glow-hover">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-[10px] text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart (CSS-based) */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Plays Over Time</h2>
        <div className="flex items-end gap-2 h-48">
          {chartData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative group">
                <div
                  className="w-full rounded-t-md bg-primary/60 hover:bg-primary transition-colors relative"
                  style={{ height: `${(val / maxVal) * 160}px` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {val * 10}
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* By Type */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">By Type</h3>
          <div className="space-y-4">
            {typeBreakdown.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.count} projects · {item.pct}%</span>
                </div>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Projects */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Projects</h3>
          <div className="space-y-3">
            {topProjects.map((project, i) => (
              <div key={project.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.name}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${project.type === "Game" ? "badge-game" : "badge-ar"}`}>{project.type}</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs">{project.plays.toLocaleString()} plays</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end"><Star className="h-3 w-3 text-yellow-500" />{project.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

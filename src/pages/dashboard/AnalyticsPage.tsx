export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Stats Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {["Total Views", "Unique Users", "Avg. Session", "Engagement"].map((label) => (
          <div key={label} className="glass-card rounded-xl p-5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <div className="h-8 w-20 bg-secondary/50 rounded mt-2" />
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Activity Over Time</h2>
        <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Chart Placeholder</p>
        </div>
      </div>

      {/* Secondary Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">By Type</h3>
          <div className="h-48 bg-secondary/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Chart</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Projects</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <div className="h-3 flex-1 bg-secondary/40 rounded" />
                <div className="h-3 w-10 bg-secondary/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

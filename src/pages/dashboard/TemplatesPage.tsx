export default function TemplatesPage() {
  return (
    <div className="space-y-10 max-w-6xl">
      <h1 className="text-2xl font-bold">Templates</h1>

      {/* Game Templates */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Game Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-secondary/30" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-secondary/50 rounded" />
                <div className="h-3 w-1/2 bg-secondary/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AR Lesson Templates */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">AR Lesson Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-secondary/30" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-secondary/50 rounded" />
                <div className="h-3 w-1/2 bg-secondary/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

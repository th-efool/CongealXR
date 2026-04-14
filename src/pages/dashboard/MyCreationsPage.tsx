export default function MyCreationsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold">My Creations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="glass-card rounded-xl overflow-hidden group cursor-pointer">
            <div className="aspect-video bg-secondary/30" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-secondary/50 rounded" />
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</span>
                <span className="h-2 w-2 rounded-full bg-green-500/60" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground ml-auto">Type</span>
                <div className="h-3 w-12 bg-secondary/40 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

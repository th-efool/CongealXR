import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ExplorePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold">Explore</h1>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search experiences..." className="pl-9 bg-secondary/50 border-border/50" />
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2">
        {["All", "Games", "AR Lessons", "Popular", "Recent"].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors first:bg-primary first:text-primary-foreground"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="glass-card rounded-xl overflow-hidden group cursor-pointer">
            <div className="aspect-video bg-secondary/30" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-secondary/50 rounded" />
              <div className="h-3 w-1/2 bg-secondary/30 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Search, Play, Star, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ExploreItem {
  id: number;
  title: string;
  creator: string;
  type: "Game" | "AR Lesson";
  plays: number;
  rating: number;
  thumbnail: string;
  tags: string[];
}

const items: ExploreItem[] = [
  { id: 1, title: "Galaxy Defender", creator: "StarMaker", type: "Game", plays: 5400, rating: 4.7, thumbnail: "🌌", tags: ["Action", "Space"] },
  { id: 2, title: "Human Body AR", creator: "EduLab", type: "AR Lesson", plays: 3200, rating: 4.9, thumbnail: "🫁", tags: ["Biology", "Education"] },
  { id: 3, title: "Fruit Ninja Clone", creator: "GameDev42", type: "Game", plays: 8100, rating: 4.3, thumbnail: "🍉", tags: ["Casual", "Fun"] },
  { id: 4, title: "Periodic Table 3D", creator: "ChemWiz", type: "AR Lesson", plays: 1800, rating: 4.6, thumbnail: "⚗️", tags: ["Chemistry", "Interactive"] },
  { id: 5, title: "Maze Runner", creator: "PuzzlePro", type: "Game", plays: 2900, rating: 4.1, thumbnail: "🏃", tags: ["Puzzle", "Adventure"] },
  { id: 6, title: "Plant Cell Viewer", creator: "BioTeach", type: "AR Lesson", plays: 1200, rating: 4.4, thumbnail: "🌿", tags: ["Biology", "Cells"] },
  { id: 7, title: "Tap Rhythm", creator: "MusicMaker", type: "Game", plays: 6700, rating: 4.5, thumbnail: "🎵", tags: ["Music", "Rhythm"] },
  { id: 8, title: "Engine Parts AR", creator: "MechEd", type: "AR Lesson", plays: 950, rating: 4.8, thumbnail: "⚙️", tags: ["Engineering", "3D"] },
  { id: 9, title: "Bubble Pop", creator: "CasualKing", type: "Game", plays: 12000, rating: 4.0, thumbnail: "🫧", tags: ["Casual", "Relaxing"] },
];

const filters = ["All", "Games", "AR Lessons", "Popular", "Recent"];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = items.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Games") return item.type === "Game";
    if (activeFilter === "AR Lessons") return item.type === "AR Lesson";
    if (activeFilter === "Popular") return item.plays > 3000;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <h1 className="text-2xl font-bold">Explore</h1>

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search experiences..." className="pl-9 bg-secondary/50 border-border/50" />
      </div>

      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeFilter === filter ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift glow-hover">
            <div className="aspect-video bg-secondary/20 flex items-center justify-center text-4xl relative">
              {item.thumbnail}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Play className="h-3.5 w-3.5" /> Play Now
                </button>
              </div>
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 text-white/60 hover:text-red-400 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100">
                <Heart className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-3.5 space-y-2">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-[10px] text-muted-foreground">by {item.creator}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.type === "Game" ? "badge-game" : "badge-ar"}`}>{item.type}</span>
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/30 text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Play className="h-3 w-3" />{item.plays.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" />{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

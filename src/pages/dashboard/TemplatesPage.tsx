import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Template {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const gameTemplates: Template[] = [
  { id: 1, title: "Tap Shooter", description: "Tap enemies to score. Simple arcade gameplay with timer.", thumbnail: "🎯", difficulty: "Beginner" },
  { id: 2, title: "Collect Game", description: "Move & collect items while avoiding obstacles.", thumbnail: "💎", difficulty: "Beginner" },
  { id: 3, title: "AR Pet", description: "Virtual pet in AR. Feed, play, and interact.", thumbnail: "🐾", difficulty: "Intermediate" },
  { id: 4, title: "Quiz Battle", description: "Multiplayer quiz with real-time scoring.", thumbnail: "⚔️", difficulty: "Intermediate" },
  { id: 5, title: "Platformer", description: "Side-scrolling platformer with physics.", thumbnail: "🏃", difficulty: "Advanced" },
  { id: 6, title: "Tower Defense", description: "Strategic tower placement & wave defense.", thumbnail: "🏰", difficulty: "Advanced" },
];

const arTemplates: Template[] = [
  { id: 7, title: "Biology Diagram", description: "Interactive cell diagrams with labels & quiz.", thumbnail: "🧬", difficulty: "Beginner" },
  { id: 8, title: "Chemistry Molecule", description: "3D molecular structures with rotation.", thumbnail: "⚗️", difficulty: "Intermediate" },
  { id: 9, title: "Engineering Part", description: "Exploded view of mechanical components.", thumbnail: "⚙️", difficulty: "Intermediate" },
  { id: 10, title: "Anatomy Explorer", description: "Human body systems with layered AR views.", thumbnail: "🫀", difficulty: "Advanced" },
  { id: 11, title: "Geography Map", description: "Interactive 3D map with pop-up facts.", thumbnail: "🗺️", difficulty: "Beginner" },
  { id: 12, title: "Physics Simulation", description: "Visualize forces, motion, and energy.", thumbnail: "🔭", difficulty: "Advanced" },
];

const difficultyColor: Record<string, string> = {
  Beginner: "text-green-500 bg-green-500/10 border-green-500/20",
  Intermediate: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

function TemplateCard({ template }: { template: Template }) {
  const navigate = useNavigate();
  return (
    <div className="glass-card rounded-xl overflow-hidden group cursor-pointer hover-lift glow-hover">
      <div className="aspect-video bg-secondary/20 flex items-center justify-center text-4xl relative">
        {template.thumbnail}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" className="text-xs gap-1.5 bg-primary" onClick={() => navigate("/app/studio")}>
            <ArrowRight className="h-3 w-3" /> Use Template
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm">{template.title}</h3>
        <p className="text-[11px] text-muted-foreground line-clamp-2">{template.description}</p>
        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-medium border ${difficultyColor[template.difficulty]}`}>
          {template.difficulty}
        </span>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="space-y-10 max-w-6xl animate-fade-in">
      <h1 className="text-2xl font-bold">Templates</h1>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎮</span>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Game Templates</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameTemplates.map((t) => <TemplateCard key={t.id} template={t} />)}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📚</span>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">AR Lesson Templates</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arTemplates.map((t) => <TemplateCard key={t.id} template={t} />)}
        </div>
      </section>
    </div>
  );
}

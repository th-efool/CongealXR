import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";
import { useState } from "react";

export default function AnchorModePage() {
  const [mode, setMode] = useState<"game" | "lesson">("game");

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
      {/* Mode Toggle */}
      <div className="h-12 flex items-center gap-4 px-4 border-b border-border/50 glass-panel shrink-0">
        <span className="text-xs text-muted-foreground font-medium">Mode:</span>
        <div className="flex rounded-lg overflow-hidden border border-border/50">
          <button
            onClick={() => setMode("game")}
            className={`px-4 py-1.5 text-xs font-medium transition-colors ${
              mode === "game" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Game
          </button>
          <button
            onClick={() => setMode("lesson")}
            className={`px-4 py-1.5 text-xs font-medium transition-colors ${
              mode === "lesson" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            AR Lesson
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left - Image Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {mode === "game" ? "Game Assets" : "Lesson Assets"}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="glass-card rounded-lg aspect-square" />
            ))}
          </div>
        </div>

        {/* Right - Configuration */}
        <div className="w-72 border-l border-border/50 p-4 space-y-4 shrink-0 overflow-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Configuration</h3>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-secondary/50 rounded" />
              <div className="glass-card rounded-lg p-3 h-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-14 flex items-center justify-end gap-3 px-4 border-t border-border/50 glass-panel shrink-0">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <Save className="h-3.5 w-3.5" /> Save
        </Button>
        <Button size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
          <Upload className="h-3.5 w-3.5" /> Publish
        </Button>
      </div>
    </div>
  );
}

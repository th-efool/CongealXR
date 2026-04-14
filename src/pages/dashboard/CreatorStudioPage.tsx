import { Play, Save, Upload, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorStudioPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
      {/* Top Toolbar */}
      <div className="h-12 flex items-center gap-2 px-4 border-b border-border/50 glass-panel shrink-0">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <Undo2 className="h-3.5 w-3.5" /> Undo
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <Redo2 className="h-3.5 w-3.5" /> Redo
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <Play className="h-3.5 w-3.5" /> Play
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
          <Save className="h-3.5 w-3.5" /> Save
        </Button>
        <Button size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90">
          <Upload className="h-3.5 w-3.5" /> Publish
        </Button>
      </div>

      {/* Three-panel layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left Panel - Block Palette */}
        <div className="w-60 border-r border-border/50 p-4 space-y-3 shrink-0 overflow-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Blocks</h3>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-lg p-3 h-12" />
          ))}
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex items-center justify-center bg-secondary/10">
          <div className="border-2 border-dashed border-border/30 rounded-xl w-[80%] h-[80%] flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Canvas Area</p>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-64 border-l border-border/50 p-4 space-y-3 shrink-0 overflow-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Properties</h3>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-secondary/50 rounded" />
              <div className="glass-card rounded-lg p-3 h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

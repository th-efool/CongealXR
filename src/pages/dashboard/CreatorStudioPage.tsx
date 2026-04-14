import { Play, Save, Upload, Undo2, Redo2, Zap, GitBranch, MousePointer, Box, Timer, Target, Volume2, Move, RotateCw, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type BlockCategory = "events" | "conditions" | "actions";

interface Block {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  category: BlockCategory;
}

const blocks: Block[] = [
  { id: "tap", label: "On Tap", icon: MousePointer, color: "rgba(139,92,246,0.3)", category: "events" },
  { id: "collision", label: "On Collision", icon: Target, color: "rgba(139,92,246,0.3)", category: "events" },
  { id: "timer", label: "On Timer", icon: Timer, color: "rgba(139,92,246,0.3)", category: "events" },
  { id: "distance", label: "If Distance <", icon: GitBranch, color: "rgba(234,179,8,0.3)", category: "conditions" },
  { id: "score", label: "If Score >", icon: GitBranch, color: "rgba(234,179,8,0.3)", category: "conditions" },
  { id: "visible", label: "If Visible", icon: GitBranch, color: "rgba(234,179,8,0.3)", category: "conditions" },
  { id: "move", label: "Move Object", icon: Move, color: "rgba(59,130,246,0.3)", category: "actions" },
  { id: "rotate", label: "Rotate", icon: RotateCw, color: "rgba(59,130,246,0.3)", category: "actions" },
  { id: "spawn", label: "Spawn Object", icon: Box, color: "rgba(59,130,246,0.3)", category: "actions" },
  { id: "sound", label: "Play Sound", icon: Volume2, color: "rgba(59,130,246,0.3)", category: "actions" },
  { id: "destroy", label: "Destroy", icon: Trash2, color: "rgba(59,130,246,0.3)", category: "actions" },
  { id: "score-add", label: "Add Score", icon: Zap, color: "rgba(59,130,246,0.3)", category: "actions" },
];

const categoryLabels: Record<BlockCategory, string> = { events: "Events", conditions: "Conditions", actions: "Actions" };
const categoryColors: Record<BlockCategory, string> = { events: "text-purple-400", conditions: "text-yellow-400", actions: "text-blue-400" };

interface CanvasNode {
  id: string;
  block: Block;
  x: number;
  y: number;
}

const demoNodes: CanvasNode[] = [
  { id: "n1", block: blocks[0], x: 80, y: 60 },
  { id: "n2", block: blocks[3], x: 300, y: 60 },
  { id: "n3", block: blocks[6], x: 520, y: 60 },
  { id: "n4", block: blocks[11], x: 520, y: 160 },
];

export default function CreatorStudioPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>("n1");
  const [expandedCat, setExpandedCat] = useState<BlockCategory>("events");
  const selected = demoNodes.find((n) => n.id === selectedNode);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
      {/* Top Toolbar */}
      <div className="h-12 flex items-center gap-2 px-4 border-b border-border/50 glass-panel shrink-0">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Undo2 className="h-3.5 w-3.5" /> Undo</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Redo2 className="h-3.5 w-3.5" /> Redo</Button>
        <div className="h-5 w-px bg-border/50 mx-1" />
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Copy className="h-3.5 w-3.5" /> Duplicate</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground mr-2">4 nodes · 3 connections</span>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Play className="h-3.5 w-3.5" /> Play</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Save className="h-3.5 w-3.5" /> Save</Button>
        <Button size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90"><Upload className="h-3.5 w-3.5" /> Publish</Button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left: Block Palette */}
        <div className="w-60 border-r border-border/50 shrink-0 overflow-auto glass-panel">
          <div className="p-3">
            <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Block Palette</h3>
            {(["events", "conditions", "actions"] as BlockCategory[]).map((cat) => (
              <div key={cat} className="mb-3">
                <button
                  onClick={() => setExpandedCat(cat)}
                  className={`w-full text-left text-[11px] font-semibold uppercase tracking-wider mb-2 ${categoryColors[cat]} hover:opacity-80 transition-opacity`}
                >
                  {categoryLabels[cat]}
                </button>
                {expandedCat === cat && (
                  <div className="space-y-1.5 animate-fade-in">
                    {blocks.filter((b) => b.category === cat).map((block) => (
                      <div
                        key={block.id}
                        draggable
                        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing hover-lift transition-all text-xs"
                        style={{ background: block.color, border: `1px solid ${block.color.replace("0.3", "0.5")}` }}
                      >
                        <block.icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium">{block.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 relative canvas-grid overflow-hidden">
          {/* Helper text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="text-center space-y-2 opacity-20">
              <p className="text-sm">Drag blocks here</p>
              <p className="text-[10px]">Connect event → condition → action</p>
            </div>
          </div>
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            <line x1={230} y1={80} x2={300} y2={80} stroke="rgba(139,92,246,0.5)" strokeWidth={2} strokeDasharray="6 4" className="animate-dash" />
            <line x1={450} y1={80} x2={520} y2={80} stroke="rgba(59,130,246,0.5)" strokeWidth={2} strokeDasharray="6 4" className="animate-dash" />
            <line x1={570} y1={100} x2={570} y2={160} stroke="rgba(59,130,246,0.3)" strokeWidth={2} strokeDasharray="6 4" className="animate-dash" />
          </svg>
          {/* Nodes */}
          {demoNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`absolute z-[2] flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all text-xs font-medium hover-lift ${selectedNode === node.id ? "ring-2 ring-primary animate-pulse-glow" : ""}`}
              style={{
                left: node.x,
                top: node.y,
                background: node.block.color,
                border: `1px solid ${node.block.color.replace("0.3", "0.6")}`,
              }}
            >
              <node.block.icon className="h-4 w-4" />
              {node.block.label}
            </div>
          ))}
        </div>

        {/* Right: Properties Panel */}
        <div className="w-64 border-l border-border/50 shrink-0 overflow-auto glass-panel">
          <div className="p-4 space-y-4">
            <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Properties</h3>
            {selected ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: selected.block.color }}>
                  <selected.block.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{selected.block.label}</span>
                </div>

                {/* Dynamic fields based on block type */}
                {selected.block.category === "events" && (
                  <>
                    <PropertyField label="Trigger" type="dropdown" options={["Single Tap", "Double Tap", "Long Press"]} />
                    <PropertyField label="Delay (ms)" type="slider" value={0} max={5000} />
                    <PropertyField label="Repeat" type="toggle" />
                  </>
                )}
                {selected.block.category === "conditions" && (
                  <>
                    <PropertyField label="Distance" type="slider" value={50} max={500} unit="px" />
                    <PropertyField label="Object Type" type="dropdown" options={["Any", "Player", "Enemy", "Collectible"]} />
                    <PropertyField label="Invert" type="toggle" />
                  </>
                )}
                {selected.block.category === "actions" && (
                  <>
                    <PropertyField label="Target" type="dropdown" options={["Self", "Player", "Nearest Enemy"]} />
                    <PropertyField label="Speed" type="slider" value={100} max={1000} unit="px/s" />
                    <PropertyField label="Duration (s)" type="slider" value={1} max={10} />
                    <PropertyField label="Easing" type="dropdown" options={["Linear", "Ease In", "Ease Out", "Bounce"]} />
                  </>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Select a block on the canvas to edit its properties.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyField({ label, type, options, value, max, unit, }: { label: string; type: "slider" | "dropdown" | "toggle"; options?: string[]; value?: number; max?: number; unit?: string; }) {
  const [toggleOn, setToggleOn] = useState(false);
  const [sliderVal, setSliderVal] = useState(value ?? 50);

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] text-muted-foreground font-medium">{label}</label>
      {type === "slider" && (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={max ?? 100}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="flex-1 h-1.5 bg-secondary/50 rounded-full appearance-none cursor-pointer accent-primary"
          />
          <span className="text-[10px] text-muted-foreground w-14 text-right">{sliderVal}{unit}</span>
        </div>
      )}
      {type === "dropdown" && (
        <select className="w-full bg-secondary/30 border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary">
          {options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {type === "toggle" && (
        <button
          onClick={() => setToggleOn(!toggleOn)}
          className={`relative w-10 h-5 rounded-full transition-colors ${toggleOn ? "bg-primary" : "bg-secondary/50"}`}
        >
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${toggleOn ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      )}
    </div>
  );
}

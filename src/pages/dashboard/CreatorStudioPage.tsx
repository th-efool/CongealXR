import { Play, Save, Upload, Undo2, Redo2, Zap, GitBranch, MousePointer, Box, Timer, Target, Volume2, Move, RotateCw, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback } from "react";

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
  props: Record<string, string | number | boolean>;
}

interface Connection {
  from: string;
  to: string;
}

export default function CreatorStudioPage() {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedCat, setExpandedCat] = useState<BlockCategory>("events");
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const selected = nodes.find((n) => n.id === selectedNode) ?? null;

  // -- Drag block from palette to canvas --
  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData("block-id");
    if (!blockId) return;
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newNode: CanvasNode = {
      id: "n" + Date.now(),
      block,
      x: e.clientX - rect.left - 60,
      y: e.clientY - rect.top - 20,
      props: getDefaultProps(block.category),
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
  };

  // -- Node dragging on canvas --
  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    draggingRef.current = { id: nodeId, offsetX: e.clientX - node.x, offsetY: e.clientY - node.y };
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    const rect = canvasRef.current?.getBoundingClientRect();

    function onMove(ev: MouseEvent) {
      if (!draggingRef.current || !rect) return;
      const newX = ev.clientX - rect.left - (draggingRef.current.offsetX - (rect?.left ?? 0));
      const newY = ev.clientY - rect.top - (draggingRef.current.offsetY - (rect?.top ?? 0));
      setNodes(prev => prev.map(n => n.id === draggingRef.current!.id ? { ...n, x: Math.max(0, ev.clientX - rect.left - 60), y: Math.max(0, ev.clientY - rect.top - 20) } : n));
    }

    function onUp() {
      draggingRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [nodes]);

  // -- Node click (select or connect) --
  const handleNodeClick = (nodeId: string) => {
    if (connectingFrom) {
      if (connectingFrom !== nodeId) {
        const exists = connections.some(c => c.from === connectingFrom && c.to === nodeId);
        if (!exists) {
          setConnections(prev => [...prev, { from: connectingFrom, to: nodeId }]);
        }
      }
      setConnectingFrom(null);
    } else {
      setSelectedNode(nodeId);
    }
  };

  // -- Actions --
  const deleteSelected = () => {
    if (!selectedNode) return;
    setNodes(prev => prev.filter(n => n.id !== selectedNode));
    setConnections(prev => prev.filter(c => c.from !== selectedNode && c.to !== selectedNode));
    setSelectedNode(null);
  };

  const duplicateSelected = () => {
    if (!selected) return;
    const newNode: CanvasNode = { ...selected, id: "n" + Date.now(), x: selected.x + 30, y: selected.y + 30, props: { ...selected.props } };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
  };

  const startConnecting = () => {
    if (selectedNode) setConnectingFrom(selectedNode);
  };

  const playSimulation = () => {
    const eventNodes = nodes.filter(n => n.block.category === "events");
    const conditionNodes = nodes.filter(n => n.block.category === "conditions");
    const actionNodes = nodes.filter(n => n.block.category === "actions");
    console.log("▶ Simulating flow...");
    console.log("  Events:", eventNodes.map(n => n.block.label));
    console.log("  Conditions:", conditionNodes.map(n => n.block.label));
    console.log("  Actions:", actionNodes.map(n => n.block.label));
    console.log("  Connections:", connections);
  };

  const saveGraph = () => {
    console.log("💾 Saved:", { nodes, connections });
  };

  const publishGraph = () => {
    console.log("📤 Published:", { nodes, connections });
  };

  const updateNodeProp = (key: string, value: string | number | boolean) => {
    if (!selectedNode) return;
    setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, props: { ...n.props, [key]: value } } : n));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
      {/* Top Toolbar */}
      <div className="h-12 flex items-center gap-2 px-4 border-b border-border/50 glass-panel shrink-0">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Undo2 className="h-3.5 w-3.5" /> Undo</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Redo2 className="h-3.5 w-3.5" /> Redo</Button>
        <div className="h-5 w-px bg-border/50 mx-1" />
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={duplicateSelected} disabled={!selectedNode}><Copy className="h-3.5 w-3.5" /> Duplicate</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-destructive" onClick={deleteSelected} disabled={!selectedNode}><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
        <div className="h-5 w-px bg-border/50 mx-1" />
        <Button variant="ghost" size="sm" className={`gap-1.5 text-xs ${connectingFrom ? "ring-2 ring-primary" : ""}`} onClick={startConnecting} disabled={!selectedNode}>
          <GitBranch className="h-3.5 w-3.5" /> {connectingFrom ? "Click target…" : "Connect"}
        </Button>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground mr-2">{nodes.length} nodes · {connections.length} connections</span>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={playSimulation}><Play className="h-3.5 w-3.5" /> Play</Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={saveGraph}><Save className="h-3.5 w-3.5" /> Save</Button>
        <Button size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90" onClick={publishGraph}><Upload className="h-3.5 w-3.5" /> Publish</Button>
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
                        onDragStart={(e) => e.dataTransfer.setData("block-id", block.id)}
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
        <div
          ref={canvasRef}
          className="flex-1 relative canvas-grid overflow-hidden"
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
          onClick={() => { setSelectedNode(null); setConnectingFrom(null); }}
        >
          {/* Helper text */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="text-center space-y-2 opacity-20">
                <p className="text-sm">Drag blocks here</p>
                <p className="text-[10px]">Connect event → condition → action</p>
              </div>
            </div>
          )}
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            {connections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;
              return (
                <line
                  key={i}
                  x1={fromNode.x + 75}
                  y1={fromNode.y + 20}
                  x2={toNode.x}
                  y2={toNode.y + 20}
                  stroke="rgba(139,92,246,0.5)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  className="animate-dash"
                />
              );
            })}
          </svg>
          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onClick={(e) => { e.stopPropagation(); handleNodeClick(node.id); }}
              className={`absolute z-[2] flex items-center gap-2 px-4 py-3 rounded-xl cursor-grab active:cursor-grabbing transition-all text-xs font-medium hover-lift ${selectedNode === node.id ? "ring-2 ring-primary animate-pulse-glow" : ""} ${connectingFrom ? "cursor-crosshair" : ""}`}
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

                {selected.block.category === "events" && (
                  <>
                    <PropertyField label="Trigger" type="dropdown" options={["Single Tap", "Double Tap", "Long Press"]} value={selected.props.trigger as string} onChange={(v) => updateNodeProp("trigger", v)} />
                    <PropertyField label="Delay (ms)" type="slider" value={selected.props.delay as number} max={5000} onChange={(v) => updateNodeProp("delay", v)} />
                    <PropertyField label="Repeat" type="toggle" value={selected.props.repeat as boolean} onChange={(v) => updateNodeProp("repeat", v)} />
                  </>
                )}
                {selected.block.category === "conditions" && (
                  <>
                    <PropertyField label="Distance" type="slider" value={selected.props.distance as number} max={500} unit="px" onChange={(v) => updateNodeProp("distance", v)} />
                    <PropertyField label="Object Type" type="dropdown" options={["Any", "Player", "Enemy", "Collectible"]} value={selected.props.objectType as string} onChange={(v) => updateNodeProp("objectType", v)} />
                    <PropertyField label="Invert" type="toggle" value={selected.props.invert as boolean} onChange={(v) => updateNodeProp("invert", v)} />
                  </>
                )}
                {selected.block.category === "actions" && (
                  <>
                    <PropertyField label="Target" type="dropdown" options={["Self", "Player", "Nearest Enemy"]} value={selected.props.target as string} onChange={(v) => updateNodeProp("target", v)} />
                    <PropertyField label="Speed" type="slider" value={selected.props.speed as number} max={1000} unit="px/s" onChange={(v) => updateNodeProp("speed", v)} />
                    <PropertyField label="Duration (s)" type="slider" value={selected.props.duration as number} max={10} onChange={(v) => updateNodeProp("duration", v)} />
                    <PropertyField label="Easing" type="dropdown" options={["Linear", "Ease In", "Ease Out", "Bounce"]} value={selected.props.easing as string} onChange={(v) => updateNodeProp("easing", v)} />
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

function getDefaultProps(category: BlockCategory): Record<string, string | number | boolean> {
  switch (category) {
    case "events": return { trigger: "Single Tap", delay: 0, repeat: false };
    case "conditions": return { distance: 50, objectType: "Any", invert: false };
    case "actions": return { target: "Self", speed: 100, duration: 1, easing: "Linear" };
  }
}

function PropertyField({ label, type, options, value, max, unit, onChange }: {
  label: string;
  type: "slider" | "dropdown" | "toggle";
  options?: string[];
  value?: string | number | boolean;
  max?: number;
  unit?: string;
  onChange: (value: string | number | boolean) => void;
}) {
  const sliderVal = typeof value === "number" ? value : 50;
  const toggleVal = typeof value === "boolean" ? value : false;
  const dropdownVal = typeof value === "string" ? value : options?.[0] ?? "";

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
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-1 h-1.5 bg-secondary/50 rounded-full appearance-none cursor-pointer accent-primary"
          />
          <span className="text-[10px] text-muted-foreground w-14 text-right">{sliderVal}{unit}</span>
        </div>
      )}
      {type === "dropdown" && (
        <select
          value={dropdownVal}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-secondary/30 border border-border/50 rounded-lg px-3 py-2 text-xs text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {type === "toggle" && (
        <button
          onClick={() => onChange(!toggleVal)}
          className={`relative w-10 h-5 rounded-full transition-colors ${toggleVal ? "bg-primary" : "bg-secondary/50"}`}
        >
          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${toggleVal ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      )}
    </div>
  );
}

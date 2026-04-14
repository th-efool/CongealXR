import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Upload, Plus, Image as ImageIcon, Sparkles, Check, AlertCircle, Trash2, ExternalLink, Download, X, Box, Tag, HelpCircle, ChevronRight, Pencil, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Switch } from "@/components/ui/switch";

interface ObjectLabel {
  id: number;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
}

interface ARObject {
  id: number;
  name: string;
  thumbnail: string;
  modelStatus: "added" | "missing";
  labels: ObjectLabel[];
  quizEnabled: boolean;
  questions: { id: number; question: string; options: string[]; correctIndex: number }[];
}

const sampleObjects: ARObject[] = [
  {
    id: 1, name: "Cell Diagram", thumbnail: "🧬", modelStatus: "added",
    labels: [
      { id: 1, name: "Nucleus", description: "Contains DNA", position: { x: 0, y: 1, z: 0 } },
      { id: 2, name: "Membrane", description: "Outer boundary", position: { x: 1, y: 0, z: 0 } },
      { id: 3, name: "Cytoplasm", description: "Cell fluid", position: { x: 0, y: 0, z: 1 } },
    ],
    quizEnabled: true,
    questions: [{ id: 1, question: "What is the function of the nucleus?", options: ["Energy production", "Contains DNA", "Cell division", "Waste removal"], correctIndex: 1 }],
  },
  {
    id: 2, name: "Mitochondria", thumbnail: "🔬", modelStatus: "added",
    labels: [{ id: 1, name: "Inner membrane", description: "Folded cristae", position: { x: 0, y: 0.5, z: 0 } }],
    quizEnabled: false, questions: [],
  },
  {
    id: 3, name: "DNA Helix", thumbnail: "🧪", modelStatus: "missing",
    labels: [], quizEnabled: false, questions: [],
  },
  {
    id: 4, name: "Ribosome", thumbnail: "⚛️", modelStatus: "added",
    labels: [
      { id: 1, name: "Large subunit", description: "60S subunit", position: { x: 0, y: 1, z: 0 } },
      { id: 2, name: "Small subunit", description: "40S subunit", position: { x: 0, y: -1, z: 0 } },
    ],
    quizEnabled: true,
    questions: [{ id: 1, question: "What do ribosomes produce?", options: ["Lipids", "Proteins", "Sugars", "ATP"], correctIndex: 1 }],
  },
  {
    id: 5, name: "Cell Membrane", thumbnail: "🫧", modelStatus: "missing",
    labels: [], quizEnabled: false, questions: [],
  },
  {
    id: 6, name: "Nucleus", thumbnail: "🟣", modelStatus: "added",
    labels: [{ id: 1, name: "Nucleolus", description: "Ribosome factory", position: { x: 0, y: 0, z: 0 } }],
    quizEnabled: true,
    questions: [{ id: 1, question: "What is inside the nucleus?", options: ["Water", "DNA", "Protein", "Fat"], correctIndex: 1 }],
  },
];

function getObjectStatus(obj: ARObject): "complete" | "partial" | "incomplete" {
  if (obj.modelStatus === "added" && obj.thumbnail) return "complete";
  if (obj.modelStatus === "added" || obj.labels.length > 0) return "partial";
  return "incomplete";
}

const statusConfig = {
  complete: { dot: "bg-green-500", label: "Complete" },
  partial: { dot: "bg-yellow-500", label: "Partial" },
  incomplete: { dot: "bg-red-500/60", label: "Incomplete" },
};

export default function AnchorModePage() {
  const [objects, setObjects] = useState<ARObject[]>(sampleObjects);
  const [selectedId, setSelectedId] = useState<number>(sampleObjects[0].id);
  const [published, setPublished] = useState(false);

  // Panel resize + toggle state
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightWidth, setRightWidth] = useState(320);
  const [rightOpen, setRightOpen] = useState(true);

  const startLeftResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function onMove(ev: MouseEvent) {
      if (!leftRef.current) return;
      let newWidth = ev.clientX;
      if (newWidth < 180) newWidth = 180;
      if (newWidth > 420) newWidth = 420;
      leftRef.current.style.width = newWidth + "px";
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  function startRightResize() {
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    function onMove(e: MouseEvent) {
      const newWidth = window.innerWidth - e.clientX;
      setRightWidth(Math.min(Math.max(newWidth, 200), 500));
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function toggleLeft() {
    setLeftOpen(prev => !prev);
  }

  function toggleRight() {
    if (!rightOpen) setRightWidth(320);
    setRightOpen(prev => !prev);
  }

  function updateObject(id: number, updates: Partial<ARObject>) {
    setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  }

  function addObject(name?: string) {
    const newObj: ARObject = {
      id: Date.now(), name: name || "New Object", thumbnail: "📦",
      modelStatus: "missing", labels: [], quizEnabled: false, questions: [],
    };
    setObjects(prev => [...prev, newObj]);
    setSelectedId(newObj.id);
  }

  function removeObject(id: number) {
    setObjects(prev => {
      const next = prev.filter(o => o.id !== id);
      if (selectedId === id && next.length > 0) setSelectedId(next[0].id);
      return next;
    });
  }

  const selected = objects.find((o) => o.id === selectedId) ?? null;
  const configured = objects.filter((o) => getObjectStatus(o) === "complete").length;

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] -m-6 animate-fade-in">
        <div className="glass-card rounded-2xl p-10 max-w-md text-center space-y-6 glow-primary">
          <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Lesson Published! 🎉</h2>
          <p className="text-sm text-muted-foreground">This lesson contains <strong>{configured} interactive objects</strong></p>
          <div className="space-y-3">
            <div className="glass-card rounded-lg p-3 flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-primary shrink-0" />
              <span className="text-xs truncate flex-1 text-left">https://auraxr.app/lesson/bio-cell-explorer</span>
              <button className="text-[10px] text-primary hover:text-primary/80">Copy</button>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-xs w-full"><Download className="h-3.5 w-3.5" /> Download ZIP</Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setPublished(false)} className="text-xs text-muted-foreground">
            <X className="h-3 w-3 mr-1" /> Back to Editor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] -m-6">
      {/* Top Bar */}
      <div className="h-12 flex items-center gap-4 px-4 border-b border-border/50 glass-panel shrink-0">
        <button onClick={toggleLeft} className="p-1.5 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground" title={leftOpen ? "Collapse left panel" : "Expand left panel"}>
          {leftOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AR Lesson</span>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground">{configured} / {objects.length} objects complete</span>
        <div className="h-1.5 w-24 bg-secondary/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(configured / objects.length) * 100}%` }} />
        </div>
        <button onClick={toggleRight} className="p-1.5 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground" title={rightOpen ? "Collapse right panel" : "Expand right panel"}>
          {rightOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left: Object List */}
        <div ref={leftRef} className="shrink-0 overflow-hidden" style={{ width: leftOpen ? 280 : 0, transition: leftOpen ? 'none' : 'width 0.2s' }}>
          <ObjectListPanel
            objects={objects}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdd={addObject}
          />
        </div>

        {/* Left Resize Handle */}
        {leftOpen && (
          <div
            className="w-1 cursor-col-resize bg-border/50 hover:bg-primary/50 transition-colors shrink-0"
            onMouseDown={startLeftResize}
          />
        )}

        {/* Center: Preview Workspace */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Preview</p>
          <div className="w-full h-full flex items-center justify-center">
            <div className="glass-card rounded-xl w-[80%] h-[80%] flex items-center justify-center text-5xl transition-all">
              {selected ? (
                <span className="animate-fade-in">{selected.thumbnail}</span>
              ) : (
                <span className="text-muted-foreground text-lg">No object selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Resize Handle */}
        {rightOpen && (
          <div
            className="w-1 cursor-col-resize bg-border/50 hover:bg-primary/50 transition-colors shrink-0"
            onMouseDown={startRightResize}
          />
        )}

        {/* Right: Object Editor */}
        <div className="shrink-0 overflow-hidden transition-[width] duration-200" style={{ width: rightOpen ? rightWidth : 0 }}>
          <ObjectEditorPanel object={selected} updateObject={updateObject} onRemove={removeObject} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-14 flex items-center justify-end gap-3 px-4 border-t border-border/50 glass-panel shrink-0">
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Save className="h-3.5 w-3.5" /> Save Draft</Button>
        <Button size="sm" className="gap-1.5 text-xs bg-primary hover:bg-primary/90" onClick={() => setPublished(true)}>
          <Upload className="h-3.5 w-3.5" /> Publish Lesson
        </Button>
      </div>
    </div>
  );
}

/* ─── Object List Panel ─── */
function ObjectListPanel({ objects, selectedId, onSelect, onAdd }: { objects: ARObject[]; selectedId: number; onSelect: (id: number) => void; onAdd: (name?: string) => void }) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onAdd(file.name.replace(/\.[^/.]+$/, ""));
      }
    } else {
      onAdd();
    }
  };

  return (
    <div className="w-full h-full shrink-0 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Objects</h3>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={() => onAdd()}>
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>

      {/* Drop zone */}
      <div className="p-3 border-b border-border/50 mb-3">
        <div
          className="drag-placeholder rounded-lg p-4 text-center transition-colors hover:border-primary/50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Drop image to create object</p>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
        {objects.map((obj) => {
          const status = getObjectStatus(obj);
          const cfg = statusConfig[status];
          return (
            <div
              key={obj.id}
              onClick={() => onSelect(obj.id)}
              className={`glass-card rounded-xl overflow-hidden cursor-pointer hover-lift transition-all ${selectedId === obj.id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="aspect-[4/3] bg-secondary/20 flex items-center justify-center text-2xl relative">
                {obj.thumbnail}
                <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
              </div>
              <div className="p-2 space-y-1">
                <p className="text-[10px] font-medium truncate">{obj.name}</p>
                <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[8px] text-muted-foreground">
                  <span>{obj.modelStatus === "added" ? "✓" : "—"}</span>
                  <span>{obj.labels.length}L</span>
                  {obj.quizEnabled && <span>Q✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Object Editor Panel ─── */
function ObjectEditorPanel({
  object,
  updateObject,
  onRemove,
}: {
  object: ARObject | null;
  updateObject: (id: number, updates: Partial<ARObject>) => void;
  onRemove: (id: number) => void;
}) {
  const [editingLabelId, setEditingLabelId] = useState<number | null>(null);

  function updateLabel(labelId: number, updates: Partial<ObjectLabel>) {
    updateObject(object!.id, {
      labels: object!.labels.map(l => l.id === labelId ? { ...l, ...updates } : l),
    });
  }

  function updateQuestion(questionId: number, updates: Partial<{ question: string; options: string[]; correctIndex: number }>) {
    updateObject(object!.id, {
      questions: object!.questions.map(q => q.id === questionId ? { ...q, ...updates } : q),
    });
  }


  if (!object) {
    return (
      <div className="w-full h-full flex items-center justify-center glass-panel">
        <p className="text-xs text-muted-foreground">Select an object to configure</p>
      </div>
    );
  }

  return (
    <div key={object.id} className="w-full h-full overflow-auto glass-panel">
      <div className="p-4 space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Editing Object</p>
          <h3 className="text-sm font-bold mt-0.5 flex items-center gap-1.5">
            <Box className="h-3.5 w-3.5 text-primary" /> {object.name}
          </h3>
        </div>

        {/* ── Object Image ── */}
        <EditorSection icon={<ImageIcon className="h-3.5 w-3.5" />} title="Object Image">
          <div className="glass-card rounded-lg overflow-hidden">
            <div className="h-24 bg-secondary/20 flex items-center justify-center text-3xl">{object.thumbnail}</div>
            <div className="p-2 flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1 text-[10px]"><Upload className="h-3 w-3 mr-1" /> Replace</Button>
            </div>
          </div>
        </EditorSection>

        {/* ── 3D Model ── */}
        <EditorSection icon={<Box className="h-3.5 w-3.5" />} title="3D Model">
          {object.modelStatus === "added" ? (
            <div className="glass-card rounded-lg p-4 text-center space-y-2">
              <div className="h-20 bg-secondary/20 rounded-lg flex items-center justify-center text-2xl">{object.thumbnail}</div>
              <p className="text-[10px] text-green-500 flex items-center justify-center gap-1"><Check className="h-3 w-3" /> 3D model linked</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="drag-placeholder rounded-lg p-4 text-center">
                <AlertCircle className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-[10px] text-muted-foreground">No 3D model yet</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-[10px] gap-1"
                  onClick={() => updateObject(object.id, { modelStatus: "added" })}
                >
                  <Upload className="h-3 w-3" /> Upload 3D
                </Button>
                <Button size="sm" className="flex-1 text-[10px] gap-1 bg-primary" onClick={() => updateObject(object.id, { modelStatus: "added" })}><Sparkles className="h-3 w-3" /> Generate AI</Button>
              </div>
            </div>
          )}
        </EditorSection>

        {/* ── Object Labels ── */}
        <EditorSection icon={<Tag className="h-3.5 w-3.5" />} title="Object Labels">
          {object.labels.length > 0 ? (
            <div className="space-y-2">
              {object.labels.map((label) => {
                const isEditing = editingLabelId === label.id;
                return (
                  <div key={label.id} className="glass-card rounded-lg p-3">
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={label.name}
                            onChange={(e) => updateLabel(label.id, { name: e.target.value })}
                            className="h-6 text-[11px] font-medium bg-transparent border-border/30 px-1.5 flex-1"
                            placeholder="Label name"
                          />
                          <button className="text-primary hover:text-primary/80 transition-colors shrink-0" onClick={() => setEditingLabelId(null)}>
                            <Check className="h-3 w-3" />
                          </button>
                        </div>
                        <Input
                          value={label.description}
                          onChange={(e) => updateLabel(label.id, { description: e.target.value })}
                          className="h-6 text-[9px] text-muted-foreground bg-transparent border-border/30 px-1.5"
                          placeholder="Description"
                        />
                        <div className="flex gap-1.5 items-center">
                          <span className="text-[8px] text-muted-foreground/60 shrink-0">Pos:</span>
                          {(["x", "y", "z"] as const).map((axis) => (
                            <div key={axis} className="flex items-center gap-0.5 flex-1">
                              <span className="text-[7px] text-muted-foreground/40 uppercase">{axis}</span>
                              <Input
                                type="number"
                                value={label.position[axis]}
                                onChange={(e) => updateLabel(label.id, { position: { ...label.position, [axis]: parseFloat(e.target.value) || 0 } })}
                                className="h-5 text-[8px] font-mono bg-transparent border-border/30 px-1 text-center"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5">
                        <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium">{label.name}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">{label.description}</p>
                          <p className="text-[8px] text-muted-foreground/60 mt-1 font-mono">
                            x:{label.position.x} y:{label.position.y} z:{label.position.z}
                          </p>
                        </div>
                        <button className="text-muted-foreground/40 hover:text-primary transition-colors shrink-0" onClick={() => setEditingLabelId(label.id)}>
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0" onClick={() => updateObject(object.id, { labels: object.labels.filter(l => l.id !== label.id) })}>
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <Button variant="ghost" size="sm" className="text-[10px] w-full gap-1" onClick={() => updateObject(object.id, { labels: [...object.labels, { id: Date.now(), name: "New Label", description: "Edit me", position: { x: 0, y: 0, z: 0 } }] })}><Plus className="h-3 w-3" /> Add Label</Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="drag-placeholder rounded-lg p-3 text-center">
                <p className="text-[10px] text-muted-foreground">No labels added</p>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] w-full gap-1" onClick={() => updateObject(object.id, { labels: [...object.labels, { id: Date.now(), name: "New Label", description: "Edit me", position: { x: 0, y: 0, z: 0 } }] })}><Plus className="h-3 w-3" /> Add Label</Button>
            </div>
          )}
        </EditorSection>

        {/* ── Object Quiz ── */}
        <EditorSection
          icon={<HelpCircle className="h-3.5 w-3.5" />}
          title="Object Quiz"
          trailing={
            <Switch
              checked={object.quizEnabled}
              onCheckedChange={(val) =>
                updateObject(object.id, { quizEnabled: val })
              } className="scale-75" />
          }
        >
          {object.quizEnabled ? (
            object.questions.length > 0 ? (
              <div className="space-y-2">
                {object.questions.map((q) => (
                  <div key={q.id} className="glass-card rounded-lg p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Input
                        value={q.question}
                        onChange={(e) => updateQuestion(q.id, { question: e.target.value })}
                        className="h-6 text-[11px] font-medium bg-transparent border-border/30 px-1.5 flex-1"
                        placeholder="Question text"
                      />
                      <button className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5" onClick={() => updateObject(object.id, { questions: object.questions.filter(qq => qq.id !== q.id) })}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    {q.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <button
                          className={`h-3.5 w-3.5 rounded-full border shrink-0 transition-colors ${i === q.correctIndex ? "bg-primary border-primary" : "border-border/50 hover:border-primary/50"}`}
                          onClick={() => updateQuestion(q.id, { correctIndex: i })}
                        />
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[i] = e.target.value;
                            updateQuestion(q.id, { options: newOpts });
                          }}
                          className="h-5 text-[10px] text-muted-foreground bg-transparent border-border/30 px-1.5 flex-1"
                          placeholder={`Option ${i + 1}`}
                        />
                        {q.options.length > 2 && (
                          <button className="text-muted-foreground/30 hover:text-destructive transition-colors" onClick={() => {
                            const newOpts = q.options.filter((_, idx) => idx !== i);
                            const newCorrect = q.correctIndex >= newOpts.length ? 0 : q.correctIndex > i ? q.correctIndex - 1 : q.correctIndex;
                            updateQuestion(q.id, { options: newOpts, correctIndex: newCorrect });
                          }}>
                            <X className="h-2.5 w-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="text-[9px] h-5 px-2 gap-1" onClick={() => updateQuestion(q.id, { options: [...q.options, `Option ${q.options.length + 1}`] })}>
                      <Plus className="h-2.5 w-2.5" /> Add Option
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-[10px]" onClick={() => updateObject(object.id, { questions: [...object.questions, { id: Date.now(), question: "New question", options: ["Option A", "Option B"], correctIndex: 0 }] })}><Plus className="h-3 w-3 mr-1" /> Add Question</Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-[10px]" onClick={() => updateObject(object.id, { questions: [...object.questions, { id: Date.now(), question: "AI generated question?", options: ["Answer A", "Answer B", "Answer C"], correctIndex: 0 }] })}><Sparkles className="h-3 w-3 mr-1" /> AI Generate</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="drag-placeholder rounded-lg p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">No quiz questions</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[10px]" onClick={() => updateObject(object.id, { questions: [{ id: Date.now(), question: "New question", options: ["Option A", "Option B"], correctIndex: 0 }] })}><Plus className="h-3 w-3 mr-1" /> Manual</Button>
                  <Button size="sm" className="flex-1 text-[10px] bg-primary" onClick={() => updateObject(object.id, { questions: [{ id: Date.now(), question: "AI generated question?", options: ["Answer A", "Answer B", "Answer C"], correctIndex: 0 }] })}><Sparkles className="h-3 w-3 mr-1" /> AI Generate</Button>
                </div>
              </div>
            )
          ) : (
            <p className="text-[9px] text-muted-foreground italic">Enable to add quiz questions for this object</p>
          )}
        </EditorSection>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <Button variant="ghost" size="sm" className="text-[10px] text-destructive gap-1" onClick={() => onRemove(object.id)}><Trash2 className="h-3 w-3" /> Remove Object</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Editor Section ─── */
function EditorSection({ icon, title, trailing, children }: { icon: React.ReactNode; title: string; trailing?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
          {icon} {title}
        </h4>
        {trailing}
      </div>
      {children}
    </div>
  );
}

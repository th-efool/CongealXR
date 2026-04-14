import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Upload, Plus, Image as ImageIcon, Sparkles, Check, AlertCircle, Trash2, ExternalLink, Download, X, Box, Tag, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
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

  function updateObject(id: number, updates: Partial<ARObject>) {
    setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  }

  function addObject() {
    const newObj: ARObject = {
      id: Date.now(), name: "New Object", thumbnail: "📦",
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
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AR Lesson</span>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground">{configured} / {objects.length} objects complete</span>
        <div className="h-1.5 w-24 bg-secondary/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(configured / objects.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left: Object List */}
        <ObjectListPanel
          objects={objects}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAdd={addObject}
        />

        {/* Right: Object Editor */}
        <ObjectEditorPanel object={selected} updateObject={updateObject} onRemove={removeObject} />
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
function ObjectListPanel({ objects, selectedId, onSelect, onAdd }: { objects: ARObject[]; selectedId: number; onSelect: (id: number) => void; onAdd: () => void }) {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Objects</h3>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={onAdd}>
          <Plus className="h-3.5 w-3.5" /> Add Object
        </Button>
      </div>

      {/* Upload area */}
      <div className="drag-placeholder rounded-xl p-6 mb-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
        <p className="text-xs text-muted-foreground">Drag & drop images to create objects</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {objects.map((obj) => {
          const status = getObjectStatus(obj);
          const cfg = statusConfig[status];
          return (
            <div
              key={obj.id}
              onClick={() => onSelect(obj.id)}
              className={`glass-card rounded-xl overflow-hidden cursor-pointer hover-lift transition-all ${selectedId === obj.id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="aspect-square bg-secondary/20 flex items-center justify-center text-3xl relative">
                {obj.thumbnail}
                <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
              </div>
              <div className="p-2.5 space-y-1.5">
                <p className="text-[11px] font-medium truncate">{obj.name}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[9px] text-muted-foreground">
                  <span>{obj.modelStatus === "added" ? "Model ✓" : "No model"}</span>
                  <span>{obj.labels.length} label{obj.labels.length !== 1 ? "s" : ""}</span>
                  {obj.quizEnabled && <span>Quiz ✓</span>}
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

  function updateLabel(labelId: number, updates: Partial<ObjectLabel>) {
    updateObject(object!.id, {
      labels: object!.labels.map(l => l.id === labelId ? { ...l, ...updates } : l),
    });
  }

  if (!object) {
    return (
      <div className="w-80 border-l border-border/50 shrink-0 flex items-center justify-center glass-panel">
        <p className="text-xs text-muted-foreground">Select an object to configure</p>
      </div>
    );
  }

  return (
    <div key={object.id} className="w-80 border-l border-border/50 shrink-0 overflow-auto glass-panel">
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
              {object.labels.map((label) => (
                <div key={label.id} className="glass-card rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                    <Input
                      value={label.name}
                      onChange={(e) => updateLabel(label.id, { name: e.target.value })}
                      className="h-6 text-[11px] font-medium bg-transparent border-border/30 px-1.5"
                      placeholder="Label name"
                    />
                    <button className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0" onClick={() => updateObject(object.id, { labels: object.labels.filter(l => l.id !== label.id) })}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <Input
                    value={label.description}
                    onChange={(e) => updateLabel(label.id, { description: e.target.value })}
                    className="h-6 text-[9px] text-muted-foreground bg-transparent border-border/30 px-1.5"
                    placeholder="Description"
                  />
                  <div className="flex gap-1.5">
                    <Input
                      type="number"
                      value={label.position.x}
                      onChange={(e) => updateLabel(label.id, { position: { ...label.position, x: parseFloat(e.target.value) || 0 } })}
                      className="h-5 text-[8px] font-mono bg-transparent border-border/30 px-1 text-center"
                      placeholder="x"
                    />
                    <Input
                      type="number"
                      value={label.position.y}
                      onChange={(e) => updateLabel(label.id, { position: { ...label.position, y: parseFloat(e.target.value) || 0 } })}
                      className="h-5 text-[8px] font-mono bg-transparent border-border/30 px-1 text-center"
                      placeholder="y"
                    />
                    <Input
                      type="number"
                      value={label.position.z}
                      onChange={(e) => updateLabel(label.id, { position: { ...label.position, z: parseFloat(e.target.value) || 0 } })}
                      className="h-5 text-[8px] font-mono bg-transparent border-border/30 px-1 text-center"
                      placeholder="z"
                    />
                  </div>
                </div>
              ))}
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
                  <div key={q.id} className="glass-card rounded-lg p-3">
                    <p className="text-[11px] font-medium mb-2">{q.question}</p>
                    {q.options.map((opt, i) => (
                      <label key={opt} className="flex items-center gap-2 py-1 text-[10px] text-muted-foreground cursor-pointer hover:text-foreground">
                        <span className={`h-3.5 w-3.5 rounded-full border ${i === q.correctIndex ? "bg-primary border-primary" : "border-border/50"}`} />
                        {opt}
                      </label>
                    ))}
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

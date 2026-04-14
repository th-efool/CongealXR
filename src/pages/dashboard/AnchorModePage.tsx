import { Button } from "@/components/ui/button";
import { Save, Upload, Plus, Image as ImageIcon, Sparkles, Check, AlertCircle, Trash2, ExternalLink, Download, X } from "lucide-react";
import { useState } from "react";

interface ImageAsset {
  id: number;
  name: string;
  thumbnail: string;
  arStatus: "added" | "missing";
  quizStatus: "added" | "none";
}

const sampleImages: ImageAsset[] = [
  { id: 1, name: "Cell Diagram", thumbnail: "🧬", arStatus: "added", quizStatus: "added" },
  { id: 2, name: "Mitochondria", thumbnail: "🔬", arStatus: "added", quizStatus: "none" },
  { id: 3, name: "DNA Helix", thumbnail: "🧪", arStatus: "missing", quizStatus: "none" },
  { id: 4, name: "Ribosome", thumbnail: "⚛️", arStatus: "added", quizStatus: "added" },
  { id: 5, name: "Cell Membrane", thumbnail: "🫧", arStatus: "missing", quizStatus: "none" },
  { id: 6, name: "Nucleus", thumbnail: "🟣", arStatus: "added", quizStatus: "added" },
  { id: 7, name: "Golgi Apparatus", thumbnail: "📦", arStatus: "missing", quizStatus: "none" },
  { id: 8, name: "Endoplasmic Ret.", thumbnail: "🌀", arStatus: "added", quizStatus: "none" },
  { id: 9, name: "Lysosome", thumbnail: "💧", arStatus: "missing", quizStatus: "none" },
];

function getStatusColor(asset: ImageAsset) {
  if (asset.arStatus === "added" && asset.quizStatus === "added") return "dot-complete";
  if (asset.arStatus === "added" || asset.quizStatus === "added") return "dot-partial";
  return "dot-empty";
}

function getStatusLabel(asset: ImageAsset) {
  if (asset.arStatus === "added" && asset.quizStatus === "added") return "Complete";
  if (asset.arStatus === "added" || asset.quizStatus === "added") return "Partial";
  return "Not configured";
}

export default function AnchorModePage() {
  const [mode, setMode] = useState<"game" | "lesson">("lesson");
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(sampleImages[0]);
  const [quizEnabled, setQuizEnabled] = useState(true);
  const [published, setPublished] = useState(false);

  const configured = sampleImages.filter((img) => img.arStatus === "added").length;

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] -m-6 animate-fade-in">
        <div className="glass-card rounded-2xl p-10 max-w-md text-center space-y-6 glow-primary">
          <div className="h-16 w-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Lesson Published! 🎉</h2>
          <p className="text-sm text-muted-foreground">This lesson contains <strong>{configured} interactive image triggers</strong></p>
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
      {/* Mode Toggle */}
      <div className="h-12 flex items-center gap-4 px-4 border-b border-border/50 glass-panel shrink-0">
        <span className="text-xs text-muted-foreground font-medium">Mode:</span>
        <div className="flex rounded-lg overflow-hidden border border-border/50">
          {(["game", "lesson"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m === "game" ? "Game" : "AR Lesson"}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground">{configured} / {sampleImages.length} images configured</span>
        <div className="h-1.5 w-24 bg-secondary/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(configured / sampleImages.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left: Image Database */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {mode === "game" ? "Game Assets" : "Lesson Images"}
            </h3>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add Image
            </Button>
          </div>

          {/* Upload area */}
          <div className="drag-placeholder rounded-xl p-6 mb-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Drag & drop images here or click to upload</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {sampleImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className={`glass-card rounded-xl overflow-hidden cursor-pointer hover-lift transition-all ${selectedImage?.id === img.id ? "ring-2 ring-primary" : ""}`}
              >
                <div className="aspect-square bg-secondary/20 flex items-center justify-center text-3xl relative">
                  {img.thumbnail}
                  <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${getStatusColor(img)}`} />
                </div>
                <div className="p-2.5 space-y-1">
                  <p className="text-[11px] font-medium truncate">{img.name}</p>
                  <p className="text-[9px] text-muted-foreground">{getStatusLabel(img)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Config Panel */}
        <div className="w-80 border-l border-border/50 shrink-0 overflow-auto glass-panel">
          {selectedImage ? (
            <div className="p-4 space-y-5 animate-fade-in">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Editing</p>
                <h3 className="text-sm font-bold mt-0.5">{selectedImage.name}</h3>
              </div>

              {/* AR Content */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5" /> AR Content
                </h4>
                {selectedImage.arStatus === "added" ? (
                  <div className="glass-card rounded-lg p-4 text-center space-y-2">
                    <div className="h-20 bg-secondary/20 rounded-lg flex items-center justify-center text-2xl">{selectedImage.thumbnail}</div>
                    <p className="text-[10px] text-green-500 flex items-center justify-center gap-1"><Check className="h-3 w-3" /> 3D model linked</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="drag-placeholder rounded-lg p-4 text-center">
                      <AlertCircle className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                      <p className="text-[10px] text-muted-foreground">No AR content yet</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-[10px] gap-1"><Upload className="h-3 w-3" /> Upload 3D</Button>
                      <Button size="sm" className="flex-1 text-[10px] gap-1 bg-primary"><Sparkles className="h-3 w-3" /> Generate AI</Button>
                    </div>
                  </div>
                )}
                <p className="text-[9px] text-muted-foreground italic">This content appears when this image is scanned</p>
              </div>

              {/* Quiz */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary">Quiz</h4>
                  <button
                    onClick={() => setQuizEnabled(!quizEnabled)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${quizEnabled ? "bg-primary" : "bg-secondary/50"}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${quizEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
                {quizEnabled && (
                  <div className="space-y-3 animate-fade-in">
                    {selectedImage.quizStatus === "added" ? (
                      <div className="space-y-2">
                        <div className="glass-card rounded-lg p-3">
                          <p className="text-[11px] font-medium mb-2">What is the function of this organelle?</p>
                          {["Energy production", "Protein synthesis", "Cell division", "Waste removal"].map((opt, i) => (
                            <label key={opt} className="flex items-center gap-2 py-1 text-[10px] text-muted-foreground cursor-pointer hover:text-foreground">
                              <span className={`h-3.5 w-3.5 rounded-full border ${i === 0 ? "bg-primary border-primary" : "border-border/50"}`} />
                              {opt}
                            </label>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="text-[10px] w-full"><Plus className="h-3 w-3 mr-1" /> Add Question</Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="drag-placeholder rounded-lg p-3 text-center">
                          <p className="text-[10px] text-muted-foreground">No quiz added</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 text-[10px]"><Plus className="h-3 w-3 mr-1" /> Manual</Button>
                          <Button size="sm" className="flex-1 text-[10px] bg-primary"><Sparkles className="h-3 w-3 mr-1" /> AI Generate</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                <Button variant="ghost" size="sm" className="text-[10px] text-destructive gap-1"><Trash2 className="h-3 w-3" /> Remove</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-muted-foreground">Select an image to configure</p>
            </div>
          )}
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

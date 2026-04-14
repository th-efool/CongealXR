import { X, Maximize2, Volume2, RotateCcw, Camera, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PreviewPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"game" | "ar">("game");
  const [score, setScore] = useState(240);
  const [time, setTime] = useState(42);
  const [quizVisible, setQuizVisible] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Preview Mode</span>
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {(["game", "ar"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setQuizVisible(false); }}
                className={`px-3 py-1 text-[10px] font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"}`}
              >
                {m === "game" ? "Game" : "AR Lesson"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white"><Volume2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white"><Maximize2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" onClick={() => navigate(-1)}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative">
        {mode === "game" ? (
          <>
            {/* Game HUD */}
            <div className="absolute top-16 left-4 z-10 glass-panel rounded-lg px-4 py-2 flex items-center gap-4">
              <div><p className="text-[9px] text-muted-foreground uppercase">Score</p><p className="text-lg font-bold">{score}</p></div>
              <div className="h-8 w-px bg-white/10" />
              <div><p className="text-[9px] text-muted-foreground uppercase">Time</p><p className="text-lg font-bold">{time}s</p></div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl animate-pulse">🚀</div>
              <p className="text-muted-foreground text-sm">Game Preview Area</p>
              <p className="text-[10px] text-muted-foreground">Tap to interact</p>
            </div>
            {/* Restart */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs glass-panel rounded-lg">
                <RotateCcw className="h-3.5 w-3.5" /> Restart
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* AR Camera Frame */}
            <div className="w-[80%] h-[80%] border-2 border-dashed border-white/10 rounded-2xl relative flex items-center justify-center">
              <div className="absolute top-3 left-3 flex items-center gap-2 glass-panel rounded-lg px-3 py-1.5">
                <Camera className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px]">Camera Active</span>
              </div>

              {!quizVisible ? (
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-full border-2 border-primary/30 flex items-center justify-center animate-pulse-glow">
                    <Camera className="h-6 w-6 text-primary/60" />
                  </div>
                  <p className="text-sm text-muted-foreground">Point camera at image</p>
                  <p className="text-[10px] text-muted-foreground">AR object will appear here</p>
                  <Button size="sm" className="text-xs gap-1.5 bg-primary mt-4" onClick={() => setQuizVisible(true)}>
                    <HelpCircle className="h-3 w-3" /> Simulate Quiz
                  </Button>
                </div>
              ) : (
                <div className="glass-card rounded-xl p-6 max-w-sm w-full mx-4 animate-fade-in space-y-4">
                  <h3 className="text-sm font-bold">Quiz: Cell Biology</h3>
                  <p className="text-xs text-muted-foreground">What is the powerhouse of the cell?</p>
                  <div className="space-y-2">
                    {["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"].map((opt, i) => (
                      <button key={opt} className={`w-full text-left px-4 py-2.5 rounded-lg text-xs transition-colors ${i === 1 ? "bg-green-500/20 border border-green-500/30 text-green-400" : "glass-panel hover:bg-secondary/30"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs w-full" onClick={() => setQuizVisible(false)}>Back to Camera</Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center px-4 z-10 bg-gradient-to-t from-black/70 to-transparent">
        <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}

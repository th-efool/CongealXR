import { X, Maximize2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PreviewPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <span className="text-sm font-medium">Preview Mode</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fullscreen Content */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Fullscreen Preview Area</p>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center px-4 z-10 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex gap-2">
          <div className="h-2 w-16 bg-foreground/20 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

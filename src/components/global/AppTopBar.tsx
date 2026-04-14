import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function AppTopBar() {
  const navigate = useNavigate();

  return (
    <header className="h-14 flex items-center gap-4 border-b border-border/50 px-4 bg-[#0d0d14]">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, templates..."
            className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigate("/app/studio")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>
    </header>
  );
}

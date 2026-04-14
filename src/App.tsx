import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { AppLayout } from "@/components/global/AppLayout";
import LandingPage from "@/pages/landing/LandingPage";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/dashboard/HomePage";
import MyCreationsPage from "@/pages/dashboard/MyCreationsPage";
import ExplorePage from "@/pages/dashboard/ExplorePage";
import TemplatesPage from "@/pages/dashboard/TemplatesPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import CreatorStudioPage from "@/pages/dashboard/CreatorStudioPage";
import AnchorModePage from "@/pages/dashboard/AnchorModePage";
import PreviewPage from "@/pages/dashboard/PreviewPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page with Navbar/Footer */}
            <Route
              path="/"
              element={
                <div className="relative min-h-screen text-base flex flex-col selection:bg-purple-500/30">
                  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="bg-grid absolute inset-0"></div>
                    <div className="orb bg-violet-600/10 w-[40vw] aspect-square top-[-10vw] left-[-10vw]"></div>
                    <div className="orb bg-blue-600/10 w-[30vw] aspect-square bottom-[10vw] right-[-5vw]"></div>
                  </div>
                  <Navbar />
                  <main className="relative z-10 flex-grow flex flex-col">
                    <LandingPage />
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* App routes with sidebar layout */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="creations" element={<MyCreationsPage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="studio" element={<CreatorStudioPage />} />
              <Route path="anchor" element={<AnchorModePage />} />
            </Route>

            {/* Preview - fullscreen, no layout */}
            <Route path="/app/preview" element={<PreviewPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

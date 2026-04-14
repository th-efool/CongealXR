import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function HeroSection() {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-28 pb-8 px-6 lg:px-12 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-20">
        <Reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-white/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
          <span className="text-xs font-normal text-white/80 tracking-wide">Aura Studio Beta 2.0</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-white mb-3">
            <span className="text-gradient block">Build Your Own</span>
            <span className="block">AR Games</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="text-sm md:text-base font-light leading-snug text-white/60 max-w-xl">
          Create and play your own AR games using simple visual blocks. No coding. Publish instantly. Play inside one app.
        </Reveal>

        <Reveal delay={0.25} className="text-xs md:text-sm font-medium tracking-wide text-gradient-accent mt-2 mb-6">
          A unified engine, marketplace, and social layer for spatial computing.
        </Reveal>

        <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/app/studio" className="btn-primary rounded-full px-8 py-3 text-sm font-normal text-white flex items-center gap-2 w-full sm:w-auto justify-center">
            Start Creating <Icon icon="solar:arrow-right-linear" className="text-lg" />
          </Link>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#builder" onClick={(e) => scrollToSection(e, 'builder')} className="text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer">
              Watch how it works <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-white/20 hidden sm:block">|</span>
            <Link to="/app/explore" className="hidden sm:flex text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors items-center gap-1.5">
              <Icon icon="solar:play-circle-linear" className="text-sm" /> Try a demo
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-white/40 tracking-wide">
          <span>No install required</span> <span className="mx-1">•</span>
          <span>Works on your phone</span> <span className="mx-1">•</span>
          <span>Create in under 60 seconds</span>
        </Reveal>
      </div>

      <Reveal delay={0.5} className="w-full max-w-4xl mx-auto mt-10 relative h-auto md:h-72">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505]/80 px-4 py-1.5 rounded-full text-xs text-white/30 tracking-widest uppercase backdrop-blur-md border border-white/5 z-30 hidden md:block">
          Logic <span className="mx-1">→</span> Result
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch h-full">
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(139,92,246,0.05),_transparent_60%)]"></div>
            <div className="text-xs font-medium text-white/30 uppercase tracking-widest mb-6 text-center relative z-10">Logic Builder</div>
            <div className="relative w-full max-w-[14rem] mx-auto z-10">
              <div className="glass-card border border-white/10 rounded-lg p-2.5 mb-6 relative anim-seq-event bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                  <Icon icon="solar:pointer-linear" className="text-violet-400 text-sm" />
                  <span className="text-xs font-medium text-white/80">Event: Tap</span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-violet-500 bg-black"></div>
              </div>
              <div className="absolute top-[3.5rem] left-1/2 -translate-x-1/2 w-px h-6 bg-violet-500/30 anim-line"></div>
              <div className="glass-card border border-white/10 rounded-lg p-2.5 relative anim-seq-action bg-black/40 backdrop-blur-md">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-violet-500 bg-black"></div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon icon="solar:box-linear" className="text-blue-400 text-sm" />
                  <span className="text-xs font-medium text-white/80">Action: Spawn</span>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center border border-white/5 bg-gradient-to-bl from-white/[0.01] to-transparent">
            <div className="text-xs font-medium text-white/30 uppercase tracking-widest mb-6 text-center relative z-10">AR Output</div>
            <div className="relative w-full max-w-[12rem] mx-auto aspect-square border border-white/10 rounded-xl overflow-hidden bg-black/50 z-10">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,92,246,0.1)_100%)]">
                <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "1rem 1rem" }}></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/20 border-dashed rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center anim-seq-output mt-2">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg shadow-[0_0_1.5rem_rgba(139,92,246,0.5)] border border-white/20 flex items-center justify-center transform rotate-12">
                  <Icon icon="solar:star-linear" className="text-white/80 text-xl" />
                </div>
                <div className="w-8 h-1.5 bg-black/40 blur-sm rounded-full mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.6} className="w-full max-w-4xl mx-auto mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/app/studio" className="glass-card px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white cursor-pointer hover:border-violet-500/40 transition-all flex items-center gap-2 group shadow-sm">
          <span className="text-violet-400 group-hover:animate-pulse">Tap</span> <Icon icon="solar:arrow-right-linear" className="text-white/20" /> Spawn Object
        </Link>
        <Link to="/app/studio" className="glass-card px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white cursor-pointer hover:border-blue-500/40 transition-all flex items-center gap-2 group shadow-sm">
          <span className="text-blue-400 group-hover:animate-pulse">Timer</span> <Icon icon="solar:arrow-right-linear" className="text-white/20" /> Spawn Enemies
        </Link>
        <Link to="/app/studio" className="glass-card px-4 py-2 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white cursor-pointer hover:border-emerald-500/40 transition-all flex items-center gap-2 group shadow-sm">
          <span className="text-emerald-400 group-hover:animate-pulse">Collision</span> <Icon icon="solar:arrow-right-linear" className="text-white/20" /> Score +10
        </Link>
      </Reveal>
    </section>
  );
}

import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function BuilderShowcaseSection() {
  return (
    <section id="builder" className="py-16 lg:py-20 px-6 lg:px-12 w-full relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 leading-tight">
            Limitless scale.<br/>
            <span className="text-gradient-accent">Zero syntax.</span>
          </h2>
          <p className="text-sm text-white/50 leading-snug mb-6 max-w-sm">
            Visual logic that scales from basic interactions to deeply complex systems. If you can map it in your head, you can wire it in AURA.
          </p>
          <ul className="space-y-3 mb-6">
            {['Native Physics & Spatial Constraints', 'Real-time Multiplayer State Sync', 'Advanced Triggers & APIs'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-white/70">
                <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
                  <Icon icon="solar:check-circle-linear" className="text-xs scale-75" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative flex flex-col">
          <Reveal className="relative w-full aspect-[4/3] rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden bg-[#0A0A0A]">
            <div className="absolute top-[5rem] left-[10rem] bg-white text-black px-2 py-1 rounded text-xs font-medium z-40 anim-tooltip shadow-lg pointer-events-none before:content-[''] before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rotate-45">
              Drag to connect
            </div>
            <div className="absolute top-[12.5rem] left-[17rem] bg-violet-500 text-white px-2 py-1 rounded text-xs font-medium z-40 anim-tooltip-delay shadow-lg pointer-events-none before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-violet-500 before:rotate-45">
              Tap to edit
            </div>

            <div className="absolute z-50 pointer-events-none fake-cursor-anim flex flex-col items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <path d="M5.5 3.21V20.8C5.5 21.6 6.4 22.05 7 21.57L11.4 18.05C11.66 17.84 12 17.73 12.35 17.75L17.83 18.1C18.66 18.15 19.16 17.21 18.7 16.51L6.75 3.16C6.26 2.59 5.5 2.92 5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"></path>
              </svg>
            </div>

            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>

            <div className="absolute top-0 left-0 w-full h-7 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center px-4 gap-2 z-20">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              </div>
              <div className="mx-auto text-xs font-medium text-white/30 tracking-widest uppercase scale-90">Editor</div>
            </div>

            <div className="absolute inset-0 pt-7 p-4 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
                <path d="M 120 60 C 160 60, 140 120, 180 120" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" className="animate-path"></path>
                <path d="M 280 120 C 310 120, 290 180, 320 180" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="animate-path" style={{ animationDelay: "0.5s" }}></path>
                <path d="M 120 60 C 160 60, 120 180, 150 180" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" strokeDasharray="4 4"></path>
              </svg>

              <div className="absolute top-8 left-4 glass-card border border-white/10 rounded-lg w-36 shadow-lg z-10">
                <div className="px-2 py-1 border-b border-white/10 bg-white/5 rounded-t-lg">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide scale-90 origin-left">Event</span>
                </div>
                <div className="p-2 relative">
                  <div className="text-xs text-white/90 font-medium">Player Proximity</div>
                  <div className="absolute w-2 h-2 rounded-full border border-violet-500 bg-black right-[-0.25rem] top-[0.6rem]"></div>
                </div>
              </div>

              <div className="absolute top-[6.5rem] left-[9rem] glass-card border border-white/10 rounded-lg w-36 shadow-lg z-10">
                <div className="px-2 py-1 border-b border-white/10 bg-white/5 rounded-t-lg">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide scale-90 origin-left">Condition</span>
                </div>
                <div className="p-2 relative">
                  <div className="absolute w-2 h-2 rounded-full border border-violet-500 bg-black left-[-0.25rem] top-[0.6rem]"></div>
                  <div className="text-xs text-white/90 font-medium">Distance &lt; 2m</div>
                  <div className="absolute w-2 h-2 rounded-full border border-blue-500 bg-black right-[-0.25rem] top-[0.6rem]"></div>
                </div>
              </div>

              <div className="absolute top-[10.5rem] left-[4rem] glass-card border border-white/10 rounded-lg w-32 shadow-lg z-10">
                <div className="px-2 py-1 border-b border-white/10 bg-white/5 rounded-t-lg">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide scale-90 origin-left">Condition</span>
                </div>
                <div className="p-2 relative">
                  <div className="absolute w-2 h-2 rounded-full border border-emerald-500 bg-black left-[-0.25rem] top-[0.6rem]"></div>
                  <div className="text-xs text-white/90 font-medium text-emerald-400">Score &gt; 10</div>
                </div>
              </div>

              <div className="absolute top-[10.5rem] left-[17rem] glass-card border border-white/10 rounded-lg w-36 shadow-lg z-10">
                <div className="px-2 py-1 border-b border-white/10 bg-white/5 rounded-t-lg">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-wide scale-90 origin-left">Action</span>
                </div>
                <div className="p-2 relative">
                  <div className="absolute w-2 h-2 rounded-full border border-blue-500 bg-black left-[-0.25rem] top-[0.6rem]"></div>
                  <div className="text-xs text-white/90 font-medium">Activate Physics</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

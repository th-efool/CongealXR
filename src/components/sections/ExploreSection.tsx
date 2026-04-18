import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function ExploreSection() {
  const games = [
    {
      tag: "Trending", tagColor: "bg-violet-500",
      icon: "solar:ghost-linear", iconColor: "text-violet-400/30",
      views: "12k",
      categories: [
        { label: "#Shooter", cls: "bg-white/10 border-white/10 text-white/70" },
        { label: "Hard", cls: "bg-violet-500/20 border-violet-500/30 text-violet-300" }
      ],
      title: "Neon Labyrinth", desc: "Wave-based spatial survival."
    },
    {
      tag: "New", tagColor: "bg-blue-500",
      icon: "solar:planet-linear", iconColor: "text-blue-400/30",
      views: "8k",
      categories: [
        { label: "#Physics", cls: "bg-white/10 border-white/10 text-white/70" },
        { label: "Casual", cls: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" }
      ],
      title: "Solaris Orbit", desc: "Gravity puzzles in your living room."
    },
    {
      icon: "solar:shield-star-linear", iconColor: "text-fuchsia-400/30",
      views: "21k",
      categories: [
        { label: "#TowerDef", cls: "bg-white/10 border-white/10 text-white/70" },
        { label: "Multi", cls: "bg-blue-500/20 border-blue-500/30 text-blue-300" }
      ],
      title: "Defend the Core", desc: "Co-op tabletop defense."
    },
    {
      icon: "solar:bone-linear", iconColor: "text-emerald-400/30",
      views: "5k",
      categories: [
        { label: "#Sim", cls: "bg-white/10 border-white/10 text-white/70" },
        { label: "Casual", cls: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" }
      ],
      title: "ARchi Dog", desc: "Virtual companion simulator."
    }
  ];

  return (
    <section id="explore" className="py-16 lg:py-20 px-6 lg:px-12 w-full relative z-10 border-t border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-1">Ecosystem Depth</h2>
            <p className="text-xs text-white/50">Complex mechanics built purely with CongealXR nodes.</p>
          </div>
          <Link to="/app/explore" className="text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1 group pb-1">
            Browse Market <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>

        <Reveal isStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game, i) => (
            <Reveal isStaggerItem key={i} style={{ transitionDelay: `${i * 75}ms` }} className="group cursor-pointer relative">
              <Link to="/app/explore" className="block">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass-card border border-white/10">
                  {game.tag && (
                    <div className={`absolute top-3 left-3 ${game.tagColor} text-white text-xs uppercase tracking-widest px-2 py-0.5 rounded shadow-lg z-40 scale-90 origin-top-left`}>
                      {game.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-30">
                    <span className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      Play Instantly
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10"></div>
                  <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center">
                    <Icon icon={game.icon} className={`text-5xl ${game.iconColor} transform group-hover:scale-110 transition-transform duration-700`} />
                  </div>
                  <div className="absolute top-3 right-3 z-20 flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded px-1.5 py-0.5 text-xs text-white/70 flex items-center gap-1">
                      <Icon icon="solar:eye-linear" /> {game.views}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="flex gap-1 mb-1.5">
                      {game.categories.map((cat, idx) => (
                        <span key={idx} className={`text-xs font-medium px-1.5 py-0.5 border rounded tracking-wide uppercase scale-90 origin-left ${cat.cls}`}>{cat.label}</span>
                      ))}
                    </div>
                    <h3 className="text-sm font-medium text-white tracking-tight leading-none mb-1">{game.title}</h3>
                    <p className="text-xs text-white/40 line-clamp-1">{game.desc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

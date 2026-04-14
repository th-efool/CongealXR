import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function CapabilitiesSection() {
  const items = [
    { icon: "solar:server-path-linear", title: "1-Click Live Ecosystem", desc: "Push updates instantly to users. No waiting for app store compilation or review loops." },
    { icon: "solar:smartphone-rotate-2-linear", title: "Create inside the Medium", desc: "Build, test, and play in the same continuous spatial environment. True WYSIWYG for AR." },
    { icon: "solar:infinity-linear", title: "Limitless Mechanics", desc: "From simple collection games to complex physics puzzles, constraint logic handles it all." },
    { icon: "solar:users-group-two-rounded-linear", title: "Shared Context", desc: "Built-in spatial anchors allow multiple devices to interact in the same coordinate space." }
  ];

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-12 w-full relative z-10 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Reveal className="lg:col-span-1 pr-0 lg:pr-4">
            <h2 className="text-2xl font-medium text-white tracking-tight leading-snug mb-3">
              A paradigm shift<br/>in spatial creation.
            </h2>
            <p className="text-xs text-white/50 leading-snug">
              Democratizing the medium. Combining high-end performance with zero friction deployment.
            </p>
          </Reveal>
          <Reveal isStaggerGroup className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            {items.map((item, i) => (
              <Reveal isStaggerItem key={i} style={{ transitionDelay: `${i * 75}ms` }} className="glass-card p-4 rounded-xl">
                <div className="text-white/80 mb-2 border border-white/10 w-7 h-7 rounded-md flex items-center justify-center bg-white/5">
                  <Icon icon={item.icon} className="text-xs" />
                </div>
                <h4 className="text-xs font-medium text-white mb-1 tracking-tight">{item.title}</h4>
                <p className="text-xs font-light text-white/50 leading-snug scale-95 origin-left">{item.desc}</p>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

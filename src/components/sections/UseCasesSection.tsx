import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function UseCasesSection() {
  const cases = [
    { icon: "solar:target-linear", colorClass: "text-violet-400 bg-violet-500/10 border-violet-500/20", title: "Tap Shooter", desc: "Tap enemies to survive spatial waves." },
    { icon: "solar:bone-linear", colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", title: "AR Pet", desc: "Spawn and interact with a virtual companion." },
    { icon: "solar:dollar-linear", colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20", title: "Coin Collector", desc: "Move physically around your room to collect items." }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 w-full relative z-10 border-t border-white/5 bg-white/[0.005]">
      <Reveal className="max-w-6xl mx-auto">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-widest mb-6 text-center">What creators are building</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((item, i) => (
            <div key={i} className="glass-card p-4 rounded-xl flex items-start gap-4 hover:border-white/20 transition-colors cursor-default">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${item.colorClass}`}>
                <Icon icon={item.icon} className="text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white tracking-tight mb-1">{item.title}</h4>
                <p className="text-xs text-white/50 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

import Reveal from '../ui/Reveal';

export default function PipelineSection() {
  const steps = [
    { num: "1", title: "Create", desc: "Drag blocks to define behavior.", highlight: "Tap → spawn, move, destroy." },
    { num: "2", title: "Publish", desc: "One click to go live.", highlight: "No builds, no app store reviews." },
    { num: "3", title: "Play", desc: "Open in app and play instantly.", highlight: "Share links, compete on leaderboards." }
  ];

  return (
    <section id="features" className="py-16 lg:py-20 px-6 lg:px-12 w-full relative z-10 bg-white/[0.01] border-t border-white/5">
      <div className="max-w-6xl mx-auto relative">
        <Reveal className="text-center text-xs text-white/30 uppercase tracking-widest mb-10">
          From idea to playable in seconds
        </Reveal>
        <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px z-0 anim-flow-line opacity-50"></div>
        <Reveal isStaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {steps.map((step, index) => (
            <Reveal isStaggerItem key={index} style={{ transitionDelay: `${index * 75}ms` }} className="glass-card rounded-2xl p-5 flex flex-col relative overflow-hidden bg-black/80 backdrop-blur-md">
              <h3 className="text-sm font-medium tracking-tight text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs text-white/50">{step.num}</span> {step.title}
              </h3>
              <p className="text-xs text-white/50 leading-snug mt-1">
                {step.desc}<br/>
                <span className="text-white/80 mt-1 block">{step.highlight}</span>
              </p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

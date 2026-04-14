import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';

export default function CtaSection() {
  return (
    <section className="py-20 px-6 lg:px-12 w-full relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-violet-900/5 mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-violet-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <Reveal className="max-w-xl mx-auto text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 leading-tight">
          Build your first AR game →<br/>Live in 60 seconds
        </h2>
        <p className="text-xs font-light text-white/50 mb-8 mx-auto">
          No setup. No syntax. Pure creation.
        </p>
        <div className="flex flex-col items-center justify-center">
          <Link to="#" className="btn-primary rounded-full px-8 py-3 text-sm font-normal text-white inline-flex items-center justify-center w-full sm:w-auto shadow-lg mb-4">
            Launch Aura Studio
          </Link>
          <div className="text-xs text-white/40 tracking-wide font-light">
            Free to start <span className="mx-2">•</span> No install <span className="mx-2">•</span> Publish instantly
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-12 pb-8 px-6 lg:px-12 w-full relative z-10">
      <Reveal className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="tracking-tighter text-lg font-medium text-white uppercase leading-none">CONGEALXR</span>
          </Link>
          <p className="text-xs font-light text-white/40 max-w-xs leading-snug scale-95 origin-left">
            Democratizing augmented reality creation. Build, play, and share spatial experiences instantly without the friction of app stores.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-white/50">
          <span className="text-white font-medium mb-1 tracking-tight">Platform</span>
          <Link to="/app/studio" className="hover:text-white transition-colors">Studio App</Link>
          <Link to="/app/explore" className="hover:text-white transition-colors">Ecosystem</Link>
          <Link to="/app/templates" className="hover:text-white transition-colors">Documentation</Link>
        </div>
        <div className="flex flex-col gap-2 text-xs text-white/50">
          <span className="text-white font-medium mb-1 tracking-tight">Company</span>
          <Link to="/" className="hover:text-white transition-colors">About</Link>
          <Link to="/" className="hover:text-white transition-colors">Contact</Link>
          <Link to="/" className="hover:text-white transition-colors">Terms & Privacy</Link>
        </div>
      </Reveal>
      <Reveal className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-white/30 border-t border-white/10 pt-6 scale-95 origin-left md:origin-center">
        <span>© {new Date().getFullYear()} CongealXR Platform Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon icon="mdi:twitter" className="text-sm" /></a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon icon="mdi:discord" className="text-sm" /></a>
        </div>
      </Reveal>
    </footer>
  );
}

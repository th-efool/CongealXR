import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const sections = ['features', 'builder', 'explore'];
      let current = '';
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - 200) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={clsx(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      isScrolled ? "border-white/10" : "border-transparent"
    )} id="nav">
      <div className={clsx(
        "glass-panel absolute inset-0 transition-opacity duration-300",
        isScrolled ? "opacity-100" : "opacity-0"
      )} />
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12 h-16 relative z-10">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="tracking-tighter text-lg font-medium text-white uppercase leading-none">AURA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-xs tracking-wide text-white/50">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className={clsx("nav-link hover:text-white transition-colors", activeSection === 'features' && 'active')}>Features</a>
            <a href="#builder" onClick={(e) => scrollToSection(e, 'builder')} className={clsx("nav-link hover:text-white transition-colors", activeSection === 'builder' && 'active')}>Studio</a>
            <a href="#explore" onClick={(e) => scrollToSection(e, 'explore')} className={clsx("nav-link hover:text-white transition-colors", activeSection === 'explore' && 'active')}>Discover</a>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/50">
          <div className="hidden lg:flex items-center gap-6 mr-4 border-r border-white/10 pr-6">
            <Link to="/app/templates" className="hover:text-white transition-colors">Docs</Link>
            <Link to="/app/explore" className="hover:text-white transition-colors">Community</Link>
          </div>
          <Link to="/app" className="hidden md:flex hover:text-white transition-colors">Log in</Link>
          <Link to="/app" className="font-normal bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

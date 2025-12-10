import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated Chronological Order
  const navItems = [
    { id: 'timeline-section', label: 'Zeitstrahl' },
    { id: 'intro', label: '1299' },
    { id: 'rise', label: '1453' },
    { id: 'culture', label: 'Kultur' },
    { id: 'vienna', label: '1683' },
    { id: 'fall', label: 'Der Fall' },
  ];

  return (
    <>
      {/* Desktop Floating Dynamic Island Navigation */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex animate-fade-in-down">
        <nav className={`
          flex items-center gap-1 p-1.5 rounded-full transition-all duration-500
          ${scrolled 
            ? 'bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-black/40 backdrop-blur-xl border border-white/10'}
        `}>
           {/* Home Button */}
           <button 
              onClick={() => scrollToSection('hero')}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${activeSection === 'hero' 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'}
              `}
           >
             <Home size={18} strokeWidth={2.5} />
           </button>

           <div className="w-[1px] h-5 bg-white/10 mx-2"></div>

           {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => scrollToSection(item.id)}
               className={`
                 relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap
                 ${activeSection === item.id 
                   ? 'text-white bg-white/15 shadow-inner' 
                   : 'text-gray-400 hover:text-white hover:bg-white/5'}
               `}
             >
               {item.label}
               {activeSection === item.id && (
                 <span className="absolute inset-0 rounded-full ring-1 ring-white/20"></span>
               )}
             </button>
           ))}
        </nav>
      </div>

      {/* Mobile Navigation Button */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-opacity duration-300 md:hidden flex flex-col justify-center items-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center w-full px-8">
          <button 
            onClick={() => { scrollToSection('hero'); setIsOpen(false); }}
            className="flex flex-col items-center gap-4 mb-4 group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-ottoman-gold group-active:scale-95 transition-transform">
              <Home size={32} />
            </div>
            <span className="text-3xl font-serif text-white font-bold tracking-widest">HOME</span>
          </button>
          
          <div className="w-16 h-[1px] bg-white/10 mx-auto"></div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsOpen(false);
              }}
              className={`text-2xl font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-white scale-110 font-bold' : 'text-gray-500 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
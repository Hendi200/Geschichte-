
import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import CulturalAnalysis from './components/CulturalAnalysis';
import Timeline from './components/Timeline';
import { ChevronDown, MapPin, Crown, Swords, Ship, ShieldCheck, Pickaxe, Star, AlertTriangle } from 'lucide-react';
import { getAsset } from './assets';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Enhanced Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      // Order matching the page layout
      const sections = ['hero', 'intro-text', 'timeline-section', 'intro', 'rise', 'culture', 'vienna', 'fall'];
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -50; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  // 3D Tilt Effect Bento Card (Simplified, No Shuffle)
  interface BentoProps {
    children?: React.ReactNode;
    title?: string;
    className?: string;
    icon?: any;
    image?: string; // Single string now
    dark?: boolean;
    onClick?: () => void;
  }

  const BentoCard: React.FC<BentoProps> = ({ children, title, className = "", icon: Icon, image, dark = false, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Calculate rotation based on cursor position relative to center
        // Limit rotation to 5 degrees for a subtle Apple-like effect
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    return (
      <div 
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform, transition: 'transform 0.1s ease-out' }}
        className={`
          relative h-full w-full overflow-hidden rounded-[2rem] border transition-all duration-500 group flex flex-col shadow-lg
          ${image ? 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-white/10' : 'bg-[#1c1c1e] hover:bg-[#252527] border-white/5 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'}
          ${dark ? 'bg-black border-white/10' : ''}
          ${className}
        `}
      >
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Background Image Handling */}
        {image && (
          <div className="absolute inset-0 z-0 bg-black">
            <img 
              src={image} 
              alt={title || "Image"} 
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            />
            {/* Gradients for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col h-full pointer-events-none">
          {title && (
            <div className="flex items-start justify-between mb-4 md:mb-6 shrink-0 pointer-events-auto">
               <div className="flex items-center gap-3 md:gap-4">
                 {Icon && (
                   <div className="p-2.5 rounded-2xl bg-white/10 text-ottoman-gold backdrop-blur-md border border-white/10">
                     <Icon size={20} strokeWidth={2} />
                   </div>
                 )}
                 <h3 className={`text-xl md:text-2xl font-serif font-bold tracking-tight drop-shadow-lg ${image ? 'text-white' : 'text-[#f5f5f7]'}`}>
                   {title}
                 </h3>
               </div>
            </div>
          )}
          
          {/* Children fill the remaining space */}
          <div className={`leading-relaxed font-sans font-normal text-base md:text-lg flex-grow flex flex-col ${image ? 'text-gray-200 shadow-black drop-shadow-md' : 'text-[#86868b]'} overflow-y-auto pr-2 custom-scrollbar pointer-events-auto`}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-[#f5f5f7] selection:bg-ottoman-gold selection:text-black font-sans overflow-x-hidden">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <div id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* Hero Image */}
            <img 
                src={getAsset('hero')} 
                alt="Blue Mosque" 
                className="w-full h-full object-cover animate-pan-slow scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-48 md:pb-32">
          <div className="flex flex-col items-center">
            {/* Dynamic text sizing for mobile */}
            <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter leading-[0.9] drop-shadow-2xl text-center mix-blend-overlay opacity-90 break-words w-full">
              OSMANISCHES<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">REICH</span>
            </h1>
          </div>
        </div>

        {/* Scroll Button */}
        <button 
          onClick={() => scrollToSection('intro-text')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)] z-30"
        >
          <ChevronDown size={28} />
        </button>
      </div>

      {/* Intro Text Section */}
      <div id="intro-text" className="py-24 md:py-32 px-6 flex justify-center bg-black relative">
         <div className="absolute inset-0 bg-gradient-to-b from-black to-[#050505]"></div>
         <div className="relative z-10 max-w-4xl text-center space-y-8">
            <p className="text-2xl md:text-4xl font-serif text-white leading-relaxed">
              "Zu seiner Hochzeit war das Osmanische Reich, welches von 1299–1922 andauerte, ein Weltreich, das vor allem im Balkan Macht ausübte."
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-ottoman-gold to-transparent mx-auto opacity-50"></div>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              Im Laufe der Jahrhunderte vergrößerte es seinen Einflussbereich. Viele Sultane haben das Osmanische Reich regiert, doch wo fand es seinen Anfang und wie kam es dazu, dass es heute nicht mehr existiert?
            </p>
         </div>
      </div>

      {/* Timeline Control Hub */}
      <Section
        id="timeline-section"
        title="Der Verlauf der Geschichte"
        subtitle="Chronologie"
        className="min-h-screen"
      >
        <Timeline onNavigate={scrollToSection} />
      </Section>

      {/* 1299 - Der Anfang */}
      <Section id="intro" title="1299 - 1453" subtitle="Der Ursprung">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
           {/* Osman I - Large Portrait */}
           <div className="lg:col-span-8 h-[500px] lg:h-full">
             <BentoCard 
                title="Osman I." 
                icon={Crown}
                image={getAsset('osman')}
             >
               <p className="mb-4">
                 Der Begründer des Osmanischen Reiches hieß Osman I. Er wurde 1258 in der heutigen Türkei geboren und war der Sohn eines Hordenfürsten.
               </p>
               <p>
                 Er gründete sein Reich Anfang des 14. Jahrhunderts (ca. 1299). Aufgrund guter Freundschaften zu Nachbarstämmen konnte er sich deren Unterstützung bei seinen Eroberungen sichern.
               </p>
             </BentoCard>
           </div>

           {/* Bursa Text Card */}
           <div className="lg:col-span-4 h-full flex flex-col gap-6">
              <BentoCard 
                  title="Expansion" 
                  icon={MapPin}
                  dark
                  className="flex-1"
              >
                  <p>
                    Die ersten großen Städte wurden erst von seinen Nachfolgern eingenommen. 
                    <strong>Bursa</strong> beispielsweise war ein wichtiger Knotenpunkt an der Seidenstraße und fiel 1326, kurz vor Osmans Tod.
                  </p>
              </BentoCard>
              
              <BentoCard 
                  image={getAsset('bursa')}
                  className="flex-[2] min-h-[300px]"
              />
           </div>
        </div>
      </Section>

      {/* 1453 - Konstantinopel */}
      <Section id="rise" title="1453" subtitle="Die Eroberung" align="right">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[900px]">
           
           {/* The Cannon */}
           <div className="lg:col-span-5 flex flex-col gap-6 h-full">
              <BentoCard 
                 title="Die Kanonen" 
                 image={getAsset('cannon')}
                 className="flex-[2] min-h-[400px]"
              >
                 <div className="mt-auto bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                   <p className="text-sm">
                     Eine eigens gebaute, acht Meter lange Kanone ("Dardanellen-Geschütz") konnte massive Steinkugeln verschießen und richtete verheerende Schäden an den theodosianischen Mauern an.
                   </p>
                 </div>
              </BentoCard>
              <BentoCard 
                 title="Strategie"
                 icon={Swords}
                 dark
                 className="flex-1"
              >
                 <p>
                   Mehmed II. bestieg 1451 den Thron. Sein Ziel war die uneinnehmbare Stadt. Da die Kette am Goldenen Horn den Seeweg versperrte, musste er improvisieren.
                 </p>
              </BentoCard>
           </div>

           {/* Ships over land - Main Feature */}
           <div className="lg:col-span-7 h-[600px] lg:h-full">
              <BentoCard 
                 title="Schiffe über Land" 
                 icon={Ship}
                 image={getAsset('ships')}
              >
                 <p className="text-lg md:text-xl font-medium mb-6">
                   Da die Osmanen nicht in den Hafen gelangten, trugen sie ihre Boote über geölte Holzbohlen über einen Hügel hinter die feindlichen Linien.
                 </p>
                 <p className="text-gray-300">
                   Dieser Überraschungsangriff von innen besiegelte das Ende des Byzantinischen Reiches und wird oft als Übergang vom Mittelalter zur Neuzeit gesehen.
                 </p>
              </BentoCard>
           </div>
           
           {/* Hagia Sophia - Full Width Bottom */}
           <div className="lg:col-span-12 h-[400px]">
              <BentoCard 
                 title="Hagia Sophia" 
                 image={getAsset('hagia_sophia')}
              >
                 <p className="max-w-2xl bg-black/50 p-4 rounded-xl backdrop-blur-sm">
                   Konstantinopel wurde zur neuen Hauptstadt. Die Hagia Sophia wurde in eine Moschee (Aya-Sofya) umgewandelt, doch die christliche Bevölkerung durfte unter dem Millet-System bleiben.
                 </p>
              </BentoCard>
           </div>
        </div>
      </Section>

      {/* Kultur - Blütezeit */}
      <Section id="culture" title="Kultur & Wahrnehmung" subtitle="Begegnung" align="left">
        <CulturalAnalysis />
      </Section>

      {/* 1683 - Wien */}
      <Section id="vienna" title="1683" subtitle="Die Belagerung" align="center">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[1000px]">
            
            {/* Intro Text */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
               <BentoCard title="Der Goldene Apfel" icon={ShieldCheck} dark className="flex-1">
                 <p>
                   Wien war als "Goldener Apfel" bekannt. Großwesir Kara Mustafa Pascha startete den Angriff, da der Friedensvertrag mit Leopold I. abgelaufen war.
                 </p>
               </BentoCard>
               <BentoCard title="Die Verteidigung" image={getAsset('vienna_wall')} className="flex-[2] min-h-[300px]">
                 <p className="mt-auto bg-black/60 p-4 rounded-xl backdrop-blur-md text-sm">
                   Dank der nach dem Dreißigjährigen Krieg modernisierten Stadtmauern hielt Wien stand.
                 </p>
               </BentoCard>
            </div>

            {/* Tunnels & Tactics */}
            <div className="lg:col-span-4 h-full flex flex-col gap-6">
               <BentoCard image={getAsset('vienna_tunnels')} title="Krieg im Untergrund" icon={Pickaxe} className="flex-[2] min-h-[400px]">
                  <p className="mb-4">
                    Die Osmanen gruben Tunnel, um die Mauern zu sprengen.
                  </p>
                  <p>
                    Die Wiener orteten die Gräber durch Erschütterungen (Erbsen auf Trommeln) und bekämpften sie in engen Stollen unter der Erde.
                  </p>
               </BentoCard>
               <BentoCard title="Die Heilige Liga" icon={Star} dark className="flex-1">
                 <p className="text-sm">
                   Ein Bündnis zwischen Kaiser Leopold I. und dem polnischen König Jan Sobieski rettete die Stadt.
                 </p>
               </BentoCard>
            </div>

            {/* The Treaty/Result */}
            <div className="lg:col-span-4 h-full">
               <BentoCard title="Schlacht am Kahlenberg" image={getAsset('vienna_treaty')} className="h-full min-h-[500px]">
                  <p className="mb-4 font-bold text-xl">12. September 1683</p>
                  <p className="mb-6">
                    Die polnischen Flügelreiter (Hussaren) entschieden die Schlacht. Der Großwesir entkam knapp.
                  </p>
                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-ottoman-gold mb-2">Die Folgen</h4>
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                      <li>Verlust großer Gebiete in Ungarn</li>
                      <li>Beginn des osmanischen Rückzugs aus Europa</li>
                      <li>Frieden von Karlowitz (1699)</li>
                    </ul>
                  </div>
               </BentoCard>
            </div>
         </div>
      </Section>

      {/* Der Fall */}
      <Section id="fall" title="Der Fall" subtitle="1914 - 1923" align="center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
           <BentoCard title="Der Erste Weltkrieg" icon={AlertTriangle} image={getAsset('fall_bg')} className="min-h-[400px]">
              <p className="mb-4">
                Nach Reformversuchen der "Jungtürken" trat das Reich an der Seite Deutschlands in den Krieg ein (Waffenbrüderschaft).
              </p>
              <p>
                Trotz des Aufrufs zum Dschihad blieben Erfolge aus. 1918 endete der Krieg mit einer Niederlage.
              </p>
           </BentoCard>

           <BentoCard title="Die Republik" image={getAsset('ataturk')} className="min-h-[400px]">
              <div className="mt-auto bg-gradient-to-t from-black via-black/80 to-transparent p-6 -mx-6 -mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">Mustafa Kemal Atatürk</h4>
                <p className="text-gray-200">
                  Er verhinderte die komplette Aufteilung des Reiches durch die Siegermächte und rief 1923 die moderne Republik Türkei aus. 
                  Das Sultanat wurde abgeschafft.
                </p>
              </div>
           </BentoCard>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 flex flex-col items-center justify-center border-t border-white/5 bg-black">
         <Crown size={32} className="text-white/20 mb-4" />
         <h2 className="text-xl font-serif font-bold text-white/40 tracking-widest uppercase">Osmanisches Reich</h2>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import CulturalAnalysis from './components/CulturalAnalysis';
import { ChevronDown, MapPin, Crown, ScrollText, Swords, Ship, Anchor, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Enhanced Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'intro', 'rise', 'vienna', 'culture', 'fall'];
      
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reusable Bento Card Component for Consistency and Readability
  interface BentoProps {
    children?: React.ReactNode;
    title?: string;
    className?: string;
    icon?: any;
    image?: string;
    dark?: boolean;
    onClick?: () => void;
  }

  const BentoCard: React.FC<BentoProps> = ({ children, title, className = "", icon: Icon, image, dark = false, onClick }) => (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-500 group
        ${image ? 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'hover:border-white/20 hover:bg-white/5'}
        ${!image && !dark ? 'bg-[#121214]/80 backdrop-blur-xl' : ''}
        ${dark ? 'bg-black' : ''}
        flex flex-col
        ${className}
      `}
    >
      {/* Background Image Handling */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title || "Image"} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Heavy gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        {title && (
          <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-3">
               {Icon && (
                 <div className="p-2.5 rounded-2xl bg-white/10 text-ottoman-gold backdrop-blur-md shadow-sm">
                   <Icon size={20} strokeWidth={2} />
                 </div>
               )}
               <h3 className={`text-xl md:text-2xl font-serif font-bold tracking-tight ${image ? 'text-white' : 'text-gray-100'}`}>
                 {title}
               </h3>
             </div>
          </div>
        )}
        
        <div className={`leading-relaxed font-light text-base md:text-lg flex-grow ${image ? 'text-gray-200' : 'text-gray-400'}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white selection:bg-ottoman-gold selection:text-black font-sans">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <div id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070&auto=format&fit=crop" 
                alt="Blue Mosque" 
                className="w-full h-full object-cover animate-pan-slow"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto space-y-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
             <span className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
             </span>
             <span className="text-xs font-bold tracking-[0.3em] text-white uppercase font-sans">Interaktive Geschichte</span>
          </div>
          
          <div>
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-white tracking-tighter leading-[0.85] drop-shadow-2xl">
              OSMANISCHES
            </h1>
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-400 to-gray-800 tracking-tighter leading-[0.85] drop-shadow-2xl">
              REICH
            </h1>
          </div>
          
          <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Eine Reise durch 600 Jahre Macht, Innovation und Kultur.
          </p>
          
          <button 
            onClick={() => scrollToSection('intro')}
            className="mt-16 w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
          >
            <ChevronDown size={32} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Intro Section - Bento Grid */}
      <Section 
        id="intro" 
        title="Der Ursprung" 
        subtitle="1299 – 1453" 
        bgImage="https://images.unsplash.com/photo-1628926378932-8e22543b5993?q=80&w=2070&auto=format&fit=crop"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
           {/* Large Main Card with Image Background */}
           <BentoCard 
              className="md:col-span-2 md:row-span-2 min-h-[500px]" 
              title="Vom Beylik zum Imperium" 
              icon={Crown}
              image="https://images.unsplash.com/photo-1628623086961-09dfd0426c45?q=80&w=1000&auto=format&fit=crop"
           >
              <div className="space-y-6">
                <p>
                  Das Osmanische Reich entstand nicht im Vakuum. Als das Reich der Seldschuken unter dem Ansturm der Mongolen zerbrach, entstanden in Anatolien viele kleine Fürstentümer (Beyliks).
                </p>
                <div className="pl-4 border-l-2 border-ottoman-gold">
                  <p className="italic text-gray-300">
                    Osman I. herrschte über eines der kleinsten, aber strategisch wichtigsten Beyliks direkt an der Grenze zum geschwächten Byzantinischen Reich. Durch die <strong>Gaza-Ideologie</strong> (Glaubenskrieg) zog er kriegerische Nomaden an.
                  </p>
                </div>
              </div>
           </BentoCard>

           {/* Stat Card */}
           <div className="bg-[#121214]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center hover:border-ottoman-gold/50 transition-colors duration-500 group">
              <span className="text-7xl font-serif text-white font-bold group-hover:scale-110 transition-transform duration-500">1299</span>
              <span className="text-xs uppercase tracking-[0.3em] text-ottoman-gold mt-4 font-bold">Gründungsjahr</span>
           </div>

           {/* Detail Card - Janissaries */}
           <BentoCard title="Die Janitscharen" icon={Swords} className="bg-[#1a0f0f]/80">
              <p className="text-gray-400">
                Die erste stehende Armee Europas. Durch die <strong>Knabenlese (Devşirme)</strong> rekrutiert, waren sie Elite-Soldaten, die nur dem Sultan unterstanden. Ein revolutionäres System, das Loyalität über Herkunft stellte.
              </p>
           </BentoCard>
        </div>
      </Section>

      {/* 1453 Section - The Siege Breakdown */}
      <Section 
        id="rise" 
        title="1453" 
        subtitle="Die Eroberung" 
        align="left"
        bgImage="https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
            {/* Header Text Area */}
            <div className="md:col-span-2 md:row-span-1 p-2 flex flex-col justify-end">
               <h3 className="text-3xl md:text-4xl text-white font-serif mb-4 leading-tight">
                 Das Ende von Byzanz,<br/>der Beginn einer neuen Ära.
               </h3>
               <p className="text-gray-300 text-lg leading-relaxed">
                 Sultan Mehmed II. setzte alles auf eine Karte. Die Belagerung von Konstantinopel war ein Meisterwerk der Logistik.
               </p>
            </div>

            {/* Feature: The Cannons */}
            <BentoCard title="Die Urban-Kanone" icon={AlertTriangle} className="md:col-span-2 bg-gradient-to-br from-[#1c1c1e] to-black">
              <p>
                Mehmed engagierte den ungarischen Gießer Urban, um Kanonen von nie dagewesener Größe zu bauen. Die "Basilic" feuerte <strong className="text-white">600kg schwere Steinkugeln</strong> auf die Theodosianischen Mauern.
              </p>
            </BentoCard>

            {/* Feature: Ships over Land - Visual Heavy */}
            <BentoCard 
              className="md:col-span-2 md:row-span-2 min-h-[400px]" 
              title="Schiffe über Land" 
              icon={Ship}
              image="https://images.unsplash.com/photo-1605650172439-d8cb8454b68e?q=80&w=1000&auto=format&fit=crop"
            >
               <p className="mb-6 drop-shadow-lg font-medium">
                 Das Goldene Horn war durch eine massive Eisenkette versperrt. Die osmanische Flotte war nutzlos – bis Mehmed das Unmögliche befahl.
               </p>
               <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border-l-4 border-ottoman-gold">
                 <p className="italic text-gray-200 text-sm md:text-base font-serif">
                   "In einer Nacht zogen sie 70 Schiffe über geölte Holzbohlen über den Hügel von Galata ins Hafenbecken."
                 </p>
               </div>
            </BentoCard>

            {/* Result: Istanbul */}
            <BentoCard title="Istanbul blüht" icon={MapPin} className="md:col-span-2 bg-[#0F172A]/90">
               <p className="text-gray-400">
                 Nach dem Sieg plünderte die Armee, doch Mehmed stoppte sie schnell. Konstantinopel wurde zu Istanbul – einer Weltmetropole der Toleranz und des Handels.
               </p>
            </BentoCard>
        </div>
      </Section>

      {/* 1683 Section - Vienna */}
      <Section 
        id="vienna" 
        title="Wien 1683" 
        subtitle="Der Wendepunkt" 
        bgImage="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2000&auto=format&fit=crop"
      >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard title="Die Belagerung" className="md:col-span-2" dark>
                <p className="text-lg mb-8 text-gray-300">
                    Großwesir Kara Mustafa führte ein Heer von 150.000 Mann vor die Tore Wiens. Die Stadt war verzweifelt. Minierer gruben Tunnel unter die Stadtmauern, um sie zu sprengen.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/5">
                        <span className="block text-4xl md:text-5xl font-bold text-red-500 mb-2">60</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Tage Belagerung</span>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/5">
                        <span className="block text-4xl md:text-5xl font-bold text-white mb-2">12.09</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Tag der Entscheidung</span>
                    </div>
                </div>
            </BentoCard>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 group min-h-[300px]">
                <img src="https://images.unsplash.com/photo-1599587402633-886f4a7c065f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Vienna Walls" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <h4 className="text-3xl font-serif font-bold text-white mb-2">Der Goldene Apfel</h4>
                    <p className="text-sm text-gray-300 font-medium">Das ultimative Ziel osmanischer Expansion.</p>
                </div>
            </div>

            <BentoCard 
              title="Der Entsatz" 
              icon={Swords} 
              className="md:col-span-3 bg-gradient-to-r from-[#2a1b0a] to-black border-l-4 border-yellow-600/50"
            >
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <h4 className="text-2xl font-bold text-yellow-500 mb-4 font-serif">Die Flügelhusaren</h4>
                        <p className="text-gray-300 text-lg">
                            Als alles verloren schien, erschien König Jan III. Sobieski von Polen auf dem Kahlenberg. Mit dem größten Kavallerieangriff der Geschichte fegten die gepanzerten Flügelhusaren das osmanische Lager hinweg.
                        </p>
                    </div>
                    <div className="w-full md:w-auto md:min-w-[300px] text-sm bg-black/40 p-6 rounded-2xl border border-white/10">
                        <strong className="text-white block mb-4 uppercase tracking-widest text-xs">Frieden von Karlowitz 1699</strong>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              Verlust von Ungarn
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              Verlust von Siebenbürgen
                            </li>
                            <li className="flex items-center gap-3 text-white">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Beginn der Defensive
                            </li>
                        </ul>
                    </div>
                </div>
            </BentoCard>
         </div>
      </Section>

      {/* Culture Section */}
      <Section 
        id="culture" 
        title="Kultur & Erbe" 
        subtitle="Mehr als nur Krieg" 
        bgImage="https://images.unsplash.com/photo-1579618174768-46c59b2c349d?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="grid grid-cols-1 gap-8">
            <div className="text-center py-8">
                <p className="text-2xl md:text-3xl max-w-4xl mx-auto font-serif text-gray-200 leading-normal">
                    "Das Osmanische Reich war ein Schmelztiegel. Es verband persische Poesie, arabische Wissenschaft und byzantinische Architektur zu etwas völlig Neuem."
                </p>
            </div>
            
            <CulturalAnalysis />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <BentoCard title="Sinan der Architekt" icon={Anchor} className="min-h-[250px]">
                    <p className="text-gray-300 text-lg">
                        Mimar Sinan, der Michelangelo des Ostens, baute über 300 Bauwerke. Sein Meisterwerk, die <strong>Selimiye-Moschee</strong> in Edirne, übertraf sogar die Kuppel der Hagia Sophia. Er definierte die klassische osmanische Silhouette.
                    </p>
                </BentoCard>
                <BentoCard title="Kaffee & Tulpen" icon={BookOpen} className="min-h-[250px]">
                    <p className="text-gray-300 text-lg">
                        Zwei Dinge, die wir heute als europäisch ansehen, kamen durch die Osmanen: Der Kaffee (erstes Kaffeehaus in Istanbul 1554) und die Tulpe, die im 16. Jahrhundert nach Holland exportiert wurde und dort einen Börsenwahn auslöste.
                    </p>
                </BentoCard>
            </div>
        </div>
      </Section>

      {/* Fall Section */}
      <Section 
        id="fall" 
        title="Der Untergang" 
        subtitle="1922" 
        bgImage="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard title='Der "Kranke Mann"' className="md:col-span-1 bg-[#1c1c1e]/80">
                <p className="text-base text-gray-400">
                    Im 19. Jahrhundert verlor das Reich den technologischen Anschluss. Russland und die europäischen Mächte zerstückelten die Randgebiete. Nationalismus auf dem Balkan führte zu Unabhängigkeitskriegen.
                </p>
            </BentoCard>

            <BentoCard title="Tanzimat Reformen" icon={ScrollText} className="md:col-span-2">
                <p className="text-lg text-gray-300">
                   Ein letztes Aufbäumen: Die Tanzimat-Ära (1839–1876). Das Reich versuchte, sich radikal zu modernisieren. Einführung von Ministerien, Gleichberechtigung aller Religionen vor dem Gesetz, Eisenbahnen und Telegrafen.
                </p>
            </BentoCard>

            <BentoCard 
              className="md:col-span-3 min-h-[300px]"
              title="Weltkrieg & Republik"
              image="https://images.unsplash.com/photo-1565620883838-51846b04df16?q=80&w=2000&auto=format&fit=crop"
            >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-4">
                    <div className="bg-white text-black px-6 py-4 rounded-2xl font-bold font-serif shrink-0 text-2xl shadow-lg">
                        1923
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-3">Aus der Asche: Die Türkei</h4>
                        <p className="text-gray-200 text-lg leading-relaxed max-w-3xl">
                            Nach der Niederlage im Ersten Weltkrieg sollte das Reich komplett aufgeteilt werden. Doch Mustafa Kemal Pascha (Atatürk) organisierte den Widerstand. Der Unabhängigkeitskrieg endete mit der Abschaffung des Sultanats und der Ausrufung der Republik Türkei.
                        </p>
                    </div>
                </div>
            </BentoCard>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black py-32 border-t border-white/5 text-center relative z-10">
        <div className="opacity-60 hover:opacity-100 transition-opacity duration-700">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-ottoman-gold to-transparent mx-auto mb-8"></div>
            <p className="font-serif text-white text-3xl tracking-[0.5em] mb-4">OSMANISCHES REICH</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                Design Concept iOS 26 • History Remastered
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
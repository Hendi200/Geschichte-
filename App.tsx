import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Section from './components/Section';
import CulturalAnalysis from './components/CulturalAnalysis';
import Timeline from './components/Timeline';
import { ChevronDown, MapPin, Crown, Swords, Ship, ShieldCheck, Pickaxe, Star, AlertTriangle } from 'lucide-react';

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

  // 3D Tilt Effect Bento Card
  interface BentoProps {
    children?: React.ReactNode;
    title?: string;
    className?: string;
    icon?: any;
    image?: string;
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
          <div className="absolute inset-0 z-0">
            <img 
              src={image} 
              alt={title || "Image"} 
              className="w-full h-full object-cover"
            />
            {/* Gradients for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col h-full pointer-events-none">
          {title && (
            <div className="flex items-start justify-between mb-4 md:mb-6 shrink-0">
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
          <div className={`leading-relaxed font-sans font-normal text-base md:text-lg flex-grow flex flex-col ${image ? 'text-gray-200 shadow-black drop-shadow-md' : 'text-[#86868b]'} overflow-y-auto pr-2 custom-scrollbar`}>
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
            {/* New Hero Image - Blue Mosque Detailed */}
            <img 
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2070&auto=format&fit=crop" 
                alt="Blue Mosque" 
                className="w-full h-full object-cover animate-pan-slow scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto space-y-8 md:space-y-12">
          
          <div className="flex flex-col items-center">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white tracking-tighter leading-[0.9] drop-shadow-2xl text-center mix-blend-overlay opacity-90">
              OSMANISCHES<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">REICH</span>
            </h1>
          </div>
          
          <button 
            onClick={() => scrollToSection('intro-text')}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <ChevronDown size={32} />
          </button>
        </div>
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
        title="Die Chronologie"
        subtitle="Wähle eine Epoche"
        className="bg-[#050505]"
      >
        <Timeline onNavigate={scrollToSection} />
      </Section>

      {/* Intro Section - Osman I. */}
      <Section 
        id="intro" 
        title="Der Ursprung" 
        subtitle="1299 – 1453" 
        bgImage="https://images.unsplash.com/photo-1627918507851-246eb53e7786?q=80&w=2000&auto=format&fit=crop" // Cappadocia/Historic Landscape
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
           
           {/* Osman I. - 8 Cols */}
           <div className="lg:col-span-8 lg:row-span-2 min-h-[400px]">
             <BentoCard 
                title="Osman I. & Der Anfang" 
                icon={Crown}
                image="https://images.unsplash.com/photo-1598901865209-56e69dd69c5e?q=80&w=1000&auto=format&fit=crop" // Historic Map/Tughra style
             >
                <div className="space-y-6 max-w-3xl">
                  <p>
                    Der Begründer des Osmanischen Reiches hieß <strong>Osman I.</strong> Er wurde 1258 in der heutigen Türkei geboren und war der Sohn des Hordenfürsten. Nach dem Tod seines Vaters wurde er Häuptling.
                  </p>
                  <p>
                    Folglich gründete er sein Reich zum Anfang des 14. Jahrhunderts, wobei das Reich 1299 und die Dynastie am 27. Juli 1302 gegründet wurde. Aufgrund guter Freundschaft zu den Nachbarstämmen konnte er sich ihrer Unterstützung bei seinen Raubzügen sicher sein.
                  </p>
                </div>
             </BentoCard>
           </div>

           {/* Bursa - 4 Cols */}
           <div className="lg:col-span-4 min-h-[250px]">
             <BentoCard 
                title="Bursa: Die erste Hauptstadt" 
                icon={MapPin}
                image="https://images.unsplash.com/photo-1634913727040-348633c7f960?q=80&w=1000&auto=format&fit=crop" // Bursa Architecture
             >
                <p>
                  Die ersten großen Städte wurden erst von seinen Nachfolgern eingenommen. <strong>Bursa</strong> war ein wichtiger Handelspunkt an der Seidenstraße, welcher kurz vor Osmans Tod im Jahr 1326 eingenommen werden konnte.
                </p>
             </BentoCard>
           </div>

           {/* 1422 Failure - 4 Cols */}
           <div className="lg:col-span-4 min-h-[200px]">
             <BentoCard title="Rückschläge" icon={AlertTriangle}>
                <p>
                  Nach einigen Rückschlägen, wie beispielsweise die Hinrichtung angeblicher Thronerben, wurde der Versuch gestartet, Konstantinopel zu besetzen. 1422 scheiterte dieser jedoch.
                </p>
             </BentoCard>
           </div>
        </div>
      </Section>

      {/* 1453 Section - Conquest */}
      <Section 
        id="rise" 
        title="1453" 
        subtitle="Die Eroberung" 
        align="left"
        bgImage="https://images.unsplash.com/photo-1545459720-aacaf5090834?q=80&w=2000&auto=format&fit=crop" // Bosphorus Night/Moody
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Context */}
            <div className="md:col-span-2 lg:col-span-12 p-4 flex flex-col min-h-[150px]">
               <h3 className="text-3xl md:text-5xl text-white font-serif mb-6 leading-tight">
                 Das Ende von Byzanz
               </h3>
               <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                 Mehmed II. startete 1453, nachdem er den Thron 1451 bestieg, einen weiteren Versuch, die byzantinische Hauptstadt zu erobern.
               </p>
            </div>

            {/* The Canon - 6 Cols */}
            <div className="md:col-span-1 lg:col-span-6 min-h-[300px]">
              <BentoCard title="Die Urban-Kanone" icon={AlertTriangle} className="bg-gradient-to-br from-[#1c1c1e] to-black">
                <p>
                  Für diese Eroberung wurde eigens eine <strong>acht Meter lange Kanone</strong> gebaut, die zwar nur sieben Mal täglich schießen konnte, doch viel Verwüstung anrichtete.
                </p>
              </BentoCard>
            </div>

            {/* Ships - 6 Cols */}
            <div className="md:col-span-1 lg:col-span-6 min-h-[300px]">
              <BentoCard 
                title="Schiffe über Land" 
                icon={Ship}
                image="https://images.unsplash.com/photo-1589498260723-d6526eb063b0?q=80&w=1000&auto=format&fit=crop" // Ships/Sea
              >
                 <p className="font-medium text-lg shadow-black drop-shadow-md">
                   Da die Osmanen nicht in das Innere der Stadt kamen, trugen sie ihre Boote über Land in die Stadt, um von innen anzugreifen. Sie nahmen die Stadt ein, was das Ende des byzantinischen Reiches bedeutete.
                 </p>
              </BentoCard>
            </div>

            {/* Hagia Sophia - Full Width */}
            <div className="lg:col-span-12 min-h-[250px]">
              <BentoCard title="Aya-Ṣofya & Kaiser der Römer" icon={Crown}>
                 <p className="mb-4">
                   Konstantinopel wurde zur neuen Hauptstadt. Die Osmanen wollten nicht, dass die alten Bürger verschwanden; sie durften unter islamischer Führung weiter dort leben.
                 </p>
                 <p>
                    Schließlich bauten sie die <strong>Hagia Sophia</strong>, die damalige größte christliche Kirche der Welt, in eine Moschee um und nannten sie <em>Aya-Ṣofya</em>. Sultan Mehmed II. nahm den Titel <strong>„Kaiser der Römer“</strong> an.
                 </p>
              </BentoCard>
            </div>
        </div>
      </Section>

      {/* Culture Section (Moved before Vienna) */}
      <Section 
        id="culture" 
        title="Wahrnehmung" 
        subtitle="Selbst & Fremd" 
        bgImage="https://images.unsplash.com/photo-1628109789126-78b196123e25?q=80&w=2000&auto=format&fit=crop" // Turkish Tiles/Art
      >
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 min-h-[400px]">
               <CulturalAnalysis />
            </div>
        </div>
      </Section>

      {/* 1683 Section - Vienna */}
      <Section 
        id="vienna" 
        title="Wien 1683" 
        subtitle="Krieg der Kanoniere" 
        bgImage="https://images.unsplash.com/photo-1596306499317-849022958730?q=80&w=2000&auto=format&fit=crop" // Palace details
      >
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* The Siege Context - 2 Cols */}
            <div className="lg:col-span-2 min-h-[350px]">
              <BentoCard title="Der Goldene Apfel" dark>
                  <p className="text-lg mb-4 text-gray-300">
                      Wien, auch als der „Goldene Apfel“ bekannt, war eine begehrte Festung. Nachdem 1529 der erste Versuch scheiterte, wurde 1683 ein weiterer gestartet.
                  </p>
                  <p className="mb-4 text-gray-300">
                      Falls die Stadt gefallen wäre, würden die Osmanen nicht mehr aufzuhalten gewesen sein. Schon jetzt herrschten sie über den Balkan und wenn sie Wien erobert hätten, dann hätten sie auch den Norden Europas beherrscht.
                  </p>
                  <p className="text-gray-300">
                      Dies ist der Hauptgrund, weshalb die Menschen Wiens ihre Stadt an der Bernsteinstraße auch mit großen Verlusten verteidigten.
                  </p>
              </BentoCard>
            </div>

            {/* Tunnels - 1 Col */}
            <div className="min-h-[350px]">
               <BentoCard 
                 title="Der Tunnelkrieg" 
                 icon={Pickaxe} 
                 image="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop" // Dark texture/Underground feel
               >
                  <p className="text-gray-200 shadow-black drop-shadow-md">
                     Da sie die Mauern nicht überwinden konnten, begannen die Osmanen Tunnel zu graben. Die Bewohner Wiens machten die Kämpfer mittels kleinster Erschütterungen im Boden aus und gruben sich selbst in die Schächte, um Minen zu entschärfen.
                  </p>
               </BentoCard>
            </div>

            {/* The Alliance - 3 Cols (Full Width) */}
            <div className="md:col-span-2 lg:col-span-3 min-h-[400px]">
              <BentoCard 
                title="Die Heilige Liga & Der Vertrag" 
                icon={ShieldCheck} 
                className="bg-[#1c1c1e]"
              >
                  <div className="flex flex-col lg:flex-row gap-8 h-full">
                      <div className="flex-1 space-y-4">
                          <p>
                             Einer der Gründe für den Angriff war der abgelaufene Friedensvertrag. Es wurden diverse Defensivbündnisse geschlossen: Leopold und Bayern gegen Frankreich und das Osmanische Reich, sowie ein vom Papst geschlossenes Bündnis mit König Jan Sobieski.
                          </p>
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                             <h4 className="font-bold text-ottoman-gold mb-2">Die Schlacht am Kahlenberg</h4>
                             <p>
                               Mitte September wurden die Osmanen geschlagen. Vor allem die <strong>„Polnischen Flügelreiter“</strong> verhalfen zum Sieg. Der Großwesir Kara Mustafa Pascha entkam nur knapp. Dies war der Beginn des langsamen Niederganges.
                             </p>
                          </div>
                      </div>
                      
                      {/* Scrollable Treaty List */}
                      <div className="flex-1 bg-black/40 rounded-xl border border-white/10 p-5 flex flex-col overflow-hidden max-h-[400px]">
                          <strong className="block text-white mb-3 uppercase tracking-widest text-xs border-b border-white/10 pb-2">Vertragsdetails (Auszug)</strong>
                          <ul className="space-y-3 text-sm text-gray-400 overflow-y-auto pr-2 custom-scrollbar">
                              <li>• Kaiser stellt 60.000 Mann, Polen 40.000 Mann.</li>
                              <li>• Wenn der König von Polen teilnimmt, übernimmt er die Führung.</li>
                              <li>• Gegenseitiger Beistand bei Belagerung von Krakau oder Wien.</li>
                              <li>• Der Papst steuerte 1,5 Millionen Gulden bei.</li>
                              <li>• Der Kaiser zahlt an die polnische Krone 200.000 Reichstaler.</li>
                              <li>• Alle Steuern der venezianischen Kirchen werden als Sold verwendet.</li>
                              <li>• Kein separater Waffenstillstand mit den Türken ohne Einverständnis.</li>
                              <li>• Schwur eines heiligen Eids auf diesen Vertrag.</li>
                          </ul>
                      </div>
                  </div>
              </BentoCard>
            </div>
         </div>
      </Section>

      {/* Fall Section */}
      <Section 
        id="fall" 
        title="Der Zerfall" 
        subtitle="Der 1. Weltkrieg" 
        bgImage="https://images.unsplash.com/photo-1546865205-09c313a23223?q=80&w=2000&auto=format&fit=crop" // Desolate/Historic BW style
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Jungtürken */}
            <div className="lg:col-span-1 min-h-[250px]">
              <BentoCard title='Die Jungtürken' className="bg-[#1c1c1e]/80">
                  <p className="text-base text-gray-400">
                      Anfang des 20. Jahrhunderts forderten Jungtürken eine Reform. 1908 rebellierten sie und schafften es, dass die Verfassung wieder in Kraft gesetzt wurde. Sultan Mehmed V. wurde zur Marionette. 1913 übernahmen sie durch einen Militärputsch endgültig die Macht.
                  </p>
              </BentoCard>
            </div>

            {/* WW1 & Jihad */}
            <div className="md:col-span-2 min-h-[250px]">
              <BentoCard title="Der Heilige Krieg" icon={Swords}>
                  <p className="text-lg text-gray-300 mb-4">
                     Als der 1. Weltkrieg begann, bestand bereits eine Waffenbrüderschaft mit den Deutschen.
                  </p>
                  <p className="text-gray-400 text-sm">
                     Am <strong>14. November 1914</strong> wurde zum Dschihad aufgerufen, dem heiligen Krieg gegenüber der Entente. Niemand schloss sich diesem Dschihad an, was zeigte, dass die Völker innerhalb des Reiches nicht mehr unter Kontrolle waren.
                  </p>
              </BentoCard>
            </div>

            {/* 1915/1916 */}
            <div className="md:col-span-3 lg:col-span-1 min-h-[300px]">
                <BentoCard title="1915 / 1916" icon={AlertTriangle} dark>
                    <p className="text-gray-400 mb-2">
                        Es kam zu Massakern an den Armeniern und anderen Minderheiten. Ihnen wurde vorgeworfen, Russland geholfen zu haben.
                    </p>
                    <p className="text-gray-500 text-xs italic">
                        Fast 1,5 Millionen Menschen starben oder wurden umgesiedelt. Deutschland wusste davon, unternahm jedoch nichts.
                    </p>
                </BentoCard>
            </div>

            {/* Ataturk */}
            <div className="md:col-span-3 lg:col-span-2 min-h-[300px]">
              <BentoCard 
                title="Mustafa Kemal Pascha"
                image="https://images.unsplash.com/photo-1587841120409-f62d8540c493?q=80&w=2000&auto=format&fit=crop" // Historic Istanbul/Soldiers
              >
                  <div className="flex flex-col gap-4 mt-2">
                      <p className="text-white text-lg font-medium drop-shadow-md">
                          Am 30. Oktober 1918 schwiegen die Waffen. Eigentlich sollte das Reich in Zonen aufgeteilt werden.
                      </p>
                      <p className="text-gray-200 shadow-black drop-shadow-md">
                          Doch <strong>Mustafa Kemal Pascha (Atatürk)</strong> organisierte den Widerstand und rief die heutige Türkei aus. Er ist der Grund, weshalb die Türkei heute so ist, wie sie ist.
                      </p>
                  </div>
              </BentoCard>
            </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5 text-center relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-ottoman-gold mb-4">
              <Star size={24} fill="currentColor" />
            </div>
            <p className="font-serif text-white text-2xl tracking-[0.3em]">OSMANISCHES REICH</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
import React, { useState, useRef } from 'react';
import { ChevronRight, Calendar, ArrowDownCircle } from 'lucide-react';

interface Event {
  year: string;
  title: string;
  description: string;
  image: string;
  targetId: string; // ID of the section to scroll to
}

// Updated Events with Working Images and Correct Order
const events: Event[] = [
  {
    year: '1299',
    title: 'Der Anfang',
    description: 'Osman I. gründet das Reich. Von Bithynien aus beginnt der Aufstieg zu einer Weltmacht.',
    image: 'https://images.unsplash.com/photo-1572010696952-474c3d0c9f80?q=80&w=1000&auto=format&fit=crop', // Landscape Turkey
    targetId: 'intro'
  },
  {
    year: '1453',
    title: 'Konstantinopel',
    description: 'Die Eroberung der byzantinischen Hauptstadt durch Mehmed II. Der Beginn einer neuen Ära.',
    image: 'https://images.unsplash.com/photo-1631867675167-90a428a6c693?q=80&w=1000&auto=format&fit=crop', // Istanbul Historic
    targetId: 'rise'
  },
  {
    year: '1520',
    title: 'Die Blütezeit',
    description: 'Unter Süleyman dem Prächtigen erreicht das Reich seinen kulturellen und politischen Höhepunkt.',
    image: 'https://images.unsplash.com/photo-1584555614064-96f3768f7f7c?q=80&w=1000&auto=format&fit=crop', // Islamic Art/Architecture
    targetId: 'culture'
  },
  {
    year: '1683',
    title: 'Wien',
    description: 'Die gescheiterte zweite Belagerung Wiens markiert den Wendepunkt und den Beginn des Rückzugs.',
    image: 'https://images.unsplash.com/photo-1588673756285-d85265df6eb2?q=80&w=1000&auto=format&fit=crop', // Vienna Architecture
    targetId: 'vienna'
  },
  {
    year: '1914',
    title: 'Der Fall',
    description: 'Der Erste Weltkrieg, die Jungtürken und der endgültige Zerfall des Reiches.',
    image: 'https://images.unsplash.com/photo-1546865205-09c313a23223?q=80&w=1000&auto=format&fit=crop', // Historic B/W style or desolate
    targetId: 'fall'
  }
];

interface TimelineProps {
  onNavigate: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleEventClick = (index: number) => {
    setActiveIndex(index);
    const event = events[index];
    
    // Center the button in the strip
    if (scrollRef.current) {
        const buttons = scrollRef.current.querySelectorAll('button');
        if (buttons[index]) {
            buttons[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
  };

  const handleNavigate = () => {
    onNavigate(events[activeIndex].targetId);
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12 py-8">
      
      {/* Timeline Strip */}
      <div className="relative w-full">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 hidden md:block"></div>
        
        {/* Scroll Container */}
        <div 
            ref={scrollRef}
            className="flex md:justify-between overflow-x-auto pb-8 pt-4 gap-4 px-4 custom-scrollbar snap-x"
        >
            {events.map((event, index) => (
                <button
                    key={index}
                    onClick={() => handleEventClick(index)}
                    className={`
                        relative flex-shrink-0 flex flex-col items-center gap-3 group snap-center transition-all duration-300
                        ${index === activeIndex ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-80'}
                    `}
                >
                    {/* Dot Indicator */}
                    <div className={`
                        w-4 h-4 rounded-full border-2 transition-all duration-300 z-10
                        ${index === activeIndex 
                            ? 'bg-ottoman-gold border-ottoman-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' 
                            : 'bg-black border-white/30 group-hover:border-white'}
                    `}></div>
                    
                    {/* Year Label */}
                    <span className={`
                        font-serif font-bold text-lg tracking-wider transition-colors
                        ${index === activeIndex ? 'text-white' : 'text-gray-500'}
                    `}>
                        {event.year}
                    </span>
                </button>
            ))}
        </div>
      </div>

      {/* Preview Card (Navigation Hub) */}
      <div className="relative w-full min-h-[350px] md:min-h-[450px] perspective-1000">
          {events.map((event, index) => (
             <div 
                key={index}
                className={`
                    absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${index === activeIndex 
                        ? 'opacity-100 translate-y-0 pointer-events-auto rotate-x-0' 
                        : 'opacity-0 translate-y-10 pointer-events-none -rotate-x-12'}
                `}
             >
                 <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-[#1c1c1e] border border-white/10 group shadow-2xl">
                    
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-[2s] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1c1c1e]/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col gap-4 md:gap-6 z-10 items-start">
                        <div className="flex items-center gap-3 text-ottoman-gold mb-2">
                             <Calendar size={20} />
                             <span className="font-sans font-bold tracking-widest text-sm uppercase">Zeitstrahl: {event.year}</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-none drop-shadow-xl">
                            {event.title}
                        </h3>
                        
                        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-md">
                            {event.description}
                        </p>

                        <button 
                            onClick={handleNavigate}
                            className="mt-4 px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 hover:bg-ottoman-gold hover:scale-105 transition-all duration-300 group/btn shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <span>Zum Kapitel</span>
                            <ArrowDownCircle size={20} className="group-hover/btn:translate-y-1 transition-transform" />
                        </button>
                    </div>
                 </div>
             </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
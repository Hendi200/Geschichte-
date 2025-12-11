
import React, { useState, useRef } from 'react';
import { Calendar, ArrowDownCircle } from 'lucide-react';
import { getAsset } from '../assets';

interface Event {
  year: string;
  title: string;
  description: string;
  imageKey: string;
  targetId: string; // ID of the section to scroll to
}

// Updated Events
const events: Event[] = [
  {
    year: '1299',
    title: 'Der Anfang',
    description: 'Osman I. gründet das Reich. Von Bithynien aus beginnt der Aufstieg zu einer Weltmacht.',
    imageKey: 'timeline_1299',
    targetId: 'intro'
  },
  {
    year: '1453',
    title: 'Konstantinopel',
    description: 'Die Eroberung der byzantinischen Hauptstadt durch Mehmed II. Der Beginn einer neuen Ära.',
    imageKey: 'timeline_1453',
    targetId: 'rise'
  },
  {
    year: '1520',
    title: 'Die Blütezeit',
    description: 'Unter Süleyman dem Prächtigen erreicht das Reich seinen kulturellen und politischen Höhepunkt.',
    imageKey: 'timeline_1520',
    targetId: 'culture'
  },
  {
    year: '1683',
    title: 'Wien',
    description: 'Die gescheiterte zweite Belagerung Wiens markiert den Wendepunkt und den Beginn des Rückzugs.',
    imageKey: 'timeline_1683',
    targetId: 'vienna'
  },
  {
    year: '1914',
    title: 'Der Fall',
    description: 'Der Erste Weltkrieg, die Jungtürken und der endgültige Zerfall des Reiches.',
    imageKey: 'timeline_1914',
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
    if (scrollRef.current) {
        const buttons = scrollRef.current.querySelectorAll('button');
        if (buttons[index]) {
            buttons[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
  };

  const handleNavigate = (targetId: string) => {
    onNavigate(targetId);
  };

  return (
    <div className="w-full py-4 md:py-8">
      
      {/* MOBILE VIEW: Vertical "Ollivere" Cards Stack */}
      <div className="flex flex-col gap-8 md:hidden px-4">
          {events.map((event, index) => (
             <div 
               key={index} 
               onClick={() => handleNavigate(event.targetId)}
               className="group relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl active:scale-95 transition-transform duration-300"
             >
                 {/* Background Image */}
                 <img 
                    src={getAsset(event.imageKey as any)} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                 {/* Large Year Text Background */}
                 <span className="absolute -left-4 top-4 text-[8rem] font-bold text-white/5 font-serif leading-none select-none">
                   {event.year}
                 </span>

                 {/* Content Overlay */}
                 <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3">
                    <span className="text-ottoman-gold font-bold tracking-widest text-sm uppercase">
                       {event.year}
                    </span>
                    <h3 className="text-4xl font-serif font-bold text-white leading-tight">
                        {event.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-snug line-clamp-3">
                        {event.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-white font-medium">
                        <span>Mehr lesen</span>
                        <ArrowDownCircle size={18} />
                    </div>
                 </div>
             </div>
          ))}
      </div>


      {/* DESKTOP VIEW: Horizontal Interactive Timeline */}
      <div className="hidden md:flex flex-col gap-12">
        {/* Timeline Selector Strip */}
        <div className="relative w-full z-20">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2"></div>
            
            {/* Scroll Container */}
            <div 
                ref={scrollRef}
                className="flex justify-between items-center py-4 px-12"
            >
                {events.map((event, index) => (
                    <button
                        key={index}
                        onClick={() => handleEventClick(index)}
                        className={`
                            relative flex flex-col items-center justify-center gap-3 group transition-all duration-300
                            ${index === activeIndex ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-80 hover:scale-105'}
                        `}
                    >
                        {/* Dot */}
                        <div className={`
                            w-5 h-5 rounded-full border-2 transition-all duration-300 z-10
                            ${index === activeIndex 
                                ? 'bg-ottoman-gold border-ottoman-gold shadow-[0_0_20px_rgba(212,175,55,0.8)]' 
                                : 'bg-black border-white/30 group-hover:border-white'}
                        `}></div>
                        
                        {/* Year Label */}
                        <span className={`
                            font-serif font-bold text-xl tracking-wider transition-colors
                            ${index === activeIndex ? 'text-white' : 'text-gray-500'}
                        `}>
                            {event.year}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* Desktop Preview Card */}
        <div className="relative w-full h-[600px] perspective-1000">
            {events.map((event, index) => (
                <div 
                    key={index}
                    className={`
                        absolute inset-0 w-full h-full transition-all duration-700 ease-out p-4
                        ${index === activeIndex 
                            ? 'opacity-100 z-10 translate-y-0 rotate-x-0' 
                            : 'opacity-0 z-0 translate-y-10 rotate-x-6 pointer-events-none'}
                    `}
                >
                    <div className="w-full h-full rounded-[3rem] overflow-hidden relative bg-[#1c1c1e] border border-white/10 shadow-2xl flex">
                        
                        {/* Image Side */}
                        <div className="relative w-[60%] h-full">
                            <img 
                                src={getAsset(event.imageKey as any)} 
                                alt={event.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c1c1e]"></div>
                        </div>

                        {/* Content Side */}
                        <div className="relative w-[40%] h-full p-16 flex flex-col justify-center gap-6 bg-[#1c1c1e]">
                            <div className="flex items-center gap-3 text-ottoman-gold mb-2">
                                <Calendar size={20} />
                                <span className="font-sans font-bold tracking-widest text-sm uppercase">Zeitstrahl</span>
                            </div>
                            
                            <h3 className="text-7xl font-serif font-bold text-white leading-none">
                                {event.year}
                            </h3>
                            <h4 className="text-3xl font-medium text-white/80">
                                {event.title}
                            </h4>
                            
                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                {event.description}
                            </p>

                            <button 
                                onClick={() => handleNavigate(event.targetId)}
                                className="mt-8 w-fit px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:bg-ottoman-gold hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                <span>Zum Kapitel</span>
                                <ArrowDownCircle size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

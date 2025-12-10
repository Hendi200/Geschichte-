import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgImage?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, bgImage, align = 'center', className = '' }) => {
  return (
    <section 
      id={id} 
      className={`relative py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden w-full ${className}`}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <>
            <img 
                src={bgImage} 
                alt="Background" 
                className="w-full h-full object-cover opacity-40 select-none pointer-events-none scale-105"
            />
            {/* Smooth gradients for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </>
        ) : (
          <div className="w-full h-full bg-black"></div>
        )}
      </div>

      {/* Content Container - max-w-7xl ensures Apple-like constraints on large screens */}
      <div className={`relative z-10 w-full max-w-[1400px] mx-auto`}>
        
        {/* Header Block */}
        <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-4xl px-2`}>
          {subtitle && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 ${align === 'center' ? 'mx-auto' : ''}`}>
               <span className="text-ottoman-gold text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase font-sans">
                 {subtitle}
               </span>
            </div>
          )}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {title}
          </h2>
          {align === 'center' && (
             <div className="h-1 w-24 bg-white/10 mx-auto rounded-full"></div>
          )}
        </div>

        {/* Content Body */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
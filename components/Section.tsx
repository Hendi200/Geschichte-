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
      className={`relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden ${className}`}
    >
      {/* Background with darker overlay for better readability */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <>
            <img 
                src={bgImage} 
                alt="Background" 
                className="w-full h-full object-cover opacity-50 select-none pointer-events-none"
            />
            {/* Strong gradient to fade image into black at top/bottom and darken overall */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </>
        ) : (
          <div className="w-full h-full bg-black"></div>
        )}
      </div>

      {/* Content Container */}
      <div className={`relative z-10 max-w-7xl w-full mx-auto`}>
        
        {/* Header */}
        <div className={`mb-24 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-4xl`}>
          {subtitle && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 shadow-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
               <div className="w-1.5 h-1.5 rounded-full bg-ottoman-gold shadow-[0_0_10px_#D4AF37]"></div>
               <span className="text-ottoman-gold text-xs font-bold tracking-[0.25em] uppercase font-sans">
                 {subtitle}
               </span>
            </div>
          )}
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-xl tracking-tight leading-[0.9]">
            {title}
          </h2>
          <div className={`h-1 w-32 bg-gradient-to-r from-transparent via-ottoman-gold to-transparent opacity-60 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
        </div>

        {/* Content Body */}
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
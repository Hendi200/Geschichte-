import React, { useRef, useState, useEffect } from 'react';

interface BentoProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  icon?: any;
  image?: string;
  dark?: boolean;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoProps> = ({ 
  children, 
  title, 
  className = "", 
  icon: Icon, 
  image, 
  dark = false, 
  onClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate rotation (Limit to +/- 8 degrees for a noticeable but elegant effect)
    // RotateX is inverted so pushing the top rotates positive (top goes back)
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;

    // Apply directly to style to avoid React re-renders (Performance!)
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Reset to flat state
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${className}
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
    >
      <div 
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Smooth transition only for the transform property
        style={{ transition: 'transform 0.1s ease-out' }}
        className={`
          relative h-full w-full overflow-hidden rounded-[2rem] border transition-shadow duration-500 group flex flex-col shadow-lg
          ${(image && !imgError) ? 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-white/10' : 'bg-[#1c1c1e] hover:bg-[#252527] border-white/5 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'}
          ${dark ? 'bg-black border-white/10' : ''}
        `}
      >
        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Background Image Handling */}
        {image && !imgError && (
          <div className="absolute inset-0 z-0 bg-black">
            <img 
              src={image} 
              alt={title || "Image"} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
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
                 <h3 className={`text-xl md:text-2xl font-serif font-bold tracking-tight drop-shadow-lg ${image && !imgError ? 'text-white' : 'text-[#f5f5f7]'}`}>
                   {title}
                 </h3>
               </div>
            </div>
          )}
          
          {/* Children fill the remaining space */}
          <div className={`leading-relaxed font-sans font-normal text-base md:text-lg flex-grow flex flex-col ${image && !imgError ? 'text-gray-200 shadow-black drop-shadow-md' : 'text-[#86868b]'} overflow-y-auto pr-2 custom-scrollbar pointer-events-auto`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
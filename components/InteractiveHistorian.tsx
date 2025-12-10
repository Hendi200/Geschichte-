import React from 'react';
import { Info } from 'lucide-react';

interface InteractiveHistorianProps {
  title: string;
  text: string;
}

const InteractiveHistorian: React.FC<InteractiveHistorianProps> = ({ title, text }) => {
  return (
    <div className="mt-8 relative overflow-hidden group">
      <div className="glass-panel-light rounded-3xl p-6 transition-all duration-300 hover:bg-white/15">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-ottoman-gold/20 flex items-center justify-center">
            <Info size={16} className="text-ottoman-gold" />
          </div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Historischer Fakt</h3>
        </div>
        
        <h4 className="text-xl font-serif font-bold text-white mb-3">{title}</h4>
        
        <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
          {text}
        </p>

        {/* Decorative ambient glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-ottoman-gold/10 blur-3xl rounded-full group-hover:bg-ottoman-gold/20 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default InteractiveHistorian;
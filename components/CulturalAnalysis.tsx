import React, { useState } from 'react';
import { AnalysisTopic } from '../types';
import { ShieldAlert, Sparkles, Handshake } from 'lucide-react';

const CulturalAnalysis: React.FC = () => {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisTopic>(AnalysisTopic.THREAT);

  const analysisContent = {
    [AnalysisTopic.THREAT]: {
      title: "Die Türkengefahr",
      content: `Die "Türkengefahr" dominierte jahrhundertelang die europäische Politik. Nach dem Fall Konstantinopels 1453 läuteten in Europa die "Türkenglocken". Martin Luther sah in den Osmanen die "Geißel Gottes". Diese Angst einte das zerstrittene Europa zeitweise, wurde aber auch propagandistisch genutzt, um Steuern zu erheben.`
    },
    [AnalysisTopic.FASCINATION]: {
      title: "Turquerie & Luxus",
      content: `Trotz Krieg herrschte Faszination. Die "Turquerie" prägte das Rokoko: Osmanische Kleidung auf Maskenbällen, Mozarts "Alla Turca" und vor allem der Kaffee, der nach der Belagerung Wiens Europa eroberte. Auch die Tulpe kam aus dem Osmanischen Reich und löste in Holland einen Börsenwahn aus.`
    },
    [AnalysisTopic.EXCHANGE]: {
      title: "Der Blick der Osmanen",
      content: `Lange blickten die Osmanen auf die "Franken" herab. Konstantinopel war für sie der "Rote Apfel", das Zentrum der Welt. Sie übernahmen jedoch pragmatisch westliche Militärtechnik (Artillerie). Erst mit dem militärischen Niedergang wandelte sich die Arroganz in Reformeifer nach westlichem Vorbild.`
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* iOS Segmented Control */}
      <div className="bg-black/40 p-1 rounded-2xl flex flex-col sm:flex-row backdrop-blur-md border border-white/5">
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.THREAT)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${activeAnalysis === AnalysisTopic.THREAT ? 'bg-white/15 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <ShieldAlert size={16} />
          <span>Bedrohung</span>
        </button>
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.FASCINATION)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${activeAnalysis === AnalysisTopic.FASCINATION ? 'bg-white/15 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Sparkles size={16} />
          <span>Faszination</span>
        </button>
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.EXCHANGE)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${activeAnalysis === AnalysisTopic.EXCHANGE ? 'bg-white/15 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Handshake size={16} />
          <span>Austausch</span>
        </button>
      </div>

      {/* Content Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 min-h-[250px] animate-fade-in">
        <h3 className="text-2xl font-serif font-bold text-ottoman-gold mb-4">
          {analysisContent[activeAnalysis].title}
        </h3>
        <p className="text-gray-200 leading-relaxed text-lg font-light">
          {analysisContent[activeAnalysis].content}
        </p>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           {activeAnalysis === AnalysisTopic.THREAT && <ShieldAlert size={120} />}
           {activeAnalysis === AnalysisTopic.FASCINATION && <Sparkles size={120} />}
           {activeAnalysis === AnalysisTopic.EXCHANGE && <Handshake size={120} />}
        </div>
      </div>
    </div>
  );
};

export default CulturalAnalysis;
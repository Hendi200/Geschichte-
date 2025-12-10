import React, { useState } from 'react';
import { AnalysisTopic } from '../types';
import { Eye, Users, TrainFront } from 'lucide-react';

const CulturalAnalysis: React.FC = () => {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisTopic>(AnalysisTopic.THREAT);

  // Mapping enums to the new content structure temporarily
  // We reuse the existing enum keys but change the display content completely
  const analysisContent = {
    [AnalysisTopic.THREAT]: { // Using THREAT slot for "Selbstwahrnehmung"
      title: "Das Millet-System",
      icon: <Users size={200} />,
      content: (
        <>
          <p className="mb-4">
            Von sich selber hielten die Osmanen recht viel. Sie standen an der Spitze ihres selbst aufgebauten <strong>Millet-Systems</strong>.
          </p>
          <p className="mb-4">
            In diesem System durften zwar alle Religionen miteinander leben, doch gab es keine Gleichberechtigung. 
            Alle Untergeordneten (Nicht-Muslime) mussten eine Kopfsteuer an den Staat zahlen.
          </p>
          <p>
             Die Osmanen waren grundsätzlich migrationsfreundlich, solange die Zugezogenen zum Wachstum beisteuern konnten. 
             Anfang des 20. Jahrhunderts lag der Anteil der Zugezogenen bei knapp 30%.
          </p>
        </>
      )
    },
    [AnalysisTopic.FASCINATION]: { // Using FASCINATION slot for "Fremdwahrnehmung"
      title: "Der Türkische Scharfrichter",
      icon: <Eye size={200} />,
      content: (
        <>
          <p className="mb-4">
            Andere europäische Länder verurteilten die harten Vorgehensweisen der Osmanen bei Niederschlagungen von Aufständen.
            Man berichtete propagandistisch vom <em>"Le bourreau turc"</em> (der türkische Scharfrichter).
          </p>
          <p>
            Teile der slawischen Bevölkerung lehnten sich gegen die Vorherrschaft und die Steuerlast auf.
            Das Bild des Osmanischen Reiches wandelte sich in Europa vom faszinierenden Exotismus zum "Kranken Mann am Bosporus".
          </p>
        </>
      )
    },
    [AnalysisTopic.EXCHANGE]: { // Using EXCHANGE slot for "Bündnisse & Bahn"
      title: "Eisenbahn & Bündnisse",
      icon: <TrainFront size={200} />,
      content: (
        <>
          <p className="mb-4">
            Die Türken erkannten, dass sie technologisch nicht mehr mit England und Frankreich mithalten konnten.
            Es wurde eine Bank gegründet und der legendäre Zug, der Istanbul mit Paris verband.
          </p>
          <p className="mb-4">
            Nachdem Frankreich (Algerien, Tunesien) und England (Ägypten) osmanische Gebiete übernahmen – was als großer Verrat empfunden wurde – suchten die Osmanen neue Verbündete: <strong>Deutschland</strong>.
          </p>
          <p>
            Kaiser Wilhelm II. und Abdülhamid II. planten die <strong>Bagdad-Bahn</strong>, um Waren von Berlin bis Bagdad auszutauschen.
          </p>
        </>
      )
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      {/* iOS Segmented Control */}
      <div className="bg-[#1c1c1e] p-1.5 rounded-2xl flex flex-col md:flex-row border border-white/5">
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.THREAT)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 ${activeAnalysis === AnalysisTopic.THREAT ? 'bg-[#3a3a3c] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Users size={18} />
          <span>Selbstwahrnehmung</span>
        </button>
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.FASCINATION)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 ${activeAnalysis === AnalysisTopic.FASCINATION ? 'bg-[#3a3a3c] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Eye size={18} />
          <span>Fremdwahrnehmung</span>
        </button>
        <button 
          onClick={() => setActiveAnalysis(AnalysisTopic.EXCHANGE)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 ${activeAnalysis === AnalysisTopic.EXCHANGE ? 'bg-[#3a3a3c] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <TrainFront size={18} />
          <span>Bündnisse</span>
        </button>
      </div>

      {/* Content Card */}
      <div className="flex-grow relative overflow-hidden rounded-[2rem] bg-[#1c1c1e] border border-white/10 p-8 md:p-10 animate-fade-in flex flex-col justify-center min-h-[400px]">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
          {analysisContent[activeAnalysis].title}
        </h3>
        <div className="text-gray-300 leading-relaxed text-base md:text-lg z-10 relative">
          {analysisContent[activeAnalysis].content}
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none text-white">
           {analysisContent[activeAnalysis].icon}
        </div>
      </div>
    </div>
  );
};

export default CulturalAnalysis;
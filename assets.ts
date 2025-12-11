
// Central Asset Management
// Feste, hochwertige Bilder für die Website.

export const assets = {
  // Hero: Blaue Moschee bei Dämmerung, episch
  hero: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2832&auto=format&fit=crop",
  
  // Intro Hintergrund: Dunkles, osmanisches Muster
  intro_bg: "https://images.unsplash.com/photo-1590053913076-18a7ae7e1a3b?q=80&w=2670&auto=format&fit=crop",
  
  // Osman I: Tughra (Kalligraphie) oder symbolisches Schwert/Rüstung
  osman: "https://images.unsplash.com/photo-1633108603681-30cb129994b6?q=80&w=2670&auto=format&fit=crop",
  
  // Bursa: Innenansicht Moschee, Stein, Licht
  bursa: "https://images.unsplash.com/photo-1580136608079-72029d0de130?q=80&w=2574&auto=format&fit=crop",
  
  // Kanone: Alte Bronze-Textur / Festungsmauer
  cannon: "https://images.unsplash.com/photo-1599665678486-13dfdb2038b3?q=80&w=2670&auto=format&fit=crop",
  
  // Schiffe: Nacht, Wasser, Nebel
  ships: "https://images.unsplash.com/photo-1500373994743-5575f2f50016?q=80&w=2574&auto=format&fit=crop",
  
  // Hagia Sophia: Innenraum, Kuppel
  hagia_sophia: "https://images.unsplash.com/photo-1571167520092-2f3475949d23?q=80&w=2670&auto=format&fit=crop",
  
  // Wien Mauer: Große Festung
  vienna_wall: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2574&auto=format&fit=crop",
  
  // Wien Tunnel: Untergrund, dunkel
  vienna_tunnels: "https://images.unsplash.com/photo-1605634453473-f938c5387431?q=80&w=2670&auto=format&fit=crop",
  
  // Wien Vertrag: Altes Papier/Gemälde
  vienna_treaty: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2574&auto=format&fit=crop",
  
  // Der Fall Hintergrund: Trümmer/Erster Weltkrieg Vibe
  fall_bg: "https://images.unsplash.com/photo-1533496030588-e219666f44d9?q=80&w=2668&auto=format&fit=crop",
  
  // Atatürk: Moderne Türkei / Flagge / Statue SW
  ataturk: "https://images.unsplash.com/photo-1528659553764-7e50153835c2?q=80&w=2670&auto=format&fit=crop",
  
  // Timeline Images
  timeline_1299: "https://images.unsplash.com/photo-1545163628-86d13264b38d?q=80&w=2574&auto=format&fit=crop", // Archway
  timeline_1453: "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2598&auto=format&fit=crop", // Istanbul
  timeline_1520: "https://images.unsplash.com/photo-1584555614082-996a6d616335?q=80&w=2574&auto=format&fit=crop", // Tiles
  timeline_1683: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2672&auto=format&fit=crop", // Castle
  timeline_1914: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2670&auto=format&fit=crop"  // Old Book/Map
};

// Helper function to get an asset by key
export const getAsset = (key: keyof typeof assets): string => {
  return assets[key];
};

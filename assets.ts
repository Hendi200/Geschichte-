
// Central Asset Management
// LOKALE DATEIEN
// Die Bilder liegen im Ordner "untitled-0".
// Dateinamen müssen 1.jpg bis 17.jpg sein.

export const assets = {
  // 1.jpg -> Startseite (Hero)
  hero: "/untitled-0/1.jpg",
  
  // 2.jpg -> Intro Text Hintergrund
  intro_bg: "/untitled-0/2.jpg",
  
  // 3.jpg -> Osman I.
  osman: "/untitled-0/3.jpg",
  
  // 4.jpg -> Bursa
  bursa: "/untitled-0/4.jpg",
  
  // 5.jpg -> Kanone
  cannon: "/untitled-0/5.jpg",
  
  // 6.jpg -> Schiffe
  ships: "/untitled-0/6.jpg",
  
  // 7.jpg -> Hagia Sophia
  hagia_sophia: "/untitled-0/7.jpg",
  
  // 8.jpg -> Wien Mauer
  vienna_wall: "/untitled-0/8.jpg",
  
  // 9.jpg -> Wien Tunnel
  vienna_tunnels: "/untitled-0/9.jpg",
  
  // 10.jpg -> Wien Vertrag
  vienna_treaty: "/untitled-0/10.jpg",
  
  // 11.jpg -> Der Fall Hintergrund
  fall_bg: "/untitled-0/11.jpg",
  
  // 12.jpg -> Atatürk
  ataturk: "/untitled-0/12.jpg",
  
  // Zeitstrahl Bilder (13-17)
  timeline_1299: "/untitled-0/13.jpg",
  timeline_1453: "/untitled-0/14.jpg",
  timeline_1520: "/untitled-0/15.jpg",
  timeline_1683: "/untitled-0/16.jpg",
  timeline_1914: "/untitled-0/17.jpg"
};

// Helper function to get an asset by key
export const getAsset = (key: keyof typeof assets): string => {
  return assets[key];
};

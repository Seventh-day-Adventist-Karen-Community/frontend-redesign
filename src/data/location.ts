// Church location — from the Google Maps pin for "S.D.A. Church, Karen Community".
export const location = {
  name: "S.D.A. Church, Karen Community",
  area: "Karen, Nairobi, Kenya",
  lat: -1.3737279,
  lng: 36.7613379,
  // Short link the church shares publicly
  shareUrl: "https://maps.app.goo.gl/pskEPMycGv5jrr3D8",
};

// Keyless embed (no API key needed)
export const embedUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`;

// Opens turn-by-turn directions in Google Maps from the visitor's location
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

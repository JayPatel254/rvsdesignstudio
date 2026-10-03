// All client details + gallery live here. Swap files in /public to update the site.
export const SITE = {
  name: "RVS Design Studio",
  phone: "090998 64370",
  whatsapp: "919099864370", // country code + number, no symbols
  email: "hello@rvsdesignstudio.com", // TODO: replace demo email with client's real one
  instagram: "https://www.instagram.com/rvsdesignstudio/",
  mapsLink: "https://maps.app.goo.gl/Jm7zDnn9mkBqr2Wk7",
  mapsEmbed: "https://maps.google.com/maps?q=RVS+Design+Studio&output=embed",
  heroVideo: "/media/hero.mp4",
};
// index 0 = Sunday ... 6 = Saturday
export const HOURS = ["Closed","10 am – 6 pm","10 am – 6 pm","10 am – 6 pm","10 am – 6 pm","10 am – 6 pm","10 am – 6 pm"];
export const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const CATEGORIES = ["All", "Living Room", "Dining", "Bedroom", "Kitchen", "Bathroom", "Wardrobes"];
// w = landscape (spans two columns on desktop), render = 3D render rather than a photograph.
const G = (f, cat, title, o = {}) => ({ src: `/images/${f}.webp`, cat, title, ...o });
export const GALLERY = [
  G("living-1", "Living Room", "Living room with forest mural", { w: 1 }),
  G("dining-1", "Dining", "Dining under a leather-strap pendant"),
  G("bedroom-1", "Bedroom", "Master bedroom, curved timber wall", { w: 1 }),
  G("kitchen-1", "Kitchen", "Kitchen in plum and stone", { w: 1 }),
  G("bath-1", "Bathroom", "Marble bathroom with steel-framed shower", { w: 1 }),
  G("living-2", "Living Room", "Lounge with woven art panel", { w: 1 }),
  G("wardrobe-1", "Wardrobes", "Dressing area with mirrored wall"),
  G("bedroom-2", "Bedroom", "Master suite with sheer curtains", { w: 1 }),
  G("living-4", "Living Room", "Stone-clad TV wall"),
  G("dining-2-render", "Dining", "Dining and bar wall", { render: 1 }),
  G("bath-2", "Bathroom", "Arched mirror vanity"),
  G("kitchen-2-render", "Kitchen", "Island kitchen", { render: 1 }),
  G("bedroom-3", "Bedroom", "Fluted-panel bedroom", { w: 1 }),
  G("wardrobe-2", "Wardrobes", "Entry storage with stone niche"),
  G("living-3-render", "Living Room", "Double-height living room", { w: 1, render: 1 }),
  G("bath-3", "Bathroom", "Powder room in dark marble"),
];
export const SERVICES = [
  ["Residential interiors", "Full homes, from first sketch to the last cushion."],
  ["Modular kitchens & wardrobes", "Built to your routine, with finishes that last."],
  ["Commercial & office fit-outs", "Spaces that make teams and clients feel at ease."],
  ["3D visualisation", "Walk through your design before anything is built."],
];

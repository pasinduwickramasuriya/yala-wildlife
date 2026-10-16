export interface BlogFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "planning" | "wildlife" | "photography" | "zones" | "conservation";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const BLOG_CATEGORIES = [
  { id: "all", label: "All Blog FAQs" },
  { id: "planning", label: "Planning & Timing" },
  { id: "wildlife", label: "Leopards & Wildlife" },
  { id: "photography", label: "Photography & Gear" },
  { id: "zones", label: "Park Zones & Blocks" },
  { id: "conservation", label: "Ethics & Rules" },
];

export const BLOG_FAQS: BlogFAQItem[] = [
  {
    id: "best-time-of-year-yala-safari-sightings",
    question: "What is the best month of the year to visit Yala National Park for wildlife sightings?",
    answer: "February through July (the dry season) is the optimal time for leopard and sloth bear sightings in Yala, as shrinking forest waterholes draw wildlife out into open scrubland and sandy riverbeds.",
    detailedContent: "May to July is especially renowned for sloth bears gorging on ripe Ceylon ironwood (palu) berries, while October to January offers lush green landscapes and the arrival of thousands of migratory birds from the northern hemisphere.",
    category: "planning",
    categoryLabel: "Planning & Timing",
    links: [
      { label: "Morning Safari Package", href: "/safari-packages/yala-morning-safari" },
      { label: "Full Day Safari Tour", href: "/safari-packages/yala-full-day-safari" },
    ],
  },
  {
    id: "morning-vs-afternoon-safari-comparison",
    question: "Is a morning safari or an afternoon safari better in Yala National Park?",
    answer: "Morning safaris (6:00 AM – 10:00 AM) are best for tracking active leopards and sloth bears before the midday heat peaks, while afternoon safaris (2:30 PM – 6:00 PM) offer superior elephant herd viewings around waterholes and stunning golden-hour photography.",
    detailedContent: "For the absolute highest encounter probability, a 12-hour full-day safari combines both peak activity windows with a relaxing rest break at Patanangala beach during midday heat.",
    category: "planning",
    categoryLabel: "Planning & Timing",
    links: [
      { label: "Compare Safari Packages", href: "/safari-packages" },
      { label: "Afternoon Safari Details", href: "/safari-packages/yala-afternoon-safari" },
    ],
  },
  {
    id: "camera-lenses-gear-wildlife-photography",
    question: "What camera lenses and photography equipment do you recommend for a Yala safari?",
    answer: "A telephoto zoom lens between 100–400mm or 150–600mm on a DSLR or mirrorless body is ideal for capturing distant leopards, perched raptors, and intimate animal expressions from the safari jeep.",
    detailedContent: "We also recommend bringing a beanbag lens support to stabilize heavy glass over jeep railings, a polarizing filter to reduce midday glare over waterholes, a lens cleaning kit for red dry-zone dust, and spare batteries as heat depletes charge rapidly.",
    category: "photography",
    categoryLabel: "Photography & Gear",
    links: [
      { label: "Guest Photo Gallery", href: "/gallery" },
      { label: "About Our Photography Jeeps", href: "/about" },
    ],
  },
  {
    id: "yala-block-1-vs-block-2-5-differences",
    question: "What is the difference between Yala Block 1 (Ruhuna) and Blocks 2, 3, or 5?",
    answer: "Block 1 (Ruhuna) holds the highest documented leopard density in the world and contains the famous rocky outcrops and coastal lagoons, making it the primary sector visited by travelers.",
    detailedContent: "Blocks 2 and 5 offer quieter, less-trafficked wilderness tracks bordered by the Menik River, ideal for travelers wanting to avoid peak jeep congestion and explore remote elephant corridors.",
    category: "zones",
    categoryLabel: "Park Zones & Blocks",
    links: [
      { label: "All Safari Packages", href: "/safari-packages" },
      { label: "Park Ticket Pricing", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "annual-park-closure-month-september-october",
    question: "Does Yala National Park close annually, and which alternate parks can I visit?",
    answer: "Yes, Yala Block 1 typically closes for 4 to 6 weeks between September and October for wildlife habitat regeneration during the height of the dry drought season.",
    detailedContent: "During this scheduled closure, safaris operate seamlessly in Yala Block 5, Lunugamvehera National Park, Udawalawe National Park (famous for hundreds of elephants), or Bundala National Park (UNESCO Ramsar wetland).",
    category: "planning",
    categoryLabel: "Planning & Timing",
    links: [
      { label: "Bundala Wetland Safari", href: "/safari-packages/bundala-bird-watching-safari" },
      { label: "Contact Dispatch Team", href: "/contact" },
    ],
  },
  {
    id: "what-to-wear-and-pack-for-safari",
    question: "What should travelers wear and pack for a safari in Yala?",
    answer: "Wear lightweight, breathable cotton clothing in neutral tones (khaki, tan, beige, or olive green); avoid bright neon colors, camouflage prints (illegal for civilians in Sri Lanka), and pure white which startles wildlife.",
    detailedContent: "Essential items to pack: a wide-brim hat with chin strap, polarized sunglasses, high-SPF sunscreen, non-greasy insect repellent, binoculars (8x42 or 10x42), and your original passport for official gate permit inspection.",
    category: "conservation",
    categoryLabel: "Ethics & Rules",
    links: [
      { label: "Safety Standards & Tips", href: "/about" },
      { label: "Verified Reviews", href: "/reviews" },
    ],
  },
  {
    id: "sloth-bear-palu-fruit-season",
    question: "When is the best time to see Sri Lankan sloth bears in Yala?",
    answer: "The annual palu fruit season between May and July offers the highest likelihood of seeing Sri Lankan sloth bears, as they climb into fruiting palu trees and sleep on open branches intoxicated by the sweet wild berries.",
    detailedContent: "Outside of this season, sloth bears are elusive and primarily nocturnal, but our experienced spotters occasionally catch them crossing sandy trails early in the morning near termite mounds.",
    category: "wildlife",
    categoryLabel: "Leopards & Wildlife",
    links: [
      { label: "Morning Safari Highlights", href: "/safari-packages/yala-morning-safari" },
      { label: "Full Day Safari Tour", href: "/safari-packages/yala-full-day-safari" },
    ],
  },
  {
    id: "birdwatching-migratory-season-species",
    question: "How many bird species inhabit Yala, and when is the best season for birdwatching?",
    answer: "Yala is home to over 215 bird species, including 7 endemics; the premier birdwatching window is November through April when thousands of migratory waterfowl, waders, and raptors escape the northern winter.",
    detailedContent: "Common sightings include painted storks, white-bellied sea eagles, crested serpent eagles, black-necked storks, and Malabar pied hornbills, while adjacent Bundala National Park hosts greater flamingos.",
    category: "wildlife",
    categoryLabel: "Leopards & Wildlife",
    links: [
      { label: "Bundala Bird Watching Tour", href: "/safari-packages/bundala-bird-watching-safari" },
      { label: "Photo Gallery", href: "/gallery" },
    ],
  },
  {
    id: "ethical-safari-practices-respecting-wildlife",
    question: "What ethical safari practices should visitors follow inside Yala National Park?",
    answer: "Visitors must remain seated inside the jeep at all times, maintain whisper-quiet voices at sightings, never feed wild animals, never use camera drones (strictly prohibited by Sri Lankan law), and carry all plastic waste back out.",
    detailedContent: "Our drivers adhere strictly to speed limits below 25 km/h, turn off engines when viewing big cats, and never corner or block an animal's natural retreat path toward water or dense brush.",
    category: "conservation",
    categoryLabel: "Ethics & Rules",
    links: [
      { label: "Our Conservation Ethics", href: "/about" },
      { label: "Wildlife Blog Home", href: "/blog" },
    ],
  },
  {
    id: "how-frequently-is-yala-wildlife-blog-updated",
    question: "How frequently do your naturalists publish new wildlife reports and field updates?",
    answer: "Our naturalist tracking team publishes new field reports, animal behavior observations, seasonal wildlife forecasts, and photography tutorials 2 to 4 times per month based on fresh sightings in Yala.",
    detailedContent: "You can bookmark our blog or subscribe via our WhatsApp updates channel (+94 778 158 004) to stay informed on recent leopard cub births, waterhole migrations, and park regulation updates.",
    category: "photography",
    categoryLabel: "Photography & Gear",
    links: [
      { label: "WhatsApp Updates", href: "https://wa.me/94778158004" },
      { label: "Contact Team", href: "/contact" },
    ],
  },
];

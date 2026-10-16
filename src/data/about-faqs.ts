export interface AboutFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "company" | "naturalists" | "ethics" | "fleet" | "experience";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const ABOUT_CATEGORIES = [
  { id: "all", label: "All About Us FAQs" },
  { id: "company", label: "Company & Licensing" },
  { id: "naturalists", label: "Naturalists & Guides" },
  { id: "ethics", label: "Wildlife Ethics" },
  { id: "fleet", label: "Fleet & Safety" },
  { id: "experience", label: "Guest Standards" },
];

export const ABOUT_FAQS: AboutFAQItem[] = [
  {
    id: "yala-wildlife-company-background-founding",
    question: "Who is Yala Wildlife Safari and how long have you been operating?",
    answer: "Yala Wildlife Safari is a premier Sri Lankan wildlife safari and private tour operator established in 2015, operating for over a decade out of our Tissamaharama base with a 4.9/5 rating across 300+ verified traveler reviews.",
    detailedContent: "We are officially registered with the Sri Lanka Tourism Development Authority (SLTDA) and work in close coordination with the Department of Wildlife Conservation (DWC) to provide ethical, luxury safari expeditions and island-wide private chauffeur tours.",
    category: "company",
    categoryLabel: "Company & Licensing",
    links: [
      { label: "Verified Reviews", href: "/reviews" },
      { label: "Our Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "dwc-sltda-licensing-certifications",
    question: "Are your safari drivers and naturalist guides officially licensed?",
    answer: "Yes, 100% of our safari drivers and naturalist guides hold valid official licenses from the Sri Lanka Tourism Development Authority (SLTDA) and pass mandatory Department of Wildlife Conservation (DWC) national park regulations training.",
    detailedContent: "Our lead naturalists possess between 5 and 15 years of hands-on tracking experience in Yala Blocks 1, 2, and 5, equipped with deep knowledge of leopard territory mapping, elephant matriarch behavior, and avian migration cycles.",
    category: "naturalists",
    categoryLabel: "Naturalists & Guides",
    links: [
      { label: "Meet the Team", href: "/about" },
      { label: "Morning Leopard Safari", href: "/safari-packages/yala-morning-safari" },
    ],
  },
  {
    id: "ethical-wildlife-viewing-regulations",
    question: "What ethical guidelines do you follow when tracking leopards and wild animals in Yala?",
    answer: "We adhere strictly to zero-harassment wildlife ethics: maintaining a minimum 20-meter safety perimeter from leopards and elephants, turning off engines at sightings to minimize noise pollution, and never crowding animals at waterholes.",
    detailedContent: "We strictly forbid off-road driving which destroys sensitive dry-zone scrub habitats, enforce speed limits below 25 km/h inside park boundaries, and actively report unauthorized drone use or park rule violations to DWC rangers.",
    category: "ethics",
    categoryLabel: "Wildlife Ethics",
    links: [
      { label: "Conservation Commitment", href: "/about" },
      { label: "Wildlife Blog", href: "/blog" },
    ],
  },
  {
    id: "safari-vehicle-fleet-standards",
    question: "What makes your safari jeeps superior to standard rental jeeps in Yala?",
    answer: "We exclusively operate purpose-modified Japanese Toyota Hilux and Land Cruiser 4x4 safari jeeps featuring three-tiered forward-facing cushioned seating, heavy-duty suspension, whisper-quiet engines, and unobstructed 360-degree photography frames.",
    detailedContent: "Unlike low-cost operators using cramped Indian Mahindra flat-bed trucks, our vehicles undergo rigorous bi-weekly mechanical safety checks, carry comprehensive commercial passenger insurance, and feature roll-down storm curtains for rain protection.",
    category: "fleet",
    categoryLabel: "Fleet & Safety",
    links: [
      { label: "View Fleet & Transport", href: "/pickup-dropoff" },
      { label: "Book Safari Experience", href: "/safari-packages" },
    ],
  },
  {
    id: "leopard-sighting-success-rate-guarantee",
    question: "Do you guarantee leopard sightings on your safaris?",
    answer: "Because Yala National Park is an unfenced 978 km² wild nature reserve, no operator can legally guarantee wild animal sightings; however, our trackers achieve an industry-leading ~85% sighting success rate on morning and full-day drives.",
    detailedContent: "Our spotters rely on real-time acoustic clues—such as spotted deer and gray langur alarm barks—fresh pugmark analysis, and ethical radio coordination across our fleet to position your jeep at the best vantage points.",
    category: "experience",
    categoryLabel: "Guest Standards",
    links: [
      { label: "Full Day Safari Tour", href: "/safari-packages/yala-full-day-safari" },
      { label: "Customer Sightings", href: "/reviews" },
    ],
  },
  {
    id: "community-impact-and-local-employment",
    question: "How does Yala Wildlife Safari support local communities and conservation?",
    answer: "Over 90% of our safari drivers, spotters, and operational staff are native residents of Tissamaharama, Kirinda, and Kataragama, ensuring tour revenue directly sustains local families and rural conservation economies.",
    detailedContent: "A portion of every booking contributes to local school nature clubs, anti-poaching awareness campaigns, and plastic clean-up initiatives along the borders of Yala and Bundala National Parks.",
    category: "ethics",
    categoryLabel: "Wildlife Ethics",
    links: [
      { label: "About Our Mission", href: "/about" },
      { label: "Talk to Us", href: "/contact" },
    ],
  },
  {
    id: "photography-and-birdwatching-support",
    question: "Do you cater specifically to wildlife photographers and birdwatchers?",
    answer: "Yes, our naturalist guides are specifically trained in wildlife photography requirements—understanding prime morning and evening lighting angles, optimal lens positioning (200mm–600mm), and vehicle motor stabilization.",
    detailedContent: "Our jeeps provide beanbags and clamp mounts for heavy telephoto lenses upon request, and we offer specialized birding departures to Bundala National Park (a UNESCO Ramsar Wetland) for waterfowl and raptor enthusiasts.",
    category: "experience",
    categoryLabel: "Guest Standards",
    links: [
      { label: "Bundala Wetland Safari", href: "/safari-packages/bundala-bird-watching-safari" },
      { label: "Safari Photo Gallery", href: "/gallery" },
    ],
  },
  {
    id: "safety-protocols-and-passenger-insurance",
    question: "What passenger safety and emergency protocols do you have in place?",
    answer: "Every safari vehicle is equipped with a comprehensive first-aid kit, cellular communication gear, heavy-duty recovery tow equipment, and commercial passenger liability insurance covering all seated guests.",
    detailedContent: "Our drivers are trained in basic first aid, emergency terrain extraction, and defensive driving around wild bull elephants in musth, ensuring complete peace of mind for families, solo travelers, and seniors.",
    category: "fleet",
    categoryLabel: "Fleet & Safety",
    links: [
      { label: "Safety Standards", href: "/about" },
      { label: "Contact Dispatch Desk", href: "/contact" },
    ],
  },
  {
    id: "why-choose-yala-wildlife-vs-independent-drivers",
    question: "Why should travelers book with Yala Wildlife Safari instead of hiring a random driver at the park gate?",
    answer: "Booking with us guarantees pre-inspected Toyota Hilux vehicles, pre-cleared park gate permits that bypass 45-minute morning ticket queues, dedicated customer support, and guaranteed English-fluent naturalists rather than non-English speaking utility drivers.",
    detailedContent: "Independent gate touts frequently overcharge, lack passenger insurance, cut game drives short to save fuel, and drive aggressively. With us, your itinerary, price, and driver standards are locked in transparently before arrival.",
    category: "company",
    categoryLabel: "Company & Licensing",
    links: [
      { label: "Browse Packages", href: "/safari-packages" },
      { label: "Guest Testimonials", href: "/reviews" },
    ],
  },
  {
    id: "direct-customer-support-dispatch",
    question: "Where is your operational base located and how can we contact you?",
    answer: "Our headquarters and vehicle staging hub is located on Tissamaharama Road, Tissamaharama (Postal Code 82600), supported by our 24/7 WhatsApp dispatch desk (+94 778 158 004) and email (info@yalawildlife.com).",
    detailedContent: "Our dispatch team monitors road conditions, park gate queue volumes, and weather forecasts daily from 4:30 AM to 10:00 PM, providing instant support for last-minute bookings, cancellations, or custom route adjustments.",
    category: "company",
    categoryLabel: "Company & Licensing",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Island-Wide Transfers", href: "/pickup-dropoff" },
    ],
  },
];

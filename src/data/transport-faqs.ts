export interface TransportFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "airport" | "routes" | "vehicles" | "pricing" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const TRANSPORT_CATEGORIES = [
  { id: "all", label: "All Transport Questions" },
  { id: "airport", label: "Airport Transfers" },
  { id: "routes", label: "Popular Routes & Times" },
  { id: "vehicles", label: "Vehicles & Luggage" },
  { id: "pricing", label: "Tolls & Fixed Rates" },
  { id: "booking", label: "Chauffeurs & Booking" },
];

export const TRANSPORT_FAQS: TransportFAQItem[] = [
  {
    id: "colombo-airport-bia-to-yala-taxi-cost",
    question: "How much is a private taxi transfer from Colombo Airport (BIA) to Yala National Park?",
    answer: "A private air-conditioned transfer from Bandaranaike International Airport (CMB / BIA) to Yala or Tissamaharama costs between 32,000 and 38,000 LKR (~$105–$125 USD) for a modern sedan car, and 45,000 to 52,000 LKR (~$145–$165 USD) for a Toyota KDH luxury van.",
    detailedContent: "The journey takes approximately 4.5 hours via the Southern Expressway (E01/E02). All quoted transfer rates include expressway toll fees, fuel, vehicle licensing, and an experienced English-speaking professional chauffeur with zero hidden surcharges.",
    category: "airport",
    categoryLabel: "Airport Transfers",
    links: [
      { label: "Book Airport Taxi", href: "/pickup-dropoff" },
      { label: "View Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "ella-to-yala-travel-time-taxi",
    question: "How long does a taxi take from Ella to Yala, and what vehicle is used?",
    answer: "A private taxi from Ella to Yala or Tissamaharama takes approximately 2 to 2.5 hours covering 95 km through Wellawaya, operated in comfortable air-conditioned sedans (Toyota Prius / Axio) or Toyota KDH high-roof vans.",
    detailedContent: "We frequently organize early morning 3:30 AM transfers departing Ella so travelers arrive directly in Tissamaharama in time to board their 6:00 AM morning leopard safari without needing an extra hotel night.",
    category: "routes",
    categoryLabel: "Popular Routes & Times",
    links: [
      { label: "Reserve Ella Transfer", href: "/pickup-dropoff" },
      { label: "Morning Safari Details", href: "/safari-packages" },
    ],
  },
  {
    id: "galle-mirissa-tangalle-to-yala-transfer",
    question: "Can I book a transfer from Galle, Mirissa, Weligama, or Tangalle to Yala?",
    answer: "Yes, we provide door-to-door private transfers along the entire southern coastline. Travel time is 1.5 hours from Tangalle, 2 hours from Mirissa/Weligama, and 2.5 hours from Galle via the Southern Expressway.",
    detailedContent: "Our driver meets you directly in your resort lobby, assists with all luggage, and drops you off at your Yala hotel or directly at the safari staging gate.",
    category: "routes",
    categoryLabel: "Popular Routes & Times",
    links: [
      { label: "Get Coastal Quote", href: "/pickup-dropoff" },
      { label: "WhatsApp Dispatch Desk", href: "/contact" },
    ],
  },
  {
    id: "mattala-airport-hri-transfer-yala",
    question: "Do you provide airport taxi transfers from Mattala Rajapaksa International Airport (HRI)?",
    answer: "Yes, Mattala Airport (HRI) is situated only 35 minutes (38 km) from our Tissamaharama safari hub, and private transfers cost approximately 8,000 to 12,000 LKR (~$25–$40 USD).",
    detailedContent: "Our chauffeur tracks your flight arrival time in real-time and will greet you inside the arrivals terminal with a personalized name-board.",
    category: "airport",
    categoryLabel: "Airport Transfers",
    links: [
      { label: "Book Mattala Taxi", href: "/pickup-dropoff" },
      { label: "Check Safari Hours", href: "/safari-packages" },
    ],
  },
  {
    id: "kdh-van-capacity-and-luggage-space",
    question: "What vehicle types are available for groups, and how much luggage can they accommodate?",
    answer: "We offer modern 4-passenger sedans (Toyota Prius / Axio) fitting 2–3 large suitcases, and 9-to-14 passenger Toyota KDH High-Roof luxury vans equipped with dedicated rear baggage compartments fitting 8–10 large bags.",
    detailedContent: "All passenger vans feature dual air conditioning, reclining ergonomic seats, onboard USB charging ports, and free child booster seats upon advance request.",
    category: "vehicles",
    categoryLabel: "Vehicles & Luggage",
    links: [
      { label: "Van Hire Details", href: "/pickup-dropoff" },
      { label: "Multi-Day Tour Options", href: "/tours" },
    ],
  },
  {
    id: "expressway-tolls-fuel-hidden-fees",
    question: "Are highway toll charges, fuel, and parking fees included in the taxi quote?",
    answer: "Yes, 100% of Southern Expressway toll charges, fuel costs, parking fees, driver accommodations, and driver meals are included in your upfront quoted price.",
    detailedContent: "Unlike unregulated street taxis, our fares are completely fixed with zero surprise charges upon arrival. You can pay online via credit card or in cash directly to your chauffeur in LKR, USD, EUR, or GBP.",
    category: "pricing",
    categoryLabel: "Tolls & Fixed Rates",
    links: [
      { label: "Book Guaranteed Ride", href: "/pickup-dropoff" },
      { label: "Contact Dispatch Desk", href: "/contact" },
    ],
  },
  {
    id: "licensed-chauffeurs-and-safety",
    question: "Who are your drivers, and are they licensed and background-checked?",
    answer: "Every chauffeur on our team is an SLTDA-registered professional with a clean commercial driving record, police background clearance, and a minimum of 5 years of long-distance tourist transport experience.",
    detailedContent: "Our chauffeurs speak fluent English, practice defensive driving, and are trained to offer helpful regional guidance and recommended meal/refreshment stops along the route.",
    category: "booking",
    categoryLabel: "Chauffeurs & Booking",
    links: [
      { label: "About Our Drivers", href: "/about" },
      { label: "Customer Reviews", href: "/reviews" },
    ],
  },
  {
    id: "sightseeing-stops-along-route",
    question: "Can we make sightseeing stops along the way (such as Ravana Falls or Buduruwagala)?",
    answer: "Yes, custom scenic stops along your transfer route—such as Ravana Falls when traveling from Ella or the ancient rock carvings at Buduruwagala—are complimentary and can be arranged with your driver.",
    detailedContent: "Simply let your chauffeur or our dispatch coordinator know your preferred stops when booking, and we will schedule your departure time accordingly with zero extra detour fees.",
    category: "routes",
    categoryLabel: "Popular Routes & Times",
    links: [
      { label: "Plan Custom Transfer", href: "/pickup-dropoff" },
      { label: "Multi-Day Tour Packages", href: "/tours" },
    ],
  },
  {
    id: "transfer-cancellation-and-flight-delay-policy",
    question: "What is your cancellation and flight delay policy for private taxi bookings?",
    answer: "We provide a 100% full refund for transfer cancellations made at least 24 hours prior to your scheduled pickup time.",
    detailedContent: "If your flight is delayed or rescheduled, date and time adjustments are completely free of charge. Our team monitors international flight arrivals at BIA and HRI in real-time to adjust pickup times automatically.",
    category: "booking",
    categoryLabel: "Chauffeurs & Booking",
    links: [
      { label: "Terms of Service", href: "/legal" },
      { label: "WhatsApp Support Desk", href: "/contact" },
    ],
  },
];

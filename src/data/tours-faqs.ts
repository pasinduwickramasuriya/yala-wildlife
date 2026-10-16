export interface TourFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "itineraries" | "chauffeur" | "customization" | "pricing" | "wildlife";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const TOURS_CATEGORIES = [
  { id: "all", label: "All Tour FAQs" },
  { id: "itineraries", label: "Itineraries & Duration" },
  { id: "chauffeur", label: "Chauffeur & Vehicles" },
  { id: "customization", label: "Tailor-Made Routes" },
  { id: "pricing", label: "Pricing & Inclusions" },
  { id: "wildlife", label: "Yala Safari Integration" },
];

export const TOURS_FAQS: TourFAQItem[] = [
  {
    id: "sri-lanka-tour-duration-recommendation",
    question: "How many days are recommended for a comprehensive tour of Sri Lanka?",
    answer: "For a well-paced first visit, an 8-day to 10-day tour is the sweet spot to experience Sri Lanka's Cultural Triangle (Sigiriya & Dambulla), central tea hill country (Kandy & Ella), and a Yala National Park wildlife safari without long daily drives.",
    detailedContent: "Travelers with limited vacation time can choose our fast-paced 5-Day Escape, while those wanting to include southern surf beaches (Weligama, Bentota), colonial Galle Fort, and relaxed two-night hotel stays typically book our 12-Day Grand Discovery or 14-Day Ultimate Journey.",
    category: "itineraries",
    categoryLabel: "Itineraries & Duration",
    links: [
      { label: "View 8-Day Tour", href: "/tours" },
      { label: "View 14-Day Journey", href: "/tours" },
    ],
  },
  {
    id: "private-driver-guide-cost-inclusions",
    question: "What is included when booking a private chauffeur-guide tour in Sri Lanka?",
    answer: "All our tour packages include an exclusive, dedicated air-conditioned vehicle (sedan or Toyota KDH luxury van), fuel, expressway toll fees, parking permits, full passenger insurance, and an experienced English-speaking SLTDA-licensed tourist chauffeur-guide.",
    detailedContent: "Your chauffeur's daily meals and overnight accommodation are 100% arranged and paid by us—travelers never incur unexpected driver lodging surcharges or incidental food costs throughout the entire trip.",
    category: "chauffeur",
    categoryLabel: "Chauffeur & Vehicles",
    links: [
      { label: "Check Vehicles & Fleet", href: "/pickup-dropoff" },
      { label: "Talk to Tour Coordinator", href: "/contact" },
    ],
  },
  {
    id: "custom-sri-lanka-tour-itinerary-planning",
    question: "Can we customize or modify any of the published tour itineraries?",
    answer: "Yes, 100% of our Sri Lanka multi-day itineraries can be customized to match your exact flight arrival/departure times, personal interests, preferred pace, hotel star-ratings, and budget at zero customization fees.",
    detailedContent: "You can add extra relaxation days in Ella or Mirissa, swap cultural monuments, request scenic first-class blue train tickets from Kandy to Ella, or incorporate adventure excursions such as whale watching in Mirissa or whitewater rafting in Kitulgala.",
    category: "customization",
    categoryLabel: "Tailor-Made Routes",
    links: [
      { label: "Request Custom Route", href: "/contact" },
      { label: "Browse Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "sri-lanka-tour-package-prices-per-person",
    question: "How much do private Sri Lanka multi-day tour packages cost?",
    answer: "Private tour packages start from $450 USD per person for our 5-day tour, $750 USD per person for the 8-day tour, and $1,100 to $1,350 USD per person for 12 to 14-day comprehensive round-trips based on twin-share occupancy.",
    detailedContent: "Exact rates depend on group size, vehicle class (luxury sedan vs high-roof van), travel season, and whether boutique 4-star/5-star accommodation is bundled with private transport and guided excursions. All quotes are transparent with zero hidden fees.",
    category: "pricing",
    categoryLabel: "Pricing & Inclusions",
    links: [
      { label: "Explore Package Rates", href: "/tours" },
      { label: "Instant WhatsApp Quote", href: "/contact" },
    ],
  },
  {
    id: "how-safari-integrated-into-tours",
    question: "How is the Yala safari integrated into multi-day tour packages?",
    answer: "Our multi-day tours seamlessly coordinate your arrival in Yala/Tissamaharama with a dedicated private 4x4 modified safari jeep (Toyota Hilux or Land Cruiser), official DWC park entrance tickets, and an expert wildlife spotter for the prime early morning (6:00 AM) or afternoon (2:30 PM) game drives.",
    detailedContent: "Your private chauffeur takes care of all hotel luggage transfers, check-ins, and direct drop-offs at the safari staging gate, completely eliminating transit delays or coordination stress between city legs.",
    category: "wildlife",
    categoryLabel: "Yala Safari Integration",
    links: [
      { label: "Yala Safari Packages", href: "/safari-packages" },
      { label: "Leopard Safari Highlights", href: "/safari-packages/yala-morning-safari" },
    ],
  },
  {
    id: "kandy-to-ella-scenic-train-tickets",
    question: "Do your tour packages include tickets for the famous Kandy to Ella scenic train ride?",
    answer: "Yes, when booking any multi-day itinerary passing through the central highlands, our operations team coordinates reserved seating (First Class AC or Second Class observation carriage) on the iconic blue train from Kandy/Nanu Oya to Ella.",
    detailedContent: "Your chauffeur securely handles your main luggage in the tour vehicle, drives ahead to the destination station, and greets you right on the platform upon arrival in Ella to transfer you smoothly to your mountain resort.",
    category: "itineraries",
    categoryLabel: "Itineraries & Duration",
    links: [
      { label: "View Highland Routes", href: "/tours" },
      { label: "Contact Reservations", href: "/contact" },
    ],
  },
  {
    id: "best-time-of-year-for-sri-lanka-round-tour",
    question: "What is the best time of year to take a multi-day tour around Sri Lanka?",
    answer: "Sri Lanka is a year-round destination thanks to its dual monsoon climate; November through April provides ideal dry weather for the South Coast, Central Highlands (Ella, Kandy), and Yala leopard safaris, while May through October offers sunny conditions in the Cultural Triangle and East Coast.",
    detailedContent: "Because all our private tours are 100% custom-routed, our local destination planners optimize your driving itinerary around the exact month of your trip to ensure maximum sunshine, calm seas, and top wildlife viewing.",
    category: "itineraries",
    categoryLabel: "Itineraries & Duration",
    links: [
      { label: "Plan Seasonal Route", href: "/contact" },
      { label: "Browse All Tours", href: "/tours" },
    ],
  },
  {
    id: "family-friendly-senior-accessible-tours",
    question: "Are the tour packages suitable for families with young children or senior travelers?",
    answer: "Yes, our private tours are ideal for multigenerational families and seniors because the schedule is completely flexible—allowing you to start later in the morning, schedule regular refreshment stops, and adjust walking intensities at historical landmarks.",
    detailedContent: "We supply certified ISOFIX baby and child safety booster seats upon request at zero additional cost, and our drivers provide respectful assistance to seniors for comfortable sightseeing, photography viewpoints, and temple access.",
    category: "customization",
    categoryLabel: "Tailor-Made Routes",
    links: [
      { label: "Ask Tour Coordinator", href: "/contact" },
      { label: "Read Customer Reviews", href: "/reviews" },
    ],
  },
  {
    id: "payment-terms-cancellation-policy",
    question: "What are the deposit requirements and cancellation policies for multi-day tours?",
    answer: "We require only a small 10% to 20% advance booking deposit to secure your private vehicle, licensed chauffeur reservation, and park permits, with the remaining balance conveniently payable upon arrival in Sri Lanka via cash (USD, EUR, GBP, LKR) or credit card.",
    detailedContent: "Cancellations made up to 14 days before your scheduled tour arrival receive a 100% full refund with zero cancellation penalties, giving you total peace of mind when planning international flights.",
    category: "pricing",
    categoryLabel: "Pricing & Inclusions",
    links: [
      { label: "Reserve Tour Package", href: "/tours" },
      { label: "WhatsApp Support Desk", href: "/contact" },
    ],
  },
  {
    id: "tipping-chauffeur-guide-etiquette",
    question: "What is the customary tipping etiquette for private drivers and safari trackers in Sri Lanka?",
    answer: "While tipping is discretionary and not mandatory, an appreciative gratuity for an outstanding private chauffeur-guide in Sri Lanka typically averages 3,000 to 5,000 LKR (~$10–$15 USD) per day from your party, and 2,000 to 3,000 LKR for your Yala safari tracker.",
    detailedContent: "All our drivers receive fair living compensation, and tips serve as a direct personal gesture acknowledging safe driving, deep regional expertise, punctuality, and attentive warm hospitality.",
    category: "chauffeur",
    categoryLabel: "Chauffeur & Vehicles",
    links: [
      { label: "Customer Feedback & Reviews", href: "/reviews" },
      { label: "Tour Packages Overview", href: "/tours" },
    ],
  },
];

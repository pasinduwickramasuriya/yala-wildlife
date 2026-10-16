export interface PackagesFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "pricing" | "formats" | "jeeps" | "schedules" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const PACKAGES_CATEGORIES = [
  { id: "all", label: "All Package Questions" },
  { id: "pricing", label: "Pricing & Inclusions" },
  { id: "formats", label: "Shared vs Private" },
  { id: "jeeps", label: "Toyota Hilux Fleet" },
  { id: "schedules", label: "Timings & Durations" },
  { id: "booking", label: "Booking & Refunds" },
];

export const PACKAGES_FAQS: PackagesFAQItem[] = [
  {
    id: "half-day-vs-full-day-safari-difference",
    question: "What is the difference between a Half-Day and a Full-Day Yala safari package?",
    answer: "A Half-Day safari lasts 4 to 5 hours (Morning 6:00 AM – 10:00 AM or Afternoon 2:30 PM – 6:30 PM) focusing on Block 1 Ruhuna, whereas a Full-Day Expedition spans 12 hours (5:00 AM – 6:00 PM) covering deep wilderness trails across Blocks 1, 2, and river valleys.",
    detailedContent: "Morning safaris capture peak predator hunting activity at dawn, while afternoon drives offer stunning golden-hour photography and elephant gatherings at lakes. Full-day tours include a mandatory midday riverside rest break at Patanangala Beach or the Manik Ganga river crossing.",
    category: "formats",
    categoryLabel: "Shared vs Private",
    links: [
      { label: "View Safari Packages", href: "/safari-packages" },
      { label: "Ticket Cost Calculator", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "safari-package-cost-per-person",
    question: "How much does each Yala safari package cost per person?",
    answer: "Our all-inclusive Half-Day Shared Safari is fixed at 17,000 LKR per person (~$55 USD). All-inclusive Private Safaris start from 31,870 LKR (~$105 USD) for 1 guest up to 88,680 LKR (~$285 USD) for a full private group of 7 passengers.",
    detailedContent: "Standalone jeep hire without park admission is 17,000 LKR per jeep (half-day) or 34,000 LKR per jeep (full-day). Standalone government DWC tickets are charged at the gate ($25 USD per foreign adult, $15 USD per child, plus vehicle fee and 18% VAT). Our all-inclusive packages include all government fees upfront with zero hidden charges.",
    category: "pricing",
    categoryLabel: "Pricing & Inclusions",
    links: [
      { label: "Compare Package Rates", href: "/safari-packages" },
      { label: "DWC Ticket Calculator", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "safari-package-inclusions-breakdown",
    question: "What is included in the all-inclusive safari package price?",
    answer: "Every all-inclusive package includes official DWC entry tickets, 18% VAT, vehicle road permits, a customized Toyota Hilux 4x4 jeep, an expert driver/tracker, complimentary hotel pickup in Tissamaharama/Kirinda/Kataragama, chilled mineral water, and packed picnic breakfast (morning tours).",
    detailedContent: "Binoculars are provided on board upon request. There are no additional fuel surcharges, road taxes, or mandatory booking fees. Independent tracker gratuities/tips are discretionary.",
    category: "pricing",
    categoryLabel: "Pricing & Inclusions",
    links: [
      { label: "Book All-Inclusive Package", href: "/safari-packages" },
      { label: "Free Pickup Locations", href: "/pickup-dropoff" },
    ],
  },
  {
    id: "shared-safari-seat-booking-solo-couples",
    question: "How does the Shared Safari package work for solo travelers and couples?",
    answer: "Shared safaris allow solo travelers and couples to book individual seats (17,000 LKR per person) in a luxury Toyota Hilux jeep, sharing the vehicle cost with like-minded nature lovers while maintaining comfort.",
    detailedContent: "We enforce a strict maximum capacity of 6 passengers per shared vehicle so that every guest enjoys an unobstructed window vantage point and ample space for telephoto camera lenses. We never pack jeeps to overcrowding.",
    category: "formats",
    categoryLabel: "Shared vs Private",
    links: [
      { label: "Book Shared Seat", href: "/safari-packages" },
      { label: "Guest Reviews", href: "/reviews" },
    ],
  },
  {
    id: "toyota-hilux-vs-mahindra-jeeps",
    question: "Why does Yala Wildlife strictly use Toyota Hilux jeeps instead of Mahindra utility vehicles?",
    answer: "Our entire fleet consists of customized Japanese Toyota Hilux 4x4 jeeps featuring three-tiered forward-facing cushioned seating, quiet common-rail diesel engines that avoid startling wildlife, and heavy-duty coil suspension for a smooth ride.",
    detailedContent: "Many budget roadside operators use standard leaf-sprung Mahindra utility trucks with flat benches that produce severe passenger fatigue and heavy exhaust noise. Our modified Hilux jeeps feature reinforced roll cages, waterproof roll-down storm curtains, and 360-degree photography clearance.",
    category: "jeeps",
    categoryLabel: "Toyota Hilux Fleet",
    links: [
      { label: "Our Safari Fleet", href: "/about" },
      { label: "Verified Reviews", href: "/reviews" },
    ],
  },
  {
    id: "safari-package-pickup-times-schedule",
    question: "What time does each safari package start, and when are hotel pickups?",
    answer: "Morning safaris begin with hotel pickups between 4:45 AM and 5:15 AM to enter park gates right at 6:00 AM, finishing around 10:00 AM to 11:30 AM. Afternoon safaris depart at 2:00 PM to 2:30 PM and finish at 6:30 PM.",
    detailedContent: "Full-day expeditions depart at 5:00 AM and return around 6:00 PM. Gate queue clearance is fastest during early morning departures, which is why our drivers position your jeep at the Palatupana gate before opening time.",
    category: "schedules",
    categoryLabel: "Timings & Durations",
    links: [
      { label: "Morning Safari Details", href: "/safari-packages" },
      { label: "Intercity Hotel Transfers", href: "/pickup-dropoff" },
    ],
  },
  {
    id: "safari-package-cancellation-refund-policy",
    question: "What is your cancellation and rescheduling policy for pre-booked safari packages?",
    answer: "Cancellations submitted at least 48 hours prior to your scheduled safari departure receive a 100% full refund. Cancellations made between 24 and 48 hours receive a 50% refund.",
    detailedContent: "Date rescheduling is completely free of charge up to 24 hours prior to departure, subject to jeep availability. If the Department of Wildlife Conservation officially closes the park due to extreme flooding, guests receive an immediate 100% refund or free transfer to Bundala or Lunugamvehera National Parks.",
    category: "booking",
    categoryLabel: "Booking & Refunds",
    links: [
      { label: "Terms of Service", href: "/legal" },
      { label: "WhatsApp Help Desk", href: "/contact" },
    ],
  },
  {
    id: "private-photography-birding-guide-request",
    question: "Can we request a private naturalist guide for specialized bird watching or leopard photography?",
    answer: "Yes, we provide dedicated private naturalist guides who specialize in ornithology (over 215 bird species) or professional wildlife photography upon request with any private safari package.",
    detailedContent: "Our photography-trained guides understand lighting angles, animal behavior anticipation, and vehicle positioning so you can capture sharp, eye-level photos of leopards, crested serpent eagles, and Asian elephants without disturbance.",
    category: "jeeps",
    categoryLabel: "Toyota Hilux Fleet",
    links: [
      { label: "Browse Packages", href: "/safari-packages" },
      { label: "Wildlife Blog", href: "/blog" },
    ],
  },
  {
    id: "dwc-tickets-gate-queue-bypass",
    question: "Are park entrance tickets included, or do we have to pay at the gate counter?",
    answer: "If you select an 'All-Inclusive' package, official DWC entry tickets are 100% included and pre-arranged, allowing you to bypass the long gate counter ticket queues entirely.",
    detailedContent: "If you choose 'Jeep Hire Only', you must pay government admission fees directly at the Palatupana or Katagamuwa ticket counter ($25 USD per foreign adult, $15 USD per child 6–12, plus vehicle license and 18% VAT) or pre-calculate them using our online ticket calculator.",
    category: "pricing",
    categoryLabel: "Pricing & Inclusions",
    links: [
      { label: "DWC Ticket Calculator", href: "/yala-national-park-tickets" },
      { label: "All-Inclusive Packages", href: "/safari-packages" },
    ],
  },
];

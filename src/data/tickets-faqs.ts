export interface TicketFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "pricing" | "calculator" | "gate" | "jeep" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const TICKETS_CATEGORIES = [
  { id: "all", label: "All Ticket FAQs" },
  { id: "pricing", label: "Foreign & SAARC Rates" },
  { id: "calculator", label: "VAT & Fees Formula" },
  { id: "gate", label: "Gate Clearance & Bypass" },
  { id: "jeep", label: "Jeep vs. Permit Costs" },
  { id: "booking", label: "Passports & Rules" },
];

export const TICKETS_FAQS: TicketFAQItem[] = [
  {
    id: "how-to-buy-yala-tickets-online",
    question: "How do I buy Yala National Park entry permits online?",
    answer: "You can calculate and reserve official Department of Wildlife Conservation (DWC) entry permits online using our dynamic ticket calculator; input your guest count, date, and preferred gate to have licensed agents secure your digital permits before arrival.",
    detailedContent: "Pre-booking your tickets online eliminates the stressful 30- to 45-minute early morning ticket queue at Palatupana Gate, allowing your safari jeep to pass directly through the entry barrier right at 6:00 AM gate opening.",
    category: "gate",
    categoryLabel: "Gate Clearance & Bypass",
    links: [
      { label: "Calculate Permits Now", href: "#ticket-calculator" },
      { label: "View Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "yala-national-park-ticket-price-foreigners",
    question: "What is the official Yala National Park entrance ticket price for foreign visitors?",
    answer: "Foreign (Non-SAARC) admission is $25 USD for adults and $15 USD for children aged 6 to 12 years (plus mandatory 18% VAT and unified vehicle/service charges), while infants under 6 enter completely free.",
    detailedContent: "Our portal converts foreign USD admission rates to Sri Lankan Rupees (LKR) at live central bank exchange rates, ensuring complete transparency with zero hidden currency markups.",
    category: "pricing",
    categoryLabel: "Foreign & SAARC Rates",
    links: [
      { label: "Foreign Fee Breakdown", href: "#ticket-calculator" },
      { label: "Full Day Safari Tour", href: "/safari-packages/yala-full-day-safari" },
    ],
  },
  {
    id: "saarc-countries-discounted-ticket-rates",
    question: "Is there a discounted entrance fee for SAARC nationals (India, Pakistan, Bangladesh, etc.)?",
    answer: "Yes, visitors holding passports from SAARC member nations pay a discounted government rate of $20 USD for adults and $10 USD for children (6–12 years) plus VAT.",
    detailedContent: "Valid original passports matching the names registered on your digital permit must be presented at the gate checkpoint to validate SAARC concessionary pricing.",
    category: "pricing",
    categoryLabel: "Foreign & SAARC Rates",
    links: [
      { label: "SAARC Rate Calculator", href: "#ticket-calculator" },
      { label: "WhatsApp Support Desk", href: "https://wa.me/94778158004" },
    ],
  },
  {
    id: "is-safari-jeep-included-in-ticket-price",
    question: "Is the private 4x4 safari jeep rental cost included in the ticket price?",
    answer: "No, the ticket fee covers government park entry permits, road maintenance taxes, and VAT only; private 4x4 safari jeep hire (Toyota Hilux) and driver services are arranged separately.",
    detailedContent: "You can book our all-inclusive safari packages which bundle the luxury jeep, fuel, licensed naturalist driver, and official park entry permits into one seamless flat rate.",
    category: "jeep",
    categoryLabel: "Jeep vs. Permit Costs",
    links: [
      { label: "Explore All-Inclusive Packages", href: "/safari-packages" },
      { label: "Morning Leopard Safari", href: "/safari-packages/yala-morning-safari" },
    ],
  },
  {
    id: "yala-ticket-vat-and-service-fee-breakdown",
    question: "What is the 18% VAT and government service fee formula applied to tickets?",
    answer: "All DWC national park admission fees are legally subject to an 18% Value Added Tax (VAT), plus a fixed group service fee ($10 USD equivalent for foreign groups, LKR 400 for local groups) and vehicle entry tax (LKR 400).",
    detailedContent: "Our dynamic calculator automatically applies this government formula in real-time, giving you an exact breakdown so you are never surprised by unexpected cash requests at the gate.",
    category: "calculator",
    categoryLabel: "VAT & Fees Formula",
    links: [
      { label: "View Live Price Formula", href: "#ticket-calculator" },
      { label: "Contact Dispatcher", href: "/contact" },
    ],
  },
  {
    id: "ticket-counter-opening-hours-and-gates",
    question: "What are the official ticket counter opening hours at Yala National Park?",
    answer: "The official DWC ticket counters at Palatupana Gate (Block 1) and Katagamuwa Gate (Block 2) operate daily from 6:00 AM to 6:00 PM, with morning permit sales commencing at 5:45 AM.",
    detailedContent: "Morning gate queues frequently stretch 50+ jeeps long during peak tourist season (December–April); having pre-cleared digital permits ensures your driver drives straight to the inspection lane.",
    category: "gate",
    categoryLabel: "Gate Clearance & Bypass",
    links: [
      { label: "Early Morning Entry Guide", href: "/blog" },
      { label: "Island-Wide Transfers", href: "/pickup-dropoff" },
    ],
  },
  {
    id: "half-day-vs-full-day-permit-costs",
    question: "Are entry permits priced differently for half-day versus full-day safaris?",
    answer: "Passenger admission tickets are identical for morning and afternoon half-day safaris, but full-day (12-hour) permits include a slightly higher vehicle trail charge to account for extended trail usage until sunset.",
    detailedContent: "A full-day permit allows your vehicle to remain inside the park between 12:00 PM and 2:00 PM resting at the scenic Patanangala beach rest area without exiting and re-paying gate admission.",
    category: "calculator",
    categoryLabel: "VAT & Fees Formula",
    links: [
      { label: "Full Day Safari Package", href: "/safari-packages/yala-full-day-safari" },
      { label: "Calculator Breakdown", href: "#ticket-calculator" },
    ],
  },
  {
    id: "local-sri-lankan-ticket-prices",
    question: "What are the ticket prices for Sri Lankan citizens and resident visa holders?",
    answer: "Sri Lankan citizens pay LKR 150 for adults and LKR 50 for children (6–12 years). Foreigners holding valid Sri Lankan resident visas or work permits pay standard local rates upon presenting original visa proof.",
    detailedContent: "All local and resident permits are subject to local vehicle entry fees (LKR 400) and 18% VAT, which can be selected directly in the resident toggle of our calculator.",
    category: "pricing",
    categoryLabel: "Foreign & SAARC Rates",
    links: [
      { label: "Switch to Resident Rates", href: "#ticket-calculator" },
      { label: "About Yala Wildlife", href: "/about" },
    ],
  },
  {
    id: "required-documents-for-park-entry",
    question: "What identity documents are required when entering Yala National Park?",
    answer: "Foreign and SAARC visitors must carry their original passport (physical passport required; photocopies or digital phone photos are not accepted by park rangers).",
    detailedContent: "Sri Lankan citizens must present a valid National Identity Card (NIC), driving license, or passport; children under 6 require a birth certificate or passport copy to verify free entry.",
    category: "booking",
    categoryLabel: "Passports & Rules",
    links: [
      { label: "Verified Reviews", href: "/reviews" },
      { label: "Customer Support Desk", href: "/contact" },
    ],
  },
  {
    id: "cancellation-and-date-changes-for-tickets",
    question: "Can park entry permits be cancelled or rescheduled once issued?",
    answer: "Once official government DWC entry permits are printed with individual passport numbers at the gate, they are strictly non-refundable and non-transferable under Sri Lankan wildlife law.",
    detailedContent: "However, if you book your permits through our concierge desk and need to adjust your tour date at least 24 hours prior to printing, our team will reschedule your booking at zero administrative fee.",
    category: "booking",
    categoryLabel: "Passports & Rules",
    links: [
      { label: "Support & Dispatch Desk", href: "/contact" },
      { label: "Terms & Conditions", href: "/legal" },
    ],
  },
];

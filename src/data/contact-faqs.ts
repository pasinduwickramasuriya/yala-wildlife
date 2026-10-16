export interface ContactFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "booking" | "response" | "urgent" | "payments" | "location";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const CONTACT_CATEGORIES = [
  { id: "all", label: "All Contact FAQs" },
  { id: "booking", label: "Booking & Reservations" },
  { id: "response", label: "Response Times & Hours" },
  { id: "urgent", label: "Same-Day & Emergency" },
  { id: "payments", label: "Payments & Currencies" },
  { id: "location", label: "Office & Hotel Pickups" },
];

export const CONTACT_FAQS: ContactFAQItem[] = [
  {
    id: "contact-response-time-whatsapp-email",
    question: "How quickly do you reply to booking inquiries and messages?",
    answer: "Our WhatsApp dispatch team (+94 778 158 004) replies within 5 to 15 minutes 24/7, while web contact form submissions and email inquiries are answered within 1 hour.",
    detailedContent: "For urgent inquiries—such as next-morning sunrise safaris or immediate flight delay transfers—we recommend messaging us directly on WhatsApp for real-time driver allocation and instant confirmation.",
    category: "response",
    categoryLabel: "Response Times & Hours",
    links: [
      { label: "WhatsApp Chat", href: "https://wa.me/94778158004" },
      { label: "Fill Inquiry Form", href: "#inquiry-form" },
    ],
  },
  {
    id: "how-to-book-same-day-last-minute-safari",
    question: "Can I book a same-day or last-minute safari in Yala?",
    answer: "Yes, we accept same-day and emergency safari bookings up to 1 hour before afternoon gate entry (2:00 PM) and up to 10:00 PM the night prior for 6:00 AM morning game drives.",
    detailedContent: "We maintain reserve Toyota Hilux jeeps and licensed naturalists on standby at our Tissamaharama operations hub to accommodate unexpected traveler arrivals and cruise/flight schedule changes.",
    category: "urgent",
    categoryLabel: "Same-Day & Emergency",
    links: [
      { label: "Browse Safari Packages", href: "/safari-packages" },
      { label: "Emergency WhatsApp", href: "https://wa.me/94778158004" },
    ],
  },
  {
    id: "accepted-payment-methods-and-currencies",
    question: "What payment methods and currencies do you accept for safari bookings?",
    answer: "We accept all major credit and debit cards (Visa, MasterCard), secure online payment links, and cash upon arrival in Sri Lankan Rupees (LKR), US Dollars (USD), Euros (EUR), and British Pounds (GBP).",
    detailedContent: "Only a small 10%–20% advance deposit is required to lock in your private jeep and DWC gate tickets, with the remaining balance settled upon meeting your driver on the day of the tour.",
    category: "payments",
    categoryLabel: "Payments & Currencies",
    links: [
      { label: "Pricing Calculator", href: "/safari-packages" },
      { label: "Contact Reservations", href: "#inquiry-form" },
    ],
  },
  {
    id: "tissamaharama-office-location-and-visit",
    question: "Where is your operational base located, and can we visit your office in person?",
    answer: "Our operations base is located on Tissamaharama Road, Tissamaharama (Postal Code 82600), situated just 20 minutes from the Palatupana and Katagamuwa entrances of Yala National Park.",
    detailedContent: "Guests staying in Tissamaharama or Kataragama are welcome to drop by our base, or meet our coordinator directly in your hotel lobby for an in-person briefing before your safari.",
    category: "location",
    categoryLabel: "Office & Hotel Pickups",
    links: [
      { label: "View Location Map", href: "#location-map" },
      { label: "About Yala Wildlife", href: "/about" },
    ],
  },
  {
    id: "hotel-pickup-zones-and-extra-charges",
    question: "Where do you provide hotel pickups, and are there extra transfer fees?",
    answer: "Complimentary hotel pickup and drop-off in our 4x4 safari jeep is included for all hotels in Tissamaharama, Kirinda, Palatupana, and Kataragama.",
    detailedContent: "For guests staying in Ella, Galle, Mirissa, Weligama, Tangalle, or Colombo, our dedicated transport fleet provides seamless private door-to-door car and KDH van transfers directly to our safari staging point.",
    category: "location",
    categoryLabel: "Office & Hotel Pickups",
    links: [
      { label: "Island-Wide Transfers", href: "/pickup-dropoff" },
      { label: "Morning Safari Details", href: "/safari-packages/yala-morning-safari" },
    ],
  },
  {
    id: "custom-safari-itineraries-and-special-requests",
    question: "Can I request a custom safari schedule, birdwatching tour, or photography setup?",
    answer: "Yes, 100% of our safari expeditions can be customized for full-day wildlife photography, specialized birdwatching in Bundala Ramsar Wetland, or combined multi-day cultural tours across Sri Lanka.",
    detailedContent: "Simply mention your special requests (such as telephoto camera mounts, child car seats, packed picnic breakfasts, or specific gate preferences) in our contact form or WhatsApp chat.",
    category: "booking",
    categoryLabel: "Booking & Reservations",
    links: [
      { label: "Bundala Bird Safari", href: "/safari-packages/bundala-bird-watching-safari" },
      { label: "Multi-Day Tours", href: "/tours" },
    ],
  },
  {
    id: "rescheduling-and-cancellation-policy",
    question: "What happens if I need to cancel or reschedule my safari date?",
    answer: "Date rescheduling is completely free of charge up to 24 hours prior to departure, and cancellations submitted at least 48 hours in advance receive a 100% full refund with zero penalty.",
    detailedContent: "If Yala National Park is officially closed by the Department of Wildlife Conservation due to extreme adverse weather, you will receive an immediate 100% refund or a free transfer to an alternate open park.",
    category: "booking",
    categoryLabel: "Booking & Reservations",
    links: [
      { label: "Customer Reviews", href: "/reviews" },
      { label: "Contact Dispatcher", href: "https://wa.me/94778158004" },
    ],
  },
  {
    id: "dwc-park-entry-permits-handling",
    question: "Do we need to buy our own park entrance tickets, or do you arrange them for us?",
    answer: "We arrange all official Department of Wildlife Conservation (DWC) entrance permits in advance on your behalf, allowing your vehicle to bypass the 45-minute morning ticket queue at the park gate.",
    detailedContent: "Your permits are tied directly to your passport details and verified electronically at the barrier, ensuring your jeep enters the park trails immediately upon 6:00 AM gate opening.",
    category: "booking",
    categoryLabel: "Booking & Reservations",
    links: [
      { label: "All Safari Packages", href: "/safari-packages" },
      { label: "Submit Guest Details", href: "#inquiry-form" },
    ],
  },
  {
    id: "group-bookings-and-corporate-discounts",
    question: "Do you offer group discounts, family rates, or corporate tour packages?",
    answer: "Yes, we provide tiered group discounts for parties requiring multiple private jeeps (6 to 30+ travelers), corporate retreats, school educational excursions, and travel agency partnerships.",
    detailedContent: "Contact our group reservations desk via email (pasindusadanjana17@gmail.com) or WhatsApp (+94 778 158 004) with your passenger count and dates for an itemized, discounted group quote.",
    category: "payments",
    categoryLabel: "Payments & Currencies",
    links: [
      { label: "Email Reservations", href: "mailto:pasindusadanjana17@gmail.com" },
      { label: "WhatsApp Support", href: "https://wa.me/94778158004" },
    ],
  },
  {
    id: "emergency-safari-helpline-support",
    question: "What should I do if I am running late for my scheduled safari pickup?",
    answer: "Call or WhatsApp our 24/7 ranger dispatch desk immediately at +94 778 158 004 so we can alert your driver and hold your staging slot without forfeiting your booking.",
    detailedContent: "Because our jeeps are 100% private, your departure time is flexible to your needs, ensuring you never miss your wildlife experience even if your morning flight or breakfast runs behind schedule.",
    category: "urgent",
    categoryLabel: "Same-Day & Emergency",
    links: [
      { label: "Call Hotline", href: "tel:+94778158004" },
      { label: "WhatsApp Dispatch", href: "https://wa.me/94778158004" },
    ],
  },
];

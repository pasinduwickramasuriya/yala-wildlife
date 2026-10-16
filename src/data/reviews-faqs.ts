export interface ReviewFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "ratings" | "sightings" | "guides" | "families" | "policies";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const REVIEWS_CATEGORIES = [
  { id: "all", label: "All Review FAQs" },
  { id: "ratings", label: "Ratings & Trust" },
  { id: "sightings", label: "Sightings & Odds" },
  { id: "guides", label: "Driver & Guide Feedback" },
  { id: "families", label: "Families & Photographers" },
  { id: "policies", label: "Satisfaction & Policies" },
];

export const REVIEWS_FAQS: ReviewFAQItem[] = [
  {
    id: "tripadvisor-google-reviews-verification",
    question: "How are Yala Wildlife Safari guest reviews collected and verified?",
    answer: "100% of our displayed guest reviews originate from authentic third-party travel platforms including TripAdvisor, Google Maps, and direct post-safari traveler feedback, reflecting a 4.9/5 overall average rating from over 1,000 international visitors.",
    detailedContent: "We never publish fake testimonials or incentivize ratings. Every review represents genuine travelers who completed a morning, afternoon, or full-day safari in Yala National Park with our licensed team.",
    category: "ratings",
    categoryLabel: "Ratings & Trust",
    links: [
      { label: "View Guest Photo Gallery", href: "/gallery" },
      { label: "Explore Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "leopard-sighting-success-rate-statistics",
    question: "What is your actual leopard sighting success rate according to traveler feedback?",
    answer: "Based on our verified 2024–2026 trip logs, our guests experience an average 85% to 90% leopard sighting success rate on full-day safaris, and approximately 75% on early-morning 6:00 AM departures.",
    detailedContent: "While wild animal sightings in an unfenced 978 km² park cannot be legally guaranteed, our naturalist spotters track fresh pugmarks, territorial marks, and spotted deer warning calls to deliver the highest encounter probability in Yala.",
    category: "sightings",
    categoryLabel: "Sightings & Odds",
    links: [
      { label: "Morning Leopard Safari", href: "/safari-packages/yala-morning-safari" },
      { label: "Full Day Safari Expedition", href: "/safari-packages/yala-full-day-safari" },
    ],
  },
  {
    id: "driver-tracker-punctuality-conduct-reviews",
    question: "What do traveler reviews say most often about your safari drivers and trackers?",
    answer: "Travelers consistently highlight our drivers' punctuality (arriving 10 minutes prior to 4:45 AM hotel pickups), courteous professional conduct, smooth driving over rugged dirt tracks, and keen naturalist eyesight for spotting camouflaged leopards and sloth bears.",
    detailedContent: "Guests also praise our team for adhering strictly to ethical distances at sightings rather than aggressively crowding animals or revving engines.",
    category: "guides",
    categoryLabel: "Driver & Guide Feedback",
    links: [
      { label: "About Our Guides", href: "/about" },
      { label: "Contact Dispatch Team", href: "/contact" },
    ],
  },
  {
    id: "family-with-kids-safari-reviews",
    question: "Is Yala Wildlife Safari highly rated by families traveling with young children?",
    answer: "Yes, families with children consistently rate our safaris 5 stars, praising our safety-tested Toyota Hilux jeeps with high roll cages, child safety booster seats, and drivers who patiently explain animal facts to kids.",
    detailedContent: "Our drivers accommodate flexible bathroom breaks at the Patanangala beach rest site and ensure comfortable driving speeds so young children remain engaged without feeling fatigued.",
    category: "families",
    categoryLabel: "Families & Photographers",
    links: [
      { label: "About Safety Standards", href: "/about" },
      { label: "Family Safari Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "photographers-and-birders-experience-feedback",
    question: "How do professional wildlife photographers review your safari tours?",
    answer: "Photographers rate our specialized private tours exceptionally high for vehicle positioning, driver engine shutoff for camera stabilization, patience at prime sightings, and dedicated beanbag supports for heavy telephoto lenses (200mm–600mm).",
    detailedContent: "Our guides understand golden-hour lighting dynamics in dry-zone scrub forests, ensuring photographers capture magazine-quality images of leopards on rocky outcrops and raptors in flight.",
    category: "families",
    categoryLabel: "Families & Photographers",
    links: [
      { label: "Bundala Bird Watching", href: "/safari-packages/bundala-bird-watching-safari" },
      { label: "Visitor Gallery", href: "/gallery" },
    ],
  },
  {
    id: "negative-reviews-handling-and-resolution",
    question: "How does Yala Wildlife Safari handle negative feedback or disappointed guests?",
    answer: "Our customer experience management team personally investigates any concerns within 24 hours, actively contacting guests to resolve issues regarding vehicle comfort, guide communication, or hotel pickup coordination.",
    detailedContent: "If severe weather forces park closure by the Department of Wildlife Conservation, we immediately provide free date rescheduling or a 100% full refund with zero cancellation penalty.",
    category: "policies",
    categoryLabel: "Satisfaction & Policies",
    links: [
      { label: "Support & Dispatch", href: "/contact" },
      { label: "Booking Terms", href: "/legal" },
    ],
  },
  {
    id: "sloth-bear-and-elephant-sightings-feedback",
    question: "What are the chances of seeing sloth bears and wild Asian elephants according to guest reviews?",
    answer: "Elephant sightings are recorded on over 95% of our afternoon and full-day tours, particularly around visible waterholes, while elusive Sri Lankan sloth bears are spotted on roughly 40% to 55% of drives, peaking during the palu fruit season (May–July).",
    detailedContent: "Guests frequently review close encounters with gentle elephant herds, breeding pairs, and playful calves crossing the sandy jungle tracks in Blocks 1 and 2.",
    category: "sightings",
    categoryLabel: "Sightings & Odds",
    links: [
      { label: "Afternoon Safari Tour", href: "/safari-packages/yala-afternoon-safari" },
      { label: "Wildlife Blog", href: "/blog" },
    ],
  },
  {
    id: "shared-vs-private-safari-reviews-comparison",
    question: "Do guest reviews favor private safari jeeps or shared budget safaris?",
    answer: "Over 85% of our reviews recommend booking private jeep safaris because they allow flexible pacing, personalized stops, and unobstructed 360-degree photography angles without competing for window space.",
    detailedContent: "For solo travelers and budget couples, our shared safaris receive strong 5-star ratings because we strictly limit passenger count to a maximum of 6 guests per vehicle to guarantee every person an open window seat.",
    category: "ratings",
    categoryLabel: "Ratings & Trust",
    links: [
      { label: "Compare Safari Packages", href: "/safari-packages" },
      { label: "Book Private Jeep", href: "/safari-packages" },
    ],
  },
  {
    id: "gate-queue-bypass-and-vip-entry-feedback",
    question: "How do reviews describe the morning park gate entry process with Yala Wildlife Safari?",
    answer: "Guests consistently praise our pre-arranged DWC permit service, which completely bypasses the 30- to 45-minute ticket counter queues at Palatupana and Katagamuwa gates, allowing jeeps to enter park trails right at the 6:00 AM sunrise opening.",
    detailedContent: "Being among the first vehicles through the gates drastically enhances early-morning predator encounters before trail dust and engine sounds disturb wildlife.",
    category: "guides",
    categoryLabel: "Driver & Guide Feedback",
    links: [
      { label: "Morning Safari Highlights", href: "/safari-packages/yala-morning-safari" },
      { label: "Ticket Rates & Information", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "how-to-leave-a-review-after-tour",
    question: "How can I submit my own review and photos after completing a safari?",
    answer: "Following your safari, our dispatch desk sends a direct link via WhatsApp or email to leave a verified review on our Google Maps profile or TripAdvisor page, or you can submit trip photos directly for our visitor gallery.",
    detailedContent: "Your feedback helps us continuously elevate guide training and vehicle standards while assisting future international travelers in planning their bucket-list Sri Lankan safari.",
    category: "policies",
    categoryLabel: "Satisfaction & Policies",
    links: [
      { label: "Write a Review", href: "https://g.page/r/yalawildlifesafari/review" },
      { label: "WhatsApp Support Desk", href: "https://wa.me/94778158004" },
    ],
  },
];

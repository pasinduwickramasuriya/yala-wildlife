export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "packages" | "wildlife" | "timings" | "logistics" | "booking" | "safety";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export const FAQS: FAQItem[] = [
  {
    id: "safari-package-options",
    question: "What safari packages are available at Yala National Park, and how do shared and private safaris differ?",
    answer: "Yala Wildlife offers three primary safari formats: Half-Day Shared Safaris (17,000 LKR per person), Half-Day Private Safaris (from 31,870 LKR all-inclusive for 1 person up to 88,680 LKR for 7 persons), and Full-Day Expeditions (12 hours from 5:00 AM to 6:00 PM).",
    detailedContent: "All safaris are conducted in customized Japanese Toyota Hilux 4x4 jeeps with elevated tiered seating (maximum 7 passengers) and an expert tracker. Private tours provide exclusive jeep access and flexible pacing, while shared safaris allow solo travelers and couples to join a small group and share costs comfortably without sacrificing comfort. We never use cramped Indian Mahindra jeeps.",
    category: "packages",
    categoryLabel: "Packages & Pricing",
    links: [
      { label: "View Safari Packages", href: "/safari-packages" },
      { label: "Ticket Calculator", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "safari-pricing-breakdown",
    question: "How much does a Yala safari tour cost, and what is included in the price?",
    answer: "An all-inclusive Half-Day Shared Safari is 17,000 LKR per person, which includes official Yala entrance tickets, a luxury Toyota Hilux jeep, tracker, water, and packed breakfast. All-inclusive Private Safaris range from 31,870 LKR (1 guest) to 88,680 LKR (7 guests).",
    detailedContent: "If you only need vehicle rental without park admission, private half-day jeep hire is 17,000 LKR per jeep, and full-day hire is 34,000 LKR per jeep (up to 7 passengers). Government DWC park permits for standalone jeep hires are charged at the gate ($25 USD per foreign adult, $15 USD per child 6–12 years, plus vehicle fee and 18% VAT). Our all-inclusive packages include all government fees upfront with zero hidden charges.",
    category: "packages",
    categoryLabel: "Packages & Pricing",
    links: [
      { label: "Explore Safari Rates", href: "/safari-packages" },
      { label: "Official Ticket Calculator", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "safari-vehicle-type-capacity",
    question: "What type of safari vehicles do you use, and how many passengers can join each jeep?",
    answer: "Our entire safari fleet consists strictly of upgraded Japanese Toyota Hilux 4x4 jeeps, custom-engineered for rugged off-road terrain in Yala.",
    detailedContent: "Each jeep features three-tiered forward-facing cushioned seats, an open-frame roll cage for unobstructed 360-degree wildlife photography, and roll-down weather curtains. We enforce a strict maximum capacity of 6 to 7 passengers per vehicle to guarantee every traveler a window seat and ample camera space. We do not use cramped Indian Mahindra utility jeeps.",
    category: "packages",
    categoryLabel: "Packages & Pricing",
    links: [
      { label: "About Our Fleet", href: "/about" },
      { label: "Package Options", href: "/safari-packages" },
    ],
  },
  {
    id: "park-entrance-tickets-inclusions",
    question: "Are Yala National Park entrance tickets included in your safari packages?",
    answer: "Yes, all our 'All-Inclusive' private and shared safari packages include official Department of Wildlife Conservation (DWC) entrance tickets, vehicle road licenses, group service charges, and statutory 18% VAT.",
    detailedContent: "If you book 'Jeep Hire Only', park entrance permits are excluded and must be paid at the gate ticket office or pre-booked using our dynamic online DWC ticket calculator. Foreign non-SAARC rates are $25 USD per adult and $15 USD per child (6–12 years). SAARC nationals pay $20 USD per adult and $10 USD per child.",
    category: "packages",
    categoryLabel: "Packages & Pricing",
    links: [
      { label: "Check Ticket Prices", href: "/yala-national-park-tickets" },
      { label: "All-Inclusive Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "leopard-sightings-guarantee",
    question: "Can I see leopards in Yala National Park, and are wildlife sightings guaranteed?",
    answer: "Yala National Park—particularly Block 1 (Ruhuna)—has the world's highest recorded wild leopard density (Panthera pardus koti), making it Sri Lanka's premier leopard destination.",
    detailedContent: "Because leopards roam freely across 978 square kilometers of protected wilderness, sightings can never be 100% guaranteed. However, our experienced naturalist drivers track territorial marking trees, fresh pugmarks, and alarm calls from spotted deer and langurs to achieve industry-leading sighting success rates during early morning (6:00 AM – 9:00 AM) and late afternoon (3:30 PM – 6:00 PM) game drives.",
    category: "wildlife",
    categoryLabel: "Leopards & Wildlife",
    links: [
      { label: "Read Leopard Guide", href: "/blog" },
      { label: "Book Leopard Safari", href: "/safari-packages" },
    ],
  },
  {
    id: "animals-seen-in-yala",
    question: "What other animals and wildlife can I see in Yala National Park?",
    answer: "Beyond leopards, Yala is home to Sri Lanka's 'Big Three' wildlife stars: the Sri Lankan leopard, the Asian elephant, and the sloth bear (Melursus ursinus inornatus).",
    detailedContent: "Visitors also regularly see large herds of spotted deer (chital), sambar deer, wild water buffaloes, mugger crocodiles, golden jackals, wild boars, grey langurs, and over 215 bird species including painted storks, sea eagles, and crested serpent eagles. Sloth bears are most active between May and July during the ripe Palu berry fruiting season.",
    category: "wildlife",
    categoryLabel: "Leopards & Wildlife",
    links: [
      { label: "Wildlife Blog Guides", href: "/blog" },
      { label: "Browse Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "safari-timings-morning-vs-afternoon",
    question: "What time does a Yala safari start, and is a morning or afternoon safari better?",
    answer: "Morning safaris start with hotel pickups between 4:45 AM and 5:15 AM to enter park gates right at 6:00 AM, finishing around 10:00 AM to 12:00 PM. Afternoon safaris run from 2:30 PM to 6:30 PM.",
    detailedContent: "Morning safaris feature cooler temperatures and peak predator hunting activity as leopards patrol trail borders before midday heat. Afternoon safaris offer exceptional golden-hour photography and large elephant herds gathering at waterholes. Full-day expeditions run from 5:00 AM to 6:00 PM for maximum wilderness coverage.",
    category: "timings",
    categoryLabel: "Timings & Seasons",
    links: [
      { label: "Morning Safari Details", href: "/safari-packages" },
      { label: "Customer Reviews", href: "/reviews" },
    ],
  },
  {
    id: "best-month-season-visit-yala",
    question: "What is the best month and season to visit Yala National Park?",
    answer: "The best time to visit Yala National Park is during the dry season from February through July when wildlife gathers around visible waterholes, lakes, and streams.",
    detailedContent: "February to June offers prime leopard tracking conditions and clear sunny weather. Please note: The Department of Wildlife Conservation (DWC) traditionally closes Block 1 for annual habitat regeneration from early September to mid-October. During this period, our safaris continue operating with excellent sightings in Yala Block 5 (Galge Gate) and nearby Bundala National Park.",
    category: "timings",
    categoryLabel: "Timings & Seasons",
    links: [
      { label: "Seasonal Climate Guide", href: "/blog" },
      { label: "Contact Us for Updates", href: "/contact" },
    ],
  },
  {
    id: "hotel-pickup-dropoff-areas",
    question: "Do you provide hotel pickup and drop-off, and which locations are covered?",
    answer: "Yes, we provide complimentary hotel pickup and drop-off in our 4x4 safari jeeps for all guests accommodated in Tissamaharama, Kirinda, Kataragama, and Yala junction hotels.",
    detailedContent: "Our driver meets you directly in your hotel lobby, eliminating the need for independent gate transit. For guests staying in Ella, Mirissa, Galle, Tangalle, Hambantota, or Colombo, we arrange private air-conditioned vehicle transfers directly to our safari base or meeting point.",
    category: "logistics",
    categoryLabel: "Gates & Logistics",
    links: [
      { label: "Transport & Transfer Hub", href: "/pickup-dropoff" },
      { label: "Contact Dispatch Team", href: "/contact" },
    ],
  },
  {
    id: "park-gates-and-blocks",
    question: "Where is Yala located, and which park gate do we enter?",
    answer: "Yala National Park is situated in the southeastern corner of Sri Lanka, roughly 260 km from Colombo (about 4.5 hours via the Southern Expressway) and 90 km from Ella (about 2.5 hours).",
    detailedContent: "Most safaris enter through the Palatupana Gate near Kirinda/Tissamaharama for Block 1 (Ruhuna) and Block 2. Visitors staying near Kataragama can access Block 2 via the Katagamuwa Gate, while Block 3 and Block 5 are reached through the northern Galge Gate along the Buttala-Kataragama road. Over 80% of safaris focus on Block 1 due to its high density of rocky outcrops and waterholes.",
    category: "logistics",
    categoryLabel: "Gates & Logistics",
    links: [
      { label: "Gate & Transfer Details", href: "/pickup-dropoff" },
      { label: "Calculate Permits", href: "/yala-national-park-tickets" },
    ],
  },
  {
    id: "travel-from-ella-or-colombo",
    question: "Can I do a Yala safari as a day trip from Ella, Galle, or Colombo?",
    answer: "Yes, Yala is easily accessible as a day trip from Ella (2 to 2.5 hours by road) and southern coastal towns like Galle, Mirissa, and Tangalle (1.5 to 2.5 hours via the E01 expressway).",
    detailedContent: "We frequently arrange private early-morning transfers departing Ella around 3:00 AM to meet our safari jeep at 5:30 AM in Tissamaharama. From Colombo, the journey is approximately 4.5 to 5 hours, so we recommend arriving the previous evening and staying overnight in Tissamaharama.",
    category: "logistics",
    categoryLabel: "Gates & Logistics",
    links: [
      { label: "Book Intercity Transport", href: "/pickup-dropoff" },
      { label: "Multi-Day Tour Itineraries", href: "/tours" },
    ],
  },
  {
    id: "what-to-wear-and-pack",
    question: "What should I wear and pack for a Yala safari tour?",
    answer: "Wear comfortable, lightweight cotton clothing in neutral earth tones such as khaki, beige, olive green, or brown. Avoid bright neon colors, solid white, and red, which can alert animals.",
    detailedContent: "Recommended packing: a sun hat with a chin strap, UV-protective sunglasses, high-SPF sunscreen, insect repellent, a light windbreaker jacket for breezy dawn starts, telephoto camera gear (200mm–600mm lenses recommended), binoculars, and your original passport for gate permit verification. Single-use plastic bags and disposable bottles are strictly banned inside Yala National Park.",
    category: "safety",
    categoryLabel: "Gear & Safety",
    links: [
      { label: "Safari Packing Guide", href: "/blog" },
      { label: "Browse Packages", href: "/safari-packages" },
    ],
  },
  {
    id: "safety-children-seniors-rules",
    question: "Is a Yala safari safe for children, seniors, and families, and what rules must be followed?",
    answer: "Yes, a Yala safari is very safe for visitors of all ages, including young children and seniors, when standard park safety regulations are followed.",
    detailedContent: "All guests remain securely seated inside our heavy-duty roll-caged Toyota Hilux jeeps throughout the drive. Stepping out of the vehicle is strictly prohibited by law, except at designated beach rest stops (such as Patanangala) and official park restrooms. Our experienced drivers maintain respectful distances from wild bull elephants and predators at all times. Front-row seating can be reserved for elderly guests upon request.",
    category: "safety",
    categoryLabel: "Gear & Safety",
    links: [
      { label: "About Our Safety Standards", href: "/about" },
      { label: "Verified Guest Reviews", href: "/reviews" },
    ],
  },
  {
    id: "booking-process-payment-methods",
    question: "How do I book a safari online, and what payment methods and currencies are accepted?",
    answer: "You can book directly through our online package reservation portal or by messaging our 24/7 ranger dispatch team via WhatsApp at +94 778 158 004.",
    detailedContent: "We accept major international credit and debit cards (Visa, MasterCard, American Express) through our secure online payment system, as well as cash payments in Sri Lankan Rupees (LKR), US Dollars (USD), Euros (EUR), and British Pounds (GBP) upon arrival. Online payments are protected with SSL encryption.",
    category: "booking",
    categoryLabel: "Booking & Policies",
    links: [
      { label: "Book Safari Online", href: "/safari-packages" },
      { label: "Contact WhatsApp Support", href: "/contact" },
    ],
  },
  {
    id: "cancellation-and-rescheduling-policy",
    question: "What is your cancellation and rescheduling policy if my travel plans change?",
    answer: "We offer full refunds for cancellations requested at least 48 hours prior to your scheduled safari departure time. Cancellations made between 24 and 48 hours receive a 50% refund.",
    detailedContent: "If your flight or travel itinerary changes unexpectedly, date rescheduling is completely free of charge, subject to jeep and tracker availability on your newly preferred date. In the rare event of extreme weather or an official park closure, we provide a 100% refund or free transfer to an alternative park.",
    category: "booking",
    categoryLabel: "Booking & Policies",
    links: [
      { label: "Terms & Conditions", href: "/legal" },
      { label: "Contact Reservation Desk", href: "/contact" },
    ],
  },
];

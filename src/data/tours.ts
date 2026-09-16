export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    included?: string;
    highlight?: string;
}

export interface Tour {
    id: string;
    title: string;
    slug: string;
    route: string;
    price: number;
    description: string;
    longDescription: string;
    highlights: string[];
    itinerary: ItineraryDay[];
    seoKeywords: string;
}

export const tourPackages: Tour[] = [
    {
        id: "5-day-sri-lanka-escape",
        title: "5-Day Sri Lanka Escape: Culture, Nature & Adventure",
        slug: "5-day-sri-lanka-escape-culture-nature-adventure",
        route: "Sigiriya → Kandy → Ella → Colombo",
        price: 450,
        description: "A highly optimized, fast-paced journey through Sri Lanka's cultural triangle and central highlands, featuring the Sigiriya Lion Rock, Kandyan heritage, and Ella's misty peaks.",
        longDescription: "Designed specifically for travelers with limited time but a grand thirst for discovery, this 5-day expedition covers the absolute 'must-see' iconic landmarks of the island. You will traverse from the ancient, sun-baked dry-zone plains of Sigiriya to the cool, mist-shrouded mountain peaks of Ella, ultimately concluding with a deep dive into the cosmopolitan energy of Colombo. Every single hour of this itinerary is carefully optimized to ensure you experience the perfect blend of UNESCO World Heritage sites, thrilling wildlife encounters, and the world-famous highland tea culture. This is the ultimate crash course in Sri Lankan beauty.",
        highlights: ["Sigiriya Lion Rock Fortress", "Sacred Temple of the Tooth", "Nine Arches Bridge Viewpoint", "Colombo Urban Heritage Tour"],
        seoKeywords: "Sri Lanka 5 day itinerary, Sigiriya rock fortress tour, Kandy spiritual tour, Ella scenic train journey, Colombo city guide, short Sri Lanka vacation",
        itinerary: [
            {
                day: 1,
                title: "Arrival & Sigiriya Ancient Wonders",
                description: "Upon touching down at Bandaranaike International Airport, you will be greeted by your private chauffeur-guide and whisked straight into the heart of the cultural triangle. The journey to Sigiriya is an architectural and natural marvel. In the late afternoon, as the intense sun begins to cool, we embark on a thrilling 4x4 open-top jeep safari in Minneriya National Park to witness the world-famous 'Gathering' of wild Asian elephants in their natural habitat.",
                included: "Private Luxury Air-Conditioned Transport, Minneriya Wildlife Safari Jeep & Tracker, Airport Meet & Greet",
                highlight: "Exclusive Sunset Walk at a Traditional Herbal and Spice Garden (Free educational tour)"
            },
            {
                day: 2,
                title: "The Cultural Pulse of Kandy",
                description: "Rise early to ascend the 1,200 ancient stone steps of the Sigiriya Lion Rock Fortress, marveling at the world-renowned frescoes and the highly polished mirror wall. Following this breathtaking climb, we travel into the lush, rolling hills of Kandy. Here, we step into the sacred Temple of the Sacred Tooth Relic (Sri Dalada Maligawa), the most venerated site in the global Buddhist world. The evening concludes with an explosive, high-energy traditional Kandyan cultural fire-walking and dance performance.",
                included: "Kandyan Traditional Cultural Dance Performance Admission, Licensed Historian Guide Services",
                highlight: "Exclusive Local Gem Museum & Lapidary Visit (Free of Charge)"
            },
            {
                day: 3,
                title: "Misty Mountains & The Ella Gap",
                description: "Board the legendary blue train for what is widely considered one of the most beautiful railway journeys in the world, winding through endless emerald tea estates and dramatic mountain passes. Upon reaching the bohemian village of Ella, we trek through the jungle to witness the Nine Arches Bridge—a breathtaking masterpiece of colonial-era British railway construction—before watching the sunset over the dramatic, plunging valley known as the Ella Gap.",
                included: "First-Class or Observation Deck Scenic Train Tickets, Exclusive Scenic Dinner Out in Ella Town",
                highlight: "Adrenaline-pumping Flying Ravana Zipline & Giant Ella Swing Experience"
            },
            {
                day: 4,
                title: "Colombo: The Modern Pulse",
                description: "Descend from the cool highlands back to the warm, tropical western coast. Our comprehensive Colombo city tour explores the vibrant chaos of the Pettah Floating Market, the monumental architecture of Independence Square, and the colonial-era buildings of the Fort district. The day finishes with a relaxing stroll and local street-food tasting among the kite flyers at the historic oceanfront promenade of Galle Face Green.",
                included: "Full Guided Colombo Heritage & Urban Tour, Authentic Tuk-Tuk City Experience",
                highlight: "Galle Face Green Sunset Walk & Street Food Tasting"
            },
            {
                day: 5,
                title: "Final Departure & Souvenir Hunting",
                description: "After enjoying a final, hearty traditional Sri Lankan breakfast, you will have time for some last-minute boutique shopping at renowned local stores like Laksala or Barefoot, picking up authentic Sri Lankan crafts, Ceylon tea, and handloom fabrics before your private luxury transfer back to the airport for your onward flight.",
                included: "Gourmet Hotel Breakfast, Private Airport Drop-off Transfer",
                highlight: "Personalized Souvenir Shopping Assistance and Guidance"
            }
        ]
    },
    {
        id: "8-day-sri-lankan-wonders",
        title: "8-Day Sri Lankan Wonders: Culture, Wildlife & Scenic Beauty",
        slug: "8-day-sri-lankan-wonders-wildlife-historic-forts",
        route: "Sigiriya → Kandy → Ella → Yala → Galle",
        price: 750,
        description: "A comprehensive and beautifully paced week-long journey blending the ancient history of the North, the scenic tea country of the Center, and the colonial coastal charm of the South.",
        longDescription: "The 8-Day Wonders tour is our absolute most popular and perfectly balanced itinerary, crafted meticulously for families, honeymooners, and explorers alike. It intentionally avoids the frantic rush of shorter tours, allowing for relaxing two-night stays in the cultural hub of Kandy and the mountain paradise of Ella. You will experience the stark, breathtaking contrast between tracking leopards in the dry-zone savannas of Yala National Park and hiking through the wet-zone tropical rain forests of the hill country. The expedition reaches its grand finale within the romantic, cobblestone streets of the 16th-century Galle Dutch Fort. This is the ultimate, immersive introduction to the 'Resplendent Isle.'",
        highlights: ["Authentic Sigiriya Village Immersion", "Kandyan Cultural Fire Dance", "Yala National Park Leopard Tracking", "Galle Dutch Fort Walking Tour"],
        seoKeywords: "Sri Lanka 8 day tour package, Yala leopard safari tour, Galle Fort heritage walk, Kandy cultural circuit, Ella train ride booking, best Sri Lanka itinerary",
        itinerary: [
            {
                day: 1,
                title: "Arrival & Sigiriya Rural Adventure",
                description: "Transfer immediately from the airport to the historic plains of Sigiriya. Engage deeply in a traditional Sri Lankan Village Trek, which includes a peaceful bullock cart ride through rural farmlands, a scenic catamaran boat ride across a lily-filled lake, and an authentic 'Kamatha' lunch cooked in clay pots and served on fresh lotus leaves. Experience the true heartbeat of rural Sri Lankan agriculture.",
                included: "Traditional Village Lunch Experience, 4x4 Safari Jeep, Private Air-Conditioned Transport",
                highlight: "Sigiriya Herbal and Spicy Garden Guided Educational Tour (Free)"
            },
            {
                day: 2,
                title: "Travel to Kandy & Cultural Evening",
                description: "Journey winding roads up into the cool, green hills of the central province. En route, visit the fragrant Matale Spice Grove to learn about ancient Ayurvedic medicine. Upon arriving in the bustling city of Kandy, you will witness a high-energy Kandyan fire-walking and traditional drum dance performance in the evening, showcasing centuries-old royal entertainment.",
                included: "VIP Kandyan Dance Admission Tickets, Matale Spice Garden Guided Visit",
                highlight: "World-Class Gem Museum & Lapidary Tour (Free)"
            },
            {
                day: 3,
                title: "Full Day in Kandy: Lakeside Serenity",
                description: "A dedicated day for spiritual reflection and relaxed exploration. Visit the sacred Temple of the Tooth during the atmospheric morning 'Puja' ceremony, surrounded by the scent of lotus flowers and incense. Spend your afternoon wandering through the local artisanal markets, exploring the massive Royal Botanical Gardens of Peradeniya, and walking the British-colonial streets surrounding the tranquil Kandy Lake.",
                highlight: "Spiritual Kandy Experience & Lake Sunset Photography Session"
            },
            {
                day: 4,
                title: "The Road to Ella: Waterfalls & Arches",
                description: "Drive through the spectacular, winding roads of the high hill country. We make a mandatory stop at the towering Ramboda Falls and visit a working tea plantation for an immersive 'Pluck-to-Cup' factory experience. End the day trekking through the jungle to stand upon the famous Nine Arches Bridge as the train rolls over the magnificent stone arches.",
                included: "Comprehensive Tea Factory Tour, 1 Specialty Dinner Out in Ella, Guided Waterfall Excursions"
            },
            {
                day: 5,
                title: "Explore Ella at Your Own Pace",
                description: "A completely free day to breathe in the crisp mountain air. Choose to undertake the rewarding hike to the summit of Little Adam’s Peak for 360-degree panoramic views, climb the challenging Ella Rock, or simply spend the day relaxing in the trendy, backpacker-friendly cafes of Ella town. The atmosphere here is unrivaled.",
                highlight: "Exclusive Relaxation Time & Scenic Viewpoint Hikes"
            },
            {
                day: 6,
                title: "Yala Wilderness Stay: Into the Leopard's Lair",
                description: "Descend rapidly from the mountains down to the hot, arid southern plains. Check into a beautiful safari lodge located on the borders of Yala National Park. The evening is spent relaxing by a crackling campfire under a blanket of stars, listening to the distant, nocturnal sounds of the wild Sri Lankan jungle.",
                highlight: "Exclusive Yala Nature Stay & Campfire Stargazing Experience"
            },
            {
                day: 7,
                title: "Galle Coastal Charm & Heritage",
                description: "After an exhilarating early morning wildlife safari tracking leopards and sloth bears, we travel along the picturesque southern coastline to the UNESCO World Heritage site of Galle. Spend the afternoon walking the ancient coral-stone ramparts of the Dutch Fort, exploring the endless array of chic boutique shops, art galleries, and historic cafes hidden within the fort's labyrinthine interior.",
                included: "Guided Galle Fort Historical Walking Tour, Entrance Fees to Fort Museums"
            },
            {
                day: 8,
                title: "Departure via the Southern Expressway",
                description: "Enjoy a final, luxurious coastal breakfast with views of the Indian Ocean before undertaking a fast-track, seamless transfer via the Southern Expressway directly to the international airport, taking with you a lifetime of unforgettable memories.",
                included: "Gourmet Hotel Breakfast, Highway Tolls, Direct Airport Transfer"
            }
        ]
    },
    {
        id: "12-day-grand-discovery",
        title: "12-Day Grand Sri Lanka Discovery Tour",
        slug: "12-day-grand-sri-lanka-discovery-relaxed-itinerary",
        route: "Sigiriya → Kandy → Nuwara Eliya → Ella → Weligama → Galle → Bentota",
        price: 1100,
        description: "An incredibly flexible, in-depth island journey covering ancient nature, surfing coastlines, and colonial culture at a remarkably relaxed pace.",
        longDescription: "The 12-Day Grand Discovery is designed to cover the entire spectrum of the island's diverse geography and culture over almost two weeks of bliss. From the deeply historical ruins of the cultural triangle to the misty, British-colonial highlands of Nuwara Eliya, down to the vibrant, youthful surfing waves of Weligama, and finally resting in the luxurious, sun-drenched beach resorts of Bentota. This itinerary is specifically tailored for travelers who want to see it all but refuse to feel rushed, offering multiple multi-night stays so you can truly unpack, unwind, and absorb the unique magic of each distinct Sri Lankan province.",
        highlights: ["Nuwara Eliya 'Little England' Tea Estates", "Weligama Beginner Surf Experience", "Bentota River Safari & Watersports", "Kandy Heritage & Spiritual Walk"],
        seoKeywords: "12 day Sri Lanka itinerary, Weligama surfing holiday, Nuwara Eliya tea plantation tour, Bentota beach resort package, long Sri Lanka vacation",
        itinerary: [
            {
                day: 1,
                title: "Arrival & Transfer to Sigiriya",
                description: "Upon arrival, you will be escorted away from the busy city and driven deep into the lush, green heart of the island. Settle into your luxurious jungle accommodation in the cultural triangle, spending your first evening acclimatizing to the tropical climate and the peaceful sounds of nature."
            },
            {
                day: 2,
                title: "Travel to Kandy – Hill Capital Experience",
                description: "Leave the dry plains of Sigiriya behind and begin the scenic ascent toward Kandy, the last royal stronghold of the Sinhalese Kings. The drive is punctuated by stunning mountain views, roadside fruit stalls, and an ever-cooling climate as you rise in elevation."
            },
            {
                day: 3,
                title: "Full Day Exploring Kandy's Hidden Gems",
                description: "Enjoy a completely relaxed day in the cultural city of Kandy. Explore the tranquil pathways surrounding the Kandy Lake, dive deep into the bustling, colorful heritage markets in the city center, and discover the deep religious significance of the surrounding ancient temples at your own leisurely pace."
            },
            {
                day: 4,
                title: "Journey to Nuwara Eliya – The 'Little England'",
                description: "Travel through unbelievably green, manicured tea estates and mist-covered hills to reach Nuwara Eliya, situated at an altitude of 1,868 meters. Enjoy the surprisingly cool, crisp climate, the charming British colonial architecture, the perfectly kept golf courses, and the vibrant flower gardens of this unique mountain town."
            },
            {
                day: 5,
                title: "Scenic Transfer to Ella",
                description: "Descend slowly from the high peaks of Nuwara Eliya into the backpacker haven of Ella. The journey offers dramatic, sweeping views of deep valleys, cascading waterfalls pouring down mountain faces, and the relaxing, bohemian village vibes that make Ella globally famous."
            },
            {
                day: 6,
                title: "Free Day in Ella's Mountain Paradise",
                description: "Spend the entire day exploring Ella exactly as you wish. Hike through the tea trails, visit the hidden cafes serving world-class local coffee and cuisine, or simply sit on your balcony and stare out at the mesmerizing natural scenery that surrounds this idyllic mountain retreat."
            },
            {
                day: 7,
                title: "Transfer to Yala – The Wild Escape",
                description: "Leave the mountains behind and travel to the deep south. Arrive at Yala, checking into a beautiful, nature-immersed lodge located near the boundaries of the National Park. Spend the afternoon enjoying the raw, natural environment, keeping an eye out for exotic birds and roaming wildlife near your accommodation."
            },
            {
                day: 8,
                title: "Coastal Drive to Weligama Bay",
                description: "Trade the jungle for the ocean. Head westward along the stunning southern coast until you arrive in Weligama, a vibrant, crescent-shaped bay famous worldwide for its reliable, beginner-friendly surfing waves. Spend the afternoon relaxing on the beach, watching the surfers, or exploring the lively beachside town."
            },
            {
                day: 9,
                title: "Galle Heritage & Architectural Experience",
                description: "Travel a short distance to the historic city of Galle. Spend the day discovering its incredibly charming, narrow cobblestone streets, marveling at the perfectly preserved Dutch colonial architecture, and enjoying the sophisticated coastal beauty and high-end dining options within the fort walls."
            },
            {
                day: 10,
                title: "Beach Stay in Luxurious Bentota",
                description: "Move further up the west coast to Bentota, a town internationally renowned for its wide, golden beaches and the calm, lagoon-like waters of the Bentota River. Enjoy a completely relaxing day by the coast, soaking in the sun and indulging in fresh, local seafood."
            },
            {
                day: 11,
                title: "Travel to Colombo's Urban Chaos",
                description: "Arrive back in Colombo, Sri Lanka’s sprawling, modern capital. Experience the fascinating juxtaposition of ancient temples standing next to modern glass skyscrapers, wander through bustling street markets, and dive into the city's incredible culinary and urban lifestyle."
            },
            {
                day: 12,
                title: "Departure",
                description: "Conclude your epic 12-day island journey. Enjoy a final morning at your leisure before a comfortable transfer to the airport for your departure flight, bringing an end to an unforgettable Sri Lankan adventure.",
                included: "Final Gourmet Breakfast, Private VIP Airport Transfer"
            }
        ]
    },
    {
        id: "14-day-ultimate-journey",
        title: "14-Day Ultimate Sri Lanka Journey: Culture, Nature & Coastal Bliss",
        slug: "14-day-ultimate-sri-lanka-culture-nature-coastal",
        route: "Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → Hiriketiya → Galle → Bentota",
        price: 1350,
        description: "Discover the absolute best of Sri Lanka over two weeks – Sigiriya adventures, Kandy traditions, breathtaking hill-country beauty, Yala wildlife, and stunning, hidden southern beaches.",
        longDescription: "The Ultimate 14-Day Journey is the pinnacle of two-week itineraries, meticulously designed by travel experts to ensure zero travel fatigue while covering maximum ground. This tour seamlessly connects the most famous, iconic locations of the cultural triangle with incredibly trendy, hidden coastal gems like the horseshoe bay of Hiriketiya and the towering waterfalls of Ramboda. You will experience luxury, raw wilderness, deep spirituality, adrenaline-pumping water sports, and profound relaxation, making this the most comprehensive and satisfying two-week vacation possible on the island.",
        highlights: ["Yala Elephant & Leopard Safari", "Hiriketiya Hidden Surf Bay", "Bentota River Safari & Water Thrills", "Colombo Tuk-Tuk City Safari"],
        seoKeywords: "14 day Sri Lanka tour package, Hiriketiya beach holiday, Bentota water sports adventure, comprehensive Sri Lanka itinerary, two weeks in Sri Lanka",
        itinerary: [
            {
                day: 1,
                title: "Arrival & Transfer to the Cultural Triangle",
                description: "Begin your ultimate journey right in the cultural and historical heart of Sri Lanka. After a warm airport welcome, settle into your jungle retreat in Sigiriya, enjoying the peaceful, ancient surroundings as your massive island adventure officially begins."
            },
            {
                day: 2,
                title: "Sigiriya Nature, Safari & Village Experience",
                description: "Discover the deep-rooted traditions and natural beauty of rural Sri Lanka. Engage with authentic local experiences, take a thrilling 4x4 safari through Minneriya to see hundreds of elephants, and enjoy outdoor adventures in the shadow of the Lion Rock.",
                included: "Full Wildlife Safari, Immersive Village Tour, Elephant Ride Experience",
                highlight: "Visit to the Herbal and Spicy Educational Garden (Free of charge)"
            },
            {
                day: 3,
                title: "Travel to Kandy – The Cultural Capital",
                description: "Leave the dry plains of Sigiriya and journey upward to the hill capital of Kandy, a city completely surrounded by towering mountains, dense forests, and an incredibly rich, royal heritage.",
                included: "VIP Kandyan Dance Show Tickets, Pinnawala Elephant Orphanage Visit",
                highlight: "Guided Visit to a Local Gem Museum & Lapidary (Free of charge)"
            },
            {
                day: 4,
                title: "Full Day in Kandy's Royal Precincts",
                description: "Explore the historic city at your own, unhurried pace. Visit the vibrant, bustling local markets, take a serene walk around the Kandy lake area, and enjoy the refreshing, cool climate of this globally recognized cultural hub.",
                included: "Comprehensive Kandy City Tour",
                highlight: "Spiritual exploration of the Sacred City"
            },
            {
                day: 5,
                title: "Journey to Nuwara Eliya – The Little England",
                description: "Travel higher into the sky through endless, rolling, tea-covered hills and misty, dramatic landscapes to reach Nuwara Eliya. This town is famous for its distinctly cool climate, colonial British charm, and world-class tea production.",
                highlight: "Guided Tea Factory Tour & Tasting (Free of charge), Ramboda Waterfall Visit"
            },
            {
                day: 6,
                title: "Scenic Transfer to Ella's Peaks",
                description: "Head towards the backpacker paradise of Ella, a small mountain town filled with breathtaking, sweeping valley views, crisp, fresh air, and a remarkably relaxed, bohemian village vibe that captivates every traveler."
            },
            {
                day: 7,
                title: "Explore Ella – Epic Hills & Waterfalls",
                description: "Discover some of Ella's absolute most iconic attractions. Stand in awe at the architectural marvel of the Nine Arches Bridge hidden in the jungle, and feel the spray of the towering Rawana Waterfall, all surrounded by lush, vibrant greenery.",
                included: "Nine Arches Bridge Jungle Trek, Rawana Waterfall Excursion"
            },
            {
                day: 8,
                title: "Transfer to Yala – The Wildlife Region",
                description: "Travel down to the deep south to Yala for a peaceful, secluded stay near the borders of the famous national park. Here, you are completely surrounded by raw nature and the untamed Sri Lankan wilderness.",
                included: "Comprehensive 4x4 Jeep Safari with Expert Wildlife Tracker"
            },
            {
                day: 9,
                title: "Relax in Hiriketiya – The Hidden Beach Escape",
                description: "Arrive at the stunning, laid-back coastal horseshoe bay of Hiriketiya. This hidden gem is famous for its turquoise waters, excellent surfing waves, and incredibly peaceful bay. Enjoy the calm surroundings and just completely relax."
            },
            {
                day: 10,
                title: "Galle Heritage Walk & Sunset",
                description: "Move further up the coast to the historic city of Galle. Spend hours exploring its historical charm, walking down the narrow, colonial-era streets lined with yellow-washed buildings, and soaking in the unique, artistic coastal atmosphere.",
                included: "Guided Visit to the Galle Dutch Fort & Ramparts"
            },
            {
                day: 11,
                title: "Bentota – Beach & Adrenaline Water Thrills",
                description: "Arrive in Bentota, a town renowned for its incredibly beautiful, wide beaches and its highly developed, adventure-friendly river and ocean environment. Get ready for an adrenaline rush.",
                included: "Comprehensive Water Activities & River Safari Packages"
            },
            {
                day: 12,
                title: "Leisure Day in Tropical Bentota",
                description: "Spend a full, uninterrupted day lounging by the beach, swimming in the warm Indian ocean, exploring the local coastal area, or simply enjoying the deeply calming, tropical environment of your luxury resort."
            },
            {
                day: 13,
                title: "Arrival in Colombo – The Urban Experience",
                description: "Travel to Colombo, the modern, beating heart and vibrant capital of the island. Navigate the crazy traffic and discover hidden city secrets like a true local.",
                included: "Exciting Colombo City Tour navigated by an authentic local Tuk-Tuk"
            },
            {
                day: 14,
                title: "Departure & Farewell",
                description: "Your incredible 14-day journey concludes with a smooth, hassle-free luxury transfer to the airport, ensuring you carry home a lifetime of unforgettable, diverse memories from all around the island of Sri Lanka.",
                included: "Final Gourmet Breakfast, Private VIP Airport Transfer"
            }
        ]
    },
    {
        id: "21-day-complete-round-tour",
        title: "21-Day Complete Sri Lanka Round Tour: The Ultimate Island Expedition",
        slug: "21-day-complete-sri-lanka-round-tour-all-island",
        route: "Wilpattu → Jaffna → Trinco → Sigiriya → Kandy → Ella → Arugam Bay → Yala → Galle",
        price: 1950,
        description: "Travel across the entirety of Sri Lanka in 21 spectacular days, exploring deep wildlife, ancient northern cities, hill-country beauty, stunning eastern beaches, and vibrant urban centers.",
        longDescription: "This is the most comprehensive, sweeping tour currently available on the market. For the true, dedicated explorer, this 21-day grand expedition leaves absolutely no stone unturned. You will journey far off the beaten path to places where few tourists venture—including the war-healed, deeply cultural northern peninsula of Jaffna, and the untouched, pristine white sands of Trincomalee and Pasikudah in the East. You will marvel at the monumental ancient ruins of Anuradhapura and Polonnaruwa, immerse yourself in the laid-back surf culture of Arugam Bay, and track rare bears in the deep, silent jungles of Wilpattu. This is not just a standard holiday; it is a profound, life-changing journey through the entire soul, history, and geography of the island.",
        highlights: ["Jaffna Nallur Kovil & Northern Culture", "Trincomalee Marine Life & Beaches", "Arugam Bay Surf Lifestyle", "Wilpattu Sloth Bear & Leopard Safari"],
        seoKeywords: "21 day Sri Lanka round tour, Jaffna complete travel guide, Trincomalee Nilaveli beach holiday, Wilpattu national park safari, Arugam Bay surfing, one month in Sri Lanka",
        itinerary: [
            {
                day: 1,
                title: "Wilpattu Safari Adventure",
                description: "Begin your epic journey with an incredibly exciting visit to Wilpattu National Park, Sri Lanka's oldest, largest, and arguably most beautiful wildlife sanctuary. Experience the unparalleled thrill of exploring a vast, silent wilderness filled with natural 'villu' lakes, dense forests, and highly diverse wildlife including the elusive sloth bear.",
                included: "Full-Day Comprehensive Wildlife Safari"
            },
            {
                day: 2,
                title: "Sacred Anuradhapura Ancient City",
                description: "Explore the massive, ancient Sacred City of Anuradhapura, a highly protected UNESCO World Heritage Site that reflects the deep, profound spiritual and cultural roots of Sri Lanka, dating back thousands of years.",
                included: "Guided Visit to the Sacred City of Anuradhapura and major Stupas"
            },
            {
                day: 3,
                title: "Discovering the Mysteries of Jaffna",
                description: "Travel far north to Jaffna, a resilient city completely full of unique history, distinct culture, and rugged coastal beauty. Experience the incredibly vibrant northern Tamil traditions, taste the famous spicy crab curry, and enjoy an atmosphere unlike anywhere else on the island."
            },
            {
                day: 4,
                title: "Relaxing in Trincomalee's Blue Bays",
                description: "Head east from the northern tip to the sunny, pristine beaches of Trincomalee, where impossibly blue seas and soft golden sands await. This area is absolutely perfect for deep relaxation, swimming, and exploring vibrant coral marine life."
            },
            {
                day: 6,
                title: "Peaceful Pasikudah Shallow Waters",
                description: "Spend a completely calm and refreshing day in Pasikudah, a bay known worldwide for its incredibly shallow, crystal-clear waters and soft sandy beaches. You can wade hundreds of meters into the ocean—ideal for a relaxing morning by the sea.",
                highlight: "Exclusive Sunrise Ocean View Experience"
            },
            {
                day: 7,
                title: "Sigiriya, Polonnaruwa & Cultural Heritage",
                description: "Travel inland from the coast to the cultural triangle. Explore the medieval ruins of the Sacred City of Polonnaruwa on the way from Pasikudah, before arriving at Sigiriya, one of Sri Lanka's most iconic, towering landmarks.",
                included: "Sacred City of Polonnaruwa Entry, Additional Wildlife Safari",
                highlight: "Visit Sigiriya Rock Fortress, Dambulla Cave Temple, Herbal and Spice Garden"
            },
            {
                day: 9,
                title: "Cultural Kandy Immersion",
                description: "Discover the undeniable charm of Kandy, the cultural capital of the island, completely surrounded by misty hills, serene lakes, and incredible scenic beauty.",
                highlight: "Educational Gem Museum Tour, Traditional Kandyan Fire Dance"
            },
            {
                day: 11,
                title: "Nuwara Eliya Highlands & World's End",
                description: "Journey high into the mountains to Nuwara Eliya, famously known as the 'Little England' of Sri Lanka. Experience the biting cool mountain air, endless rolling green tea plantations, and undertake the thrilling trek to the sheer cliff known as World's End.",
                included: "Guided Visit to World's End in Horton Plains National Park"
            },
            {
                day: 12,
                title: "Ella's Breathtaking Scenic Beauty",
                description: "Enjoy relaxing days in Ella, universally considered one of Sri Lanka's most picturesque, vibrant mountain towns, entirely surrounded by sheer tea hills, plunging valleys, and towering waterfalls."
            },
            {
                day: 14,
                title: "Restful Arugam Bay Surf Culture",
                description: "Spend the day completely unwinding at Arugam Bay on the East Coast, a peaceful coastal haven internationally known for its world-class, surf-friendly waves and incredibly relaxed, bohemian beach vibe."
            },
            {
                day: 15,
                title: "Wildlife at Yala National Park",
                description: "Experience raw nature at its absolute finest in Yala National Park, famous globally for its extremely dense population of leopards, massive elephants, and incredible, diverse biodiversity.",
                highlight: "Intensive 4x4 Leopard Tracking Safari"
            },
            {
                day: 16,
                title: "Calm Shores of Hidden Hiriketiya",
                description: "Relax at Hiriketiya Beach, a stunning, hidden horseshoe-shaped gem with crystal-clear turquoise waters and lush, overarching palm groves—perfect for swimming, surfing, or sipping coconuts on the sand."
            },
            {
                day: 17,
                title: "Galle's Colonial Architectural Beauty",
                description: "Walk through hundreds of years of history at the Galle Fort, a beautifully preserved UNESCO World Heritage Site filled to the brim with colonial charm, boutique art galleries, and sweeping ocean views.",
                highlight: "Visit the local Gem Mining Industry for a live, interactive experience"
            },
            {
                day: 19,
                title: "Beachside Fun in Tropical Bentota",
                description: "Unwind on the wide beaches of Bentota, a highly popular western beach destination known equally for its relaxing golden sands and its high-adrenaline water sports and winding river adventures.",
                highlight: "Adrenaline-Pumping Water Sports Activities"
            },
            {
                day: 20,
                title: "Explore Colombo by Local Tuk-Tuk",
                description: "End your massive journey in Colombo, Sri Lanka's lively, chaotic, and beautiful capital city. Discover its fascinating mix of crumbling colonial heritage, modern luxury lifestyle, and incredibly vibrant street markets.",
                included: "Comprehensive Colombo City Tour via authentic Tuk-Tuk"
            },
            {
                day: 21,
                title: "Final Departure",
                description: "Bid a heartfelt farewell to the paradise island, taking with you an incredible wealth of memories of diverse culture, thrilling wildlife, and breathtaking landscapes that make Sri Lanka truly, uniquely special.",
                included: "Final Gourmet Breakfast, Private VIP Airport Transfer"
            }
        ]
    },
    {
        id: "downsouth-beach-wildlife",
        title: "DownSouth Tour: Ultimate Beaches, Wildlife & Surf Adventure",
        slug: "downsouth-tour-mirissa-yala-galle-surfing-safari",
        route: "Yala → Tangalle → Mirissa → Weligama → Galle → Hikkaduwa → Bentota",
        price: 650,
        description: "Explore the sun-drenched southern coast with thrilling Yala safaris, magical turtle watching in Mirissa, and world-class surfing in Weligama.",
        longDescription: "This specialized tour focuses purely and exclusively on the vibrant, sun-soaked southern coast of Sri Lanka. Perfect for beach lovers, surfers, and wildlife enthusiasts, this itinerary skips the central mountains and cultural triangle to deliver a pure, unadulterated tropical vacation. You will transition from tracking apex predators on world-class safaris in Yala, to witnessing the magic of turtle conservation in Kosgoda, riding the beginner-friendly waves of Weligama, and experiencing the legendary, vibrant beach nightlife of Hikkaduwa. This is the ultimate sun, sand, and sea getaway.",
        highlights: ["Yala Deep Jungle Full-Day Safari", "Mirissa Marine Turtle Watching", "Weligama Professional Surf Lesson", "Kosgoda Marine Conservation"],
        seoKeywords: "DownSouth Sri Lanka tour, Mirissa turtle watching, Weligama beginner surfing, Yala national park safari, southern coast Sri Lanka itinerary, Hikkaduwa beach vacation",
        itinerary: [
            {
                day: 1,
                title: "Arrival & Fast Transfer to Yala",
                description: "Bypass the busy city and travel rapidly down the southern expressway directly to Yala, one of Sri Lanka’s absolute top wildlife destinations. Settle into your luxurious jungle stay and prepare your cameras for the next day’s intense adventure."
            },
            {
                day: 2,
                title: "Yala Epic Full-Day Safari",
                description: "Spend an entire, grueling but incredibly rewarding full day inside Yala National Park, exploring its highly diverse wildlife, dense forests, ancient lakes, and wide open grasslands in search of the elusive Sri Lankan leopard.",
                included: "Exclusive Full-Day Safari with Pack Lunch"
            },
            {
                day: 3,
                title: "Transfer to Tranquil Tangalle",
                description: "Leave the deep jungle and head to Tangalle, a southern coastal town famous for having some of the most quiet, unspoiled beaches, stunning golden sands, and deeply peaceful coastal scenery on the entire island."
            },
            {
                day: 4,
                title: "Mirissa Beach & Marine Life Stay",
                description: "Enjoy relaxing days in Mirissa, an incredibly beautiful, palm-fringed bay that is absolutely perfect for safe swimming, watching spectacular sunsets, and enjoying chilled, music-filled evenings on the sand.",
                included: "Exclusive Marine Turtle Watching Experience"
            },
            {
                day: 6,
                title: "Weligama Surf Experience",
                description: "Arrive in the bustling, youthful town of Weligama, universally recognized as the absolute best beginner-friendly surf bay in Sri Lanka, featuring long, rolling, sandy-bottom waves.",
                included: "Professional 1-on-1 Surf Lesson with Equipment"
            },
            {
                day: 7,
                title: "Ahangama Laid-back Coastal Vibes",
                description: "Travel a short distance to Ahangama, a slightly more calm, hipster-friendly surf town known for its highly relaxed, uncrowded beaches, excellent modern cafés, and stunning, mirror-like lagoon views."
            },
            {
                day: 8,
                title: "Galle Fort Coastal Charm",
                description: "Explore the heavily fortified city of Galle, a stunning UNESCO World Heritage Site famous globally for its massive Dutch Fort, narrow colonial-era streets, and sweeping, panoramic ocean views from the ancient stone ramparts."
            },
            {
                day: 9,
                title: "Kosgoda Turtle Conservation Initiative",
                description: "Visit the vital coastal town of Kosgoda, known for its critical turtle conservation centers and hatcheries, as well as its remarkably quiet, undisturbed beachfront atmosphere.",
                included: "Interactive Turtle Hatchery & Conservation Visit",
                highlight: "Hands-on Turtle Conservation Education"
            },
            {
                day: 11,
                title: "Bentota River & Ocean Water Adventures",
                description: "Visit Bentota, the water sports capital of the island, for high-speed water adventures including thrilling river boat safari rides through the mangroves, jet skiing, and ultimate beach relaxation.",
                included: "Premium Beach Club Access",
                highlight: "Madu River Mangrove Boat Safari Rides"
            },
            {
                day: 12,
                title: "Hikkaduwa Vibrant Beach Life",
                description: "Spend time in the legendary beach town of Hikkaduwa, enjoying excellent shallow-water snorkeling, vibrant beach activities, and incredible views of the near-shore coral reefs.",
                included: "Guided Galle Dutch Fort Historical Visit"
            },
            {
                day: 14,
                title: "Final Coastal Stay & Departure",
                description: "End your incredible southern journey by relaxing on the beautiful, wide Bentota coast before enjoying a fast, comfortable transfer back up the highway to the airport for your flight home.",
                included: "Private VIP Airport Transfer via Expressway"
            }
        ]
    }
];
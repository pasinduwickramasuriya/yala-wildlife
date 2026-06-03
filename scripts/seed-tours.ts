import prisma from "../src/lib/prisma";
import { tourPackages } from "../src/data/tours";

async function seedTours() {
  try {
    console.log("Starting to seed tours from static data...");

    // Standard high-quality default images for the tours
    const tourImages: { [key: string]: string } = {
      "5-day-sri-lanka-escape": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
      "8-day-sri-lankan-wonders": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg",
      "12-day-grand-discovery": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png",
      "14-day-ultimate-journey": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
      "21-day-complete-round-tour": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png",
      "downsouth-beach-wildlife": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg"
    };

    // Standard realistic inclusions and exclusions
    const defaultInclusions = [
      "Private air-conditioned luxury vehicle",
      "English-speaking licensed chauffeur guide",
      "All fuel, highway toll charges, and parking fees",
      "Airport pick-up and drop-off transfers",
      "All accommodation on Bed & Breakfast basis",
      "Complimentary bottled drinking water during tours",
      "24/7 travel support during the entire journey"
    ];

    const defaultExclusions = [
      "International flights and Sri Lankan entry visa fees",
      "Entrance tickets to sightseeing sites & national parks",
      "Lunch & dinner meals (unless specified)",
      "Camera & video permit charges at historical sites",
      "Personal expenses (laundry, telephone calls, drinks)",
      "Tips and gratuities for driver-guide & hotel staff"
    ];

    for (const staticTour of tourPackages) {
      // Check if tour already exists
      const existing = await prisma.tour.findUnique({
        where: { slug: staticTour.slug }
      });

      if (existing) {
        console.log(`Tour already exists: ${staticTour.title} (Skipping)`);
        continue;
      }

      const durationDays = staticTour.itinerary.length;
      const durationText = `${durationDays} Days / ${durationDays - 1} Nights`;
      const imageUrl = tourImages[staticTour.id] || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg";

      // Map itinerary days correctly
      const mappedItinerary = staticTour.itinerary.map(item => ({
        day: Number(item.day),
        title: String(item.title),
        description: String(item.description),
        included: item.included ? String(item.included) : null,
        highlight: item.highlight ? String(item.highlight) : null
      }));

      // Create record
      const createdTour = await prisma.tour.create({
        data: {
          title: staticTour.title,
          slug: staticTour.slug,
          route: staticTour.route,
          price: Number(staticTour.price),
          duration: durationText,
          imageUrl: imageUrl,
          isFeatured: staticTour.id.includes("8-day") || staticTour.id.includes("14-day"), // Set popular ones as featured
          description: staticTour.description,
          longDescription: staticTour.longDescription,
          highlights: staticTour.highlights,
          inclusions: defaultInclusions,
          exclusions: defaultExclusions,
          itinerary: mappedItinerary,
          seoKeywords: staticTour.seoKeywords
        }
      });

      console.log(`Successfully seeded tour: ${createdTour.title}`);
    }

    console.log("Tours seeding finished successfully!");
  } catch (error) {
    console.error("Error seeding tours:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTours();

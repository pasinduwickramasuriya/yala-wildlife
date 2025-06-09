import { siteConfig } from "@/lib/seo-config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
  /** Optional category or section name for the FAQs */
  category?: string;
}

export function FAQJsonLd({ faqs, category }: FAQJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: category
      ? `${category} - Frequently Asked Questions`
      : "Frequently Asked Questions",
    description:
      "Find answers to frequently asked questions about Yala Wildlife safaris and tours.",
    url: `${siteConfig.url}/faq`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

// Example FAQ data
export const defaultFAQs: FAQItem[] = [
  {
    question: "What is the best time to visit Yala National Park?",
    answer:
      "The best time to visit Yala National Park is during the dry season from February to July. During these months, wildlife tends to gather around water holes, making them easier to spot. Morning safaris (6:00 AM) offer the best wildlife viewing opportunities.",
  },
  {
    question: "How long does a typical safari tour last?",
    answer:
      "Our safari tours typically last 3-4 hours for half-day tours and 6-7 hours for full-day tours. Morning safaris start at 6:00 AM, and evening safaris begin at 2:30 PM. We ensure optimal timing for wildlife spotting.",
  },
  {
    question: "What animals can I expect to see in Yala?",
    answer:
      "Yala is famous for having the world's highest density of leopards. You can also spot Asian elephants, sloth bears, crocodiles, peacocks, and over 215 bird species. Our experienced guides know the best locations for wildlife spotting.",
  },
  {
    question: "Do you provide pickup from hotels?",
    answer:
      "Yes, we provide complimentary pickup and drop-off services from hotels in the Yala area. For locations outside Yala, additional charges may apply based on distance. We can arrange pickups from Tissamaharama, Kataragama, and other nearby areas.",
  },
  {
    question: "What should I bring for the safari?",
    answer:
      "We recommend bringing: 1) Comfortable, neutral-colored clothing 2) Sun protection (hat, sunscreen) 3) Insect repellent 4) Camera with zoom lens 5) Water bottle. We provide binoculars, refreshments, and a first-aid kit during the safari.",
  },
  {
    question: "Are your safari vehicles comfortable and safe?",
    answer:
      "Yes, our jeeps are specially modified for safari tours with comfortable seating, safety features, and excellent visibility. Each vehicle undergoes regular maintenance and is equipped with first-aid kits and communication devices.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer full refunds for cancellations made 48 hours before the safari. Cancellations within 24-48 hours receive a 50% refund. We also offer free rescheduling options subject to availability.",
  },
  {
    question: "Do you have experienced guides?",
    answer:
      "All our guides are certified professionals with extensive knowledge of Yala's wildlife and terrain. They speak fluent English and have years of experience in tracking and spotting wildlife while ensuring visitor safety.",
  },
];

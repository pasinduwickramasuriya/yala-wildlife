import { siteConfig } from "@/lib/seo-config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

// Example FAQ data
export const defaultFAQs: FAQItem[] = [
  {
    question: "What is the best time to visit Yala National Park?",
    answer:
      "The best time to visit Yala National Park is during the dry season from February to July. During these months, wildlife tends to gather around water holes, making them easier to spot.",
  },
  {
    question: "How long does a typical safari tour last?",
    answer:
      "Our safari tours typically last 3-4 hours for half-day tours and 6-7 hours for full-day tours. Morning safaris start at 6:00 AM, and evening safaris begin at 2:30 PM.",
  },
  {
    question: "What animals can I expect to see in Yala?",
    answer:
      "Yala is famous for its leopard population, but you can also spot elephants, sloth bears, crocodiles, various species of birds, and if lucky, you might see bears and other rare wildlife.",
  },
  {
    question: "Do you provide pickup from hotels?",
    answer:
      "Yes, we provide complimentary pickup and drop-off services from hotels in the Yala area. For locations outside Yala, additional charges may apply.",
  },
  {
    question: "What should I bring for the safari?",
    answer:
      "We recommend bringing comfortable clothing, sun protection (hat, sunscreen), insect repellent, camera, and water. We provide binoculars and refreshments during the safari.",
  },
];

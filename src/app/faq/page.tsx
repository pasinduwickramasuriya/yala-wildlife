import { Metadata } from "next";
import SEOContentBlock from "@/components/SEOContentBlock";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Yala Wildlife Safari",
  description:
    "Common questions about Yala safari tours, wildlife spotting, booking process, and park visits. Get expert answers from Yala's leading safari service.",
  openGraph: {
    title: "Frequently Asked Questions - Yala Wildlife Safari",
    description:
      "Common questions about Yala safari tours, wildlife spotting, booking process, and park visits. Get expert answers from Yala's leading safari service.",
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the best time to visit Yala National Park?",
    answer:
      "The best time to visit Yala National Park is during the dry season from February to July. Early morning (6 AM) and late afternoon (3 PM) safari tours offer the best wildlife sighting opportunities.",
    category: "Planning",
  },
  {
    question: "What animals can I expect to see in Yala?",
    answer:
      "Yala is home to various wildlife including leopards, elephants, sloth bears, crocodiles, and numerous bird species. While wildlife sightings cannot be guaranteed, our experienced guides know the best spots for animal viewing.",
    category: "Wildlife",
  },
  {
    question: "How long does a typical safari tour last?",
    answer:
      "Our standard safari tours last about 3-4 hours. We also offer full-day safaris and custom packages based on your preferences.",
    category: "Tours",
  },
  {
    question: "What should I bring for the safari?",
    answer:
      "We recommend bringing comfortable clothing, sun protection (hat, sunscreen), insect repellent, camera, and water. Our vehicles are equipped with basic necessities.",
    category: "Preparation",
  },
  {
    question: "How do I book a safari tour?",
    answer:
      "You can book directly through our website, email, or phone. We recommend booking at least a few days in advance, especially during peak season.",
    category: "Booking",
  },
  {
    question: "Are your safari vehicles comfortable?",
    answer:
      "Yes, we use modern, well-maintained 4x4 jeeps with comfortable seating, shade coverage, and safety features. All vehicles are regularly serviced.",
    category: "Vehicles",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We offer full refunds for cancellations made 48 hours before the scheduled tour. Cancellations within 24 hours may be subject to a fee.",
    category: "Booking",
  },
  {
    question: "Do you provide food and drinks during the safari?",
    answer:
      "We provide complimentary water, and depending on your package, we can arrange meals or snacks. Please let us know your preferences when booking.",
    category: "Services",
  },
];

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const keywords = [
    "yala safari faq",
    "yala national park questions",
    "safari booking guide",
    "yala wildlife tours",
    "best time to visit yala",
    "safari preparation guide",
  ];

  const relatedLinks = [
    {
      title: "Safari Packages",
      href: "/safari-packages",
    },
    {
      title: "Wildlife Blog",
      href: "/blog",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEOContentBlock
        title="Frequently Asked Questions"
        description="Find answers to common questions about Yala safari tours, wildlife spotting, booking process, and park visits. Get expert guidance for your wildlife adventure."
        keywords={keywords}
        relatedLinks={relatedLinks}
      />

      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {category}
            </h2>
            <div className="space-y-6">
              {faqs
                .filter((faq) => faq.category === category)
                .map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}

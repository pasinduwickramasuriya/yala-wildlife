import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import { Mail, Phone, MapPin } from "lucide-react";

// ✅ SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ SEO-ENHANCED: Contact page metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Contact Yala Safari Tours | Book Your Wildlife Adventure Now",
  description: "Contact Yala Wildlife Safari for bookings and inquiries. Expert guides, guaranteed leopard sightings, luxury jeeps. Call +94-778-158-004 or email us today!",

  keywords: [
    "contact yala safari",
    "yala safari jeep",
    "yala national park",
    "yala safari national park",
    "book yala safari",
    "yala safari contact number",
    "yala safari booking",
    "yala safari phone number",
    "yala safari email",
    "yala safari tissamaharama contact",
    "sri lanka safari booking",
    "yala wildlife contact",
    "safari tours contact sri lanka",
    "yala national park booking",
    "wildlife safari contact",
    "yala safari reservation",
    "contact yala tours",
    "safari guide contact yala",
    "yala jeep safari booking",
    "private safari booking yala",
    "luxury safari contact yala",
    "yala safari customer service",
    "wildlife tours sri lanka contact"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Contact Information, Safari Booking, Yala Tours",
    "DC.description": "Contact Yala Wildlife Safari for expert-guided tours, luxury jeep services, and guaranteed wildlife sightings",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.type": "Contact Page, Tourism Service",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/contact`,
    "DC.language": "en",
    "business:contact_data:street_address": "Wickrama Kasingama, Tissamaharama Road",
    "business:contact_data:locality": "Tissamaharama",
    "business:contact_data:region": "Southern Province",
    "business:contact_data:postal_code": "82600",
    "business:contact_data:country_name": "Sri Lanka",
    "business:contact_data:phone_number": "+94-778-158-004",
    "business:contact_data:email": "pasindusadanjana17@gmail.com",
    "business:contact_data:website": BASE_URL,
    "robots": "index, follow, max-image-preview:large",
    "googlebot": "index, follow, max-image-preview:large",
  },

  openGraph: {
    type: "website",
    title: "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Guaranteed leopard sightings, luxury jeeps, professional guides. Book your adventure today!",
    url: `${BASE_URL}/contact`,
    siteName: "Yala Wildlife Safari",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/contact-yala-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Yala Wildlife Safari for Expert Tours",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Contact Yala Safari Tours | Book Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Call +94-778-158-004 or email for bookings.",
    images: {
      url: `${BASE_URL}/contact-yala-safari.jpg`,
      alt: "Contact Yala Wildlife Safari",
    },
  },

  alternates: {
    canonical: `${BASE_URL}/contact`,
  },

  applicationName: "Yala Wildlife Safari",
  category: "Travel & Tourism",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      {/* ✅ REMOVED: All borders and background colors */}
      <main className="min-h-screen text-foreground" role="main" aria-labelledby="contact-title">

        {/* ✅ REMOVED: All borders from breadcrumb */}
        {/* <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
          <div className="container max-w-5xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-green-600 hover:text-green-500 hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium">Contact</li>
            </ol>
          </div>
        </nav> */}

        <section className="py-16 px-4 md:px-6">
          <div className="container max-w-5xl mx-auto">

            {/* ✅ REMOVED: All borders from header */}
            <header className="text-center mb-12">
              <h1
                id="contact-title"
                className="text-3xl md:text-4xl font-extrabold text-green-600 mb-6 tracking-tight"
              >
                Contact Yala Safari Tours - Book Your Wildlife Adventure
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to experience the world&apos;s highest leopard density? Contact our expert guides for personalized Yala National Park safari tours with guaranteed wildlife sightings.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* ✅ REMOVED: All borders from contact section */}
              <div className="space-y-8">

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Get In Touch - Book Your Yala Safari Experience
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Have questions about our safari packages, pricing, or availability? Our experienced team is here to help you plan the perfect Yala National Park adventure with guaranteed leopard and elephant sightings.
                  </p>
                </div>

                {/* ✅ REMOVED: All borders from contact cards */}
                <address className="not-italic space-y-6">

                  {/* Email Contact - No Borders */}
                  <div className="flex items-start gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow">
                    <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Email Us for Safari Bookings</h3>
                      <p className="text-muted-foreground mb-2">Get detailed information about our safari packages</p>
                      <a
                        href="mailto:pasindusadanjana17@gmail.com?subject=Yala Safari Booking Inquiry"
                        className="text-green-600 hover:text-green-500 hover:underline font-medium transition-colors"
                        aria-label="Send email to Yala Wildlife Safari"
                      >
                        pasindusadanjana17@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Contact - No Borders */}
                  <div className="flex items-start gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Call for Immediate Booking</h3>
                      <p className="text-muted-foreground mb-2">Speak directly with our safari experts</p>
                      <a
                        href="tel:+94778158004"
                        className="text-green-600 hover:text-green-500 hover:underline font-medium text-xl transition-colors"
                        aria-label="Call Yala Wildlife Safari"
                      >
                        +94 778 158 004
                      </a>
                    </div>
                  </div>

                  {/* Location Contact - No Borders */}
                  <div className="flex items-start gap-4 p-6 rounded-lg hover:shadow-lg transition-shadow">
                    <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Visit Our Safari Base</h3>
                      <p className="text-muted-foreground mb-2">Located near Yala National Park entrance</p>
                      <address className="not-italic text-foreground leading-relaxed">
                        Yala Wildlife Safari<br />
                        Wickrama Kasingama<br />
                        Tissamaharama<br />
                        Southern Province, Sri Lanka
                      </address>
                    </div>
                  </div>

                </address>

                {/* ✅ REMOVED: All borders from map section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Find Us Near Yala National Park</h3>
                  <div className="rounded-lg p-2">
                    <LocationMap />
                  </div>
                </div>
              </div>

              {/* ✅ REMOVED: All borders from contact form */}
              <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    Book Your Yala Safari Adventure
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 2 hours with available dates and pricing for your preferred safari experience.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* ✅ REMOVED: All borders from Why Choose Us section */}
            <section className="mt-16 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Why Choose Yala Wildlife Safari?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Expert Local Guides</h3>
                  <p className="text-muted-foreground">Professional naturalists with 10+ years experience in Yala National Park</p>
                </div>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Guaranteed Sightings</h3>
                  <p className="text-muted-foreground">World&apos;s highest leopard density ensures amazing wildlife encounters</p>
                </div>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Luxury Safari Vehicles</h3>
                  <p className="text-muted-foreground">Modern 4x4 jeeps with safety equipment and premium comfort</p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* ✅ SEO-ENHANCED: Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Yala Wildlife Safari",
            "description": "Contact information for Yala Wildlife Safari tours and bookings",
            "url": `${BASE_URL}/contact`,
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Yala Wildlife Safari",
              "image": `${BASE_URL}/yala-safari-office.jpg`,
              "telephone": "+94-778-158-004",
              "email": "pasindusadanjana17@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Wickrama Kasingama, Tissamaharama Road",
                "addressLocality": "Tissamaharama",
                "addressRegion": "Southern Province",
                "postalCode": "82600",
                "addressCountry": "LK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.3747,
                "longitude": 81.1185
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "06:00",
                  "closes": "20:00"
                }
              ],
              "serviceType": "Safari Tours",
              "areaServed": "Yala National Park, Sri Lanka"
            }
          }),
        }}
      />

      {/* ✅ SEO-ENHANCED: Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": `${BASE_URL}/contact`
              }
            ]
          }),
        }}
      />
    </>
  );
}

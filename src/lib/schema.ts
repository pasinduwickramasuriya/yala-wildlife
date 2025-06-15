interface Organization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

interface WebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

interface LocalBusiness {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  image: string;
  description: string;
  "@id": string;
  url: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  priceRange: string;
}

export const organizationSchema: Organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yala Wildlife Safari",
  "url": "https://yalawildlife.com",
  "logo": "https://yalawildlife.com/logo.png",
  "description": "Premier Yala National Park safari tours and jeep service provider in Sri Lanka",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Yala",
    "addressRegion": "Southern Province",
    "postalCode": "Your Postal Code",
    "addressCountry": "LK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "Your-Phone-Number",
    "contactType": "customer service",
    "availableLanguage": ["English", "Sinhala", "Tamil"]
  },
  "sameAs": [
    "https://facebook.com/yalawildlife",
    "https://instagram.com/yalawildlife",
    "https://twitter.com/yalawildlife"
  ]
};

export const websiteSchema: WebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yala Wildlife Safari",
  "url": "https://yalawildlife.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yalawildlife.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema: LocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Yala Wildlife Safari",
  "image": "https://yalawildlife.com/logo.png",
  "description": "Expert safari tours in Yala National Park with professional guides and luxury jeeps",
  "@id": "https://yalawildlife.com",
  "url": "https://yalawildlife.com",
  "telephone": "Your-Phone-Number",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Yala",
    "addressRegion": "Southern Province",
    "postalCode": "Your Postal Code",
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "YOUR_LATITUDE",
    "longitude": "YOUR_LONGITUDE"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "05:00",
    "closes": "19:00"
  },
  "priceRange": "$$"
};

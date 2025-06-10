// import { MetadataRoute } from 'next'
 
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: ['/admin/', '/api/'],
//     },
//     sitemap: 'https://yalawildlife.com/sitemap.xml',
//   }
// }



import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Primary rule for Googlebot (most important)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/_next/'],
      },
      
      // Rule for Bingbot
      {
        userAgent: 'Bingbot', 
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/_next/'],
      },

      // General rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/', 
          '/dashboard/',
          '/_next/',
          '/temp/',
          '/private/',
          '/test/',
        ],
      },

      // Block SEO crawlers that waste resources
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },

      // Allow social media bots
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
    ],
    sitemap: 'https://yalawildlife.com/sitemap.xml',
    host: 'https://yalawildlife.com',
  }
}

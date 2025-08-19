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



// import { MetadataRoute } from 'next'
 
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: '*',
//         allow: '/',
//         disallow: [
//           '/admin/*',
//           '/api/*',
//           '*/private/*',
//           '/internal/*',
//         ],
//       },
//       {
//         userAgent: 'Googlebot',
//         allow: '/',
//         crawlDelay: 2,
//       },
//       {
//         userAgent: 'Bingbot',
//         allow: '/',
//         crawlDelay: 2,
//       }
//     ],
//     sitemap: 'https://yalawildlife.com/sitemap.xml',
//     host: 'https://yalawildlife.com'
//   }
// }



import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '/*/private/*',
          '/internal/*',
          '/mobile/*',  // ✅ ADDED: Block mobile URLs from being crawled
          '/mobile',    // ✅ ADDED: Block mobile path specifically
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
        disallow: [
          '/admin/*',
          '/api/*',
          '/mobile/*',  // ✅ ADDED: Specifically block mobile for Google
          '/mobile',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 2,
        disallow: [
          '/admin/*',
          '/api/*',
          '/mobile/*',  // ✅ ADDED: Specifically block mobile for Bing
          '/mobile',
        ],
      }
    ],
    sitemap: 'https://www.yalawildlife.com/sitemap.xml',  // ✅ FIXED: Added www subdomain
    host: 'https://www.yalawildlife.com'  // ✅ FIXED: Added www subdomain for consistency
  }
}

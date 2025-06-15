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
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/*',
          '*/private/*',
          '/internal/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 2,
      }
    ],
    sitemap: 'https://yalawildlife.com/sitemap.xml',
    host: 'https://yalawildlife.com'
  }
}

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/incelemeler', '/incelemeler/'],
        disallow: [
          '/listeler/',
          '/bu-hafta/',
          '/iletisim/',
          '/private/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://mehmettemel.com/sitemap.xml',
  }
}

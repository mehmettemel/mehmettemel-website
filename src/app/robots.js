export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/reviews', '/reviews/'],
        disallow: [
          '/lists/',
          '/bu-hafta/',
          '/contact/',
          '/private/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://mehmettemel.com/sitemap.xml',
  }
}

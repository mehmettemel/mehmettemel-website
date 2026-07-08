export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/lists/',
          '/food/',
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

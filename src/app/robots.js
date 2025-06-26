export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
    ],
    sitemap: 'https://mehmettemel.com/sitemap.xml',
  }
}

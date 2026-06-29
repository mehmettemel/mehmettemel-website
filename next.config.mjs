import withPWA from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: '/iletisim', destination: '/contact', permanent: true },
      { source: '/incelemeler', destination: '/reviews', permanent: true },
      { source: '/incelemeler/:path*', destination: '/reviews/:path*', permanent: true },
      // Turkish list slugs → English
      { source: '/listeler/tarif', destination: '/lists/recipes', permanent: true },
      { source: '/listeler/ingilizce', destination: '/lists/english', permanent: true },
      { source: '/listeler/rusca', destination: '/lists/russian', permanent: true },
      { source: '/listeler/tansiyon', destination: '/lists/blood-pressure', permanent: true },
      { source: '/listeler/urun', destination: '/lists/products', permanent: true },
      { source: '/listeler/girisimcilik', destination: '/lists/entrepreneurship', permanent: true },
      { source: '/listeler/rastgele', destination: '/lists/random', permanent: true },
      { source: '/listeler/personal/iliskiler', destination: '/lists/personal/relationships', permanent: true },
      { source: '/listeler/personal/kisisel-gelisim', destination: '/lists/personal/personal-development', permanent: true },
      { source: '/listeler/personal/saglik', destination: '/lists/personal/health', permanent: true },
      { source: '/listeler/personal/toplum', destination: '/lists/personal/society', permanent: true },
      { source: '/listeler/personal/rastgele', destination: '/lists/personal/random', permanent: true },
      // Catch-all for remaining /listeler/* → /lists/*
      { source: '/listeler/:path*', destination: '/lists/:path*', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default withPWA({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)

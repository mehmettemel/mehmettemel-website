import { getAllPosts } from '../lib/blog'

export default function sitemap() {
  const baseUrl = 'https://mehmettemel.com'
  const posts = getAllPosts()

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/reviews/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
  ]
}

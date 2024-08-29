import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://signaltracker.gg'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${baseUrl}/signals`,
            lastModified: new Date(),
            priority: 0.8,
        },
    ]
}
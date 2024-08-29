import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://signaltracker.gg'
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/signals'],
            disallow: [],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
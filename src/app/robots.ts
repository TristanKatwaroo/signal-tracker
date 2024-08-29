import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://signaltracker.gg'
    return {
        rules: {
            userAgent: '*',
            // allow: ['/', '/signals'],
            // disallow: [],
            allow: ['/'],
            disallow: ['/privacy', '/achievements', 'global-stats', 'planner', 'reminders', 'reset-password', 'settings', 'tier-list', 'timeline'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
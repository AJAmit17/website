import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://amit-acharya.live';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/private/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
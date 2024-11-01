import { MetadataRoute } from 'next';
import { getRepos } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://amit-acharya.live";
  const username = process.env.GITHUB_USERNAME!;

  // Fetch all repositories
  const repositories = await getRepos(username);

  // Filter repositories similar to your projects page
  const publicRepos = repositories
    .filter(p => !p.private)
    .filter(p => !p.fork)
    .filter(p => !p.archived);

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic routes for each project
  const projectRoutes = publicRepos.map((repo) => ({
    url: `${baseUrl}/projects/${repo.name}`,
    lastModified: new Date(repo.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}

import { cache } from 'react';

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    pull_request?: {
      title: string;
      number: number;
    };
    issue?: {
      title: string;
      number: number;
    };
    comment?: {
      body: string;
    };
    commits?: Array<{
      message: string;
    }>;
  };
  created_at: string;
}

export const fetchGitHubActivity = cache(async (username: string): Promise<GitHubEvent[]> => {
  console.log('Fetching recent activity for', username);
  const response = await fetch(`https://api.github.com/users/${username}/events`, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub activity');
  }

  const data = await response.json();
  return data.slice(0, 12);
});
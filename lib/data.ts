import { cache } from 'react';

const revalidate = 60;
const MINUTES_5 = 60 * 5;
const HOURS_1 = 60 * 60;
const HOURS_12 = 60 * 60 * 12;

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  email: string;
  // Add other relevant properties
}

// interface GitHubRepo {
//   id: number;
//   name: string;
//   full_name: string;
//   html_url: string;
//   description: string;
//   // Add other relevant properties
// }

interface SocialAccount {
  provider: string;
  url: string;
}

interface PinnedReposResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: Array<{ name: string }>;
      };
    };
  };
}

interface Organization {
  data: string;
  name: string;
  websiteUrl: string;
  url: string;
  avatarUrl: string;
  description: string;
}

interface VercelProject {
  id: string;
  name: string;
  // Add other relevant properties
}

interface NextjsRelease {
  tagName: string;
  updatedAt: string;
}

interface UserActivity {
  // Define the structure of user activity
  id: string;
  type: string;
  // Add other relevant properties
}

interface PageViews {
  sumUniques: number;
  todayUniques: number;
}

interface DependabotAlerts {
  [severity: string]: number;
}

interface RouterCheck {
  isRouterPages: boolean;
  isRouterApp: boolean;
}

export async function getUser(username: string): Promise<GitHubUser> {
  console.log('Fetching user data for', username);
  // console.time('getUser');
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    next: { revalidate }
  });
  // console.timeEnd('getUser');
  return res.json();
}

export async function getRepos(username: string) {
  console.log('Fetching repos for', username);
  // console.time('getRepos');
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    next: { revalidate: MINUTES_5 }
  });
  if (!res.ok) {
    console.error('GitHub API returned an error.', res.status, res.statusText);
    return [];
  }
  // console.timeEnd('getRepos');
  return res.json();
}

export async function getSocialAccounts(username: string): Promise<SocialAccount[]> {
  console.log('Fetching social accounts for', username);
  // console.time('getSocialAccounts');
  const res = await fetch(`https://api.github.com/users/${username}/social_accounts`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    next: { revalidate: MINUTES_5 }
  });
  // console.timeEnd('getSocialAccounts');
  return res.json();
}

export const getPinnedRepos = cache(async (username: string) => {
  console.log('Fetching pinned repos for', username);
  // console.time('getPinnedRepos');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({ query: `{user(login: "${username}") {pinnedItems(first: 6, types: REPOSITORY) {nodes {... on Repository {name}}}}}` }),
  });
  if (!res.ok) {
    console.error('GitHub graphql returned an error.', res.status, res.statusText);
    return [];
  }
  const pinned: PinnedReposResponse = await res.json();
  // console.timeEnd('getPinnedRepos');
  const names = pinned.data.user.pinnedItems.nodes.map((node) => node.name);
  return names;
});


export const getVercelProjects = async () => {
  if (!process.env.VC_TOKEN) {
    console.log('No Vercel token found - no projects will be shown.');
    return [];
  }
  console.log('Fetching Vercel projects');
  // console.time('getVercelProjects');
  const res = await fetch('https://api.vercel.com/v9/projects', {
    headers: { Authorization: `Bearer ${process.env.VC_TOKEN}` },
  });
  // console.timeEnd('getVercelProjects');
  if (!res.ok) {
    console.error('Vercel API returned an error.', res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data.projects;
};

export const getNextjsLatestRelease = cache(async (): Promise<NextjsRelease> => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({
      query: `{
        repository(name: "next.js", owner: "vercel") {
          latestRelease {
            tagName
            updatedAt
          }
        }
      }`
    }),
  });
  if (!res.ok) {
    console.error('GitHub API returned an error.', res.status, res.statusText);
    return { tagName: '', updatedAt: '' };
  }
  const nextjsLatest = await res.json();

  return {
    tagName: nextjsLatest.data.repository.latestRelease.tagName.replace('v', ''),
    updatedAt: nextjsLatest.data.repository.latestRelease.updatedAt,
  };
}, HOURS_12);

export const getRepositoryPackageJson = cache(async (username: string, reponame: string): Promise<Record<string, any>> => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    body: JSON.stringify({
      query: `{
        repository(name: "${reponame}", owner: "${username}") {
          object(expression: "HEAD:package.json") {
            ... on Blob {
              text
            }
          }
        }
      }`
    }),
  });
  const response = await res.json();
  try {
    const packageJson = JSON.parse(response.data.repository.object.text);
    return packageJson;
  } catch (error) {
    console.error('Error parsing package.json', error);
    return {};
  }
});

export const getRecentUserActivity = cache(
  async (username: string): Promise<GitHubEvent[]> => {
    console.log('Fetching recent activity for', username);
    const res = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    });
    const response: GitHubEvent[] = await res.json();

    if (!res.ok) {
      console.error('GitHub API /users returned an error.', res.status, res.statusText, response);
      return [];
    }
    return response;
  });
  
export const getTrafficPageViews = async (username: string, reponame: string): Promise<PageViews> => {
  const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/traffic/views`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    next: { revalidate: HOURS_1 }
  });
  const response = await res.json();

  const sumUniques = response.uniques || 0;

  const today = new Date().toISOString().slice(0, 10);
  const todayUniques = response.views?.find((day: { timestamp: string }) => day.timestamp.startsWith(today))?.uniques || 0;

  return { sumUniques, todayUniques };
};

export const getDependabotAlerts = cache(async (username: string, reponame: string): Promise<DependabotAlerts> => {
  const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/dependabot/alerts`, {
    headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
  });

  const response = await res.json();

  if (!Array.isArray(response)) {
    return {};
  }

  const openAlertsBySeverity = response.reduce((acc: DependabotAlerts, alert: any) => {
    if (alert.state === 'open') {
      acc[alert.security_advisory.severity] = (acc[alert.security_advisory.severity] || 0) + 1;
    }
    return acc;
  }, {});

  return openAlertsBySeverity;
}, HOURS_12);

export async function checkAppJsxExistence(repoOwner: string, repoName: string): Promise<RouterCheck> {
  const urlPagesApp = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/pages/_app.jsx`;
  const urlAppLayout = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/app/layout.jsx`;

  const res: RouterCheck = {
    isRouterPages: false,
    isRouterApp: false,
  };

  try {
    const [isPagesRes, isAppLayoutRes] = await Promise.all([
      fetch(urlPagesApp, {
        headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
        next: { revalidate: HOURS_12 }
      }),
      fetch(urlAppLayout, {
        headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
        next: { revalidate: HOURS_12 }
      }),
    ]);

    if (isPagesRes.status === 200) {
      res.isRouterPages = true;
    }

    if (isAppLayoutRes.status === 200) {
      res.isRouterApp = true;
    }
  } catch (error) {
    console.error(`Error checking _app.jsx existence in ${repoName}: ${(error as Error).message}`);
  }

  return res;
}
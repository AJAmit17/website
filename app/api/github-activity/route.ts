import { NextResponse } from 'next/server';
import { fetchGitHubActivity } from '../../../lib/github';

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME;
    if (!username) {
      throw new Error('GitHub username not configured');
    }
    const activities = await fetchGitHubActivity(username);
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
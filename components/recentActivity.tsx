import React from 'react';
import { getRecentUserActivity } from "@/lib/data";

interface ActivitySummary {
  commits?: number;
  reviews?: number;
  commentsCreated?: number;
  commentsEdited?: number;
  prsOpened?: number;
  prsMerged?: number;
  tags?: number;
  branches?: number;
  [key: string]: number | undefined;
}

export const RecentActivity: React.FC = async () => {
  const recentUserActivity = await getRecentUserActivity("AJAmit17");
  const activitySummary = recentUserActivity.reduce<ActivitySummary>((acc, activity) => {
    if (activity.type === 'PushEvent') {
      acc.commits = (acc.commits || 0) + (activity.payload.size || 0);
    } else if (activity.type === 'PullRequestReviewEvent') {
      acc.reviews = (acc.reviews || 0) + 1;
    } else if (activity.type === 'IssueCommentEvent') {
      if (activity.payload.action === 'created') {
        acc.commentsCreated = (acc.commentsCreated || 0) + 1;
      } else if (activity.payload.action === 'edited') {
        acc.commentsEdited = (acc.commentsEdited || 0) + 1;
      }
    } else if (activity.type === 'PullRequestEvent') {
      if (activity.payload.action === 'opened') {
        acc.prsOpened = (acc.prsOpened || 0) + 1;
      } else if (activity.payload.action === 'closed' && activity.payload.pull_request?.merged) {
        acc.prsMerged = (acc.prsMerged || 0) + 1;
      }
    } else if (activity.type === 'CreateEvent') {
      if (activity.payload.ref_type === 'tag') {
        acc.tags = (acc.tags || 0) + 1;
      } else {
        acc.branches = (acc.branches || 0) + 1;
      }
    }

    acc[activity.type] = (acc[activity.type] || 0) + 1;

    return acc;
  }, {});

  const activitySummaryString = Object.entries(activitySummary)
    .map(([key, value]) => {
      if (!value) return null;
      switch (key) {
        case 'commits':
          return `pushed ${value} commit${value === 1 ? '' : 's'}`;
        case 'reviews':
          return `reviewed ${value} PR${value === 1 ? '' : 's'}`;
        case 'prsOpened':
          return `opened ${value} PR${value === 1 ? '' : 's'}`;
        case 'prsMerged':
          return `merged ${value} PR${value === 1 ? '' : 's'}`;
        case 'commentsCreated':
          return `made ${value} comment${value === 1 ? '' : 's'}`;
        case 'branches':
          return `created ${value} branch${value === 1 ? '' : 'es'}`;
        case 'tags':
          return `created ${value} tag${value === 1 ? '' : 's'}`;
        default:
          return null;
      }
    })
    .filter(Boolean)
    .join(', ');

  return (
    <div>
      <span className="text-sm">
        {activitySummaryString && 'In last 90 days on GitHub I ' + activitySummaryString + ' in public repositories.'}
      </span>
    </div>
  );
};
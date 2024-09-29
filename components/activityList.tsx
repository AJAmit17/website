"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GitBranchIcon, GitCommitIcon, GitPullRequestIcon, StarIcon } from "lucide-react"
import { GitHubEvent } from '@/lib/github';
import { format } from 'date-fns';
import { Card } from "./card";

interface ActivityListProps {
  activities: GitHubEvent[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'PushEvent':
      return <GitCommitIcon className="w-5 h-5" />;
    case 'PullRequestEvent':
      return <GitPullRequestIcon className="w-5 h-5" />;
    case 'CreateEvent':
      return <GitBranchIcon className="w-5 h-5" />;
    case 'WatchEvent':
      return <StarIcon className="w-5 h-5" />;
    default:
      return null;
  }
};

const getActivityDescription = (activity: GitHubEvent): string => {
  switch (activity.type) {
    case 'PushEvent':
      return `Pushed ${activity.payload.commits?.length} commit(s) to ${activity.repo.name}`;
    case 'PullRequestEvent':
      return `${activity.payload.action} pull request #${activity.payload.pull_request?.number} in ${activity.repo.name}`;
    case 'IssuesEvent':
      return `${activity.payload.action} issue #${activity.payload.issue?.number} in ${activity.repo.name}`;
    case 'IssueCommentEvent':
      return `Commented on issue #${activity.payload.issue?.number} in ${activity.repo.name}`;
    case 'CreateEvent':
      return `Created ${activity.payload.ref_type} ${activity.payload.ref} in ${activity.repo.name}`;
    case 'WatchEvent':
      return `Starred ${activity.repo.name}`;
    default:
      return `${activity.type} in ${activity.repo.name}`;
  }
};

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto bg-transparent shadow-xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <Card key={activity.id}>
            <motion.div
              className="p-4 transition duration-150 ease-in-out cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="flex items-center">
                <motion.div
                  className="flex-shrink-0 mr-4 p-2 rounded-full bg-gray-100"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {getActivityIcon(activity.type)}
                </motion.div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-white">
                    {getActivityDescription(activity)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{format(new Date(activity.created_at), 'PPpp')}</p>
                </div>
              </div>
            </motion.div>
          </Card>
        ))}
      </div>
    </div>
  );
};
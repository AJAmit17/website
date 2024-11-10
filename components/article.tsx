import Link from "next/link";
import { EyeClosedIcon, EyeIcon, MarkGithubIcon, StarIcon, DependabotIcon } from '@primer/octicons-react';
import { Eye } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Article = ({ project, isVercelProject }: { project: any, isVercelProject: boolean }) => {
    const isGitHubProject = project.html_url !== undefined;
    
    // Handle different link types for GitHub and Vercel projects
    const appLink = isGitHubProject 
        ? (project.homepage ? project.homepage : project.html_url)
        : (project.latestDeployments && project.latestDeployments[0]?.url 
            ? `https://${project.latestDeployments[0].url}`
            : '#');

    /** Repository visitors info. */
    let views = <span title="Can't get traffic data for someone else's repo."><EyeClosedIcon className="w-4 h-4" /> No data</span>;
    const alerts = <span title="Can't get alerts data for someone else's repo."><DependabotIcon className="w-4 h-4" /> No data</span>;
    
    if (isGitHubProject) {
        const isGitHubUser = process.env.GITHUB_USERNAME === project.owner.login;
        if (isGitHubUser) {
            const { todayUniques, sumUniques } = project.traffic;
            views = <span title="Unique repository visitors: Last 14 days / Today.">
                <EyeIcon className="w-4 h-4" />{" "}
                {Intl.NumberFormat("en-US", { notation: "compact" }).format(sumUniques)}/{Intl.NumberFormat("en-US", { notation: "compact" }).format(todayUniques)}
            </span>;
        }
    } else if (isVercelProject) {
        views = <span title="Vercel project"><EyeIcon className="w-4 h-4" /> Vercel project</span>;
    }

    return (
        <article className="p-4 md:p-8 w-full">
            <div className="flex justify-between gap-2 items-center">
                <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                    {isVercelProject ? "Vercel" : <GitHubLogoIcon className="w-4 h-4" />}
                    <time dateTime={new Date(project.created_at || project.createdAt).toISOString()} title="Created">
                        {new Date(project.created_at || project.createdAt).toISOString().substring(0, 10)}
                    </time>
                </span>
                <span className="text-zinc-500 text-xs flex items-center gap-1">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(project.watchers_count || (project.latestDeployments ? project.latestDeployments.length : 0))} Watchers
                    <span title="Total stars.">
                        <StarIcon className="w-4 h-4" />{" "}
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(project.stargazers_count || 0)} Stars
                    </span>
                </span>
            </div>

            <Link href={appLink} legacyBehavior>
                <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display cursor-pointer" title={`Click to view the ${isVercelProject ? 'deployment' : 'repo'}.`}>
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text">
                        {project.name}
                    </span>
                </h2>
            </Link>
            <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                {project.description || project.framework}
            </p>
            <div className="flex justify-between gap-2 items-center float-left mt-2 border-t-2 border-gray-700 border-opacity-50">
                <span className="text-zinc-500 text-xs">
                    {views} Views
                    {" "}
                    {alerts} Alerts
                </span>
            </div>
            <div className="flex justify-between gap-2 items-center float-right mt-2 border-t-2 border-gray-700 border-opacity-50">
                <span className="text-zinc-500 text-xs align-middle flex items-center gap-1" title={isVercelProject ? "Deployment URL" : "GitHub repository link"}>
                    {isVercelProject ? "🚀" : <MarkGithubIcon className="w-4 h-4" />}
                    <Link href={appLink} className="hover:text-blue-800">{project.name}</Link>
                </span>
            </div>
        </article>
    );
};
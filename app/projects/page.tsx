import React from "react";
import chunk from "lodash/chunk";
import data from "../../data.json";
import { getPinnedRepos, getRepos } from "@/lib/data";
import { Navigation } from "@/components/nav";
import { Card } from "@/components/card";
import { MarkGithubIcon } from "@primer/octicons-react";
import { Article } from "@/components/article";
import { ActivityList } from "@/components/activityList";
import { fetchGitHubActivity } from "@/lib/github";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata() {
    const username = process.env.GITHUB_USERNAME!;
    const repositories = await getRepos(username);

    return {
        title: `${username} - Portfolio Project`,
        description: `A detailed look at the ${username}'s projects with ${repositories.length} repositories`,
        openGraph: {
            title: username,
            description: `A detailed look at the ${username}'s projects with ${repositories.length} repositories`,
            type: 'article',
        },
    };
}

export default async function ProjectsPage() {
    const username = process.env.GITHUB_USERNAME!;

    const activities = await fetchGitHubActivity(username);

    // Fetch repositories and pinned repos data on the server side
    const repositories = await getRepos(username);
    const pinnedNames = await getPinnedRepos(username);

    const heroes = repositories
        .filter((project: { name: string; }) => pinnedNames.includes(project.name))
        .sort((a: { stargazers_count: number; }, b: { stargazers_count: number; }) => b.stargazers_count - a.stargazers_count);

    const sorted = repositories
        .filter((p: { private: any; }) => !p.private)
        .filter((p: { fork: any; }) => !p.fork)
        .filter((p: { archived: any; }) => !p.archived)
        .filter((p: { name: string; }) => !pinnedNames.includes(p.name))
        .filter((p: { name: string; }) => !data.projects.blacklist.includes(p.name))
        .sort(
            (a: { updated_at: any; }, b: { updated_at: any; }) =>
                new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime()
        );

    const chunkSize = Math.ceil(sorted.length / 3);

    return (
        <div className="relative pb-16 bg-background text-foreground">
            <Navigation />
            <div className="px-4 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-24 lg:pt-16">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mt-8 sm:mt-12">
                        Projects
                    </h2>
                    <p className="mt-4 text-gray-400">
                        {username ? `${username}'s projects` : data.description}
                    </p>
                </div>

                {heroes.length ? (
                    <>
                        <Separator className="my-8 bg-white opacity-50" />
                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Pinned Projects
                        </h3>
                        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
                            {(heroes[0] || heroes[2]) && (
                                <div className="grid grid-cols-1 gap-4">
                                    {[heroes[0], heroes[2]].map((project) =>
                                        project ? (
                                            <Card key={project.name}>
                                                <Article project={project} />
                                            </Card>
                                        ) : null
                                    )}
                                </div>
                            )}
                            {(heroes[1] || heroes[3]) && (
                                <div className="grid grid-cols-1 gap-4">
                                    {[heroes[1], heroes[3]].map((project) =>
                                        project ? (
                                            <Card key={project.name}>
                                                <Article project={project} />
                                            </Card>
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                        <Separator className="my-8 bg-white opacity-50" />
                    </>
                ) : null}

                <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                    <div className="grid grid-cols-1 gap-4">
                        {chunk(sorted, chunkSize)[0]?.map((project: any) => (
                            <Card key={project.name}>
                                <Article project={project} />
                            </Card>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {chunk(sorted, chunkSize)[1]?.map((project: any) => (
                            <Card key={project.name}>
                                <Article project={project} />
                            </Card>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {chunk(sorted, chunkSize)[2]?.map((project: any) => (
                            <Card key={project.name}>
                                <Article project={project} />
                            </Card>
                        ))}
                    </div>
                </div>

                <Separator className="my-8 bg-white opacity-50" />

                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        <MarkGithubIcon size={48} /> Activity
                    </h2>
                    <p className="mt-4 text-gray-400">
                        My recent GitHub activity. Displaying up to 10 events.
                    </p>
                </div>
                <ActivityList activities={activities} />
            </div>
        </div>
    );
}
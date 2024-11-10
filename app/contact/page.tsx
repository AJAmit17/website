import { MarkGithubIcon, MailIcon, PersonIcon } from '@primer/octicons-react';
import Link from "next/link";
import data from "../../data.json";
import { LinkedinIcon, Twitter, ArrowUpRight } from 'lucide-react';
import { getSocialAccounts, getUser } from '@/lib/data';
import { Navigation } from '@/components/nav';
import { Card } from '@/components/card';
import { Separator } from '@/components/ui/separator';

export const runtime = 'edge';

export default async function Contacts() {
    const username = process.env.GITHUB_USERNAME!;
    const [user, githubSocials] = await Promise.all([
        getUser(username),
        getSocialAccounts(username)
    ]);
    
    const email = user.email || data.email;
    const contacts = [];
    
    if (email) {
        contacts.push({
            icon: <MailIcon size={24} />,
            href: "mailto:" + email,
            label: "Email",
            handle: email,
            description: "Get in touch via email"
        });
    }
    
    contacts.push({
        icon: <MarkGithubIcon size={24} />,
        href: "https://github.com/" + username,
        label: "Github",
        handle: username,
        description: "Check out my open source work"
    });

    githubSocials.forEach((s) => {
        switch (s.provider) {
            case "linkedin":
                contacts.push({
                    icon: <LinkedinIcon size={24} />,
                    href: s.url,
                    label: "LinkedIn",
                    handle: s.url.split("/").pop(),
                    description: "Connect with me professionally"
                });
                break;
            case "twitter":
                contacts.push({
                    icon: <Twitter size={24} />,
                    href: s.url,
                    label: "Twitter",
                    handle: s.url.split("/").pop(),
                    description: "Follow me for updates"
                });
                break;
            default:
                contacts.push({
                    icon: <PersonIcon size={24} />,
                    href: s.url,
                    label: s.url.split("/")[2],
                    handle: s.url.split("/").pop(),
                    description: "Visit my other profiles"
                });
                break;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-background">
            <Navigation />
            <div className="container px-4 mx-auto mt-24 mb-16">
                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Let&apos;s Connect
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-zinc-400">
                        I&apos;m always open to new opportunities, collaborations, and interesting conversations.
                        Feel free to reach out through any of these channels.
                    </p>
                </div>
                
                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {contacts.map((contact) => (
                            <Link
                                key={contact.label}
                                href={contact.href}
                                target="_blank"
                                className="group"
                            >
                                <Card>
                                    <div className="p-6 duration-300 group-hover:bg-zinc-800/50">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800 text-zinc-200 group-hover:text-white group-hover:bg-zinc-700">
                                                {contact.icon}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 text-zinc-500 duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                        <div className="mb-2">
                                            <h3 className="text-xl font-semibold text-zinc-200 group-hover:text-white">
                                                {contact.label}
                                            </h3>
                                            <p className="mt-1 text-sm text-zinc-400 group-hover:text-zinc-300">
                                                {contact.description}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-zinc-800">
                                            <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-300">
                                                {contact.handle ? "@" + contact.handle : "@amit-acharya17"}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    
                    <Separator className="my-16 bg-zinc-800" />
                    
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold text-zinc-200">
                            Looking for collaborations
                        </h2>
                        <p className="mt-4 text-zinc-400">
                            Currently available for freelance projects, technical consulting, and open source collaborations.
                            Let&apos;s build something amazing together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
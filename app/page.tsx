import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";
import { RecentActivity } from "@/components/recentActivity";
import { getUser } from "@/lib/data";

export const metadata: Metadata = {
    title: "Amit Acharya - Personal Portfolio",
    description: "Professional portfolio of Amit Acharya, featuring projects and contact information. Explore my work and get in touch.",
    keywords: ["Amit Acharya", "Portfolio", "Developer", "Projects", "AJ Amit", "AJAmit17", "Amit Jagadeesh Acharya", "Amit Achari", "Amit Jagadeesh Achari", "Achari"],
    authors: [{ name: "Amit Acharya" }],
    openGraph: {
        title: "Amit Acharya - Personal Portfolio",
        description: "Professional portfolio of Amit Acharya, featuring projects and contact information.",
        type: "website",
        url: "https://amit-acharya.live",
        images: [{
            url: "https://avatars.githubusercontent.com/u/100467234?v=4",
            width: 800,
            height: 600,
            alt: "Amit Acharya"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Amit Acharya - Personal Portfolio",
        description: "Professional portfolio of Amit Acharya, featuring projects and contact information.",
        images: ["https://avatars.githubusercontent.com/u/100467234?v=4"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "",
    },
};

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Skills", href: "/skills" },
];

export default function Home() {
    return (
        <LandingComponent />
    )
}

const UserIcon = () => {
    return (
        <Image 
            alt='Amit Acharya Profile Picture' 
            width={100} 
            height={100} 
            src={"https://avatars.githubusercontent.com/u/100467234?v=4&size=64"} 
            className="float-right rounded-full mx-4"
            priority
            loading="eager"
        />
    );
};

const UserText = async () => {
    const user = await getUser("AJAmit17");
    return (
        <p>Hi, my name is Amit Acharya{'. '}{user.bio}</p>
    );
};

const LandingComponent = () => {
    return (
        <main className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black min-h-[100dvh]" role="main" aria-label="Portfolio Landing Page">
            <nav className="mb-16 animate-fade-in" role="navigation" aria-label="Main navigation">
                <ul className="flex items-center justify-center gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-lg duration-500 text-zinc-500 hover:text-zinc-300"
                            aria-label={`Navigate to ${item.name}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

            <h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
                Amit Acharya
                <UserIcon />
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="my-16 text-center animate-fade-in">
                <h2 className="text-lg text-zinc-500">
                    <UserText />
                    <RecentActivity />
                </h2>
            </div>
        </main>
    );
}
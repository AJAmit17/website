import Link from "next/link";
import Image from "next/image";
import React from "react";
import { RecentActivity } from "@/components/recentActivity";
import { getUser } from "@/lib/data";

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

export default function Home() {
    return (
        <LandingComponent />
    )
}

const UserIcon = () => {
    return (
        <Image alt='👨‍💻' width={100} height={100} src={"https://avatars.githubusercontent.com/u/100467234?v=4&size=64"} className="float-right rounded-full mx-4" />
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
        <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black min-h-[100dvh] space-y-10">
            <nav className="my-16 animate-fade-in">
                <ul className="flex items-center justify-center gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href + ('')}
                            className="text-lg duration-500 text-zinc-500 hover:text-zinc-300"
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
        </div>
    );
}

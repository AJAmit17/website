"use client"

import { getUser } from "@/lib/data"
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { RecentActivity } from "./recentActivity"

const COLORS_TOP = ["#0f172a", "#1e293b", "#334155", "#475569", "#1e1e1e"]

const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
];

export const Hero = async () => {
    const color = useMotionValue(COLORS_TOP[0])

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [color])

    const bgImag = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`

    const user = await getUser("AJAmit17");

    return (
        <motion.section
            style={{ backgroundImage: bgImag }}
            className="relative grid min-h-screen place-content-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-gray-200"
        >
            <nav className="mb-6 sm:mb-8 animate-fade-in" role="navigation" aria-label="Main navigation">
                <ul className="flex items-center justify-center gap-3 sm:gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-base sm:text-lg duration-500 text-zinc-500 hover:text-zinc-300"
                            aria-label={`Navigate to ${item.name}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>
            <div className="z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-white/40 text-3xl sm:text-5xl md:text-7xl font-black text-center">
                    Hi, I am
                </h1>
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-3xl sm:text-5xl md:text-7xl mb-4 sm:mb-5 text-center">
                    Amit Acharya
                </h1>
                <Image
                    alt='Amit Acharya Profile Picture'
                    width={250}
                    height={250}
                    src={"/profilepic.png"}
                    className="rounded-full mx-auto mb-4 sm:mb-5 w-48 sm:w-64 h-48 sm:h-64 object-cover"
                    priority
                    loading="eager"
                />
                <div className="flex bg-white/10 shadow-xl p-3 rounded-3xl justify-center items-center space-x-2 mb-4 w-full sm:w-auto">
                    <p className="font-medium text-sm sm:text-base text-center px-2 sm:px-4">
                        Hi, I&apos;m Amit Acharya{'. '}{user.bio}
                    </p>
                </div>
                <div className="max-w-xl w-full text-center text-sm sm:text-base">
                    <RecentActivity />
                </div>
            </div>
        </motion.section>
    )
}
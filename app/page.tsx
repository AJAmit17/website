import React from "react";
import { Metadata } from "next";
import { Hero } from "@/components/hero";

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

export default function Home() {
    return (
        <LandingComponent />
    )
}


const LandingComponent = () => {
    return (
        <>
            <Hero />
        </>
    );
}
import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
    ],
    contact: {
        email: "hello@example.com",
        tel: "+123456789",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/AJAmit17",
                icon: Icons.github,

                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/amit-acharya17/",
                icon: Icons.linkedin,

                navbar: true,
            },
            X: {
                name: "X",
                url: "https://x.com/amit_acharya17",
                icon: Icons.x,

                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "#",
                icon: Icons.email,

                navbar: false,
            },
        },
    },
} as const;
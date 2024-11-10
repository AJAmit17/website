import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Dock, DockIcon } from "./ui/dock";
import { DATA } from "@/lib/links";

export default function BottomDock() {
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
            <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-zinc-800 bg-opacity-90 backdrop-blur-lg [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] animate-fade-in-up">
                {DATA.navbar.map((item) => (
                    <DockIcon key={item.href} className="animate-bounce-in">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "size-12"
                                    )}
                                >
                                    <item.icon className="size-4 text-white" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-zinc-800 text-white border border-zinc-700 rounded-2xl shadow-lg">
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                ))}
                <Separator orientation="vertical" className="h-full animate-fade-in-up" />
                {Object.entries(DATA.contact.social)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                        <DockIcon key={name} className="animate-bounce-in">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={social.url}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12"
                                        )}
                                    >
                                        <social.icon className="size-4 text-white" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent className="bg-zinc-800 text-white border border-zinc-700 rounded-2xl shadow-lg">
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
            </Dock>
        </div>
    );
}
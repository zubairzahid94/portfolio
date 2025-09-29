"use client";

import { motion } from "framer-motion";
import PortalCard from "../portalvariation/portal-card";

export default function PortfolioPage() {
    return (
        <main className="min-h-dvh bg-background text-foreground">
            <section className="mx-auto px-12 py-12 md:py-16">
                <motion.header
                    className="mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-2xl md:text-3xl font-semibold text-balance">
                        {"Services — Cards as Portals"}
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-foreground/70 max-w-2xl">
                        {
                            "Each card opens a miniature world with subtle parallax and animated depth. Hover to peek through the portal."
                        }
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut"
                        }}
                    >
                        <PortalCard
                            kind="web"
                            title="Web Development"
                            caption="Glowing code rain with parallax tooltip"
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
                                    <path d="M8.7 15.3 4.4 11l4.3-4.3 1.4 1.4L7.2 11l2.9 2.9-1.4 1.4Zm6.6 0-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4L19.6 11l-4.3 4.3Z" />
                                </svg>
                            }
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.22,
                            ease: "easeOut"
                        }}
                    >
                        <PortalCard
                            kind="video"
                            title="Video Editing"
                            caption="Film-strip motion and light leaks"
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
                                    <path d="M10 16.5v-9l6 4.5-6 4.5ZM5 5h14v14H5V5Zm2 2v10h10V7H7Z" />
                                </svg>
                            }
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.34,
                            ease: "easeOut"
                        }}
                    >
                        <PortalCard
                            kind="3d"
                            title="3D Design"
                            caption="Minimal rotating cube with glow"
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
                                    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.2 6.6 3.7L12 11 5.4 7.9 12 4.2ZM5 9.6 11 13v7L5 16.6V9.6Zm14 0v7L13 20v-7l6-3.4Z" />
                                </svg>
                            }
                        />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
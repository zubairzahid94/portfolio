"use client"


import { motion } from "framer-motion"
import Scroll3DTitle from "../videolevitating/scroll-3d-title"
import FullBleedVideo from "../videolevitating/full-bleed-video"
import { Button } from "../ui/button"
import Link from "next/link"

const SECTIONS = [
    {
        id: "3d-designing",
        title: "3D Designing",
        eyebrow: "Immersive • Materials • Lighting",
        kicker: "We craft atmospheres and mood with realistic lighting, shadows, and cinematic composition.",
        video: "/videos/test.mp4",
        layout: "text-left",
    },
    {
        id: "model-designing",
        title: "Model Designing",
        eyebrow: "Topology • Detail • Precision",
        kicker: "Clean meshes and striking silhouettes built for performance and visual fidelity.",
        video: "/videos/test.mp4",
        layout: "text-right",
    },
    {
        id: "video-editing",
        title: "Video Editing",
        eyebrow: "Rhythm • Story • Emotion",
        kicker: "Pacing, transitions, and sound design come together to tell a compelling story.",
        video: "/videos/test.mp4",
        layout: "text-left",
    },
] as const

export default function PortfolioShowcasePage() {
    return (
        <main className="bg-black text-white">
            {/* Global background accent */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            {SECTIONS.map((s, i) => {
                const isRightText = s.layout === "text-right"
                return (
                    <section
                        key={s.id}
                        className="relative flex min-h-screen w-full items-center"
                        aria-labelledby={`${s.id}-title`}
                    >
                        <div className="container mx-auto h-screen max-w-[1920px] px-4 md:px-8 lg:px-12">
                            <div className="flex h-full flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
                                {/* Text Half */}
                                <motion.div
                                    className={`flex items-center justify-center w-full lg:w-[42%]
                        ${isRightText ? "lg:order-2" : "lg:order-1"}
                    `}
                                    initial={{ opacity: 0, x: isRightText ? 60 : -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div id={`${s.id}-title`} className="w-full">
                                        <Scroll3DTitle
                                            title={s.title}
                                            eyebrow={s.eyebrow}
                                            kicker={s.kicker}
                                            align={isRightText ? "right" : "left"}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className={`relative w-full lg:w-[58%] h-[50vh] sm:h-[60vh] lg:h-[75vh] xl:h-[80vh]
                        ${isRightText ? "lg:order-1" : "lg:order-2"}
                    `}
                                    initial={{ opacity: 0, x: isRightText ? -60 : 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <FullBleedVideo src={s.video} label={s.title} className="h-full" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Cinematic transition gradient between sections */}
                        {i < SECTIONS.length - 1 ? (
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/50 to-black" />
                        ) : null}


                    </section>
                )
            })}

            <div className="flex items-center justify-center" style={{ perspective: 2000 }}>
                <Link href="/projects">
                    <Button
                        variant="outline"
                        className="relative border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-100 transition-all duration-300 px-8 py-6 text-lg font-medium tracking-wide rounded-full overflow-hidden group"
                    >
                        <span className="relative z-10">View All Our Works</span>
                        {/* subtle glow animation */}
                        <motion.span
                            className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        />
                    </Button>
                </Link>
            </div>

        </main>
    )
}

"use client"

import { motion } from "framer-motion"
import Scroll3DTitle from "../videolevitating/scroll-3d-title"
import LevitatingVideoCard from "../videolevitating/levitating-video-card"

// Color system: primary cyan accent with neutral black/white/gray
// Typography: default Geist, bold headlines via classes

const SECTIONS = [
    {
        id: "3d-designing",
        title: "3D Designing",
        eyebrow: "Immersive • Materials • Lighting",
        kicker: "We craft atmospheres and mood with realistic lighting, shadows, and cinematic composition.",
        video: "/videos/3d-designing.mp4", // Replace with your actual file
        layout: "text-left", // text on left, video right
    },
    {
        id: "model-designing",
        title: "Model Designing",
        eyebrow: "Topology • Detail • Precision",
        kicker: "Clean meshes and striking silhouettes built for performance and visual fidelity.",
        video: "/videos/model-designing.mp4",
        layout: "text-right", // text on right, video left
    },
    {
        id: "video-editing",
        title: "Video Editing",
        eyebrow: "Rhythm • Story • Emotion",
        kicker: "Pacing, transitions, and sound design come together to tell a compelling story.",
        video: "/videos/video-editing.mp4",
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
                    <section key={s.id} className="relative min-h-screen w-full" aria-labelledby={`${s.id}-title`}>
                        <div className="container mx-auto h-screen px-6 sm:px-10 lg:px-14">
                            <div className="grid h-full grid-cols-1 items-center gap-6 lg:gap-12 md:grid-cols-2 overflow-visible">
                                {/* Text */}
                                <motion.div
                                    className={
                                        isRightText
                                            ? // text on right → overlap inward from the right
                                            "order-2 md:order-2 md:-ml-24 lg:-ml-32 z-20 pointer-events-none"
                                            : // text on left → overlap inward from the left
                                            "order-1 md:-mr-24 lg:-mr-32 z-20 pointer-events-none"
                                    }
                                    initial={{ opacity: 0, x: isRightText ? 60 : -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <div id={`${s.id}-title`}>
                                        <Scroll3DTitle
                                            title={s.title}
                                            eyebrow={s.eyebrow}
                                            kicker={s.kicker}
                                            align={isRightText ? "right" : "left"}
                                            className="max-w-none"
                                        />
                                    </div>
                                </motion.div>

                                {/* Video Card */}
                                <motion.div
                                    className={isRightText ? "order-1 md:order-1 z-10" : "order-2 z-10"}
                                    initial={{ opacity: 0, x: isRightText ? -60 : 60, scale: 0.98 }}
                                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <LevitatingVideoCard
                                        src={s.video}
                                        label={i === 0 ? "3D Designing" : i === 1 ? "Model Designing" : "Video Editing"}
                                        className={isRightText ? "md:translate-x-4" : "md:-translate-x-4"}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Divider aura to create cinematic transitions between sections */}
                        {i < SECTIONS.length - 1 ? (
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black" />
                        ) : null}
                    </section>
                )
            })}
        </main>
    )
}

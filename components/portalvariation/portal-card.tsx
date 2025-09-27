"use client"

import { motion } from "motion/react"
import TiltedCard from "./tilted-card"
import { CodeRainBackground, FilmStripBackground, RotatingCubeBackground } from "./portal-backgrounds"
import type React from "react"

type PortalKind = "web" | "video" | "3d"

export interface PortalCardProps {
    kind: PortalKind
    title: string
    icon?: React.ReactNode
    caption?: string
}

function BackgroundByKind({ kind }: { kind: PortalKind }) {
    if (kind === "web") return <CodeRainBackground />
    if (kind === "video") return <FilmStripBackground />
    return <RotatingCubeBackground />
}

export default function PortalCard({ kind, title, icon, caption }: PortalCardProps) {
    return (
        <TiltedCard
            // no base image; we supply dynamic background
            imageSrc={undefined}
            captionText={caption || ""}
            containerHeight="320px"
            imageHeight="320px"
            imageWidth="100%"
            scaleOnHover={1.08}
            rotateAmplitude={15}
            showTooltip={!!caption}
            backgroundContent={
                <div className="absolute inset-0">
                    <BackgroundByKind kind={kind} />
                    {/* subtle inner vignette for depth */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            boxShadow: "inset 0 0 80px rgba(0,0,0,0.45)",
                        }}
                    />
                </div>
            }
            backgroundZ={0}
            // overlay holds title/icon; group-hover lifts slightly
            displayOverlayContent
            overlayContent={
                <div className="absolute inset-0 flex items-end p-4">
                    <motion.div
                        className="pointer-events-none flex items-center gap-2 bg-background/70 border border-border rounded-md px-3 py-2"
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                        {icon && (
                            <span className="text-foreground/80" aria-hidden>
                                {icon}
                            </span>
                        )}
                        <span className="text-foreground font-medium text-sm md:text-base text-pretty">{title}</span>
                    </motion.div>
                </div>
            }
            overlayZ={30}
            glowOnHover
            glowColor="rgba(56,189,248,0.45)" // cyan glow accent
        />
    )
}

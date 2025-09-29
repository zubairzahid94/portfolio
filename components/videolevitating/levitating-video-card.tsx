"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useCallback } from "react"

type Props = {
    src: string
    poster?: string
    label?: string
    className?: string
}

export default function LevitatingVideoCard({ src, poster, label, className }: Props) {
    // Pointer-tilt using motion values
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 })

    // Inner parallax for the video plane (moves subtly opposite to tilt)
    const ivx = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 })
    const ivy = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 22 })
    // Specular highlight position
    const sx = useSpring(useTransform(mx, [-0.5, 0.5], [-40, 40]), { stiffness: 200, damping: 18 })
    const sy = useSpring(useTransform(my, [-0.5, 0.5], [-30, 30]), { stiffness: 200, damping: 18 })

    const onMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width - 0.5
            const py = (e.clientY - rect.top) / rect.height - 0.5
            mx.set(px)
            my.set(py)
        },
        [mx, my],
    )

    const onLeave = useCallback(() => {
        mx.set(0)
        my.set(0)
    }, [mx, my])

    return (
        <motion.div
            className={`group relative w-full max-w-[720px] aspect-[16/10] mx-auto ${className || ""}`}
            style={{ perspective: 1000 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            aria-label={label || "Showreel"}
        >
            {/* Ground shadow for levitation */}
            <motion.div
                className="absolute left-1/2 -bottom-4 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/60 blur-xl"
                style={{ scale: 0.95 }}
                aria-hidden
            />

            {/* Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-2 rounded-3xl bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden
            />
            {/* Card */}
            <motion.div
                className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.035, y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
                {/* Backplate gradient ring for a portal vibe */}
                <div
                    className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(60%_70%_at_50%_50%,rgba(34,211,238,0.25),transparent_70%)]"
                    aria-hidden
                    style={{ transform: "translateZ(-2px)" }}
                />
                {/* Inner vignette */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.55)" }}
                    aria-hidden
                />
                <motion.video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={src}
                    poster={poster || "/cinematic-showreel-placeholder.jpg"}
                    autoPlay
                    playsInline
                    muted
                    loop
                    style={{ x: ivx, y: ivy }}
                />
                {/* Moving specular shine */}
                <motion.div
                    className="pointer-events-none absolute h-40 w-40 rounded-full"
                    style={{
                        x: sx,
                        y: sy,
                        left: "50%",
                        top: "30%",
                        background: "radial-gradient(closest-side, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%)",
                        filter: "blur(18px)",
                        mixBlendMode: "screen",
                    }}
                    aria-hidden
                />
                {/* Floating caption chip */}
                {label ? (
                    <motion.div
                        className="absolute bottom-4 left-4 z-10 rounded-md border border-white/10 bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-medium text-white"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        {label}
                    </motion.div>
                ) : null}
            </motion.div>
        </motion.div>
    )
}

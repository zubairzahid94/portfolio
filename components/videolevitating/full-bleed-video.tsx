"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import React, { useRef, useState } from "react"

type Props = {
    src: string
    poster?: string
    label?: string
    className?: string
}

export default function FullBleedVideo({ src, poster, label, className }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

    // Subtle scroll parallax
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const midX = rect.width / 2
        const midY = rect.height / 2
        const rotateY = ((x - midX) / midX) * 10
        const rotateX = ((midY - y) / midY) * 10
        setTransform({ rotateX, rotateY })
    }

    const handleMouseLeave = () => setTransform({ rotateX: 0, rotateY: 0 })

    return (
        <motion.div
            ref={ref}
            className={`relative h-full w-full ${className || ""}`}
            style={{ perspective: 1000, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl transition-shadow duration-300"
                animate={{
                    rotateX: transform.rotateX,
                    rotateY: transform.rotateY,
                    scale: transform.rotateX === 0 && transform.rotateY === 0 ? 1 : 1.03,
                    boxShadow:
                        transform.rotateX === 0 && transform.rotateY === 0
                            ? "0 0 40px rgba(0,0,0,0.3)"
                            : "0 0 50px rgba(0,255,255,0.25)",
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Video */}
                <video
                    className="h-full w-full object-cover"
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Lighting gradient overlay */}
                <motion.div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay"
                    style={{
                        opacity: transform.rotateX === 0 && transform.rotateY === 0 ? 0 : 0.5,
                    }}
                />

                {/* Subtle glow ring */}
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl"
                    animate={{
                        boxShadow:
                            transform.rotateX === 0 && transform.rotateY === 0
                                ? "0 0 0px rgba(0,255,255,0)"
                                : "0 0 40px rgba(0,255,255,0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Inner vignette */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)" }}
                />

                {/* Floating label */}
                {label && (
                    <motion.div
                        className="absolute bottom-6 left-6 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 text-sm font-medium text-white"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {label}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

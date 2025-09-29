"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type Props = {
    title: string
    eyebrow?: string
    kicker?: string
    align?: "left" | "right"
    className?: string
}

export default function Scroll3DTitle({ title, eyebrow, kicker, align = "left", className }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    // Parallax + depth
    const y = useTransform(scrollYProgress, [0, 1], [20, -20])
    const rotateX = useTransform(scrollYProgress, [0, 1], [8, -6])
    const z = useTransform(scrollYProgress, [0, 1], [0, 40])

    return (
        <div
            ref={ref}
            className={`w-full ${align === "right" ? "text-right" : "text-left"} ${className || ""}`}
            style={{ perspective: 1000 }}
        >
            {eyebrow ? (
                <motion.p className="mb-3 text-sm tracking-widest text-white/60" style={{ y }}>
                    {eyebrow}
                </motion.p>
            ) : null}
            <motion.h2
                className="text-balance font-extrabold leading-[0.95] tracking-tight
                   text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
                style={{
                    y,
                    rotateX,
                    // Faux depth using text-shadow
                    textShadow: "0 10px 30px rgba(0,0,0,0.6)",
                    transformStyle: "preserve-3d",
                    translateZ: z as unknown as number,
                }}
            >
                {title}
            </motion.h2>
            {kicker ? (
                <motion.p className="mt-4 max-w-xl text-base md:text-lg text-white/70" style={{ y }}>
                    {kicker}
                </motion.p>
            ) : null}
        </div>
    )
}

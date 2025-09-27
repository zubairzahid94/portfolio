"use client"

import { motion } from "motion/react"

export function StaticGradientFallback({
    className = "",
}: {
    className?: string
}) {
    return (
        <div
            className={`absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_10%,_hsl(210_30%_22%)_0%,_transparent_60%),radial-gradient(120%_80%_at_90%_90%,_hsl(200_70%_35%)_0%,_transparent_60%)] ${className}`}
            aria-hidden
        />
    )
}

// Web Dev: Scrolling code rain
export function CodeRainBackground() {
    const lines = [
        "const greet = (n) => `Hello ${n}`",
        "function add(a,b){return a+b}",
        "useEffect(()=>{ /* ... */ },[])",
        'app.get("/api", handler)',
        "return <Component {...props} />",
        "await db.select().from(users)",
        "export default function Page(){ /* ... */ }",
        "for (let i=0;i<10;i++) console.log(i)",
    ]

    return (
        <div className="absolute inset-0 bg-background">
            <div className="hidden sm:block absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="absolute left-0 right-0"
                    animate={{ y: ["0%", "-100%"] }}
                    transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <div className="grid grid-cols-2 gap-3 px-3 text-xs text-foreground/70">
                        {Array.from({ length: 20 }).map((_, idx) => (
                            <div key={idx} className="font-mono/[[data-font-mono]] whitespace-nowrap opacity-80">
                                {lines.map((l, i) => (
                                    <div key={i} className="py-1">
                                        {l}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Mobile fallback */}
            <StaticGradientFallback className="sm:hidden" />
        </div>
    )
}

// Video Editing: moving film strip stripes
export function FilmStripBackground() {
    return (
        <div className="absolute inset-0">
            <div className="hidden sm:block absolute inset-0">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 6px, transparent 6px, transparent 18px)",
                    }}
                    animate={{ backgroundPositionX: ["0px", "240px"] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)",
                    }}
                    aria-hidden
                />
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    style={{
                        background:
                            "radial-gradient(60% 40% at 20% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(60% 40% at 80% 80%, rgba(56,189,248,0.3), transparent 60%)",
                    }}
                />
            </div>
            {/* Mobile fallback */}
            <StaticGradientFallback className="sm:hidden" />
        </div>
    )
}

// 3D Design: rotating cube illusion
export function RotatingCubeBackground() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="hidden sm:flex items-center justify-center">
                <motion.div
                    className="[transform-style:preserve-3d] relative"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                        width: 140,
                        height: 140,
                    }}
                >
                    {["front", "back", "left", "right", "top", "bottom"].map((face) => (
                        <div
                            key={face}
                            className="absolute inset-0 border border-border bg-[color:rgb(17,24,39)]/40"
                            style={{
                                transform:
                                    face === "front"
                                        ? "translateZ(70px)"
                                        : face === "back"
                                            ? "rotateY(180deg) translateZ(70px)"
                                            : face === "left"
                                                ? "rotateY(-90deg) translateZ(70px)"
                                                : face === "right"
                                                    ? "rotateY(90deg) translateZ(70px)"
                                                    : face === "top"
                                                        ? "rotateX(90deg) translateZ(70px)"
                                                        : "rotateX(-90deg) translateZ(70px)",
                            }}
                        />
                    ))}
                    {/* cube glow */}
                    <motion.div
                        className="absolute -inset-6 rounded-xl"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        style={{
                            background: "radial-gradient(closest-side, rgba(56,189,248,0.35), transparent)",
                            filter: "blur(12px)",
                        }}
                    />
                </motion.div>
            </div>
            {/* Mobile fallback */}
            <StaticGradientFallback className="sm:hidden" />
        </div>
    )
}

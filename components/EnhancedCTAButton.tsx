"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function EnhancedCTAButton() {
    const [isHovered, setIsHovered] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const gradientRef = useRef<HTMLDivElement>(null)
    const shineRef = useRef<HTMLDivElement>(null)
    const borderGlowRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)
    const particlesRef = useRef<HTMLDivElement>(null)

    // Continuous animations
    useEffect(() => {
        if (!buttonRef.current) return

        // Radial glow pulse
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                scale: 1.3,
                opacity: 0.6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })
        }

        // Moving gradient background
        if (gradientRef.current) {
            gsap.to(gradientRef.current, {
                x: "100%",
                duration: 2,
                repeat: -1,
                ease: "none",
            })
        }

        // Border glow pulse
        if (borderGlowRef.current) {
            gsap.to(borderGlowRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 2.5,
                repeat: -1,
                ease: "sine.inOut",
            })
        }
    }, [])

    // Hover animations
    useEffect(() => {
        if (!buttonRef.current) return

        if (isHovered) {
            // Scale button
            gsap.to(buttonRef.current, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)",
            })

            // Arrow bounce
            if (arrowRef.current) {
                gsap.to(arrowRef.current, {
                    x: 5,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                })
            }

            // Shine effect
            if (shineRef.current) {
                gsap.fromTo(
                    shineRef.current,
                    { x: "-100%" },
                    {
                        x: "200%",
                        duration: 0.8,
                        ease: "power2.out",
                    }
                )
            }

            // Particle burst
            if (particlesRef.current) {
                const particles = particlesRef.current.children
                Array.from(particles).forEach((particle, i) => {
                    const angle = (i * Math.PI * 2) / particles.length
                    const distance = 100
                    gsap.fromTo(
                        particle,
                        { x: 0, y: 0, opacity: 0, scale: 0 },
                        {
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 1,
                            scale: 1.5,
                            duration: 1.5,
                            repeat: -1,
                            ease: "power2.out",
                            onRepeat: function () {
                                gsap.set(particle, { x: 0, y: 0, opacity: 0, scale: 0 })
                            },
                        }
                    )
                })
            }
        } else {
            // Reset on mouse leave
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            })

            if (arrowRef.current) {
                gsap.killTweensOf(arrowRef.current)
                gsap.to(arrowRef.current, {
                    x: 0,
                    duration: 0.3,
                })
            }

            if (particlesRef.current) {
                gsap.killTweensOf(particlesRef.current.children)
                gsap.set(particlesRef.current.children, { opacity: 0 })
            }
        }
    }, [isHovered])

    // Click animation
    const handleClick = () => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
            })
        }
    }

    return (
        <div className="flex items-center justify-center" style={{ perspective: 2000 }}>
            <Link href="/projects" onClick={handleClick}>
                <Button
                    ref={buttonRef}
                    variant="outline"
                    className="relative border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-100 transition-colors duration-300 px-8 py-6 text-lg font-medium tracking-wide rounded-full overflow-hidden shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 hover:shadow-2xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Animated gradient background */}
                    <div
                        ref={gradientRef}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 -translate-x-full"
                    />

                    {/* Radial glow pulse */}
                    <div ref={glowRef} className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-30" />

                    {/* Particle container */}
                    <div ref={particlesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-0" />
                        ))}
                    </div>

                    {/* Border glow animation */}
                    <div ref={borderGlowRef} className="absolute inset-0 rounded-full border-2 border-cyan-300/50 opacity-50" />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-3">
                        <Sparkles className="w-5 h-5" />
                        <span>View All Our Works</span>
                        <span ref={arrowRef} className="inline-block">
                            <ArrowRight className="w-5 h-5" />
                        </span>
                    </span>

                    {/* Shine effect on hover */}
                    <div
                        ref={shineRef}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                        style={{ transform: "skewX(-20deg)" }}
                    />
                </Button>
            </Link>
        </div>
    )
}
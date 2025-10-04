"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface NavItem {
    label: string
    href: string
    index: string
}

const NAVIGATION: NavItem[] = [
    { label: "Work", href: "#work", index: "01" },
    { label: "Services", href: "#services", index: "02" },
    { label: "About", href: "#about", index: "03" },
    { label: "Contact", href: "#contact", index: "04" }
]

export default function Navbar() {
    const [activeSection, setActiveSection] = useState<string>("#home")
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    const navRef = useRef<HTMLElement | null>(null)
    const cursorRef = useRef<HTMLDivElement | null>(null)
    const linkRefs = useRef<(HTMLDivElement | null)[]>([])
    const centerCircleRef = useRef<HTMLDivElement | null>(null)
    const timeRef = useRef<HTMLSpanElement | null>(null)

    // Custom cursor effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent): void => {
            setMousePos({ x: e.clientX, y: e.clientY })

            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3,
                    ease: "power2.out"
                })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Update time
    useEffect(() => {
        const updateTime = (): void => {
            if (timeRef.current) {
                const now = new Date()
                const hours = now.getHours().toString().padStart(2, '0')
                const minutes = now.getMinutes().toString().padStart(2, '0')
                timeRef.current.textContent = `${hours}:${minutes}`
            }
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    // Track active section
    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50)

            const sections = NAVIGATION.map(item => item.href)
            for (const section of sections) {
                const element = document.querySelector(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Entrance animation
    useEffect(() => {
        const tl = gsap.timeline()

        tl.fromTo(centerCircleRef.current,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
        )

        linkRefs.current.forEach((link, i) => {
            if (link) {
                tl.fromTo(link,
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                    `-=${0.4}`
                )
            }
        })

        // Continuous rotation animation
        gsap.to(centerCircleRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        })
    }, [])

    const handleNavClick = (href: string): void => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleLinkHover = (index: number, isEntering: boolean): void => {
        const link = linkRefs.current[index]
        if (!link) return

        if (isEntering) {
            gsap.to(link, {
                x: 20,
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(link, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }

    return (
        <>
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="fixed w-6 h-6 pointer-events-none z-[100] mix-blend-difference"
                style={{
                    left: -12,
                    top: -12,
                }}
            >
                <div className="w-full h-full border-2 border-white rounded-full" />
            </div>

            {/* Vertical Left Navigation */}
            <nav
                ref={navRef}
                className="fixed left-0 top-0 h-screen z-50 flex items-center"
            >
                <div className="relative pl-8 pr-4">
                    {/* Navigation Items */}
                    <div className="flex flex-col space-y-12">
                        {NAVIGATION.map((item, index) => {
                            const isActive = activeSection === item.href
                            return (
                                <div
                                    key={item.href}
                                    ref={el => linkRefs.current[index] = el}
                                    onClick={() => handleNavClick(item.href)}
                                    onMouseEnter={() => handleLinkHover(index, true)}
                                    onMouseLeave={() => handleLinkHover(index, false)}
                                    className="cursor-pointer group"
                                >
                                    <div className="flex items-center space-x-4">
                                        {/* Index number */}
                                        <span
                                            className={`text-xs font-mono transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-white/30'
                                                }`}
                                        >
                                            {item.index}
                                        </span>

                                        {/* Active indicator line */}
                                        <div
                                            className="h-px transition-all duration-300"
                                            style={{
                                                width: isActive ? '40px' : '20px',
                                                background: isActive
                                                    ? 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
                                                    : 'rgba(255, 255, 255, 0.2)'
                                            }}
                                        />

                                        {/* Label - appears on hover */}
                                        <span
                                            className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-white/60 opacity-0 group-hover:opacity-100'
                                                }`}
                                            style={{
                                                transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </nav>

            {/* Top Right Info Bar */}
            <div className="fixed top-8 right-8 z-50 flex items-center space-x-8">
                {/* Time */}
                <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span ref={timeRef} className="text-sm font-mono text-white/80">00:00</span>
                </div>

                {/* Location */}
                <div className="text-sm font-mono text-white/60">
                    PKR • RWP
                </div>

                {/* Menu Button */}
                <button
                    onClick={() => handleNavClick("#contact")}
                    className="relative group"
                >
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-mono text-white/80 group-hover:text-white transition-colors">
                            CT
                        </span>
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent)'
                            }}
                        />
                    </div>
                </button>
            </div>

            {/* Center Floating Logo/Circle */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
                <div
                    ref={centerCircleRef}
                    className="relative w-32 h-32 opacity-5"
                >
                    {/* Outer ring */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}
                    />

                    {/* Inner design */}
                    <div className="absolute inset-4 rounded-full border border-cyan-400/30" />
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
                </div>
            </div>

            {/* Demo Content */}
            {/* <div className="ml-32">
        <section id="home" className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-white mb-4 tracking-tighter">
              NEXUS
            </h1>
            <p className="text-xl text-white/50 font-mono">CREATIVE STUDIO</p>
          </div>
        </section>

        <section id="work" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950/10 to-black">
          <div className="text-center">
            <span className="text-sm text-cyan-400 font-mono mb-4 block">01 / PORTFOLIO</span>
            <h2 className="text-7xl font-bold text-white tracking-tight">Selected Work</h2>
          </div>
        </section>

        <section id="services" className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <span className="text-sm text-purple-400 font-mono mb-4 block">02 / CAPABILITIES</span>
            <h2 className="text-7xl font-bold text-white tracking-tight">What We Do</h2>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-cyan-950/10 to-black">
          <div className="text-center">
            <span className="text-sm text-cyan-400 font-mono mb-4 block">03 / STORY</span>
            <h2 className="text-7xl font-bold text-white tracking-tight">Who We Are</h2>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <span className="text-sm text-purple-400 font-mono mb-4 block">04 / CONNECT</span>
            <h2 className="text-7xl font-bold text-white tracking-tight">Let's Talk</h2>
          </div>
        </section>
      </div> */}
        </>
    )
}
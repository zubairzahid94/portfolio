"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Search, PenTool, Code2, Send } from "lucide-react"
import gsap from "gsap"
import { ProcessCard } from "../process-card"

const processSteps = [
    {
        title: "Discover",
        description:
            "We dive deep into understanding your vision, goals, and challenges to create a solid foundation.",
        icon: Search,
    },
    {
        title: "Design",
        description:
            "Crafting beautiful, intuitive experiences that resonate with your audience and bring ideas to life.",
        icon: PenTool,
    },
    {
        title: "Build",
        description:
            "Transforming designs into robust, scalable solutions with cutting-edge technology and best practices.",
        icon: Code2,
    },
    {
        title: "Deliver",
        description:
            "Launching your project with precision, ensuring seamless deployment and ongoing support.",
        icon: Send,
    },
]

export function OurProcess() {
    const containerRef = useRef(null)
    const headerRef = useRef(null)
    const carouselRef = useRef(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        // Optimize header animation
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                immediateRender: false
            }
        )

        // Optimize mobile carousel animation
        gsap.to(carouselRef.current, {
            x: `-${currentSlide * 100}%`,
            duration: 0.5,
            ease: "power2.out",
            immediateRender: false,
            overwrite: "auto"
        })

        // Handle window resize
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                gsap.set(carouselRef.current, { x: `-${currentSlide * 100}%` })
            }, 100)
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            gsap.killTweensOf(carouselRef.current)
        }
    }, [currentSlide])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % processSteps.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + processSteps.length) % processSteps.length)
    }

    return (
        <section
            id="process"
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-background"
        >
            <div ref={headerRef} className="text-center mb-8 space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-balance">
                    How We Bring Ideas to Life
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    From creative chaos to structured clarity — our process transforms vision into reality
                </p>
            </div>

            <div className="hidden lg:flex relative w-full max-w-7xl h-[600px] lg:h-[700px] items-start justify-center pt-4">
                {processSteps.map((step, index) => (
                    <ProcessCard
                        key={step.title}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        index={index}
                    />
                ))}
            </div>

            <div className="lg:hidden w-full max-w-md relative">
                <div className="relative overflow-hidden">
                    <div ref={carouselRef} className="carousel flex">
                        {processSteps.map((step, index) => (
                            <div key={step.title} className="min-w-full px-4">
                                <div className="w-full h-[500px] bg-gradient-to-br from-card via-card to-card/90 rounded-3xl shadow-2xl p-6 flex flex-col items-start justify-between border border-primary/20 backdrop-blur-sm relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                                    <div className="space-y-6 relative z-10">
                                        <span className="text-4xl filter drop-shadow-lg">
                                            <step.icon className="w-10 h-10 text-primary" />
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {index + 1}</span>
                                            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-card-foreground tracking-tight">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                    <div className="w-full h-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full relative z-10 shadow-lg shadow-primary/30">
                                        <div className="shine absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full border-primary/30 hover:bg-primary/10 bg-transparent"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex gap-2">
                        {processSteps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/30"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full border-primary/30 hover:bg-primary/10 bg-transparent"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
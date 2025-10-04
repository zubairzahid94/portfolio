"use client"

import { useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProcessCard } from "../process-card"
import { Search, PenTool, Code2, Send } from "lucide-react"

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
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % processSteps.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + processSteps.length) % processSteps.length)
    }

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-background"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground text-balance">
                    How We Bring Ideas to Life
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    From creative chaos to structured clarity — our process transforms vision into reality
                </p>
            </motion.div>

            <div className="hidden md:flex relative w-full max-w-7xl h-[600px] lg:h-[700px] items-start justify-center pt-4">
                {processSteps.map((step, index) => (
                    <ProcessCard
                        key={step.title}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        index={index}
                        scrollProgress={scrollYProgress}
                    />
                ))}
            </div>

            <div className="md:hidden w-full max-w-md relative">
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: `-${currentSlide * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
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
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
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
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/30"
                                    }`}
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

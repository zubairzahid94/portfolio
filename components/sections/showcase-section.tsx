"use client"

import { useEffect } from "react"
import TiltedCard from "../animations/tilted-card"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const cardData = [
    {
        id: "web-dev",
        title: "Web Development",
        caption: "Frontend / Backend / Fullstack",
        imageSrc: "/code-brackets.jpg",
        glbPath: "/assets/3d/Duck.glb",
        videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-programming-code-running-on-a-screen-1437-large.mp4",
    },
    {
        id: "video-prod",
        title: "Video Production",
        caption: "Motion Graphics, Storytelling, Editing",
        imageSrc: "/cinematic-frame.jpg",
        glbPath: "/assets/3d/Duck.glb",
    },
    {
        id: "3d-modeling",
        title: "3D Modeling",
        caption: "Characters, Environments, Assets",
        imageSrc: "/dark-g.jpg",
        glbPath: "/assets/3d/Duck.glb",
    },
]

export default function ShowcaseSection() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <section
            ref={ref}
            className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-gray-950 to-black"
        >
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                    }}
                    className="text-balance text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
                >
                    What We Bring to Life
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.3, duration: 0.8 },
                        },
                    }}
                    className="text-pretty text-center text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4"
                >
                    Hover a card to see it awaken.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {cardData.map((card, i) => (
                        <motion.div
                            key={card.id}
                            custom={i}
                            initial={{ opacity: 0, rotateY: -90, scale: 0.85 }}
                            animate={controls}
                            variants={{
                                visible: (i: number) => ({
                                    opacity: 1,
                                    rotateY: 0,
                                    scale: 1,
                                    transition: {
                                        duration: 1.8,
                                        delay: i * 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                }),
                            }}
                            className="flex justify-center [perspective:1200px]"
                        >
                            <TiltedCard
                                imageSrc={card.imageSrc}
                                altText={card.title}
                                captionText={card.caption}
                                containerHeight="450px"
                                containerWidth="340px"
                                imageHeight="450px"
                                imageWidth="340px"
                                scaleOnHover={1.05}
                                rotateAmplitude={30}
                                showTooltip={true}
                                glbPath={card.glbPath}
                                videoSrc={card.videoSrc}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
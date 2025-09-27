"use client"

import { useEffect } from "react"
import TiltedCard from "../animations/tilted-card"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

// For actual production, these should be replaced with company assets.
// I'm using existing assets and generating queries for new ones.
const cardData = [
    {
        id: "web-dev",
        title: "Web Development",
        caption: "Frontend / Backend / Fullstack",
        imageSrc: "/code-brackets.jpg",
        // imageSrc: "/futuristic-glowing-code-brackets.jpg",
        glbPath: "/assets/3d/Duck.glb", // Using duck as placeholder for laptop
        videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-programming-code-running-on-a-screen-1437-large.mp4", // Placeholder video
    },
    {
        id: "video-prod",
        title: "Video Production",
        caption: "Motion Graphics, Storytelling, Editing",
        imageSrc: "/cinematic-frame.jpg",
        glbPath: "/assets/3d/Duck.glb", // Using duck as placeholder for laptop
        // imageSrc: "/cinematic-film-frame-with-dark-gradient.jpg",
        // glbPath: "/assets/3d/Duck.glb", // Generating a camera GLB
    },
    {
        id: "3d-modeling",
        title: "3D Modeling",
        caption: "Characters, Environments, Assets",
        imageSrc: "/dark-g.jpg",
        glbPath: "/assets/3d/Duck.glb", // Generating a character GLB
    },
    // {
    //     id: "graphic-design",
    //     title: "Graphic Design",
    //     caption: "Branding, UI, Visual Art",
    //     // imageSrc: "/vibrant-abstract-design-with-typography.jpg",
    //     // glbPath: "/assets/3d/Duck.glb", // Generating a paintbrush GLB
    // },
]

export default function ShowcaseSection() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    }

    return (
        <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-950 to-black">
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="text-balance text-center text-5xl font-bold text-white mb-4"
                >
                    What We Bring to Life
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
                    }}
                    className="text-pretty text-center text-xl text-gray-400 mb-16"
                >
                    Hover a card to see it awaken.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {cardData.map((card, i) => (
                        <motion.div
                            key={card.id}
                            custom={i}
                            initial="hidden"
                            animate={controls}
                            variants={cardVariants}
                            className="flex justify-center"
                        >
                            <TiltedCard
                                imageSrc={card.imageSrc}
                                altText={card.title}
                                captionText={card.caption}
                                containerHeight="400px"
                                containerWidth="300px"
                                imageHeight="400px"
                                imageWidth="300px"
                                scaleOnHover={1.05} // Slightly less scale for the overall card
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

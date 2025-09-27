"use client"

import type React from "react"

import type { SpringOptions } from "motion/react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { Card3DModel } from "../card-3d-model" // Import the new 3D model component
import { useMediaQuery } from "react-responsive" // For responsive behavior

interface TiltedCardProps {
    imageSrc: React.ComponentProps<"img">["src"]
    altText?: string
    captionText?: string
    containerHeight?: React.CSSProperties["height"]
    containerWidth?: React.CSSProperties["width"]
    imageHeight?: React.CSSProperties["height"]
    imageWidth?: React.CSSProperties["width"]
    scaleOnHover?: number
    rotateAmplitude?: number
    showTooltip?: boolean
    glbPath?: string // New prop for GLB model path
    videoSrc?: string // New prop for video source
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2,
}

export default function TiltedCard({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "300px",
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showTooltip = true,
    glbPath, // Destructure new prop
    videoSrc, // Destructure new prop
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(useMotionValue(0), springValues)
    const rotateY = useSpring(useMotionValue(0), springValues)
    const scale = useSpring(1, springValues)
    const opacity = useSpring(0)
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1,
    })

    const [lastY, setLastY] = useState(0)
    const isDesktop = useMediaQuery({ minWidth: 768 })
    const [isHovering, setIsHovering] = useState(false)

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current || !isDesktop) return // Disable tilt on mobile

        const rect = ref.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

        rotateX.set(rotationX)
        rotateY.set(rotationY)

        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)

        const velocityY = offsetY - lastY
        rotateFigcaption.set(-velocityY * 0.6)
        setLastY(offsetY)
    }

    function handleMouseEnter() {
        setIsHovering(true) // Set hovering state
        if (!isDesktop) return // Disable scale on mobile
        scale.set(scaleOnHover)
        opacity.set(1)
    }

    function handleMouseLeave() {
        setIsHovering(false) // Set hovering state
        if (!isDesktop) return // Disable scale on mobile
        opacity.set(0)
        scale.set(1)
        rotateX.set(0)
        rotateY.set(0)
        rotateFigcaption.set(0)
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative [transform-style:preserve-3d] rounded-[15px] overflow-hidden" // Added rounded and overflow hidden
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX: isDesktop ? rotateX : 0, // Apply tilt only on desktop
                    rotateY: isDesktop ? rotateY : 0, // Apply tilt only on desktop
                    scale: isDesktop ? scale : 1, // Apply scale only on desktop
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />

                {glbPath && (
                    <motion.div className="absolute top-0 left-0 z-[2] w-full h-full will-change-transform [transform:translateZ(30px)]">
                        <Card3DModel
                            glbPath={glbPath}
                            rotationX={rotateX}
                            rotationY={rotateY}
                            captionText={captionText}
                            videoSrc={videoSrc}
                        />
                    </motion.div>
                )}
            </motion.div>

            {showTooltip &&
                isHovering && ( // Show tooltip only on hover and desktop
                    <motion.figcaption
                        className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                        style={{
                            x,
                            y,
                            opacity,
                            rotate: rotateFigcaption,
                        }}
                    >
                        {captionText}
                    </motion.figcaption>
                )}
        </figure>
    )
}

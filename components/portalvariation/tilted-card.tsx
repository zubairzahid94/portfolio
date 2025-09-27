"use client"

import type React from "react"

import type { SpringOptions } from "motion/react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

interface TiltedCardProps {
    imageSrc?: React.ComponentProps<"img">["src"]
    altText?: string
    captionText?: string
    containerHeight?: React.CSSProperties["height"]
    containerWidth?: React.CSSProperties["width"]
    imageHeight?: React.CSSProperties["height"]
    imageWidth?: React.CSSProperties["width"]
    scaleOnHover?: number
    rotateAmplitude?: number
    showMobileWarning?: boolean
    showTooltip?: boolean
    overlayContent?: React.ReactNode
    displayOverlayContent?: boolean
    backgroundContent?: React.ReactNode
    backgroundZ?: number // depth for backgroundContent
    overlayZ?: number // depth for overlayContent
    glowOnHover?: boolean
    glowColor?: string // CSS color string for glow
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
    scaleOnHover = 1.08,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
    backgroundContent = null,
    backgroundZ = 0,
    overlayZ = 30,
    glowOnHover = true,
    glowColor = "rgba(59,130,246,0.45)", // soft blue glow
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
    const [hovered, setHovered] = useState(false)

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return

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
        setHovered(true)
        scale.set(scaleOnHover)
        opacity.set(1)
    }

    function handleMouseLeave() {
        setHovered(false)
        opacity.set(0)
        scale.set(1)
        rotateX.set(0)
        rotateY.set(0)
        rotateFigcaption.set(0)
    }

    return (
        <figure
            ref={ref}
            className="group relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    {"This effect is not optimized for mobile. Check on desktop."}
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d] rounded-[15px] overflow-hidden border border-border bg-card"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale,
                    boxShadow:
                        glowOnHover && hovered
                            ? `0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px ${glowColor}`
                            : "0 0 0 1px rgba(255,255,255,0.06)",
                }}
            >
                {backgroundContent && (
                    <motion.div
                        className="absolute inset-0 will-change-transform"
                        style={{
                            transform: `translateZ(${backgroundZ}px)`,
                            zIndex: 0,
                        }}
                    >
                        {backgroundContent}
                    </motion.div>
                )}

                {imageSrc && (
                    <motion.img
                        src={imageSrc}
                        alt={altText}
                        className="absolute top-0 left-0 object-cover will-change-transform [transform:translateZ(0)]"
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                            zIndex: 0,
                        }}
                    />
                )}

                {displayOverlayContent && overlayContent && (
                    <motion.div
                        className="absolute inset-0 z-[2] will-change-transform pointer-events-none"
                        style={{
                            transform: `translateZ(${overlayZ}px)`,
                        }}
                    >
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-background/80 px-[10px] py-[4px] text-[10px] text-foreground opacity-0 z-[3] hidden sm:block border border-border"
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

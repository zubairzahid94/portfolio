"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei"
import { type motionValue, useSpring } from "framer-motion"
import * as THREE from "three"

interface Card3DModelProps {
    glbPath: string
    rotationX: motionValue<number>
    rotationY: motionValue<number>
    captionText: string
    videoSrc?: string
}

function Model({
    glbPath,
    rotationX,
    rotationY,
    videoSrc,
}: { glbPath: string; rotationX: motionValue<number>; rotationY: motionValue<number>; videoSrc?: string }) {
    const { scene } = useGLTF(glbPath)
    const modelRef = useRef<THREE.Group>(null)

    // Convert Framer Motion values to Three.js rotation
    const springRotationX = useSpring(rotationX, { stiffness: 100, damping: 30, mass: 2 })
    const springRotationY = useSpring(rotationY, { stiffness: 100, damping: 30, mass: 2 })

    useFrame(() => {
        if (modelRef.current) {
            // Apply the rotation from the parent TiltedCard
            modelRef.current.rotation.x = THREE.MathUtils.degToRad(springRotationX.get() * 0.5) // Subtle parallax
            modelRef.current.rotation.y = THREE.MathUtils.degToRad(springRotationY.get() * 0.5) // Subtle parallax

            // Idle animation: gentle floating/breathing
            modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05
            modelRef.current.rotation.z = Math.sin(Date.now() * 0.0005) * 0.05
        }
    })

    // Optional: Video texture for Web Development card
    const [video] = useState(() =>
        Object.assign(document.createElement("video"), {
            src: videoSrc,
            loop: true,
            muted: true,
            playsInline: true,
            crossOrigin: "anonymous",
        }),
    )

    useEffect(() => {
        if (videoSrc) {
            video.play()
        }
    }, [video, videoSrc])

    return (
        <group ref={modelRef} dispose={null}>
            <primitive object={scene} scale={0.5} />
            {videoSrc && (
                <mesh position={[0, 0.2, 0.1]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[1, 0.6]} />
                    <meshBasicMaterial>
                        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
                    </meshBasicMaterial>
                </mesh>
            )}
        </group>
    )
}

export function Card3DModel({ glbPath, rotationX, rotationY, captionText, videoSrc }: Card3DModelProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    console.log("glb path", glbPath)
    useEffect(() => {
        // Preload GLB on mount
        useGLTF.preload(glbPath)
        setIsLoaded(true)
    }, [glbPath])

    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                <Suspense
                    fallback={
                        <Html center className="text-white text-sm">
                            Loading 3D model...
                        </Html>
                    }
                >
                    {isLoaded && <Model glbPath={glbPath} rotationX={rotationX} rotationY={rotationY} videoSrc={videoSrc} />}
                    {/* <Environment preset="sunset" background={false} /> */}
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                </Suspense>
            </Canvas>
        </div>
    )
}

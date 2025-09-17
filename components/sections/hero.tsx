"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, useGLTF, Text3D, Center } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import type * as THREE from "three"

function DuckModel(props: any) {
  const { scene } = useGLTF("/assets/3d/Duck.glb")
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene.clone()}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    />
  )
}

useGLTF.preload("/assets/3d/Duck.glb")

function InteractiveCoin({
  position,
  scale = 1,
  speed = 1,
}: { position: [number, number, number]; scale?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? scale * 1.2 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.9}
        roughness={0.1}
        emissive="#FFD700"
        emissiveIntensity={hovered ? 0.2 : 0.1}
      />
    </mesh>
  )
}

function FloatingObjects() {
  return (
    <>
      {/* Main Duck Character */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <DuckModel position={[3, 0, 0]} scale={1.5} />
      </Float>

      {/* Multiple Interactive Coins */}
      <InteractiveCoin position={[-4, 2, -1]} scale={1} speed={1.2} />
      <InteractiveCoin position={[4, -1, 1]} scale={0.8} speed={1.5} />
      <InteractiveCoin position={[-2, -2, 2]} scale={0.9} speed={1.8} />
      <InteractiveCoin position={[2, 3, -2]} scale={1.1} speed={1.3} />
      <InteractiveCoin position={[-5, 0, 0]} scale={0.7} speed={2} />
      <InteractiveCoin position={[5, 1, 2]} scale={0.9} speed={1.7} />
      <InteractiveCoin position={[0, -3, -1]} scale={0.8} speed={1.4} />
      <InteractiveCoin position={[-3, 3, 1]} scale={1.2} speed={1.1} />

      {/* Enhanced Colorful Gems */}
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={0.7}>
        <mesh position={[-3, -1.5, 0.5]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#9333EA"
            metalness={0.9}
            roughness={0.1}
            emissive="#9333EA"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={0.9} floatIntensity={0.5}>
        <mesh position={[2, 2.5, -0.5]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#06B6D4"
            metalness={0.9}
            roughness={0.1}
            emissive="#06B6D4"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.9}>
        <mesh position={[-2, 0.5, 2]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial
            color="#EC4899"
            metalness={0.9}
            roughness={0.1}
            emissive="#EC4899"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Additional Gems */}
      <Float speed={1.9} rotationIntensity={1.1} floatIntensity={0.6}>
        <mesh position={[4, 0.5, -1]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#F59E0B"
            metalness={0.9}
            roughness={0.1}
            emissive="#F59E0B"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      <Float speed={2.3} rotationIntensity={1.3} floatIntensity={0.8}>
        <mesh position={[-1, 2, -2]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#10B981"
            metalness={0.9}
            roughness={0.1}
            emissive="#10B981"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Game Cards */}
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[-1, -2, -1]} rotation={[0.2, 0.3, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[1.5, -1.5, 1.5]} rotation={[-0.1, -0.2, 0.1]}>
          <boxGeometry args={[0.5, 0.7, 0.04]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </Float>

      {/* Additional decorative elements */}
      <Float speed={2.8} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[1, -2.5, 1.5]} rotation={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={1.8} floatIntensity={0.7}>
        <mesh position={[-4, -1, 2]} rotation={[0.3, 0.7, 0.2]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#EF4444" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>
    </>
  )
}


export default function Hero() {



  return (
    <section id="home" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            {/* <Environment preset="night" /> */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#9333EA" />
            <pointLight position={[0, 10, 5]} intensity={0.6} color="#FFD700" />
            <spotLight position={[0, 0, 10]} intensity={1} angle={0.3} penumbra={1} />

            <FloatingObjects />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="block text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] [text-shadow:4px_4px_8px_rgba(0,0,0,0.5)]">
                JOIN THE
              </span>
              <span className="block text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] [text-shadow:4px_4px_8px_rgba(0,0,0,0.5)]">
                NEW ERA OF
              </span>
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text drop-shadow-[0_8px_16px_rgba(255,215,0,0.3)] [text-shadow:4px_4px_8px_rgba(255,215,0,0.3)]">
                CREATIVE
              </span>
            </h1>
          </div>


        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-5" />
    </section>
  )
}

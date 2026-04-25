'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Particles from './Particles'
import { Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <Particles count={3000} />
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 64, 64]} position={[2, 0, -2]}>
              <MeshDistortMaterial
                color="#06b6d4"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Float>
          <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
            <Sphere args={[0.7, 64, 64]} position={[-2, 1, -1]}>
              <MeshDistortMaterial
                color="#8b5cf6"
                attach="material"
                distort={0.5}
                speed={1.5}
                roughness={0.1}
                metalness={0.9}
              />
            </Sphere>
          </Float>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

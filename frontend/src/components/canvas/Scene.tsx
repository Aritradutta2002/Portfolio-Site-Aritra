'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useCallback } from 'react'
import Particles from './Particles'
import { Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Click Ripple Burst ─────────────────────────────────────── */
function RippleBurst({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (meshRef.current) {
      const scale = elapsed * 4
      meshRef.current.scale.setScalar(scale)
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 1 - elapsed * 2)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[0.4, 0.5, 32]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ── Camera Rig — follows mouse smoothly ────────────────────── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))

  useFrame(() => {
    // Parallax: camera shifts slightly based on mouse
    target.current.x += (mouse.current.x * 1.5 - target.current.x) * 0.06
    target.current.y += (mouse.current.y * 1.0 - target.current.y) * 0.06
    target.current.z = 5

    camera.position.lerp(target.current, 0.08)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Scene Inner (has access to Three context) ──────────────── */
function SceneInner({
  mouse,
  ripples,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  ripples: { id: number; pos: THREE.Vector3 }[]
}) {
  return (
    <>
      <CameraRig mouse={mouse} />

      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#ec4899" distance={8} />

      <Suspense fallback={null}>
        <Particles count={3000} mouse={mouse} />

        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[2, 0, -2]}>
            <MeshDistortMaterial
              color="#06b6d4"
              attach="material"
              distort={0.45}
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

        <Float speed={1} rotationIntensity={1} floatIntensity={2.5}>
          <Sphere args={[0.5, 32, 32]} position={[0, -2, -0.5]}>
            <MeshDistortMaterial
              color="#ec4899"
              attach="material"
              distort={0.6}
              speed={3}
              roughness={0.3}
              metalness={0.7}
            />
          </Sphere>
        </Float>

        {/* Click ripples */}
        {ripples.map(r => (
          <RippleBurst key={r.id} position={r.pos} />
        ))}

        <Environment preset="city" />
      </Suspense>
    </>
  )
}

/* ── Main exported Scene ────────────────────────────────────── */
export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; pos: THREE.Vector3 }[]>([])
  const rippleCounter = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { width, height } = currentTarget.getBoundingClientRect()
    mouse.current.x = (clientX / width - 0.5) * 2
    mouse.current.y = -(clientY / height - 0.5) * 2
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { width, height } = currentTarget.getBoundingClientRect()
    // Convert screen coords to a rough 3D world position at z=0
    const nx = (clientX / width - 0.5) * 10
    const ny = -(clientY / height - 0.5) * 6
    const pos = new THREE.Vector3(nx, ny, 0)
    const id = ++rippleCounter.current

    setRipples(prev => [...prev, { id, pos }])
    // Remove after animation completes (~700ms)
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 700)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[-1] bg-background"
      style={{ cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <SceneInner mouse={mouse} ripples={ripples} />
      </Canvas>
    </div>
  )
}

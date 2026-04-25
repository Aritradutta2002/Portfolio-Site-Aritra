'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useCallback, useMemo } from 'react'
import Particles from './Particles'
import { Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

function RippleBurst({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())
  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (meshRef.current) {
      meshRef.current.scale.setScalar(elapsed * 5)
      ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - elapsed * 2)
    }
  })
  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[0.3, 0.45, 48]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())
  const startPos = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 20,
    Math.random() * 8 + 2,
    (Math.random() - 0.5) * 8
  ), [])
  const dir = useMemo(() => new THREE.Vector3(-0.12, -0.08, 0), [])
  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (ref.current) {
      ref.current.position.copy(startPos).addScaledVector(dir, elapsed * 60)
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - elapsed * 0.7)
    }
  })
  return (
    <mesh ref={ref} position={startPos}>
      <sphereGeometry args={[0.025, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1} />
    </mesh>
  )
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))
  useFrame(() => {
    target.current.x += (mouse.current.x * 2.0 - target.current.x) * 0.04
    target.current.y += (mouse.current.y * 1.2 - target.current.y) * 0.04
    target.current.z = 5
    camera.position.lerp(target.current, 0.06)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function SceneInner({
  mouse,
  ripples,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  ripples: { id: number; pos: THREE.Vector3 }[]
}) {
  const [shootingStars, setShootingStars] = useState<{ id: number }[]>([])
  const lastStarTime = useRef(0)
  useFrame((state) => {
    if (state.clock.elapsedTime - lastStarTime.current > 5 + Math.random() * 6) {
      lastStarTime.current = state.clock.elapsedTime
      const id = Date.now()
      setShootingStars(prev => [...prev, { id }])
      setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), 2500)
    }
  })
  return (
    <>
      <CameraRig mouse={mouse} />
      <color attach="background" args={['#040408']} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
      <directionalLight position={[-10, -10, -10]} intensity={0.4} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#ec4899" distance={10} />
      <Suspense fallback={null}>
        <Particles count={18000} mouse={mouse} />
        <Stars radius={50} depth={30} count={3000} factor={2} saturation={0.5} fade speed={0.5} />
        {ripples.map(r => <RippleBurst key={r.id} position={r.pos} />)}
        {shootingStars.map(s => <ShootingStar key={s.id} />)}
        <Environment preset="night" />
      </Suspense>
    </>
  )
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; pos: THREE.Vector3 }[]>([])
  const rippleCounter = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 10
    const ny = -(e.clientY / window.innerHeight - 0.5) * 6
    const id = ++rippleCounter.current
    setRipples(prev => [...prev, { id, pos: new THREE.Vector3(nx, ny, 0) }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800)
  }, [])

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)
  }, [handleMouseMove, handleClick])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 5], fov: 65 }}>
        <SceneInner mouse={mouse} ripples={ripples} />
      </Canvas>
    </div>
  )
}

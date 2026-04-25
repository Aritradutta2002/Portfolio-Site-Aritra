'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function Particles({ count = 3000, mouse }: ParticlesProps) {
  const points = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state, delta) => {
    if (!points.current) return

    // Base slow rotation
    points.current.rotation.y -= delta * 0.03
    points.current.rotation.x -= delta * 0.01

    // Mouse parallax — shift the whole particle field subtly
    points.current.rotation.y += (mouse.current.x * 0.08 - points.current.rotation.y * 0.3) * 0.02
    points.current.rotation.x += (mouse.current.y * 0.05 - points.current.rotation.x * 0.3) * 0.02

    // Pulse scale with time for a breathing effect
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.012
    points.current.scale.setScalar(pulse)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8b5cf6"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

interface ParticlesProps {
  count?: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export default function Particles({ count = 15000, mouse }: ParticlesProps) {
  const points = useRef<THREE.Points>(null!)
  const { theme } = useTheme()
  
  // Default to dark mode colors if theme isn't resolved yet
  const isDark = theme !== 'light'

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const parameters = {
      radius: 14,
      spin: 1.5,
      branches: 4,
      randomness: 0.4,
      randomnessPower: 3,
      insideColor: isDark ? '#ff6030' : '#f97316', // Vibrant orange/pink
      outsideColor: isDark ? '#1b3984' : '#0ea5e9' // Deep blue/cyan
    }

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * parameters.radius
      const spinAngle = radius * parameters.spin
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

      // Flatter galaxy (Y is scaled down)
      positions[i * 3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i * 3 + 1] = randomY * 0.4 
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Color
      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / parameters.radius)

      colors[i * 3    ] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [count, isDark])

  useFrame((state, delta) => {
    if (!points.current) return

    // Base slow rotation for the galaxy
    points.current.rotation.y -= delta * 0.05

    // Dramatic parallax based on mouse
    // Tilt the galaxy up/down
    const targetRotationX = (mouse.current.y * 0.8) + 0.6 // default slightly tilted
    // Spin based on mouse X
    const targetRotationZ = mouse.current.x * 0.5
    
    // Smooth interpolation
    points.current.rotation.x += (targetRotationX - points.current.rotation.x) * 0.05
    points.current.rotation.z += (targetRotationZ - points.current.rotation.z) * 0.05

    // Breathing effect
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    points.current.scale.setScalar(pulse)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors={true}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

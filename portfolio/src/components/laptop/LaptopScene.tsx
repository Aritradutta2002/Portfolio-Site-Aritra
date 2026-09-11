'use client'

import * as React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import LaptopModel from './LaptopModel'

const CAM_START = new THREE.Vector3(0, 1.55, 6.4)
const CAM_END = new THREE.Vector3(0, 1.2, 1.6)
const LOOK_START = new THREE.Vector3(0, 0.25, 0)
const LOOK_END = new THREE.Vector3(0, 1.06, -1.11)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/* Dolly toward the screen once the lid has cleared ~32% of its travel. */
function CameraRig({
  progress,
  onOpened,
  opening,
}: {
  progress: React.MutableRefObject<number>
  onOpened: () => void
  opening: boolean
}) {
  const look = React.useRef(new THREE.Vector3().copy(LOOK_START))
  const fired = React.useRef(false)

  useFrame(({ camera }) => {
    const e = easeOutCubic(progress.current)
    const cp = THREE.MathUtils.clamp((e - 0.32) / 0.68, 0, 1)
    const ce = easeInOutCubic(cp)

    camera.position.lerpVectors(CAM_START, CAM_END, ce)
    look.current.lerpVectors(LOOK_START, LOOK_END, ce)
    camera.lookAt(look.current)

    if (opening && progress.current >= 1 && !fired.current) {
      fired.current = true
      onOpened()
    }
  })

  return null
}

export default function LaptopScene({
  opening,
  progress,
  reduce,
  onOpened,
}: {
  opening: boolean
  progress: React.MutableRefObject<number>
  reduce: boolean
  onOpened: () => void
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.55, 6.4], fov: 35, near: 0.1, far: 100 }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.75} />

      {/* Key light */}
      <directionalLight
        position={[4.5, 6.5, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      {/* Aurora rim lights — tie the 3D scene to the site palette */}
      <pointLight position={[-5, 1.6, -2]} intensity={26} color="#8B5CF6" distance={14} decay={2} />
      <pointLight position={[5, 0.8, 2]} intensity={18} color="#22D3EE" distance={14} decay={2} />
      <pointLight position={[0, -2.5, 3]} intensity={10} color="#F472B6" distance={12} decay={2} />

      <React.Suspense fallback={null}>
        <LaptopModel opening={opening} progress={progress} reduce={reduce} />
      </React.Suspense>

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.5}
        scale={14}
        blur={2.8}
        far={4}
        resolution={512}
        color="#000000"
      />

      <CameraRig progress={progress} opening={opening} onOpened={onOpened} />
    </Canvas>
  )
}

'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useCallback, useMemo } from 'react'
import Galaxy from './Galaxy'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────
   Click ripple — expanding ring on click
   ───────────────────────────────────────────────────────────── */
function RippleBurst({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())
  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.5 + elapsed * 6)
      ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.max(0, 1 - elapsed * 1.5)
    }
  })
  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[0.25, 0.4, 64]} />
      <meshBasicMaterial
        color="#a78bfa"
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────────────────
   Shooting star — bright head with long additive trail
   ───────────────────────────────────────────────────────────── */
function ShootingStar() {
  const groupRef = useRef<THREE.Group>(null!)
  const headRef  = useRef<THREE.Mesh>(null!)
  const trailRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())
  const startPos = useMemo(
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        Math.random() * 12 + 4,
        (Math.random() - 0.5) * 12
      ),
    []
  )
  const dir = useMemo(
    () => new THREE.Vector3(-0.18, -0.1, 0.04).normalize(),
    []
  )
  const speed = 12 + Math.random() * 8

  useFrame((state) => {
    const elapsed = (Date.now() - startTime.current) / 1000
    if (!groupRef.current) return
    const pos = startPos.clone().addScaledVector(dir, elapsed * speed)
    groupRef.current.position.copy(pos)
    // orient trail along velocity
    if (trailRef.current) {
      const lookAt = pos.clone().add(dir)
      trailRef.current.lookAt(lookAt)
    }
    const alpha = Math.max(0, 1 - elapsed * 0.45)
    if (headRef.current) {
      ;(headRef.current.material as THREE.MeshBasicMaterial).opacity = alpha
    }
    if (trailRef.current) {
      ;(trailRef.current.material as THREE.MeshBasicMaterial).opacity =
        alpha * 0.85
    }
    // small twinkle on the head
    if (headRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 30) * 0.15
      headRef.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={groupRef} position={startPos}>
      <mesh ref={headRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={trailRef} position={[0.6, 0.3, 0]}>
        <planeGeometry args={[2.2, 0.04]} />
        <meshBasicMaterial
          color="#c4b5fd"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   Distant background starfield (very small twinkling stars)
   ───────────────────────────────────────────────────────────── */
function DistantStars() {
  const ref = useRef<THREE.Points>(null!)

  const { positions, sizes, seeds } = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)
    const seeds     = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // distribute on a large sphere shell
      const r = 60 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() < 0.05 ? 2.0 : 0.6 + Math.random() * 0.8
      seeds[i] = Math.random()
    }
    return { positions, sizes, seeds }
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005
    }
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          attribute float aSize;
          attribute float aSeed;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vSeed;
          void main() {
            vSeed = aSeed;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float tw = 0.6 + 0.4 * sin(uTime * 1.4 + aSeed * 6.28);
            gl_PointSize = aSize * uPixelRatio * tw;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          varying float vSeed;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d);
            // slight blue/white variation
            vec3 c1 = vec3(0.92, 0.95, 1.0);
            vec3 c2 = vec3(0.75, 0.85, 1.0);
            vec3 c3 = vec3(1.0, 0.9, 0.8);
            vec3 col = mix(c1, c2, vSeed);
            col = mix(col, c3, step(0.85, vSeed));
            gl_FragColor = vec4(col, a * 0.9);
          }
        `}
        uniforms={{ uTime: { value: 0 }, uPixelRatio: { value: 1 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────────────────
   Cinematic camera — slow auto-orbit + mouse parallax
   ───────────────────────────────────────────────────────────── */
function CameraRig({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const { camera } = useThree()
  const t0 = useRef(0)
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    t0.current += delta

    // Slow auto-orbit radius with subtle vertical bob
    const t = t0.current
    const baseRadius = 7.5
    const orbit = Math.sin(t * 0.08) * 0.9         // small x sway
    const yBob  = Math.sin(t * 0.12) * 0.5        // vertical bob
    const targetX = Math.sin(t * 0.05) * baseRadius + mouse.current.x * 1.6 + orbit
    const targetY = 2.0 + yBob + mouse.current.y * 1.1
    const targetZ = Math.cos(t * 0.05) * baseRadius

    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.position.z += (targetZ - camera.position.z) * 0.04
    camera.lookAt(lookTarget.current)
  })
  return null
}

/* ─────────────────────────────────────────────────────────────
   Inner scene — what lives inside the <Canvas>
   ───────────────────────────────────────────────────────────── */
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
    if (state.clock.elapsedTime - lastStarTime.current > 4 + Math.random() * 6) {
      lastStarTime.current = state.clock.elapsedTime
      const id = Date.now() + Math.random()
      setShootingStars((prev) => [...prev, { id }])
      setTimeout(
        () => setShootingStars((prev) => prev.filter((s) => s.id !== id)),
        3500
      )
    }
  })

  return (
    <>
      <CameraRig mouse={mouse} />
      <color attach="background" args={['#02010a']} />
      {/* Deep space fog for depth */}
      <fog attach="fog" args={['#02010a', 18, 60]} />
      <ambientLight intensity={0.15} />

      <Suspense fallback={null}>
        <Galaxy mouse={mouse} />
        <DistantStars />
        <Stars
          radius={120}
          depth={60}
          count={1500}
          factor={3}
          saturation={0.4}
          fade
          speed={0.3}
        />
        {ripples.map((r) => (
          <RippleBurst key={r.id} position={r.pos} />
        ))}
        {shootingStars.map((s) => (
          <ShootingStar key={s.id} />
        ))}
      </Suspense>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   Exported Scene component
   ───────────────────────────────────────────────────────────── */
export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; pos: THREE.Vector3 }[]>(
    []
  )
  const rippleCounter = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 14
    const ny = -(e.clientY / window.innerHeight - 0.5) * 8
    const id = ++rippleCounter.current
    setRipples((prev) => [...prev, { id, pos: new THREE.Vector3(nx, ny, 0) }])
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      1100
    )
  }, [])

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick)
  }, [handleMouseMove, handleClick])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 2, 7.5], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <SceneInner mouse={mouse} ripples={ripples} />
      </Canvas>
    </div>
  )
}

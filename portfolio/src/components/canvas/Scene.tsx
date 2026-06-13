'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState, useCallback, useMemo } from 'react'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ══════════════════════════════════════════════════════════════
   AURORA CSS LAYER
══════════════════════════════════════════════════════════════ */
function AuroraLayer() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" style={{ background: '#04040c' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(139,92,246,0.18) 0%, transparent 55%)',
      }} />
      <div className="absolute w-full" style={{
        top: '8%', height: '35%',
        background: 'radial-gradient(ellipse 80% 100% at 20% 50%, rgba(124,58,237,0.22) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'aurora1 12s ease-in-out infinite alternate',
      }} />
      <div className="absolute w-full" style={{
        top: '5%', height: '40%',
        background: 'radial-gradient(ellipse 70% 100% at 80% 50%, rgba(6,182,212,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'aurora2 15s ease-in-out infinite alternate',
      }} />
      <div className="absolute w-full" style={{
        top: '0%', height: '30%',
        background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(236,72,153,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'aurora3 18s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(4,4,12,0.95) 0%, transparent 40%)',
      }} />
      <style>{`
        @keyframes aurora1 {
          0%   { transform: translateX(-8%) scaleX(1);    opacity: 0.7; }
          100% { transform: translateX( 8%) scaleX(1.15); opacity: 1;   }
        }
        @keyframes aurora2 {
          0%   { transform: translateX( 10%) scaleX(1.1); opacity: 0.6; }
          100% { transform: translateX(-10%) scaleX(0.9); opacity: 1;   }
        }
        @keyframes aurora3 {
          0%   { transform: translateX(-5%) scaleY(1);   opacity: 0.5; }
          100% { transform: translateX( 5%) scaleY(1.3); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   NEURAL NETWORK — floating nodes + pulsing connections
══════════════════════════════════════════════════════════════ */
const NODE_COUNT = 28

function PulsingNode({ position, index }: { position: THREE.Vector3; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const colors = ['#8b5cf6','#06b6d4','#ec4899','#a78bfa','#22d3ee','#8b5cf6','#06b6d4','#ec4899']
  const color = colors[index % colors.length]
  const speed = 0.8 + index * 0.15
  useFrame((state) => {
    if (!meshRef.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * speed + index) * 0.3
    meshRef.current.scale.setScalar(s)
    ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.4 + Math.sin(state.clock.elapsedTime * speed + index) * 0.25
  })
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

function NeuralNetwork() {
  const groupRef  = useRef<THREE.Group>(null!)
  const linesRef  = useRef<THREE.LineSegments>(null!)
  const pointsRef = useRef<THREE.Points>(null!)

  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const rng = mulberry32(42)
    for (let i = 0; i < NODE_COUNT; i++) {
      pts.push(new THREE.Vector3(
        (rng() - 0.5) * 20,
        (rng() - 0.5) * 12,
        (rng() - 0.5) * 10 - 4,
      ))
    }
    return pts
  }, [])

  const { lineGeo, nodeGeo } = useMemo(() => {
    const linePos: number[] = []
    const nodePos: number[] = []
    const DIST = 5.5
    for (const n of nodes) nodePos.push(n.x, n.y, n.z)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < DIST) {
          linePos.push(nodes[i].x, nodes[i].y, nodes[i].z)
          linePos.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    const lg = new THREE.BufferGeometry()
    lg.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    const ng = new THREE.BufferGeometry()
    ng.setAttribute('position', new THREE.Float32BufferAttribute(nodePos, 3))
    return { lineGeo: lg, nodeGeo: ng }
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.025
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.08
    }
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </lineSegments>
      <points ref={pointsRef} geometry={nodeGeo}>
        <pointsMaterial color="#a78bfa" size={0.09} transparent opacity={0.7} sizeAttenuation />
      </points>
      {nodes.slice(0, 8).map((pos, i) => (
        <PulsingNode key={i} position={pos} index={i} />
      ))}
    </group>
  )
}

/* ══════════════════════════════════════════════════════════════
   WIREFRAME ICOSAHEDRON
══════════════════════════════════════════════════════════════ */
function WireIcosahedron() {
  const outerRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const ringRef  = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.07
      outerRef.current.rotation.y = t * 0.11
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.09
      innerRef.current.rotation.y = -t * 0.06
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12
      ringRef.current.rotation.x = Math.sin(t * 0.04) * 0.5
    }
  })
  return (
    <group position={[7, 1, -7]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.14} wireframe />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.07} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.025, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

/* ══════════════════════════════════════════════════════════════
   FLOATING OCTAHEDRON
══════════════════════════════════════════════════════════════ */
function FloatingOctahedron() {
  const ref   = useRef<THREE.Mesh>(null!)
  const ring1 = useRef<THREE.Mesh>(null!)
  const ring2 = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.x = t * 0.06
      ref.current.rotation.y = t * 0.09
      ref.current.position.y = 0.5 + Math.sin(t * 0.4) * 0.4
    }
    if (ring1.current) ring1.current.rotation.y = t * 0.15
    if (ring2.current) ring2.current.rotation.x = -t * 0.1
  })
  return (
    <group position={[-8, 0, -9]}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.08} wireframe />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.02, 8, 60]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.12} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.0, 0.015, 8, 60]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

/* ══════════════════════════════════════════════════════════════
   PARTICLE FIELD — purple/cyan
══════════════════════════════════════════════════════════════ */
function ParticleField({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const COUNT = 4000
  const pointsRef = useRef<THREE.Points>(null!)

  const geo = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []
    const palette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#ffffff'),
    ]
    const rng = mulberry32(123)
    for (let i = 0; i < COUNT; i++) {
      const theta = rng() * Math.PI * 2
      const phi   = Math.acos(2 * rng() - 1)
      const r     = 10 + rng() * 20
      pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi))
      const c = palette[Math.floor(rng() * palette.length)]
      col.push(c.r, c.g, c.b)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setAttribute('color',    new THREE.Float32BufferAttribute(col, 3))
    return g
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012 + mouse.current.x * 0.05
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.005 + mouse.current.y * 0.03
  })

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial vertexColors size={0.04} transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

/* ══════════════════════════════════════════════════════════════
   RIPPLE
══════════════════════════════════════════════════════════════ */
function RippleBurst({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null!)
  const start = useRef(Date.now())
  useFrame(() => {
    const e = (Date.now() - start.current) / 1000
    if (ref.current) {
      ref.current.scale.setScalar(e * 6)
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - e * 2.5)
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[0.2, 0.35, 48]} />
      <meshBasicMaterial color="#a78bfa" transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* Camera parallax */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const target = useRef(new THREE.Vector3(0, 0, 5))
  useFrame(({ camera }) => {
    target.current.x += (mouse.current.x * 1.5 - target.current.x) * 0.035
    target.current.y += (mouse.current.y * 0.8  - target.current.y) * 0.035
    target.current.z = 5
    camera.position.lerp(target.current, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* Seeded PRNG so useMemo is deterministic */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function SceneInner({
  mouse, ripples,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  ripples: { id: number; pos: THREE.Vector3 }[]
}) {
  return (
    <>
      <CameraRig mouse={mouse} />
      <color attach="background" args={['#04040c']} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 3]}   intensity={0.8} color="#8b5cf6" distance={20} />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#06b6d4" distance={18} />
      <pointLight position={[0, 8, -5]}  intensity={0.4} color="#ec4899" distance={15} />
      <Suspense fallback={null}>
        <Stars radius={80} depth={50} count={5000} factor={2} saturation={0.6} fade speed={0.3} />
        <ParticleField mouse={mouse} />
        <NeuralNetwork />
        <WireIcosahedron />
        <FloatingOctahedron />
        {ripples.map(r => <RippleBurst key={r.id} position={r.pos} />)}
      </Suspense>
    </>
  )
}

export default function Scene() {
  const mouse   = useRef({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; pos: THREE.Vector3 }[]>([])
  const rippleN = useRef(0)

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  const onClick = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 10
    const y = -(e.clientY / window.innerHeight - 0.5) * 6
    const id = ++rippleN.current
    setRipples(p => [...p, { id, pos: new THREE.Vector3(x, y, 0) }])
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 700)
  }, [])

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)
  }, [onMove, onClick])

  return (
    <>
      <AuroraLayer />
      <div ref={ref} className="fixed inset-0 z-[-1]">
        <Canvas camera={{ position: [0, 0, 5], fov: 65 }}>
          <SceneInner mouse={mouse} ripples={ripples} />
        </Canvas>
      </div>
    </>
  )
}

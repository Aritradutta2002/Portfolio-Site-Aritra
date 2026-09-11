'use client'

import * as React from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

/* ── Procedural MacBook ────────────────────────────────────────────────────
   Built entirely from primitives + generated canvas textures. No external
   GLB: zero licensing risk (Plan §11) and nothing to download. */

const BASE_W = 3.0
const BASE_D = 2.05
const BASE_H = 0.085
const LID_W = 3.0
const LID_H = 2.02
const LID_T = 0.075

const CLOSED = Math.PI / 2   /* lid folded flat onto the deck */
const OPEN = -0.14           /* ~8° past vertical, like a real MacBook */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/* ── Generated textures ───────────────────────────────────────────────── */

function useKeyboardTexture() {
  return React.useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 440
    const g = c.getContext('2d')!

    g.fillStyle = '#1B1B1E'
    g.fillRect(0, 0, c.width, c.height)

    const rows = [0, 1, 2, 3, 4, 5]
    const cols = 14
    const padX = 26
    const padY = 26
    const gap = 6
    const kw = (c.width - padX * 2 - gap * (cols - 1)) / cols
    const kh = (c.height - padY * 2 - gap * (rows.length - 1)) / rows.length

    rows.forEach((r, ri) => {
      for (let ci = 0; ci < cols; ci++) {
        /* Space bar row: one wide key in the middle */
        if (ri === 5 && ci > 3 && ci < 10) {
          if (ci !== 4) continue
          const w = kw * 6 + gap * 5
          const x = padX + ci * (kw + gap)
          const y = padY + ri * (kh + gap)
          roundRect(g, x, y, w, kh, 7)
          g.fillStyle = '#26262A'
          g.fill()
          g.strokeStyle = 'rgba(255,255,255,0.05)'
          g.lineWidth = 1.5
          g.stroke()
          continue
        }
        const x = padX + ci * (kw + gap)
        const y = padY + ri * (kh + gap)
        roundRect(g, x, y, kw, kh, 7)
        g.fillStyle = ri === 0 ? '#232327' : '#26262A'
        g.fill()
        g.strokeStyle = 'rgba(255,255,255,0.055)'
        g.lineWidth = 1.5
        g.stroke()
      }
    })

    const tex = new THREE.CanvasTexture(c)
    tex.anisotropy = 4
    tex.needsUpdate = true
    return tex
  }, [])
}

function useScreenTexture() {
  /* The real desktop wallpaper, center-cropped to the 16:10 screen. Renders
     the exact image the DOM desktop will show — a seamless 3D → 2D handoff. */
  const tex = useLoader(THREE.TextureLoader, '/wallpapers/macos-dark.jpg')
  React.useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    /* Cover-fit whatever the source aspect is to the 2.81×1.83 screen. */
    const img = tex.image as { width?: number; height?: number } | undefined
    const texAspect =
      img?.width && img?.height ? img.width / img.height : 16 / 10
    const screenAspect = 2.81 / 1.83
    if (texAspect > screenAspect) {
      /* Source wider than screen — crop the sides. */
      const u = screenAspect / texAspect
      tex.repeat.set(u, 1)
      tex.offset.set((1 - u) / 2, 0)
    } else {
      /* Source taller than screen — crop top and bottom. */
      const v = screenAspect / texAspect
      tex.repeat.set(1, v)
      tex.offset.set(0, (1 - v) / 2)
    }
    tex.anisotropy = 4
    tex.needsUpdate = true
  }, [tex])
  return tex
}

function roundRect(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  g.beginPath()
  g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r)
  g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r)
  g.arcTo(x, y, x + w, y, r)
  g.closePath()
}

/* ── Model ────────────────────────────────────────────────────────────── */

export default function LaptopModel({
  opening,
  progress,
  reduce,
}: {
  opening: boolean
  progress: React.MutableRefObject<number>
  reduce: boolean
}) {
  const lidRef = React.useRef<THREE.Group>(null)
  const bodyRef = React.useRef<THREE.Group>(null)
  const glowRef = React.useRef<THREE.PointLight>(null)

  const keyboardTex = useKeyboardTexture()
  const screenTex = useScreenTexture()

  React.useEffect(
    () => () => {
      keyboardTex.dispose()
      screenTex.dispose()
    },
    [keyboardTex, screenTex]
  )

  useFrame((state, delta) => {
    /* Advance the open animation */
    if (opening) {
      progress.current = Math.min(1, progress.current + delta / 1.2)
    }
    const e = easeOutCubic(progress.current)

    if (lidRef.current) {
      lidRef.current.rotation.x = CLOSED + (OPEN - CLOSED) * e
    }

    /* Idle: gentle sine tilt, and a slow drift before the lid opens */
    if (bodyRef.current) {
      const t = state.clock.elapsedTime
      const idleAmount = 1 - e * 0.75
      bodyRef.current.rotation.y = Math.sin(t * 0.38) * 0.2 * idleAmount
      bodyRef.current.rotation.x = (reduce ? 0 : Math.sin(t * 0.27) * 0.05) * idleAmount
      bodyRef.current.position.y = 0.08 + Math.sin(t * 0.62) * 0.035 * idleAmount
    }

    /* Screen bleeds light onto the deck as it opens */
    if (glowRef.current) {
      glowRef.current.intensity = 0.15 + e * 1.5
    }
  })

  return (
    <group ref={bodyRef} position={[0, 0.08, 0]}>
      {/* ── Base ── */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#C9CCD3" metalness={0.82} roughness={0.36} />
      </RoundedBox>

      {/* Deck inset (dark keyboard well) */}
      <mesh position={[0, BASE_H / 2 + 0.006, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.56, 1.16]} />
        <meshBasicMaterial map={keyboardTex} toneMapped={false} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, BASE_H / 2 + 0.004, 0.72]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.98, 0.66]} />
        <meshStandardMaterial color="#BFC3CA" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Hinge */}
      <mesh position={[0, BASE_H / 2 - 0.005, -BASE_D / 2 + 0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.042, 0.042, 2.5, 20]} />
        <meshStandardMaterial color="#8E9198" metalness={0.9} roughness={0.35} />
      </mesh>

      {/* ── Lid (hinged at the back edge) ── */}
      <group ref={lidRef} position={[0, BASE_H / 2, -BASE_D / 2 + 0.02]} rotation={[CLOSED, 0, 0]}>
        {/* Shell */}
        <RoundedBox args={[LID_W, LID_H, LID_T]} radius={0.03} smoothness={4} position={[0, LID_H / 2, 0]}>
          <meshStandardMaterial color="#C9CCD3" metalness={0.82} roughness={0.36} />
        </RoundedBox>

        {/* Bezel */}
        <mesh position={[0, LID_H / 2, LID_T / 2 + 0.001]}>
          <planeGeometry args={[LID_W - 0.1, LID_H - 0.1]} />
          <meshStandardMaterial color="#0B0B0D" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Display */}
        <mesh position={[0, LID_H / 2, LID_T / 2 + 0.004]}>
          <planeGeometry args={[LID_W - 0.19, LID_H - 0.19]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>

        {/* Camera dot */}
        <mesh position={[0, LID_H - 0.055, LID_T / 2 + 0.006]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color="#2A2A30" toneMapped={false} />
        </mesh>

        {/* Lid logo */}
        <mesh position={[0, LID_H / 2, -LID_T / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.11, 32]} />
          <meshStandardMaterial color="#E8EAEE" metalness={0.95} roughness={0.18} />
        </mesh>
      </group>

      {/* Screen glow that ramps up as the lid opens */}
      <pointLight
        ref={glowRef}
        position={[0, 0.9, -0.6]}
        color="#57C4C7"
        intensity={0.15}
        distance={5}
        decay={2}
      />
    </group>
  )
}

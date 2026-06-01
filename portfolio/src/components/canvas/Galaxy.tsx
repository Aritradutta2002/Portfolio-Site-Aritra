'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════════
   TEXTURE GENERATORS — soft circular sprites for points/nebulae
   ═══════════════════════════════════════════════════════════════ */
function makePointTexture(size = 128, power = 2.0): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const half = size / 2
  const g = ctx.createRadialGradient(half, half, 0, half, half, half)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(Math.pow(0.18, 1 / power), 'rgba(255,255,255,0.9)')
  g.addColorStop(Math.pow(0.45, 1 / power), 'rgba(255,255,255,0.35)')
  g.addColorStop(0.75, 'rgba(255,255,255,0.08)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

function makeNebulaTexture(size = 256): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  // soft outer
  const half = size / 2
  const base = ctx.createRadialGradient(half, half, 0, half, half, half)
  base.addColorStop(0, 'rgba(255,255,255,0.55)')
  base.addColorStop(0.4, 'rgba(255,255,255,0.18)')
  base.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)
  // add organic blobs
  for (let i = 0; i < 14; i++) {
    const x = half + (Math.random() - 0.5) * size * 0.7
    const y = half + (Math.random() - 0.5) * size * 0.7
    const r = size * 0.12 + Math.random() * size * 0.28
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(255,255,255,${0.18 + Math.random() * 0.2})`)
    g.addColorStop(0.5, 'rgba(255,255,255,0.08)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

/* ═══════════════════════════════════════════════════════════════
   SHADERS
   ═══════════════════════════════════════════════════════════════ */
const pointsVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute float aBrightness;
  varying vec3 vColor;
  varying float vBrightness;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeBoost;

  void main() {
    vColor = color;
    vBrightness = aBrightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Subtle twinkle
    float twinkle = 0.78 + 0.22 * sin(uTime * 1.6 + aSeed * 6.2831);
    gl_PointSize = aSize * uSizeBoost * uPixelRatio * (300.0 / -mvPosition.z) * twinkle;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const pointsFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vBrightness;
  uniform sampler2D uTexture;

  void main() {
    vec4 tex = texture2D(uTexture, gl_PointCoord);
    if (tex.a < 0.01) discard;
    vec3 c = vColor * vBrightness;
    gl_FragColor = vec4(c, 1.0) * tex;
  }
`

const nebulaVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aTint;
  attribute float aIntensity;
  varying vec3 vTint;
  varying float vIntensity;
  void main() {
    vTint = aTint;
    vIntensity = aIntensity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (320.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const nebulaFragment = /* glsl */ `
  varying vec3 vTint;
  varying float vIntensity;
  uniform sampler2D uTexture;
  void main() {
    vec4 tex = texture2D(uTexture, gl_PointCoord);
    if (tex.a < 0.01) discard;
    gl_FragColor = vec4(vTint * vIntensity, 1.0) * tex;
  }
`

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const coreFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uTime;
  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.2);
    vec3 col = mix(uColorInner, uColorOuter, fres);
    float pulse = 0.92 + 0.08 * sin(uTime * 1.2);
    gl_FragColor = vec4(col * pulse, fres);
  }
`

const diskVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const diskFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  // ── Simplex 2D noise (Ashima Arts) ─────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;
    if (r > 1.0) discard;

    float angle = atan(c.y, c.x);
    // spiral pattern that slowly drifts
    float spiral = angle * 2.0 + r * 5.0 + uTime * 0.04;
    float n  = fbm(vec2(spiral * 1.4, r * 6.0)) * 0.5 + 0.5;
    float n2 = fbm(vec2(spiral * 3.0 + 11.0, r * 14.0)) * 0.5 + 0.5;

    float falloff = pow(1.0 - r, 1.4);
    float dust    = smoothstep(0.35, 0.95, n) * falloff * 0.55;
    float wisps   = smoothstep(0.55, 0.95, n2) * falloff * 0.35;

    // Color palette
    vec3 cPurple = vec3(0.55, 0.36, 0.96);
    vec3 cCyan   = vec3(0.02, 0.71, 0.83);
    vec3 cPink   = vec3(0.93, 0.28, 0.60);
    vec3 cDeep   = vec3(0.10, 0.08, 0.35);

    vec3 col = mix(cDeep, cPurple, smoothstep(0.0, 0.4, r));
    col = mix(col, cCyan, smoothstep(0.4, 0.85, r));
    col = mix(col, cPink, n * 0.55);
    col += cPink * wisps * 0.5;

    float alpha = clamp(dust + wisps * 0.5, 0.0, 0.55);
    // fade edges softly
    alpha *= smoothstep(1.0, 0.85, r);
    gl_FragColor = vec4(col, alpha);
  }
`

const haloVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const haloFragment = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColor;
  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;
    float a = pow(1.0 - clamp(r, 0.0, 1.0), 3.0);
    gl_FragColor = vec4(uColor, a * 0.55);
  }
`

/* ═══════════════════════════════════════════════════════════════
   GALAXY DATA GENERATOR
   ═══════════════════════════════════════════════════════════════ */
interface GalaxyOptions {
  count: number
  radius: number
  branches: number
  spin: number
  randomness: number
  randomnessPower: number
  innerColor: THREE.Color
  outerColor: THREE.Color
  /** vertical flatten factor — smaller = thinner disk */
  verticalSquash: number
  /** extra noise amount applied on top */
  noiseAmount: number
  /** y-jitter amount */
  yJitter: number
}

function buildGalaxyData(opts: GalaxyOptions) {
  const positions = new Float32Array(opts.count * 3)
  const colors    = new Float32Array(opts.count * 3)
  const sizes     = new Float32Array(opts.count)
  const seeds     = new Float32Array(opts.count)
  const bright    = new Float32Array(opts.count)

  const cIn  = opts.innerColor.clone()
  const cOut = opts.outerColor.clone()

  for (let i = 0; i < opts.count; i++) {
    // Radial position with slight bias toward center for bright core
    const r3 = Math.random()
    const radius = Math.pow(r3, 0.65) * opts.radius

    const spinAngle  = radius * opts.spin
    const branchAngle =
      ((i % opts.branches) / opts.branches) * Math.PI * 2 +
      (Math.random() - 0.5) * 0.35

    const randomX =
      Math.pow(Math.random(), opts.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      opts.randomness *
      radius
    const randomY =
      (Math.random() < 0.5 ? 1 : -1) *
      Math.pow(Math.random(), opts.randomnessPower) *
      opts.yJitter *
      radius
    const randomZ =
      Math.pow(Math.random(), opts.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      opts.randomness *
      radius

    const x = Math.cos(branchAngle + spinAngle) * radius + randomX
    const z = Math.sin(branchAngle + spinAngle) * radius + randomZ
    // Disk-like vertical squash with some thickness
    const y = randomY * opts.verticalSquash +
              Math.sin(branchAngle * 2.0) * 0.08

    positions[i * 3]     = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Color: blend inner→outer, with slight randomness
    const t = radius / opts.radius
    const col = cIn.clone().lerp(cOut, t)
    // Slight per-particle hue jitter
    const jitter = 0.85 + Math.random() * 0.3
    colors[i * 3]     = col.r * jitter
    colors[i * 3 + 1] = col.g * jitter
    colors[i * 3 + 2] = col.b * jitter

    // Size: most small, a few large bright ones (binomial)
    const sizeRoll = Math.random()
    let size = 0.7 + Math.random() * 1.3
    if (sizeRoll > 0.985) size *= 4.0       // bright giants
    else if (sizeRoll > 0.92) size *= 2.2   // medium bright
    // Inner stars a bit bigger
    size *= 1.0 + (1.0 - t) * 0.6
    sizes[i] = size

    seeds[i] = Math.random()
    // Brightness — most are 0.7–1.0, giants are 1.4–2.0
    let b = 0.7 + Math.random() * 0.3
    if (sizeRoll > 0.985) b = 1.4 + Math.random() * 0.8
    else if (sizeRoll > 0.92) b = 1.1 + Math.random() * 0.4
    bright[i] = b
  }

  return { positions, colors, sizes, seeds, bright }
}

/* ═══════════════════════════════════════════════════════════════
   SUBCOMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StarLayer({
  count,
  opts,
  sizeBoost,
  pointTexture,
}: {
  count: number
  opts: GalaxyOptions
  sizeBoost: number
  pointTexture: THREE.Texture
}) {
  const pointsRef = useRef<THREE.Points>(null!)
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const { positions, colors, sizes, seeds, bright } = useMemo(
    () => buildGalaxyData({ ...opts, count }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, opts.radius, opts.branches, opts.spin, opts.randomness, opts.innerColor, opts.outerColor, opts.verticalSquash, opts.yJitter]
  )

  const { gl } = useThree()
  const pixelRatio = Math.min(gl.getPixelRatio(), 2)

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
      matRef.current.uniforms.uPixelRatio.value = pixelRatio
      matRef.current.uniforms.uSizeBoost.value = sizeBoost
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[bright, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={pointsVertex}
        fragmentShader={pointsFragment}
        uniforms={{
          uTime:        { value: 0 },
          uPixelRatio:  { value: pixelRatio },
          uSizeBoost:   { value: sizeBoost },
          uTexture:     { value: pointTexture },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  )
}

function NebulaLayer({
  count,
  radius,
  nebulaTexture,
}: {
  count: number
  radius: number
  nebulaTexture: THREE.Texture
}) {
  const pointsRef = useRef<THREE.Points>(null!)
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const { positions, sizes, tints, intensities } = useMemo(() => {
    const positions   = new Float32Array(count * 3)
    const sizes       = new Float32Array(count)
    const tints       = new Float32Array(count * 3)
    const intensities = new Float32Array(count)

    const palette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#a855f7'),
    ]

    for (let i = 0; i < count; i++) {
      const r3 = Math.random()
      const r = Math.pow(r3, 0.55) * radius
      const branch = (Math.random()) * Math.PI * 2
      const spin   = r * 1.0
      const ang    = branch + spin
      const jitter = (Math.random() - 0.5) * r * 0.7
      const x = Math.cos(ang) * r + jitter
      const z = Math.sin(ang) * r + jitter * 0.5
      const y = (Math.random() - 0.5) * 0.25 * r

      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      sizes[i] = 8 + Math.random() * 14
      const t = r / radius
      const c = palette[Math.floor(Math.random() * palette.length)].clone()
      // shift toward purple in the center, cyan at the edges
      c.lerp(new THREE.Color('#1e1b4b'), t * 0.3)
      tints[i * 3]     = c.r
      tints[i * 3 + 1] = c.g
      tints[i * 3 + 2] = c.b
      intensities[i] = 0.18 + Math.random() * 0.35
    }
    return { positions, sizes, tints, intensities }
  }, [count, radius])

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.003
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aTint" args={[tints, 3]} />
        <bufferAttribute attach="attributes-aIntensity" args={[intensities, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={nebulaVertex}
        fragmentShader={nebulaFragment}
        uniforms={{
          uTime:    { value: 0 },
          uTexture: { value: nebulaTexture },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GalaxyCore() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)
  const haloRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (haloRef.current) {
      // always face the camera (billboard)
      haloRef.current.lookAt(state.camera.position)
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.04
      haloRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      glowRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group>
      {/* Bright nucleus sphere — emissive, additive */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={{
            uTime:       { value: 0 },
            uColorInner: { value: new THREE.Color('#ffe4a8') },
            uColorOuter: { value: new THREE.Color('#ff5d8f') },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Soft outer halo billboard */}
      <mesh ref={haloRef}>
        <planeGeometry args={[7, 7]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={{ uColor: { value: new THREE.Color('#ffb1d8') } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Extra large faint halo */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <planeGeometry args={[14, 14]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={{ uColor: { value: new THREE.Color('#7c3aed') } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function GalacticDisk() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} renderOrder={-2}>
      <circleGeometry args={[16, 96]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={diskVertex}
        fragmentShader={diskFragment}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN GALAXY COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Galaxy({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const pointTexture  = useMemo(() => makePointTexture(128, 2.2), [])
  const softTexture   = useMemo(() => makePointTexture(128, 3.0), [])
  const nebulaTexture = useMemo(() => makeNebulaTexture(256), [])

  const innerColor  = useMemo(() => new THREE.Color('#ffb066'), []) // warm gold core
  const outerColor  = useMemo(() => new THREE.Color('#5b21b6'), []) // deep violet edge
  const midInner    = useMemo(() => new THREE.Color('#ff7eb6'), []) // pink
  const midOuter    = useMemo(() => new THREE.Color('#7c3aed'), []) // bright purple
  const haloInner   = useMemo(() => new THREE.Color('#67e8f9'), []) // cyan
  const haloOuter   = useMemo(() => new THREE.Color('#1e1b4b'), []) // deep blue

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // base slow rotation
    groupRef.current.rotation.y -= delta * 0.045

    // mouse-driven parallax
    const targetX = mouse.current.y * 0.55 + 0.7
    const targetZ = mouse.current.x * 0.45
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z +=
      (targetZ - groupRef.current.rotation.z) * 0.04

    // gentle breathing
    const t = state.clock.elapsedTime
    const breath = 1 + Math.sin(t * 0.4) * 0.015
    groupRef.current.scale.setScalar(breath)
  })

  return (
    <group ref={groupRef}>
      <GalacticDisk />
      <GalaxyCore />

      {/* Bright young star layer — small, sharp */}
      <StarLayer
        count={14000}
        pointTexture={pointTexture}
        sizeBoost={1.0}
        opts={{
          count: 14000,
          radius: 9,
          branches: 5,
          spin: 1.15,
          randomness: 0.35,
          randomnessPower: 3,
          innerColor: innerColor,
          outerColor: outerColor,
          verticalSquash: 0.5,
          yJitter: 0.15,
          noiseAmount: 0,
        }}
      />

      {/* Mid/dust layer — softer, glowy, more colors */}
      <StarLayer
        count={9000}
        pointTexture={softTexture}
        sizeBoost={1.6}
        opts={{
          count: 9000,
          radius: 10.5,
          branches: 4,
          spin: 0.95,
          randomness: 0.55,
          randomnessPower: 2.4,
          innerColor: midInner,
          outerColor: midOuter,
          verticalSquash: 0.6,
          yJitter: 0.3,
          noiseAmount: 0,
        }}
      />

      {/* Sparse outer halo — dim far stars */}
      <StarLayer
        count={4000}
        pointTexture={softTexture}
        sizeBoost={0.8}
        opts={{
          count: 4000,
          radius: 14,
          branches: 3,
          spin: 0.7,
          randomness: 0.7,
          randomnessPower: 2,
          innerColor: haloInner,
          outerColor: haloOuter,
          verticalSquash: 0.8,
          yJitter: 0.45,
          noiseAmount: 0,
        }}
      />

      {/* Nebula gas clouds in the arms */}
      <NebulaLayer
        count={60}
        radius={9}
        nebulaTexture={nebulaTexture}
      />
    </group>
  )
}

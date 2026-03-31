"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  RoundedBox,
  MeshReflectorMaterial,
  Html,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

// ─── Project data (shared with carousel) ──────────────────────────────────────
const projects = [
  { id: 1, title: "The Wanderer",   category: "Short Film",  year: "2024", thumb: "/images/project-1.jpg", description: "A lone journey through amber hills and forgotten roads." },
  { id: 2, title: "Night Market",   category: "Commercial",  year: "2023", thumb: "/images/project-2.jpg", description: "Rain-lit lanterns and the warmth of street food culture." },
  { id: 3, title: "Lavender Dusk",  category: "Music Video", year: "2023", thumb: "/images/project-3.jpg", description: "A dreamy countryside ode to slow summer evenings." },
  { id: 4, title: "Temple Autumn",  category: "Documentary", year: "2022", thumb: "/images/project-4.jpg", description: "Ancient stones and falling leaves — where time rests." },
];

// ─── MacBook screen texture (loads the project thumbnail) ─────────────────────
function MacbookScreen({ projectIndex }: { projectIndex: number }) {
  const thumb = projects[projectIndex].thumb;
  const texture = useTexture(thumb);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0, 0.001]}>
      <planeGeometry args={[1.44, 0.9]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ─── MacBook Pro model (procedural) ───────────────────────────────────────────
function MacbookPro({
  lidAngle,
  projectIndex,
}: {
  lidAngle: number;
  projectIndex: number;
}) {
  // Base (keyboard deck)
  const baseColor  = new THREE.Color(0.22, 0.22, 0.24);
  const screenColor = new THREE.Color(0.05, 0.05, 0.06);
  const glowAmber  = new THREE.Color(1.0, 0.72, 0.28);

  return (
    <group position={[0, 0, 0]}>
      {/* ── Base / keyboard deck ── */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[2.0, 0.07, 1.3]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={baseColor} metalness={0.92} roughness={0.12} />
        </RoundedBox>

        {/* Keyboard area — slightly recessed dark panel */}
        <mesh position={[0, 0.038, 0.02]}>
          <planeGeometry args={[1.75, 1.05]} />
          <meshStandardMaterial color={new THREE.Color(0.10, 0.10, 0.11)} metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Trackpad */}
        <RoundedBox args={[0.52, 0.02, 0.36]} radius={0.025} smoothness={4} position={[0, 0.04, 0.38]}>
          <meshStandardMaterial color={new THREE.Color(0.18, 0.18, 0.20)} metalness={0.9} roughness={0.08} />
        </RoundedBox>

        {/* Apple logo glow on base underside — visible as ambient */}
        <pointLight position={[0, -0.2, 0]} intensity={0.3} color={glowAmber} distance={1.5} />
      </group>

      {/* ── Lid (hinged at back edge of base) ── */}
      <group position={[0, 0.035, -0.615]}>
        <group rotation={[-(Math.PI / 2) * (1 - lidAngle), 0, 0]}>
          {/* Lid shell */}
          <RoundedBox args={[2.0, 0.05, 1.3]} radius={0.04} smoothness={4} position={[0, 0, 0.65]}>
            <meshStandardMaterial color={baseColor} metalness={0.92} roughness={0.12} />
          </RoundedBox>

          {/* Screen bezel (inner) */}
          <mesh position={[0, 0.028, 0.65]}>
            <planeGeometry args={[1.9, 1.22]} />
            <meshStandardMaterial color={screenColor} metalness={0.2} roughness={0.7} />
          </mesh>

          {/* Screen itself */}
          <group position={[0, 0.03, 0.65]}>
            {/* Screen glow */}
            <pointLight
              position={[0, 0.1, 0.1]}
              intensity={lidAngle * 3.5}
              color={glowAmber}
              distance={3}
            />
            {/* Screen frame */}
            <mesh position={[0, 0, 0.001]}>
              <planeGeometry args={[1.7, 1.06]} />
              <meshStandardMaterial color={new THREE.Color(0.04, 0.035, 0.03)} />
            </mesh>
            {/* Notch */}
            <mesh position={[0, 0.505, 0.002]}>
              <planeGeometry args={[0.14, 0.022]} />
              <meshStandardMaterial color={screenColor} />
            </mesh>
            {/* Project thumbnail */}
            <MacbookScreen projectIndex={projectIndex} />
          </group>

          {/* Apple logo on lid back */}
          <mesh position={[0, -0.027, 0.65]} rotation={[Math.PI, 0, 0]}>
            <circleGeometry args={[0.08, 32]} />
            <meshStandardMaterial
              color={glowAmber}
              emissive={glowAmber}
              emissiveIntensity={lidAngle * 1.2}
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ─── Desk scene ───────────────────────────────────────────────────────────────
function DeskScene({ projectIndex }: { projectIndex: number }) {
  const woodBrown  = new THREE.Color(0.28, 0.17, 0.09);
  const darkWood   = new THREE.Color(0.18, 0.11, 0.06);
  const wallColor  = new THREE.Color(0.18, 0.14, 0.10);
  const amberGlow  = new THREE.Color(1.0, 0.68, 0.22);
  const dimAmber   = new THREE.Color(0.9, 0.55, 0.15);
  const macbookRef = useRef<THREE.Group>(null!);

  // Gentle floating animation for MacBook
  useFrame(({ clock }) => {
    if (macbookRef.current) {
      macbookRef.current.position.y = 0.82 + Math.sin(clock.getElapsedTime() * 0.6) * 0.005;
    }
  });

  return (
    <group>
      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={0.6}
          mixStrength={20}
          roughness={0.9}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={new THREE.Color(0.10, 0.07, 0.04)}
          metalness={0.0}
          mirror={0}
        />
      </mesh>

      {/* ── Back wall ── */}
      <mesh position={[0, 3.5, -5]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {/* ── Left side wall ── */}
      <mesh position={[-6, 3.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color={new THREE.Color(0.16, 0.12, 0.09)} roughness={0.95} />
      </mesh>

      {/* ── Desk surface ── */}
      <mesh position={[0, 0.78, 0.3]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.06, 1.6]} />
        <meshStandardMaterial color={woodBrown} roughness={0.55} metalness={0.02} />
      </mesh>
      {/* Desk legs */}
      {([[-1.75, -2.5], [1.75, -2.5], [-1.75, 1.0], [1.75, 1.0]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.38, z * 0.4 + 0.3]} castShadow>
          <boxGeometry args={[0.06, 0.78, 0.06]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>
      ))}

      {/* ── Desk objects ── */}

      {/* Coffee mug */}
      <group position={[1.5, 0.84, 0.0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.14, 20]} />
          <meshStandardMaterial color={new THREE.Color(0.55, 0.30, 0.12)} roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Steam particle light */}
        <pointLight position={[0, 0.25, 0]} intensity={0.12} color={new THREE.Color(0.9, 0.8, 0.6)} distance={0.6} />
      </group>

      {/* Small plant pot */}
      <group position={[-1.55, 0.84, -0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.1, 16]} />
          <meshStandardMaterial color={new THREE.Color(0.55, 0.28, 0.14)} roughness={0.8} />
        </mesh>
        {/* Plant stem */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.14, 6]} />
          <meshStandardMaterial color={new THREE.Color(0.18, 0.42, 0.08)} roughness={0.9} />
        </mesh>
        {/* Leaf 1 */}
        <mesh position={[0.06, 0.2, 0]} rotation={[0, 0, 0.5]}>
          <sphereGeometry args={[0.06, 8, 6]} />
          <meshStandardMaterial color={new THREE.Color(0.15, 0.38, 0.10)} roughness={0.9} />
        </mesh>
        {/* Leaf 2 */}
        <mesh position={[-0.05, 0.22, 0.02]} rotation={[0.2, 0, -0.4]}>
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color={new THREE.Color(0.18, 0.45, 0.12)} roughness={0.9} />
        </mesh>
      </group>

      {/* Scattered papers */}
      <mesh position={[0.6, 0.815, 0.45]} rotation={[-Math.PI / 2, 0, 0.15]} receiveShadow>
        <planeGeometry args={[0.35, 0.25]} />
        <meshStandardMaterial color={new THREE.Color(0.92, 0.87, 0.76)} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.7, 0.816, 0.35]} rotation={[-Math.PI / 2, 0, -0.1]} receiveShadow>
        <planeGeometry args={[0.3, 0.22]} />
        <meshStandardMaterial color={new THREE.Color(0.88, 0.83, 0.72)} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Small external hard drive / USB drive near mac */}
      <group position={[1.0, 0.815, 0.55]}>
        <RoundedBox args={[0.22, 0.025, 0.10]} radius={0.01} smoothness={3}>
          <meshStandardMaterial color={new THREE.Color(0.15, 0.15, 0.16)} metalness={0.9} roughness={0.2} />
        </RoundedBox>
      </group>

      {/* ── Desk lamp ── */}
      <group position={[-1.3, 0.81, -0.45]}>
        {/* Lamp base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.10, 0.02, 20]} />
          <meshStandardMaterial color={darkWood} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lamp pole */}
        <mesh position={[0, 0.27, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.54, 10]} />
          <meshStandardMaterial color={darkWood} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lamp arm */}
        <mesh position={[0.12, 0.54, 0]} rotation={[0, 0, -0.5]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color={darkWood} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Lamp shade */}
        <mesh position={[0.26, 0.62, 0]} castShadow>
          <coneGeometry args={[0.09, 0.12, 16, 1, true]} />
          <meshStandardMaterial color={new THREE.Color(0.82, 0.55, 0.18)} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Lamp light */}
        <pointLight
          position={[0.26, 0.55, 0]}
          intensity={2.5}
          color={amberGlow}
          distance={3.0}
          castShadow
          shadow-mapSize={[256, 256]}
        />
      </group>

      {/* ── Bookshelf on back wall ── */}
      <group position={[-3.8, 1.2, -4.88]}>
        {/* Shelf board */}
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.04, 0.22]} />
          <meshStandardMaterial color={woodBrown} roughness={0.7} />
        </mesh>
        {/* Books */}
        {[
          { x: -0.65, w: 0.10, h: 0.32, col: new THREE.Color(0.55, 0.18, 0.10) },
          { x: -0.52, w: 0.08, h: 0.28, col: new THREE.Color(0.18, 0.38, 0.22) },
          { x: -0.42, w: 0.12, h: 0.34, col: new THREE.Color(0.25, 0.20, 0.45) },
          { x: -0.27, w: 0.09, h: 0.30, col: new THREE.Color(0.70, 0.50, 0.18) },
          { x: -0.16, w: 0.07, h: 0.26, col: new THREE.Color(0.45, 0.28, 0.18) },
          { x:  0.15, w: 0.11, h: 0.35, col: new THREE.Color(0.20, 0.28, 0.52) },
          { x:  0.28, w: 0.08, h: 0.29, col: new THREE.Color(0.60, 0.22, 0.15) },
          { x:  0.38, w: 0.10, h: 0.32, col: new THREE.Color(0.30, 0.48, 0.30) },
          { x:  0.50, w: 0.09, h: 0.28, col: new THREE.Color(0.72, 0.58, 0.20) },
        ].map((book, i) => (
          <mesh key={i} position={[book.x, book.h / 2 + 0.02, 0]} castShadow>
            <boxGeometry args={[book.w, book.h, 0.18]} />
            <meshStandardMaterial color={book.col} roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* Second shelf */}
      <group position={[-3.8, 1.85, -4.88]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.04, 0.22]} />
          <meshStandardMaterial color={woodBrown} roughness={0.7} />
        </mesh>
        {[
          { x: -0.6, w: 0.09, h: 0.28, col: new THREE.Color(0.40, 0.22, 0.12) },
          { x: -0.48, w: 0.11, h: 0.32, col: new THREE.Color(0.22, 0.35, 0.48) },
          { x: -0.35, w: 0.08, h: 0.25, col: new THREE.Color(0.58, 0.42, 0.15) },
          { x:  0.1,  w: 0.10, h: 0.30, col: new THREE.Color(0.35, 0.18, 0.12) },
          { x:  0.22, w: 0.08, h: 0.28, col: new THREE.Color(0.20, 0.45, 0.22) },
          { x:  0.32, w: 0.12, h: 0.34, col: new THREE.Color(0.55, 0.30, 0.10) },
        ].map((book, i) => (
          <mesh key={i} position={[book.x, book.h / 2 + 0.02, 0]} castShadow>
            <boxGeometry args={[book.w, book.h, 0.18]} />
            <meshStandardMaterial color={book.col} roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* ── MacBook Pro ── */}
      <group ref={macbookRef} position={[0, 0.82, 0.12]} rotation={[0, 0, 0]} scale={0.72}>
        <MacbookPro lidAngle={0.85} projectIndex={projectIndex} />
      </group>

      {/* ── Ambient room lighting ── */}
      {/* Warm overhead fill */}
      <pointLight position={[0, 4.5, 0]} intensity={0.8} color={dimAmber} distance={9} />
      {/* Window light from side (cool contrast) */}
      <directionalLight
        position={[5, 5, 3]}
        intensity={0.4}
        color={new THREE.Color(0.85, 0.78, 0.68)}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Subtle back-fill */}
      <pointLight position={[-3, 3, -4]} intensity={0.5} color={new THREE.Color(0.9, 0.7, 0.4)} distance={8} />
    </group>
  );
}

// ─── Camera controller — driven by scroll progress ────────────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    // Phase 1 (0→0.5): pull in from overview to desk-level
    // Phase 2 (0.5→1): zoom into MacBook screen
    const t  = Math.min(Math.max(scrollProgress, 0), 1);
    const t1 = Math.min(t / 0.5, 1);       // 0→1 during first half
    const t2 = Math.min((t - 0.5) / 0.5, 1); // 0→1 during second half

    const startPos  = new THREE.Vector3(0, 3.2, 5.5);
    const midPos    = new THREE.Vector3(-0.05, 1.35, 2.8);
    const endPos    = new THREE.Vector3(0, 0.99, 1.05);

    const pos1 = startPos.clone().lerp(midPos, easeInOut(t1));
    const pos  = pos1.lerp(endPos, easeInOut(t2));

    camera.position.lerp(pos, 0.08);

    const startLook = new THREE.Vector3(0, 0.9, 0);
    const endLook   = new THREE.Vector3(0, 0.93, 0.12);
    target.current.lerp(t2 > 0 ? endLook : startLook, 0.08);
    camera.lookAt(target.current);
  });

  return null;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Project overlay (HTML-in-3D, shown when zoomed into screen) ──────────────
function ScreenOverlay({
  projectIndex,
  onPrev,
  onNext,
  visible,
}: {
  projectIndex: number;
  onPrev: () => void;
  onNext: () => void;
  visible: boolean;
}) {
  const project = projects[projectIndex];
  if (!visible) return null;

  return (
    // Positioned just in front of the MacBook screen in world space
    <Html
      position={[0, 0.99, 0.55]}
      center
      style={{ pointerEvents: visible ? "auto" : "none", width: 360 }}
      transform
      occlude={false}
      distanceFactor={1.5}
    >
      <div
        style={{
          background: "linear-gradient(to top, oklch(0.08 0.02 45 / 0.96), transparent)",
          borderRadius: "0 0 8px 8px",
          padding: "24px 20px 16px",
          width: 360,
          fontFamily: "var(--font-lora), Georgia, serif",
          color: "oklch(0.92 0.04 80)",
          userSelect: "none",
        }}
      >
        <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "oklch(0.72 0.18 55)", marginBottom: 4 }}>
          {project.category} · {project.year}
        </p>
        <h3 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, fontStyle: "italic", color: "oklch(0.62 0.06 70)", marginBottom: 14 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={onPrev} style={arrowBtn}>&larr;</button>
          <div style={{ display: "flex", gap: 5 }}>
            {projects.map((_, i) => (
              <div key={i} style={{
                width: i === projectIndex ? 16 : 5,
                height: 5,
                borderRadius: 3,
                background: i === projectIndex ? "oklch(0.72 0.18 55)" : "oklch(0.45 0.05 60)",
                transition: "width 0.3s",
              }} />
            ))}
          </div>
          <button onClick={onNext} style={arrowBtn}>&rarr;</button>
        </div>
      </div>
    </Html>
  );
}

const arrowBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid oklch(0.72 0.18 55 / 0.5)",
  color: "oklch(0.72 0.18 55)",
  borderRadius: "50%",
  width: 30,
  height: 30,
  cursor: "pointer",
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
};

// ─── Main exported component ──────────────────────────────────────────────────
export default function StudioScene3D({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const [projectIndex, setProjectIndex] = useState(0);

  const prev = useCallback(() => setProjectIndex(i => (i - 1 + projects.length) % projects.length), []);
  const next = useCallback(() => setProjectIndex(i => (i + 1) % projects.length), []);

  // Show overlay once scrolled far enough into the screen
  const overlayVisible = scrollProgress > 0.82;

  return (
    <Canvas
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault fov={52} near={0.1} far={40} position={[0, 3.2, 5.5]} />
      <CameraRig scrollProgress={scrollProgress} />

      {/* Warm amber environment */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.18} color={new THREE.Color(0.9, 0.7, 0.4)} />

      <DeskScene projectIndex={projectIndex} />

      <ScreenOverlay
        projectIndex={projectIndex}
        onPrev={prev}
        onNext={next}
        visible={overlayVisible}
      />
    </Canvas>
  );
}

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Agregamos la descripción requerida por ESLint
// @ts-expect-error - La librería maath no tiene tipos oficiales de TS
import * as random from "maath/random/dist/maath-random.esm";

const ParticleField = () => {
  // 2. Tipamos con THREE.Points e inicializamos en null
  const ref = useRef<THREE.Points>(null);

  const [sphere] = useState(() => {
    const data = new Float32Array(5000 * 3);
    return random.inSphere(data, { radius: 1.5 }) as Float32Array;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.0015;

      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ba68c8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

export const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-evo-dark">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-evo-dark via-evo-deep to-black z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-evo-purple/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-evo-green/10 blur-[120px] animate-pulse" />

      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

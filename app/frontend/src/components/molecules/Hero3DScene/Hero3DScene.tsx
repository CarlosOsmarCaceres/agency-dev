import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";

const AnimatedBlob = () => {
  return (
    // Float: Hace que flote suavemente arriba y abajo
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      {/* Sphere: La forma base. args=[radio, segmentos_w, segmentos_h] */}
      <Sphere args={[1, 100, 200]} scale={2.4}>
        {/* El Material Mágico: Distorsión */}
        <MeshDistortMaterial
          color="#1ea7fd" // Tu color azul de marca
          attach="material"
          distort={0.4} // Qué tanto se deforma (0 a 1)
          speed={2} // Velocidad de la animación
          roughness={0.2} // Qué tan lisa es la superficie (0 = espejo)
          metalness={0.8} // Qué tan metálica parece
        />
      </Sphere>
    </Float>
  );
};

export const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Iluminación: Clave para el 3D */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Luz de acento violeta para dar el toque "Cyber" */}
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={5} />

        {/* Fondo de estrellas sutil */}
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <AnimatedBlob />
      </Canvas>
    </div>
  );
};

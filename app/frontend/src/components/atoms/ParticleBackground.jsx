import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export const ParticleBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </div>
    );
};

const Stars = (props) => {
    const ref = useRef();

    // Generamos 5000 partículas matemáticamente
    const sphere = useMemo(() => {
        const data = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.5 * Math.cbrt(Math.random()); // Radio de la esfera

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            data[i * 3] = x;
            data[i * 3 + 1] = y;
            data[i * 3 + 2] = z;
        }
        return data;
    }, []);

    useFrame((state, delta) => {
        // Hacemos que giren suavemente
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#a855f7" // Color violeta
                    size={0.005}    // Tamaño de la partícula
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};
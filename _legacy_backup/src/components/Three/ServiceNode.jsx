import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';

const Node = ({ isHovered, color = "#3586e2ff" }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current || !state) return;
        try {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.2;

            // Scale effect on hover
            const targetScale = isHovered ? 1.5 : 1;
            meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
        } catch (e) {
            console.error("ServiceNode animation error:", e);
        }
    });

    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <Icosahedron args={[1, 1]} ref={meshRef}>
                <MeshDistortMaterial
                    color={color}
                    speed={isHovered ? 4 : 1.5}
                    distort={isHovered ? 0.6 : 0.3}
                    radius={1}
                />
            </Icosahedron>
        </Float>
    );
};

const ServiceNode = ({ isHovered, color }) => {
    return (
        <div className="w-16 h-16 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color={color} />
                <Node isHovered={isHovered} color={color} />
            </Canvas>
        </div>
    );
};

export default ServiceNode;

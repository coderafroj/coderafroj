import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleRing = () => {
    const pointsRef = useRef();

    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 2;
            pos[i * 3] = Math.cos(theta) * radius;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = Math.sin(theta) * radius;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !state) return;
        try {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        } catch (e) {
            console.error("ParticleRing animation error:", e);
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const AnimatedCore = () => {
    const coreRef = useRef();

    useFrame((state) => {
        if (!coreRef.current) return;
        const time = state.clock.getElapsedTime();
        coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
        coreRef.current.rotation.y = time * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1.2, 128, 128]} ref={coreRef}>
                <MeshDistortMaterial
                    color="#818cf8"
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.9}
                    roughness={0.1}
                    distort={0.45}
                    speed={2}
                />
            </Sphere>
            {/* Inner Glow Sphere */}
            <Sphere args={[0.8, 64, 64]}>
                <meshStandardMaterial
                    color="#4f46e5"
                    emissive="#4f46e5"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
};

const Rig = () => {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 5), 0.05);
        camera.lookAt(0, 0, 0);
    });
};

const AdvancedHero = () => {
    return (
        <div className="w-full h-full relative cursor-crosshair">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={['transparent']} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#6366f1" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

                <ParticleRing />
                <AnimatedCore />
                <Rig />

                <fog attach="fog" args={['#02040a', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default AdvancedHero;

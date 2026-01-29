import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial, MeshTransmissionMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

const ParticleRing = () => {
    const pointsRef = useRef();

    const count = 3000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 4 + Math.random() * 2;
            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !state) return;
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.z = time * 0.03;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#818cf8"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const BinaryStream = () => {
    const pointsRef = useRef();
    const count = 4000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25; // X
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        const pos = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            // Vertical movement
            pos[i * 3 + 1] -= 0.05 * (1 + Math.sin(i));
            if (pos[i * 3 + 1] < -15) pos[i * 3 + 1] = 15;

            // Subtle horizontal jitter
            pos[i * 3] += Math.sin(time + i) * 0.005;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#00ff00"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const HackerCore = () => {
    const orbRef = useRef();
    const wireRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        if (!orbRef.current || !state) return;
        const time = state.clock.getElapsedTime();

        // Complex rotation
        orbRef.current.rotation.y = time * 0.2;
        orbRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;

        // Glitch wireframe pulse
        if (wireRef.current) {
            wireRef.current.rotation.y = -time * 0.4;
            wireRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.02 * (Math.random() > 0.9 ? 2 : 0.5));
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = time * 1.5;
            ringRef.current.rotation.x = time * 0.3;
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Glass Core */}
                <Sphere args={[1.2, 64, 64]} ref={orbRef}>
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={512}
                        transmission={1}
                        roughness={0.1}
                        thickness={2}
                        ior={1.2}
                        chromaticAberration={0.15}
                        distortion={0.3}
                        distortionScale={0.5}
                        temporalDistortion={0.5}
                        color="#4f46e5"
                        attenuationDistance={1}
                        attenuationColor="#4f46e5"
                    />
                </Sphere>

                {/* Cyber Wireframe Overlay */}
                <Sphere args={[1.3, 32, 32]} ref={wireRef}>
                    <meshStandardMaterial
                        color="#6366f1"
                        emissive="#6366f1"
                        emissiveIntensity={2}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </Sphere>

                {/* Tech Rings */}
                <Torus args={[2.0, 0.015, 16, 100]} ref={ringRef}>
                    <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={3} />
                </Torus>
            </Float>
        </group>
    );
};

const Rig = () => {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 2.5, mouse.y * 2.5, 10), 0.05);
        camera.lookAt(0, 0, 0);
    });
};

const AdvancedHero = () => {
    return (
        <div className="w-full h-full relative cursor-crosshair">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
            >
                <color attach="background" args={['transparent']} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00ffcc" />

                <ParticleRing />
                <BinaryStream />
                <HackerCore />
                <Rig />

                <fog attach="fog" args={['#02040a', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default AdvancedHero;

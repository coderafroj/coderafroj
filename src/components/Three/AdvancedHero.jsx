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
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{
                    antialias: false,
                    powerPreference: 'low-power',
                    stencil: false,
                    alpha: true,
                    depth: true
                }}
            >
                <color attach="background" args={['transparent']} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00ffcc" />

                <ParticleRing />
                <BinaryStream />
                <Rig />

                <fog attach="fog" args={['#02040a', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default AdvancedHero;

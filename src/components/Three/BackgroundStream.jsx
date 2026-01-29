import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StreamParticles = () => {
    const pointsRef = useRef();
    const count = 1000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !state) return;
        try {
            const time = state.clock.getElapsedTime();
            pointsRef.current.position.y = (time * 0.2) % 10;
            pointsRef.current.rotation.z = time * 0.02;
        } catch (e) {
            console.error("BackgroundStream animation error:", e);
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#818cf8"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.15}
            />
        </Points>
    );
};

const BackgroundStream = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true }} events={() => ({})}>
                <StreamParticles />
                <fog attach="fog" args={['#02040a', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default BackgroundStream;

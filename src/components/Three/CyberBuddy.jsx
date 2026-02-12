import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import ThreeErrorBoundary from './ThreeErrorBoundary';

const Buddy = () => {
    const buddyRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { viewport } = useThree();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!buddyRef.current) return;
        const time = state.clock.getElapsedTime();

        const targetX = mousePos.x * (viewport.width / 2);
        const targetY = mousePos.y * (viewport.height / 2);

        const wanderX = Math.sin(time * 0.5) * 1.5;
        const wanderY = Math.cos(time * 0.3) * 1.5;

        buddyRef.current.position.x = THREE.MathUtils.lerp(buddyRef.current.position.x, targetX + wanderX, 0.05);
        buddyRef.current.position.y = THREE.MathUtils.lerp(buddyRef.current.position.y, targetY + wanderY, 0.05);

        buddyRef.current.rotation.y = time * 0.5;
        buddyRef.current.rotation.z = Math.sin(time) * 0.2;

        const scale = clicked ? 1.8 : 1.2;
        buddyRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        if (clicked && buddyRef.current.scale.x > 1.7) setClicked(false);
    });

    return (
        <group
            ref={buddyRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(true)}
        >
            <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                {/* Body - Glowing Sphere */}
                <Sphere args={[0.5, 32, 32]}>
                    <meshStandardMaterial
                        color={hovered ? "#00ffcc" : "#6366f1"}
                        emissive={hovered ? "#00ffcc" : "#6366f1"}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.9}
                    />
                </Sphere>

                {/* Eyes */}
                <group position={[0, 0, 0.4]}>
                    <Sphere args={[0.08, 16, 16]} position={[-0.15, 0.1, 0]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                    </Sphere>
                    <Sphere args={[0.08, 16, 16]} position={[0.15, 0.1, 0]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                    </Sphere>
                </group>

                {/* Tech Rings */}
                <Torus args={[0.7, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} transparent opacity={0.6} />
                </Torus>
            </Float>
        </group>
    );
};

const CyberBuddy = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
            <ThreeErrorBoundary fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        stencil: false,
                        depth: true,
                        powerPreference: "high-performance"
                    }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
                        <Buddy />
                    </Suspense>
                </Canvas>
            </ThreeErrorBoundary>
        </div>
    );
};

export default CyberBuddy;

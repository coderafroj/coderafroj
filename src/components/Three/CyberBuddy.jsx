import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial, Trail, Float as FloatDrei, Text } from '@react-three/drei';
import * as THREE from 'three';

const Buddy = () => {
    const buddyRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [shout, setShout] = useState("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { viewport } = useThree();

    const shouts = ["SYSTEM_OK", "AFROJ_DETECTED", "HACK_ACTIVE", "3D_MODE_ON", "COMPANION_READY"];

    useEffect(() => {
        console.log("CyberBuddy: INITIALIZED AND LIVE 🚀");
        setShout("HELLO_AFROJ");
        setTimeout(() => setShout(""), 3000);

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

        const wanderX = Math.sin(time * 0.5) * 2;
        const wanderY = Math.cos(time * 0.3) * 2;

        const finalX = THREE.MathUtils.lerp(buddyRef.current.position.x, targetX + wanderX, 0.05);
        const finalY = THREE.MathUtils.lerp(buddyRef.current.position.y, targetY + wanderY, 0.05);

        buddyRef.current.position.set(finalX, finalY, 0);
        buddyRef.current.rotation.y = time * 0.5;
        buddyRef.current.rotation.z = Math.sin(time) * 0.2;

        if (clicked) {
            buddyRef.current.scale.lerp(new THREE.Vector3(2, 2, 2), 0.1);
            if (buddyRef.current.scale.x > 1.9) setClicked(false);
        } else {
            buddyRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
        }
    });

    const handleClick = () => {
        setClicked(true);
        setShout(shouts[Math.floor(Math.random() * shouts.length)]);
        setTimeout(() => setShout(""), 2000);
    };

    return (
        <group
            ref={buddyRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
        >
            <FloatDrei speed={5} rotationIntensity={1} floatIntensity={1}>
                {/* Body - Glowing Sphere */}
                <Sphere args={[0.5, 32, 32]}>
                    <meshStandardMaterial
                        color={hovered ? "#00ffcc" : "#6366f1"}
                        emissive={hovered ? "#00ffcc" : "#6366f1"}
                        emissiveIntensity={4}
                        transparent
                        opacity={0.9}
                    />
                </Sphere>

                {/* Eyes */}
                <group position={[0, 0, 0.4]}>
                    {/* Left Eye */}
                    <Sphere args={[0.1, 16, 16]} position={[-0.15, 0.1, 0]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                    </Sphere>
                    {/* Right Eye */}
                    <Sphere args={[0.1, 16, 16]} position={[0.15, 0.1, 0]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                    </Sphere>
                </group>

                {/* Technical Shouts */}
                {shout && (
                    <Text
                        position={[0, 1, 0]}
                        fontSize={0.25}
                        color="#00ffcc"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {shout}
                    </Text>
                )}

                {/* Tech Rings */}
                <Torus args={[0.7, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={3} />
                </Torus>
            </FloatDrei>
        </group>
    );
};

const CyberBuddy = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                gl={{ alpha: true }}
                style={{ pointerEvents: 'none', background: 'transparent' }}
            >
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#6366f1" />
                <Buddy />
            </Canvas>
        </div>
    );
};

export default CyberBuddy;

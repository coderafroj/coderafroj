import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshTransmissionMaterial, Points, PointMaterial, Text, Html, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import ThreeErrorBoundary from './ThreeErrorBoundary';
import * as THREE from 'three';

const ProjectNode = ({ position, title, color }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.1;
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere
                    args={[0.6, 64, 64]}
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={256}
                        transmission={1}
                        roughness={0.1}
                        thickness={1}
                        ior={1.2}
                        chromaticAberration={0.1}
                        distortion={0.2}
                        color={hovered ? color : "#ffffff"}
                    />
                </Sphere>
                <Text
                    position={[0, -1, 0]}
                    fontSize={0.2}
                    color="white"
                    font="/fonts/Inter-Bold.woff" // Assuming font exists or fallback
                    anchorX="center"
                    anchorY="middle"
                    opacity={hovered ? 1 : 0.5}
                >
                    {title}
                </Text>
            </Float>
        </group>
    );
};

const SkillRing = () => {
    const groupRef = useRef();
    const skills = ['React', 'Three.js', 'Node.js', 'Python', 'Tailwind', 'Git'];

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });

    return (
        <group ref={groupRef}>
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                const radius = 5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <Text
                        key={i}
                        position={[x, Math.sin(i) * 2, z]}
                        fontSize={0.3}
                        color="#6366f1"
                        opacity={0.3}
                        font="/fonts/Inter-Bold.woff"
                    >
                        {skill}
                    </Text>
                );
            })}
        </group>
    );
};

const StarField = () => {
    const points = useMemo(() => {
        const p = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;
            p[i * 3 + 1] = (Math.random() - 0.5) * 40;
            p[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
        return p;
    }, []);

    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    });

    return (
        <Points ref={ref} positions={points} stride={3}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.2}
            />
        </Points>
    );
};

const Rig = () => {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 3, mouse.y * 3, 12), 0.05);
        camera.lookAt(0, 0, 0);
    });
};

const NeuralNetwork = ({ positions }) => {
    const pointsRef = useRef();
    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                vertices.push(...positions[i], ...positions[j]);
            }
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        return geometry;
    }, [positions]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.material.opacity = 0.05 + Math.sin(state.clock.getElapsedTime()) * 0.03;
    });

    return (
        <lineSegments ref={pointsRef} geometry={lineGeometry}>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
        </lineSegments>
    );
};

const SceneLoader = () => {
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <div className="text-xs font-mono text-indigo-400 tracking-widest uppercase animate-pulse">
                    Loading_Sim...
                </div>
            </div>
        </Html>
    );
};

const Portfolio3DScene = () => {
    const projects = [
        { pos: [-4, 2, -2], title: 'ECOMMERCE', color: '#6366f1' },
        { pos: [4, -2, -3], title: 'DASHBOARD', color: '#ec4899' },
        { pos: [-3, -3, 2], title: 'AI_CHAT', color: '#8b5cf6' },
        { pos: [5, 3, 1], title: 'WEB3_APP', color: '#38bdf8' },
    ];

    return (
        <div className="w-full h-full absolute inset-0 z-0 bg-[#02040a]">
            <ThreeErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 12], fov: 45 }}
                    dpr={[1, 2]} // Optimize for pixel density
                    gl={{
                        antialias: false,
                        powerPreference: 'high-performance', // Try high-performance, fallback accessed via boundary
                        stencil: false,
                        alpha: true,
                        depth: true,
                        failIfMajorPerformanceCaveat: false
                    }}
                >
                    {/* Performance Optimizations */}
                    <AdaptiveDpr pixelated />
                    <AdaptiveEvents />
                    <Preload all />

                    <Suspense fallback={<SceneLoader />}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

                        <StarField />
                        <SkillRing />
                        <NeuralNetwork positions={projects.map(p => p.pos)} />

                        {projects.map((p, i) => (
                            <ProjectNode key={i} position={p.pos} title={p.title} color={p.color} />
                        ))}

                        <Rig />
                        <fog attach="fog" args={['#02040a', 8, 20]} />
                    </Suspense>
                </Canvas>
            </ThreeErrorBoundary>
        </div>
    );
};

export default Portfolio3DScene;

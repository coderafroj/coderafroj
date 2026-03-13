import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SpotlightCard
 * A premium wrapper that provides a radial cursor-following spotlight effect.
 * Inspired by React Bits / Modern SaaS Design.
 */
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.05)" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;

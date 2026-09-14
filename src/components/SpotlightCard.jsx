import React, { useRef, useState } from 'react';

const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(230, 57, 70, 0.14)',
    borderColor = 'rgba(230, 57, 70, 0.45)',
    style = {},
    onClick,
    ...props
}) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            ref={cardRef}
            className={`spotlight-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                position: 'relative',
                overflow: 'hidden',
                ...style,
                '--mouse-x': `${coords.x}px`,
                '--mouse-y': `${coords.y}px`,
            }}
            {...props}
        >
            {/* Spotlight specular radial background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 65%)`,
                    zIndex: 0,
                }}
            />

            {/* Specular border reflection */}
            <div
                style={{
                    position: 'absolute',
                    inset: -1,
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                    padding: '1px',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    background: `radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 60%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: 1,
                }}
            />

            {/* Content layer */}
            <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;

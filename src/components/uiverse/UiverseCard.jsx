import React from 'react';
import './uiverse-card.css';

const UiverseCard = ({
    children,
    variant = 'basic',
    hoverable = true,
    onClick,
    className = '',
    ...props
}) => {
    const baseClass = 'uiverse-card';
    const variantClass = `uiverse-card-${variant}`;
    const hoverClass = hoverable ? 'uiverse-card-hoverable' : '';

    return (
        <div
            className={`${baseClass} ${variantClass} ${hoverClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {variant === 'glass' && <div className="card-glass-overlay"></div>}
            {variant === 'gradient' && <div className="card-gradient-bg"></div>}
            {variant === 'neon' && <div className="card-neon-border"></div>}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default UiverseCard;

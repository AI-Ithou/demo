import React from 'react';
import './uiverse-button.css';

const UiverseButton = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    className = '',
    ...props
}) => {
    const baseClass = 'uiverse-btn';
    const variantClass = `uiverse-btn-${variant}`;
    const sizeClass = `uiverse-btn-${size}`;

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {variant === 'animated' && (
                <>
                    <span className="btn-content">{children}</span>
                    <span className="btn-glow"></span>
                </>
            )}
            {variant === 'gradient' && (
                <>
                    <span className="btn-content">{children}</span>
                    <div className="btn-gradient-overlay"></div>
                </>
            )}
            {variant === 'neon' && (
                <>
                    <span className="btn-content">{children}</span>
                    <span className="btn-neon-border"></span>
                </>
            )}
            {!['animated', 'gradient', 'neon'].includes(variant) && children}
        </button>
    );
};

export default UiverseButton;

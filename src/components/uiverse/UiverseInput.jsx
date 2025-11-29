import React, { useState } from 'react';
import './uiverse-input.css';

const UiverseInput = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    variant = 'animated',
    label,
    icon,
    error,
    className = '',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleChange = (e) => {
        setHasValue(!!e.target.value);
        if (onChange) onChange(e);
    };

    const baseClass = 'uiverse-input-wrapper';
    const variantClass = `uiverse-input-${variant}`;
    const focusClass = isFocused ? 'is-focused' : '';
    const valueClass = hasValue ? 'has-value' : '';
    const errorClass = error ? 'has-error' : '';

    return (
        <div className={`${baseClass} ${variantClass} ${focusClass} ${valueClass} ${errorClass} ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="input-field"
                    {...props}
                />
                {variant === 'animated' && <span className="input-border"></span>}
                {variant === 'neon' && <span className="input-neon-glow"></span>}
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default UiverseInput;

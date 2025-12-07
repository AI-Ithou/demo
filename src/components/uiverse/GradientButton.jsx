import React from 'react';
import { motion } from 'framer-motion';

/**
 * 液态渐变按钮组件
 * 支持光泽流动效果、涟漪反馈
 */
const GradientButton = ({
    children,
    className = '',
    variant = 'primary', // 'primary' | 'secondary' | 'text'
    size = 'medium', // 'small' | 'medium' | 'large'
    disabled = false,
    loading = false,
    shimmer = true,
    onClick,
    ...props
}) => {
    // 变体样式
    const variantClasses = {
        primary: `
            bg-gradient-to-r from-blue-500 to-blue-600
            text-white
            shadow-glow-blue
            hover:from-blue-600 hover:to-blue-700
            hover:shadow-glow-blue
            active:scale-95
        `,
        secondary: `
            bg-white/60 backdrop-blur-md
            text-blue-600
            border border-blue-400/40
            hover:bg-blue-50/80
            hover:border-blue-400/60
            active:scale-98
        `,
        text: `
            bg-transparent
            text-blue-600
            hover:bg-blue-50/80
            active:bg-blue-100/80
        `,
    };

    // 尺寸样式
    const sizeClasses = {
        small: 'h-8 px-4 text-sm rounded-lg',
        medium: 'h-10 px-5 text-base rounded-xl',
        large: 'h-12 px-6 text-lg rounded-xl',
    };

    const baseClasses = `
        relative overflow-hidden
        font-medium
        transition-all duration-200 ease-apple
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
    `;

    const handleClick = (e) => {
        if (disabled || loading) return;
        
        // 涟漪效果
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'absolute rounded-full bg-white/30 animate-ripple pointer-events-none';

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        onClick?.(e);
    };

    return (
        <motion.button
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            className={`${baseClasses} ${shimmer && variant === 'primary' ? 'shimmer-effect' : ''} ${className}`}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {/* 顶部光泽 */}
            {variant === 'primary' && (
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            )}

            {/* 内容 */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </span>
        </motion.button>
    );
};

export default GradientButton;

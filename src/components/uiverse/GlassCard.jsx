import React from 'react';
import { motion } from 'framer-motion';

/**
 * 苹果液态玻璃卡片组件
 * 支持浅色/深色模式，多种透明度级别
 */
const GlassCard = ({
    children,
    className = '',
    hover = true,
    variant = 'standard', // 'light' | 'standard' | 'heavy' | 'frosted'
    gradient = false,
    shimmer = false,
    onClick,
    ...props
}) => {
    // 根据透明度级别选择样式
    const variantClasses = {
        light: 'bg-white/50 backdrop-blur-sm',
        standard: 'bg-white/70 backdrop-blur-xl',
        heavy: 'bg-white/85 backdrop-blur-2xl',
        frosted: 'bg-white/95 backdrop-blur-3xl',
    };

    const baseClasses = `
        relative overflow-hidden rounded-2xl
        ${variantClasses[variant]}
        border border-gray-200/20
        shadow-glass
        transition-all duration-300 ease-apple
        glass-highlight
    `;

    const hoverClasses = hover ? `
        hover:bg-white/80
        hover:border-gray-200/30
        hover:shadow-glass-hover
        hover:-translate-y-1
        cursor-pointer
    ` : '';

    const gradientClasses = gradient ? `
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-blue-500/10 before:to-purple-500/10
        before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-300
        before:pointer-events-none
    ` : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${shimmer ? 'shimmer-effect' : ''} ${className}`}
            onClick={onClick}
            {...props}
        >
            {/* 渐变边框效果 */}
            {gradient && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}

            {/* 内容 */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;

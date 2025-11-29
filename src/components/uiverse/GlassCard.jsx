import React from 'react';
import { motion } from 'framer-motion';

/**
 * 玻璃态卡片组件 - 深色主题
 */
const GlassCard = ({
    children,
    className = '',
    hover = true,
    gradient = false,
    onClick,
    ...props
}) => {
    const baseClasses = `
        relative overflow-hidden rounded-2xl
        bg-slate-800/70 backdrop-blur-xl
        border border-slate-700/50
        shadow-xl shadow-black/20
        transition-all duration-300
    `;

    const hoverClasses = hover ? `
        hover:bg-slate-800/80
        hover:border-slate-600/50
        hover:shadow-2xl hover:shadow-black/30
        hover:-translate-y-1
        cursor-pointer
    ` : '';

    const gradientClasses = gradient ? `
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-blue-500/10 before:to-cyan-500/10
        before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-300
    ` : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {/* 渐变边框效果 */}
            {gradient && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}

            {/* 内容 */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;

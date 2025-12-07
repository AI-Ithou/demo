import React from 'react';
import { motion } from 'framer-motion';

/**
 * 液态进度条组件
 * 支持流动光泽动画效果
 */
const LiquidProgress = ({
    value = 0,
    max = 100,
    className = '',
    variant = 'blue', // 'blue' | 'green' | 'orange' | 'purple'
    showLabel = false,
    size = 'medium', // 'small' | 'medium' | 'large'
    shimmer = true,
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // 变体样式（渐变色）
    const variantClasses = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
        green: 'bg-gradient-to-r from-green-500 to-green-600',
        orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    };

    // 尺寸样式
    const sizeClasses = {
        small: 'h-1.5',
        medium: 'h-2',
        large: 'h-3',
    };

    return (
        <div className={`relative ${className}`}>
            {/* 进度条轨道 */}
            <div className={`w-full bg-gray-200/15 rounded-full overflow-hidden ${sizeClasses[size]}`}>
                {/* 进度条填充 */}
                <motion.div
                    className={`h-full rounded-full relative ${variantClasses[variant]} ${shimmer ? 'shimmer-effect' : ''}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                >
                    {/* 内部高光 */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                </motion.div>
            </div>

            {/* 百分比标签 */}
            {showLabel && (
                <motion.div
                    className="absolute -top-6 left-0 text-xs font-medium text-gray-600 tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {Math.round(percentage)}%
                </motion.div>
            )}
        </div>
    );
};

/**
 * 环形进度条组件
 */
export const CircularProgress = ({
    value = 0,
    max = 100,
    size = 120,
    strokeWidth = 8,
    className = '',
    variant = 'blue',
    showLabel = true,
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    // 渐变色
    const gradientColors = {
        blue: { start: '#3B82F6', end: '#2563EB' },
        green: { start: '#10B981', end: '#059669' },
        orange: { start: '#F97316', end: '#EA580C' },
        purple: { start: '#8B5CF6', end: '#6366F1' },
    };

    const colors = gradientColors[variant];
    const gradientId = `gradient-${variant}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* 定义渐变 */}
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.start} />
                        <stop offset="100%" stopColor={colors.end} />
                    </linearGradient>
                </defs>

                {/* 背景圆环 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.05)"
                    strokeWidth={strokeWidth}
                />

                {/* 进度圆环 */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                />
            </svg>

            {/* 中心数字 */}
            {showLabel && (
                <motion.div
                    className="absolute flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-2xl font-bold text-gray-800 tabular-nums">
                        {Math.round(percentage)}
                    </span>
                    <span className="text-xs text-gray-500">%</span>
                </motion.div>
            )}
        </div>
    );
};

export default LiquidProgress;

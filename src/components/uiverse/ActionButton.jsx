import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

/**
 * 行动按钮组件 - 霓虹发光效果
 */
const ActionButton = ({
    children,
    onClick,
    variant = 'primary', // primary, success, danger, secondary
    loading = false,
    completed = false,
    disabled = false,
    icon: Icon,
    className = '',
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled || loading) return;

        // 波纹动画
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            x,
            y,
            id: Date.now()
        };

        setRipples([...ripples, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.(e);
    };

    const variants = {
        primary: {
            bg: 'bg-gradient-to-r from-blue-600 to-cyan-600',
            hover: 'hover:from-blue-700 hover:to-cyan-700',
            shadow: 'shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60',
            text: 'text-white'
        },
        success: {
            bg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
            hover: 'hover:from-emerald-700 hover:to-teal-700',
            shadow: 'shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/60',
            text: 'text-white'
        },
        danger: {
            bg: 'bg-gradient-to-r from-rose-600 to-red-600',
            hover: 'hover:from-rose-700 hover:to-red-700',
            shadow: 'shadow-lg shadow-rose-500/50 hover:shadow-xl hover:shadow-rose-500/60',
            text: 'text-white'
        },
        secondary: {
            bg: 'bg-slate-700/50',
            hover: 'hover:bg-slate-700/70',
            shadow: 'shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30',
            text: 'text-slate-200'
        }
    };

    const variantStyles = variants[variant];

    const baseClasses = `
        relative overflow-hidden
        px-6 py-3 rounded-xl
        font-medium
        transition-all duration-300
        ${variantStyles.bg}
        ${variantStyles.hover}
        ${variantStyles.shadow}
        ${variantStyles.text}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}
        ${completed ? 'bg-emerald-600 hover:bg-emerald-600' : ''}
    `;

    return (
        <motion.button
            whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
            className={`${baseClasses} ${className}`}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {/* 波纹效果 */}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 20,
                        height: 20,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}

            {/* 内容 */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading && <Loader2 className="animate-spin" size={18} />}
                {completed && <Check size={18} />}
                {!loading && !completed && Icon && <Icon size={18} />}
                {children}
            </span>

            {/* 霓虹发光效果 */}
            {!disabled && !loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
            )}
        </motion.button>
    );
};

export default ActionButton;

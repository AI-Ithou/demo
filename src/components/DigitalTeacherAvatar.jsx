import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const DigitalTeacherAvatar = ({ state = 'idle', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
    };

    return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
            {/* Outer Glow Ring */}
            <motion.div
                className="absolute inset-0 rounded-full bg-indigo-200/50 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Inner Circle */}
            <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-white to-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-xl">
                {/* Abstract Face / AI Representation */}
                <motion.div
                    className="w-1/2 h-1/2 bg-indigo-400/80 rounded-full blur-md"
                    animate={state === 'speaking' ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 1, 0.8],
                    } : {
                        scale: 1,
                        opacity: 0.8,
                    }}
                    transition={{
                        duration: state === 'speaking' ? 0.5 : 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Sparkle Icon Overlay */}
                <Sparkles className="absolute text-indigo-600/80 w-1/3 h-1/3" />
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 z-20">
                <span className="relative flex h-4 w-4">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${state === 'speaking' ? 'bg-green-400' : 'bg-indigo-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${state === 'speaking' ? 'bg-green-500' : 'bg-indigo-500'}`}></span>
                </span>
            </div>
        </div>
    );
};

export default DigitalTeacherAvatar;

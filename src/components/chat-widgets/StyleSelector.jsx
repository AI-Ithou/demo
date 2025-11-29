import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Headphones, PenTool, Users } from 'lucide-react';

const styles = [
    { id: 'visual', icon: BookOpen, label: '视觉型', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'auditory', icon: Headphones, label: '听觉型', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'kinesthetic', icon: PenTool, label: '实践型', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'social', icon: Users, label: '社交型', color: 'bg-amber-50 text-amber-600 border-amber-200' },
];

const StyleSelector = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-2">
            {styles.map((style, index) => {
                const Icon = style.icon;
                return (
                    <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(style)}
                        className={`p-4 rounded-xl border-2 ${style.color} flex flex-col items-center justify-center gap-2 transition-colors`}
                    >
                        <Icon size={24} />
                        <span className="font-bold text-sm">{style.label}</span>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default StyleSelector;

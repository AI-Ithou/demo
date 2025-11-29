import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Frown, Meh, Smile, Laugh, PartyPopper } from 'lucide-react';

/**
 * 掌握程度选择器组件 - 五个等级的可视化选择界面
 */
const MasteryLevelSelector = ({ onSelect }) => {
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const levels = [
        {
            id: 'level_1',
            label: '完全不会',
            emoji: '😰',
            icon: Frown,
            description: '对这个知识点完全陌生',
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            textColor: 'text-red-400',
            hoverBg: 'hover:bg-red-500/20'
        },
        {
            id: 'level_2',
            label: '本知识点不会',
            emoji: '😕',
            icon: Frown,
            description: '理解困难,需要重新讲解',
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            textColor: 'text-orange-400',
            hoverBg: 'hover:bg-orange-500/20'
        },
        {
            id: 'level_3_low',
            label: '本知识点会一些',
            emoji: '🤔',
            icon: Meh,
            description: '初步理解,需要更多练习',
            color: 'from-yellow-500 to-orange-600',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
            textColor: 'text-yellow-400',
            hoverBg: 'hover:bg-yellow-500/20'
        },
        {
            id: 'level_3_high',
            label: '本知识点会很多',
            emoji: '😊',
            icon: Smile,
            description: '掌握得不错,可以挑战更高难度',
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            textColor: 'text-blue-400',
            hoverBg: 'hover:bg-blue-500/20'
        },
        {
            id: 'level_4',
            label: '本知识点完全掌握了',
            emoji: '🎉',
            icon: PartyPopper,
            description: '完全掌握,可以进入下一章',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30',
            textColor: 'text-green-400',
            hoverBg: 'hover:bg-green-500/20'
        }
    ];

    const handleSelect = (level) => {
        setSelectedLevel(level.id);
        setTimeout(() => {
            onSelect?.(level.id);
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-3"
        >
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* 顶部装饰 */}
                <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />

                <div className="p-6">
                    {/* 标题 */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                            你对这个知识点的掌握程度如何?
                        </h3>
                        <p className="text-sm text-slate-400">
                            请如实选择,我会根据你的情况提供个性化的学习建议
                        </p>
                    </div>

                    {/* 等级选择 */}
                    <div className="space-y-3">
                        {levels.map((level, index) => {
                            const Icon = level.icon;
                            const isHovered = hoveredLevel === level.id;
                            const isSelected = selectedLevel === level.id;

                            return (
                                <motion.button
                                    key={level.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredLevel(level.id)}
                                    onMouseLeave={() => setHoveredLevel(null)}
                                    onClick={() => handleSelect(level)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${isSelected
                                            ? `${level.bgColor} ${level.borderColor} shadow-lg`
                                            : `bg-slate-700/20 border-slate-600/30 ${level.hoverBg}`
                                        }`}
                                >
                                    {/* 背景渐变效果 */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${level.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                                    <div className="relative flex items-center gap-4">
                                        {/* 图标 */}
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${level.color} flex items-center justify-center flex-shrink-0 shadow-lg ${isSelected ? 'scale-110' : ''
                                            } transition-transform`}>
                                            <span className="text-2xl">{level.emoji}</span>
                                        </div>

                                        {/* 文字 */}
                                        <div className="flex-1 text-left">
                                            <div className={`font-bold mb-1 ${isSelected || isHovered ? level.textColor : 'text-slate-300'
                                                } transition-colors`}>
                                                {level.label}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {level.description}
                                            </div>
                                        </div>

                                        {/* 选中指示器 */}
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`w-6 h-6 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center`}
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* 提示 */}
                    <div className="mt-6 text-center text-xs text-slate-500">
                        选择后将为你生成个性化的学习路径
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MasteryLevelSelector;

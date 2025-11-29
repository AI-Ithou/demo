import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Theater, Microscope, RefreshCw, Sparkles } from 'lucide-react';

/**
 * 学习答疑卡片组件 - 展示AI导师对知识点的详细解答
 */
const LearningQACard = ({ qaData, onChangeExplanation }) => {
    const [selectedType, setSelectedType] = useState(0);

    if (!qaData || !qaData.answers) return null;

    const currentAnswer = qaData.answers[selectedType];

    // 图标映射
    const iconMap = {
        '💡': Lightbulb,
        '🎭': Theater,
        '🔬': Microscope,
        '👁️': Sparkles,
        '🎈': Sparkles,
        '⚛️': Sparkles,
        '🌊': Sparkles,
        '🎯': Sparkles,
        '📊': Sparkles
    };

    const IconComponent = iconMap[currentAnswer?.icon] || Lightbulb;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-2xl mt-3"
        >
            {/* 发光背景效果 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-75" />

            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* 顶部装饰条 */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="p-6">
                    {/* 问题标题 */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/50">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">
                                {qaData.question}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className={`px-2 py-0.5 rounded-full ${qaData.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                        qaData.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {qaData.difficulty === 'easy' ? '简单' :
                                        qaData.difficulty === 'medium' ? '中等' : '困难'}
                                </span>
                                {qaData.relatedConcepts && (
                                    <span className="text-slate-500">
                                        相关: {qaData.relatedConcepts.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 解释方式切换按钮 */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                        {qaData.answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedType(index)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${selectedType === index
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/50'
                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                    }`}
                            >
                                <span className="text-lg">{answer.icon}</span>
                                {answer.title}
                            </button>
                        ))}
                    </div>

                    {/* 答案内容 - 带动画切换 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-900/50 rounded-xl p-5 border border-white/5 mb-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                                    <IconComponent size={20} className="text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-blue-300 mb-2">
                                        {currentAnswer.title}
                                    </h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {currentAnswer.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                const nextType = (selectedType + 1) % qaData.answers.length;
                                setSelectedType(nextType);
                                onChangeExplanation?.(qaData.answers[nextType].type);
                            }}
                            className="flex-1 py-3 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 border border-white/5"
                        >
                            <RefreshCw size={16} />
                            换个方式讲解
                        </button>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
                        >
                            明白了
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LearningQACard;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

/**
 * 学习路径推荐卡片组件 - 基于掌握程度的智能推荐
 */
const PathRecommendCard = ({ recommendation, onSelectPath }) => {
    if (!recommendation) return null;

    // 根据推荐类型获取图标和样式
    const getRecommendationStyle = (action) => {
        switch (action) {
            case 'back_to_intro':
                return {
                    icon: ArrowLeft,
                    gradient: 'from-blue-500 to-indigo-600',
                    bgGradient: 'from-blue-500/10 to-indigo-500/10',
                    borderColor: 'border-blue-500/30',
                    glowColor: 'shadow-blue-900/50'
                };
            case 'explain_again':
                return {
                    icon: BookOpen,
                    gradient: 'from-cyan-500 to-blue-600',
                    bgGradient: 'from-cyan-500/10 to-blue-500/10',
                    borderColor: 'border-cyan-500/30',
                    glowColor: 'shadow-cyan-900/50'
                };
            case 'practice':
                return {
                    icon: Zap,
                    gradient: 'from-amber-500 to-orange-600',
                    bgGradient: 'from-amber-500/10 to-orange-500/10',
                    borderColor: 'border-amber-500/30',
                    glowColor: 'shadow-amber-900/50'
                };
            case 'challenge':
                return {
                    icon: TrendingUp,
                    gradient: 'from-purple-500 to-violet-600',
                    bgGradient: 'from-purple-500/10 to-violet-500/10',
                    borderColor: 'border-purple-500/30',
                    glowColor: 'shadow-purple-900/50'
                };
            case 'next_topic':
                return {
                    icon: ArrowRight,
                    gradient: 'from-green-500 to-emerald-600',
                    bgGradient: 'from-green-500/10 to-emerald-500/10',
                    borderColor: 'border-green-500/30',
                    glowColor: 'shadow-green-900/50'
                };
            default:
                return {
                    icon: Sparkles,
                    gradient: 'from-blue-500 to-cyan-600',
                    bgGradient: 'from-blue-500/10 to-cyan-500/10',
                    borderColor: 'border-blue-500/30',
                    glowColor: 'shadow-blue-900/50'
                };
        }
    };

    const style = getRecommendationStyle(recommendation.action);
    const Icon = style.icon;

    // 如果有多个选项(如level_3_high)
    if (recommendation.options && recommendation.options.length > 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full max-w-2xl mt-3"
            >
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
                    {/* 顶部标题 */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-sm`}>
                                <Icon size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800">{recommendation.title}</h3>
                                <p className="text-xs text-slate-600">{recommendation.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* 选项卡片 */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {recommendation.options.map((option, index) => {
                            const optionStyle = getRecommendationStyle(option.action);
                            const OptionIcon = optionStyle.icon;

                            return (
                                <button
                                    key={index}
                                    onClick={() => onSelectPath?.(option.action)}
                                    className={`p-4 rounded-lg border-2 ${optionStyle.borderColor} bg-white hover:bg-gradient-to-br ${optionStyle.bgGradient} transition-all text-left group`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* 图标 */}
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${optionStyle.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                            <OptionIcon size={18} className="text-white" />
                                        </div>

                                        {/* 文字 */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 mb-1">
                                                {option.label}
                                            </h4>
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {option.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        );
    }

    // 单一推荐
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-3"
        >
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
                <div className="p-5">
                    {/* 内容 */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Icon size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-slate-800 mb-1">
                                {recommendation.title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {recommendation.description}
                            </p>
                        </div>
                    </div>

                    {/* 行动按钮 */}
                    <button
                        onClick={() => onSelectPath?.(recommendation.action)}
                        className={`w-full py-2.5 px-5 bg-gradient-to-r ${style.gradient} hover:opacity-90 text-white rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2`}
                    >
                        <span>{recommendation.nextStep || '开始学习'}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PathRecommendCard;

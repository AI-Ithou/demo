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
                    gradient: 'from-red-500 to-pink-600',
                    bgGradient: 'from-red-500/10 to-pink-500/10',
                    borderColor: 'border-red-500/30',
                    glowColor: 'shadow-red-900/50'
                };
            case 'explain_again':
                return {
                    icon: BookOpen,
                    gradient: 'from-orange-500 to-red-600',
                    bgGradient: 'from-orange-500/10 to-red-500/10',
                    borderColor: 'border-orange-500/30',
                    glowColor: 'shadow-orange-900/50'
                };
            case 'practice':
                return {
                    icon: Zap,
                    gradient: 'from-yellow-500 to-orange-600',
                    bgGradient: 'from-yellow-500/10 to-orange-500/10',
                    borderColor: 'border-yellow-500/30',
                    glowColor: 'shadow-yellow-900/50'
                };
            case 'challenge':
                return {
                    icon: TrendingUp,
                    gradient: 'from-purple-500 to-pink-600',
                    bgGradient: 'from-purple-500/10 to-pink-500/10',
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
                    gradient: 'from-blue-500 to-purple-600',
                    bgGradient: 'from-blue-500/10 to-purple-500/10',
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
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-2xl mt-3"
            >
                <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* 顶部装饰 */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="p-6">
                        {/* 标题 */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg ${style.glowColor}`}>
                                <Icon size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{recommendation.title}</h3>
                                <p className="text-xs text-slate-400">{recommendation.description}</p>
                            </div>
                        </div>

                        {/* 选项卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendation.options.map((option, index) => {
                                const optionStyle = getRecommendationStyle(option.action);
                                const OptionIcon = optionStyle.icon;

                                return (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => onSelectPath?.(option.action)}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative p-5 rounded-xl border-2 ${optionStyle.borderColor} bg-gradient-to-br ${optionStyle.bgGradient} overflow-hidden group transition-all`}
                                    >
                                        {/* 背景光效 */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${optionStyle.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />

                                        <div className="relative">
                                            {/* 图标 */}
                                            <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${optionStyle.gradient} flex items-center justify-center shadow-lg ${optionStyle.glowColor} group-hover:scale-110 transition-transform`}>
                                                <OptionIcon size={28} className="text-white" />
                                            </div>

                                            {/* 文字 */}
                                            <h4 className="text-base font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                                                {option.label}
                                            </h4>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                {option.description}
                                            </p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
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
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-3"
        >
            {/* 发光背景 */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${style.gradient} rounded-3xl blur-xl opacity-30`} />

            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* 顶部装饰 */}
                <div className={`h-1 bg-gradient-to-r ${style.gradient}`} />

                <div className="p-6">
                    {/* 内容 */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${style.glowColor}`}>
                            <Icon size={28} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {recommendation.title}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {recommendation.description}
                            </p>
                        </div>
                    </div>

                    {/* 优先级指示 */}
                    {recommendation.priority && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 ${recommendation.priority === 'high' ? 'bg-red-500/20 border border-red-500/30' :
                                recommendation.priority === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                                    'bg-green-500/20 border border-green-500/30'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${recommendation.priority === 'high' ? 'bg-red-500' :
                                    recommendation.priority === 'medium' ? 'bg-yellow-500' :
                                        'bg-green-500'
                                } animate-pulse`} />
                            <span className={`text-xs font-medium ${recommendation.priority === 'high' ? 'text-red-400' :
                                    recommendation.priority === 'medium' ? 'text-yellow-400' :
                                        'text-green-400'
                                }`}>
                                {recommendation.priority === 'high' ? '强烈推荐' :
                                    recommendation.priority === 'medium' ? '建议' : '可选'}
                            </span>
                        </div>
                    )}

                    {/* 行动按钮 */}
                    <button
                        onClick={() => onSelectPath?.(recommendation.action)}
                        className={`w-full py-3 px-6 bg-gradient-to-r ${style.gradient} hover:shadow-lg ${style.glowColor} text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group`}
                    >
                        <span>{recommendation.nextStep || '开始学习'}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PathRecommendCard;

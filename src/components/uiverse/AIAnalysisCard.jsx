import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, TrendingUp, Target, Zap, Award, Brain } from 'lucide-react';

/**
 * AI学情分析卡片组件
 * 展示AI智能分析的学习情况,包括优势、薄弱点、建议等
 */
const AIAnalysisCard = ({
    analysis,
    variant = 'overview', // 'overview' 或 'detailed'
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!analysis) return null;

    const { overallAssessment, learningState, keyFindings, recommendations, encouragement } = analysis;

    // 根据等级返回颜色
    const getLevelColor = (level) => {
        const colors = {
            excellent: 'from-emerald-600 to-green-600',
            good: 'from-blue-600 to-cyan-600',
            average: 'from-amber-600 to-orange-600',
            needs_improvement: 'from-rose-600 to-red-600'
        };
        return colors[level] || colors.good;
    };

    // 根据类型返回图标
    const getTypeIcon = (type) => {
        const icons = {
            strength: Award,
            progress: TrendingUp,
            weakness: Zap,
            habit: Target
        };
        return icons[type] || Sparkles;
    };

    // 根据类型返回颜色
    const getTypeColor = (color) => {
        const colors = {
            blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
            green: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
            orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
            purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
            red: 'from-rose-500/20 to-red-500/20 border-rose-500/30'
        };
        return colors[color] || colors.blue;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl ${className}`}
        >
            {/* 背景装饰 - 浅色渐变 */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 p-8">
                {/* 头部 - AI标识 */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* AI头像 */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/50">
                                🤖
                            </div>
                            {/* 闪烁动画 */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-2xl font-bold text-slate-800">AI学情分析</h3>
                                <Sparkles className="text-yellow-500" size={20} />
                            </div>
                            <p className="text-slate-600 text-sm">基于你的学习数据智能生成</p>
                        </div>
                    </div>

                    {/* 评分徽章 */}
                    <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${getLevelColor(overallAssessment.level)} shadow-lg`}>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">{overallAssessment.score}</div>
                            <div className="text-xs text-white/80 font-medium">综合评分</div>
                        </div>
                    </div>
                </div>

                {/* 整体评价 */}
                <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-start gap-3">
                        <div className="text-3xl mt-1">{overallAssessment.emoji}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${learningState.status === 'progressive' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' :
                                        learningState.status === 'stable' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                                            'bg-amber-100 text-amber-700 border border-amber-300'
                                    }`}>
                                    {learningState.statusText}
                                </span>
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed">{overallAssessment.summary}</p>
                        </div>
                    </div>
                </div>

                {/* 关键发现 */}
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Brain size={20} className="text-purple-600" />
                        关键发现
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {keyFindings.slice(0, isExpanded ? keyFindings.length : 4).map((finding) => (
                            <motion.div
                                key={finding.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-4 rounded-xl bg-gradient-to-br ${getTypeColor(finding.color)} border backdrop-blur-sm`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{finding.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-bold text-slate-800 text-sm mb-1">{finding.title}</h5>
                                        <p className="text-xs text-slate-600 leading-relaxed">{finding.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 核心建议 */}
                {recommendations && recommendations.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Target size={20} className="text-cyan-600" />
                            AI推荐行动
                        </h4>
                        <div className="space-y-3">
                            {recommendations.slice(0, isExpanded ? recommendations.length : 2).map((rec) => (
                                <div
                                    key={rec.id}
                                    className={`p-4 rounded-xl border ${rec.priority === 'high'
                                            ? 'bg-rose-50 border-rose-200'
                                            : 'bg-blue-50 border-blue-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="text-2xl">{rec.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h5 className="font-bold text-slate-800">{rec.title}</h5>
                                                {rec.priority === 'high' && (
                                                    <span className="px-2 py-0.5 bg-rose-200 text-rose-700 rounded text-xs font-bold border border-rose-300">
                                                        优先
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600 mb-3">{rec.reason}</p>
                                            {isExpanded && (
                                                <div className="space-y-1">
                                                    {rec.actions.map((action, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                                            <span className="text-cyan-600">•</span>
                                                            <span>{action}</span>
                                                        </div>
                                                    ))}
                                                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                                                        <span className="text-emerald-600">📈 {rec.expectedResult}</span>
                                                        <span className="text-slate-500">⏱️ {rec.timeframe}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 展开/收起按钮 */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 font-medium transition-all flex items-center justify-center gap-2 group"
                >
                    {isExpanded ? (
                        <>
                            <span>收起详情</span>
                            <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                        </>
                    ) : (
                        <>
                            <span>查看更多分析</span>
                            <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                        </>
                    )}
                </button>

                {/* 鼓励语 */}
                {encouragement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200"
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">💪</div>
                            <div>
                                <p className="text-slate-700 font-medium italic mb-2">"{encouragement.message}"</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-yellow-700">🎯 {encouragement.nextMilestone}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AIAnalysisCard;

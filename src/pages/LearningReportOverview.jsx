import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Trophy, Flame, Clock, Target, TrendingUp, CheckCircle, Gift, Sparkles } from 'lucide-react';
import GlassCard from '../components/uiverse/GlassCard';
import StatCard from '../components/uiverse/StatCard';
import AIAnalysisCard from '../components/uiverse/AIAnalysisCard';
import StorageUtils from '../utils/storage_utils';
import AI_LEARNING_ANALYSIS_DATA from '../data/ai_learning_analysis_data';

/**
 * 统计报告页面 - 总览数据展示
 */
const LearningReportOverview = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // 从 localStorage 加载数据
        const learningData = StorageUtils.getLearningData();
        setData(learningData);
    }, []);

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-slate-400">加载中...</div>
            </div>
        );
    }

    const { overview, performanceTrends } = data;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* Hero Section - 学习进展 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-white p-10 border border-slate-200 shadow-lg"
            >
                {/* 背景装饰 */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 整体进度 */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-yellow-500" size={28} />
                            <h2 className="text-3xl font-bold text-slate-800">学习进展</h2>
                        </div>
                        <p className="text-slate-600 mb-6 text-lg">
                            已学习 <span className="font-bold text-2xl text-slate-800">{overview.totalDays}</span> 天
                            · 连续打卡 <span className="font-bold text-2xl text-slate-800">{overview.streakDays}</span> 天
                        </p>

                        {/* 进度条 */}
                        <div className="relative mb-6">
                            <div className="h-6 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${overview.overallProgress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-slate-600">整体掌握度</span>
                                <span className="text-4xl font-black text-slate-800">{overview.overallProgress}%</span>
                            </div>
                        </div>

                        {/* 排名信息 */}
                        <div className="flex items-center gap-4 bg-slate-100 rounded-2xl p-5 border border-slate-200">
                            <Trophy className="text-yellow-400" size={36} />
                            <div className="flex-1">
                                <div className="text-sm text-slate-600">班级排名</div>
                                <div className="text-2xl font-bold text-slate-800">
                                    第 {overview.ranking.current} 名
                                    <span className="text-sm text-emerald-400 ml-2">↑ {overview.ranking.change} 名</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-600">战胜</div>
                                <div className="text-2xl font-bold text-slate-800">{overview.ranking.percentile}%</div>
                            </div>
                        </div>
                    </div>

                    {/* 成就徽章 */}
                    <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Gift className="text-pink-500" size={22} />
                            <h3 className="text-lg font-bold text-slate-800">成就徽章</h3>
                        </div>
                        <div className="space-y-3">
                            {overview.achievements.map(achievement => (
                                <div
                                    key={achievement.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${achievement.unlocked
                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/30'
                                        : 'bg-slate-200 opacity-50'
                                        }`}
                                >
                                    <div className="text-2xl">{achievement.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-800 truncate">{achievement.name}</div>
                                        {!achievement.unlocked && achievement.progress && (
                                            <div className="mt-1 h-1 bg-slate-300 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-yellow-400"
                                                    style={{ width: `${achievement.progress}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {achievement.unlocked && <CheckCircle size={16} className="text-emerald-400" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 本周亮点 */}
                <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {overview.weeklyHighlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-slate-100 rounded-xl p-5 border border-slate-200 hover:bg-slate-200 transition-all cursor-pointer"
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-3xl">{highlight.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 mb-1">{highlight.title}</h4>
                                    <p className="text-sm text-slate-600">{highlight.description}</p>
                                    <div className="mt-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-300">
                                        {highlight.improvement}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* AI学情分析 */}
            <AIAnalysisCard
                analysis={AI_LEARNING_ANALYSIS_DATA.comprehensiveAnalysis}
                variant="overview"
                className="mb-10"
            />

            {/* 关键指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={Target}
                    label="平均正确率"
                    value={`${performanceTrends.keyMetrics.avgAccuracy}%`}
                    trend="up"
                    trendValue={performanceTrends.keyMetrics.accuracyTrend}
                    color="green"
                    delay={0.1}
                />
                <StatCard
                    icon={Clock}
                    label="总学习时长"
                    value={`${Math.floor(performanceTrends.keyMetrics.totalTime / 60)}h`}
                    trend="up"
                    trendValue={performanceTrends.keyMetrics.timeTrend}
                    color="blue"
                    delay={0.2}
                />
                <StatCard
                    icon={CheckCircle}
                    label="完成题目数"
                    value={performanceTrends.keyMetrics.totalQuestions}
                    trend="up"
                    trendValue={performanceTrends.keyMetrics.questionsTrend}
                    color="purple"
                    delay={0.3}
                />
                <StatCard
                    icon={Flame}
                    label="连续打卡"
                    value={`${performanceTrends.keyMetrics.currentStreak}天`}
                    trend="up"
                    trendValue={`最长${performanceTrends.keyMetrics.bestStreak}天`}
                    color="orange"
                    delay={0.4}
                />
            </div>

            {/* 学习趋势图表 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                        <TrendingUp className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">学习表现趋势</h3>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceTrends.daily}>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    color: '#1e293b',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="accuracy"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fill="url(#colorGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 激励语 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center py-8"
            >
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <p className="text-white text-lg font-medium italic">
                        "每一次努力都是进步的阶梯，继续保持，你一定能达成目标！💪"
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LearningReportOverview;

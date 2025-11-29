import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, LineChart, Line
} from 'recharts';
import {
    TrendingUp, Award, Target, Flame, Clock, CheckCircle,
    Star, Zap, BookOpen, PlayCircle, FileText, Calendar,
    Trophy, Heart, Brain, Sparkles, ChevronRight, Download,
    Share2, ChevronDown, ChevronUp, Gift
} from 'lucide-react';
import { LEARNING_REPORT_DATA } from '../data/learning_report_data';

const LearningReportPage = () => {
    const [selectedMetric, setSelectedMetric] = useState('accuracy');
    const [showAllPlan, setShowAllPlan] = useState(false);
    const [radarView, setRadarView] = useState('current'); // current, lastWeek, target

    const data = LEARNING_REPORT_DATA;

    // 获取雷达图数据
    const getRadarData = () => {
        if (radarView === 'current') return data.abilityRadar.current;
        if (radarView === 'lastWeek') return data.abilityRadar.lastWeek;
        return data.abilityRadar.target;
    };

    // 优先级颜色
    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'from-rose-500 to-pink-500';
        if (priority === 'medium') return 'from-amber-500 to-orange-500';
        return 'from-blue-500 to-cyan-500';
    };

    const getPriorityBg = (priority) => {
        if (priority === 'high') return 'bg-rose-50 border-rose-200';
        if (priority === 'medium') return 'bg-amber-50 border-amber-200';
        return 'bg-blue-50 border-blue-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">{data.studentInfo.avatar}</div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    {data.studentInfo.name}的学习报告
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {data.studentInfo.grade} · {data.studentInfo.subject} · {data.studentInfo.currentTopic}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-all border border-slate-200 shadow-sm hover:shadow-md">
                                <Share2 size={18} />
                                分享
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl">
                                <Download size={18} />
                                导出PDF
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

                {/* 1️⃣ 学习概览 Hero Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-2xl"
                    >
                        {/* 背景装饰 */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* 整体进度 */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={24} />
                                    <h2 className="text-3xl font-bold">学习进展</h2>
                                </div>
                                <p className="text-white/80 mb-6">
                                    已学习 <span className="font-bold text-2xl">{data.overview.totalDays}</span> 天
                                    · 连续打卡 <span className="font-bold text-2xl">{data.overview.streakDays}</span> 天
                                </p>
                                <div className="relative">
                                    <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${data.overview.overallProgress}%` }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full shadow-lg"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-white/70">整体掌握度</span>
                                        <span className="text-3xl font-black">{data.overview.overallProgress}%</span>
                                    </div>
                                </div>

                                {/* 排名信息 */}
                                <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <Trophy className="text-yellow-300" size={32} />
                                    <div className="flex-1">
                                        <div className="text-sm text-white/70">班级排名</div>
                                        <div className="text-2xl font-bold">
                                            第 {data.overview.ranking.current} 名
                                            <span className="text-sm text-emerald-300 ml-2">↑ {data.overview.ranking.change} 名</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-white/70">战胜</div>
                                        <div className="text-2xl font-bold">{data.overview.ranking.percentile}%</div>
                                    </div>
                                </div>
                            </div>

                            {/* 成就徽章 */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center gap-2 mb-4">
                                    <Gift size={20} />
                                    <h3 className="text-lg font-bold">成就徽章</h3>
                                </div>
                                <div className="space-y-3">
                                    {data.overview.achievements.map(achievement => (
                                        <div
                                            key={achievement.id}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${achievement.unlocked
                                                    ? 'bg-white/20'
                                                    : 'bg-white/5 opacity-50'
                                                }`}
                                        >
                                            <div className="text-2xl">{achievement.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">{achievement.name}</div>
                                                {!achievement.unlocked && achievement.progress && (
                                                    <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-yellow-300"
                                                            style={{ width: `${achievement.progress}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {achievement.unlocked && <CheckCircle size={16} className="text-emerald-300" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 本周亮点 */}
                        <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.overview.weeklyHighlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="text-3xl">{highlight.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold mb-1">{highlight.title}</h4>
                                            <p className="text-sm text-white/70">{highlight.description}</p>
                                            <div className="mt-2 inline-block px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold">
                                                {highlight.improvement}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 2️⃣ 能力雷达图 + 3️⃣ 知识地图 */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 能力雷达 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Brain className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">能力雷达图</h3>
                            </div>
                            <div className="flex gap-2">
                                {['current', 'lastWeek', 'target'].map(view => (
                                    <button
                                        key={view}
                                        onClick={() => setRadarView(view)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${radarView === view
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {view === 'current' ? '本周' : view === 'lastWeek' ? '上周' : '目标'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={getRadarData()}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis
                                        dataKey="dimension"
                                        tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="能力值"
                                        dataKey="score"
                                        stroke={radarView === 'target' ? '#10b981' : '#6366f1'}
                                        strokeWidth={3}
                                        fill={radarView === 'target' ? '#10b981' : '#818cf8'}
                                        fillOpacity={0.5}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 薄弱维度提示 */}
                        <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="text-rose-500" size={18} />
                                <span className="text-sm font-bold text-rose-700">需要重点提升</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.abilityRadar.weakestDimensions.map((dim, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-medium">
                                        {dim}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 知识地图 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Target className="text-white" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">知识掌握地图</h3>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {data.knowledgeMap.modules.map((module, idx) => (
                                <motion.div
                                    key={module.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className={`p-4 rounded-xl border-2 transition-all ${module.status === 'mastered'
                                            ? 'bg-emerald-50 border-emerald-200'
                                            : module.status === 'learning'
                                                ? 'bg-blue-50 border-blue-200'
                                                : 'bg-slate-50 border-slate-200 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${module.status === 'mastered'
                                                    ? 'bg-emerald-500'
                                                    : module.status === 'learning'
                                                        ? 'bg-blue-500'
                                                        : 'bg-slate-400'
                                                }`} />
                                            <h4 className="font-bold text-slate-800">{module.name}</h4>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-slate-500">
                                                {module.masteredPoints}/{module.totalPoints}
                                            </span>
                                            <span className={`text-lg font-bold ${module.status === 'mastered'
                                                    ? 'text-emerald-600'
                                                    : module.status === 'learning'
                                                        ? 'text-blue-600'
                                                        : 'text-slate-400'
                                                }`}>
                                                {module.progress}%
                                            </span>
                                        </div>
                                    </div>

                                    {module.status !== 'locked' && (
                                        <>
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${module.status === 'mastered'
                                                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                                            : 'bg-gradient-to-r from-blue-400 to-blue-500'
                                                        }`}
                                                    style={{ width: `${module.progress}%` }}
                                                />
                                            </div>

                                            {module.subTopics.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {module.subTopics.slice(0, 3).map((topic, topicIdx) => (
                                                        <span
                                                            key={topicIdx}
                                                            className={`px-2 py-1 rounded-lg text-xs ${topic.mastery >= 80
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : topic.mastery >= 60
                                                                        ? 'bg-amber-100 text-amber-700'
                                                                        : 'bg-rose-100 text-rose-700'
                                                                }`}
                                                        >
                                                            {topic.name} {topic.mastery}%
                                                        </span>
                                                    ))}
                                                    {module.subTopics.length > 3 && (
                                                        <span className="px-2 py-1 text-xs text-slate-500">
                                                            +{module.subTopics.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {module.status === 'locked' && (
                                        <div className="text-center py-2 text-slate-400 text-sm">
                                            🔒 完成前置知识后解锁
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* 智能推荐 */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="text-indigo-600" size={18} />
                                <span className="text-sm font-bold text-indigo-700">AI推荐</span>
                            </div>
                            <p className="text-sm text-slate-700">
                                下一步学习：<span className="font-bold">{data.knowledgeMap.nextRecommended.topic}</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{data.knowledgeMap.nextRecommended.reason}</p>
                        </div>
                    </motion.div>
                </section>

                {/* 4️⃣ 学习表现趋势 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                                <TrendingUp className="text-white" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">学习表现趋势</h3>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { key: 'accuracy', label: '正确率', icon: Target },
                                { key: 'time', label: '学习时长', icon: Clock },
                                { key: 'questions', label: '完成题数', icon: CheckCircle }
                            ].map(metric => (
                                <button
                                    key={metric.key}
                                    onClick={() => setSelectedMetric(metric.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedMetric === metric.key
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    <metric.icon size={16} />
                                    {metric.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 关键指标卡片 */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                            <div className="text-sm text-emerald-700 mb-1">平均正确率</div>
                            <div className="text-3xl font-bold text-emerald-600">{data.performanceTrends.keyMetrics.avgAccuracy}%</div>
                            <div className="text-xs text-emerald-500 mt-1">{data.performanceTrends.keyMetrics.accuracyTrend}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                            <div className="text-sm text-blue-700 mb-1">总学习时长</div>
                            <div className="text-3xl font-bold text-blue-600">{Math.floor(data.performanceTrends.keyMetrics.totalTime / 60)}h</div>
                            <div className="text-xs text-blue-500 mt-1">{data.performanceTrends.keyMetrics.timeTrend}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                            <div className="text-sm text-purple-700 mb-1">完成题目数</div>
                            <div className="text-3xl font-bold text-purple-600">{data.performanceTrends.keyMetrics.totalQuestions}</div>
                            <div className="text-xs text-purple-500 mt-1">{data.performanceTrends.keyMetrics.questionsTrend}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
                            <div className="text-sm text-orange-700 mb-1">连续打卡</div>
                            <div className="text-3xl font-bold text-orange-600 flex items-center gap-1">
                                <Flame size={28} className="text-orange-500" />
                                {data.performanceTrends.keyMetrics.currentStreak}天
                            </div>
                            <div className="text-xs text-orange-500 mt-1">最长 {data.performanceTrends.keyMetrics.bestStreak} 天</div>
                        </div>
                    </div>

                    {/* 趋势图表 */}
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.performanceTrends.daily}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        padding: '12px'
                                    }}
                                    labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={
                                        selectedMetric === 'accuracy' ? 'accuracy' :
                                            selectedMetric === 'time' ? 'timeMinutes' : 'questionsCompleted'
                                    }
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fill="url(#colorGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 每周对比 */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h4 className="text-sm font-bold text-slate-700 mb-4">每周表现对比</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.performanceTrends.weeklyComparison}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                    <XAxis
                                        dataKey="week"
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        axisLine={false}
                                    />
                                    <YAxis tick={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.section>

                {/* 5️⃣ 个性化建议 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-indigo-200"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">AI导师的个性化建议</h3>
                    </div>

                    {/* AI老师总评 */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="text-5xl">{data.recommendations.teacherComment.avatar}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-lg text-slate-800">{data.recommendations.teacherComment.name}</h4>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.recommendations.teacherComment.sentiment === 'positive'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {data.recommendations.teacherComment.sentiment === 'positive' ? '表现优秀' : '需要加油'}
                                    </span>
                                </div>
                                <p className="text-slate-700 leading-relaxed mb-3">
                                    {data.recommendations.teacherComment.message}
                                </p>
                                <div className="flex items-center gap-2 text-indigo-600">
                                    <Heart size={16} fill="currentColor" />
                                    <span className="text-sm font-medium">{data.recommendations.teacherComment.encouragement}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 行动建议 */}
                    <div className="space-y-4 mb-6">
                        {data.recommendations.actionItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 ${getPriorityBg(item.priority)} shadow-sm hover:shadow-md transition-all`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(item.priority)} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-slate-800">{item.title}</h4>
                                            <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${item.priority === 'high' ? 'bg-rose-200 text-rose-700' :
                                                    item.priority === 'medium' ? 'bg-amber-200 text-amber-700' :
                                                        'bg-blue-200 text-blue-700'
                                                }`}>
                                                {item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '重要' : '建议'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3">{item.description}</p>

                                        <div className="space-y-2 mb-3">
                                            {item.actions.map((action, actionIdx) => (
                                                <div key={actionIdx} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700">{action}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1 text-slate-500">
                                                    <Clock size={14} />
                                                    {item.estimatedTime}
                                                </span>
                                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                                    <TrendingUp size={14} />
                                                    预期提升 {item.expectedImprovement}
                                                </span>
                                            </div>
                                            <button className={`px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r ${getPriorityColor(item.priority)} hover:shadow-lg transition-all`}>
                                                开始行动
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* 学习计划 */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-indigo-600" size={20} />
                                <h4 className="font-bold text-slate-800">本周学习计划</h4>
                            </div>
                            <button
                                onClick={() => setShowAllPlan(!showAllPlan)}
                                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                {showAllPlan ? '收起' : '查看全部'}
                                {showAllPlan ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(showAllPlan ? data.recommendations.weeklyPlan : data.recommendations.weeklyPlan.slice(0, 3)).map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl border-2 transition-all ${idx === 0
                                            ? 'bg-indigo-50 border-indigo-300 shadow-md'
                                            : 'bg-slate-50 border-slate-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-lg font-bold text-sm ${idx === 0
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-200 text-slate-700'
                                                }`}>
                                                {plan.day}
                                            </div>
                                            <span className="text-xs text-slate-500">{plan.date}</span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
                                            {plan.focus}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {plan.tasks.map((task, taskIdx) => (
                                            <div key={taskIdx} className="flex items-center gap-3 text-sm">
                                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${task.type === 'video' ? 'bg-red-100' :
                                                        task.type === 'practice' ? 'bg-blue-100' :
                                                            task.type === 'test' ? 'bg-purple-100' :
                                                                task.type === 'reading' ? 'bg-green-100' :
                                                                    task.type === 'drill' ? 'bg-orange-100' :
                                                                        'bg-slate-100'
                                                    }`}>
                                                    {task.type === 'video' ? <PlayCircle size={14} className="text-red-600" /> :
                                                        task.type === 'practice' ? <FileText size={14} className="text-blue-600" /> :
                                                            task.type === 'test' ? <Star size={14} className="text-purple-600" /> :
                                                                task.type === 'reading' ? <BookOpen size={14} className="text-green-600" /> :
                                                                    task.type === 'drill' ? <Zap size={14} className="text-orange-600" /> :
                                                                        <CheckCircle size={14} className="text-slate-600" />}
                                                </div>
                                                <span className="flex-1 text-slate-700">{task.content}</span>
                                                <span className="text-xs text-slate-500">{task.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 学习资源推荐 */}
                    <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="text-indigo-600" size={20} />
                            <h4 className="font-bold text-slate-800">推荐学习资源</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.recommendations.resources.map(resource => (
                                <div
                                    key={resource.id}
                                    className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resource.type === 'video' ? 'bg-red-100' :
                                                resource.type === 'practice' ? 'bg-blue-100' :
                                                    'bg-green-100'
                                            }`}>
                                            {resource.type === 'video' ? <PlayCircle size={16} className="text-red-600" /> :
                                                resource.type === 'practice' ? <FileText size={16} className="text-blue-600" /> :
                                                    <BookOpen size={16} className="text-green-600" />}
                                        </div>
                                        {resource.matched && (
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                                                匹配
                                            </span>
                                        )}
                                    </div>
                                    <h5 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {resource.title}
                                    </h5>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{resource.source}</span>
                                        <div className="flex items-center gap-1">
                                            <Star size={12} fill="#fbbf24" className="text-amber-400" />
                                            <span>{resource.rating}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-slate-600">
                                            {resource.duration || resource.readTime || `${resource.questionCount}题`}
                                        </span>
                                        <ChevronRight size={16} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 激励语 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center py-8"
                >
                    <div className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                        <p className="text-white text-lg font-medium italic">
                            "每一次努力都是进步的阶梯，继续保持，你一定能达成目标！💪"
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default LearningReportPage;

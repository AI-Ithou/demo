import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { Brain, Target, Zap, Sparkles, TrendingUp, Award, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';
import StorageUtils from '../utils/storage_utils';
import AI_LEARNING_ANALYSIS_DATA from '../data/ai_learning_analysis_data';
import FAIL_RATE_DATA from '../data/fail_rate_data';

/**
 * 报告详情页面 - 能力雷达和知识地图
 */
const LearningReportDetails = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [radarView, setRadarView] = useState('current');

    useEffect(() => {
        const learningData = StorageUtils.getLearningData();
        setData(learningData);
    }, []);

    // 跳转到错题本并筛选特定知识点
    const navigateToErrors = (knowledgePoint) => {
        navigate('/error-log', {
            state: { knowledgePoint }
        });
    };

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-slate-400">加载中...</div>
            </div>
        );
    }

    const { abilityRadar, knowledgeMap, performanceTrends } = data;

    const getRadarData = () => {
        if (radarView === 'current') return abilityRadar.current;
        if (radarView === 'lastWeek') return abilityRadar.lastWeek;
        return abilityRadar.target;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* 能力雷达图 + 知识地图 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 能力雷达 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                                <Brain className="text-white" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">能力雷达图</h3>
                        </div>
                        <div className="flex gap-2">
                            {['current', 'lastWeek', 'target'].map(view => (
                                <button
                                    key={view}
                                    onClick={() => setRadarView(view)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${radarView === view
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
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
                                    stroke={radarView === 'target' ? '#10b981' : '#3b82f6'}
                                    strokeWidth={3}
                                    fill={radarView === 'target' ? '#10b981' : '#3b82f6'}
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 薄弱维度提示 - 可点击跳转 */}
                    <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="text-rose-500" size={18} />
                            <span className="text-sm font-bold text-rose-600">需要重点提升（点击查看相关错题）</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {abilityRadar.weakestDimensions.map((dim, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigateToErrors(dim)}
                                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium border border-rose-200 hover:bg-rose-200 hover:scale-105 transition-all cursor-pointer"
                                >
                                    {dim} →
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI能力维度分析 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">AI能力分析</h3>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.abilities.map((ability, idx) => (
                            <motion.div
                                key={ability.dimension}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-slate-800">{ability.dimension}</h4>
                                        {ability.trend === 'up' && (
                                            <TrendingUp size={16} className="text-emerald-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-2xl font-bold ${ability.score >= 85 ? 'text-emerald-500' :
                                            ability.score >= 75 ? 'text-blue-500' :
                                                'text-amber-500'
                                            }`}>
                                            {ability.score}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{ability.analysis}</p>

                                {/* 优势 */}
                                {ability.strengths.length > 0 && (
                                    <div className="mb-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Award size={14} className="text-emerald-500" />
                                            <span className="text-xs font-bold text-emerald-600">优势</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {ability.strengths.map((strength, sIdx) => (
                                                <span key={sIdx} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs border border-emerald-200">
                                                    {strength}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 改进建议 */}
                                {ability.improvements.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap size={14} className="text-amber-500" />
                                            <span className="text-xs font-bold text-amber-600">改进建议</span>
                                        </div>
                                        <div className="space-y-1">
                                            {ability.improvements.map((improvement, iIdx) => (
                                                <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-500">
                                                    <span className="text-amber-500">•</span>
                                                    <span>{improvement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 挂科率分析 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${FAIL_RATE_DATA.overall.rate < 10 ? 'bg-gradient-to-br from-emerald-600 to-green-600' :
                                FAIL_RATE_DATA.overall.rate < 20 ? 'bg-gradient-to-br from-amber-600 to-orange-600' :
                                    'bg-gradient-to-br from-rose-600 to-red-600'
                            }`}>
                            <AlertTriangle className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">挂科率分析</h3>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                            <TrendingDown className="text-emerald-500" size={20} />
                            <span className="text-sm text-emerald-600 font-medium">
                                较上次下降 {FAIL_RATE_DATA.overall.improvement}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* 总体挂科率 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-4 border border-rose-100">
                        <div className="text-sm text-rose-600 font-medium mb-1">当前挂科率</div>
                        <div className="text-3xl font-black text-rose-600">{FAIL_RATE_DATA.overall.rate}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="text-sm text-slate-600 font-medium mb-1">上次挂科率</div>
                        <div className="text-3xl font-black text-slate-600">{FAIL_RATE_DATA.overall.previousRate}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        <div className="text-sm text-emerald-600 font-medium mb-1">改善幅度</div>
                        <div className="text-3xl font-black text-emerald-600">↓ {FAIL_RATE_DATA.overall.improvement}%</div>
                    </div>
                </div>

                {/* 挂科科目列表 */}
                <div className="space-y-3 mb-6">
                    <h4 className="font-bold text-slate-800 mb-3">挂科科目详情</h4>
                    {FAIL_RATE_DATA.failedSubjects.map((subject, idx) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-xl border-2 ${subject.status === 'critical' ? 'bg-rose-50 border-rose-200' :
                                    subject.status === 'warning' ? 'bg-amber-50 border-amber-200' :
                                        'bg-emerald-50 border-emerald-200'
                                }`}>
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h5 className="font-bold text-slate-800 mb-1">{subject.name}</h5>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${subject.status === 'critical' ? 'bg-rose-200 text-rose-700' :
                                                subject.status === 'warning' ? 'bg-amber-200 text-amber-700' :
                                                    'bg-emerald-200 text-emerald-700'
                                            }`}>
                                            {subject.status === 'critical' ? '严重' : subject.status === 'warning' ? '警告' : '正常'}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            上次考试: {subject.lastExamScore}分 (及格线: {subject.passingScore}分)
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-rose-600">{subject.failRate}%</div>
                                    <div className="text-xs text-slate-500">挂科率</div>
                                </div>
                            </div>

                            {/* 薄弱知识点 */}
                            <div className="mb-3">
                                <div className="text-xs font-bold text-slate-600 mb-2">薄弱知识点:</div>
                                <div className="flex flex-wrap gap-2">
                                    {subject.weakPoints.map((point, pIdx) => (
                                        <button
                                            key={pIdx}
                                            onClick={() => navigateToErrors(point)}
                                            className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200 hover:bg-slate-100 hover:scale-105 transition-all">
                                            {point} →
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 推荐行动 */}
                            <div>
                                <div className="text-xs font-bold text-slate-600 mb-1">AI推荐行动:</div>
                                <div className="space-y-1">
                                    {subject.recommendedActions.map((action, aIdx) => (
                                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                            <span className="text-blue-500 mt-0.5">•</span>
                                            <span>{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 补考计划 */}
                {FAIL_RATE_DATA.retakeSchedule.length > 0 && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="text-blue-600" size={18} />
                            <span className="text-sm font-bold text-blue-600">补考计划</span>
                        </div>
                        {FAIL_RATE_DATA.retakeSchedule.map((retake, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className="font-bold text-slate-800">{retake.subject}</div>
                                        <div className="text-xs text-slate-500">补考日期: {retake.retakeDate}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-blue-600">{retake.daysLeft}天</div>
                                        <div className="text-xs text-slate-500">剩余时间</div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-slate-600">复习进度</span>
                                        <span className="font-bold text-blue-600">{retake.studyProgress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                                            style={{ width: `${retake.studyProgress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600">
                                    目标分数: <span className="font-bold text-blue-600">{retake.targetScore}分</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 知识点深度分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 已掌握知识点 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                            <Award className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">已掌握知识点</h3>
                    </div>

                    <div className="mb-4">
                        <div className="text-4xl font-black text-emerald-500 mb-2">
                            {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.knowledgePoints.mastered.count}
                        </div>
                        <p className="text-sm text-slate-600">
                            {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.knowledgePoints.mastered.analysis}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.knowledgePoints.mastered.topics.map((topic, idx) => (
                            <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200">
                                ✓ {topic}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 薄弱知识点 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center">
                            <Zap className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">需要加强</h3>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold border border-rose-200">
                                高优先级
                            </span>
                        </div>
                        <p className="text-sm text-slate-600">
                            {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.knowledgePoints.weak.analysis}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {AI_LEARNING_ANALYSIS_DATA.dimensionAnalysis.knowledgePoints.weak.topics.map((topic, idx) => (
                            <div key={idx} className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-800 font-medium">{topic}</span>
                                    <span className="text-rose-500 text-sm">需重点突破</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 原有的知识地图 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 能力雷达 */}
                <div style={{ display: 'none' }}>
                    {/* 隐藏原有的能力雷达，已经移到上面 */}
                </div>

                {/* 知识地图 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <Target className="text-white" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">知识掌握地图</h3>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {knowledgeMap.modules.map((module, idx) => (
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
                                            ? 'bg-emerald-400'
                                            : module.status === 'learning'
                                                ? 'bg-blue-400'
                                                : 'bg-slate-400'
                                            }`} />
                                        <h4 className="font-bold text-slate-800">{module.name}</h4>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-500">
                                            {module.masteredPoints}/{module.totalPoints}
                                        </span>
                                        <span className={`text-lg font-bold ${module.status === 'mastered'
                                            ? 'text-emerald-500'
                                            : module.status === 'learning'
                                                ? 'text-blue-500'
                                                : 'text-slate-500'
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
                                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
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
                                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                            : topic.mastery >= 60
                                                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                                                : 'bg-rose-100 text-rose-700 border border-rose-200'
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
                                    <div className="text-center py-2 text-slate-500 text-sm">
                                        🔒 完成前置知识后解锁
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* 智能推荐 */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-indigo-500" size={18} />
                            <span className="text-sm font-bold text-indigo-600">AI推荐</span>
                        </div>
                        <p className="text-sm text-slate-600">
                            下一步学习：<span className="font-bold text-slate-800">{knowledgeMap.nextRecommended.topic}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{knowledgeMap.nextRecommended.reason}</p>
                    </div>
                </div>
            </div>

            {/* 每周表现对比 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">每周表现对比</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceTrends.weeklyComparison}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis
                                dataKey="week"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                axisLine={false}
                            />
                            <YAxis tick={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    color: '#1e293b',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 自定义滚动条样式 */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default LearningReportDetails;

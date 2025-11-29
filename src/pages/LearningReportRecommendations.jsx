import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, Heart, Calendar, CheckCircle, Clock, TrendingUp,
    PlayCircle, FileText, BookOpen, Star, Zap, ChevronRight, ChevronDown, ChevronUp
} from 'lucide-react';
import ActionButton from '../components/uiverse/ActionButton';
import StorageUtils from '../utils/storage_utils';

/**
 * 建议页面 - AI建议和学习计划
 */
const LearningReportRecommendations = () => {
    const [data, setData] = useState(null);
    const [showAllPlan, setShowAllPlan] = useState(false);
    const [completedItems, setCompletedItems] = useState(new Set());

    useEffect(() => {
        const learningData = StorageUtils.getLearningData();
        setData(learningData);

        // 加载已完成的建议
        const completed = new Set(
            learningData.recommendations.actionItems
                .filter(item => item.completed)
                .map(item => item.id)
        );
        setCompletedItems(completed);
    }, []);

    const handleMarkComplete = (itemId) => {
        StorageUtils.markRecommendationComplete(itemId);
        setCompletedItems(prev => new Set([...prev, itemId]));

        // 重新加载数据
        const updatedData = StorageUtils.getLearningData();
        setData(updatedData);
    };

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-slate-400">加载中...</div>
            </div>
        );
    }

    const { recommendations } = data;

    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'from-rose-600 to-pink-600';
        if (priority === 'medium') return 'from-amber-600 to-orange-600';
        return 'from-blue-600 to-cyan-600';
    };

    const getPriorityBg = (priority) => {
        if (priority === 'high') return 'bg-rose-50 border-rose-200';
        if (priority === 'medium') return 'bg-amber-50 border-amber-200';
        return 'bg-blue-50 border-blue-200';
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* AI老师总评 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">AI导师的个性化建议</h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-start gap-4">
                        <div className="text-5xl">{recommendations.teacherComment.avatar}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold text-lg text-slate-800">{recommendations.teacherComment.name}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${recommendations.teacherComment.sentiment === 'positive'
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                                    }`}>
                                    {recommendations.teacherComment.sentiment === 'positive' ? '表现优秀' : '需要加油'}
                                </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-3">
                                {recommendations.teacherComment.message}
                            </p>
                            <div className="flex items-center gap-2 text-pink-500">
                                <Heart size={16} fill="currentColor" />
                                <span className="text-sm font-medium">{recommendations.teacherComment.encouragement}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 行动建议 */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">行动建议</h3>
                {recommendations.actionItems.map((item, idx) => {
                    const isCompleted = completedItems.has(item.id);

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <div
                                className={`p-6 border-2 rounded-2xl shadow-sm bg-white ${getPriorityBg(item.priority)} ${isCompleted ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getPriorityColor(item.priority)} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                                        {isCompleted ? '✓' : item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-slate-800">{item.title}</h4>
                                            <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${item.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                                                item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '重要' : '建议'}
                                            </span>
                                            {isCompleted && (
                                                <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
                                                    已完成
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3">{item.description}</p>

                                        <div className="space-y-2 mb-3">
                                            {item.actions.map((action, actionIdx) => (
                                                <div key={actionIdx} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-600">{action}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className="flex items-center gap-1 text-slate-500">
                                                    <Clock size={14} />
                                                    {item.estimatedTime}
                                                </span>
                                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                                    <TrendingUp size={14} />
                                                    预期提升 {item.expectedImprovement}
                                                </span>
                                            </div>
                                            <ActionButton
                                                variant={isCompleted ? 'success' : item.priority === 'high' ? 'danger' : 'primary'}
                                                completed={isCompleted}
                                                disabled={isCompleted}
                                                onClick={() => handleMarkComplete(item.id)}
                                                className="text-sm px-4 py-2"
                                            >
                                                {isCompleted ? '已完成' : '开始行动'}
                                            </ActionButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 学习计划 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-indigo-500" size={24} />
                        <h4 className="font-bold text-slate-800 text-xl">本周学习计划</h4>
                    </div>
                    <button
                        onClick={() => setShowAllPlan(!showAllPlan)}
                        className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                        {showAllPlan ? '收起' : '查看全部'}
                        {showAllPlan ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                <div className="space-y-3">
                    {(showAllPlan ? recommendations.weeklyPlan : recommendations.weeklyPlan.slice(0, 3)).map((plan, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-xl border-2 transition-all ${idx === 0
                                ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                                : 'bg-slate-50 border-slate-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-lg font-bold text-sm ${idx === 0
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-200 text-slate-600'
                                        }`}>
                                        {plan.day}
                                    </div>
                                    <span className="text-xs text-slate-500">{plan.date}</span>
                                </div>
                                <span className="text-xs font-medium text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
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
                                            {task.type === 'video' ? <PlayCircle size={14} className="text-red-400" /> :
                                                task.type === 'practice' ? <FileText size={14} className="text-blue-400" /> :
                                                    task.type === 'test' ? <Star size={14} className="text-purple-400" /> :
                                                        task.type === 'reading' ? <BookOpen size={14} className="text-green-400" /> :
                                                            task.type === 'drill' ? <Zap size={14} className="text-orange-500" /> :
                                                                <CheckCircle size={14} className="text-slate-400" />}
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
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="text-indigo-500" size={24} />
                    <h4 className="font-bold text-slate-800 text-xl">推荐学习资源</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.resources.map(resource => (
                        <div
                            key={resource.id}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resource.type === 'video' ? 'bg-red-100' :
                                    resource.type === 'practice' ? 'bg-blue-100' :
                                        'bg-green-100'
                                    }`}>
                                    {resource.type === 'video' ? <PlayCircle size={16} className="text-red-400" /> :
                                        resource.type === 'practice' ? <FileText size={16} className="text-blue-500" /> :
                                            <BookOpen size={16} className="text-green-500" />}
                                </div>
                                {resource.matched && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">
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
                                <span className="text-xs text-slate-500">
                                    {resource.duration || resource.readTime || `${resource.questionCount}题`}
                                </span>
                                <ChevronRight size={16} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningReportRecommendations;

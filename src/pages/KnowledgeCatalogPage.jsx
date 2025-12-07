import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Search, ChevronDown, ChevronRight, Play, BookOpen,
    CheckCircle, Lock, AlertCircle, Target, Zap, Clock, Award,
    TrendingUp, BarChart3, Filter, Sparkles
} from 'lucide-react';
import KNOWLEDGE_CATALOG_DATA from '../data/knowledge_catalog_data';

const KnowledgeCatalogPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams(); // 获取课程ID
    const [expandedChapters, setExpandedChapters] = useState(['ch1', 'ch2', 'ch3']);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, mastered, learning, weak, not-started
    const [selectedCourse, setSelectedCourse] = useState('python-basic');

    const course = KNOWLEDGE_CATALOG_DATA.courses.find(c => c.id === selectedCourse);

    // 切换章节展开/收起
    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    // 跳转到学习页面
    const startLearning = (knowledgePoint) => {
        if (knowledgePoint.status === 'not-started') {
            // 未开始的知识点，跳转到学习对话页
            navigate(`/learning-dialogue/${knowledgePoint.id}`, {
                state: { knowledgePointName: knowledgePoint.name }
            });
        } else {
            // 已开始的知识点，也跳转到学习对话页
            navigate(`/learning-dialogue/${knowledgePoint.id}`, {
                state: {
                    knowledgePointName: knowledgePoint.name,
                    currentProgress: knowledgePoint.masteryLevel
                }
            });
        }
    };

    // 获取状态样式
    const getStatusStyle = (status) => {
        switch (status) {
            case 'mastered':
                return {
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-200',
                    text: 'text-emerald-700',
                    badge: 'bg-emerald-100 text-emerald-700',
                    icon: CheckCircle,
                    label: '已掌握'
                };
            case 'learning':
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-700',
                    badge: 'bg-blue-100 text-blue-700',
                    icon: Play,
                    label: '学习中'
                };
            case 'weak':
                return {
                    bg: 'bg-rose-50',
                    border: 'border-rose-200',
                    text: 'text-rose-700',
                    badge: 'bg-rose-100 text-rose-700',
                    icon: AlertCircle,
                    label: '需加强'
                };
            default:
                return {
                    bg: 'bg-slate-50',
                    border: 'border-slate-200',
                    text: 'text-slate-600',
                    badge: 'bg-slate-100 text-slate-600',
                    icon: Lock,
                    label: '未开始'
                };
        }
    };

    // 过滤知识点
    const filterKnowledgePoints = (points) => {
        return points.filter(point => {
            const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || point.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                < div className="max-w-7xl mx-auto px-6 py-4">
                    < div className="flex items-center justify-between mb-4">
                        < div className="flex items-center gap-4">
                            < button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="font-bold">返回</span>
                            </button >
                            <div className="h-6 w-px bg-slate-300"></div>
                            < div >
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                                    < BookOpen size={24} className="text-blue-500" />
                                    知识点目录
                                </h1 >
                                <p className="text-sm text-slate-500 mt-0.5">系统化学习，全面掌握</p>
                            </div >
                        </div >

                        {/* 学习统计 */}
                        < div className="flex items-center gap-4">
                            < div className="text-right">
                                < div className="text-xs text-slate-500">总体掌握度</div>
                                < div className="text-lg font-bold text-blue-600">
                                    {KNOWLEDGE_CATALOG_DATA.statistics.avgMasteryLevel}%
                                </div >
                            </div >
                            <div className="w-20 h-20">
                                < svg viewBox="0 0 100 100" className="transform -rotate-90">
                                    < circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="#e2e8f0"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="#3b82f6"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 40 * KNOWLEDGE_CATALOG_DATA.statistics.avgMasteryLevel / 100} ${2 * Math.PI * 40}`}
                                        strokeLinecap="round"
                                    />
                                </svg >
                            </div >
                        </div >
                    </div >

                    {/* 搜索和筛选 */}
                    < div className="flex items-center gap-4">
                        < div className="flex-1 relative">
                            < Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            < input
                                type="text"
                                placeholder="搜索知识点..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                        </div >
                        <div className="flex items-center gap-2">
                            < Filter size={16} className="text-slate-500" />
                            < select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                            >
                                <option value="all">全部状态</option>
                                < option value="mastered">已掌握</option>
                                < option value="learning">学习中</option>
                                < option value="weak">需加强</option>
                                < option value="not-started">未开始</option>
                            </select >
                        </div >
                    </div >
                </div >
            </header >

            <div className="max-w-7xl mx-auto px-6 py-6">
                < div className="grid grid-cols-12 gap-6">
                    {/* 左侧 - 课程信息和统计 */}
                    <div className="col-span-3 space-y-4">
                        {/* 课程卡片 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200"
                        >
                            <div className="text-4xl mb-3 text-center">{course.icon}</div>
                            < h3 className="font-bold text-slate-800 text-center mb-2">{course.name}</h3>
                            < div className="mb-3">
                                < div className="flex items-center justify-between text-xs mb-1">
                                    < span className="text-slate-500">整体进度</span>
                                    < span className="font-bold text-blue-600">{course.progress}%</span>
                                </div >
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    < div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div >
                            </div >
                            <div className="grid grid-cols-2 gap-2text-xs">
                                < div className="bg-slate-50 rounded-lg p-2 text-center">
                                    < div className="text-slate-500">总知识点</div>
                                    < div className="text-lg font-bold text-slate-800">{course.totalPoints}</div>
                                </div >
                                <div className="bg-emerald-50 rounded-lg p-2 text-center">
                                    < div className="text-emerald-600">已掌握</div>
                                    < div className="text-lg font-bold text-emerald-600">{course.masteredPoints}</div>
                                </div >
                            </div >
                        </motion.div >

                        {/* 学习统计 */}
                        < motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                < BarChart3 size={18} className="text-blue-600" />
                                < h3 className="font-bold text-slate-800">学习统计</h3>
                            </div >
                            <div className="space-y-3">
                                < div className="flex items-center justify-between">
                                    < div className="flex items-center gap-2">
                                        < div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        < span className="text-sm text-slate-600">已掌握</span>
                                    </div >
                                    <span className="font-bold text-emerald-600">
                                        {KNOWLEDGE_CATALOG_DATA.statistics.masteredPoints}
                                    </span >
                                </div >
                                <div className="flex items-center justify-between">
                                    < div className="flex items-center gap-2">
                                        < div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        < span className="text-sm text-slate-600">学习中</span>
                                    </div >
                                    <span className="font-bold text-blue-600">
                                        {KNOWLEDGE_CATALOG_DATA.statistics.learningPoints}
                                    </span >
                                </div >
                                <div className="flex items-center justify-between">
                                    < div className="flex items-center gap-2">
                                        < div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                        < span className="text-sm text-slate-600">需加强</span>
                                    </div >
                                    <span className="font-bold text-rose-600">
                                        {KNOWLEDGE_CATALOG_DATA.statistics.weakPoints}
                                    </span >
                                </div >
                                <div className="flex items-center justify-between">
                                    < div className="flex items-center gap-2">
                                        < div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                        < span className="text-sm text-slate-600">未开始</span>
                                    </div >
                                    <span className="font-bold text-slate-600">
                                        {KNOWLEDGE_CATALOG_DATA.statistics.notStartedPoints}
                                    </span >
                                </div >
                            </div >
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                < div className="flex items-center justify-between text-sm">
                                    < div className="flex items-center gap-2">
                                        < Clock size={14} className="text-slate-400" />
                                        < span className="text-slate-600">总学习时长</span>
                                    </div >
                                    <span className="font-bold text-slate-800">
                                        {Math.floor(KNOWLEDGE_CATALOG_DATA.statistics.totalStudyTime / 60)}h {KNOWLEDGE_CATALOG_DATA.statistics.totalStudyTime % 60} m
                                    </span >
                                </div >
                            </div >
                        </motion.div >

                        {/* AI推荐 */}
                        < motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 shadow-lg text-white"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                < Sparkles size={18} />
                                <h3 className="font-bold">AI推荐学习</h3>
                            </div >
                            <div className="space-y-2">
                                {
                                    KNOWLEDGE_CATALOG_DATA.recommendedPath.slice(0, 2).map((rec, idx) => (
                                        <div key={rec.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                            < div className="font-medium text-sm mb-0.5">{rec.name}</div>
                                            < div className="text-xs opacity-90">{rec.reason}</div>
                                        </div >
                                    ))
                                }
                            </div >
                        </motion.div >
                    </div >

                    {/* 右侧 - 知识点树 */}
                    < div className="col-span-9">
                        < div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            < div className="space-y-4">
                                {
                                    course.chapters.map((chapter, chapterIdx) => {
                                        const isExpanded = expandedChapters.includes(chapter.id);
                                        const filteredPoints = filterKnowledgePoints(chapter.knowledgePoints);

                                        // 如果搜索后没有匹配的知识点，跳过这个章节
                                        if (filteredPoints.length === 0 && searchTerm) return null;

                                        return (
                                            <motion.div
                                                key={chapter.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: chapterIdx * 0.05 }}
                                            >
                                                {/* 章节标题 */}
                                                <button
                                                    onClick={() => toggleChapter(chapter.id)}
                                                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${chapter.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                                                            chapter.status === 'learning' ? 'bg-blue-50 border-blue-200' :
                                                                'bg-slate-50 border-slate-200'
                                                        } hover:shadow-md`}
                                                    disabled={chapter.status === 'locked'}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${chapter.status === 'completed' ? 'bg-emerald-500 text-white' :
                                                                chapter.status === 'learning' ? 'bg-blue-500 text-white' :
                                                                    'bg-slate-300 text-slate-500'
                                                            }`}>
                                                            {chapter.status === 'completed' ? <CheckCircle size={20} /> :
                                                                chapter.status === 'learning' ? <Play size={20} /> :
                                                                    <Lock size={20} />}
                                                        </div>
                                                        <div className="text-left">
                                                            <h3 className="font-bold text-slate-800">{chapter.name}</h3>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <span className="text-xs text-slate-500">
                                                                    {chapter.knowledgePoints.length} 个知识点
                                                                </span>
                                                                <div className="flex items-center gap-1">
                                                                    < div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                                        < div
                                                                            className={`h-full rounded-full ${chapter.status === 'completed' ? 'bg-emerald-500' :
                                                                                chapter.status === 'learning' ? 'bg-blue-500' :
                                                                                    'bg-slate-400'
                                                                                }`
                                                                            }
                                                                            style={{ width: `${chapter.progress}%` }}
                                                                        />
                                                                    </div >
                                                                    <span className="text-xs font-bold text-slate-600">{chapter.progress}%</span>
                                                                </div >
                                                            </div >
                                                        </div >
                                                    </div >
                                                    {
                                                        chapter.status !== 'locked' && (
                                                            <div>
                                                                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                                            </div>
                                                        )
                                                    }
                                                </button >

                                                {/* 知识点列表 */}
                                                < AnimatePresence >
                                                    {isExpanded && chapter.status !== 'locked' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="ml-6 mt-3 space-y-2"
                                                        >
                                                            {
                                                                filteredPoints.map((point, pointIdx) => {
                                                                    const style = getStatusStyle(point.status);
                                                                    const Icon = style.icon;

                                                                    return (
                                                                        <motion.div
                                                                            key={point.id}
                                                                            initial={{ opacity: 0, x: -20 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: pointIdx * 0.03 }}
                                                                            className={`${style.bg} border-2 ${style.border} rounded-xl p-4 hover:shadow-md transition-all`}
                                                                        >
                                                                            <div className="flex items-start justify-between">
                                                                                <div className="flex-1">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                        <Icon size={16} className={style.text} />
                                                                                        <h4 className="font-bold text-slate-800">{point.name}</h4>
                                                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${style.badge}`}>
                                                                                            {style.label}
                                                                                        </span>
                                                                                    </div >

                                                                                    {
                                                                                        point.status !== 'not-started' && (
                                                                                            <div className="grid grid-cols-4 gap-3 mb-3">
                                                                                                <div className="bg-white/50 rounded-lg p-2">
                                                                                                    <div className="text-xs text-slate-500">掌握度</div>
                                                                                                    <div className="text-sm font-bold text-slate-800">{point.masteryLevel}%</div>
                                                                                                </div>
                                                                                                <div className="bg-white/50 rounded-lg p-2">
                                                                                                    < div className="text-xs text-slate-500">学习时长</div>
                                                                                                    < div className="text-sm font-bold text-slate-800">{point.studyTime}分钟</div>
                                                                                                </div >
                                                                                                <div className="bg-white/50 rounded-lg p-2">
                                                                                                    < div className="text-xs text-slate-500">练习题</div>
                                                                                                    < div className="text-sm font-bold text-slate-800">
                                                                                                        {point.exercises.completed}/{point.exercises.total}
                                                                                                    </div >
                                                                                                </div >
                                                                                                <div className="bg-white/50 rounded-lg p-2">
                                                                                                    < div className="text-xs text-slate-500">正确率</div>
                                                                                                    < div className="text-sm font-bold text-slate-800">
                                                                                                        {
                                                                                                            point.exercises.completed > 0
                                                                                                                ? Math.round((point.exercises.correct / point.exercises.completed) * 100)
                                                                                                                : 0
                                                                                                        }%
                                                                                                    </div >
                                                                                                </div >
                                                                                            </div >
                                                                                        )
                                                                                    }

                                                                                    {
                                                                                        point.resources && (
                                                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                                                {
                                                                                                    point.resources.map((resource, rIdx) => (
                                                                                                        <span key={rIdx} className="px-2 py-1 bg-white/70 rounded-lg text-xs text-slate-600 border border-slate-200">
                                                                                                            {resource}
                                                                                                        </span >
                                                                                                    ))
                                                                                                }
                                                                                            </div >
                                                                                        )
                                                                                    }

                                                                                    {
                                                                                        point.lastStudy && (
                                                                                            <div className="text-xs text-slate-500">
                                                                                                最后学习: {point.lastStudy}
                                                                                            </div >
                                                                                        )
                                                                                    }
                                                                                </div >

                                                                                <button
                                                                                    onClick={() => startLearning(point)}
                                                                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 ${point.status === 'not-started'
                                                                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                                                                        : point.status === 'weak'
                                                                                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                                                                                            : point.status === 'learning'
                                                                                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                                                                                : 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                                                                                        }`}
                                                                                >
                                                                                    {point.status === 'not-started' ? '开始学习' :
                                                                                        point.status === 'weak' ? '重点突破' :
                                                                                            point.status === 'learning' ? '继续学习' :
                                                                                                '复习巩固'}
                                                                                </button>
                                                                            </div >
                                                                        </motion.div >
                                                                    );
                                                                })}
                                                        </motion.div >
                                                    )}
                                                </AnimatePresence >
                                            </motion.div >
                                        );
                                    })}
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default KnowledgeCatalogPage;

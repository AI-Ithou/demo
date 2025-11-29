import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    PieChart as PieChartIcon,
    TrendingUp,
    BookOpen,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    PlayCircle,
    FileText,
    Target,
    RefreshCw,
    Calendar,
    Filter,
    CheckCircle,
    Star,
    StarOff,
    Send,
    X
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import ERROR_QUESTIONS_DATA from '../data/error_questions_data';
import StorageUtils from '../utils/storage_utils';

const ErrorLogPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [data, setData] = useState(null);
    const [filters, setFilters] = useState({
        subject: location.state?.subject || 'all',
        difficulty: 'all',
        status: 'all',
        knowledgePoint: location.state?.knowledgePoint || null
    });
    const [retryMode, setRetryMode] = useState(null); // 正在重做的题目ID
    const [userAnswer, setUserAnswer] = useState('');
    const [showRetryResult, setShowRetryResult] = useState(null);

    // 初始化数据
    useEffect(() => {
        StorageUtils.initializeErrorQuestions(ERROR_QUESTIONS_DATA);
        loadData();
    }, []);

    // 当筛选条件变化时重新加载
    useEffect(() => {
        loadData();
    }, [filters]);

    const loadData = () => {
        const errorData = StorageUtils.getErrorQuestions();
        if (errorData) {
            setData(errorData);
        }
    };

    const toggleQuestion = (id) => {
        if (expandedQuestion === id) {
            setExpandedQuestion(null);
        } else {
            setExpandedQuestion(id);
            setRetryMode(null);
            setShowRetryResult(null);
        }
    };

    // 开始重做
    const startRetry = (questionId) => {
        setRetryMode(questionId);
        setUserAnswer('');
        setShowRetryResult(null);
    };

    // 提交重做答案
    const submitRetry = (questionId) => {
        const result = StorageUtils.addRetryRecord(questionId, userAnswer);
        if (result.success) {
            setShowRetryResult(result.isCorrect ? 'correct' : 'wrong');
            setTimeout(() => {
                setRetryMode(null);
                setUserAnswer('');
                loadData(); // 重新加载数据以更新状态
            }, 2000);
        }
    };

    // 标记状态
    const markStatus = (questionId, status) => {
        StorageUtils.updateQuestionStatus(questionId, status);
        loadData();
    };

    // 切换优先级
    const togglePriority = (questionId) => {
        StorageUtils.togglePriority(questionId);
        loadData();
    };

    // 获取筛选后的题目列表
    const getFilteredQuestions = () => {
        if (!data) return [];
        return StorageUtils.filterErrorQuestions(filters);
    };

    const filteredQuestions = getFilteredQuestions();

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-slate-400">加载中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-10">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
                                <BookOpen size={18} className="text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-800">AI 错题本</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                            <CheckCircle size={16} className="text-emerald-500" />
                            <span className="text-sm font-medium text-slate-700">
                                已掌握 {data.statistics.masteredCount}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-orange-600">
                                {data.statistics.totalErrors}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* 统计卡片 */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">总错题数</span>
                            <AlertCircle size={20} className="text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold text-slate-800">{data.statistics.totalErrors}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">未复习</span>
                            <BookOpen size={20} className="text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold text-blue-600">{data.statistics.notReviewedCount}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">复习中</span>
                            <RefreshCw size={20} className="text-amber-500" />
                        </div>
                        <div className="text-3xl font-bold text-amber-600">{data.statistics.reviewingCount}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">已掌握</span>
                            <CheckCircle size={20} className="text-emerald-500" />
                        </div>
                        <div className="text-3xl font-bold text-emerald-600">{data.statistics.masteredCount}</div>
                    </div>
                </section>

                {/* 筛选器 */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-blue-600" />
                        <h3 className="font-bold text-slate-800">筛选条件</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 科目筛选 */}
                        <div>
                            <label className="text-xs font-medium text-slate-500 mb-2 block">科目</label>
                            <select
                                value={filters.subject}
                                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">全部科目</option>
                                {Object.keys(data.statistics.bySubject).map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        {/* 难度筛选 */}
                        <div>
                            <label className="text-xs font-medium text-slate-500 mb-2 block">难度</label>
                            <select
                                value={filters.difficulty}
                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">全部难度</option>
                                <option value="简单">简单</option>
                                <option value="中等">中等</option>
                                <option value="困难">困难</option>
                            </select>
                        </div>

                        {/* 状态筛选 */}
                        <div>
                            <label className="text-xs font-medium text-slate-500 mb-2 block">状态</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">全部状态</option>
                                <option value="not_reviewed">未复习</option>
                                <option value="reviewing">复习中</option>
                                <option value="mastered">已掌握</option>
                            </select>
                        </div>
                    </div>
                    {filters.knowledgePoint && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-slate-600">知识点筛选:</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                {filters.knowledgePoint}
                            </span>
                            <button
                                onClick={() => setFilters({ ...filters, knowledgePoint: null })}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </section>

                {/* 1. 智能学习诊断 Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <PieChartIcon size={20} className="text-blue-600" />
                        智能学习诊断
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 错因分析 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="mb-4">
                                <h3 className="text-sm font-bold text-slate-500 mb-1">错因分析</h3>
                                <div className="text-2xl font-bold text-slate-800">概念不清</div>
                                <div className="text-xs text-red-500 font-medium mt-1">Last 30 Days ↑3%</div>
                            </div>
                            <div className="h-48 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.diagnosis.errorCauses}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.diagnosis.errorCauses.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2">
                                {data.diagnosis.errorCauses.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 知识点薄弱图谱 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-slate-500 mb-1">知识点薄弱图谱</h3>
                                <div className="text-2xl font-bold text-slate-800">常错知识点</div>
                                <div className="text-xs text-slate-400 mt-1">点击查看相关错题</div>
                            </div>
                            <div className="flex flex-wrap gap-2 content-start h-48 overflow-hidden">
                                {Object.entries(data.statistics.byKnowledgePoint)
                                    .sort((a, b) => b[1].count - a[1].count)
                                    .map(([name, stats], idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setFilters({ ...filters, knowledgePoint: name })}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105 ${idx === 0 ? 'bg-blue-100 text-blue-700 text-base px-4 py-2' :
                                                idx === 1 ? 'bg-slate-100 text-slate-600' :
                                                    'bg-slate-50 text-slate-500 text-xs'
                                                }`}
                                        >
                                            {name} ({stats.count})
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* 错误率趋势 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="mb-4">
                                <h3 className="text-sm font-bold text-slate-500 mb-1">错误率趋势</h3>
                                <div className="text-2xl font-bold text-slate-800">Avg 15%</div>
                                <div className="text-xs text-green-500 font-medium mt-1">Last 3 Months ↓-5%</div>
                            </div>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.diagnosis.trend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#3b82f6' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="rate"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ r: 0 }}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. AI 个性化推荐 Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Target size={20} className="text-purple-600" />
                        AI 个性化推荐
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 补救内容推荐 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">补救内容推荐</h3>
                            <div className="space-y-4">
                                {data.recommendations.remedialContent.map(item => (
                                    <div key={item.id} className="flex gap-3 group cursor-pointer">
                                        <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                {item.type === 'video' ? <PlayCircle size={20} className="text-white" /> : <FileText size={20} className="text-white" />}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{item.title}</div>
                                            <div className="text-xs text-slate-500 mt-1">{item.type === 'video' ? '视频精讲' : '讲义'}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 专项训练推荐 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">专项训练推荐</h3>
                            <div className="flex-1 bg-blue-50 rounded-xl p-5 mb-4">
                                <div className="text-blue-800 font-bold mb-2">{data.recommendations.specializedTraining.title}</div>
                                <div className="text-xs text-blue-600 space-y-1">
                                    <div>{data.recommendations.specializedTraining.questionCount} 道题 , 预计 {data.recommendations.specializedTraining.estimatedTime}</div>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-200">
                                开始练习
                            </button>
                        </div>

                        {/* 关联知识点补学路径 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">关联知识点补学路径</h3>
                            <div className="relative pl-4 space-y-6">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100" />

                                {data.recommendations.learningPath.map((step, idx) => (
                                    <div key={step.id} className="relative flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full z-10 ring-4 ring-white ${step.status === 'completed' ? 'bg-blue-600' :
                                            step.status === 'in-progress' ? 'bg-blue-400' : 'bg-slate-300'
                                            }`} />
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                                                step.status === 'in-progress' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                {idx + 1}
                                            </div>
                                            <span className={`text-sm ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                                                {step.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 我的错题 List Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-red-500" />
                        我的错题
                        <span className="text-sm font-normal text-slate-500">
                            (共 {filteredQuestions.length} 题)
                        </span>
                    </h2>

                    {filteredQuestions.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-800 mb-2">太棒了！</h3>
                            <p className="text-slate-500">当前筛选条件下没有错题</p>
                        </div>
                    ) : (
                        <>
                            {/* Filter / Header Row */}
                            <div className="bg-white rounded-t-2xl border-b border-slate-100 px-6 py-4 grid grid-cols-12 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-6 md:col-span-4">题目预览</div>
                                <div className="col-span-3 md:col-span-2 text-center">科目</div>
                                <div className="col-span-3 md:col-span-2 text-center">状态</div>
                                <div className="hidden md:block md:col-span-2 text-center">重做次数</div>
                                <div className="hidden md:block md:col-span-2 text-right">操作</div>
                            </div>

                            <div className="bg-white rounded-b-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                                {filteredQuestions.map(question => (
                                    <div key={question.id} className="group">
                                        {/* Question Summary Row */}
                                        <div
                                            onClick={() => toggleQuestion(question.id)}
                                            className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50 cursor-pointer transition-colors"
                                        >
                                            <div className="col-span-6 md:col-span-4 flex items-center gap-2">
                                                {question.isPriority && (
                                                    <Star size={16} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                                )}
                                                <span className="font-medium text-slate-800 truncate pr-4">
                                                    {question.title}
                                                </span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 text-center">
                                                <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                                                    {question.subject}
                                                </span>
                                            </div>
                                            <div className="col-span-3 md:col-span-2 text-center">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${question.status === 'mastered' ? 'bg-emerald-100 text-emerald-700' :
                                                    question.status === 'reviewing' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {question.status === 'mastered' ? '已掌握' :
                                                        question.status === 'reviewing' ? '复习中' : '未复习'}
                                                </span>
                                            </div>
                                            <div className="hidden md:block md:col-span-2 text-center text-sm text-slate-600">
                                                {question.retryCount} 次
                                            </div>
                                            <div className="hidden md:flex md:col-span-2 justify-end items-center gap-2 text-blue-600 font-medium text-sm">
                                                {expandedQuestion === question.id ? '收起' : '展开'}
                                                {expandedQuestion === question.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>

                                        {/* Expanded Detail View */}
                                        {expandedQuestion === question.id && (
                                            <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    {/* Left: Question & Answer */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="text-xs font-bold text-slate-500 mb-1 uppercase">题目内容</div>
                                                            <div className="text-sm text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                                                                {question.content}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <div className="text-xs font-bold text-slate-500 mb-1 uppercase">我的答案</div>
                                                                <div className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                                                                    {question.myAnswer}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs font-bold text-slate-500 mb-1 uppercase">正确答案</div>
                                                                <div className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded-lg border border-green-100">
                                                                    {question.correctAnswer}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* 重做区域 */}
                                                        {retryMode === question.id ? (
                                                            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                                                                <div className="text-sm font-bold text-blue-800 mb-2">输入你的答案：</div>
                                                                <div className="flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={userAnswer}
                                                                        onChange={(e) => setUserAnswer(e.target.value)}
                                                                        className="flex-1 px-3 py-2 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        placeholder="输入答案..."
                                                                        autoFocus
                                                                        onKeyPress={(e) => e.key === 'Enter' && submitRetry(question.id)}
                                                                    />
                                                                    <button
                                                                        onClick={() => submitRetry(question.id)}
                                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                                    >
                                                                        <Send size={16} />
                                                                        提交
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setRetryMode(null)}
                                                                        className="px-3 py-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                                {showRetryResult && (
                                                                    <div className={`mt-3 p-3 rounded-lg ${showRetryResult === 'correct' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                                        }`}>
                                                                        {showRetryResult === 'correct' ? '✅ 回答正确！继续保持！' : '❌ 回答错误，再试试看'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => startRetry(question.id)}
                                                                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                                                >
                                                                    <RefreshCw size={16} />
                                                                    重做此题
                                                                </button>
                                                                <button
                                                                    onClick={() => togglePriority(question.id)}
                                                                    className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${question.isPriority
                                                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                                                >
                                                                    {question.isPriority ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Right: Analysis & Tags */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="text-xs font-bold text-slate-500 mb-1 uppercase">AI 解析</div>
                                                            <div className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                                                {question.analysis}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-bold text-slate-500 mb-2 uppercase">知识标签</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {question.tags.map((tag, i) => (
                                                                    <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                                <span className="px-2 py-1 bg-orange-50 border border-orange-100 rounded-md text-xs text-orange-600 font-medium">
                                                                    {question.errorType}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* 状态标记按钮 */}
                                                        {question.status !== 'mastered' && (
                                                            <div className="pt-4 border-t border-slate-200">
                                                                <div className="text-xs font-bold text-slate-500 mb-2 uppercase">标记状态</div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <button
                                                                        onClick={() => markStatus(question.id, 'reviewing')}
                                                                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${question.status === 'reviewing'
                                                                            ? 'bg-amber-600 text-white'
                                                                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                                            }`}
                                                                    >
                                                                        标记为复习中
                                                                    </button>
                                                                    <button
                                                                        onClick={() => markStatus(question.id, 'mastered')}
                                                                        className="py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
                                                                    >
                                                                        标记为已掌握
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* 重做历史 */}
                                                        {question.retryHistory.length > 0 && (
                                                            <div className="pt-4 border-t border-slate-200">
                                                                <div className="text-xs font-bold text-slate-500 mb-2 uppercase">重做历史</div>
                                                                <div className="space-y-2">
                                                                    {question.retryHistory.map((record, idx) => (
                                                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                                                            {record.isCorrect ? (
                                                                                <CheckCircle size={14} className="text-emerald-500" />
                                                                            ) : (
                                                                                <X size={14} className="text-rose-500" />
                                                                            )}
                                                                            <span className="text-slate-600">
                                                                                {new Date(record.date).toLocaleDateString()} - {record.answer}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>

                {/* 4. 开启复盘模式 Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <RefreshCw size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">随机复盘</h3>
                                <p className="text-xs text-slate-500">弱点优先</p>
                            </div>
                        </div>
                        <ArrowLeft size={20} className="rotate-180 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">考前专项复盘</h3>
                                <p className="text-xs text-slate-500">集中练习</p>
                            </div>
                        </div>
                        <ArrowLeft size={20} className="rotate-180 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ErrorLogPage;

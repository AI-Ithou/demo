import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, TrendingUp, BookOpen, PlayCircle, FileText, ChevronRight, Star, Zap, ArrowLeft } from 'lucide-react';
import { Progress } from 'antd';

const AssessmentReportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { difficulty, userType, scrollTo } = location.state || { difficulty: 'medium', userType: 'logical' };

    React.useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [scrollTo]);

    // --- Data & State for Timeline ---
    const getPathContent = () => {
        const base = [
            { id: 1, title: '基础概念：极限与连续', type: 'video', status: 'completed', score: 95 },
            { id: 2, title: '单元测试：极限运算', type: 'quiz', status: 'completed', score: 88 },
        ];
        if (userType === 'visual') {
            return [
                ...base,
                { id: 3, title: '可视化演示：导数的几何意义', type: 'video', status: 'current', description: '通过动态图形直观理解导数。' },
                { id: 4, title: '实战演练：求导法则', type: 'practice', status: 'locked' },
                { id: 5, title: '进阶视频：微分应用', type: 'video', status: 'locked' }
            ];
        } else if (userType === 'academic') {
            return [
                ...base,
                { id: 3, title: '真题解析：导数大题', type: 'practice', status: 'current', description: '历年考研真题精选解析。' },
                { id: 4, title: '深度阅读：微分中值定理', type: 'reading', status: 'locked' },
                { id: 5, title: '模拟考试：一元微分学', type: 'quiz', status: 'locked' }
            ];
        } else {
            return [
                ...base,
                { id: 3, title: '逻辑推导：导数定义', type: 'reading', status: 'current', description: '从底层逻辑推导导数公式。' },
                { id: 4, title: '思维导图：微分体系', type: 'video', status: 'locked' },
                { id: 5, title: '综合应用：最值问题', type: 'practice', status: 'locked' }
            ];
        }
    };
    const steps = getPathContent();
    const [selectedStep, setSelectedStep] = useState(steps.find(s => s.status === 'current'));

    // --- Data & State for Matrix ---
    const knowledgePoints = [
        { id: 1, name: '极限定义', category: '基础', mastery: 95, status: 'mastered' },
        { id: 2, name: '无穷小比阶', category: '基础', mastery: 88, status: 'mastered' },
        { id: 3, name: '夹逼定理', category: '技巧', mastery: 72, status: 'average' },
        { id: 4, name: '泰勒公式', category: '核心', mastery: 45, status: 'weak' },
        { id: 5, name: '洛必达法则', category: '核心', mastery: 60, status: 'average' },
        { id: 6, name: '曲率计算', category: '应用', mastery: 30, status: 'weak' },
        { id: 7, name: '渐近线', category: '应用', mastery: 85, status: 'mastered' },
        { id: 8, name: '导数定义', category: '基础', mastery: 92, status: 'mastered' },
        { id: 9, name: '隐函数求导', category: '技巧', mastery: 55, status: 'average' },
    ];
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const getStatusColor = (status) => {
        if (status === 'mastered') return 'bg-emerald-500 shadow-emerald-200';
        if (status === 'weak') return 'bg-rose-500 shadow-rose-200';
        return 'bg-amber-500 shadow-amber-200';
    };

    // --- Data for Charts ---
    const scoreTrendData = [
        { name: '测验1', score: 65 },
        { name: '测验2', score: 72 },
        { name: '期中', score: 78 },
        { name: '测验3', score: 85 },
        { name: '期末', score: 92 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> 返回仪表盘
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">全维学习评估报告</h1>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100">
                            {difficulty === 'hard' ? '困难模式' : difficulty === 'simple' ? '简单模式' : '中等模式'}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium border border-purple-100">
                            {userType === 'visual' ? '视觉型' : userType === 'academic' ? '实战型' : '逻辑型'}
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

                {/* Section 1: Overview (Original Report Top) */}
                <section id="overview">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mb-8">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">我的当前学习目标：掌握微积分核心概念</h1>
                            <p className="text-slate-500">持续进步，你已经超越了 85% 的同学</p>
                        </div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-indigo-600">75%</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider">已完成</div>
                            </div>
                            <div className="w-24 h-24">
                                <Progress type="circle" percent={75} width={96} strokeColor="#4f46e5" trailColor="#e0e7ff" showInfo={false} strokeWidth={8} />
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-indigo-50 to-transparent opacity-50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-64 flex flex-col justify-between">
                            <div>
                                <div className="text-sm text-slate-500 mb-1">习题正确率趋势</div>
                                <div className="text-3xl font-bold text-slate-800">88% <span className="text-sm text-emerald-500 font-medium">↑ 5.2%</span></div>
                            </div>
                            <div className="h-32 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={scoreTrendData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-64">
                            <div className="text-sm text-slate-500 mb-4">历史评测分数曲线</div>
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart data={scoreTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Section 2: Learning Path (Timeline) */}
                <section id="path">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                        <TrendingUp className="mr-3 text-indigo-600" /> 专属学习路径
                    </h2>
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex gap-8 min-h-[400px]">
                        {/* Timeline */}
                        <div className="w-1/2 border-r border-slate-100 pr-8">
                            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8 cursor-pointer group"
                                        onClick={() => setSelectedStep(step)}
                                    >
                                        <div className={`
                                            absolute -left-[9px] top-1 w-5 h-5 rounded-full border-4 transition-all duration-300
                                            ${step.status === 'completed' ? 'bg-emerald-500 border-emerald-100' :
                                                step.status === 'current' ? 'bg-indigo-500 border-indigo-100 scale-125 shadow-lg shadow-indigo-200' :
                                                    'bg-slate-300 border-slate-100'}
                                        `}>
                                            {step.status === 'completed' && <CheckCircle size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                        </div>
                                        <div className={`
                                            p-4 rounded-xl border transition-all duration-300
                                            ${selectedStep?.id === step.id ? 'bg-indigo-50 border-indigo-200 shadow-md' :
                                                'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50'}
                                        `}>
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase">{step.type}</span>
                                                {step.score && <span className="text-emerald-600 font-bold text-xs">{step.score}分</span>}
                                            </div>
                                            <h3 className={`font-bold ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {/* Detail */}
                        <div className="w-1/2 pl-4">
                            <AnimatePresence mode="wait">
                                {selectedStep ? (
                                    <motion.div
                                        key={selectedStep.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="h-full flex flex-col justify-center"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                                            {selectedStep.type === 'video' ? <PlayCircle size={32} /> :
                                                selectedStep.type === 'quiz' ? <Star size={32} /> :
                                                    <BookOpen size={32} />}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedStep.title}</h3>
                                        <p className="text-slate-600 leading-relaxed mb-8">
                                            {selectedStep.description || '完成此节点以解锁下一阶段的学习内容。系统将根据你的表现动态调整后续路径。'}
                                        </p>
                                        {selectedStep.status === 'current' ? (
                                            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all">
                                                开始学习
                                            </button>
                                        ) : selectedStep.status === 'locked' ? (
                                            <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold cursor-not-allowed">
                                                暂未解锁
                                            </button>
                                        ) : (
                                            <button className="w-full py-4 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-100 transition-colors">
                                                再次复习
                                            </button>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        点击左侧节点查看详情
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Section 3: Knowledge Matrix (Heatmap) */}
                <section id="matrix">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                        <Zap className="mr-3 text-amber-500" /> 知识掌握矩阵
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="grid grid-cols-3 gap-4">
                                {knowledgePoints.map((point) => (
                                    <motion.div
                                        key={point.id}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onHoverStart={() => setHoveredPoint(point)}
                                        className={`
                                            aspect-square rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-shadow hover:shadow-xl
                                            ${point.status === 'weak' ? 'bg-rose-50 border border-rose-100' :
                                                point.status === 'mastered' ? 'bg-emerald-50 border border-emerald-100' :
                                                    'bg-amber-50 border border-amber-100'}
                                        `}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-bold opacity-60 uppercase">{point.category}</span>
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(point.status)}`}></div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-slate-800 mb-1">{point.name}</h3>
                                            <div className="text-2xl font-black opacity-80">{point.mastery}%</div>
                                        </div>
                                        <Progress
                                            percent={point.mastery}
                                            showInfo={false}
                                            size="small"
                                            strokeColor={point.status === 'weak' ? '#f43f5e' : point.status === 'mastered' ? '#10b981' : '#f59e0b'}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center min-h-[300px]">
                            {hoveredPoint ? (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-slate-800">{hoveredPoint.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${hoveredPoint.status === 'weak' ? 'bg-rose-100 text-rose-600' :
                                            hoveredPoint.status === 'mastered' ? 'bg-emerald-100 text-emerald-600' :
                                                'bg-amber-100 text-amber-600'
                                            }`}>
                                            {hoveredPoint.status === 'weak' ? '需重点关注' : hoveredPoint.status === 'mastered' ? '掌握良好' : '巩固提升'}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                        该知识点属于{hoveredPoint.category}范畴。掌握程度为 {hoveredPoint.mastery}%，
                                        {hoveredPoint.status === 'weak' ? '建议立即进行针对性训练，以避免影响后续学习。' : '保持当前状态即可。'}
                                    </p>
                                    {hoveredPoint.status === 'weak' && (
                                        <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-200 transition-all">
                                            <Zap size={18} /> 立即特训
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-slate-400">
                                    <Zap size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>将鼠标悬停在左侧矩阵上<br />查看详细分析与建议</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AssessmentReportPage;

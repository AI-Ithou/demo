import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { Progress } from 'antd';

const KnowledgeProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { difficulty, userType } = location.state || { difficulty: 'medium', userType: 'logical' };

    // Mock Knowledge Data
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

    const [filter, setFilter] = useState('all'); // all, weak, mastered
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const filteredPoints = knowledgePoints.filter(p => {
        if (filter === 'weak') return p.status === 'weak';
        if (filter === 'mastered') return p.status === 'mastered';
        return true;
    });

    const getStatusColor = (status) => {
        if (status === 'mastered') return 'bg-emerald-500 shadow-emerald-200';
        if (status === 'weak') return 'bg-rose-500 shadow-rose-200';
        return 'bg-amber-500 shadow-amber-200';
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> 返回仪表盘
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">知识掌握矩阵</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            全部
                        </button>
                        <button
                            onClick={() => setFilter('weak')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'weak' ? 'bg-rose-500 text-white' : 'bg-white text-slate-600 hover:bg-rose-50'}`}
                        >
                            薄弱项
                        </button>
                        <button
                            onClick={() => setFilter('mastered')}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'mastered' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 hover:bg-emerald-50'}`}
                        >
                            已掌握
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Matrix Grid */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                            <TrendingUp className="mr-2 text-blue-600" /> 能力热力图
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {filteredPoints.map((point) => (
                                <motion.div
                                    key={point.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    onHoverStart={() => setHoveredPoint(point)}
                                    // onHoverEnd={() => setHoveredPoint(null)}
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

                    {/* Sidebar / Detail View */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-lg font-bold mb-4 relative z-10">AI 诊断摘要</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
                                基于你的{difficulty === 'hard' ? '困难模式' : '常规'}评估，我们在“{knowledgePoints.find(p => p.status === 'weak')?.name || '基础'}”模块发现了潜在的提升空间。建议优先攻克薄弱项。
                            </p>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-emerald-400">{knowledgePoints.filter(p => p.status === 'mastered').length}</div>
                                    <div className="text-xs text-slate-500">已掌握</div>
                                </div>
                                <div className="w-px h-8 bg-slate-700"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-rose-400">{knowledgePoints.filter(p => p.status === 'weak').length}</div>
                                    <div className="text-xs text-slate-500">待攻克</div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Detail Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[200px]">
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
                                    <p className="text-slate-500 text-sm mb-6">
                                        该知识点属于{hoveredPoint.category}范畴。掌握程度为 {hoveredPoint.mastery}%，
                                        {hoveredPoint.status === 'weak' ? '建议立即进行针对性训练。' : '保持当前状态即可。'}
                                    </p>
                                    {hoveredPoint.status === 'weak' && (
                                        <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-200 transition-all">
                                            <Zap size={18} /> 立即特训
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                    <TrendingUp size={48} className="mb-4 opacity-20" />
                                    <p>将鼠标悬停在左侧矩阵上<br />查看详细分析</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default KnowledgeProfilePage;

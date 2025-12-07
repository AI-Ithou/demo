import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle, CheckCircle, Lock, BookOpen, Star } from 'lucide-react';

const LearningPathPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { difficulty, userType } = location.state || { difficulty: 'medium', userType: 'logical' };

    // Dynamic content based on user type
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
            // Logical
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

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> 返回仪表盘
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">个性化学习地图</h1>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                            {difficulty === 'hard' ? '困难模式' : difficulty === 'simple' ? '简单模式' : '中等模式'}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium border border-purple-100">
                            {userType === 'visual' ? '视觉型' : userType === 'academic' ? '实战型' : '逻辑型'}
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12 flex gap-8">
                {/* Timeline Section */}
                <div className="w-1/2">
                    <div className="relative border-l-2 border-slate-200 ml-6 space-y-12 pb-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 cursor-pointer group"
                                onClick={() => setSelectedStep(step)}
                            >
                                {/* Node Indicator */}
                                <div className={`
                                    absolute -left-[9px] top-1 w-5 h-5 rounded-full border-4 transition-all duration-300
                                    ${step.status === 'completed' ? 'bg-emerald-500 border-emerald-100' :
                                        step.status === 'current' ? 'bg-blue-500 border-blue-100 scale-125 shadow-lg shadow-blue-200 ring-2 ring-blue-500 ring-offset-2' :
                                            'bg-slate-300 border-slate-100'}
                                `}>
                                    {step.status === 'completed' && <CheckCircle size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                </div>

                                {/* Content Card */}
                                <div className={`
                                    p-5 rounded-xl border transition-all duration-300
                                    ${selectedStep?.id === step.id ? 'bg-white border-blue-500 shadow-xl shadow-blue-100/50 scale-105' :
                                        'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}
                                `}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider
                                            ${step.type === 'video' ? 'bg-indigo-50 text-indigo-600' :
                                                step.type === 'quiz' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-emerald-50 text-emerald-600'}
                                        `}>
                                            {step.type.toUpperCase()}
                                        </span>
                                        {step.score && <span className="text-emerald-600 font-bold text-sm">{step.score}分</span>}
                                    </div>
                                    <h3 className={`font-bold text-lg mb-1 ${step.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>
                                        {step.title}
                                    </h3>
                                    {step.status === 'current' && (
                                        <p className="text-sm text-blue-600 font-medium mt-2 flex items-center animate-pulse">
                                            <PlayCircle size={16} className="mr-1" /> 正在进行中
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="w-1/2 sticky top-24 h-fit">
                    <AnimatePresence mode="wait">
                        {selectedStep ? (
                            <motion.div
                                key={selectedStep.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-8"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                    {selectedStep.type === 'video' ? <PlayCircle size={32} className="text-white" /> :
                                        selectedStep.type === 'quiz' ? <Star size={32} className="text-white" /> :
                                            <BookOpen size={32} className="text-white" />}
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedStep.title}</h2>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {selectedStep.description || '完成此节点以解锁下一阶段的学习内容。系统将根据你的表现动态调整后续路径。'}
                                </p>

                                {selectedStep.status === 'current' ? (
                                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95">
                                        开始学习
                                    </button>
                                ) : selectedStep.status === 'locked' ? (
                                    <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold text-lg flex items-center justify-center gap-2 cursor-not-allowed">
                                        <Lock size={20} /> 暂未解锁
                                    </button>
                                ) : (
                                    <button className="w-full py-4 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl font-bold text-lg hover:bg-emerald-100 transition-colors">
                                        再次复习
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-slate-400">
                                选择左侧节点查看详情
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default LearningPathPage;

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Brain, Activity, BookOpen, Smile, FileText } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const steps = [
        { path: '/goal-selection', icon: Target, label: '目标设定' },
        { path: '/ability-assessment', icon: Brain, label: '能力评估' },
        { path: '/ability-radar', icon: Activity, label: '能力画像' },
        { path: '/knowledge-nebula', icon: BookOpen, label: '知识星云' },
        { path: '/knowledge-list', icon: FileText, label: '掌握清单' },
        { path: '/attitude-assessment', icon: Smile, label: '态度评估' },
        { path: '/summary-report', icon: LayoutDashboard, label: '综合报告' },
    ];

    const currentStepIndex = steps.findIndex(step => location.pathname === step.path);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
            {/* Top Navigation / Progress Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-6 justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
                        <Brain className="text-white w-5 h-5" />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight text-slate-800">
                        数字老师 · 智能摸底系统
                    </h1>
                </div>

                {/* Progress Steps */}
                <div className="hidden md:flex items-center gap-1">
                    {steps.map((step, index) => {
                        const isActive = index === currentStepIndex;
                        const isCompleted = index < currentStepIndex;
                        const Icon = step.icon;

                        return (
                            <div key={step.path} className="flex items-center">
                                <div
                                    className={`
                    relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' :
                                            isCompleted ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}
                  `}
                                >
                                    <Icon size={14} />
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-step-ring"
                                            className="absolute inset-0 rounded-full border-2 border-indigo-200"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-4 h-0.5 mx-1 rounded-full ${isCompleted ? 'bg-indigo-200' : 'bg-slate-200'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="text-sm text-slate-500 font-medium">
                    {currentStepIndex !== -1 ? `步骤 ${currentStepIndex + 1} / ${steps.length}` : '准备就绪'}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-20 pb-6 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex-1 flex flex-col"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Layout;

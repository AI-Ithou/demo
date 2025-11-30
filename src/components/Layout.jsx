import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Brain, Activity, BookOpen, Smile, FileText } from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

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

    // 监听滚动，动态调整导航栏阴影
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen text-slate-900 font-sans selection:bg-blue-100">
            {/* 液态玻璃导航栏 */}
            <header className={`
                fixed top-0 left-0 right-0 z-50 
                bg-white/75 backdrop-blur-2xl 
                border-b border-gray-200/30
                h-16 flex items-center px-6 justify-between 
                transition-all duration-300 ease-apple
                glass-highlight
                ${ scrolled ? 'shadow-glass-hover' : 'shadow-glass'}
            `}>
                {/* Logo 区域 */}
                <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow-blue">
                        <Brain className="text-white w-5 h-5" />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight text-gray-800">
                        数字老师 · 智能摘底系统
                    </h1>
                </motion.div>

                {/* 液态进度指示器 */}
                <div className="hidden md:flex items-center gap-2">
                    {steps.map((step, index) => {
                        const isActive = index === currentStepIndex;
                        const isCompleted = index < currentStepIndex;
                        const Icon = step.icon;

                        return (
                            <div key={step.path} className="flex items-center">
                                <motion.div
                                    className={`
                                        relative flex items-center justify-center w-10 h-10 rounded-full 
                                        transition-all duration-300 ease-apple
                                        ${ isActive 
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-glow-blue scale-110' 
                                            : isCompleted 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'bg-gray-100 text-gray-400'
                                        }
                                    `}
                                    whileHover={!isActive ? { scale: 1.05 } : {}}
                                >
                                    <Icon size={16} />
                                    
                                    {/* 当前步骤的脉冲动画 */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-blue-300"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0, 0.5],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}
                                </motion.div>
                                
                                {/* 连接线 */}
                                {index < steps.length - 1 && (
                                    <div className="relative w-6 h-1 mx-1">
                                        {/* 背景线 */}
                                        <div className="absolute inset-0 bg-gray-200 rounded-full" />
                                        {/* 进度线 */}
                                        {isCompleted && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                                                style={{ transformOrigin: 'left' }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 步骤指示 */}
                <div className="text-sm text-gray-500 font-medium tabular-nums">
                    {currentStepIndex !== -1 ? `步骤 ${currentStepIndex + 1} / ${steps.length}` : '准备就绪'}
                </div>
            </header>

            {/* 主内容区域 */}
            <main className="pt-20 pb-6 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    className="flex-1 flex flex-col"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Layout;

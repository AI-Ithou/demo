import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Lightbulb, Download, Share2, ArrowLeft } from 'lucide-react';
import StorageUtils from '../utils/storage_utils';

/**
 * 学习报告布局组件 - 统一的导航和深色主题
 */
const LearningReportLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 从缓存获取学生信息
    const data = StorageUtils.getLearningData();
    const { studentInfo } = data;

    const navItems = [
        { path: '/learning-report/overview', label: '统计报告', icon: BarChart3 },
        { path: '/learning-report/details', label: '报告详情', icon: FileText },
        { path: '/learning-report/recommendations', label: '学习建议', icon: Lightbulb }
    ];

    const handleExport = () => {
        StorageUtils.exportData();
    };

    const handleShare = () => {
        // 分享功能 - 可以复制链接或生成分享图片
        alert('分享功能开发中...');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 背景渐变 - 浅色 */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 opacity-50" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent" />

            {/* 顶部导航栏 */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* 左侧:返回按钮和学生信息 */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all border border-slate-300"
                            >
                                <ArrowLeft size={18} />
                                返回
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="text-4xl">{studentInfo.avatar}</div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                        {studentInfo.name}的学习报告
                                    </h1>
                                    <p className="text-sm text-slate-600">
                                        {studentInfo.grade} · {studentInfo.subject} · {studentInfo.currentTopic}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 右侧:操作按钮 */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-300"
                            >
                                <Share2 size={18} />
                                分享
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/30"
                            >
                                <Download size={18} />
                                导出PDF
                            </button>
                        </div>
                    </div>

                    {/* 导航标签 */}
                    <div className="flex gap-2 mt-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    {item.label}

                                    {/* 活动指示器 */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* 主内容区域 */}
            <main className="relative z-10">
                <Outlet />
            </main>
        </div>
    );
};

export default LearningReportLayout;

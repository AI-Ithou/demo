import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, BookOpen, Clock, TrendingUp,
    FileText, Sparkles, Plus, ChevronRight, Calendar
} from 'lucide-react';
import { GlassCard, GradientButton, LiquidProgress } from '../components/uiverse';

const TeacherDashboard = () => {
    const navigate = useNavigate();

    // 模拟课程数据
    const courses = [
        {
            id: 1,
            title: '生活色彩美学',
            category: '艺术设计',
            students: 156,
            coverImage: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=800&auto=format&fit=crop',
            progress: 68,
            homeworks: 12,
            pendingReview: 23
        },
        {
            id: 2,
            title: '现代平面设计',
            category: '艺术设计',
            students: 132,
            coverImage: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&auto=format&fit=crop',
            progress: 45,
            homeworks: 8,
            pendingReview: 15
        },
        {
            id: 3,
            title: '数字媒体艺术',
            category: '数字艺术',
            students: 98,
            coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
            progress: 82,
            homeworks: 10,
            pendingReview: 5
        }
    ];

    // 统计数据
    const stats = [
        { label: '课程总数', value: '3', icon: BookOpen, color: 'blue' },
        { label: '学生总数', value: '386', icon: Users, color: 'green' },
        { label: '待批改', value: '43', icon: Clock, color: 'orange' },
        { label: '本周作业', value: '8', icon: Calendar, color: 'purple' }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'from-blue-600 to-cyan-600',
            green: 'from-emerald-600 to-teal-600',
            orange: 'from-orange-600 to-amber-600',
            purple: 'from-purple-600 to-pink-600'
        };
        return colors[color];
    };

    return (
        <div className="min-h-screen">
            {/* 液态玻璃头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass glass-highlight sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-800">教师工作台</h1>
                            <p className="text-gray-600 mt-1">管理您的课程和学生</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
                                    alt="教师头像"
                                    className="w-14 h-14 rounded-full border-3 border-white shadow-glow-blue"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">高田由</div>
                                <div className="text-sm text-gray-500">教师</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 液态玻璃统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        const colorMap = {
                            blue: { gradient: 'from-blue-500 to-blue-600', glow: 'shadow-glow-blue' },
                            green: { gradient: 'from-green-500 to-green-600', glow: 'shadow-glow-green' },
                            orange: { gradient: 'from-orange-500 to-orange-600', glow: 'shadow-glow-orange' },
                            purple: { gradient: 'from-purple-500 to-purple-600', glow: 'shadow-glow-purple' }
                        };
                        const colors = colorMap[stat.color];

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                            >
                                <GlassCard
                                    variant="standard"
                                    hover={true}
                                    className="p-6 h-full"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <motion.div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center ${colors.glow} shimmer-effect`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <Icon className="text-white" size={28} />
                                        </motion.div>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2 font-medium">{stat.label}</div>
                                    <div className="text-4xl font-bold text-gray-800 tabular-nums">{stat.value}</div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 课程区域 */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <motion.h2
                            className="text-2xl font-bold text-gray-800"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            我的课程
                        </motion.h2>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/teacher/course/create')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <Plus size={20} />
                            创建新课程
                        </motion.button>
                    </div>

                    {/* 液态玻璃课程卡片网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                            >
                                <GlassCard
                                    onClick={() => navigate('/teacher/course')}
                                    variant="standard"
                                    hover={true}
                                    gradient={true}
                                    className="overflow-hidden group cursor-pointer h-full"
                                >
                                    {/* 封面图片 */}
                                    <div className="relative h-48 -m-6 mb-0 overflow-hidden">
                                        <motion.img
                                            src={course.coverImage}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        {/* 渐变蒙版 */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        {/* 类型标签 */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-700 rounded-xl text-xs font-semibold shadow-lg">
                                                {course.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 内容区域 */}
                                    <div className="p-6 space-y-4">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                            {course.title}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={16} className="text-blue-500" />
                                                <span className="font-medium">{course.students}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={16} className="text-green-500" />
                                                <span className="font-medium">{course.homeworks}</span>
                                            </div>
                                        </div>

                                        {/* 液态进度条 */}
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                <span className="font-medium">课程进度</span>
                                                <span className="font-bold text-gray-800 tabular-nums">{course.progress}%</span>
                                            </div>
                                            <LiquidProgress
                                                value={course.progress}
                                                variant="blue"
                                                shimmer={true}
                                            />
                                        </div>

                                        {/* 待批改标识 */}
                                        {course.pendingReview > 0 && (
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                                                <span className="text-sm text-gray-600 font-medium">待批改作业</span>
                                                <motion.span
                                                    className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded-lg text-sm font-bold"
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    {course.pendingReview}
                                                </motion.span>
                                            </div>
                                        )}

                                        {/* 操作按钮 */}
                                        <motion.button
                                            className="w-full py-3 bg-gray-50/50 text-gray-700 rounded-xl font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            进入课程
                                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main >
        </div >
    );
};

export default TeacherDashboard;

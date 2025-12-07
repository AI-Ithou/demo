import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Progress } from 'antd';
import { UserOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { GlassCard, GradientButton, LiquidProgress, CircularProgress } from '../components/uiverse';
import { BookOpen, Bot, Sparkles } from 'lucide-react';

const StudentHome = () => {
    const navigate = useNavigate();

    // Mock Data
    const courses = [
        {
            id: 1,
            title: '三维建模基础',
            instructor: '许葵',
            status: 'pending', // pending, in-progress, completed
            progress: 0,
            isAssessed: false, // Not assessed yet -> Go to Assessment
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            color: 'from-orange-500 to-orange-600',
        },
        {
            id: 2,
            title: '高等数学（上）',
            instructor: '雷田礼',
            status: 'pending',
            progress: 0,
            isAssessed: true, // Assessed -> Go to Dashboard
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: 3,
            title: '计算机网络',
            instructor: '张三',
            status: 'in-progress',
            progress: 45,
            isAssessed: true,
            image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop',
            color: 'from-purple-500 to-purple-600',
        }
    ];

    const handleCourseClick = (course) => {
        if (!course.isAssessed) {
            navigate('/goal-setting');
        } else {
            navigate('/dashboard');
        }
    };

    const items = [
        {
            key: '1',
            label: '个人中心',
        },
        {
            key: '2',
            label: '退出登录',
        },
    ];

    return (
        <div className="min-h-screen font-sans bg-gray-50">
            {/* 液态玻璃导航栏 */}
            <div className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass glass-highlight sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow-blue">
                                <BookOpen className="text-white w-5 h-5" />
                            </div>
                            <span className="font-bold text-lg text-gray-900">炎枢平台</span>
                        </motion.div>

                        {/* 右侧操作 */}
                        <div className="flex items-center gap-4">
                            <GradientButton
                                onClick={() => navigate('/teacher')}
                                variant="primary"
                                size="medium"
                                className="gap-2"
                            >
                                <BookOpen className="w-4 h-4" />
                                教师端
                            </GradientButton>
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Avatar
                                        size={40}
                                        icon={<UserOutlined />}
                                        className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 cursor-pointer border-2 border-white shadow-md"
                                    />
                                </motion.div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* 极简欢迎区域 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        你好, 张同学 <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-gray-500 text-lg">今天也是充满可能的一天，准备好开始学习了吗？</p>
                </motion.div>

                {/* 课程网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleCourseClick(course)}
                            className="group cursor-pointer"
                        >
                            <GlassCard
                                variant="hover"
                                className="h-full overflow-hidden relative"
                            >
                                {/* 课程封面 */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* 状态标签 */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                            {course.status === 'pending' ? '未开始' : '进行中'}
                                        </div>
                                    </div>
                                </div>

                                {/* 课程信息 */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-sm text-gray-500">讲师：{course.instructor}</span>
                                        <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
                                    </div>

                                    {/* 进度条 */}
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${course.color}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>上次学习：2天前</span>
                                        <RightOutlined className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}

                    {/* AI 助教卡片 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => navigate('/student/agents')}
                        className="group cursor-pointer"
                    >
                        <GlassCard
                            variant="hover"
                            className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-gray-200 hover:border-blue-300 bg-gray-50/50"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-glow-purple group-hover:scale-110 transition-transform">
                                <Bot className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">AI 学习助手</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                遇到难题？随时呼叫你的专属 AI 助教，获取即时解答和个性化指导。
                            </p>
                            <span className="text-indigo-600 font-bold text-sm group-hover:underline">
                                浏览助教列表 &rarr;
                            </span>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;

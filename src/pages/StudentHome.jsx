import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Progress } from 'antd';
import { UserOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { GlassCard, GradientButton, LiquidProgress, CircularProgress } from '../components/uiverse';
import { BookOpen } from 'lucide-react';

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
            navigate('/report');
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
        <div className="min-h-screen font-sans">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 液态玻璃 Hero 横幅 */}
                <motion.div 
                    className="relative rounded-3xl p-10 text-white shadow-glass-deep mb-10 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 背景装饰 */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }} />
                    </div>

                    {/* 内容 */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex-1">
                            <motion.h1 
                                className="text-4xl font-bold mb-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                三维建模基础
                            </motion.h1>
                            <motion.p 
                                className="text-orange-100 mb-2 text-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                讲师：许葵
                            </motion.p>
                            <motion.p 
                                className="text-sm text-orange-100 mb-8 flex items-center gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
                                上次学习：待开始学习
                            </motion.p>
                            
                            <motion.div 
                                className="flex gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <GradientButton
                                    onClick={() => navigate('/goal-setting')}
                                    variant="secondary"
                                    size="large"
                                    className="bg-white/90 backdrop-blur-md text-orange-600 hover:bg-white border-0"
                                >
                                    继续学习
                                </GradientButton>
                                <GradientButton
                                    variant="text"
                                    size="large"
                                    className="border border-white/40 text-white hover:bg-white/10"
                                >
                                    课程详情
                                </GradientButton>
                            </motion.div>
                        </div>

                        {/* 右侧悬浮卡片 */}
                        <motion.div
                            className="hidden lg:block"
                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="relative">
                                <div className="w-64 h-40 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <img 
                                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                                        alt="Course" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                {/* 光晕效果 */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-3xl blur-xl -z-10" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Course List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">我的课程</h2>
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    {['全部', '进行中', '已完成', '未开始'].map((tab, idx) => (
                                        <button key={idx} className={`px-4 py-1 text-sm rounded-md ${idx === 0 ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
                                            {tab} {idx === 0 && <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-1.5 rounded-full">5</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {courses.map(course => (
                                    <div
                                        key={course.id}
                                        onClick={() => handleCourseClick(course)}
                                        className="group cursor-pointer block"
                                    >
                                        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                                                {course.status === 'pending' ? '未开始' : '进行中'}
                                            </div>
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                <span className="text-white font-medium flex items-center">
                                                    进入课程 <RightOutlined className="ml-2" />
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                                <span className="text-sm text-gray-500">{course.progress}%</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-3">{course.instructor}</p>
                                            <Progress percent={course.progress} size="small" strokeColor={course.progress === 0 ? '#e5e7eb' : '#2563eb'} trailColor="#f3f4f6" showInfo={false} />
                                            <p className="text-xs text-gray-400 mt-2">
                                                {course.status === 'pending' ? '待开始学习' : '上次学习：昨天'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Another Course Card Style (List View) */}
                        <div className="bg-white rounded-xl p-0 shadow-sm border border-gray-100 overflow-hidden">
                            <div className="relative h-32 bg-gradient-to-r from-green-50 to-green-100 p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">高等数学（上）</h3>
                                    <p className="text-gray-500 text-sm">雷田礼</p>
                                </div>
                                <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop" className="w-24 h-16 object-cover rounded-lg shadow-md" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>学习进度</span>
                                    <span>0%</span>
                                </div>
                                <Progress percent={0} size="small" showInfo={false} />
                                <p className="text-xs text-gray-400 mt-2">待开始学习</p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Profile & Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar size={64} icon={<UserOutlined />} className="bg-gray-100 text-gray-400" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">测试学生</h3>
                                    <p className="text-gray-500 text-sm">班级：2023级计算机科学与技术1班</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-blue-600">0</div>
                                    <div className="text-xs text-gray-500 mt-1">累计学时</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-green-600">0</div>
                                    <div className="text-xs text-gray-500 mt-1">已修学分</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-orange-600">0%</div>
                                    <div className="text-xs text-gray-500 mt-1">签到率</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-purple-600">0</div>
                                    <div className="text-xs text-gray-500 mt-1">连续学习</div>
                                </div>
                            </div>

                            <div className="flex justify-center mb-4">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <Progress type="circle" percent={0} width={120} strokeColor="#d1d5db" />
                                    <div className="absolute text-center">
                                        <div className="text-xl font-bold text-gray-700">0%</div>
                                        <div className="text-xs text-gray-400">学期完成度</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                    <BellOutlined />
                                </div>
                                <h3 className="font-bold text-gray-800">深圳职业技术大学</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">学校公告</p>
                                    <a href="#" className="text-xs text-orange-500 hover:underline">查看更多 →</a>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">今日课表</p>
                                    <p className="text-xs text-gray-400">暂无课程安排</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">今日待办</h3>
                            <div className="text-center py-8 text-gray-400 text-sm">
                                暂无待办事项
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default StudentHome;

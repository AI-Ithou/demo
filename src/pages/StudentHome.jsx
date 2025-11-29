import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Progress, Tag, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, BellOutlined, RightOutlined } from '@ant-design/icons';

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
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2563EB" />
                                <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-bold text-lg text-gray-900">炎枢平台</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/teacher')}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                教师端
                            </button>
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <Avatar size={40} icon={<UserOutlined />} className="bg-gray-100 text-gray-400 cursor-pointer" />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg mb-10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">三维建模基础</h1>
                        <p className="text-orange-100 mb-6">许葵</p>
                        <p className="text-sm text-orange-100 mb-6">上次学习：待开始学习</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/goal-setting')}
                                className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                            >
                                继续学习
                            </button>
                            <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
                                课程详情
                            </button>
                        </div>
                    </div>
                    {/* Decorative Image/Pattern */}
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-32 bg-blue-400 rounded-lg shadow-2xl transform rotate-3 opacity-90 overflow-hidden border-4 border-white/20">
                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" alt="Course" className="w-full h-full object-cover" />
                    </div>
                </div>

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

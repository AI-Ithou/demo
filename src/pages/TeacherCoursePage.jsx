import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckSquare, BookOpen, Settings, Sparkles, Brain, Target, Database, BarChart3, Users, Star } from 'lucide-react';

const TeacherCoursePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('manage');
    const [courseStatus, setCourseStatus] = useState({
        isActive: false,
        startDate: null,
        endDate: null
    });

    // 开课/结课处理
    const handleCourseStatusToggle = () => {
        if (courseStatus.isActive) {
            if (confirm('确定要结课吗？结课后学生将无法继续学习。')) {
                setCourseStatus({
                    ...courseStatus,
                    isActive: false,
                    endDate: new Date().toISOString()
                });
            }
        } else {
            setCourseStatus({
                ...courseStatus,
                isActive: true,
                startDate: new Date().toISOString()
            });
        }
    };

    const courseData = {
        title: '建筑材料与构造',
        category: '土木类',
        teacher: '王睿',
        studentCount: 1,
        description: '课程介绍缺',
        courseCode: 'TM001',
        coverImage: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&auto=format&fit=crop'
    };

    const tabs = [
        { id: 'resources', label: '资料', icon: Database },
        { id: 'learning-map', label: '图谱', icon: Target },
        { id: 'agent', label: '智能体', icon: Brain },
        { id: 'homework', label: '作业', icon: CheckSquare },
        { id: 'ai-tools', label: 'AI工具', icon: Sparkles },
        { id: 'manage', label: '管理', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <span className="text-slate-600">返回课程列表</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Course Info Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
                    <div className="flex items-start gap-6 p-6">
                        <img
                            src={courseData.coverImage}
                            alt={courseData.title}
                            className="w-56 h-36 object-cover rounded-xl shadow-md flex-shrink-0"
                        />
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold border border-red-200 rounded inline-block mb-2">
                                        {courseData.category}
                                    </span>
                                    <h1 className="text-2xl font-bold text-slate-800 mb-2">{courseData.title}</h1>
                                    <div className="flex items-center gap-6 text-sm text-slate-600">
                                        <span>授课教师：{courseData.teacher}</span>
                                        <span>学生人数：{courseData.studentCount}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCourseStatusToggle}
                                    className={`px-8 py-3 rounded-lg font-bold text-base transition-all ${courseStatus.isActive
                                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        : 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:shadow-xl'
                                        }`}
                                >
                                    {courseStatus.isActive ? '结课' : '开课'}
                                </button>
                            </div>
                            <p className="text-sm text-slate-500">{courseData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center border-b border-slate-200">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === tab.id
                                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-6 bg-slate-50">
                        {activeTab === 'resources' && (
                            <div className="bg-white rounded-xl border-2 border-slate-200 p-8 text-center">
                                <div className="max-w-md mx-auto">
                                    <Database size={48} className="mx-auto text-blue-500 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">课程资料管理</h3>
                                    <p className="text-slate-600 mb-6">管理课程相关的文件、题库、视频和H5交互资源</p>
                                    <button
                                        onClick={() => navigate('/teacher/resources')}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                    >
                                        进入资料管理
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'manage' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* 学习地图管理 */}
                                <div onClick={() => navigate('/teacher/path')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 mb-2">学习地图管理</h3>
                                    <p className="text-sm text-slate-600">创建和管理个性化学习地图</p>
                                </div>

                                {/* 班级路径总览 */}
                                <div onClick={() => navigate('/teacher/class-overview')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3">
                                        <Users size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 mb-2">班级路径总览</h3>
                                    <p className="text-sm text-slate-600">查看班级学生路径和进度</p>
                                </div>

                                {/* AI智能分组 */}
                                <div onClick={() => navigate('/teacher/ai-grouping')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-pink-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-3">
                                        <Sparkles size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-pink-600 mb-2">AI智能学习小组</h3>
                                    <p className="text-sm text-slate-600">AI推荐传帮带分组</p>
                                </div>

                                {/* 知识点评测配置 */}
                                <div onClick={() => navigate(`/teacher/assessment-config?courseId=${courseData.courseCode}`)} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                        <CheckSquare size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">知识点评测配置</h3>
                                    <p className="text-sm text-slate-600">配置知识点评价，一般3-5道题</p>
                                </div>

                                {/* 学生管理 */}
                                <div onClick={() => navigate('/teacher/students')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                        <Users size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">学生管理</h3>
                                    <p className="text-sm text-slate-600">管理学生信息、档案</p>
                                </div>

                                {/* 班级管理 */}
                                <div onClick={() => navigate('/teacher/classes')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 mb-2">班级管理</h3>
                                    <p className="text-sm text-slate-600">管理班级信息、统计</p>
                                </div>

                                {/* 学生评价系统 */}
                                <div onClick={() => navigate('/teacher/student-evaluation')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-cyan-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3">
                                        <Star size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-cyan-600 mb-2">学生评价系统</h3>
                                    <p className="text-sm text-slate-600">记录学生表现与加分评价</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ai-tools' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* AI教案生成 */}
                                <div onClick={() => navigate(`/teacher/lesson-plans/create?courseId=${courseData.courseCode}`)} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-3">
                                        <Sparkles size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 mb-2">AI教案生成</h3>
                                    <p className="text-sm text-slate-600">基于课程内容智能生成教案</p>
                                </div>

                                {/* 教案管理 */}
                                <div onClick={() => navigate('/teacher/lesson-plans')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 mb-2">教案管理</h3>
                                    <p className="text-sm text-slate-600">查看和管理所有教案</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'agent' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 智能体统计 */}
                                <div onClick={() => navigate('/teacher/agents')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                        <BarChart3 size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">智能体统计</h3>
                                    <p className="text-sm text-slate-600">查看所有智能体的使用数据</p>
                                </div>

                                {/* 智能体管理 */}
                                <div onClick={() => navigate('/teacher/agents/manage')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                                        <Settings size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 mb-2">智能体管理</h3>
                                    <p className="text-sm text-slate-600">创建、编辑智能体设置</p>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'manage' && activeTab !== 'resources' && activeTab !== 'agent' && (
                            <div className="text-center py-20">
                                <div className="text-slate-400 text-lg">
                                    {tabs.find(t => t.id === activeTab)?.label} 功能开发中...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherCoursePage;

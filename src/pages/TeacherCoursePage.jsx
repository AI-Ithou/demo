import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckSquare, BookOpen, Settings, Sparkles, Brain, Target, Database, BarChart3, Users } from 'lucide-react';

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
                        {activeTab === 'manage' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* 学习路径管理 */}
                                <div onClick={() => navigate('/teacher/path')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 mb-2">学习路径管理</h3>
                                    <p className="text-sm text-slate-600">创建和管理个性化学习路径</p>
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
                                <div onClick={() => navigate('/teacher/assessment-config')} className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                                        <CheckSquare size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">知识点评测配置</h3>
                                    <p className="text-sm text-slate-600">个性化评测题库管理</p>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'manage' && (
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

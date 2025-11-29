import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Eye, Clock, Users, CheckSquare, BookOpen, Share2, Settings, Sparkles } from 'lucide-react';

const TeacherCoursePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('homework');

    // 模拟课程数据
    const courseData = {
        title: '生活色彩美学',
        category: '艺术设计',
        teacher: '高田由',
        studentCount: 156,
        description: '探索色彩在日常生活中的应用与美学价值',
        coverImage: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=800&auto=format&fit=crop'
    };

    // 作业列表
    const homeworks = [
        {
            id: 1,
            title: '色彩搭配方案设计',
            description: '请设计一套原型配色方案，包含主色调、辅助色和点缀色的选择，并说明其理念。',
            deadline: '10月20日 23:59',
            submitted: 89,
            total: 156,
            progress: 57,
            status: 'ongoing',
            tags: ['课堂设计1课', '课堂设计2课', '课堂设计3课']
        },
        {
            id: 2,
            title: '色彩心理学案例分析',
            description: '选择一个品牌案例空间设计案例，分析其色彩运用对消费者的心理影响。',
            deadline: '10月25日 23:59',
            submitted: 45,
            total: 156,
            progress: 29,
            status: 'ongoing',
            tags: ['课堂设计2课']
        },
        {
            id: 3,
            title: '色彩教学单元测试',
            description: '关于之个知识点测试应用色彩理论的教学应用',
            deadline: '10月28日 23:59',
            submitted: 23,
            total: 156,
            progress: 15,
            status: 'ongoing',
            tags: ['课堂设计1课', '课堂设计3课']
        }
    ];

    const getStatusBadge = (status) => {
        if (status === 'ongoing') {
            return <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md text-xs font-medium border border-red-200">已截稿</span>;
        }
        return <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium border border-blue-200">进行中</span>;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <span className="text-sm text-slate-500">返回课程列表</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Course Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                        {/* Course Cover */}
                        <div className="md:col-span-1">
                            <img
                                src={courseData.coverImage}
                                alt={courseData.title}
                                className="w-full h-48 object-cover rounded-xl shadow-md"
                            />
                        </div>

                        {/* Course Info */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-gradient-to-r from-red-50 to-orange-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                    🎨 {courseData.category}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800">{courseData.title}</h1>
                            <div className="flex items-center gap-6 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Users size={16} />
                                    <span>授课教师：{courseData.teacher}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} />
                                    <span>学生人数：{courseData.studentCount}</span>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{courseData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-200 inline-flex">
                        {[
                            { id: 'homework', label: '作业', icon: CheckSquare },
                            { id: 'study-group', label: '学习组团', icon: Users },
                            { id: 'manage', label: '管理', icon: Settings },
                            { id: 'resources', label: '资料', icon: BookOpen }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === tab.id
                                        ? 'bg-red-50 text-red-600 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Homework Management */}
                {activeTab === 'homework' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">作业管理</h2>
                                <p className="text-sm text-slate-500 mt-1">发布、管理和批改课程作业</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                                <Plus size={20} />
                                创建作业
                            </button>
                        </div>

                        {/* Homework List */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {homeworks.map(hw => (
                                <div
                                    key={hw.id}
                                    className="bg-white rounded-2xl border-2 border-slate-100 p-6 hover:border-red-200 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    {/* Status Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        {getStatusBadge(hw.status)}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-red-600 transition-colors">
                                        {hw.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                                        {hw.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {hw.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Metadata */}
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>截止：{hw.deadline}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users size={14} />
                                                <span>提交：{hw.submitted}/{hw.total}</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative">
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                                                    style={{ width: `${hw.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-end mt-1">
                                                <span className="text-xs font-bold text-slate-800">{hw.progress}% 已提交</span>
                                                <Eye size={14} className="ml-1 text-slate-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Course Management */}
                {activeTab === 'manage' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">课程管理</h2>
                            <p className="text-sm text-slate-500">配置课程设置和学习路径</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 学习路径管理卡片 */}
                            <div
                                onClick={() => navigate('/teacher/path')}
                                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                                        推荐
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                                    学习路径管理
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    创建和管理多个自定义学习路径，选择知识点并配置学习顺序，AI智能推荐难度和资源
                                </p>
                                <div className="flex items-center text-sm text-purple-600 font-medium">
                                    <span>管理路径</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* 班级路径总览卡片 */}
                            <div
                                onClick={() => navigate('/teacher/class-overview')}
                                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                        <Users size={24} className="text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                        新功能
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                    班级路径总览
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    查看班级所有学生的个性化学习路径和学习进度，一目了然掌握全班学习情况
                                </p>
                                <div className="flex items-center text-sm text-emerald-600 font-medium">
                                    <span>查看总览</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* AI智能分组卡片 */}
                            <div
                                onClick={() => navigate('/teacher/ai-grouping')}
                                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-pink-300 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                        <Sparkles size={24} className="text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-md">
                                        AI
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                                    AI智能学习小组
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    AI分析学生能力，推荐传帮带或强强联合分组方案，提升学习效果
                                </p>
                                <div className="flex items-center text-sm text-pink-600 font-medium">
                                    <span>AI推荐</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* 难度设置卡片 */}
                            <div
                                onClick={() => navigate('/teacher/course/difficulty-settings')}
                                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <Settings size={24} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    难度级别设置
                                </h3>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                    快速配置课程难度级别（简单/中等/困难），系统将根据难度自动生成对应的学习路径
                                </p>
                                <div className="flex items-center text-sm text-blue-600 font-medium">
                                    <span>快速配置</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* 学习路径预览卡片 */}
                            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 opacity-50 cursor-not-allowed">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <BookOpen size={24} className="text-slate-400" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                        即将推出
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-400 mb-2">
                                    路径可视化编辑
                                </h3>
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                    自定义编辑知识点学习路径，配置前置关系和学习资源
                                </p>
                                <div className="flex items-center text-sm text-slate-400">
                                    <span>敬请期待</span>
                                </div>
                            </div>
                        </div>

                        {/* 当前设置信息 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-900 mb-2">当前配置</h4>
                                    <div className="text-sm text-blue-800 space-y-1">
                                        <p>• 课程难度：<span className="font-bold">
                                            {localStorage.getItem('courseDifficulty') === 'simple' ? '简单' :
                                                localStorage.getItem('courseDifficulty') === 'hard' ? '困难' : '中等'}
                                        </span></p>
                                        <p>• 学生将看到对应难度的学习路径和知识点</p>
                                        <p>• 系统会根据学生类型（视觉型/实战型/逻辑型）自动调整资源类型</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Placeholder for other tabs */}
                {activeTab === 'study-group' && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <Users size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-2">学习组团</h3>
                        <p className="text-slate-500">功能开发中...</p>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-2">课程资料</h3>
                        <p className="text-slate-500">功能开发中...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TeacherCoursePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, TrendingUp, Clock, Calendar, Award, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">教师工作台</h1>
                            <p className="text-slate-600 mt-1">管理您的课程和学生</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
                                alt="教师头像"
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            <div>
                                <div className="font-bold text-slate-800">高田由</div>
                                <div className="text-sm text-slate-500">教师</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                </div>
                                <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Courses Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800">我的课程</h2>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            + 创建新课程
                        </button>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div
                                key={course.id}
                                onClick={() => navigate('/teacher/course')}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                {/* Cover Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.coverImage}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-lg text-sm font-medium shadow-lg">
                                            {course.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <Users size={16} />
                                            <span>{course.students} 学生</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen size={16} />
                                            <span>{course.homeworks} 作业</span>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div>
                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                            <span>课程进度</span>
                                            <span className="font-bold text-slate-800">{course.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {course.pendingReview > 0 && (
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-sm text-slate-600">待批改作业</span>
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold">
                                                {course.pendingReview}
                                            </span>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-50 group-hover:text-blue-600">
                                        进入课程
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;

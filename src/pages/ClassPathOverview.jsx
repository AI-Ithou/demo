import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, TrendingUp, BookOpen, Clock, Sparkles, Brain, Target, Eye } from 'lucide-react';
import { MOCK_STUDENTS, STUDENT_PATH_ASSIGNMENTS, StudentPathManager } from '../data/student_path_data';

const ClassPathOverview = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStudents(MOCK_STUDENTS);
        setAssignments(StudentPathManager.getAllAssignments());
        setStats(StudentPathManager.getClassStats());
    }, []);

    // 获取学生完整信息
    const getStudentWithAssignment = (studentId) => {
        const student = students.find(s => s.id === studentId);
        const assignment = assignments.find(a => a.studentId === studentId);
        return { ...student, assignment };
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                                    <Users className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">班级学习路径总览</h1>
                                    <p className="text-sm text-slate-500">高一(3)班 • {students.length}名学生</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/teacher/ai-grouping')}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg flex items-center gap-2"
                        >
                            🤖 AI智能分组
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-100 text-sm font-medium">总学生数</span>
                            <Users size={20} className="text-blue-100" />
                        </div>
                        <div className="text-3xl font-bold">{stats?.totalStudents || 0}</div>
                        <p className="text-blue-100 text-xs mt-1">全班学生</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-100 text-sm font-medium">平均进度</span>
                            <TrendingUp size={20} className="text-emerald-100" />
                        </div>
                        <div className="text-3xl font-bold">{stats?.avgProgress || 0}%</div>
                        <p className="text-emerald-100 text-xs mt-1">全班平均</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-100 text-sm font-medium">路径种类</span>
                            <Target size={20} className="text-purple-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {Object.keys(stats?.pathDistribution || {}).length}
                        </div>
                        <p className="text-purple-100 text-xs mt-1">不同路径</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-100 text-sm font-medium">总学时</span>
                            <Clock size={20} className="text-orange-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {assignments.reduce((sum, a) => sum + (a.actualHoursSpent || 0), 0)}h
                        </div>
                        <p className="text-orange-100 text-xs mt-1">累计学习</p>
                    </div>
                </div>

                {/* 路径分布 */}
                {stats?.pathDistribution && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">路径分布情况</h2>
                        <div className="space-y-3">
                            {Object.entries(stats.pathDistribution).map(([pathName, count], index) => {
                                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                                const color = colors[index % colors.length];
                                const percentage = (count / stats.totalStudents * 100).toFixed(0);

                                return (
                                    <div key={pathName}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-700">{pathName}</span>
                                            <span className="text-sm font-bold text-slate-800">{count}人 ({percentage}%)</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-300"
                                                style={{
                                                    width: `${percentage}%`,
                                                    background: color
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 学生列表 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">学生学习进度</h2>
                    <div className="space-y-4">
                        {students.map(student => {
                            const data = getStudentWithAssignment(student.id);
                            const { assignment } = data;

                            return (
                                <div
                                    key={student.id}
                                    onClick={() => navigate(`/teacher/student/${student.id}`)}
                                    className="border-2 border-slate-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* 头像 */}
                                        <img
                                            src={student.avatar}
                                            alt={student.name}
                                            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                        />

                                        {/* 学生信息 */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-800">{student.name}</h3>
                                                    <p className="text-sm text-slate-500">学号: {student.studentId}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-emerald-600">
                                                        {assignment?.progress.percentage || 0}%
                                                    </div>
                                                    <p className="text-xs text-slate-500">学习进度</p>
                                                </div>
                                            </div>

                                            {/* 能力雷达 */}
                                            <div className="grid grid-cols-3 gap-3 mb-3">
                                                <div className="bg-blue-50 rounded-lg p-2">
                                                    <div className="text-xs text-blue-600 mb-1">代数能力</div>
                                                    <div className="text-sm font-bold text-blue-700">{student.abilities.algebra}</div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-2">
                                                    <div className="text-xs text-green-600 mb-1">几何能力</div>
                                                    <div className="text-sm font-bold text-green-700">{student.abilities.geometry}</div>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-2">
                                                    <div className="text-xs text-purple-600 mb-1">分析能力</div>
                                                    <div className="text-sm font-bold text-purple-700">{student.abilities.analysis}</div>
                                                </div>
                                            </div>

                                            {/* 路径信息 */}
                                            {assignment && (
                                                <div className="bg-slate-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm font-medium text-slate-700">
                                                            📘 {assignment.pathName}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            已学{assignment.actualHoursSpent}小时
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <div>
                                                            <span className="text-slate-500">当前节点:</span>
                                                            <div className="font-medium text-slate-800 mt-1">
                                                                {assignment.progress.currentNode || '未开始'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">已完成:</span>
                                                            <div className="font-medium text-slate-800 mt-1">
                                                                {assignment.progress.completedNodes.length}/{assignment.progress.totalNodes} 节点
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 进度条 */}
                                                    <div className="mt-3">
                                                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                                                                style={{ width: `${assignment.progress.percentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* AI分析按钮 */}
                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/teacher/student/${student.id}/analysis`);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Brain size={16} />
                                                    查看AI学情分析
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClassPathOverview;

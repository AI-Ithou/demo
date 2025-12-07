import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Award, TrendingUp, Users, Star, Plus, ThumbsUp, MessageSquare, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    studentsData,
    evaluationsData,
    evaluationTypes,
    getEvaluationStats
} from '../data/student_evaluation_data';

const StudentEvaluationPage = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showEvaluationForm, setShowEvaluationForm] = useState(false);
    const [newEvaluation, setNewEvaluation] = useState({
        type: 'participation',
        bonusScore: 0,
        comment: ''
    });

    // 从localStorage加载数据或使用默认数据
    useEffect(() => {
        const savedData = localStorage.getItem('studentEvaluationData');
        if (savedData) {
            const data = JSON.parse(savedData);
            setStudents(data.students || studentsData);
        } else {
            setStudents(studentsData);
        }
    }, []);

    // 保存数据到localStorage
    const saveData = (updatedStudents) => {
        localStorage.setItem('studentEvaluationData', JSON.stringify({
            students: updatedStudents,
            evaluations: evaluationsData
        }));
    };

    // 筛选学生
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 获取统计数据
    const stats = getEvaluationStats();

    // 打开评价表单
    const openEvaluationForm = (student) => {
        setSelectedStudent(student);
        setShowEvaluationForm(true);
        setNewEvaluation({
            type: 'participation',
            bonusScore: 0,
            comment: ''
        });
    };

    // 提交评价
    const submitEvaluation = () => {
        if (!selectedStudent) return;

        const evalType = evaluationTypes.find(t => t.id === newEvaluation.type);
        const baseScore = evalType.baseScore;
        const bonusScore = parseInt(newEvaluation.bonusScore) || 0;

        // 更新学生数据
        const updatedStudents = students.map(student => {
            if (student.id === selectedStudent.id) {
                return {
                    ...student,
                    totalScore: student.totalScore + baseScore + bonusScore,
                    participationScore: student.participationScore + baseScore,
                    bonusScore: student.bonusScore + bonusScore,
                    evaluationCount: student.evaluationCount + 1,
                    recentActivity: '刚刚'
                };
            }
            return student;
        });

        setStudents(updatedStudents);
        saveData(updatedStudents);

        // 关闭表单
        setShowEvaluationForm(false);
        setSelectedStudent(null);
    };

    // 获取等级徽章
    const getLevelBadge = (level) => {
        const badges = {
            excellent: { text: '优秀', color: 'from-yellow-400 to-orange-500', icon: '🏆' },
            good: { text: '良好', color: 'from-blue-400 to-cyan-500', icon: '⭐' },
            pass: { text: '及格', color: 'from-green-400 to-teal-500', icon: '✓' }
        };
        return badges[level] || badges.pass;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/teacher')}
                                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">学生评价系统</h1>
                                <p className="text-xs text-slate-500">记录学生表现，激励学习成长</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowEvaluationForm(true)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} />
                            快速评价
                        </button>
                    </div>

                    {/*统计卡片 */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Users size={16} className="text-blue-600" />
                                <span className="text-xs text-slate-600">总学生数</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Star size={16} className="text-green-600" />
                                <span className="text-xs text-slate-600">评价次数</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600">{stats.totalEvaluations}</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Award size={16} className="text-purple-600" />
                                <span className="text-xs text-slate-600">平均分</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">{stats.averageScore}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-100">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={16} className="text-orange-600" />
                                <span className="text-xs text-slate-600">活跃度</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600">{stats.activeRate}%</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* 搜索栏 */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="搜索学生姓名..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* 学生列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStudents.map((student, index) => {
                        const badge = getLevelBadge(student.level);
                        return (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all group"
                            >
                                {/* 学生头部 */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={student.avatar}
                                            alt={student.name}
                                            className="w-12 h-12 rounded-full border-2 border-slate-200 group-hover:border-blue-400 transition-colors"
                                        />
                                        <div>
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                                {student.name}
                                                <span className="text-xs text-slate-500">#{student.rank}</span>
                                            </h3>
                                            <p className="text-xs text-slate-500">{student.recentActivity}</p>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 bg-gradient-to-r ${badge.color} rounded-lg text-white text-xs font-medium flex items-center gap-1`}>
                                        <span>{badge.icon}</span>
                                        <span>{badge.text}</span>
                                    </div>
                                </div>

                                {/* 分数展示 */}
                                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-600">总分</span>
                                        <span className="text-2xl font-bold text-blue-600">{student.totalScore}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-600">参与分: <span className="font-semibold text-green-600">{student.participationScore}</span></span>
                                        <span className="text-slate-600">额外分: <span className="font-semibold text-orange-600">{student.bonusScore}</span></span>
                                    </div>
                                </div>

                                {/* 评价统计 */}
                                <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <MessageSquare size={14} />
                                        {student.evaluationCount} 次评价
                                    </span>
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/teacher/student-evaluation/${student.id}`)}
                                        className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Edit size={14} />
                                        查看详情
                                    </button>
                                    <button
                                        onClick={() => openEvaluationForm(student)}
                                        className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <ThumbsUp size={14} />
                                        评价
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            {/* 评价表单弹窗 */}
            {showEvaluationForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-slate-800 mb-4">
                            {selectedStudent ? `评价 ${selectedStudent.name}` : '快速评价'}
                        </h2>

                        {!selectedStudent ? (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">选择学生</label>
                                <select
                                    onChange={(e) => setSelectedStudent(students.find(s => s.id === e.target.value))}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">请选择学生</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>{student.name}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}

                        <div className="space-y-4">
                            {/* 评价类型 */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">评价类型</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {evaluationTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setNewEvaluation({ ...newEvaluation, type: type.id })}
                                            className={`p-2 rounded-lg border-2 transition-all text-xs ${newEvaluation.type === type.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-slate-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="text-lg mb-1">{type.icon}</div>
                                            <div className="font-medium">{type.name}</div>
                                            <div className="text-slate-500">+{type.baseScore}分</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 额外加分 */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    额外加分 (-10 ~ +20)
                                </label>
                                <input
                                    type="number"
                                    min="-10"
                                    max="20"
                                    value={newEvaluation.bonusScore}
                                    onChange={(e) => setNewEvaluation({ ...newEvaluation, bonusScore: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* 评语 */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">评语</label>
                                <textarea
                                    value={newEvaluation.comment}
                                    onChange={(e) => setNewEvaluation({ ...newEvaluation, comment: e.target.value })}
                                    placeholder="写下你的评价..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {/* 按钮 */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowEvaluationForm(false);
                                        setSelectedStudent(null);
                                    }}
                                    className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={submitEvaluation}
                                    disabled={!selectedStudent}
                                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    提交评价
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default StudentEvaluationPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, MessageSquare, TrendingUp, ThumbsUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { studentsData, evaluationsData, evaluationTypes } from '../data/student_evaluation_data';

const StudentEvaluationHistory = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        // 查找学生
        const foundStudent = studentsData.find(s => s.id === studentId);
        setStudent(foundStudent);

        // 加载评价记录（从localStorage或默认数据）
        const savedData = localStorage.getItem('studentEvaluationData');
        if (savedData) {
            const data = JSON.parse(savedData);
            setEvaluations((data.evaluations || evaluationsData).filter(e => e.studentId === studentId));
        } else {
            setEvaluations(evaluationsData.filter(e => e.studentId === studentId));
        }
    }, [studentId]);

    if (!student) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center text-slate-500">
                    <p>学生未找到</p>
                    <button
                        onClick={() => navigate('/teacher/student-evaluation')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        返回列表
                    </button>
                </div>
            </div>
        );
    }

    // 准备图表数据
    const chartData = evaluations.slice(0, 10).reverse().map((e, index) => ({
        name: `第${index + 1}次`,
        分数: e.baseScore + e.bonusScore
    }));

    // 按类型统计
    const typeStats = evaluationTypes.map(type => {
        const typeEvals = evaluations.filter(e => e.type === type.id);
        const totalScore = typeEvals.reduce((sum, e) => sum + e.baseScore + e.bonusScore, 0);
        return {
            ...type,
            count: typeEvals.length,
            totalScore
        };
    }).filter(t => t.count > 0);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate('/teacher/student-evaluation')}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-4">
                            <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-14 h-14 rounded-full border-2 border-blue-200"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">{student.name} 的评价历史</h1>
                                <p className="text-xs text-slate-500">总评价次数: {student.evaluationCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* 统计卡片 */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1">
                                <Award size={16} className="text-blue-600" />
                                <span className="text-xs text-slate-600">总分</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{student.totalScore}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <div className="flex items-center gap-2 mb-1">
                                <ThumbsUp size={16} className="text-green-600" />
                                <span className="text-xs text-slate-600">参与分</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600">{student.participationScore}</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={16} className="text-orange-600" />
                                <span className="text-xs text-slate-600">额外分</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600">{student.bonusScore}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare size={16} className="text-purple-600" />
                                <span className="text-xs text-slate-600">排名</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-600">#{student.rank}</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* 左侧：评分趋势图 */}
                    <div className="col-span-8 space-y-6">
                        {/* 评分趋势 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">评分趋势</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="分数"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6', r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 评价历史时间线 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">评价历史</h3>
                            <div className="space-y-4">
                                {evaluations.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400">
                                        <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
                                        <p>暂无评价记录</p>
                                    </div>
                                ) : (
                                    evaluations.map((evaluation, index) => {
                                        const evalType = evaluationTypes.find(t => t.id === evaluation.type);
                                        const totalScore = evaluation.baseScore + evaluation.bonusScore;

                                        return (
                                            <div key={evaluation.id} className="border-l-4 border-blue-200 pl-4 py-3 hover:bg-slate-50 rounded-r-lg transition-colors">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">{evalType.icon}</span>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-800">{evalType.name}</h4>
                                                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                                                <Calendar size={12} />
                                                                {new Date(evaluation.date).toLocaleString('zh-CN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-blue-600">+{totalScore}</div>
                                                        <div className="text-xs text-slate-500">
                                                            基础{evaluation.baseScore} + 额外{evaluation.bonusScore}
                                                        </div>
                                                    </div>
                                                </div>

                                                {evaluation.comment && (
                                                    <div className="bg-slate-50 rounded-lg p-3 mt-2">
                                                        <p className="text-sm text-slate-700">{evaluation.comment}</p>
                                                    </div>
                                                )}

                                                {evaluation.relatedActivity && (
                                                    <div className="text-xs text-slate-500 mt-2">
                                                        关联活动：{evaluation.relatedActivity}
                                                    </div>
                                                )}

                                                {evaluation.tags && evaluation.tags.length > 0 && (
                                                    <div className="flex gap-2 mt-2">
                                                        {evaluation.tags.map((tag, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 右侧：统计信息 */}
                    <div className="col-span-4 space-y-6">
                        {/* 评价类型统计 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">评价类型分布</h3>
                            <div className="space-y-3">
                                {typeStats.map(type => (
                                    <div key={type.id} className="border-b border-slate-100 pb-3 last:border-b-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{type.icon}</span>
                                                <span className="text-sm font-medium text-slate-700">{type.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-blue-600">{type.count}次</span>
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            累计得分: {type.totalScore}分
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 学习建议 */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                                💡 学习建议
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {student.level === 'excellent' ? (
                                    <>
                                        <li>• 继续保持优秀表现</li>
                                        <li>• 可以帮助其他同学</li>
                                        <li>• 尝试更具挑战性的题目</li>
                                    </>
                                ) : student.level === 'good' ? (
                                    <>
                                        <li>• 表现良好，继续努力</li>
                                        <li>• 多参与课堂讨论</li>
                                        <li>• 提升创新思维能力</li>
                                    </>
                                ) : (
                                    <>
                                        <li>• 加强课堂参与度</li>
                                        <li>• 按时完成作业</li>
                                        <li>• 多与老师交流</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentEvaluationHistory;

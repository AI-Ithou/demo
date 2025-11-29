import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Circle, TrendingUp, Target, Award, History, PlayCircle, FileText, MessageSquare, Layout, Brain } from 'lucide-react';
import { MOCK_STUDENTS, StudentPathManager } from '../data/student_path_data';
import { findNodeById, KNOWLEDGE_TREE } from '../data/knowledge_tree';

const StudentPathDetail = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [assignment, setAssignment] = useState(null);
    const [pathNodes, setPathNodes] = useState([]);

    useEffect(() => {
        // 加载学生数据
        const studentData = MOCK_STUDENTS.find(s => s.id === studentId);
        const assignmentData = StudentPathManager.getAllAssignments().find(a => a.studentId === studentId);

        setStudent(studentData);
        setAssignment(assignmentData);

        // 构建路径节点
        if (assignmentData) {
            const allNodes = [
                ...assignmentData.progress.completedNodes,
                assignmentData.progress.currentNode,
                // 可以添加更多未来节点
            ].filter(Boolean);

            const nodes = allNodes.map(nodeId => {
                const node = findNodeById(KNOWLEDGE_TREE, nodeId);
                return {
                    id: nodeId,
                    name: node?.name || nodeId,
                    status: assignmentData.progress.completedNodes.includes(nodeId)
                        ? 'completed'
                        : nodeId === assignmentData.progress.currentNode
                            ? 'current'
                            : 'upcoming'
                };
            });

            setPathNodes(nodes);
        }
    }, [studentId]);

    if (!student || !assignment) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-slate-500">加载中...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                        />
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-slate-800">{student.name} 的学习路径</h1>
                            <p className="text-sm text-slate-500">学号: {student.studentId} • {assignment.pathName}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-emerald-600">
                                {assignment.progress.percentage}%
                            </div>
                            <p className="text-xs text-slate-500">完成进度</p>
                        </div>
                        <button
                            onClick={() => navigate(`/teacher/student/${studentId}/analysis`)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Brain size={20} />
                            查看AI分析
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">已完成</span>
                            <CheckCircle2 size={20} className="text-emerald-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {assignment.progress.completedNodes.length}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">个知识点</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">总节点数</span>
                            <Target size={20} className="text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {assignment.progress.totalNodes}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">个知识点</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">学习时长</span>
                            <Clock size={20} className="text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {assignment.actualHoursSpent}h
                        </div>
                        <p className="text-xs text-slate-500 mt-1">已学习</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">综合能力</span>
                            <Award size={20} className="text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {student.abilities.overall}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">分</p>
                    </div>
                </div>

                {/* 学习路径可视化 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">学习路径图</h2>

                    {/* 时间线样式的路径图 */}
                    <div className="relative">
                        {pathNodes.map((node, index) => {
                            const isCompleted = node.status === 'completed';
                            const isCurrent = node.status === 'current';
                            const isUpcoming = node.status === 'upcoming';

                            return (
                                <div key={node.id} className="relative">
                                    {/* 连接线 */}
                                    {index < pathNodes.length - 1 && (
                                        <div
                                            className={`absolute left-6 top-12 w-0.5 h-24 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                                                }`}
                                            style={{ zIndex: 0 }}
                                        />
                                    )}

                                    {/* 节点 */}
                                    <div className="flex items-start gap-4 mb-6 relative" style={{ zIndex: 1 }}>
                                        {/* 状态图标 */}
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted
                                            ? 'bg-emerald-500 shadow-lg shadow-emerald-200'
                                            : isCurrent
                                                ? 'bg-blue-500 shadow-lg shadow-blue-200 animate-pulse'
                                                : 'bg-slate-200'
                                            }`}>
                                            {isCompleted && (
                                                <CheckCircle2 size={24} className="text-white" />
                                            )}
                                            {isCurrent && (
                                                <Circle size={24} className="text-white fill-white" />
                                            )}
                                            {isUpcoming && (
                                                <Circle size={24} className="text-slate-400" />
                                            )}
                                        </div>

                                        {/* 节点信息 */}
                                        <div className={`flex-1 p-6 rounded-xl border-2 ${isCompleted
                                            ? 'bg-emerald-50 border-emerald-200'
                                            : isCurrent
                                                ? 'bg-blue-50 border-blue-300'
                                                : 'bg-slate-50 border-slate-200'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className={`font-bold ${isCompleted
                                                    ? 'text-emerald-900'
                                                    : isCurrent
                                                        ? 'text-blue-900'
                                                        : 'text-slate-700'
                                                    }`}>
                                                    {node.name}
                                                </h3>
                                                {isCompleted && (
                                                    <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold">
                                                        已完成
                                                    </span>
                                                )}
                                                {isCurrent && (
                                                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-xs font-bold">
                                                        进行中
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`text-sm ${isCompleted
                                                ? 'text-emerald-700'
                                                : isCurrent
                                                    ? 'text-blue-700'
                                                    : 'text-slate-500'
                                                }`}>
                                                节点 {index + 1} / {pathNodes.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 能力雷达 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">能力分析</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-xl p-6">
                            <div className="text-sm text-blue-600 mb-2">代数能力</div>
                            <div className="text-3xl font-bold text-blue-700 mb-2">
                                {student.abilities.algebra}
                            </div>
                            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${student.abilities.algebra}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-6">
                            <div className="text-sm text-green-600 mb-2">几何能力</div>
                            <div className="text-3xl font-bold text-green-700 mb-2">
                                {student.abilities.geometry}
                            </div>
                            <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-600 transition-all duration-300"
                                    style={{ width: `${student.abilities.geometry}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-6">
                            <div className="text-sm text-purple-600 mb-2">分析能力</div>
                            <div className="text-3xl font-bold text-purple-700 mb-2">
                                {student.abilities.analysis}
                            </div>
                            <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-600 transition-all duration-300"
                                    style={{ width: `${student.abilities.analysis}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 学习轨迹日志 */}
                {assignment.activityLogs && assignment.activityLogs.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <History className="text-slate-600" size={24} />
                            <h2 className="text-lg font-bold text-slate-800">学习轨迹</h2>
                        </div>

                        <div className="relative pl-4">
                            {/* 垂直连接线 */}
                            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

                            <div className="space-y-8">
                                {assignment.activityLogs.map((log, index) => {
                                    // 根据类型选择图标和颜色
                                    let icon = <Circle size={16} />;
                                    let colorClass = 'bg-slate-500';
                                    let bgClass = 'bg-slate-100';

                                    switch (log.type) {
                                        case 'study':
                                            icon = <BookOpen size={16} className="text-white" />;
                                            colorClass = 'bg-blue-500';
                                            bgClass = 'bg-blue-50 border-blue-100';
                                            break;
                                        case 'exercise':
                                            icon = <FileText size={16} className="text-white" />;
                                            colorClass = 'bg-emerald-500';
                                            bgClass = 'bg-emerald-50 border-emerald-100';
                                            break;
                                        case 'resource':
                                            icon = <PlayCircle size={16} className="text-white" />;
                                            colorClass = 'bg-purple-500';
                                            bgClass = 'bg-purple-50 border-purple-100';
                                            break;
                                        case 'agent':
                                            icon = <MessageSquare size={16} className="text-white" />;
                                            colorClass = 'bg-pink-500';
                                            bgClass = 'bg-pink-50 border-pink-100';
                                            break;
                                        case 'system':
                                            icon = <Layout size={16} className="text-white" />;
                                            colorClass = 'bg-slate-500';
                                            bgClass = 'bg-slate-50 border-slate-100';
                                            break;
                                    }

                                    return (
                                        <div key={log.id} className="relative flex gap-6">
                                            {/* 时间点图标 */}
                                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${colorClass} shadow-md`}>
                                                {icon}
                                            </div>

                                            {/* 内容卡片 */}
                                            <div className={`flex-1 p-4 rounded-xl border ${bgClass}`}>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="text-xs text-slate-500 font-medium mb-1">
                                                            {log.timestamp}
                                                        </div>
                                                        <h3 className="font-bold text-slate-800">{log.title}</h3>
                                                    </div>
                                                    {log.score && (
                                                        <div className="px-3 py-1 bg-white rounded-lg shadow-sm text-emerald-600 font-bold text-sm">
                                                            {log.score}分
                                                        </div>
                                                    )}
                                                </div>

                                                <p className="text-sm text-slate-600 mb-2">{log.details}</p>

                                                {log.duration && (
                                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                                        <Clock size={12} />
                                                        <span>耗时: {log.duration}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentPathDetail;

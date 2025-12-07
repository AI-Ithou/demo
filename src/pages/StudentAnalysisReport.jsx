import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle, Lightbulb, Target, Calendar, Brain, BarChart3, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { MOCK_STUDENTS } from '../data/student_path_data';
import { StudentAnalysisAI } from '../data/student_analysis_ai';

const StudentAnalysisReport = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [report, setReport] = useState(null);

    useEffect(() => {
        const studentData = MOCK_STUDENTS.find(s => s.id === studentId);
        const reportData = StudentAnalysisAI.generateReport(studentId);

        setStudent(studentData);
        setReport(reportData);
    }, [studentId]);

    if (!student || !report) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-slate-500">加载中...</div>
        </div>;
    }

    // 状态颜色映射
    const statusColors = {
        excellent: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-500' },
        good: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-500' },
        average: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-500' },
        needsImprovement: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-500' }
    };

    const severityIcons = {
        high: <AlertCircle className="text-red-500" size={20} />,
        medium: <AlertTriangle className="text-orange-500" size={20} />,
        low: <AlertCircle className="text-blue-500" size={20} />
    };

    const priorityColors = {
        high: 'border-l-4 border-l-red-500 bg-red-50',
        medium: 'border-l-4 border-l-orange-500 bg-orange-50',
        low: 'border-l-4 border-l-blue-500 bg-blue-50'
    };

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
                            <h1 className="text-xl font-bold text-slate-800">
                                {student.name} 的学情AI分析报告
                            </h1>
                            <p className="text-sm text-slate-500">
                                生成时间: {report.generatedAt} • 学号: {student.studentId}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                            <Brain size={20} />
                            <span className="font-bold">AI智能分析</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 学习状态总览 */}
                <div className={`rounded-2xl border-2 p-8 mb-8 ${statusColors[report.learningStatus.overall].bg} ${statusColors[report.learningStatus.overall].border}`}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp size={28} className={statusColors[report.learningStatus.overall].text} />
                                <h2 className="text-2xl font-bold text-slate-800">学习状态评估</h2>
                            </div>
                            <p className={`text-lg ${statusColors[report.learningStatus.overall].text}`}>
                                {report.learningStatus.comment}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className={`text-5xl font-bold ${statusColors[report.learningStatus.overall].text}`}>
                                {report.learningStatus.score}
                            </div>
                            <div className="text-sm text-slate-600 mt-1">综合评分</div>
                        </div>
                    </div>

                    {/* 学习趋势图 */}
                    {report.learningStatus.trends && report.learningStatus.trends.length > 0 && (
                        <div className="bg-white rounded-xl p-4">
                            <h3 className="text-sm font-bold text-slate-700 mb-3">学习趋势</h3>
                            <div className="flex items-end justify-between h-32 gap-2">
                                {report.learningStatus.trends.map((trend, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className={`w-full ${statusColors[report.learningStatus.overall].badge} rounded-t`}
                                            style={{ height: `${trend.score}%` }}
                                        />
                                        <span className="text-xs text-slate-500">{trend.date.substring(5)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 挂科率统计分析 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                                    <XCircle className="text-white" size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800">挂科率</h3>
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-red-600 mb-2">
                            {((report.failureData?.failedCount || 0) / (report.failureData?.totalCourses || 1) * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-slate-600">
                            {report.failureData?.failedCount || 0}/{report.failureData?.totalCourses || 12} 门课程
                        </p>
                        {(report.failureData?.failedCount || 0) > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="text-xs text-slate-500 mb-2">挂科科目</div>
                                <div className="flex flex-wrap gap-2">
                                    {(report.failureData?.failedSubjects || ['数学', '物理']).map((subject, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <AlertTriangle className="text-white" size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800">预警科目</h3>
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-orange-600 mb-2">
                            {report.failureData?.warningCount || 0}
                        </div>
                        <p className="text-sm text-slate-600">
                            成绩60-70分科目
                        </p>
                        {(report.failureData?.warningCount || 0) > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="text-xs text-slate-500 mb-2">需要关注</div>
                                <div className="flex flex-wrap gap-2">
                                    {(report.failureData?.warningSubjects || ['化学']).map((subject, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <CheckCircle2 className="text-white" size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800">及格率</h3>
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-emerald-600 mb-2">
                            {((1 - ((report.failureData?.failedCount || 0) / (report.failureData?.totalCourses || 1))) * 100).toFixed(1)}%
                        </div>
                        <p className="text-sm text-slate-600">
                            {(report.failureData?.totalCourses || 12) - (report.failureData?.failedCount || 0)}/{report.failureData?.totalCourses || 12} 门课程及格
                        </p>
                    </div>
                </div>

                {/* 能力维度分析 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="text-purple-600" size={24} />
                        <h2 className="text-lg font-bold text-slate-800">能力维度分析</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(report.abilities).map(([key, ability]) => (
                            <div key={key} className="border-2 border-slate-100 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-bold text-slate-800">
                                        {key === 'algebra' ? '代数能力' :
                                            key === 'geometry' ? '几何能力' :
                                                key === 'analysis' ? '分析能力' :
                                                    key === 'computation' ? '计算能力' :
                                                        key === 'application' ? '应用能力' : key}
                                    </span>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${ability.score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                        ability.score >= 60 ? 'bg-blue-100 text-blue-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                        {ability.level}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${ability.score >= 80 ? 'bg-emerald-500' :
                                                ability.score >= 60 ? 'bg-blue-500' :
                                                    'bg-orange-500'
                                                }`}
                                            style={{ width: `${ability.score}%` }}
                                        />
                                    </div>
                                    <span className="text-lg font-bold text-slate-700 w-12 text-right">
                                        {ability.score}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600">{ability.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 薄弱环节诊断 */}
                {report.weaknesses && report.weaknesses.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertTriangle className="text-orange-600" size={24} />
                            <h2 className="text-lg font-bold text-slate-800">薄弱环节诊断</h2>
                        </div>
                        <div className="space-y-4">
                            {report.weaknesses.map((weakness) => (
                                <div key={weakness.id} className="border-2 border-slate-100 rounded-xl p-5 hover:border-orange-200 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            {severityIcons[weakness.severity]}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-slate-800">{weakness.title}</h3>
                                                <span className={`px-2 py-1 text-xs rounded ${weakness.severity === 'high' ? 'bg-red-100 text-red-700' :
                                                    weakness.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {weakness.severity === 'high' ? '严重' :
                                                        weakness.severity === 'medium' ? '中等' : '轻微'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-3">{weakness.description}</p>
                                            {weakness.affectedTopics && weakness.affectedTopics.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-xs text-slate-500">影响知识点: </span>
                                                    {weakness.affectedTopics.map((topic, idx) => (
                                                        <span key={idx} className="text-xs text-purple-600 mr-2">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3">
                                                <Lightbulb size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-blue-800">{weakness.suggestion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI个性化建议 */}
                {report.recommendations && report.recommendations.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Target className="text-green-600" size={24} />
                            <h2 className="text-lg font-bold text-slate-800">AI个性化建议</h2>
                        </div>
                        <div className="space-y-4">
                            {report.recommendations.map((rec) => (
                                <div key={rec.id} className={`rounded-xl p-5 ${priorityColors[rec.priority]}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-slate-800 text-lg">{rec.title}</h3>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                                            rec.priority === 'medium' ? 'bg-orange-200 text-orange-800' :
                                                'bg-blue-200 text-blue-800'
                                            }`}>
                                            {rec.priority === 'high' ? '高优先级' :
                                                rec.priority === 'medium' ? '中优先级' : '低优先级'}
                                        </span>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <p className="text-sm text-slate-700 whitespace-pre-line">{rec.content}</p>
                                    </div>
                                    {rec.estimatedTime && rec.estimatedTime !== '-' && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                            <Calendar size={14} />
                                            <span>预估时间: {rec.estimatedTime}</span>
                                        </div>
                                    )}
                                    {rec.resources && rec.resources.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {rec.resources.map((resource, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
                                                    📚 {resource}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 学习预测 */}
                {report.prediction && (
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                        <div className="flex items-center gap-2 mb-6">
                            <Brain size={24} />
                            <h2 className="text-lg font-bold">AI学习预测</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {report.prediction.nextWeekProgress && (
                                <div className="bg-white/20 rounded-xl p-4">
                                    <div className="text-sm text-purple-100 mb-1">下周预计进度</div>
                                    <div className="text-3xl font-bold">+{report.prediction.nextWeekProgress}%</div>
                                </div>
                            )}
                            {report.prediction.estimatedCompletion && (
                                <div className="bg-white/20 rounded-xl p-4">
                                    <div className="text-sm text-purple-100 mb-1">预计完成时间</div>
                                    <div className="text-xl font-bold">{report.prediction.estimatedCompletion}</div>
                                </div>
                            )}
                            <div className="bg-white/20 rounded-xl p-4">
                                <div className="text-sm text-purple-100 mb-1">风险等级</div>
                                <div className={`text-2xl font-bold ${report.prediction.riskLevel === 'low' ? 'text-emerald-300' :
                                    report.prediction.riskLevel === 'medium' ? 'text-orange-300' :
                                        'text-red-300'
                                    }`}>
                                    {report.prediction.riskLevel === 'low' ? '低风险' :
                                        report.prediction.riskLevel === 'medium' ? '中风险' : '高风险'}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4">
                            <p className="text-purple-100 leading-relaxed">{report.prediction.suggestions}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentAnalysisReport;

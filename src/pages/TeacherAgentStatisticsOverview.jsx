import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, Star, Users, MessageCircle,
    Calendar, Award, BarChart3, Settings, DownloadCloud, Sparkles
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { GlassCard } from '../components/uiverse';
import {
    getAllAgents,
    getAllStatistics,
    getAllComments,
    getAllUsageRecords,
    initializeFromData
} from '../utils/agentStorage';
import { teacherAgentStatisticsOverviewData } from '../data/TeacherAgentStatisticsOverviewData';
import { exportExcelFile, buildExcelFileName } from '../utils/excelUtils';
import teacherAgentsData from '../data/teacher_agents_data';
import agentStatisticsData from '../data/agent_statistics_data';
import agentCommentsData from '../data/agent_comments_data';
import teacherAgentDetailPageData from '../data/TeacherAgentDetailPageData';
import teacherAgentCommentsPageData from '../data/TeacherAgentCommentsPageData';

const TeacherAgentStatisticsOverview = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [usageRecords, setUsageRecords] = useState({});
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        const storedAgents = getAllAgents();
        if (storedAgents.length === 0) {
            initializeFromData(
                teacherAgentsData,
                agentStatisticsData,
                agentCommentsData,
                teacherAgentDetailPageData.usageRecords,
                teacherAgentCommentsPageData.auditStatusMap
            );
        }
        loadData();
    }, []);

    const loadData = () => {
        const agentsData = getAllAgents();
        const statsData = getAllStatistics();
        const commentsData = getAllComments();
        const usageData = getAllUsageRecords();

        setAgents(agentsData);
        setStatistics(statsData);
        setAllComments(commentsData);
        setUsageRecords(usageData);
    };

    // 计算总体统计
    const totalUsage = Object.values(statistics).reduce((sum, s) => sum + (s.totalUsage || 0), 0);
    const averageRating = (Object.values(statistics).reduce((sum, s) => sum + parseFloat(s.averageRating || 0), 0) /
        (Object.keys(statistics).length || 1)).toFixed(1);
    const totalRatings = Object.values(statistics).reduce((sum, s) => sum + (s.totalRatings || 0), 0);
    const totalComments = allComments.length;
    const totalStudents = Object.values(usageRecords || {}).reduce((sum, list) => sum + (list?.length || 0), 0);

    // 准备智能体使用排行数据
    const agentUsageRanking = agents
        .map(agent => ({
            name: agent.name,
            usage: statistics[agent.id]?.totalUsage || 0,
            rating: parseFloat(statistics[agent.id]?.averageRating || 0),
            color: agent.color
        }))
        .sort((a, b) => b.usage - a.usage)
        .slice(0, 10);

    // 准备评分分布数据
    const allRatingDistribution = {};
    Object.values(statistics).forEach(stat => {
        Object.entries(stat.ratingDistribution || {}).forEach(([rating, count]) => {
            allRatingDistribution[rating] = (allRatingDistribution[rating] || 0) + count;
        });
    });

    const ratingData = Object.entries(allRatingDistribution).map(([rating, count]) => ({
        rating: `${rating}星`,
        count
    }));

    // 准备时间趋势数据（合并所有智能体的数据）
    const usageTrendData = {};
    Object.values(statistics).forEach(stat => {
        (stat.usageByDate || []).forEach(item => {
            if (!usageTrendData[item.date]) {
                usageTrendData[item.date] = 0;
            }
            usageTrendData[item.date] += item.count;
        });
    });

    const trendData = Object.entries(usageTrendData)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-14);

    const adoptionMatrix = teacherAgentStatisticsOverviewData.adoptionMatrix || [];
    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

    const handleExportExcel = () => {
        try {
            setExporting(true);
            const overviewSheet = agents.map((agent) => {
                const stats = statistics[agent.id] || {};
                const peakHour = (stats.popularTimes || []).slice().sort((a, b) => (b?.count || 0) - (a?.count || 0))[0];
                const fiveStarRatio = stats.totalRatings
                    ? (((stats.ratingDistribution?.[5] || 0) / stats.totalRatings) * 100).toFixed(1)
                    : '0.0';

                return {
                    智能体: agent.name,
                    总使用次数: stats.totalUsage || 0,
                    平均评分: stats.averageRating || 0,
                    评价人数: stats.totalRatings || 0,
                    留言数: stats.totalComments || 0,
                    学生覆盖人数: (usageRecords[agent.id] || []).length,
                    '五星占比(%)': fiveStarRatio,
                    高频时段: peakHour ? `${peakHour.hour}:00` : '—'
                };
            });

            const ratingSheet = agents.flatMap((agent) => {
                const stats = statistics[agent.id] || {};
                return Object.entries(stats.ratingDistribution || {}).map(([rating, count]) => ({
                    智能体: agent.name,
                    评分: `${rating}星`,
                    次数: count,
                    占比: stats.totalRatings ? `${((count / stats.totalRatings) * 100).toFixed(1)}%` : '0%'
                }));
            });

            const rankingSheet = agentUsageRanking.map((item, index) => ({
                排名: index + 1,
                智能体: item.name,
                使用次数: item.usage,
                平均评分: item.rating
            }));

            const trendSheet = trendData.map((item) => ({
                日期: item.date,
                使用次数: item.count
            }));

            exportExcelFile(
                [
                    { name: '智能体概览', data: overviewSheet },
                    { name: '评分分布', data: ratingSheet },
                    { name: '使用排行', data: rankingSheet },
                    { name: '整体趋势', data: trendSheet }
                ],
                buildExcelFileName('智能体大盘导出')
            );
        } catch (error) {
            console.error('导出失败:', error);
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* 头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => navigate('/teacher')}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                whileHover={{ x: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={24} className="text-gray-700" />
                            </motion.button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">智能体统计</h1>
                                <p className="text-gray-600 mt-1">查看所有智能体的使用数据和分析</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={handleExportExcel}
                                disabled={exporting}
                                className="px-4 py-3 bg-white/80 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <DownloadCloud size={18} />
                                {exporting ? '导出中...' : '导出大盘'}
                            </motion.button>
                            <motion.button
                                onClick={() => navigate('/teacher/agents/manage')}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Settings size={20} />
                                智能体管理
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 核心指标 */}
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    <MetricCard
                        icon={BarChart3}
                        label="智能体总数"
                        value={agents.length}
                        color="blue"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="总使用次数"
                        value={totalUsage}
                        color="green"
                    />
                    <MetricCard
                        icon={Star}
                        label="平均评分"
                        value={averageRating}
                        color="yellow"
                    />
                    <MetricCard
                        icon={Users}
                        label="覆盖学生数"
                        value={totalStudents}
                        color="green"
                    />
                    <MetricCard
                        icon={MessageCircle}
                        label="留言总数"
                        value={totalComments}
                        color="purple"
                    />
                </div>

                {/* 高光场景卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {teacherAgentStatisticsOverviewData.impactHighlights.map((item) => (
                        <div
                            key={item.title}
                            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} text-white p-5 shadow-lg shadow-blue-100/40`}
                        >
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff,_transparent_45%)]" />
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white/80">{item.subtitle}</p>
                                    <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                                </div>
                                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                            </div>
                            <div className="relative mt-4 flex items-end gap-2">
                                <span className="text-4xl font-black tracking-tight drop-shadow-sm">{item.value}</span>
                                <span className="text-sm opacity-80 mb-1">{item.unit}</span>
                            </div>
                            <div className="relative mt-3 text-sm flex items-center gap-2">
                                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                    {item.trend}
                                </span>
                                <span className="opacity-80">环比提升</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 使用趋势 */}
                <div className="mb-6">
                    <GlassCard variant="standard" className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar className="text-blue-600" size={20} />
                            整体使用趋势（最近14天）
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#6b7280"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getMonth() + 1}/${date.getDate()}`;
                                    }}
                                />
                                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="使用次数"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* 智能体使用排行 */}
                    <GlassCard variant="standard" className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Award className="text-orange-600" size={20} />
                            智能体使用排行 TOP 10
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={agentUsageRanking} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 12 }} />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    stroke="#6b7280"
                                    tick={{ fontSize: 12 }}
                                    width={100}
                                />
                                <Tooltip />
                                <Bar dataKey="usage" name="使用次数" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>

                    {/* 整体评分分布 */}
                    <GlassCard variant="standard" className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Star className="text-yellow-600" size={20} />
                            整体评分分布
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={ratingData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ rating, count, percent }) =>
                                        `${rating}: ${count} (${(percent * 100).toFixed(0)}%)`
                                    }
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {ratingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </div>

                {/* 年级/场景覆盖 */}
                <GlassCard variant="standard" className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Users className="text-blue-600" size={20} />
                            学段覆盖与满意度
                        </h3>
                        <span className="text-sm text-gray-500">活跃度与满意度双维度对齐</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {adoptionMatrix.map((item) => (
                            <div
                                key={item.segment}
                                className="p-4 rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-slate-500">覆盖群体</p>
                                        <p className="text-base font-bold text-slate-800">{item.segment}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                                        {item.delta}
                                    </span>
                                </div>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>活跃度</span>
                                        <span className="font-semibold text-slate-700">{item.activeRate}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                            style={{ width: `${item.activeRate}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>满意度</span>
                                        <span className="font-semibold text-slate-700">{item.satisfaction}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                                            style={{ width: `${(item.satisfaction / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* 智能体列表 */}
                <GlassCard variant="standard" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Users className="text-purple-600" size={20} />
                            智能体详细统计
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">智能体</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">使用次数</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">覆盖学生</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">平均评分</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">评价人数</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-700">留言数</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-700">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agents.map((agent) => {
                                    const stats = statistics[agent.id] || {};
                                    const comments = allComments.filter(c => c.agentId === agent.id);
                                    return (
                                        <tr key={agent.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 object-contain" />
                                                    <div>
                                                        <div className="font-medium text-gray-800">{agent.name}</div>
                                                        <div className="text-xs text-gray-500">{agent.specialty?.[0]}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center py-3 px-4 text-gray-700 font-semibold">
                                                {stats.totalUsage || 0}
                                            </td>
                                            <td className="text-center py-3 px-4 text-gray-700 font-semibold">
                                                {(usageRecords[agent.id] || []).length}
                                            </td>
                                            <td className="text-center py-3 px-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                    <span className="font-semibold text-gray-700">{stats.averageRating || 0}</span>
                                                </div>
                                            </td>
                                            <td className="text-center py-3 px-4 text-gray-700">
                                                {stats.totalRatings || 0}
                                            </td>
                                            <td className="text-center py-3 px-4 text-gray-700">
                                                {comments.length}
                                            </td>
                                            <td className="text-right py-3 px-4">
                                                <button
                                                    onClick={() => navigate(`/teacher/agent/${agent.id}`)}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    查看详情
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </main>
        </div>
    );
};

// 指标卡片组件
const MetricCard = ({ icon: Icon, label, value, color }) => {
    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        green: 'from-green-500 to-emerald-500',
        yellow: 'from-yellow-500 to-orange-500',
        purple: 'from-purple-500 to-pink-500'
    };
    const gradient = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard variant="standard" hover={true} className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Icon className="text-white" size={28} />
                    </motion.div>
                </div>
                <div className="text-sm text-gray-500 mb-2 font-medium">{label}</div>
                <div className="text-4xl font-bold text-gray-800 tabular-nums">{value}</div>
            </GlassCard>
        </motion.div>
    );
};

export default TeacherAgentStatisticsOverview;

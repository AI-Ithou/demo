import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, Star, Users, MessageCircle,
    Calendar, Award, BarChart3, Settings
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { GlassCard, GradientButton } from '../components/uiverse';
import {
    getAllAgents,
    getAllStatistics,
    getAllComments
} from '../utils/agentStorage';

const TeacherAgentStatisticsOverview = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const agentsData = getAllAgents();
        const statsData = getAllStatistics();
        const commentsData = getAllComments();

        setAgents(agentsData);
        setStatistics(statsData);
        setAllComments(commentsData);
    };

    // 计算总体统计
    const totalUsage = Object.values(statistics).reduce((sum, s) => sum + (s.totalUsage || 0), 0);
    const averageRating = (Object.values(statistics).reduce((sum, s) => sum + parseFloat(s.averageRating || 0), 0) /
        (Object.keys(statistics).length || 1)).toFixed(1);
    const totalRatings = Object.values(statistics).reduce((sum, s) => sum + (s.totalRatings || 0), 0);
    const totalComments = allComments.length;

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

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

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
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 核心指标 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                        icon={MessageCircle}
                        label="留言总数"
                        value={totalComments}
                        color="purple"
                    />
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

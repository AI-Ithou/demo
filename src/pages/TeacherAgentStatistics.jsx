import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, Users, MessageCircle, Star,
    Calendar, Clock, Award
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { GlassCard } from '../components/uiverse';
import { getAgentById, getAgentStatistics } from '../utils/agentStorage';

const TeacherAgentStatistics = () => {
    const navigate = useNavigate();
    const { agentId } = useParams();
    const [agent, setAgent] = useState(null);
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const agentData = getAgentById(agentId);
        const statsData = getAgentStatistics(agentId);
        setAgent(agentData);
        setStatistics(statsData);
    }, [agentId]);

    if (!agent || !statistics) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">加载中...</p>
            </div>
        );
    }

    // 准备图表数据
    const ratingData = Object.entries(statistics.ratingDistribution || {}).map(([rating, count]) => ({
        rating: `${rating}星`,
        count
    }));

    const usageTrendData = (statistics.usageByDate || []).slice(-14); // 最近14天

    const popularTimesData = (statistics.popularTimes || [])
        .sort((a, b) => a.hour - b.hour)
        .map(item => ({
            ...item,
            hourLabel: `${item.hour}:00`
        }));

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* 头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => navigate('/teacher/agents')}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </motion.button>
                        <div className="flex items-center gap-4 flex-1">
                            <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{agent.name} - 统计数据</h1>
                                <p className="text-gray-600 mt-1">数据分析与使用洞察</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 核心指标 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        icon={TrendingUp}
                        label="总使用次数"
                        value={statistics.totalUsage || 0}
                        color="blue"
                    />
                    <MetricCard
                        icon={Star}
                        label="平均评分"
                        value={`${statistics.averageRating || 0}`}
                        color="yellow"
                    />
                    <MetricCard
                        icon={Users}
                        label="评价人数"
                        value={statistics.totalRatings || 0}
                        color="green"
                    />
                    <MetricCard
                        icon={MessageCircle}
                        label="留言总数"
                        value={statistics.totalComments || 0}
                        color="purple"
                    />
                </div>

                {/* 使用趋势图 */}
                <GlassCard variant="standard" className="p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Calendar className="text-blue-600" size={24} />
                        使用趋势（最近14天）
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={usageTrendData}>
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
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                name="使用次数"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </GlassCard>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* 评分分布 */}
                    <GlassCard variant="standard" className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Award className="text-yellow-600" size={24} />
                            评分分布
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ratingData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ rating, count, percent }) =>
                                        `${rating}: ${count} (${(percent * 100).toFixed(0)}%)`
                                    }
                                    outerRadius={100}
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

                    {/* 热门使用时段 */}
                    <GlassCard variant="standard" className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Clock className="text-orange-600" size={24} />
                            热门使用时段
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={popularTimesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="hourLabel"
                                    stroke="#6b7280"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    name="使用次数"
                                    fill="#f97316"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </div>

                {/* 详细统计 */}
                <GlassCard variant="standard" className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">详细统计</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700 mb-3">评分明细</h3>
                            {Object.entries(statistics.ratingDistribution || {})
                                .sort((a, b) => b[0] - a[0])
                                .map(([rating, count]) => (
                                    <div key={rating} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-gray-700">{rating} 星</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                                    style={{
                                                        width: `${(count / (statistics.totalRatings || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800 min-w-[3rem] text-right">
                                                {count} 次
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700 mb-3">使用统计</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">日均使用次数</span>
                                    <span className="font-bold text-gray-800">
                                        {((statistics.totalUsage || 0) / 30).toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">评分参与率</span>
                                    <span className="font-bold text-gray-800">
                                        {((statistics.totalRatings / (statistics.totalUsage || 1)) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">留言比例</span>
                                    <span className="font-bold text-gray-800">
                                        {((statistics.totalComments / (statistics.totalUsage || 1)) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">满意度（4-5星）</span>
                                    <span className="font-bold text-green-600">
                                        {(((statistics.ratingDistribution[4] || 0) + (statistics.ratingDistribution[5] || 0)) /
                                            (statistics.totalRatings || 1) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </main>
        </div>
    );
};

// 指标卡片
const MetricCard = ({ icon: Icon, label, value, color }) => {
    const colorMap = {
        blue: { gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-glow-blue' },
        yellow: { gradient: 'from-yellow-500 to-orange-500', glow: 'shadow-glow-yellow' },
        green: { gradient: 'from-green-500 to-emerald-500', glow: 'shadow-glow-green' },
        purple: { gradient: 'from-purple-500 to-pink-500', glow: 'shadow-glow-purple' }
    };
    const colors = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <GlassCard variant="standard" hover={true} className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center ${colors.glow}`}
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

export default TeacherAgentStatistics;

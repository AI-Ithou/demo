import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Settings, BarChart3, MessageSquare, Star,
    TrendingUp, Users, Award, Calendar, Clock, MessageCircle
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { GlassCard } from '../components/uiverse';
import CommentCard from '../components/CommentCard';
import {
    getAgentById,
    getAgentStatistics,
    getAgentComments,
    addReply,
    likeComment,
    deleteComment
} from '../utils/agentStorage';

const TeacherAgentDetailPage = () => {
    const navigate = useNavigate();
    const { agentId } = useParams();
    const [activeTab, setActiveTab] = useState('statistics');
    const [agent, setAgent] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        loadData();
    }, [agentId]);

    const loadData = () => {
        const agentData = getAgentById(agentId);
        const statsData = getAgentStatistics(agentId);
        const commentsData = getAgentComments(agentId);

        setAgent(agentData);
        setStatistics(statsData);
        setComments(commentsData);
    };

    const handleReply = (commentId, replyText) => {
        addReply(commentId, {
            teacherId: 'teacher-001',
            teacherName: '高田由',
            content: replyText
        });
        loadData();
    };

    const handleLike = (commentId) => {
        likeComment(commentId, 'teacher-001');
        loadData();
    };

    const handleDelete = (commentId) => {
        if (window.confirm('确定要删除这条留言吗？')) {
            deleteComment(commentId);
            loadData();
        }
    };

    if (!agent || !statistics) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">加载中...</p>
            </div>
        );
    }

    const tabs = [
        { id: 'statistics', label: '数据统计', icon: BarChart3 },
        { id: 'comments', label: '学生留言', icon: MessageSquare },
        { id: 'manage', label: '管理设置', icon: Settings }
    ];

    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        orange: 'from-orange-500 to-amber-500',
        cyan: 'from-cyan-500 to-teal-500',
        amber: 'from-amber-500 to-yellow-500'
    };
    const gradient = colorMap[agent.color] || colorMap.blue;

    // 准备图表数据
    const ratingData = Object.entries(statistics.ratingDistribution || {}).map(([rating, count]) => ({
        rating: `${rating}星`,
        count
    }));

    const usageTrendData = (statistics.usageByDate || []).slice(-14);

    const popularTimesData = (statistics.popularTimes || [])
        .sort((a, b) => a.hour - b.hour)
        .map(item => ({
            ...item,
            hourLabel: `${item.hour}:00`
        }));

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 头部 */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => navigate('/teacher/agents/manage')}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </motion.button>
                        <span className="text-slate-600">返回智能体管理</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* 智能体信息卡片 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
                    <div className="flex items-start gap-6 p-6">
                        <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-32 h-32 object-contain flex-shrink-0"
                        />
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {agent.specialty?.slice(0, 3).map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-3 py-1 bg-gradient-to-r ${gradient} bg-opacity-10 text-gray-700 text-xs font-semibold rounded-full`}
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-800 mb-2">{agent.name}</h1>
                                    <p className="text-sm text-slate-600 mb-3">{agent.description}</p>
                                    <div className="flex items-center gap-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">{statistics.averageRating}</span>
                                            <span className="text-slate-400">({statistics.totalRatings})</span>
                                        </div>
                                        <span>使用次数：{statistics.totalUsage}</span>
                                        <span>留言数：{statistics.totalComments}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/teacher/agents/manage`)}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                >
                                    智能体管理
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 标签页 */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center border-b border-slate-200">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${activeTab === tab.id
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-6 bg-slate-50">
                        {/* 数据统计标签页 */}
                        {activeTab === 'statistics' && (
                            <div className="space-y-6">
                                {/* 核心指标 */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                <div className="bg-white rounded-xl border border-slate-200 p-6">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Calendar className="text-blue-600" size={20} />
                                        使用趋势（最近14天）
                                    </h3>
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
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* 评分分布 */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <Award className="text-yellow-600" size={20} />
                                            评分分布
                                        </h3>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={ratingData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ rating, count, percent }) =>
                                                        `${rating}: ${count} (${(percent * 100).toFixed(0)}%)`
                                                    }
                                                    outerRadius={80}
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
                                    </div>

                                    {/* 热门使用时段 */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <Clock className="text-orange-600" size={20} />
                                            热门使用时段
                                        </h3>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={popularTimesData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis dataKey="hourLabel" stroke="#6b7280" tick={{ fontSize: 12 }} />
                                                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                                                <Tooltip />
                                                <Bar dataKey="count" name="使用次数" fill="#f97316" radius={[8, 8, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 学生留言标签页 */}
                        {activeTab === 'comments' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-800">
                                        共 {comments.length} 条留言
                                    </h3>
                                </div>
                                {comments.map((comment) => (
                                    <CommentCard
                                        key={comment.id}
                                        comment={comment}
                                        onLike={handleLike}
                                        onReply={handleReply}
                                        onDelete={handleDelete}
                                        showActions={true}
                                        currentUserId="teacher-001"
                                    />
                                ))}
                                {comments.length === 0 && (
                                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                                        <p className="text-slate-400">暂无留言</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 管理设置标签页 */}
                        {activeTab === 'manage' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div
                                    onClick={() => navigate(`/teacher/agents/manage`)}
                                    className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3`}>
                                        <Settings size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">
                                        智能体管理
                                    </h3>
                                    <p className="text-sm text-slate-600">创建、编辑和删除智能体</p>
                                </div>

                                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-50">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                                        <Star size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">智能体培训</h3>
                                    <p className="text-sm text-slate-600">优化智能体回复质量</p>
                                    <span className="text-xs text-slate-400 mt-2 block">即将上线</span>
                                </div>

                                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-50">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                                        <BarChart3 size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">导出数据</h3>
                                    <p className="text-sm text-slate-600">导出使用数据和分析报告</p>
                                    <span className="text-xs text-slate-400 mt-2 block">即将上线</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

// 指标卡片组件
const MetricCard = ({ icon: Icon, label, value, color }) => {
    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        yellow: 'from-yellow-500 to-orange-500',
        green: 'from-green-500 to-emerald-500',
        purple: 'from-purple-500 to-pink-500'
    };
    const gradient = colorMap[color];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                </div>
            </div>
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
        </div>
    );
};

export default TeacherAgentDetailPage;

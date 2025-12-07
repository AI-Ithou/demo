import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Settings, BarChart3, MessageSquare, Star,
    TrendingUp, Users, Award, Calendar, Clock, MessageCircle, UploadCloud, DownloadCloud, Filter
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CommentCard from '../components/CommentCard';
import {
    getAgentById,
    getAgentStatistics,
    getAgentComments,
    getAgentUsageRecords,
    mergeUsageRecords,
    addReply,
    likeComment,
    deleteComment,
    initializeFromData
} from '../utils/agentStorage';
import teacherAgentsData from '../data/teacher_agents_data';
import agentStatisticsData from '../data/agent_statistics_data';
import agentCommentsData from '../data/agent_comments_data';
import teacherAgentDetailPageData from '../data/TeacherAgentDetailPageData';
import teacherAgentCommentsPageData from '../data/TeacherAgentCommentsPageData';
import { readExcelFile, exportExcelFile, buildExcelFileName, buildTemplateRow } from '../utils/excelUtils';

const TeacherAgentDetailPage = () => {
    const navigate = useNavigate();
    const { agentId } = useParams();
    const [activeTab, setActiveTab] = useState('statistics');
    const [agent, setAgent] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [comments, setComments] = useState([]);
    const [studentUsage, setStudentUsage] = useState([]);
    const [usageSearch, setUsageSearch] = useState('');
    const [usageRiskFilter, setUsageRiskFilter] = useState('all');
    const [usageSort, setUsageSort] = useState('usage');
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const exists = getAgentById(agentId);
        if (!exists) {
            initializeFromData(
                teacherAgentsData,
                agentStatisticsData,
                agentCommentsData,
                teacherAgentDetailPageData.usageRecords,
                teacherAgentCommentsPageData.auditStatusMap
            );
        }
        loadData();
    }, [agentId]);

    const loadData = () => {
        const agentData = getAgentById(agentId);
        const statsData = getAgentStatistics(agentId);
        const commentsData = getAgentComments(agentId);
        let usageData = getAgentUsageRecords(agentId) || [];

        if ((!usageData || usageData.length === 0) && teacherAgentDetailPageData.usageRecords[agentId]) {
            usageData = mergeUsageRecords(agentId, teacherAgentDetailPageData.usageRecords[agentId]);
        }

        setAgent(agentData);
        setStatistics(statsData);
        setComments(commentsData);
        setStudentUsage(usageData || []);
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

    const normalizeUsageRow = (row) => ({
        studentId: row.studentId || row['studentId'] || row['学生编号'] || '',
        studentName: row.studentName || row['studentName'] || row['学生姓名'] || '未命名学生',
        className: row.className || row['className'] || row['班级'] || '',
        usageCount: Number(row.usageCount || row['usageCount'] || 0),
        avgDuration: Number(row.avgDuration || row['avgDuration'] || 0),
        activeDays: Number(row.activeDays || row['activeDays'] || 0),
        lastActive: row.lastActive || row['lastActive'] || row['最近活跃'] || '',
        rating: Number(row.rating || row['rating'] || row['评分'] || 0),
        completionRate: Number(row.completionRate || row['completionRate'] || row['完成度'] || 0),
        lastTopic: row.lastTopic || row['lastTopic'] || row['知识点'] || '',
        device: row.device || row['device'] || row['设备'] || '',
        channel: row.channel || row['channel'] || row['渠道'] || '',
        tags: Array.isArray(row.tags)
            ? row.tags
            : (row.tags || row['tags'] || '').toString().split(/[，,、]/).filter(Boolean),
        risk: row.risk === true || row.risk === 'true' || row.risk === '是' || row.risk === '1'
    });

    const handleImportUsage = async (file) => {
        if (!file) return;
        setImporting(true);
        try {
            const rows = await readExcelFile(file);
            const normalized = rows.map(normalizeUsageRow).filter((row) => row.studentId);
            const merged = mergeUsageRecords(agentId, normalized);
            setStudentUsage(merged);
        } catch (error) {
            console.error('导入学生使用数据失败:', error);
        } finally {
            setImporting(false);
        }
    };

    const handleExportUsage = () => {
        const exportRows = studentUsage.map((record) => ({
            学生学号: record.studentId,
            学生姓名: record.studentName,
            班级: record.className,
            使用次数: record.usageCount,
            平均时长分钟: record.avgDuration,
            活跃天数: record.activeDays,
            最近活跃: record.lastActive,
            完成度: record.completionRate,
            评分: record.rating,
            设备: record.device,
            渠道: record.channel,
            关键词标签: (record.tags || []).join(' / '),
            风险关注: record.risk ? '是' : '否'
        }));

        exportExcelFile(
            [{ name: `${agent.name}-学生使用`, data: exportRows }],
            buildExcelFileName(`${agent.name}-学生使用导出`)
        );
    };

    const handleDownloadTemplate = () => {
        const row = buildTemplateRow(teacherAgentDetailPageData.importTemplateHeaders);
        exportExcelFile(
            [{ name: '导入模板', data: [row] }],
            buildExcelFileName(`${agent.name}-学生使用导入模板`)
        );
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            await handleImportUsage(file);
            event.target.value = '';
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
    const usageSummary = {
        activeStudents: studentUsage.length,
        riskyStudents: studentUsage.filter((record) => record.risk).length,
        avgCompletion: studentUsage.length
            ? Math.round(studentUsage.reduce((sum, record) => sum + (record.completionRate || 0), 0) / studentUsage.length)
            : 0,
        avgDuration: studentUsage.length
            ? (studentUsage.reduce((sum, record) => sum + (record.avgDuration || 0), 0) / studentUsage.length).toFixed(1)
            : 0
    };

    const filteredUsage = studentUsage
        .filter((record) => {
            if (!usageSearch) return true;
            const keyword = usageSearch.toLowerCase();
            return (
                record.studentName?.toLowerCase().includes(keyword) ||
                record.className?.toLowerCase().includes(keyword) ||
                record.lastTopic?.toLowerCase().includes(keyword)
            );
        })
        .filter((record) => {
            if (usageRiskFilter === 'risk') return record.risk;
            if (usageRiskFilter === 'healthy') return !record.risk;
            return true;
        })
        .sort((a, b) => {
            switch (usageSort) {
                case 'completion':
                    return (b.completionRate || 0) - (a.completionRate || 0);
                case 'active':
                    return (b.activeDays || 0) - (a.activeDays || 0);
                default:
                    return (b.usageCount || 0) - (a.usageCount || 0);
            }
        });

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

                                {/* 学生使用概览 */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">学生使用全景</h3>
                                            <p className="text-sm text-slate-500">所有数据仅存于浏览器缓存，可随时导入导出 Excel</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".xlsx,.xls"
                                                className="hidden"
                                                onChange={handleFileInputChange}
                                            />
                                            <button
                                                onClick={handleDownloadTemplate}
                                                className="px-4 py-2 text-sm bg-slate-50 text-slate-700 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                                            >
                                                <DownloadCloud size={16} />
                                                下载模板
                                            </button>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={importing}
                                                className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-1.5 disabled:opacity-60"
                                            >
                                                <UploadCloud size={16} />
                                                {importing ? '导入中...' : '导入 Excel'}
                                            </button>
                                            <button
                                                onClick={handleExportUsage}
                                                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                                            >
                                                <DownloadCloud size={16} />
                                                导出学生使用
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <UsageStat label="活跃学生" value={usageSummary.activeStudents} color="from-blue-500 to-cyan-500" />
                                        <UsageStat label="风险关注" value={usageSummary.riskyStudents} color="from-amber-500 to-orange-500" />
                                        <UsageStat label="平均完成度" value={`${usageSummary.avgCompletion}%`} color="from-emerald-500 to-green-500" />
                                        <UsageStat label="平均时长(分钟)" value={usageSummary.avgDuration} color="from-purple-500 to-pink-500" />
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <div className="flex-1 relative">
                                            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                value={usageSearch}
                                                onChange={(e) => setUsageSearch(e.target.value)}
                                                placeholder="搜索学生姓名、班级或知识点..."
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        </div>
                                        <select
                                            value={usageRiskFilter}
                                            onChange={(e) => setUsageRiskFilter(e.target.value)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            <option value="all">全部学生</option>
                                            <option value="risk">仅关注人群</option>
                                            <option value="healthy">表现稳定</option>
                                        </select>
                                        <select
                                            value={usageSort}
                                            onChange={(e) => setUsageSort(e.target.value)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            <option value="usage">按使用次数</option>
                                            <option value="completion">按完成度</option>
                                            <option value="active">按活跃天数</option>
                                        </select>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-200">
                                                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">学生</th>
                                                    <th className="text-left py-3 px-4 text-slate-600 font-semibold">班级 / 标签</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">使用次数</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">活跃天数</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">完成度</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">平均时长</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">最近活跃</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">设备 / 渠道</th>
                                                    <th className="text-center py-3 px-4 text-slate-600 font-semibold">风险</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsage.map((record) => (
                                                    <tr key={record.studentId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">
                                                                    {record.studentName?.[0] || '学'}
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-slate-800">{record.studentName}</div>
                                                                    <div className="text-xs text-slate-500">ID: {record.studentId}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="text-sm text-slate-700">{record.className}</div>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {(record.tags || []).map((tag, idx) => (
                                                                    <span key={idx} className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-600">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="text-center py-3 px-4 text-slate-800 font-semibold">{record.usageCount || 0}</td>
                                                        <td className="text-center py-3 px-4 text-slate-800">{record.activeDays || 0}</td>
                                                        <td className="text-center py-3 px-4">
                                                            <div className="w-28 mx-auto">
                                                                <div className="text-xs font-semibold text-slate-700 mb-1">{record.completionRate || 0}%</div>
                                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                                                                        style={{ width: `${record.completionRate || 0}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center py-3 px-4 text-slate-800">{record.avgDuration || 0} 分钟</td>
                                                        <td className="text-center py-3 px-4 text-slate-600">{record.lastActive || '—'}</td>
                                                        <td className="text-center py-3 px-4 text-slate-600">
                                                            <div>{record.device || '—'}</div>
                                                            <div className="text-xs text-slate-500">{record.channel || ''}</div>
                                                        </td>
                                                        <td className="text-center py-3 px-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.risk
                                                                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                                }`}>
                                                                {record.risk ? '关注' : '稳定'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredUsage.length === 0 && (
                                                    <tr>
                                                        <td colSpan={9} className="py-10 text-center text-slate-400">
                                                            暂无数据，可先导入 Excel
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

const UsageStat = ({ label, value, color }) => (
    <div className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm">
        <div className="text-xs text-slate-500 mb-1">{label}</div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${color}`}>
            {value}
        </div>
    </div>
);

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

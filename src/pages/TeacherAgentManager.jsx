import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, ArrowLeft, Edit, Trash2, BarChart3, MessageSquare,
    Search, Filter, X
} from 'lucide-react';
import { GlassCard, GradientButton } from '../components/uiverse';
import AgentCard from '../components/AgentCard';
import {
    getAllAgents,
    getAllStatistics,
    createAgent,
    updateAgent,
    deleteAgent,
    initializeFromData
} from '../utils/agentStorage';
import teacherAgentsData from '../data/teacher_agents_data';
import agentStatisticsData from '../data/agent_statistics_data';
import agentCommentsData from '../data/agent_comments_data';
import teacherAgentDetailPageData from '../data/TeacherAgentDetailPageData';
import teacherAgentCommentsPageData from '../data/TeacherAgentCommentsPageData';

const TeacherAgentManager = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingAgent, setEditingAgent] = useState(null);

    // 初始化数据
    useEffect(() => {
        // 如果localStorage中没有数据，从初始数据初始化
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
        setAgents(agentsData);
        setStatistics(statsData);
    };

    // 过滤智能体
    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterSpecialty === 'all' ||
            agent.specialty.some(s => s.includes(filterSpecialty));
        return matchesSearch && matchesFilter;
    });

    // 获取所有专业领域
    const allSpecialties = ['all', ...new Set(agents.flatMap(a => a.specialty))];

    const handleDelete = (agentId) => {
        if (window.confirm('确定要删除这个智能体吗？')) {
            deleteAgent(agentId);
            loadData();
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
                                <h1 className="text-3xl font-bold text-gray-800">智能体管理</h1>
                                <p className="text-gray-600 mt-1">创建和管理AI学习助手</p>
                            </div>
                        </div>
                        <motion.button
                            onClick={() => {
                                setEditingAgent(null);
                                setShowCreateModal(true);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus size={20} />
                            创建智能体
                        </motion.button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        label="智能体总数"
                        value={agents.length}
                        color="blue"
                        icon={BarChart3}
                    />
                    <StatCard
                        label="总使用次数"
                        value={Object.values(statistics).reduce((sum, s) => sum + (s.totalUsage || 0), 0)}
                        color="green"
                        icon={BarChart3}
                    />
                    <StatCard
                        label="平均评分"
                        value={(Object.values(statistics).reduce((sum, s) => sum + parseFloat(s.averageRating || 0), 0) /
                            Object.keys(statistics).length || 0).toFixed(1)}
                        color="orange"
                        icon={BarChart3}
                    />
                    <StatCard
                        label="总留言数"
                        value={Object.values(statistics).reduce((sum, s) => sum + (s.totalComments || 0), 0)}
                        color="purple"
                        icon={MessageSquare}
                    />
                </div>

                {/* 搜索和筛选 */}
                <GlassCard variant="standard" className="p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 搜索框 */}
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="搜索智能体名称或描述..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* 专业筛选 */}
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-500" />
                            <select
                                value={filterSpecialty}
                                onChange={(e) => setFilterSpecialty(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                {allSpecialties.map(spec => (
                                    <option key={spec} value={spec}>
                                        {spec === 'all' ? '全部专业' : spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* 智能体列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.map((agent, idx) => (
                        <div key={agent.id} className="relative">
                            <AgentCard
                                agent={agent}
                                statistics={statistics[agent.id]}
                                variant="teacher"
                                onClick={() => navigate(`/teacher/agent/${agent.id}`)}
                            />
                            {/* 操作按钮 */}
                            <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/teacher/agent/${agent.id}/statistics`);
                                    }}
                                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-blue-50 rounded-lg shadow-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="查看统计"
                                >
                                    <BarChart3 size={16} className="text-blue-600" />
                                </motion.button>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/teacher/agent/${agent.id}/comments`);
                                    }}
                                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-purple-50 rounded-lg shadow-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="查看留言"
                                >
                                    <MessageSquare size={16} className="text-purple-600" />
                                </motion.button>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingAgent(agent);
                                        setShowCreateModal(true);
                                    }}
                                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-green-50 rounded-lg shadow-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="编辑"
                                >
                                    <Edit size={16} className="text-green-600" />
                                </motion.button>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(agent.id);
                                    }}
                                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-red-50 rounded-lg shadow-sm transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="删除"
                                >
                                    <Trash2 size={16} className="text-red-600" />
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">暂无智能体</p>
                    </div>
                )}
            </main>

            {/* 创建/编辑模态框 */}
            <CreateAgentModal
                show={showCreateModal}
                agent={editingAgent}
                onClose={() => {
                    setShowCreateModal(false);
                    setEditingAgent(null);
                }}
                onSave={() => {
                    loadData();
                    setShowCreateModal(false);
                    setEditingAgent(null);
                }}
            />
        </div>
    );
};

// 统计卡片组件
const StatCard = ({ label, value, color, icon: Icon }) => {
    const colorMap = {
        blue: { gradient: 'from-blue-500 to-blue-600', glow: 'shadow-glow-blue' },
        green: { gradient: 'from-green-500 to-green-600', glow: 'shadow-glow-green' },
        orange: { gradient: 'from-orange-500 to-orange-600', glow: 'shadow-glow-orange' },
        purple: { gradient: 'from-purple-500 to-purple-600', glow: 'shadow-glow-purple' }
    };
    const colors = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

// 创建/编辑智能体模态框
const CreateAgentModal = ({ show, agent, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        specialty: [],
        capabilities: [],
        greeting: '',
        personality: '',
        color: 'blue'
    });
    const [specialtyInput, setSpecialtyInput] = useState('');
    const [capabilityInput, setCapabilityInput] = useState('');

    useEffect(() => {
        if (agent) {
            setFormData({
                name: agent.name || '',
                description: agent.description || '',
                specialty: agent.specialty || [],
                capabilities: agent.capabilities || [],
                greeting: agent.greeting || '',
                personality: agent.personality || '',
                color: agent.color || 'blue'
            });
        } else {
            setFormData({
                name: '',
                description: '',
                specialty: [],
                capabilities: [],
                greeting: '',
                personality: '',
                color: 'blue'
            });
        }
    }, [agent]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const agentData = {
            ...formData,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.name}`
        };

        if (agent) {
            updateAgent(agent.id, agentData);
        } else {
            createAgent(agentData);
        }

        onSave();
    };

    const addSpecialty = () => {
        if (specialtyInput && !formData.specialty.includes(specialtyInput)) {
            setFormData({
                ...formData,
                specialty: [...formData.specialty, specialtyInput]
            });
            setSpecialtyInput('');
        }
    };

    const removeSpecialty = (spec) => {
        setFormData({
            ...formData,
            specialty: formData.specialty.filter(s => s !== spec)
        });
    };

    const addCapability = () => {
        if (capabilityInput && !formData.capabilities.includes(capabilityInput)) {
            setFormData({
                ...formData,
                capabilities: [...formData.capabilities, capabilityInput]
            });
            setCapabilityInput('');
        }
    };

    const removeCapability = (cap) => {
        setFormData({
            ...formData,
            capabilities: formData.capabilities.filter(c => c !== cap)
        });
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* 背景遮罩 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* 模态框内容 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    <GlassCard variant="standard" className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {agent ? '编辑智能体' : '创建新智能体'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 名称 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    智能体名称 *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="例如：数学小助手"
                                />
                            </div>

                            {/* 描述 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    描述 *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                    rows={3}
                                    placeholder="简要描述智能体的特点和功能..."
                                />
                            </div>

                            {/* 专业领域 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    专业领域
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={specialtyInput}
                                        onChange={(e) => setSpecialtyInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="输入专业领域后按回车..."
                                    />
                                    <button
                                        type="button"
                                        onClick={addSpecialty}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        添加
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.specialty.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-2"
                                        >
                                            {spec}
                                            <button
                                                type="button"
                                                onClick={() => removeSpecialty(spec)}
                                                className="hover:text-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 能力列表 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    能力列表
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={capabilityInput}
                                        onChange={(e) => setCapabilityInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCapability())}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="输入能力后按回车..."
                                    />
                                    <button
                                        type="button"
                                        onClick={addCapability}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        添加
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.capabilities.map((cap, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"
                                        >
                                            {cap}
                                            <button
                                                type="button"
                                                onClick={() => removeCapability(cap)}
                                                className="hover:text-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 问候语 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    问候语
                                </label>
                                <input
                                    type="text"
                                    value={formData.greeting}
                                    onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="智能体的欢迎语..."
                                />
                            </div>

                            {/* 个性特点 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    个性特点
                                </label>
                                <input
                                    type="text"
                                    value={formData.personality}
                                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="例如：耐心、细致、善于引导"
                                />
                            </div>

                            {/* 主题色 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    主题色
                                </label>
                                <div className="flex gap-3">
                                    {['blue', 'purple', 'green', 'orange', 'cyan', 'amber'].map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color })}
                                            className={`w-12 h-12 rounded-xl transition-all ${formData.color === color
                                                ? 'ring-4 ring-offset-2 ring-blue-400 scale-110'
                                                : 'hover:scale-105'
                                                }`}
                                            style={{
                                                background: color === 'blue' ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' :
                                                    color === 'purple' ? 'linear-gradient(135deg, #a855f7, #ec4899)' :
                                                        color === 'green' ? 'linear-gradient(135deg, #10b981, #059669)' :
                                                            color === 'orange' ? 'linear-gradient(135deg, #f97316, #f59e0b)' :
                                                                color === 'cyan' ? 'linear-gradient(135deg, #06b6d4, #14b8a6)' :
                                                                    'linear-gradient(135deg, #f59e0b, #eab308)'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* 按钮 */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                                >
                                    {agent ? '保存修改' : '创建智能体'}
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TeacherAgentManager;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, X, Filter } from 'lucide-react';
import { GlassCard } from '../components/uiverse';
import AgentCard from '../components/AgentCard';
import {
    getAllAgents,
    getAllStatistics,
    initializeFromData
} from '../utils/agentStorage';
import teacherAgentsData from '../data/teacher_agents_data';
import agentStatisticsData from '../data/agent_statistics_data';
import agentCommentsData from '../data/agent_comments_data';
import teacherAgentDetailPageData from '../data/TeacherAgentDetailPageData';
import teacherAgentCommentsPageData from '../data/TeacherAgentCommentsPageData';

const StudentAgentList = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('all');
    const [sortBy, setSortBy] = useState('popular'); // popular, rating, newest

    useEffect(() => {
        // 初始化数据
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
        const agentsData = getAllAgents().filter(agent => agent.isActive);
        const statsData = getAllStatistics();
        setAgents(agentsData);
        setStatistics(statsData);
    };

    // 过滤和排序智能体
    const getFilteredAgents = () => {
        let filtered = agents.filter(agent => {
            const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterSpecialty === 'all' ||
                agent.specialty.some(s => s.includes(filterSpecialty));
            return matchesSearch && matchesFilter;
        });

        // 排序
        filtered.sort((a, b) => {
            const statsA = statistics[a.id] || {};
            const statsB = statistics[b.id] || {};

            switch (sortBy) {
                case 'popular':
                    return (statsB.totalUsage || 0) - (statsA.totalUsage || 0);
                case 'rating':
                    return (parseFloat(statsB.averageRating) || 0) - (parseFloat(statsA.averageRating) || 0);
                case 'newest':
                    return (b.createdAt || 0) - (a.createdAt || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredAgents = getFilteredAgents();
    const allSpecialties = ['all', ...new Set(agents.flatMap(a => a.specialty))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* 头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                whileHover={{ x: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={24} className="text-gray-700" />
                            </motion.button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">AI学习助手</h1>
                                <p className="text-gray-600 mt-1">选择你的专属学习伙伴</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
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
                                placeholder="搜索智能体..."
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

                        {/* 排序 */}
                        <div className="flex items-center gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                <option value="popular">最受欢迎</option>
                                <option value="rating">评分最高</option>
                                <option value="newest">最新上线</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* 推荐智能体 */}
                {!searchTerm && filterSpecialty === 'all' && sortBy === 'popular' && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 热门推荐</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAgents.slice(0, 3).map((agent) => (
                                <motion.div
                                    key={agent.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <div className="absolute -top-3 -right-3 z-10">
                                        <div className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-bold shadow-lg">
                                            HOT
                                        </div>
                                    </div>
                                    <AgentCard
                                        agent={agent}
                                        statistics={statistics[agent.id]}
                                        variant="student"
                                        onClick={() => navigate(`/student/agent/${agent.id}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 全部智能体 */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {searchTerm || filterSpecialty !== 'all' ? '搜索结果' : '全部智能体'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAgents.map((agent, idx) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                            >
                                <AgentCard
                                    agent={agent}
                                    statistics={statistics[agent.id]}
                                    variant="student"
                                    onClick={() => navigate(`/student/agent/${agent.id}`)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            {searchTerm || filterSpecialty !== 'all' ? '没有找到匹配的智能体' : '暂无智能体'}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentAgentList;

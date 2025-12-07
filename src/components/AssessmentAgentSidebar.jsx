import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronLeft, ChevronRight, Search, FileText, Sparkles, LayoutDashboard } from 'lucide-react';
import { getAllAgents, initializeFromData } from '../utils/agentStorage';
import teacherAgentsData from '../data/teacher_agents_data';
import agentStatisticsData from '../data/agent_statistics_data';
import agentCommentsData from '../data/agent_comments_data';

const AssessmentAgentSidebar = ({ selectedAgentId, onSelectAgent, isCollapsed, onToggleCollapse }) => {
    const [agents, setAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Ensure data is initialized
        const storedAgents = getAllAgents();
        if (storedAgents.length === 0) {
            initializeFromData(teacherAgentsData, agentStatisticsData, agentCommentsData);
            setAgents(teacherAgentsData);
        } else {
            setAgents(storedAgents);
        }
    }, []);

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agent.specialty && agent.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    return (
        <motion.div
            className={`bg-white border-r border-slate-200 h-[calc(100vh-64px)] sticky top-[64px] flex flex-col transition-all duration-300 z-40 ${isCollapsed ? 'w-20' : 'w-80'}`}
            initial={false}
            animate={{ width: isCollapsed ? 80 : 320 }}
        >
            {/* Toggle Button */}
            <button
                onClick={onToggleCollapse}
                className="absolute -right-3 top-6 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-50 hover:bg-slate-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Header / Search */}
            <div className="p-4 border-b border-slate-100">
                {!isCollapsed ? (
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="搜索助教..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors"
                        />
                    </div>
                ) : (
                    <div className="w-10 h-10 mx-auto bg-slate-50 rounded-xl flex items-center justify-center">
                        <Bot size={20} className="text-slate-500" />
                    </div>
                )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {/* Default: Dashboard View */}
                <button
                    onClick={() => onSelectAgent(null)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedAgentId === null
                            ? 'bg-blue-50 text-blue-600 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedAgentId === null ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <LayoutDashboard size={20} className={selectedAgentId === null ? 'text-blue-600' : 'text-slate-500'} />
                    </div>
                    {!isCollapsed && (
                        <div className="text-left overflow-hidden">
                            <div className="font-bold text-sm whitespace-nowrap">课程主页</div>
                            <div className="text-xs opacity-70 whitespace-nowrap">返回课程概览</div>
                        </div>
                    )}
                </button>

                <div className={`my-2 border-t border-slate-100 ${isCollapsed ? 'mx-2' : 'mx-1'}`} />

                {/* Agent List */}
                {filteredAgents.map(agent => (
                    <button
                        key={agent.id}
                        onClick={() => onSelectAgent(agent.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group ${selectedAgentId === agent.id
                                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <div className="relative flex-shrink-0">
                            <img
                                src={agent.avatar}
                                alt={agent.name}
                                className={`w-10 h-10 rounded-lg object-contain bg-white border ${selectedAgentId === agent.id ? 'border-blue-200' : 'border-slate-100'}`}
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <div className={`w-2.5 h-2.5 rounded-full ${agent.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            </div>
                        </div>

                        {!isCollapsed && (
                            <div className="text-left overflow-hidden flex-1">
                                <div className="font-bold text-sm truncate flex items-center gap-1">
                                    {agent.name}
                                    {agent.isRecommended && <Sparkles size={10} className="text-amber-500 fill-amber-500" />}
                                </div>
                                <div className="text-xs opacity-70 truncate">{agent.role}</div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* User Info / Footer */}
            <div className="p-4 border-t border-slate-100">
                {!isCollapsed ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                            我
                        </div>
                        <div className="text-xs text-slate-500">
                            已连接至智能助教系统
                        </div>
                    </div>
                ) : (
                    <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        我
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AssessmentAgentSidebar;

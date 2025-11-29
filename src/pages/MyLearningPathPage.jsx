import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Sparkles, Target, Clock, TrendingUp, CheckCircle, Lock, Circle,
    BookOpen, Award, Calendar, Zap, Activity, BarChart3, Brain, Lightbulb,
    Play, FileText, MessageSquare
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import myLearningPathData from '../data/my_learning_path_data';

const MyLearningPathPage = () => {
    const navigate = useNavigate();
    const { abilityModel, flowNodes, connections } = myLearningPathData;
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [showRecommendationModal, setShowRecommendationModal] = useState(false);

    const handleStartLearning = () => {
        setShowRecommendationModal(false);
        // Navigate to the learning dialogue page with the selected node ID
        // Using a mock ID 'node-3' for the demo scenario if the selected node doesn't match
        const targetId = selectedNode?.id || 'node-3';
        navigate(`/learning-dialogue/${targetId}`);
    };

    // 准备雷达图数据
    const radarData = abilityModel.dimensions.map(d => ({
        subject: d.name,
        value: d.value,
        fullMark: d.max
    }));

    // 学习进度趋势数据
    const progressData = [
        { week: '第1周', score: 65, exercises: 20 },
        { week: '第2周', score: 72, exercises: 35 },
        { week: '第3周', score: 78, exercises: 42 },
        { week: '第4周', score: 85, exercises: 50 },
        { week: '第5周', score: 90, exercises: 55 },
    ];

    // 计算统计数据
    const completedNodes = flowNodes.filter(n => n.status === 'completed').length;
    const totalNodes = flowNodes.length;
    const progressPercent = Math.round((completedNodes / totalNodes) * 100);
    const currentNode = flowNodes.find(n => n.status === 'current');

    // 获取节点样式
    const getNodeStyle = (status) => {
        switch (status) {
            case 'completed':
                return {
                    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
                    border: 'border-emerald-400',
                    shadow: 'shadow-emerald-500/50',
                    text: 'text-white',
                    icon: CheckCircle
                };
            case 'current':
                return {
                    bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
                    border: 'border-orange-400',
                    shadow: 'shadow-orange-500/50',
                    text: 'text-white',
                    icon: Circle,
                    pulse: true
                };
            default:
                return {
                    bg: 'bg-gradient-to-br from-slate-400 to-slate-500',
                    border: 'border-slate-300',
                    shadow: 'shadow-slate-500/30',
                    text: 'text-slate-200',
                    icon: Lock
                };
        }
    };

    // 渲染连接线
    const renderConnections = () => {
        return connections.map((conn, index) => {
            const fromNode = flowNodes.find(n => n.id === conn.from);
            const toNode = flowNodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.position.x;
            const y1 = fromNode.position.y;
            const x2 = toNode.position.x;
            const y2 = toNode.position.y;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const controlY = midY - Math.abs(y2 - y1) * 0.2;

            const pathD = `M ${x1} ${y1} Q ${midX} ${controlY} ${x2} ${y2}`;

            return (
                <path
                    key={index}
                    d={pathD}
                    stroke="#cbd5e1"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={conn.type === 'branch' ? '8 4' : '0'}
                    opacity="0.4"
                    markerEnd="url(#arrowhead)"
                />
            );
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 font-sans">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-[1800px] mx-auto px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold">返回仪表盘</span>
                    </button>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Sparkles size={24} className="text-blue-500" />
                        我的智能学习路径
                    </h1>

                    {/* 进度指示器 */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-slate-500">总体进度</div>
                            <div className="text-lg font-bold text-blue-600">{progressPercent}%</div>
                        </div>
                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* 顶部概览卡片 */}
            <div className="max-w-[1800px] mx-auto px-6 py-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {/* 当前学习 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Activity size={20} />
                            </div>
                            <div className="text-sm opacity-90">当前学习</div>
                        </div>
                        <div className="text-2xl font-bold">{currentNode?.title || '无'}</div>
                        <div className="text-xs opacity-75 mt-1">阶段 {currentNode?.stage || '-'}</div>
                    </motion.div>

                    {/* 已完成 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <CheckCircle size={20} />
                            </div>
                            <div className="text-sm opacity-90">已完成</div>
                        </div>
                        <div className="text-2xl font-bold">{completedNodes}/{totalNodes}</div>
                        <div className="text-xs opacity-75 mt-1">节点完成度</div>
                    </motion.div>

                    {/* 学习天数 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Calendar size={20} />
                            </div>
                            <div className="text-sm opacity-90">学习时长</div>
                        </div>
                        <div className="text-2xl font-bold">25天</div>
                        <div className="text-xs opacity-75 mt-1">持续学习中</div>
                    </motion.div>

                    {/* 平均分 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Award size={20} />
                            </div>
                            <div className="text-sm opacity-90">平均分数</div>
                        </div>
                        <div className="text-2xl font-bold">90分</div>
                        <div className="text-xs opacity-75 mt-1">优秀水平</div>
                    </motion.div>
                </div>

                {/* 主内容区 */}
                <div className="grid grid-cols-12 gap-6">
                    {/* 左侧栏 - AI能力模型 */}
                    <div className="col-span-3 space-y-6">
                        {/* 能力雷达图 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Brain size={16} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-800">AI能力模型</h2>
                                    <p className="text-xs text-slate-500">多维评估</p>
                                </div>
                            </div>

                            {/* 雷达图 */}
                            <div className="h-52 -mx-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis
                                            dataKey="subject"
                                            tick={{ fill: '#64748b', fontSize: 11 }}
                                        />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                                        <Radar
                                            name="能力值"
                                            dataKey="value"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* 能力数值 */}
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                {abilityModel.dimensions.map((dim, index) => (
                                    <div key={index} className="bg-slate-50 rounded-lg p-2">
                                        <div className="text-xs text-slate-600 mb-0.5">{dim.name}</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-slate-800">{dim.value}</span>
                                            <span className="text-xs text-slate-400">/{dim.max}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 学习目标 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-5 text-white"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Target size={18} />
                                <h3 className="font-bold text-base">学习目标</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5">
                                    <div className="text-xs opacity-80 mb-0.5">目标班级</div>
                                    <div className="font-bold text-sm">{abilityModel.currentGoal}</div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5">
                                    <div className="text-xs opacity-80 mb-0.5">目标分数</div>
                                    <div className="font-bold text-sm">{abilityModel.targetScore}</div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5">
                                    <div className="text-xs opacity-80 mb-0.5">预计时长</div>
                                    <div className="font-bold text-sm">{abilityModel.estimatedHours}</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* AI建议 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                    <Lightbulb size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-800">AI建议</h3>
                                    <p className="text-xs text-slate-500">个性化推荐</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {abilityModel.recommendation.suggestions.map((suggestion, index) => (
                                    <div key={index} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                                        <span className="text-purple-500 mt-0.5">•</span>
                                        <span>{suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 中间主区域 - 流程图 */}
                    <div className="col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 h-full"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                    学习路径规划
                                </h2>

                                {/* 图例 */}
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded"></div>
                                        <span className="text-slate-600">已完成</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded"></div>
                                        <span className="text-slate-600">进行中</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-500 rounded"></div>
                                        <span className="text-slate-600">未解锁</span>
                                    </div>
                                </div>
                            </div>

                            {/* SVG流程图 */}
                            <div className="relative w-full overflow-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-slate-300" style={{ height: 'calc(100vh - 340px)', minHeight: '500px' }}>
                                {/* 滚动提示 */}
                                <div className="absolute top-3 right-3 z-10 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                                    <span>←</span>
                                    <span>可左右滚动查看全部</span>
                                    <span>→</span>
                                </div>

                                <svg className="absolute top-6 left-6 w-full h-full pointer-events-none" style={{ minWidth: '1400px', minHeight: '650px' }}>
                                    {/* 箭头定义 */}
                                    <defs>
                                        <marker
                                            id="arrowhead"
                                            markerWidth="10"
                                            markerHeight="10"
                                            refX="8"
                                            refY="3"
                                            orient="auto"
                                        >
                                            <polygon points="0 0, 10 3, 0 6" fill="#cbd5e1" />
                                        </marker>
                                    </defs>
                                    {/* 连接线 */}
                                    {renderConnections()}
                                </svg>

                                {/* 节点 */}
                                <div className="relative pointer-events-auto" style={{ minWidth: '1400px', minHeight: '650px' }}>
                                    {flowNodes.map((node, index) => {
                                        const style = getNodeStyle(node.status);
                                        const Icon = style.icon;

                                        return (
                                            <motion.div
                                                key={node.id}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                                style={{
                                                    left: node.position.x,
                                                    top: node.position.y
                                                }}
                                                onMouseEnter={() => setHoveredNode(node.id)}
                                                onMouseLeave={() => setHoveredNode(null)}
                                                onClick={() => setSelectedNode(node)}
                                            >
                                                <div
                                                    className={`
                                                        ${style.bg} ${style.text}
                                                        px-5 py-3 rounded-xl
                                                        border-2 ${style.border}
                                                        shadow-lg ${style.shadow}
                                                        transition-all duration-300
                                                        ${hoveredNode === node.id ? 'scale-110 -translate-y-2 z-50' : 'z-10'}
                                                        ${style.pulse ? 'animate-pulse' : ''}
                                                        cursor-pointer
                                                        min-w-[130px]
                                                    `}
                                                >
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <Icon size={16} />
                                                        <span className="font-bold text-sm whitespace-nowrap">{node.title}</span>
                                                    </div>

                                                    {/* 阶段标识 */}
                                                    <div className="text-center mt-0.5">
                                                        <span className="text-xs opacity-75">阶段 {node.stage}</span>
                                                    </div>
                                                </div>

                                                {/* Hover详情 */}
                                                {hoveredNode === node.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-xl p-3 shadow-2xl z-50 whitespace-nowrap pointer-events-none"
                                                    >
                                                        <div className="text-sm font-bold mb-1">{node.title}</div>
                                                        <div className="text-xs text-slate-300">
                                                            {node.status === 'completed' && '✓ 已完成'}
                                                            {node.status === 'current' && '● 进行中'}
                                                            {node.status === 'locked' && '🔒 未解锁'}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 右侧栏 - 学习资源和统计 */}
                    <div className="col-span-3 space-y-6">
                        {/* 节点详情/学习资源 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BookOpen size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-800">
                                        {selectedNode ? selectedNode.title : '学习资源'}
                                    </h3>
                                    <p className="text-xs text-slate-500">点击节点查看详情</p>
                                </div>
                            </div>

                            {selectedNode ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Play size={16} className="text-blue-600" />
                                            <span className="text-sm text-slate-700">视频课程</span>
                                        </div>
                                        <span className="text-xs font-bold text-blue-600">8个</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-amber-600" />
                                            <span className="text-sm text-slate-700">练习题</span>
                                        </div>
                                        <span className="text-xs font-bold text-amber-600">25题</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={16} className="text-purple-600" />
                                            <span className="text-sm text-slate-700">AI答疑</span>
                                        </div>
                                        <span className="text-xs font-bold text-purple-600">随时</span>
                                    </div>

                                    {selectedNode.status === 'current' && (
                                        <button
                                            onClick={() => setShowRecommendationModal(true)}
                                            className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-2.5 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                                        >
                                            继续学习
                                        </button>
                                    )}
                                    {selectedNode.status === 'completed' && (
                                        <button className="w-full mt-2 bg-emerald-100 text-emerald-700 py-2.5 rounded-lg font-bold text-sm border-2 border-emerald-300 hover:bg-emerald-200 transition-all">
                                            复习回顾
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400">
                                    <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-xs">点击任意节点查看资源</p>
                                </div>
                            )}
                        </motion.div>

                        {/* 学习进度趋势 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <BarChart3 size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-800">学习趋势</h3>
                                    <p className="text-xs text-slate-500">近5周表现</p>
                                </div>
                            </div>

                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={progressData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                        <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp size={14} className="text-blue-600" />
                                    <span className="text-xs font-bold text-slate-700">进步分析</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    本周分数提升5分,练习完成度提高10%,保持良好学习势头!
                                </p>
                            </div>
                        </motion.div>

                        {/* 快速操作 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-amber-500" />
                                <h3 className="font-bold text-sm text-slate-800">快速操作</h3>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => navigate('/my-learning-trajectory')}
                                    className="w-full p-3 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 rounded-lg text-left transition-all border border-cyan-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <Activity size={16} className="text-cyan-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">查看学习轨迹</div>
                                            <div className="text-xs text-slate-500">3D时间轴回放</div>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-left transition-all border border-purple-200">
                                    <div className="flex items-center gap-2">
                                        <Award size={16} className="text-purple-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">学习报告</div>
                                            <div className="text-xs text-slate-500">查看详细分析</div>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full p-3 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-lg text-left transition-all border border-emerald-200">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-emerald-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">学习计划</div>
                                            <div className="text-xs text-slate-500">制定新目标</div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Basic Knowledge Recommendation Modal */}
            <AnimatePresence>
                {showRecommendationModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setShowRecommendationModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Lightbulb size={32} className="text-amber-500" />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-800 mb-2">基础知识点推荐</h3>
                                <p className="text-slate-500 mb-8">我们先从这里开始吧？</p>

                                <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blue-600 text-lg mb-1">变量与数据类型</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                学习编程的第一步，理解如何存储和使用数据。
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowRecommendationModal(false)}
                                        className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        关闭
                                    </button>
                                    <button
                                        onClick={handleStartLearning}
                                        className="flex-1 py-3 px-6 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
                                    >
                                        立即前往学习
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default MyLearningPathPage;

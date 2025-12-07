import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Send, ThumbsUp, MessageSquare, Star,
    Sparkles, Bot, User
} from 'lucide-react';
import { GlassCard } from '../components/uiverse';
import RatingComponent from '../components/RatingComponent';
import CommentCard from '../components/CommentCard';
import {
    getAgentById,
    getAgentStatistics,
    getAgentComments,
    recordAgentUsage,
    addComment,
    likeComment,
    getUserAgentRating,
    saveUserRating
} from '../utils/agentStorage';

const StudentAgentDetail = () => {
    const navigate = useNavigate();
    const { agentId } = useParams();
    const currentUserId = 'student-001'; // 模拟当前学生ID

    const [agent, setAgent] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [comments, setComments] = useState([]);
    const [activeTab, setActiveTab] = useState('chat'); // chat, comments

    // 对话状态
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 点评状态
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [ratingComment, setRatingComment] = useState('');

    useEffect(() => {
        loadData();
        // 记录使用
        recordAgentUsage(agentId);
    }, [agentId]);

    const loadData = () => {
        const agentData = getAgentById(agentId);
        const statsData = getAgentStatistics(agentId);
        const commentsData = getAgentComments(agentId);
        const savedRating = getUserAgentRating(currentUserId, agentId);

        setAgent(agentData);
        setStatistics(statsData);
        setComments(commentsData);
        setUserRating(savedRating);

        // 初始化欢迎消息
        if (agentData && messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    type: 'agent',
                    content: agentData.greeting || '你好！我是你的学习助手，有什么可以帮助你的吗？',
                    timestamp: Date.now()
                }
            ]);
        }
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: `msg-${Date.now()}`,
            type: 'user',
            content: inputMessage,
            timestamp: Date.now()
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // 模拟AI回复
        setTimeout(() => {
            const responses = [
                '这是个很好的问题！让我帮你分析一下...',
                '我理解你的困惑。让我们一步步来解决这个问题。',
                '根据你的描述，我建议你可以这样思考...',
                '很高兴能帮助你！这个知识点确实需要仔细理解。',
                '让我们换个角度来看这个问题，可能会更清楚一些。'
            ];

            const agentMessage = {
                id: `msg-${Date.now()}`,
                type: 'agent',
                content: responses[Math.floor(Math.random() * responses.length)],
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, agentMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSubmitRating = () => {
        if (userRating === 0) {
            alert('请选择评分');
            return;
        }

        if (!ratingComment.trim()) {
            alert('请输入留言内容');
            return;
        }

        // 保存评分
        saveUserRating(currentUserId, agentId, userRating);

        // 添加留言
        addComment({
            agentId,
            studentId: currentUserId,
            studentName: '张小明', // 模拟学生名称
            studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1',
            content: ratingComment,
            rating: userRating
        });

        // 清空输入
        setRatingComment('');

        // 关闭模态框（如果是从模态框提交）
        setShowRatingModal(false);

        // 重新加载数据
        loadData();

        // 提示成功
        alert('留言发布成功！');
    };

    const handleLikeComment = (commentId) => {
        likeComment(commentId, currentUserId);
        loadData();
    };

    if (!agent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">加载中...</p>
            </div>
        );
    }

    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500',
        orange: 'from-orange-500 to-amber-500',
        cyan: 'from-cyan-500 to-teal-500',
        amber: 'from-amber-500 to-yellow-500'
    };
    const gradient = colorMap[agent.color] || colorMap.blue;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* 头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={() => navigate('/student/agents')}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                whileHover={{ x: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft size={24} className="text-gray-700" />
                            </motion.button>
                            <div className="flex items-center gap-4">
                                <img
                                    src={agent.avatar}
                                    alt={agent.name}
                                    className="w-14 h-14 object-contain"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">{agent.name}</h1>
                                    <p className="text-sm text-gray-600">{agent.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {statistics && (
                                <div className="flex items-center gap-4 px-4 py-2 bg-white/50 rounded-xl">
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold">{statistics.averageRating}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {statistics.totalUsage} 次使用
                                    </div>
                                </div>
                            )}
                            <motion.button
                                onClick={() => setShowRatingModal(true)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Star size={16} />
                                {userRating > 0 ? '修改评价' : '点评'}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* 标签页 */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'chat'
                            ? 'bg-white text-blue-600 shadow-lg'
                            : 'bg-white/50 text-gray-600 hover:bg-white/75'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            对话交流
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'comments'
                            ? 'bg-white text-blue-600 shadow-lg'
                            : 'bg-white/50 text-gray-600 hover:bg-white/75'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <MessageSquare size={20} />
                            留言板 ({comments.length})
                        </div>
                    </button>
                </div>

                {/* 对话界面 */}
                {activeTab === 'chat' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 对话区域 */}
                        <div className="lg:col-span-2">
                            <GlassCard variant="standard" className="h-[600px] flex flex-col">
                                {/* 消息列表 */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'agent'
                                                ? `bg-gradient-to-br ${gradient}`
                                                : 'bg-gradient-to-br from-gray-600 to-gray-700'
                                                }`}>
                                                {message.type === 'agent' ? (
                                                    <Bot size={20} className="text-white" />
                                                ) : (
                                                    <User size={20} className="text-white" />
                                                )}
                                            </div>
                                            <div className={`flex-1 max-w-[70%] ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                                                <div
                                                    className={`px-4 py-3 rounded-2xl ${message.type === 'agent'
                                                        ? 'bg-white border border-gray-200'
                                                        : `bg-gradient-to-br ${gradient} text-white`
                                                        }`}
                                                >
                                                    <p className={`text-sm leading-relaxed ${message.type === 'agent' ? 'text-gray-700' : 'text-white'
                                                        }`}>
                                                        {message.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-3"
                                        >
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                                <Bot size={20} className="text-white" />
                                            </div>
                                            <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* 输入框 */}
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="输入你的问题..."
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                        <motion.button
                                            onClick={handleSendMessage}
                                            disabled={!inputMessage.trim()}
                                            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${inputMessage.trim()
                                                ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg`
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            whileHover={inputMessage.trim() ? { scale: 1.05 } : {}}
                                            whileTap={inputMessage.trim() ? { scale: 0.95 } : {}}
                                        >
                                            <Send size={20} />
                                            发送
                                        </motion.button>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* 智能体信息 */}
                        <div className="space-y-4">
                            <GlassCard variant="standard" className="p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Sparkles className="text-blue-600" size={20} />
                                    专业领域
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.specialty.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-3 py-1.5 bg-gradient-to-r ${gradient} bg-opacity-10 text-gray-700 rounded-lg text-sm font-medium`}
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard variant="standard" className="p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">能力特长</h3>
                                <ul className="space-y-2">
                                    {agent.capabilities.map((cap, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                                            {cap}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>

                            {agent.personality && (
                                <GlassCard variant="standard" className="p-6">
                                    <h3 className="font-semibold text-gray-800 mb-2">个性特点</h3>
                                    <p className="text-sm text-gray-600">{agent.personality}</p>
                                </GlassCard>
                            )}
                        </div>
                    </div>
                )}

                {/* 留言板 */}
                {activeTab === 'comments' && (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* 留言输入区 */}
                        <GlassCard variant="standard" className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">发表留言</h3>
                            <div className="space-y-4">
                                {/* 评分 */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">你的评分：</span>
                                    <RatingComponent
                                        rating={userRating}
                                        editable={true}
                                        onChange={setUserRating}
                                        size={24}
                                        showValue={false}
                                    />
                                </div>
                                {/* 留言输入 */}
                                <textarea
                                    value={ratingComment}
                                    onChange={(e) => setRatingComment(e.target.value)}
                                    placeholder="分享你的使用体验..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                    rows={4}
                                />
                                <div className="flex justify-end">
                                    <motion.button
                                        onClick={handleSubmitRating}
                                        disabled={userRating === 0 || !ratingComment.trim()}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all ${userRating > 0 && ratingComment.trim()
                                            ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg`
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        whileHover={userRating > 0 && ratingComment.trim() ? { scale: 1.05 } : {}}
                                        whileTap={userRating > 0 && ratingComment.trim() ? { scale: 0.95 } : {}}
                                    >
                                        发布留言
                                    </motion.button>
                                </div>
                            </div>
                        </GlassCard>

                        {/* 留言列表 */}
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    onLike={handleLikeComment}
                                    showActions={true}
                                    currentUserId={currentUserId}
                                />
                            ))}
                        </div>
                        {comments.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500">暂无留言，快来第一个评价吧！</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* 评分模态框 */}
            {showRatingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowRatingModal(false)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GlassCard variant="standard" className="p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                评价 {agent.name}
                            </h2>

                            <div className="space-y-6">
                                {/* 评分 */}
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">你的评分</span>
                                    <RatingComponent
                                        rating={userRating}
                                        editable={true}
                                        onChange={setUserRating}
                                        size={32}
                                        showValue={false}
                                    />
                                </div>

                                {/* 留言 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        留言（选填）
                                    </label>
                                    <textarea
                                        value={ratingComment}
                                        onChange={(e) => setRatingComment(e.target.value)}
                                        placeholder="分享你的使用体验..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                        rows={4}
                                    />
                                </div>

                                {/* 按钮 */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowRatingModal(false)}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        取消
                                    </button>
                                    <button
                                        onClick={handleSubmitRating}
                                        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${userRating > 0
                                            ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg`
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={userRating === 0}
                                    >
                                        提交评价
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default StudentAgentDetail;

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageSquare, Star, MoreVertical } from 'lucide-react';
import { GlassCard } from './uiverse';
import RatingComponent from './RatingComponent';
import CommentCard from './CommentCard';
import {
    getAgentById,
    getAgentComments,
    addComment,
    getUserAgentRating,
    saveUserRating,
    likeComment
} from '../utils/agentStorage';

const AssessmentAgentChat = ({ agentId }) => {
    const [agent, setAgent] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState('chat'); // chat, comments
    const messagesEndRef = useRef(null);
    const currentUserId = 'student-001'; // Mock ID

    // Comments State
    const [comments, setComments] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [ratingComment, setRatingComment] = useState('');

    useEffect(() => {
        if (!agentId) return;

        const agentData = getAgentById(agentId);
        setAgent(agentData);

        // Load initial comments & rating
        setComments(getAgentComments(agentId));
        setUserRating(getUserAgentRating(currentUserId, agentId));

        // Initial Greeting if new chat
        if (agentData) {
            setMessages([
                {
                    id: 'welcome',
                    type: 'agent',
                    content: agentData.greeting || `你好！我是${agentData.name}，很高兴为你服务。关于本课程的学习内容，你有什么想问的吗？`,
                    timestamp: Date.now()
                }
            ]);
        }
    }, [agentId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newUserMsg = {
            id: `msg-${Date.now()}`,
            type: 'user',
            content: inputMessage,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputMessage('');
        setIsTyping(true);

        // Mock Response
        setTimeout(() => {
            const responses = [
                `关于"${newUserMsg.content}"，这是一个非常关键的点。在课程的第三章我们详细讲解过。`,
                '这个问题很好！如果你结合之前的实验数据来看，会发现其中的规律...',
                '我建议你复习一下相关的公式推导，这对理解核心概念很有帮助。',
                '不仅如此，在实际应用中，这种通过数学模型解决问题的方法也非常常见。',
                '你说得对。让我们试着从另一个角度来分析这个问题...'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAgentMsg = {
                id: `msg-${Date.now() + 1}`,
                type: 'agent',
                content: randomResponse,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, newAgentMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleCommentSubmit = () => {
        if (!ratingComment.trim() || userRating === 0) return;

        saveUserRating(currentUserId, agentId, userRating);
        addComment({
            agentId,
            studentId: currentUserId,
            studentName: '我',
            content: ratingComment,
            rating: userRating
        });

        setComments(getAgentComments(agentId));
        setRatingComment('');
        alert('评价提交成功！');
    };

    if (!agent) return <div className="flex items-center justify-center h-full">Loading...</div>;

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
        <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-10 w-full">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 shadow-md`}>
                        <div className="w-full h-full bg-white rounded-[10px] overflow-hidden">
                            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-slate-800">{agent.name}</h2>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium border border-blue-100">{agent.role}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{agent.description}</p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        对话
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'comments' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        评价 ({comments.length})
                    </button>
                </div>
            </div>

            {/* Chat Content */}
            {activeTab === 'chat' && (
                <>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.type === 'agent' ? 'bg-white' : 'bg-blue-600'}`}>
                                    {msg.type === 'agent' ? <img src={agent.avatar} className="w-8 h-8" alt="bot" /> : <User size={20} className="text-white" />}
                                </div>

                                <div className={`max-w-[70%] space-y-1 ${msg.type === 'user' ? 'items-end flex flex-col' : ''}`}>
                                    <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.type === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <img src={agent.avatar} className="w-8 h-8" alt="bot" />
                                </div>
                                <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100" />
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="max-w-4xl mx-auto relative">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="输入您的问题，与助教互动..."
                                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all shadow-inner"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim()}
                                className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div className="text-center mt-2 text-xs text-slate-400">
                            AI 生成内容仅供参考，请以课程教材为准。
                        </div>
                    </div>
                </>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Star className="text-amber-400 fill-amber-400" />
                                你的评价
                            </h3>
                            <div className="flex flex-col items-center gap-4 py-4">
                                <RatingComponent
                                    rating={userRating}
                                    onChange={setUserRating}
                                    editable={true}
                                    size={36}
                                />
                                <textarea
                                    className="w-full p-4 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-blue-400 transition-all"
                                    rows={3}
                                    placeholder="觉得这个助教怎么样？写下你的想法..."
                                    value={ratingComment}
                                    onChange={(e) => setRatingComment(e.target.value)}
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    disabled={!ratingComment.trim() || userRating === 0}
                                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    提交评价
                                </button>
                            </div>
                        </GlassCard>

                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 ml-1">全部留言 ({comments.length})</h3>
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <CommentCard key={comment.id} comment={comment} showActions={false} />
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-400">
                                    暂无其他留言，快来抢沙发！
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssessmentAgentChat;

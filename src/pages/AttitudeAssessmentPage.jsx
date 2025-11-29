import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { INITIAL_ATTITUDE_MESSAGES, ATTITUDE_KEYWORDS } from '../data/attitude_assessment_data';
import { ArrowRight } from 'lucide-react';

const AttitudeAssessmentPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(INITIAL_ATTITUDE_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);
    const [showCloud, setShowCloud] = useState(false);

    const handleSendMessage = (text) => {
        const userMsg = { id: Date.now(), sender: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'teacher',
                content: '我捕捉到了你的情绪关键词。这有助于我们调整后续的教学节奏。'
            }]);
            setShowCloud(true);
        }, 1500);
    };

    const handleNext = () => {
        navigate('/summary-report');
    };

    const getColor = (type) => {
        switch (type) {
            case 'positive': return 'text-emerald-500';
            case 'negative': return 'text-rose-500';
            case 'neutral': return 'text-indigo-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
            {/* Left: Chat Area */}
            <div className="w-full lg:w-1/3 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-3">
                    <DigitalTeacherAvatar size="sm" state={isTyping ? 'speaking' : 'idle'} />
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">数字老师</h2>
                        <p className="text-xs text-slate-500">学习心态分析</p>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isTyping={isTyping}
                        placeholder="分享你的真实感受..."
                    />
                </div>
            </div>

            {/* Right: Word Cloud Area */}
            <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-2xl border border-slate-200 p-8 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50" />

                <h3 className="text-xl font-bold text-slate-800 mb-6 relative z-10">情绪与行为倾向</h3>

                <div className="flex-1 relative z-10">
                    {showCloud ? (
                        <div className="w-full h-full relative">
                            {ATTITUDE_KEYWORDS.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className={`absolute font-bold ${item.size} ${getColor(item.type)} cursor-default hover:scale-110 transition-transform`}
                                    style={{
                                        left: `${item.x}%`,
                                        top: `${item.y}%`,
                                        transform: 'translate(-50%, -50%)' // Center anchor
                                    }}
                                >
                                    {item.text}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <p>等待分析生成...</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end relative z-10">
                    <button
                        onClick={handleNext}
                        disabled={!showCloud}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${showCloud
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        生成综合报告
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttitudeAssessmentPage;

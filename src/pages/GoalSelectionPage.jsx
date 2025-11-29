import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { INITIAL_MESSAGES, GOAL_OPTIONS } from '../data/goal_selection_data';
import { Zap, Book, Compass, ArrowRight } from 'lucide-react';

const iconMap = {
    Zap: Zap,
    Book: Book,
    Compass: Compass,
};

const GoalSelectionPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (text) => {
        // Add user message
        const userMsg = { id: Date.now(), sender: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);

        // Simulate teacher response
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const teacherMsg = {
                id: Date.now() + 1,
                sender: 'teacher',
                content: `好的，我明白了！我们将重点关注“${text}”。接下来，让我们进入能力评估环节，看看你目前的水平如何。`
            };
            setMessages(prev => [...prev, teacherMsg]);

            // Navigate to next page after a delay
            setTimeout(() => {
                navigate('/ability-assessment');
            }, 2000);
        }, 1500);
    };

    const handleOptionClick = (option) => {
        handleSendMessage(option.title);
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
            {/* Left: Chat Area */}
            <div className="w-full lg:w-1/3 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-3">
                    <DigitalTeacherAvatar size="sm" state={isTyping ? 'speaking' : 'idle'} />
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">数字老师</h2>
                        <p className="text-xs text-slate-500">AI 智能评估助手</p>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isTyping={isTyping}
                        placeholder="输入你的自定义目标..."
                    />
                </div>
            </div>

            {/* Right: Visual Area & Options */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
                {/* Visual Placeholder / Hero Area */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-8 flex items-center justify-center relative overflow-hidden group shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-500" />

                    <div className="text-center relative z-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10"
                        >
                            <Target size={48} className="text-indigo-500" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">设定评估目标</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            明确的目标是成功的一半。告诉数字老师你想提升什么，我们将为你生成专属的评估路径。
                        </p>
                    </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {GOAL_OPTIONS.map((option, index) => {
                        const Icon = iconMap[option.icon];
                        return (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <div
                                    onClick={() => handleOptionClick(option)}
                                    className="flex flex-col items-start p-6 bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl text-left transition-all cursor-pointer group hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1"
                                >
                                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 group-hover:from-indigo-500 group-hover:to-purple-600 transition-all group-hover:scale-110 group-hover:shadow-lg">
                                        <Icon size={28} className="text-indigo-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{option.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">{option.description}</p>
                                    <div className="w-full flex justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1">
                                        <ArrowRight size={20} className="text-indigo-500" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Helper component for the icon in the hero area
const Target = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

export default GoalSelectionPage;

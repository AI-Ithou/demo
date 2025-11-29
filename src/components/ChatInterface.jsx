import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DigitalTeacherAvatar from './DigitalTeacherAvatar';
import { Send } from 'lucide-react';
import QuizCard from './chat-widgets/QuizCard';
import VideoCard from './chat-widgets/VideoCard';
import LogicGameCard from './chat-widgets/LogicGameCard';
import StyleSelector from './chat-widgets/StyleSelector';

const ChatInterface = ({ messages, onSendMessage, isTyping, placeholder = "请输入您的回答...", onInteract }) => {
    const messagesEndRef = useRef(null);
    const [inputValue, setInputValue] = React.useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const renderContent = (msg) => {
        switch (msg.type) {
            case 'quiz':
                return (
                    <QuizCard
                        {...msg.payload}
                        onAnswer={(isCorrect) => onInteract(msg.id, 'quiz_answer', isCorrect)}
                        onSkip={() => onInteract(msg.id, 'skip')}
                    />
                );
            case 'video':
                return (
                    <VideoCard
                        {...msg.payload}
                        onComplete={() => onInteract(msg.id, 'video_complete')}
                        onSkip={() => onInteract(msg.id, 'skip')}
                    />
                );
            case 'game':
                return (
                    <LogicGameCard
                        onComplete={(success) => onInteract(msg.id, 'game_complete', success)}
                        onSkip={() => onInteract(msg.id, 'skip')}
                    />
                );
            case 'style_selector':
                return (
                    <StyleSelector
                        onSelect={(style) => onInteract(msg.id, 'style_select', style)}
                    />
                );
            case 'text':
            default:
                return msg.content;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
                                {/* Avatar */}
                                <div className="flex-shrink-0 mt-1">
                                    {msg.sender === 'teacher' ? (
                                        <DigitalTeacherAvatar size="sm" state="idle" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border border-indigo-400 shadow-md">
                                            我
                                        </div>
                                    )}
                                </div>

                                {/* Bubble */}
                                <div className="flex flex-col items-start">
                                    {msg.content && (
                                        <div
                                            className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm mb-2 ${msg.sender === 'user'
                                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    )}

                                    {/* Interactive Widget */}
                                    {msg.type !== 'text' && msg.sender === 'teacher' && (
                                        <div className="w-full">
                                            {renderContent(msg)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="flex max-w-[80%] flex-row gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <DigitalTeacherAvatar size="sm" state="speaking" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-2 shadow-sm">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-200 transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg text-white transition-colors shadow-sm"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;

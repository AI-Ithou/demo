import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Sparkles } from 'lucide-react';

const TeachingModeSwitch = ({ mode, setMode }) => {
    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto my-6">
            <div className="relative p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-inner w-full flex">
                {/* Active Indicator */}
                <motion.div
                    className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-md border border-slate-100/50 z-0"
                    initial={false}
                    animate={{
                        x: mode === 'teach' ? 0 : '100%',
                        width: '50%'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Teach Mode Button */}
                <button
                    onClick={() => setMode('teach')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl transition-colors duration-200 ${mode === 'teach' ? 'text-purple-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <div className={`p-1.5 rounded-lg transition-colors ${mode === 'teach' ? 'bg-purple-100' : 'bg-transparent'
                        }`}>
                        <BookOpen size={20} className={mode === 'teach' ? 'stroke-[2.5px]' : 'stroke-2'} />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold leading-none mb-0.5 ${mode === 'teach' ? 'text-purple-900' : 'text-slate-600'
                            }`}>教学模式</span>
                        <span className="text-[10px] font-medium opacity-70">系统化讲解知识点</span>
                    </div>
                </button>

                {/* QA Mode Button */}
                <button
                    onClick={() => setMode('qa')}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl transition-colors duration-200 ${mode === 'qa' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <div className={`p-1.5 rounded-lg transition-colors ${mode === 'qa' ? 'bg-blue-100' : 'bg-transparent'
                        }`}>
                        <MessageSquare size={20} className={mode === 'qa' ? 'stroke-[2.5px]' : 'stroke-2'} />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold leading-none mb-0.5 ${mode === 'qa' ? 'text-blue-900' : 'text-slate-600'
                            }`}>问答模式</span>
                        <span className="text-[10px] font-medium opacity-70">快速解答你的疑问</span>
                    </div>
                </button>
            </div>

            {/* Helper Text with Icon */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs text-slate-400 px-2"
            >
                <Sparkles size={12} className="text-amber-400" />
                <span>
                    {mode === 'teach'
                        ? 'AI 老师将循序渐进地引导你掌握知识'
                        : '你可以随时打断，询问任何不懂的问题'}
                </span>
            </motion.div>
        </div>
    );
};

export default TeachingModeSwitch;

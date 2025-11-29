import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { INITIAL_ABILITY_MESSAGES, INITIAL_STEPS } from '../data/ability_assessment_data';
import { GripVertical, Plus, ArrowRight } from 'lucide-react';

const AbilityAssessmentPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(INITIAL_ABILITY_MESSAGES);
    const [steps, setSteps] = useState(INITIAL_STEPS);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (text) => {
        const userMsg = { id: Date.now(), sender: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const teacherMsg = {
                id: Date.now() + 1,
                sender: 'teacher',
                content: '很好！我根据你的描述生成了一个解题步骤框架，你可以拖拽调整顺序，或者添加新的步骤。'
            };
            setMessages(prev => [...prev, teacherMsg]);
        }, 1500);
    };

    const handleAddStep = () => {
        const newStep = {
            id: `step-${Date.now()}`,
            content: '新步骤：请点击编辑...'
        };
        setSteps([...steps, newStep]);
    };

    const handleNext = () => {
        navigate('/ability-radar');
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
            {/* Left: Chat Area */}
            <div className="w-full lg:w-1/3 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-3">
                    <DigitalTeacherAvatar size="sm" state={isTyping ? 'speaking' : 'idle'} />
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">数字老师</h2>
                        <p className="text-xs text-slate-500">思维能力评估中...</p>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isTyping={isTyping}
                        placeholder="描述你的解题思路..."
                    />
                </div>
            </div>

            {/* Right: Draggable Steps Area */}
            <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        思维步骤构建
                    </h3>
                    <button
                        onClick={handleAddStep}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors border border-slate-200"
                    >
                        <Plus size={16} />
                        添加步骤
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                    <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-3">
                        {steps.map((step) => (
                            <Reorder.Item key={step.id} value={step}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-4 cursor-grab active:cursor-grabbing shadow-sm hover:border-indigo-300 transition-colors group"
                                >
                                    <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                                        <GripVertical size={20} />
                                    </div>
                                    <div className="flex-1 font-medium text-slate-700">
                                        {step.content}
                                    </div>
                                </motion.div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                    >
                        下一步：查看能力画像
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AbilityAssessmentPage;

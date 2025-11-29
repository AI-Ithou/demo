import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useDragControls } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { INITIAL_NEBULA_MESSAGES, KNOWLEDGE_NODES } from '../data/knowledge_nebula_data';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const KnowledgeNebulaPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(INITIAL_NEBULA_MESSAGES);
    const [nodes, setNodes] = useState(KNOWLEDGE_NODES);
    const [isTyping, setIsTyping] = useState(false);

    // Zones for drag detection
    const masteredZoneRef = useRef(null);
    const reinforceZoneRef = useRef(null);

    const handleSendMessage = (text) => {
        const userMsg = { id: Date.now(), sender: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        // Simple echo for now
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now(), sender: 'teacher', content: '收到，已更新你的知识画像。' }]);
        }, 1000);
    };

    const handleDragEnd = (event, info, node) => {
        const nodeElem = event.target.getBoundingClientRect();
        const masteredRect = masteredZoneRef.current.getBoundingClientRect();
        const reinforceRect = reinforceZoneRef.current.getBoundingClientRect();

        // Check collision center point
        const centerX = nodeElem.left + nodeElem.width / 2;
        const centerY = nodeElem.top + nodeElem.height / 2;

        if (
            centerX >= masteredRect.left &&
            centerX <= masteredRect.right &&
            centerY >= masteredRect.top &&
            centerY <= masteredRect.bottom
        ) {
            updateNodeStatus(node.id, 'mastered');
        } else if (
            centerX >= reinforceRect.left &&
            centerX <= reinforceRect.right &&
            centerY >= reinforceRect.top &&
            centerY <= reinforceRect.bottom
        ) {
            updateNodeStatus(node.id, 'reinforce');
        }
    };

    const updateNodeStatus = (id, status) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    };

    const handleNext = () => {
        navigate('/knowledge-list');
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
            {/* Left: Chat Area */}
            <div className="w-full lg:w-1/3 flex flex-col h-full">
                <div className="mb-4 flex items-center gap-3">
                    <DigitalTeacherAvatar size="sm" state={isTyping ? 'speaking' : 'idle'} />
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">数字老师</h2>
                        <p className="text-xs text-slate-500">知识点深度扫描</p>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isTyping={isTyping}
                        placeholder="对某个知识点有疑问？"
                    />
                </div>
            </div>

            {/* Right: Nebula Interaction Area */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
                {/* Nebula Container */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 relative overflow-hidden shadow-sm">
                    <div className="absolute inset-0 bg-slate-50 opacity-50"></div>

                    {/* Draggable Nodes */}
                    <div className="absolute inset-0 p-10">
                        {nodes.map((node) => (
                            <KnowledgeNode
                                key={node.id}
                                node={node}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </div>
                </div>

                {/* Drop Zones */}
                <div className="h-32 grid grid-cols-2 gap-4">
                    <div
                        ref={masteredZoneRef}
                        className="rounded-xl border-2 border-dashed border-emerald-500/30 bg-emerald-50 flex flex-col items-center justify-center transition-colors hover:bg-emerald-100/50 hover:border-emerald-500/50"
                    >
                        <CheckCircle className="text-emerald-500 mb-2" />
                        <span className="text-emerald-600 font-medium">已掌握区域</span>
                    </div>
                    <div
                        ref={reinforceZoneRef}
                        className="rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-50 flex flex-col items-center justify-center transition-colors hover:bg-amber-100/50 hover:border-amber-500/50"
                    >
                        <AlertCircle className="text-amber-500 mb-2" />
                        <span className="text-amber-600 font-medium">待巩固区域</span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                    >
                        下一步：查看掌握清单
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const KnowledgeNode = ({ node, onDragEnd }) => {
    const getColor = (status) => {
        switch (status) {
            case 'mastered': return 'bg-emerald-500 shadow-emerald-500/40';
            case 'reinforce': return 'bg-amber-500 shadow-amber-500/40';
            default: return 'bg-indigo-500 shadow-indigo-500/40';
        }
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => onDragEnd(e, info, node)}
            initial={{ x: node.x, y: node.y, scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
            className={`absolute rounded-full flex items-center justify-center text-white font-medium text-sm text-center p-2 shadow-lg backdrop-blur-sm bg-opacity-90 border border-white/20 ${getColor(node.status)}`}
            style={{
                width: node.size,
                height: node.size,
                left: 0,
            }}
        >
            {node.label}
        </motion.div>
    );
};

export default KnowledgeNebulaPage;

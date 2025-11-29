import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Send, User, MessageSquare, BookOpen, LayoutDashboard, Book, MoreHorizontal, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 导入数据
import learningDialogueData from '../data/LearningDialoguePageData';
import learningQAData from '../data/learning_dialogue_qa_data';
import learningResourcesData, { recommendResources } from '../data/learning_dialogue_resources_data';
import learningPracticeData, { recommendPractice } from '../data/learning_dialogue_practice_data';
import learningAssessmentData from '../data/learning_dialogue_assessment_data';

// 导入工具函数
import {
    saveDialogueHistory,
    loadDialogueHistory,
    saveLearningProgress,
    analyzeMasteryLevel,
    recommendNextStep,
    selectContentType,
    formatUserMessage,
    formatAIMessage
} from '../utils/dialogueUtils';

// 导入新组件
import LearningQACard from '../components/chat-widgets/LearningQACard';
import ResourceRecommendCard from '../components/chat-widgets/ResourceRecommendCard';
import PracticeCard from '../components/chat-widgets/PracticeCard';
import AssessmentCard from '../components/chat-widgets/AssessmentCard';
import MasteryLevelSelector from '../components/chat-widgets/MasteryLevelSelector';
import PathRecommendCard from '../components/chat-widgets/PathRecommendCard';

/**
 * 消息气泡组件
 */
const MessageBubble = ({ message, onCardAction }) => {
    const isUser = message.sender === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            {/* 头像 */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${isUser
                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                : 'bg-gradient-to-br from-purple-500 to-purple-600'
                }`}>
                {isUser ? (
                    <User size={18} className="text-white" />
                ) : (
                    <Sparkles size={18} className="text-white" />
                )}
            </div>

            {/* 内容 */}
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                    <span className={`text-xs font-bold ${isUser ? 'text-blue-600' : 'text-purple-600'}`}>
                        {isUser ? '我' : 'AI 教师'}
                    </span>
                </div>

                {/* 文本消息 */}
                {message.type === 'text' && (
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${isUser
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                        }`}>
                        {message.content}
                    </div>
                )}

                {/* 学习答疑卡片 */}
                {message.type === 'qa' && message.data && (
                    <LearningQACard
                        qaData={message.data}
                        onChangeExplanation={(type) => onCardAction?.('qa_change', type)}
                    />
                )}

                {/* 资源推荐卡片 */}
                {message.type === 'resource' && message.data && (
                    <ResourceRecommendCard
                        resources={message.data}
                        onSelectResource={(resource) => onCardAction?.('resource_select', resource)}
                    />
                )}

                {/* 随堂练习卡片 */}
                {message.type === 'practice' && message.data && (
                    <PracticeCard
                        practiceSet={message.data}
                        onComplete={(result) => onCardAction?.('practice_complete', result)}
                        onSkip={() => onCardAction?.('practice_skip')}
                    />
                )}

                {/* 评测卡片 */}
                {message.type === 'assessment' && message.data && (
                    <AssessmentCard
                        assessment={message.data}
                        onComplete={(result) => onCardAction?.('assessment_complete', result)}
                        onSkip={() => onCardAction?.('assessment_skip')}
                    />
                )}

                {/* 掌握程度选择器 */}
                {message.type === 'mastery_selector' && (
                    <MasteryLevelSelector
                        onSelect={(level) => onCardAction?.('mastery_select', level)}
                    />
                )}

                {/* 学习路径推荐 */}
                {message.type === 'path_recommend' && message.data && (
                    <PathRecommendCard
                        recommendation={message.data}
                        onSelectPath={(action) => onCardAction?.('path_select', action)}
                    />
                )}
            </div>
        </motion.div>
    );
};

/**
 * 学习对话页面主组件
 */
const LearningDialoguePage = () => {
    const { nodeId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const [currentMasteryLevel, setCurrentMasteryLevel] = useState(null);
    const [mode, setMode] = useState('qa'); // 'qa' 或 'teach'
    const messagesEndRef = useRef(null);

    // 加载数据
    const nodeData = learningDialogueData[nodeId] || learningDialogueData['node-3'];
    const topicKey = 'wave-particle-duality'; // 根据nodeId映射

    useEffect(() => {
        // 尝试加载历史对话
        const history = loadDialogueHistory(nodeId);

        if (history && history.length > 0) {
            setMessages(history);
        } else if (nodeData) {
            // 使用初始消息
            setMessages(nodeData.initialMessages || []);
        }
    }, [nodeId, nodeData]);

    // 自动滚动到底部
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 保存对话历史
    useEffect(() => {
        if (messages.length > 0) {
            saveDialogueHistory(nodeId, messages);
        }
    }, [messages, nodeId]);

    /**
     * 添加AI消息
     */
    const addAIMessage = (type, data, content = '') => {
        const aiMessage = formatAIMessage(type, { data, content });
        setMessages(prev => [...prev, aiMessage]);
    };

    /**
     * 处理卡片交互
     */
    const handleCardAction = (actionType, actionData) => {
        switch (actionType) {
            case 'mastery_select':
                setCurrentMasteryLevel(actionData);
                saveLearningProgress(nodeId, actionData);

                // 根据掌握程度推荐路径
                const recommendation = recommendNextStep(actionData, topicKey);
                addAIMessage('path_recommend', recommendation, '根据你的掌握程度,我为你推荐以下学习路径:');
                break;

            case 'path_select':
                handlePathAction(actionData);
                break;

            case 'practice_complete':
                addAIMessage('text', null, `太棒了!你获得了 ${actionData.score}/${actionData.totalScore} 分。继续保持!`);
                break;

            case 'assessment_complete':
                if (actionData.passed) {
                    addAIMessage('text', null, '恭喜通过评测!你已经很好地掌握了这个知识点。');
                } else {
                    addAIMessage('text', null, '继续加油!建议多做练习来巩固理解。');
                }
                break;

            default:
                break;
        }
    };

    /**
     * 处理路径选择
     */
    const handlePathAction = (action) => {
        switch (action) {
            case 'back_to_intro':
                addAIMessage('text', null, '好的,让我们回到入门知识点,从基础开始学习。');
                break;

            case 'explain_again':
                // 推荐问答内容
                const qaData = learningQAData[topicKey];
                if (qaData && qaData.qaItems.length > 0) {
                    addAIMessage('qa', qaData.qaItems[0], '让我换一种方式来解释这个概念:');
                }
                break;

            case 'resource':
                // 推荐学习资源
                const resources = recommendResources(topicKey, currentMasteryLevel || 'level_2');
                if (resources.length > 0) {
                    addAIMessage('resource', resources, '我为你推荐以下学习资源:');
                } else {
                    addAIMessage('text', null, '正在为你准备学习资源...');
                }
                break;

            case 'practice':
                // 推荐常规练习
                const practiceSet = recommendPractice(topicKey, currentMasteryLevel);
                if (practiceSet) {
                    addAIMessage('practice', practiceSet, '让我们通过一些练习来巩固理解:');
                }
                break;

            case 'practice_easy':
                // 推荐降低难度的练习
                const easyPractice = recommendPractice(topicKey, 'level_2');
                if (easyPractice) {
                    addAIMessage('practice', easyPractice, '让我们从简单的题目开始:');
                }
                break;

            case 'next_content':
                // 推送下一步内容
                addAIMessage('text', null, '很好!让我们继续学习这个知识点的下一部分内容。');
                break;

            case 'consolidate':
                // 维持当前难度巩固
                const consolidatePractice = recommendPractice(topicKey, currentMasteryLevel);
                if (consolidatePractice) {
                    addAIMessage('practice', consolidatePractice, '让我们继续巩固这个知识点:');
                }
                break;

            case 'challenge':
                // 推荐高难度练习或评测
                const advancedPractice = recommendPractice(topicKey, 'level_4');
                if (advancedPractice) {
                    addAIMessage('practice', advancedPractice, '挑战更高难度的内容:');
                }
                break;

            case 'next_topic':
                addAIMessage('text', null, '太棒了!让我们进入下一个激动人心的话题!');
                break;

            default:
                break;
        }
    };

    /**
     * 发送消息
     */
    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // 添加用户消息
        const userMessage = formatUserMessage(text);
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setShowQuickReplies(false);

        // 延迟后添加AI回复
        setTimeout(() => {
            // 分析掌握程度
            const masteryLevel = analyzeMasteryLevel(text);

            if (masteryLevel) {
                // 如果识别到掌握程度,显示选择器确认
                setCurrentMasteryLevel(masteryLevel);
                const recommendation = recommendNextStep(masteryLevel, topicKey);
                addAIMessage('path_recommend', recommendation, '根据你的反馈,我为你推荐:');
                return;
            }

            // 选择内容类型
            const contentType = selectContentType(text, currentMasteryLevel);

            switch (contentType) {
                case 'qa':
                    // 学习答疑
                    const qaData = learningQAData[topicKey];
                    if (qaData && qaData.qaItems.length > 0) {
                        addAIMessage('qa', qaData.qaItems[0], '让我来解答你的问题:');
                    } else {
                        addAIMessage('text', null, '这是一个很好的问题!让我详细解释一下...');
                    }
                    break;

                case 'resource':
                    // 资源推荐
                    const resources = recommendResources(topicKey, currentMasteryLevel || 'level_3_low');
                    if (resources.length > 0) {
                        addAIMessage('resource', resources, '我为你推荐以下学习资源:');
                    }
                    break;

                case 'practice':
                    // 随堂练习
                    const practiceSet = recommendPractice(topicKey, currentMasteryLevel || 'level_3_low');
                    if (practiceSet) {
                        addAIMessage('practice', practiceSet, '让我们通过练习来巩固:');
                    }
                    break;

                case 'assessment':
                    // 评测
                    const assessmentData = learningAssessmentData[topicKey];
                    if (assessmentData && assessmentData.assessments.length > 0) {
                        addAIMessage('assessment', assessmentData.assessments[0], '准备好了吗?让我们开始评测:');
                    }
                    break;

                default:
                    // 默认文本回复
                    addAIMessage('text', null, '我理解了你的问题。你想了解更多关于这个知识点的什么内容呢?');
                    break;
            }
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!nodeData) return <div className="text-white">Loading...</div>;

    const quickReplies = [
        '这个概念是什么意思?',
        '有什么学习资源推荐?',
        '我想做练习',
        '我想测试一下',
        '我对这个知识点的掌握程度如何?'
    ];

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex overflow-hidden font-sans text-slate-800 selection:bg-blue-200 relative">
            {/* 背景装饰 - 移除彩色光晕 */}

            {/* 主对话区域 */}
            <main className="flex-1 flex flex-col relative min-w-0 z-10">
                {/* 顶部栏 */}
                <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="h-16 flex items-center justify-between px-6 lg:px-10">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h2 className="font-bold text-slate-900 text-base tracking-tight">{nodeData.title}</h2>
                                <p className="text-xs text-slate-500">{nodeData.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-xs text-emerald-700 font-medium">在线</span>
                            </div>
                            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* 模式切换器 */}
                    <div className="px-6 lg:px-10 pb-3 flex items-center gap-3">
                        <GraduationCap size={18} className="text-slate-600" />
                        <span className="text-sm text-slate-600 font-medium">模式：</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode('qa')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === 'qa'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                <MessageSquare size={14} className="inline mr-1" />
                                问答模式
                            </button>
                            <button
                                onClick={() => setMode('teach')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === 'teach'
                                    ? 'bg-purple-500 text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                <BookOpen size={14} className="inline mr-1" />
                                教学模式
                            </button>
                        </div>
                        <span className="text-xs text-slate-400 ml-2">
                            {mode === 'qa' ? '快速解答你的疑问' : '系统化讲解知识点'}
                        </span>
                    </div>
                </header>

                {/* 消息容器 */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map(msg => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                onCardAction={handleCardAction}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* 输入区域 */}
                <div className="p-4 lg:p-6 relative z-20 bg-white/50 backdrop-blur-sm border-t border-slate-200">
                    <div className="max-w-4xl mx-auto">
                        {/* 快速回复 */}
                        <AnimatePresence>
                            {showQuickReplies && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="flex flex-wrap gap-2 mb-4 justify-center"
                                >
                                    {quickReplies.map((reply, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(reply)}
                                            className="px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-full text-xs text-slate-700 hover:text-blue-600 transition-all shadow-sm"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 输入框 */}
                        <div className="bg-white border border-slate-200 rounded-2xl flex items-center p-2 pl-4 gap-2 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-all shadow-md">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setShowQuickReplies(false)}
                                placeholder="输入你的问题..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400 h-10"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="text-center mt-2 text-xs text-slate-400">
                            AI 可能会出错,请验证重要信息
                        </div>
                    </div>
                </div>
            </main>

            {/* 右侧资源面板 */}
            <aside className="hidden xl:flex w-80 bg-white/80 backdrop-blur-xl border-l border-slate-200 flex-col overflow-y-auto flex-shrink-0 z-20 p-6 shadow-lg">
                <div className="mb-6">
                    <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-600" />
                        相关资源
                    </h3>
                    <div className="space-y-3">
                        {nodeData.rightPanel?.relatedResources?.map(resource => (
                            <div key={resource.id} className="group cursor-pointer bg-slate-50 rounded-xl p-2 hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                                    <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                    {resource.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                                                <BookOpen size={10} className="text-blue-600" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs font-bold text-slate-700 line-clamp-2 group-hover:text-blue-600">{resource.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default LearningDialoguePage;

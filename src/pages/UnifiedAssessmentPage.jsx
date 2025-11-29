import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { X, Activity } from 'lucide-react';
import AbilityRadarPage from './AbilityRadarPage';

import { useLocation } from 'react-router-dom';

// ... imports ...

const UnifiedAssessmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.level || 'medium'; // Default to medium if not set

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState('intro'); // intro, interview, analysis, interaction, complete
  const [modalContent, setModalContent] = useState(null);
  const [userType, setUserType] = useState(null); // visual, logical, academic

  const hasInitialized = React.useRef(false);
  const interactedMessageIds = React.useRef(new Set());

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Initial Greeting
    addTeacherMessage(`你好！我是你的数字老师。我看到你选择了“${getDifficultyName(difficulty)}”模式。`, 'text');

    setTimeout(() => {
      addTeacherMessage('为了给你推荐最合适的学习方案，我想先了解一下：\n\n你平时更喜欢通过什么方式学习？（例如：看视频、做练习、还是自己钻研？）', 'text');
      setStage('interview');
    }, 1500);
  }, []);

  const addTeacherMessage = (content, type = 'text', payload = {}) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'teacher',
        content,
        type,
        payload
      }]);
    }, 1500);
  };

  const handleSendMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', content: text, type: 'text' }]);

    if (stage === 'interview') {
      // Analyze user input (Mock AI Analysis)
      setIsTyping(true);
      setStage('analysis');

      setTimeout(() => {
        let type = 'logical'; // Default
        let reason = '逻辑思维型';
        let widget = 'game';

        if (text.includes('视频') || text.includes('看') || text.includes('听')) {
          type = 'visual';
          reason = '视觉感知型';
          widget = 'video';
        } else if (text.includes('题') || text.includes('练') || text.includes('考')) {
          type = 'academic';
          reason = '实战应用型';
          widget = 'quiz';
        }

        setUserType(type);
        setIsTyping(false);

        addTeacherMessage(`收到。通过分析你的回答，我认为你属于【${reason}】学习者。`, 'text');

        setTimeout(() => {
          addTeacherMessage(`基于这个判断，我为你准备了一个专属的互动环节，来验证我的评估。`, 'text');
          setTimeout(() => {
            if (widget === 'game') {
              addTeacherMessage('这是一个逻辑记忆挑战，请点击开始。', 'game');
            } else if (widget === 'video') {
              addTeacherMessage('这是一段核心知识点视频，请观看。', 'video', { title: '函数极限的概念', duration: '02:15' });
            } else {
              addTeacherMessage('这是一道经典真题，请尝试解答。', 'quiz', {
                question: "lim(x→∞) 1/x = ?",
                options: ["0", "1", "∞", "不存在"],
                correctAnswer: 0
              });
            }
            setStage('interaction');
          }, 1500);
        }, 1500);
      }, 1000);
    }
  };

  const handleInteract = (msgId, action, data) => {
    if (interactedMessageIds.current.has(msgId)) return;
    interactedMessageIds.current.add(msgId);

    // Common completion logic for all widgets
    if (['game_complete', 'video_complete', 'quiz_answer', 'skip'].includes(action)) {
      // Provide specific feedback based on action if needed, or generic
      let reply = '评估完成！你的表现非常棒。';
      if (action === 'skip') reply = '没关系，我们跳过这个环节。评估已完成。';
      else if (action === 'game_complete' && !data) reply = '没关系，重在参与。评估已完成。';
      else if (action === 'quiz_answer' && !data) reply = '正确答案是0。不过没关系，评估已完成。';

      addTeacherMessage(reply, 'text');

      setTimeout(() => {
        addTeacherMessage('正在生成你的个性化学习报告...', 'text');
        setTimeout(() => {
          navigate('/dashboard', { state: { difficulty, userType } });
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative">
      {/* Main Chat Area */}
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DigitalTeacherAvatar size="sm" state={isTyping ? 'speaking' : 'idle'} />
            <div>
              <h2 className="text-lg font-bold text-slate-800">数字老师 · 互动评估</h2>
              <p className="text-xs text-slate-500">当前阶段：{getStageName(stage)}</p>
            </div>
          </div>
          <button onClick={() => setModalContent('radar')} className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
            <Activity size={16} /> 查看实时画像
          </button>
        </div>

        <div className="flex-1 min-h-0 shadow-2xl rounded-2xl">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onInteract={handleInteract}
            placeholder="与老师对话..."
          />
        </div>
      </div>

      {/* Modal Overlay for Real-time Radar only */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-50 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                <h3 className="font-bold text-lg text-slate-800">实时能力分析</h3>
                <button onClick={() => setModalContent(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 h-[400px]">
                <AbilityRadarPage />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getStageName = (stage) => {
  const map = {
    intro: '准备中',
    rules: '规则介绍',
    ability: '逻辑思维',
    progress: '知识掌握',
    attitude: '学习心态',
    complete: '评估完成'
  };
  return map[stage] || '进行中';
};

const getDifficultyName = (level) => {
  const map = {
    simple: '简单',
    medium: '中等',
    hard: '困难'
  };
  return map[level] || '中等';
};

export default UnifiedAssessmentPage;

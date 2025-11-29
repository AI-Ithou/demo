// 对话工具函数 - 处理对话逻辑、数据持久化和智能推荐

// ==================== 数据持久化 ====================

/**
 * 保存对话历史到 localStorage
 * @param {string} nodeId - 知识点ID
 * @param {Array} messages - 消息数组
 */
export const saveDialogueHistory = (nodeId, messages) => {
    try {
        const key = `dialogue_history_${nodeId}`;
        const data = {
            nodeId,
            messages,
            timestamp: new Date().toISOString(),
            lastUpdated: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('保存对话历史失败:', error);
        return false;
    }
};

/**
 * 加载对话历史从 localStorage
 * @param {string} nodeId - 知识点ID
 * @returns {Array|null} 消息数组或null
 */
export const loadDialogueHistory = (nodeId) => {
    try {
        const key = `dialogue_history_${nodeId}`;
        const data = localStorage.getItem(key);
        if (!data) return null;

        const parsed = JSON.parse(data);
        // 检查是否过期(7天)
        const now = Date.now();
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (now - parsed.lastUpdated > sevenDays) {
            localStorage.removeItem(key);
            return null;
        }

        return parsed.messages;
    } catch (error) {
        console.error('加载对话历史失败:', error);
        return null;
    }
};

/**
 * 清除对话历史
 * @param {string} nodeId - 知识点ID
 */
export const clearDialogueHistory = (nodeId) => {
    try {
        const key = `dialogue_history_${nodeId}`;
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('清除对话历史失败:', error);
        return false;
    }
};

/**
 * 保存学习进度
 * @param {string} nodeId - 知识点ID
 * @param {string} masteryLevel - 掌握程度
 * @param {Object} progress - 进度数据
 */
export const saveLearningProgress = (nodeId, masteryLevel, progress = {}) => {
    try {
        const key = `learning_progress_${nodeId}`;
        const data = {
            nodeId,
            masteryLevel,
            progress,
            timestamp: new Date().toISOString(),
            lastUpdated: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('保存学习进度失败:', error);
        return false;
    }
};

/**
 * 加载学习进度
 * @param {string} nodeId - 知识点ID
 * @returns {Object|null} 进度数据或null
 */
export const loadLearningProgress = (nodeId) => {
    try {
        const key = `learning_progress_${nodeId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('加载学习进度失败:', error);
        return null;
    }
};

// ==================== 掌握程度分析 ====================

/**
 * 分析用户的掌握程度
 * @param {string} userInput - 用户输入
 * @param {Array} conversationHistory - 对话历史
 * @returns {string|null} 掌握程度等级
 */
export const analyzeMasteryLevel = (userInput, conversationHistory = []) => {
    const input = userInput.trim();

    // 直接匹配关键词
    const levelKeywords = {
        'level_1': ['完全不会', '一点都不懂', '完全不理解', '太难了'],
        'level_2': ['本知识点不会', '不太懂', '不理解', '没学会'],
        'level_3_low': ['本知识点会一些', '懂一点', '有点理解', '基本了解'],
        'level_3_high': ['本知识点会很多', '基本掌握', '理解得不错', '掌握得还行'],
        'level_4': ['本知识点完全掌握了', '完全理解', '已经掌握', '非常清楚']
    };

    for (const [level, keywords] of Object.entries(levelKeywords)) {
        if (keywords.some(keyword => input.includes(keyword))) {
            return level;
        }
    }

    // 如果没有直接匹配,返回null
    return null;
};

/**
 * 根据掌握程度等级获取描述
 * @param {string} level - 掌握程度等级
 * @returns {Object} 等级描述
 */
export const getMasteryLevelDescription = (level) => {
    const descriptions = {
        'level_1': {
            label: '完全不会',
            emoji: '😰',
            color: 'red',
            description: '对这个知识点完全陌生,需要从基础开始学习'
        },
        'level_2': {
            label: '本知识点不会',
            emoji: '😕',
            color: 'orange',
            description: '对这个知识点理解困难,需要重新讲解'
        },
        'level_3_low': {
            label: '本知识点会一些',
            emoji: '🤔',
            color: 'yellow',
            description: '初步理解了概念,但需要更多练习巩固'
        },
        'level_3_high': {
            label: '本知识点会很多',
            emoji: '😊',
            color: 'blue',
            description: '掌握得不错,可以选择挑战更高难度或继续下一章'
        },
        'level_4': {
            label: '本知识点完全掌握了',
            emoji: '🎉',
            color: 'green',
            description: '完全掌握了这个知识点,可以进入下一章学习'
        }
    };

    return descriptions[level] || descriptions['level_3_low'];
};

// ==================== 智能推荐 ====================

/**
 * 推荐下一步学习路径
 * @param {string} masteryLevel - 掌握程度
 * @param {string} currentTopic - 当前知识点
 * @returns {Object} 推荐信息
 * 
 * 学习场景逻辑:
 * ① 完全不会 → 返回基础入门 (补基础)
 * ② 本知识点不会 → 加强学习该知识点 (把当前知识点学会)
 * ③ 本知识点会一些 → 继续学习,维持难度 (保持节奏,不掉队)
 * ④ 本知识点会很多 → 突破与进阶 (突破自我)
 * ⑤ 完全掌握 → 推荐下一个知识点 (进入下一阶段)
 */
export const recommendNextStep = (masteryLevel, currentTopic) => {
    const recommendations = {
        'level_1': {
            action: 'back_to_intro',
            title: '返回基础入门',
            description: '你对这个知识点零理解,继续往下学没有意义。建议先回到最基础/入门的前置知识点重新学习。',
            nextStep: '返回入门知识点',
            icon: '⏮️',
            priority: 'high',
            goal: '补基础',
            color: 'from-red-500 to-pink-600'
        },
        'level_2': {
            action: 'strengthen_learning',
            title: '加强学习该知识点',
            description: '你已经接触过,但还没有掌握。我会为你降低难度,提供针对性的学习材料和练习。',
            nextStep: '开始加强学习',
            icon: '🔄',
            priority: 'high',
            goal: '把当前知识点学会',
            color: 'from-orange-500 to-red-600',
            options: [
                {
                    action: 'explain_again',
                    label: '重新讲解',
                    description: '用更简单的方式重新解释概念'
                },
                {
                    action: 'practice_easy',
                    label: '降低难度练习',
                    description: '从简单的题目开始巩固'
                },
                {
                    action: 'resource',
                    label: '学习材料',
                    description: '推送视频/讲义/例题'
                }
            ]
        },
        'level_3_low': {
            action: 'continue_learning',
            title: '继续学习(维持难度)',
            description: '你掌握了一部分,但还不够稳定。可以继续往后学,但需要辅助巩固。',
            nextStep: '继续常规难度学习',
            icon: '✍️',
            priority: 'medium',
            goal: '保持节奏,不掉队',
            color: 'from-yellow-500 to-orange-600',
            options: [
                {
                    action: 'practice',
                    label: '常规练习',
                    description: '给常规难度的练习题'
                },
                {
                    action: 'next_content',
                    label: '下一步内容',
                    description: '推送该知识点的下一步内容'
                },
                {
                    action: 'consolidate',
                    label: '维持巩固',
                    description: '维持当前难度继续巩固'
                }
            ]
        },
        'level_3_high': {
            action: 'choose_path',
            title: '突破与进阶',
            description: '你掌握得很好!可以选择挑战更难的内容突破自我,或者直接进入下一个知识点。',
            nextStep: '选择学习路径',
            icon: '🚀',
            priority: 'low',
            goal: '突破自我',
            color: 'from-blue-500 to-purple-600',
            options: [
                {
                    action: 'challenge',
                    label: '进阶挑战',
                    description: '给更难的题目,挑战型内容,拉高学习强度'
                },
                {
                    action: 'next_topic',
                    label: '进入下一章',
                    description: '继续学习下一个知识点'
                }
            ]
        },
        'level_4': {
            action: 'next_topic',
            title: '推荐下一个知识点',
            description: '你已经完全掌握了当前知识点,系统无需再强化当前内容。让我们自动跳转到下一个知识点,学习路径向前推进!',
            nextStep: '进入下一章',
            icon: '⏭️',
            priority: 'low',
            goal: '进入下一阶段',
            color: 'from-green-500 to-emerald-600'
        }
    };

    return recommendations[masteryLevel] || recommendations['level_3_low'];
};

// ==================== 内容类型选择 ====================

/**
 * 根据上下文选择合适的内容呈现方式
 * @param {string} userInput - 用户输入
 * @param {string} masteryLevel - 掌握程度
 * @returns {string} 内容类型
 */
export const selectContentType = (userInput, masteryLevel = null) => {
    const input = userInput.toLowerCase();

    // 关键词匹配
    if (input.includes('什么') || input.includes('为什么') || input.includes('怎么') ||
        input.includes('解释') || input.includes('讲解')) {
        return 'qa'; // 学习答疑
    }

    if (input.includes('视频') || input.includes('资源') || input.includes('推荐') ||
        input.includes('文章') || input.includes('材料')) {
        return 'resource'; // 资源推荐
    }

    if (input.includes('练习') || input.includes('题目') || input.includes('做题') ||
        input.includes('巩固')) {
        return 'practice'; // 随堂练习
    }

    if (input.includes('测试') || input.includes('评测') || input.includes('考试') ||
        input.includes('检验')) {
        return 'assessment'; // 评测
    }

    // 根据掌握程度推荐
    if (masteryLevel) {
        if (masteryLevel === 'level_1' || masteryLevel === 'level_2') {
            return 'qa'; // 需要解释
        } else if (masteryLevel === 'level_3_low') {
            return 'practice'; // 需要练习
        } else if (masteryLevel === 'level_3_high' || masteryLevel === 'level_4') {
            return 'assessment'; // 可以评测
        }
    }

    // 默认返回问答
    return 'qa';
};

// ==================== AI 回复生成 ====================

/**
 * 生成AI回复
 * @param {string} userInput - 用户输入
 * @param {string} contentType - 内容类型
 * @param {Object} context - 上下文信息
 * @returns {Object} AI消息对象
 */
export const generateAIResponse = (userInput, contentType, context = {}) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const baseMessage = {
        id: Date.now(),
        sender: 'teacher',
        timestamp
    };

    switch (contentType) {
        case 'qa':
            return {
                ...baseMessage,
                type: 'qa',
                content: '让我来解答你的问题...'
            };
        case 'resource':
            return {
                ...baseMessage,
                type: 'resource',
                content: '我为你推荐以下学习资源:'
            };
        case 'practice':
            return {
                ...baseMessage,
                type: 'practice',
                content: '让我们通过一些练习来巩固理解:'
            };
        case 'assessment':
            return {
                ...baseMessage,
                type: 'assessment',
                content: '准备好了吗?让我们开始评测:'
            };
        case 'mastery_check':
            return {
                ...baseMessage,
                type: 'mastery_selector',
                content: '请告诉我你对这个知识点的掌握程度:'
            };
        default:
            return {
                ...baseMessage,
                type: 'text',
                content: '我理解了,让我们继续...'
            };
    }
};

// ==================== 消息格式化 ====================

/**
 * 格式化用户消息
 * @param {string} content - 消息内容
 * @returns {Object} 消息对象
 */
export const formatUserMessage = (content) => {
    return {
        id: Date.now(),
        sender: 'user',
        type: 'text',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
};

/**
 * 格式化AI消息
 * @param {string} type - 消息类型
 * @param {Object} data - 消息数据
 * @returns {Object} 消息对象
 */
export const formatAIMessage = (type, data) => {
    return {
        id: Date.now() + 1,
        sender: 'teacher',
        type,
        ...data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
};

// ==================== 统计和分析 ====================

/**
 * 统计对话数据
 * @param {Array} messages - 消息数组
 * @returns {Object} 统计信息
 */
export const analyzeConversation = (messages) => {
    const stats = {
        totalMessages: messages.length,
        userMessages: 0,
        aiMessages: 0,
        qaCount: 0,
        resourceCount: 0,
        practiceCount: 0,
        assessmentCount: 0
    };

    messages.forEach(msg => {
        if (msg.sender === 'user') {
            stats.userMessages++;
        } else {
            stats.aiMessages++;

            switch (msg.type) {
                case 'qa':
                    stats.qaCount++;
                    break;
                case 'resource':
                    stats.resourceCount++;
                    break;
                case 'practice':
                    stats.practiceCount++;
                    break;
                case 'assessment':
                    stats.assessmentCount++;
                    break;
            }
        }
    });

    return stats;
};

export default {
    saveDialogueHistory,
    loadDialogueHistory,
    clearDialogueHistory,
    saveLearningProgress,
    loadLearningProgress,
    analyzeMasteryLevel,
    getMasteryLevelDescription,
    recommendNextStep,
    selectContentType,
    generateAIResponse,
    formatUserMessage,
    formatAIMessage,
    analyzeConversation
};

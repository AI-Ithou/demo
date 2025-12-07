// localStorage 工具函数 - 智能体数据管理

const STORAGE_KEYS = {
    AGENTS: 'teaching_platform_agents',
    STATISTICS: 'teaching_platform_agent_statistics',
    COMMENTS: 'teaching_platform_agent_comments',
    USER_RATINGS: 'teaching_platform_user_ratings',
    USAGE_RECORDS: 'teaching_platform_usage_records'
};

// ==================== 智能体管理 ====================

/**
 * 获取所有智能体
 */
export const getAllAgents = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.AGENTS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('获取智能体数据失败:', error);
        return [];
    }
};

/**
 * 保存智能体列表
 */
export const saveAgents = (agents) => {
    try {
        localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
        return true;
    } catch (error) {
        console.error('保存智能体数据失败:', error);
        return false;
    }
};

/**
 * 根据ID获取智能体
 */
export const getAgentById = (agentId) => {
    const agents = getAllAgents();
    return agents.find(agent => agent.id === agentId);
};

/**
 * 创建新智能体
 */
export const createAgent = (agentData) => {
    try {
        const agents = getAllAgents();
        const newAgent = {
            ...agentData,
            id: `agent-${Date.now()}`,
            createdAt: Date.now(),
            isActive: true
        };
        agents.push(newAgent);
        saveAgents(agents);

        // 初始化统计数据
        initializeAgentStatistics(newAgent.id);

        return newAgent;
    } catch (error) {
        console.error('创建智能体失败:', error);
        return null;
    }
};

/**
 * 更新智能体
 */
export const updateAgent = (agentId, updates) => {
    try {
        const agents = getAllAgents();
        const index = agents.findIndex(agent => agent.id === agentId);
        if (index !== -1) {
            agents[index] = { ...agents[index], ...updates };
            saveAgents(agents);
            return agents[index];
        }
        return null;
    } catch (error) {
        console.error('更新智能体失败:', error);
        return null;
    }
};

/**
 * 删除智能体
 */
export const deleteAgent = (agentId) => {
    try {
        const agents = getAllAgents();
        const filteredAgents = agents.filter(agent => agent.id !== agentId);
        saveAgents(filteredAgents);

        // 删除相关统计数据
        deleteAgentStatistics(agentId);

        return true;
    } catch (error) {
        console.error('删除智能体失败:', error);
        return false;
    }
};

// ==================== 统计数据管理 ====================

/**
 * 获取所有统计数据
 */
export const getAllStatistics = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.STATISTICS);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('获取统计数据失败:', error);
        return {};
    }
};

/**
 * 保存统计数据
 */
export const saveStatistics = (statistics) => {
    try {
        localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
        return true;
    } catch (error) {
        console.error('保存统计数据失败:', error);
        return false;
    }
};

/**
 * 获取单个智能体的统计数据
 */
export const getAgentStatistics = (agentId) => {
    const statistics = getAllStatistics();
    return statistics[agentId] || null;
};

/**
 * 初始化智能体统计数据
 */
export const initializeAgentStatistics = (agentId) => {
    const statistics = getAllStatistics();
    if (!statistics[agentId]) {
        statistics[agentId] = {
            agentId,
            totalUsage: 0,
            averageRating: 0,
            totalRatings: 0,
            totalComments: 0,
            usageByDate: [],
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            popularTimes: []
        };
        saveStatistics(statistics);
    }
};

/**
 * 删除智能体统计数据
 */
export const deleteAgentStatistics = (agentId) => {
    const statistics = getAllStatistics();
    delete statistics[agentId];
    saveStatistics(statistics);
};

/**
 * 记录智能体使用
 */
export const recordAgentUsage = (agentId) => {
    try {
        const statistics = getAllStatistics();
        if (!statistics[agentId]) {
            initializeAgentStatistics(agentId);
        }

        const agentStats = statistics[agentId];
        agentStats.totalUsage += 1;

        // 记录按日期的使用
        const today = new Date().toISOString().split('T')[0];
        const dateRecord = agentStats.usageByDate.find(d => d.date === today);
        if (dateRecord) {
            dateRecord.count += 1;
        } else {
            agentStats.usageByDate.push({ date: today, count: 1 });
        }

        // 只保留最近30天的数据
        if (agentStats.usageByDate.length > 30) {
            agentStats.usageByDate = agentStats.usageByDate.slice(-30);
        }

        // 记录使用时段
        const hour = new Date().getHours();
        const hourRecord = agentStats.popularTimes.find(h => h.hour === hour);
        if (hourRecord) {
            hourRecord.count += 1;
        } else {
            agentStats.popularTimes.push({ hour, count: 1 });
        }

        saveStatistics(statistics);
        return true;
    } catch (error) {
        console.error('记录使用失败:', error);
        return false;
    }
};

/**
 * 更新智能体评分
 */
export const updateAgentRating = (agentId, rating) => {
    try {
        const statistics = getAllStatistics();
        if (!statistics[agentId]) {
            initializeAgentStatistics(agentId);
        }

        const agentStats = statistics[agentId];

        // 更新评分分布
        agentStats.ratingDistribution[rating] += 1;
        agentStats.totalRatings += 1;

        // 计算平均评分
        let totalScore = 0;
        let totalCount = 0;
        for (let i = 1; i <= 5; i++) {
            totalScore += i * agentStats.ratingDistribution[i];
            totalCount += agentStats.ratingDistribution[i];
        }
        agentStats.averageRating = totalCount > 0 ? (totalScore / totalCount).toFixed(1) : 0;

        saveStatistics(statistics);
        return true;
    } catch (error) {
        console.error('更新评分失败:', error);
        return false;
    }
};

// ==================== 学生使用记录 ====================

/**
 * 获取所有学生使用记录
 */
export const getAllUsageRecords = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USAGE_RECORDS);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('获取学生使用记录失败:', error);
        return {};
    }
};

/**
 * 保存所有学生使用记录
 */
export const saveUsageRecords = (usageRecords) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USAGE_RECORDS, JSON.stringify(usageRecords));
        return true;
    } catch (error) {
        console.error('保存学生使用记录失败:', error);
        return false;
    }
};

/**
 * 获取单个智能体的学生使用记录
 */
export const getAgentUsageRecords = (agentId) => {
    const usageRecords = getAllUsageRecords();
    return usageRecords[agentId] || [];
};

/**
 * 更新单个智能体的学生使用记录
 */
export const upsertAgentUsageRecords = (agentId, records) => {
    const usageRecords = getAllUsageRecords();
    usageRecords[agentId] = records;
    saveUsageRecords(usageRecords);
    return usageRecords[agentId];
};

/**
 * 合并导入的学生使用记录（按 studentId 覆盖合并）
 */
export const mergeUsageRecords = (agentId, importedRecords = []) => {
    const usageRecords = getAllUsageRecords();
    const current = usageRecords[agentId] || [];
    const mergedMap = new Map();

    current.forEach(record => {
        if (record.studentId) {
            mergedMap.set(record.studentId, record);
        }
    });

    importedRecords.forEach(record => {
        if (record.studentId) {
            const existing = mergedMap.get(record.studentId) || {};
            mergedMap.set(record.studentId, { ...existing, ...record });
        }
    });

    usageRecords[agentId] = Array.from(mergedMap.values());
    saveUsageRecords(usageRecords);
    return usageRecords[agentId];
};

/**
 * 初始化学生使用记录
 */
export const initializeUsageRecords = (usageRecords = {}) => {
    try {
        if (!localStorage.getItem(STORAGE_KEYS.USAGE_RECORDS)) {
            saveUsageRecords(usageRecords);
        }
        return true;
    } catch (error) {
        console.error('初始化学生使用记录失败:', error);
        return false;
    }
};

// ==================== 留言评论管理 ====================

/**
 * 获取所有留言
 */
export const getAllComments = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('获取留言数据失败:', error);
        return [];
    }
};

/**
 * 保存留言列表
 */
export const saveComments = (comments) => {
    try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
        return true;
    } catch (error) {
        console.error('保存留言数据失败:', error);
        return false;
    }
};

/**
 * 获取特定智能体的留言
 */
export const getAgentComments = (agentId) => {
    const comments = getAllComments();
    return comments.filter(comment => comment.agentId === agentId);
};

/**
 * 添加留言
 */
export const addComment = (commentData) => {
    try {
        const comments = getAllComments();
        const newComment = {
            ...commentData,
            id: `comment-${Date.now()}`,
            createdAt: Date.now(),
            likes: 0,
            likedBy: [],
            replies: [],
            auditStatus: commentData.auditStatus || 'pending',
            auditRemark: commentData.auditRemark || '',
            auditedBy: commentData.auditedBy || null,
            auditedAt: commentData.auditedAt || null
        };
        comments.push(newComment);
        saveComments(comments);

        // 更新统计数据
        const statistics = getAllStatistics();
        if (statistics[commentData.agentId]) {
            statistics[commentData.agentId].totalComments += 1;
            saveStatistics(statistics);
        }

        // 如果包含评分，更新评分统计
        if (commentData.rating) {
            updateAgentRating(commentData.agentId, commentData.rating);
        }

        return newComment;
    } catch (error) {
        console.error('添加留言失败:', error);
        return null;
    }
};

/**
 * 更新留言
 */
export const updateComment = (commentId, updates) => {
    try {
        const comments = getAllComments();
        const index = comments.findIndex(comment => comment.id === commentId);
        if (index !== -1) {
            comments[index] = { ...comments[index], ...updates };
            saveComments(comments);
            return comments[index];
        }
        return null;
    } catch (error) {
        console.error('更新留言失败:', error);
        return null;
    }
};

/**
 * 删除留言
 */
export const deleteComment = (commentId) => {
    try {
        const comments = getAllComments();
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            const filteredComments = comments.filter(c => c.id !== commentId);
            saveComments(filteredComments);

            // 更新统计数据
            const statistics = getAllStatistics();
            if (statistics[comment.agentId]) {
                statistics[comment.agentId].totalComments = Math.max(0, statistics[comment.agentId].totalComments - 1);
                saveStatistics(statistics);
            }

            return true;
        }
        return false;
    } catch (error) {
        console.error('删除留言失败:', error);
        return false;
    }
};

/**
 * 添加留言回复
 */
export const addReply = (commentId, replyData) => {
    try {
        const comments = getAllComments();
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            const newReply = {
                ...replyData,
                id: `reply-${Date.now()}`,
                createdAt: Date.now()
            };
            comment.replies.push(newReply);
            saveComments(comments);
            return newReply;
        }
        return null;
    } catch (error) {
        console.error('添加回复失败:', error);
        return null;
    }
};

/**
 * 点赞留言
 */
export const likeComment = (commentId, userId) => {
    try {
        const comments = getAllComments();
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            if (!comment.likedBy) {
                comment.likedBy = [];
            }

            if (comment.likedBy.includes(userId)) {
                // 取消点赞
                comment.likedBy = comment.likedBy.filter(id => id !== userId);
                comment.likes = Math.max(0, comment.likes - 1);
            } else {
                // 点赞
                comment.likedBy.push(userId);
                comment.likes += 1;
            }

            saveComments(comments);
            return comment;
        }
        return null;
    } catch (error) {
        console.error('点赞失败:', error);
        return null;
    }
};

/**
 * 批量更新留言审核状态
 */
export const updateCommentsAuditStatus = (commentIds = [], status, remark = '', auditor = 'teacher-001') => {
    if (!status || commentIds.length === 0) {
        return [];
    }

    try {
        const comments = getAllComments();
        const now = Date.now();
        const updatedComments = comments.map(comment => {
            if (commentIds.includes(comment.id)) {
                return {
                    ...comment,
                    auditStatus: status,
                    auditRemark: remark || comment.auditRemark || '',
                    auditedBy: auditor,
                    auditedAt: now
                };
            }
            return comment;
        });

        saveComments(updatedComments);
        return updatedComments.filter(comment => commentIds.includes(comment.id));
    } catch (error) {
        console.error('更新审核状态失败:', error);
        return [];
    }
};

// ==================== 用户评分记录 ====================

/**
 * 获取用户的所有评分记录
 */
export const getUserRatings = (userId) => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_RATINGS);
        const ratings = data ? JSON.parse(data) : {};
        return ratings[userId] || {};
    } catch (error) {
        console.error('获取用户评分失败:', error);
        return {};
    }
};

/**
 * 保存用户对智能体的评分
 */
export const saveUserRating = (userId, agentId, rating) => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_RATINGS);
        const allRatings = data ? JSON.parse(data) : {};

        if (!allRatings[userId]) {
            allRatings[userId] = {};
        }

        allRatings[userId][agentId] = rating;

        localStorage.setItem(STORAGE_KEYS.USER_RATINGS, JSON.stringify(allRatings));
        return true;
    } catch (error) {
        console.error('保存用户评分失败:', error);
        return false;
    }
};

/**
 * 获取用户对特定智能体的评分
 */
export const getUserAgentRating = (userId, agentId) => {
    const userRatings = getUserRatings(userId);
    return userRatings[agentId] || 0;
};

// ==================== 初始化数据 ====================

/**
 * 从初始数据初始化 localStorage
 */
export const initializeFromData = (agents, statistics, comments, usageRecords = {}, commentAuditMap = {}) => {
    try {
        if (!localStorage.getItem(STORAGE_KEYS.AGENTS)) {
            saveAgents(agents);
        }
        if (!localStorage.getItem(STORAGE_KEYS.STATISTICS)) {
            saveStatistics(statistics);
        }
        if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
            const mergedComments = comments.map(comment => {
                const auditInfo = commentAuditMap[comment.id] || {};
                return {
                    ...comment,
                    auditStatus: comment.auditStatus || auditInfo.status || 'pending',
                    auditRemark: comment.auditRemark || auditInfo.remark || '',
                    auditedBy: comment.auditedBy || auditInfo.auditedBy || null,
                    auditedAt: comment.auditedAt || auditInfo.auditedAt || null
                };
            });
            saveComments(mergedComments);
        }
        if (!localStorage.getItem(STORAGE_KEYS.USAGE_RECORDS)) {
            saveUsageRecords(usageRecords);
        }
        return true;
    } catch (error) {
        console.error('初始化数据失败:', error);
        return false;
    }
};

/**
 * 清空所有智能体相关数据
 */
export const clearAllAgentData = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.AGENTS);
        localStorage.removeItem(STORAGE_KEYS.STATISTICS);
        localStorage.removeItem(STORAGE_KEYS.COMMENTS);
        localStorage.removeItem(STORAGE_KEYS.USER_RATINGS);
        localStorage.removeItem(STORAGE_KEYS.USAGE_RECORDS);
        return true;
    } catch (error) {
        console.error('清空数据失败:', error);
        return false;
    }
};

// 教案数据本地存储工具
const STORAGE_KEY = 'lesson_plans';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * 获取所有教案
 * @returns {Array} 教案列表
 */
export const getAllLessonPlans = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('获取教案列表失败:', error);
        return [];
    }
};

/**
 * 根据ID获取教案
 * @param {String} id - 教案ID
 * @returns {Object|null} 教案对象
 */
export const getLessonPlanById = (id) => {
    try {
        const plans = getAllLessonPlans();
        return plans.find(plan => plan.id === id) || null;
    } catch (error) {
        console.error('获取教案失败:', error);
        return null;
    }
};

/**
 * 保存教案
 * @param {Object} lessonPlan - 教案对象
 * @returns {Boolean} 是否成功
 */
export const saveLessonPlan = (lessonPlan) => {
    try {
        const plans = getAllLessonPlans();
        const existingIndex = plans.findIndex(p => p.id === lessonPlan.id);
        
        if (existingIndex >= 0) {
            // 更新现有教案
            lessonPlan.metadata.updatedAt = new Date().toISOString();
            plans[existingIndex] = lessonPlan;
        } else {
            // 添加新教案
            plans.push(lessonPlan);
        }
        
        // 检查存储大小
        const dataStr = JSON.stringify(plans);
        if (dataStr.length > MAX_STORAGE_SIZE) {
            throw new Error('存储空间不足，请删除一些旧教案');
        }
        
        localStorage.setItem(STORAGE_KEY, dataStr);
        return true;
    } catch (error) {
        console.error('保存教案失败:', error);
        throw error;
    }
};

/**
 * 删除教案
 * @param {String} id - 教案ID
 * @returns {Boolean} 是否成功
 */
export const deleteLessonPlan = (id) => {
    try {
        const plans = getAllLessonPlans();
        const filteredPlans = plans.filter(plan => plan.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPlans));
        return true;
    } catch (error) {
        console.error('删除教案失败:', error);
        return false;
    }
};

/**
 * 批量删除教案
 * @param {Array} ids - 教案ID数组
 * @returns {Boolean} 是否成功
 */
export const batchDeleteLessonPlans = (ids) => {
    try {
        const plans = getAllLessonPlans();
        const filteredPlans = plans.filter(plan => !ids.includes(plan.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPlans));
        return true;
    } catch (error) {
        console.error('批量删除教案失败:', error);
        return false;
    }
};

/**
 * 复制教案
 * @param {String} id - 源教案ID
 * @returns {Object|null} 新教案对象
 */
export const duplicateLessonPlan = (id) => {
    try {
        const sourcePlan = getLessonPlanById(id);
        if (!sourcePlan) {
            throw new Error('源教案不存在');
        }
        
        const newPlan = {
            ...sourcePlan,
            id: `lp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            title: `${sourcePlan.title} - 副本`,
            version: 1,
            status: 'draft',
            metadata: {
                ...sourcePlan.metadata,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
        
        saveLessonPlan(newPlan);
        return newPlan;
    } catch (error) {
        console.error('复制教案失败:', error);
        return null;
    }
};

/**
 * 更新教案状态
 * @param {String} id - 教案ID
 * @param {String} status - 新状态
 * @returns {Boolean} 是否成功
 */
export const updateLessonPlanStatus = (id, status) => {
    try {
        const plan = getLessonPlanById(id);
        if (!plan) {
            throw new Error('教案不存在');
        }
        
        plan.status = status;
        plan.metadata.updatedAt = new Date().toISOString();
        
        if (status === 'published') {
            plan.metadata.publishedAt = new Date().toISOString();
        }
        
        return saveLessonPlan(plan);
    } catch (error) {
        console.error('更新教案状态失败:', error);
        return false;
    }
};

/**
 * 搜索教案
 * @param {String} keyword - 搜索关键词
 * @param {Object} filters - 筛选条件
 * @returns {Array} 搜索结果
 */
export const searchLessonPlans = (keyword = '', filters = {}) => {
    try {
        let plans = getAllLessonPlans();
        
        // 关键词搜索
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            plans = plans.filter(plan => 
                plan.title.toLowerCase().includes(lowerKeyword) ||
                plan.courseName.toLowerCase().includes(lowerKeyword)
            );
        }
        
        // 课程筛选
        if (filters.courseId) {
            plans = plans.filter(plan => plan.courseId === filters.courseId);
        }
        
        // 状态筛选
        if (filters.status) {
            plans = plans.filter(plan => plan.status === filters.status);
        }
        
        // 日期范围筛选
        if (filters.startDate) {
            plans = plans.filter(plan => 
                new Date(plan.metadata.createdAt) >= new Date(filters.startDate)
            );
        }
        
        if (filters.endDate) {
            plans = plans.filter(plan => 
                new Date(plan.metadata.createdAt) <= new Date(filters.endDate)
            );
        }
        
        return plans;
    } catch (error) {
        console.error('搜索教案失败:', error);
        return [];
    }
};

/**
 * 获取存储使用情况
 * @returns {Object} 存储使用信息
 */
export const getStorageInfo = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const usedSize = data ? new Blob([data]).size : 0;
        const usagePercent = (usedSize / MAX_STORAGE_SIZE) * 100;
        
        return {
            usedSize,
            maxSize: MAX_STORAGE_SIZE,
            usagePercent: usagePercent.toFixed(2),
            availableSize: MAX_STORAGE_SIZE - usedSize
        };
    } catch (error) {
        console.error('获取存储信息失败:', error);
        return {
            usedSize: 0,
            maxSize: MAX_STORAGE_SIZE,
            usagePercent: 0,
            availableSize: MAX_STORAGE_SIZE
        };
    }
};

/**
 * 导出所有教案数据（用于备份）
 * @returns {String} JSON字符串
 */
export const exportAllData = () => {
    try {
        const plans = getAllLessonPlans();
        return JSON.stringify(plans, null, 2);
    } catch (error) {
        console.error('导出数据失败:', error);
        return '[]';
    }
};

/**
 * 导入教案数据（用于恢复）
 * @param {String} jsonData - JSON字符串
 * @returns {Boolean} 是否成功
 */
export const importData = (jsonData) => {
    try {
        const plans = JSON.parse(jsonData);
        if (!Array.isArray(plans)) {
            throw new Error('数据格式错误');
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
        return true;
    } catch (error) {
        console.error('导入数据失败:', error);
        return false;
    }
};

/**
 * 清空所有教案数据
 * @returns {Boolean} 是否成功
 */
export const clearAllData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('清空数据失败:', error);
        return false;
    }
};

/**
 * 按课程ID获取教案列表
 * @param {String} courseId - 课程ID
 * @returns {Array} 教案列表
 */
export const getLessonPlansByCourse = (courseId) => {
    try {
        const plans = getAllLessonPlans();
        return plans.filter(plan => plan.courseId === courseId);
    } catch (error) {
        console.error('获取课程教案失败:', error);
        return [];
    }
};

/**
 * 获取教案统计信息
 * @returns {Object} 统计信息
 */
export const getLessonPlanStats = () => {
    try {
        const plans = getAllLessonPlans();
        
        return {
            total: plans.length,
            draft: plans.filter(p => p.status === 'draft').length,
            published: plans.filter(p => p.status === 'published').length,
            archived: plans.filter(p => p.status === 'archived').length,
            recentCount: plans.filter(p => {
                const daysDiff = (new Date() - new Date(p.metadata.createdAt)) / (1000 * 60 * 60 * 24);
                return daysDiff <= 7;
            }).length
        };
    } catch (error) {
        console.error('获取统计信息失败:', error);
        return {
            total: 0,
            draft: 0,
            published: 0,
            archived: 0,
            recentCount: 0
        };
    }
};

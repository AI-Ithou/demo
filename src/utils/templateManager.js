// 教案模板管理工具

const STORAGE_KEY = 'lesson_plan_templates';
const MAX_TEMPLATES = 20; // 个人模板数量限制

/**
 * 生成模板唯一ID
 */
export const generateTemplateId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `tpl_${timestamp}_${random}`;
};

/**
 * 获取所有模板
 * @returns {Array} 模板列表
 */
export const getAllTemplates = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('获取模板列表失败:', error);
        return [];
    }
};

/**
 * 根据ID获取模板
 * @param {String} id - 模板ID
 * @returns {Object|null} 模板对象
 */
export const getTemplateById = (id) => {
    try {
        const templates = getAllTemplates();
        return templates.find(tpl => tpl.templateId === id) || null;
    } catch (error) {
        console.error('获取模板失败:', error);
        return null;
    }
};

/**
 * 保存模板
 * @param {Object} template - 模板对象
 * @returns {Boolean} 是否成功
 */
export const saveTemplate = (template) => {
    try {
        const templates = getAllTemplates();
        const existingIndex = templates.findIndex(t => t.templateId === template.templateId);
        
        if (existingIndex >= 0) {
            // 更新现有模板
            template.updatedAt = new Date().toISOString();
            templates[existingIndex] = template;
        } else {
            // 添加新模板
            if (templates.length >= MAX_TEMPLATES) {
                throw new Error(`模板数量已达上限（${MAX_TEMPLATES}个），请删除一些旧模板`);
            }
            templates.push(template);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        return true;
    } catch (error) {
        console.error('保存模板失败:', error);
        throw error;
    }
};

/**
 * 删除模板
 * @param {String} id - 模板ID
 * @returns {Boolean} 是否成功
 */
export const deleteTemplate = (id) => {
    try {
        const templates = getAllTemplates();
        const filteredTemplates = templates.filter(tpl => tpl.templateId !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTemplates));
        return true;
    } catch (error) {
        console.error('删除模板失败:', error);
        return false;
    }
};

/**
 * 从当前配置创建模板
 * @param {String} name - 模板名称
 * @param {String} type - 模板类型 (parameter/outline/content/mixed)
 * @param {Object} config - 配置数据
 * @param {Object} metadata - 元数据
 * @returns {Object} 模板对象
 */
export const createTemplate = (name, type, config, metadata = {}) => {
    const template = {
        templateId: generateTemplateId(),
        name,
        type,
        category: metadata.category || '',
        description: metadata.description || '',
        author: metadata.author || '匿名',
        scope: 'personal', // personal/team/public
        tags: metadata.tags || [],
        usageCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        config, // 存储完整配置
        previewData: generatePreviewData(type, config)
    };
    
    return template;
};

/**
 * 生成模板预览数据
 * @param {String} type - 模板类型
 * @param {Object} config - 配置数据
 * @returns {Object} 预览数据
 */
const generatePreviewData = (type, config) => {
    const preview = {
        type,
        summary: []
    };
    
    if (type === 'parameter' || type === 'mixed') {
        // 参数模板预览
        if (config.gradeLevel) preview.summary.push(`学段: ${config.gradeLevel}`);
        if (config.subject) preview.summary.push(`学科: ${config.subject}`);
        if (config.difficulty) preview.summary.push(`难度: ${config.difficulty}`);
        if (config.toneStyle) preview.summary.push(`语气: ${config.toneStyle}`);
    }
    
    if (type === 'outline' || type === 'mixed') {
        // 大纲模板预览
        if (config.enabledModules) {
            preview.summary.push(`模块数: ${config.enabledModules.length}`);
        }
    }
    
    if (type === 'content') {
        // 内容模板预览
        preview.summary.push('完整教案内容');
        if (config.title) preview.summary.push(`标题: ${config.title}`);
    }
    
    return preview;
};

/**
 * 应用模板到表单
 * @param {Object} template - 模板对象
 * @param {Object} currentFormData - 当前表单数据
 * @returns {Object} 合并后的表单数据
 */
export const applyTemplate = (template, currentFormData = {}) => {
    try {
        // 增加使用次数
        template.usageCount = (template.usageCount || 0) + 1;
        saveTemplate(template);
        
        // 合并配置
        const mergedData = {
            ...currentFormData,
            ...template.config,
            templateId: template.templateId
        };
        
        return mergedData;
    } catch (error) {
        console.error('应用模板失败:', error);
        throw error;
    }
};

/**
 * 搜索模板
 * @param {String} keyword - 搜索关键词
 * @param {Object} filters - 筛选条件
 * @returns {Array} 搜索结果
 */
export const searchTemplates = (keyword = '', filters = {}) => {
    try {
        let templates = getAllTemplates();
        
        // 关键词搜索
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            templates = templates.filter(tpl => 
                tpl.name.toLowerCase().includes(lowerKeyword) ||
                (tpl.description && tpl.description.toLowerCase().includes(lowerKeyword)) ||
                (tpl.tags && tpl.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)))
            );
        }
        
        // 类型筛选
        if (filters.type) {
            templates = templates.filter(tpl => tpl.type === filters.type);
        }
        
        // 分类筛选
        if (filters.category) {
            templates = templates.filter(tpl => tpl.category === filters.category);
        }
        
        // 作者筛选
        if (filters.author) {
            templates = templates.filter(tpl => tpl.author === filters.author);
        }
        
        // 按使用次数排序
        if (filters.sortBy === 'usage') {
            templates.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        } else if (filters.sortBy === 'date') {
            templates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        return templates;
    } catch (error) {
        console.error('搜索模板失败:', error);
        return [];
    }
};

/**
 * 导出模板为JSON
 * @param {String} id - 模板ID
 * @returns {String} JSON字符串
 */
export const exportTemplate = (id) => {
    try {
        const template = getTemplateById(id);
        if (!template) {
            throw new Error('模板不存在');
        }
        return JSON.stringify(template, null, 2);
    } catch (error) {
        console.error('导出模板失败:', error);
        throw error;
    }
};

/**
 * 从JSON导入模板
 * @param {String} jsonData - JSON字符串
 * @returns {Object} 导入的模板对象
 */
export const importTemplate = (jsonData) => {
    try {
        const template = JSON.parse(jsonData);
        
        // 验证必需字段
        if (!template.name || !template.type || !template.config) {
            throw new Error('模板数据格式错误');
        }
        
        // 生成新的ID和时间戳
        template.templateId = generateTemplateId();
        template.createdAt = new Date().toISOString();
        template.updatedAt = new Date().toISOString();
        template.usageCount = 0;
        
        // 保存模板
        saveTemplate(template);
        
        return template;
    } catch (error) {
        console.error('导入模板失败:', error);
        throw error;
    }
};

/**
 * 复制模板
 * @param {String} id - 源模板ID
 * @param {String} newName - 新模板名称
 * @returns {Object} 新模板对象
 */
export const duplicateTemplate = (id, newName = null) => {
    try {
        const sourceTemplate = getTemplateById(id);
        if (!sourceTemplate) {
            throw new Error('源模板不存在');
        }
        
        const newTemplate = {
            ...sourceTemplate,
            templateId: generateTemplateId(),
            name: newName || `${sourceTemplate.name} - 副本`,
            usageCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        saveTemplate(newTemplate);
        return newTemplate;
    } catch (error) {
        console.error('复制模板失败:', error);
        throw error;
    }
};

/**
 * 获取模板统计信息
 * @returns {Object} 统计信息
 */
export const getTemplateStats = () => {
    try {
        const templates = getAllTemplates();
        
        return {
            total: templates.length,
            byType: {
                parameter: templates.filter(t => t.type === 'parameter').length,
                outline: templates.filter(t => t.type === 'outline').length,
                content: templates.filter(t => t.type === 'content').length,
                mixed: templates.filter(t => t.type === 'mixed').length
            },
            mostUsed: templates.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 5),
            recentCount: templates.filter(t => {
                const daysDiff = (new Date() - new Date(t.createdAt)) / (1000 * 60 * 60 * 24);
                return daysDiff <= 7;
            }).length
        };
    } catch (error) {
        console.error('获取统计信息失败:', error);
        return {
            total: 0,
            byType: { parameter: 0, outline: 0, content: 0, mixed: 0 },
            mostUsed: [],
            recentCount: 0
        };
    }
};

/**
 * 清空所有模板
 * @returns {Boolean} 是否成功
 */
export const clearAllTemplates = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('清空模板失败:', error);
        return false;
    }
};

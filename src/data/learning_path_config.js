// 学习路径配置数据结构

// 学习路径定义
export class LearningPath {
    constructor(data = {}) {
        this.id = data.id || `path-${Date.now()}`;
        this.name = data.name || '未命名路径';
        this.description = data.description || '';
        this.knowledgePoints = data.knowledgePoints || []; // 选中的知识点ID数组
        this.order = data.order || []; // 知识点学习顺序
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.aiSuggestions = data.aiSuggestions || null;
    }
}

// AI分析结果
export class AIAnalysis {
    constructor(data = {}) {
        this.difficulty = data.difficulty || 'unknown'; // 难度评级
        this.totalHours = data.totalHours || 0; // 总学时
        this.recommendedOrder = data.recommendedOrder || []; // 推荐顺序
        this.resourceTypes = data.resourceTypes || []; // 推荐资源类型
        this.warnings = data.warnings || []; // 警告信息
        this.timestamp = data.timestamp || new Date().toISOString();
    }
}

// 路径管理工具函数
export const PathManager = {
    // 获取所有路径
    getAllPaths() {
        const saved = localStorage.getItem('learningPaths');
        if (!saved) return [];
        return JSON.parse(saved).map(p => new LearningPath(p));
    },

    // 保存路径
    savePath(path) {
        const paths = this.getAllPaths();
        const index = paths.findIndex(p => p.id === path.id);

        path.updatedAt = new Date().toISOString();

        if (index >= 0) {
            paths[index] = path;
        } else {
            paths.push(path);
        }

        localStorage.setItem('learningPaths', JSON.stringify(paths));
        return path;
    },

    // 删除路径
    deletePath(pathId) {
        const paths = this.getAllPaths();
        const filtered = paths.filter(p => p.id !== pathId);
        localStorage.setItem('learningPaths', JSON.stringify(filtered));
    },

    // 获取单个路径
    getPath(pathId) {
        const paths = this.getAllPaths();
        return paths.find(p => p.id === pathId);
    },

    // 复制路径
    duplicatePath(pathId) {
        const original = this.getPath(pathId);
        if (!original) return null;

        const copy = new LearningPath({
            ...original,
            id: `path-${Date.now()}`,
            name: `${original.name} (副本)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return this.savePath(copy);
    }
};

// AI分析工具
export const AIAnalyzer = {
    // 分析知识点集合
    analyze(knowledgePoints, knowledgeTree) {
        const analysis = new AIAnalysis();

        // 计算总学时
        analysis.totalHours = knowledgePoints.reduce((sum, kp) => {
            return sum + (kp.estimatedHours || 0);
        }, 0);

        // 评估难度
        analysis.difficulty = this.calculateDifficulty(knowledgePoints);

        // 推荐学习顺序
        analysis.recommendedOrder = this.suggestOrder(knowledgePoints);

        // 推荐资源类型
        analysis.resourceTypes = this.suggestResources(knowledgePoints);

        // 检查警告
        analysis.warnings = this.getWarnings(knowledgePoints);

        return analysis;
    },

    // 计算难度等级
    calculateDifficulty(knowledgePoints) {
        if (knowledgePoints.length === 0) return '未知';

        const difficultyMap = { basic: 1, intermediate: 2, advanced: 3 };
        const avgDifficulty = knowledgePoints.reduce((sum, kp) => {
            return sum + (difficultyMap[kp.difficulty] || 1);
        }, 0) / knowledgePoints.length;

        if (avgDifficulty <= 1.3) return '基础';
        if (avgDifficulty <= 2.3) return '中等';
        return '高级';
    },

    // 推荐学习顺序
    suggestOrder(knowledgePoints) {
        // 简单算法：按照ID排序（章节顺序）
        return [...knowledgePoints].sort((a, b) => {
            return a.id.localeCompare(b.id);
        }).map(kp => kp.id);
    },

    // 推荐资源类型
    suggestResources(knowledgePoints) {
        const resources = [];
        const avgDifficulty = this.calculateDifficulty(knowledgePoints);

        if (avgDifficulty === '基础') {
            resources.push('视频讲解', '基础练习', '概念卡片');
        } else if (avgDifficulty === '中等') {
            resources.push('视频讲解', '典型例题', '巩固练习', '知识总结');
        } else {
            resources.push('深度讲解', '高级例题', '综合练习', '真题演练', '竞赛题');
        }

        return resources;
    },

    // 获取警告信息
    getWarnings(knowledgePoints) {
        const warnings = [];

        if (knowledgePoints.length === 0) {
            warnings.push('未选择任何知识点');
        }

        if (knowledgePoints.length === 1) {
            warnings.push('只选择了1个知识点，建议至少选择2-3个形成完整学习路径');
        }

        if (knowledgePoints.length > 15) {
            warnings.push('选择的知识点较多（超过15个），可能需要较长学习时间');
        }

        const totalHours = knowledgePoints.reduce((sum, kp) => sum + (kp.estimatedHours || 0), 0);
        if (totalHours > 100) {
            warnings.push(`预计学时较长（${totalHours}小时），建议分阶段学习`);
        }

        return warnings;
    }
};

export default {
    LearningPath,
    AIAnalysis,
    PathManager,
    AIAnalyzer
};

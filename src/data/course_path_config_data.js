// 课程学习路径配置数据
// 为不同难度级别预设知识点学习路径

export const DIFFICULTY_LEVELS = {
    simple: {
        id: 'simple',
        label: '简单',
        color: '#10b981', // emerald
        description: '适合基础薄弱的学生，循序渐进掌握核心知识点',
        totalKnowledgePoints: 8,
        estimatedHours: 80,
        targetScore: '60-75分'
    },
    medium: {
        id: 'medium',
        label: '中等',
        color: '#3b82f6', // blue
        description: '适合有一定基础的学生，全面系统学习知识体系',
        totalKnowledgePoints: 12,
        estimatedHours: 120,
        targetScore: '75-90分'
    },
    hard: {
        id: 'hard',
        label: '困难',
        color: '#f43f5e', // rose
        description: '适合基础扎实的学生，深入学习并挑战高难度题目',
        totalKnowledgePoints: 16,
        estimatedHours: 160,
        targetScore: '90-100分'
    }
};

export const LEARNING_PATH_TEMPLATES = {
    simple: {
        pathNodes: [
            {
                id: 'simple-1',
                label: '基础概念',
                stage: 1,
                status: 'locked',
                progress: 0,
                description: '了解基本概念，建立初步认知',
                stats: { resources: 3, exercises: 10, questions: 0 },
                position: { x: 150, y: 300 },
                color: '#10b981'
            },
            {
                id: 'simple-2',
                label: '核心公式',
                stage: 2,
                status: 'locked',
                progress: 0,
                description: '掌握基本公式和运算规则',
                stats: { resources: 4, exercises: 15, questions: 0 },
                position: { x: 350, y: 300 },
                color: '#10b981'
            },
            {
                id: 'simple-3',
                label: '基础例题',
                stage: 3,
                status: 'locked',
                progress: 0,
                description: '通过简单例题巩固知识',
                stats: { resources: 5, exercises: 20, questions: 0 },
                position: { x: 550, y: 300 },
                color: '#3b82f6'
            },
            {
                id: 'simple-4',
                label: '基础应用',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '解决简单的实际问题',
                stats: { resources: 4, exercises: 18, questions: 0 },
                position: { x: 750, y: 300 },
                color: '#3b82f6'
            },
            {
                id: 'simple-5',
                label: '专项训练',
                stage: 5,
                status: 'locked',
                progress: 0,
                description: '针对常见题型进行训练',
                stats: { resources: 6, exercises: 25, questions: 0 },
                position: { x: 950, y: 300 },
                color: '#8b5cf6'
            },
            {
                id: 'simple-6',
                label: '综合练习',
                stage: 6,
                status: 'locked',
                progress: 0,
                description: '综合运用所学知识',
                stats: { resources: 5, exercises: 20, questions: 0 },
                position: { x: 1150, y: 300 },
                color: '#f59e0b'
            }
        ],
        connections: [
            { from: 'simple-1', to: 'simple-2' },
            { from: 'simple-2', to: 'simple-3' },
            { from: 'simple-3', to: 'simple-4' },
            { from: 'simple-4', to: 'simple-5' },
            { from: 'simple-5', to: 'simple-6' }
        ]
    },

    medium: {
        pathNodes: [
            {
                id: 'medium-1',
                label: '概念梳理',
                stage: 1,
                status: 'locked',
                progress: 0,
                description: '系统梳理核心概念',
                stats: { resources: 5, exercises: 15, questions: 0 },
                position: { x: 150, y: 300 },
                color: '#10b981'
            },
            {
                id: 'medium-2',
                label: '公式推导',
                stage: 2,
                status: 'locked',
                progress: 0,
                description: '理解公式推导过程',
                stats: { resources: 6, exercises: 20, questions: 0 },
                position: { x: 350, y: 300 },
                color: '#10b981'
            },
            {
                id: 'medium-3',
                label: '典型例题',
                stage: 3,
                status: 'locked',
                progress: 0,
                description: '分析典型题目解法',
                stats: { resources: 8, exercises: 30, questions: 0 },
                position: { x: 550, y: 300 },
                color: '#3b82f6'
            },
            {
                id: 'medium-4-1',
                label: '代数应用',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '代数方法的应用',
                stats: { resources: 6, exercises: 25, questions: 0 },
                position: { x: 750, y: 200 },
                color: '#3b82f6'
            },
            {
                id: 'medium-4-2',
                label: '几何应用',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '几何方法的应用',
                stats: { resources: 6, exercises: 25, questions: 0 },
                position: { x: 750, y: 400 },
                color: '#8b5cf6'
            },
            {
                id: 'medium-5',
                label: '综合提高',
                stage: 5,
                status: 'locked',
                progress: 0,
                description: '多知识点综合运用',
                stats: { resources: 10, exercises: 40, questions: 0 },
                position: { x: 950, y: 300 },
                color: '#f59e0b'
            },
            {
                id: 'medium-6',
                label: '真题演练',
                stage: 6,
                status: 'locked',
                progress: 0,
                description: '历年真题练习',
                stats: { resources: 8, exercises: 35, questions: 0 },
                position: { x: 1150, y: 300 },
                color: '#ec4899'
            }
        ],
        connections: [
            { from: 'medium-1', to: 'medium-2' },
            { from: 'medium-2', to: 'medium-3' },
            { from: 'medium-3', to: 'medium-4-1' },
            { from: 'medium-3', to: 'medium-4-2' },
            { from: 'medium-4-1', to: 'medium-5' },
            { from: 'medium-4-2', to: 'medium-5' },
            { from: 'medium-5', to: 'medium-6' }
        ]
    },

    hard: {
        pathNodes: [
            {
                id: 'hard-1',
                label: '理论基础',
                stage: 1,
                status: 'locked',
                progress: 0,
                description: '深入理解数学理论',
                stats: { resources: 8, exercises: 20, questions: 0 },
                position: { x: 150, y: 300 },
                color: '#10b981'
            },
            {
                id: 'hard-2',
                label: '定理证明',
                stage: 2,
                status: 'locked',
                progress: 0,
                description: '掌握定理证明方法',
                stats: { resources: 10, exercises: 25, questions: 0 },
                position: { x: 350, y: 300 },
                color: '#10b981'
            },
            {
                id: 'hard-3',
                label: '高阶技巧',
                stage: 3,
                status: 'locked',
                progress: 0,
                description: '学习高级解题技巧',
                stats: { resources: 12, exercises: 35, questions: 0 },
                position: { x: 550, y: 300 },
                color: '#3b82f6'
            },
            {
                id: 'hard-4-1',
                label: '代数深化',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '代数方法深入研究',
                stats: { resources: 8, exercises: 30, questions: 0 },
                position: { x: 750, y: 150 },
                color: '#3b82f6'
            },
            {
                id: 'hard-4-2',
                label: '几何深化',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '几何方法深入研究',
                stats: { resources: 8, exercises: 30, questions: 0 },
                position: { x: 750, y: 300 },
                color: '#8b5cf6'
            },
            {
                id: 'hard-4-3',
                label: '函数分析',
                stage: 4,
                status: 'locked',
                progress: 0,
                description: '函数性质深入分析',
                stats: { resources: 8, exercises: 30, questions: 0 },
                position: { x: 750, y: 450 },
                color: '#06b6d4'
            },
            {
                id: 'hard-5',
                label: '竞赛训练',
                stage: 5,
                status: 'locked',
                progress: 0,
                description: '竞赛级难度训练',
                stats: { resources: 15, exercises: 50, questions: 0 },
                position: { x: 950, y: 300 },
                color: '#f59e0b'
            },
            {
                id: 'hard-6',
                label: '压轴突破',
                stage: 6,
                status: 'locked',
                progress: 0,
                description: '挑战压轴大题',
                stats: { resources: 12, exercises: 45, questions: 0 },
                position: { x: 1150, y: 300 },
                color: '#f43f5e'
            }
        ],
        connections: [
            { from: 'hard-1', to: 'hard-2' },
            { from: 'hard-2', to: 'hard-3' },
            { from: 'hard-3', to: 'hard-4-1' },
            { from: 'hard-3', to: 'hard-4-2' },
            { from: 'hard-3', to: 'hard-4-3' },
            { from: 'hard-4-1', to: 'hard-5' },
            { from: 'hard-4-2', to: 'hard-5' },
            { from: 'hard-4-3', to: 'hard-5' },
            { from: 'hard-5', to: 'hard-6' }
        ]
    }
};

// 默认课程配置
export const DEFAULT_COURSE_CONFIG = {
    difficulty: 'medium',
    userTypeAdaptation: {
        visual: {
            preferredTypes: ['video', 'interactive'],
            additionalResources: ['可视化演示', '图形工具']
        },
        academic: {
            preferredTypes: ['practice', 'quiz'],
            additionalResources: ['真题解析', '模拟考试']
        },
        logical: {
            preferredTypes: ['reading', 'theory'],
            additionalResources: ['逻辑推导', '思维导图']
        }
    }
};

export default {
    DIFFICULTY_LEVELS,
    LEARNING_PATH_TEMPLATES,
    DEFAULT_COURSE_CONFIG
};

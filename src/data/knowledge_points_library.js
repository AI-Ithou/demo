// 知识点库数据
// 教师可以从这里选择知识点来构建学习路径

export const KNOWLEDGE_POINTS_LIBRARY = [
    // 基础知识点
    {
        id: 'k1',
        name: '函数概念',
        category: '基础',
        description: '理解函数的定义、定义域、值域等基本概念',
        estimatedHours: 8,
        difficulty: 'basic',
        tags: ['函数', '基础概念']
    },
    {
        id: 'k2',
        name: '一元二次方程',
        category: '基础',
        description: '掌握一元二次方程的解法和应用',
        estimatedHours: 10,
        difficulty: 'basic',
        tags: ['方程', '代数']
    },
    {
        id: 'k3',
        name: '向量运算',
        category: '基础',
        description: '向量的加减、数乘和数量积运算',
        estimatedHours: 12,
        difficulty: 'basic',
        tags: ['向量', '运算']
    },
    {
        id: 'k4',
        name: '集合与逻辑',
        category: '基础',
        description: '集合的表示、运算及逻辑推理',
        estimatedHours: 6,
        difficulty: 'basic',
        tags: ['集合', '逻辑']
    },
    {
        id: 'k5',
        name: '不等式',
        category: '基础',
        description: '一元一次不等式、二次不等式的解法',
        estimatedHours: 8,
        difficulty: 'basic',
        tags: ['不等式', '代数']
    },

    // 进阶知识点
    {
        id: 'k6',
        name: '三角函数图像',
        category: '进阶',
        description: '正弦、余弦、正切函数的图像与性质',
        estimatedHours: 15,
        difficulty: 'intermediate',
        tags: ['三角函数', '图像']
    },
    {
        id: 'k7',
        name: '数列通项',
        category: '进阶',
        description: '等差数列、等比数列的通项公式',
        estimatedHours: 12,
        difficulty: 'intermediate',
        tags: ['数列', '公式']
    },
    {
        id: 'k8',
        name: '复合函数',
        category: '进阶',
        description: '复合函数的概念、性质和应用',
        estimatedHours: 10,
        difficulty: 'intermediate',
        tags: ['函数', '复合']
    },
    {
        id: 'k9',
        name: '立体几何',
        category: '进阶',
        description: '空间几何体的结构、三视图和直观图',
        estimatedHours: 14,
        difficulty: 'intermediate',
        tags: ['几何', '立体']
    },
    {
        id: 'k10',
        name: '概率统计',
        category: '进阶',
        description: '数据的收集、整理与描述，概率初步',
        estimatedHours: 12,
        difficulty: 'intermediate',
        tags: ['概率', '统计']
    },

    // 高级知识点
    {
        id: 'k11',
        name: '导数应用',
        category: '高级',
        description: '导数的几何意义、单调性、极值问题',
        estimatedHours: 18,
        difficulty: 'advanced',
        tags: ['导数', '应用']
    },
    {
        id: 'k12',
        name: '数列求和',
        category: '高级',
        description: '裂项相消、错位相减等求和方法',
        estimatedHours: 16,
        difficulty: 'advanced',
        tags: ['数列', '求和']
    },
    {
        id: 'k13',
        name: '圆锥曲线',
        category: '高级',
        description: '椭圆、双曲线、抛物线的性质与应用',
        estimatedHours: 20,
        difficulty: 'advanced',
        tags: ['几何', '曲线']
    },
    {
        id: 'k14',
        name: '积分计算',
        category: '高级',
        description: '定积分的概念、性质和计算方法',
        estimatedHours: 15,
        difficulty: 'advanced',
        tags: ['积分', '计算']
    },
    {
        id: 'k15',
        name: '参数方程',
        category: '高级',
        description: '参数方程的概念和应用',
        estimatedHours: 14,
        difficulty: 'advanced',
        tags: ['方程', '参数']
    },
    {
        id: 'k16',
        name: '三角恒等变换',
        category: '进阶',
        description: '和差公式、倍角公式的应用',
        estimatedHours: 12,
        difficulty: 'intermediate',
        tags: ['三角函数', '变换']
    },
    {
        id: 'k17',
        name: '平面向量综合',
        category: '高级',
        description: '向量在几何中的综合应用',
        estimatedHours: 16,
        difficulty: 'advanced',
        tags: ['向量', '综合']
    },
    {
        id: 'k18',
        name: '二项式定理',
        category: '进阶',
        description: '二项式定理及其应用',
        estimatedHours: 10,
        difficulty: 'intermediate',
        tags: ['定理', '组合']
    }
];

// 知识点分类
export const KNOWLEDGE_CATEGORIES = [
    { id: 'basic', name: '基础', color: '#10b981' },
    { id: 'intermediate', name: '进阶', color: '#3b82f6' },
    { id: 'advanced', name: '高级', color: '#f43f5e' }
];

// 难度级别信息
export const DIFFICULTY_INFO = {
    simple: {
        id: 'simple',
        label: '简单',
        color: '#10b981',
        description: '适合基础薄弱的学生',
        recommendedCount: { min: 3, max: 5 },
        targetScore: '60-75分'
    },
    medium: {
        id: 'medium',
        label: '中等',
        color: '#3b82f6',
        description: '适合有一定基础的学生',
        recommendedCount: { min: 6, max: 10 },
        targetScore: '75-90分'
    },
    hard: {
        id: 'hard',
        label: '困难',
        color: '#f43f5e',
        description: '适合基础扎实的学生',
        recommendedCount: { min: 10, max: 18 },
        targetScore: '90-100分'
    }
};

export default {
    KNOWLEDGE_POINTS_LIBRARY,
    KNOWLEDGE_CATEGORIES,
    DIFFICULTY_INFO
};

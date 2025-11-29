// 扩展后的错题本数据 - 包含状态管理和重做记录

const ERROR_QUESTIONS_DATA = {
    // 统计数据（实时计算）
    statistics: {
        totalErrors: 4,
        masteredCount: 0,
        reviewingCount: 0,
        notReviewedCount: 4,
        bySubject: {
            '数学': 2,
            '英语': 1,
            '物理': 1
        },
        byDifficulty: {
            '简单': 2,
            '中等': 1,
            '困难': 1
        },
        byKnowledgePoint: {
            '二次函数': { count: 1, correctRate: 0, mastery: 0 },
            '单调性': { count: 1, correctRate: 0, mastery: 0 },
            '语法': { count: 1, correctRate: 0, mastery: 0 },
            '自由落体': { count: 1, correctRate: 0, mastery: 0 },
            '不等式': { count: 1, correctRate: 0, mastery: 0 }
        }
    },

    // 智能诊断数据
    diagnosis: {
        errorCauses: [
            { name: '概念不清', value: 45, color: '#FF8042' },
            { name: '计算错误', value: 25, color: '#00C49F' },
            { name: '审题不清', value: 20, color: '#FFBB28' },
            { name: '逻辑漏洞', value: 10, color: '#0088FE' }
        ],
        weakPoints: [
            { name: '函数定义域', score: 60 },
            { name: '导数应用', score: 65 },
            { name: '三角恒等变换', score: 70 },
            { name: '立体几何', score: 72 }
        ],
        trend: [
            { month: '6月', rate: 25 },
            { month: '7月', rate: 22 },
            { month: '8月', rate: 18 },
            { month: '9月', rate: 20 },
            { month: '10月', rate: 15 },
            { month: '11月', rate: 12 }
        ]
    },

    // AI 个性化推荐
    recommendations: {
        remedialContent: [
            {
                id: 'rc-1',
                title: '二次函数图像与性质',
                type: 'video',
                duration: '12:30',
                thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop',
                reason: '针对"函数定义域"薄弱点'
            },
            {
                id: 'rc-2',
                title: '集合论核心概念',
                type: 'article',
                readTime: '8 min',
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
                reason: '巩固基础概念'
            }
        ],
        specializedTraining: {
            title: '函数定义域与值域专项突破',
            questionCount: 15,
            estimatedTime: '25 min',
            difficulty: '中等'
        },
        learningPath: [
            { id: 1, name: '函数基础', status: 'completed' },
            { id: 2, name: '二次函数', status: 'in-progress' },
            { id: 3, name: '指数与对数函数', status: 'locked' }
        ]
    },

    // 错题列表（扩展字段）
    questions: [
        {
            id: 'q1',
            subject: '数学',
            knowledgePoint: '二次函数',
            date: '2023-10-26',
            title: '已知函数 f(x) = ax² + bx + c...',
            content: '已知函数 f(x) = ax² + bx + c (a≠0) 在区间 [0, 1] 上单调递增，求 a 的取值范围。',
            myAnswer: 'a > 0',
            correctAnswer: 'a > 0 且 -b/2a ≤ 0 或 a < 0 且 -b/2a ≥ 1',
            analysis: '本题考查二次函数的单调性。需要结合对称轴的位置进行分类讨论。你忽略了对称轴在区间左侧或右侧的情况。',
            tags: ['二次函数', '单调性', '分类讨论'],
            difficulty: '困难',
            errorType: '逻辑漏洞',
            // 新增字段
            status: 'not_reviewed', // 'not_reviewed' | 'reviewing' | 'mastered'
            isPriority: false,
            retryCount: 0,
            retryHistory: [],
            lastReviewDate: null,
            addedDate: '2023-10-26'
        },
        {
            id: 'q2',
            subject: '英语',
            knowledgePoint: '语法',
            date: '2023-10-25',
            title: '"Photosynthesis is the process..." 的主语是？',
            content: 'Identify the subject in the sentence: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water."',
            myAnswer: 'process',
            correctAnswer: 'Photosynthesis',
            analysis: '句子结构分析错误。Is 是系动词，前面的是主语，后面的是表语。',
            tags: ['语法', '句子成分'],
            difficulty: '简单',
            errorType: '概念不清',
            status: 'not_reviewed',
            isPriority: false,
            retryCount: 0,
            retryHistory: [],
            lastReviewDate: null,
            addedDate: '2023-10-25'
        },
        {
            id: 'q3',
            subject: '物理',
            knowledgePoint: '自由落体',
            date: '2023-10-22',
            title: '计算小球从 10 米高处自由落体的速度...',
            content: '一个小球从 10 米高处自由落下，忽略空气阻力，g 取 10m/s²。求落地时的速度。',
            myAnswer: '10 m/s',
            correctAnswer: '14.14 m/s',
            analysis: '公式使用错误或计算错误。根据 v² = 2gh，v = √(2*10*10) = √200 ≈ 14.14 m/s。你可能误用了 v = gt 且算错了时间。',
            tags: ['自由落体', '运动学公式'],
            difficulty: '中等',
            errorType: '计算错误',
            status: 'not_reviewed',
            isPriority: false,
            retryCount: 0,
            retryHistory: [],
            lastReviewDate: null,
            addedDate: '2023-10-22'
        },
        {
            id: 'q4',
            subject: '数学',
            knowledgePoint: '不等式',
            date: '2023-10-20',
            title: '解不等式 |x-2| < 3',
            content: '求不等式 |x-2| < 3 的解集。',
            myAnswer: 'x < 5',
            correctAnswer: '-1 < x < 5',
            analysis: '绝对值不等式去绝对值时需要同时考虑大于负值和小于正值。|x-2| < 3 等价于 -3 < x-2 < 3。',
            tags: ['不等式', '绝对值'],
            difficulty: '简单',
            errorType: '概念不清',
            status: 'not_reviewed',
            isPriority: false,
            retryCount: 0,
            retryHistory: [],
            lastReviewDate: null,
            addedDate: '2023-10-20'
        }
    ]
};

export default ERROR_QUESTIONS_DATA;

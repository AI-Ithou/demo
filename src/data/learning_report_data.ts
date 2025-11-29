// 学习报告完整数据
import AI_LEARNING_ANALYSIS_DATA from './ai_learning_analysis_data';

export const LEARNING_REPORT_DATA = {
    // 学生基础信息
    studentInfo: {
        name: '李明同学',
        avatar: '👨‍🎓',
        grade: '高二',
        subject: '数学',
        currentTopic: '微积分基础'
    },

    // 1️⃣ 学习概览数据
    overview: {
        // 整体进度
        overallProgress: 68,
        // 学习天数
        totalDays: 45,
        // 持续学习天数
        streakDays: 12,
        // 本周亮点
        weeklyHighlights: [
            {
                id: 1,
                type: 'breakthrough',
                icon: '🎯',
                title: '掌握了导数定义',
                description: '从65%提升到92%',
                improvement: '+27%'
            },
            {
                id: 2,
                type: 'practice',
                icon: '📝',
                title: '完成30道习题',
                description: '正确率达到88%',
                improvement: '↑ 15%'
            },
            {
                id: 3,
                type: 'time',
                icon: '⏱️',
                title: '学习时长新高',
                description: '本周累计8.5小时',
                improvement: '+2.3h'
            }
        ],
        // 成就徽章
        achievements: [
            { id: 1, name: '连续学习7天', icon: '🔥', unlocked: true, date: '2025-11-20' },
            { id: 2, name: '完成100道题', icon: '💯', unlocked: true, date: '2025-11-22' },
            { id: 3, name: '单次正确率90%', icon: '⭐', unlocked: true, date: '2025-11-24' },
            { id: 4, name: '学霸段位', icon: '👑', unlocked: false, progress: 75 }
        ],
        // 排名信息
        ranking: {
            current: 15,
            total: 128,
            percentile: 88,
            change: 5 // 上升5名
        }
    },

    // 2️⃣ 能力雷达数据
    abilityRadar: {
        current: [
            { dimension: '概念理解', score: 85, fullMark: 100 },
            { dimension: '公式运用', score: 78, fullMark: 100 },
            { dimension: '逻辑推理', score: 92, fullMark: 100 },
            { dimension: '计算准确', score: 72, fullMark: 100 },
            { dimension: '解题速度', score: 68, fullMark: 100 },
            { dimension: '创新思维', score: 75, fullMark: 100 }
        ],
        lastWeek: [
            { dimension: '概念理解', score: 80, fullMark: 100 },
            { dimension: '公式运用', score: 72, fullMark: 100 },
            { dimension: '逻辑推理', score: 88, fullMark: 100 },
            { dimension: '计算准确', score: 70, fullMark: 100 },
            { dimension: '解题速度', score: 65, fullMark: 100 },
            { dimension: '创新思维', score: 73, fullMark: 100 }
        ],
        target: [
            { dimension: '概念理解', score: 95, fullMark: 100 },
            { dimension: '公式运用', score: 90, fullMark: 100 },
            { dimension: '逻辑推理', score: 95, fullMark: 100 },
            { dimension: '计算准确', score: 88, fullMark: 100 },
            { dimension: '解题速度', score: 85, fullMark: 100 },
            { dimension: '创新思维', score: 90, fullMark: 100 }
        ],
        weakestDimensions: ['计算准确', '解题速度']
    },

    // 3️⃣ 知识地图数据
    knowledgeMap: {
        modules: [
            {
                id: 1,
                name: '极限与连续',
                status: 'mastered',
                progress: 95,
                totalPoints: 8,
                masteredPoints: 8,
                subTopics: [
                    { name: '极限定义', mastery: 98 },
                    { name: '极限运算', mastery: 95 },
                    { name: '无穷小理论', mastery: 92 },
                    { name: '连续性', mastery: 96 }
                ]
            },
            {
                id: 2,
                name: '导数与微分',
                status: 'learning',
                progress: 68,
                totalPoints: 12,
                masteredPoints: 8,
                subTopics: [
                    { name: '导数定义', mastery: 92 },
                    { name: '基本求导', mastery: 85 },
                    { name: '复合函数求导', mastery: 72 },
                    { name: '隐函数求导', mastery: 45 },
                    { name: '高阶导数', mastery: 58 }
                ]
            },
            {
                id: 3,
                name: '导数应用',
                status: 'learning',
                progress: 42,
                totalPoints: 10,
                masteredPoints: 4,
                subTopics: [
                    { name: '单调性', mastery: 78 },
                    { name: '极值问题', mastery: 62 },
                    { name: '最值问题', mastery: 35 },
                    { name: '曲线凹凸性', mastery: 28 }
                ]
            },
            {
                id: 4,
                name: '积分学',
                status: 'locked',
                progress: 0,
                totalPoints: 15,
                masteredPoints: 0,
                subTopics: []
            },
            {
                id: 5,
                name: '微分方程',
                status: 'locked',
                progress: 0,
                totalPoints: 10,
                masteredPoints: 0,
                subTopics: []
            }
        ],
        nextRecommended: {
            module: '导数应用',
            topic: '最值问题',
            reason: '这是当前模块的薄弱点，掌握后可以显著提升整体进度'
        }
    },

    // 4️⃣ 学习表现趋势数据
    performanceTrends: {
        // 近30天的学习数据
        daily: [
            { date: '11-01', accuracy: 72, timeMinutes: 45, questionsCompleted: 12 },
            { date: '11-02', accuracy: 75, timeMinutes: 50, questionsCompleted: 15 },
            { date: '11-03', accuracy: 68, timeMinutes: 40, questionsCompleted: 10 },
            { date: '11-05', accuracy: 78, timeMinutes: 60, questionsCompleted: 18 },
            { date: '11-06', accuracy: 82, timeMinutes: 55, questionsCompleted: 16 },
            { date: '11-08', accuracy: 80, timeMinutes: 48, questionsCompleted: 14 },
            { date: '11-09', accuracy: 85, timeMinutes: 62, questionsCompleted: 20 },
            { date: '11-10', accuracy: 83, timeMinutes: 58, questionsCompleted: 17 },
            { date: '11-12', accuracy: 87, timeMinutes: 70, questionsCompleted: 22 },
            { date: '11-13', accuracy: 88, timeMinutes: 65, questionsCompleted: 19 },
            { date: '11-15', accuracy: 86, timeMinutes: 60, questionsCompleted: 18 },
            { date: '11-16', accuracy: 89, timeMinutes: 72, questionsCompleted: 24 },
            { date: '11-17', accuracy: 90, timeMinutes: 68, questionsCompleted: 21 },
            { date: '11-19', accuracy: 88, timeMinutes: 75, questionsCompleted: 25 },
            { date: '11-20', accuracy: 92, timeMinutes: 80, questionsCompleted: 28 },
            { date: '11-22', accuracy: 91, timeMinutes: 78, questionsCompleted: 26 },
            { date: '11-23', accuracy: 93, timeMinutes: 85, questionsCompleted: 30 },
            { date: '11-24', accuracy: 94, timeMinutes: 82, questionsCompleted: 29 },
            { date: '11-25', accuracy: 95, timeMinutes: 90, questionsCompleted: 32 }
        ],
        // 关键指标
        keyMetrics: {
            avgAccuracy: 88,
            accuracyTrend: '+12%',
            totalTime: 1260, // 分钟
            timeTrend: '+28%',
            totalQuestions: 425,
            questionsTrend: '+35%',
            bestStreak: 12,
            currentStreak: 12
        },
        // 每周对比
        weeklyComparison: [
            { week: '第1周', score: 72, questions: 45, time: 180 },
            { week: '第2周', score: 78, questions: 68, time: 240 },
            { week: '第3周', score: 82, questions: 92, time: 310 },
            { week: '第4周', score: 86, questions: 115, time: 380 },
            { week: '本周', score: 92, questions: 105, time: 450 }
        ]
    },

    // 5️⃣ 个性化建议数据
    recommendations: {
        // AI老师总评
        teacherComment: {
            avatar: '🤖',
            name: 'AI导师小智',
            message: '李明同学这周表现非常出色！你在导数定义这个核心知识点上取得了重大突破，从65%提升到92%，说明你的学习方法很有效。建议继续保持这个节奏，接下来重点攻克"最值问题"和"计算准确性"。加油！',
            sentiment: 'positive',
            encouragement: '你已经超越了88%的同学，继续保持！'
        },

        // 具体建议（按优先级排序）
        actionItems: [
            {
                id: 1,
                priority: 'high',
                type: 'practice',
                icon: '🎯',
                title: '重点突破：最值问题',
                description: '当前掌握度仅35%，是导数应用模块的关键知识点',
                actions: [
                    '观看视频教程《最值问题解题方法》（15分钟）',
                    '完成基础练习10题',
                    '尝试中等难度题目5题'
                ],
                estimatedTime: '45分钟',
                expectedImprovement: '+20%'
            },
            {
                id: 2,
                priority: 'high',
                type: 'skill',
                icon: '🧮',
                title: '提升计算准确性',
                description: '计算准确性72分，低于其他维度，影响做题速度',
                actions: [
                    '每天进行10分钟计算专项训练',
                    '整理易错计算类型',
                    '养成验算习惯'
                ],
                estimatedTime: '每日10分钟',
                expectedImprovement: '+15%'
            },
            {
                id: 3,
                priority: 'medium',
                type: 'consolidate',
                icon: '📚',
                title: '巩固隐函数求导',
                description: '掌握度45%，需要加强理解',
                actions: [
                    '复习隐函数求导的基本原理',
                    '练习典型题目15题',
                    '总结常见题型'
                ],
                estimatedTime: '60分钟',
                expectedImprovement: '+25%'
            },
            {
                id: 4,
                priority: 'low',
                type: 'mindset',
                icon: '💪',
                title: '保持学习节奏',
                description: '你已经连续学习12天，状态很好',
                actions: [
                    '继续保持每日学习习惯',
                    '适当休息，避免疲劳',
                    '定期回顾已掌握的知识点'
                ],
                estimatedTime: '持续进行',
                expectedImprovement: '维持高效状态'
            }
        ],

        // 3-7天学习计划
        weeklyPlan: [
            {
                day: '今天',
                date: '11-25',
                tasks: [
                    { type: 'video', content: '观看《最值问题》视频', duration: '15分钟' },
                    { type: 'practice', content: '完成最值问题基础题10道', duration: '30分钟' }
                ],
                focus: '最值问题入门'
            },
            {
                day: '明天',
                date: '11-26',
                tasks: [
                    { type: 'practice', content: '最值问题进阶练习8题', duration: '35分钟' },
                    { type: 'drill', content: '计算专项训练', duration: '10分钟' }
                ],
                focus: '最值问题强化'
            },
            {
                day: '11-27',
                date: '11-27',
                tasks: [
                    { type: 'reading', content: '复习隐函数求导原理', duration: '20分钟' },
                    { type: 'practice', content: '隐函数求导练习15题', duration: '40分钟' }
                ],
                focus: '隐函数求导'
            },
            {
                day: '11-28',
                date: '11-28',
                tasks: [
                    { type: 'test', content: '导数应用综合测试', duration: '45分钟' },
                    { type: 'review', content: '错题分析与总结', duration: '15分钟' }
                ],
                focus: '阶段测试'
            },
            {
                day: '11-29',
                date: '11-29',
                tasks: [
                    { type: 'video', content: '曲线凹凸性视频教程', duration: '18分钟' },
                    { type: 'practice', content: '基础练习12题', duration: '30分钟' }
                ],
                focus: '新知识点学习'
            }
        ],

        // 学习资源推荐
        resources: [
            {
                id: 1,
                type: 'video',
                title: '最值问题专题讲解',
                source: '名师课堂',
                duration: '15分钟',
                difficulty: '中等',
                rating: 4.8,
                matched: true // 匹配当前薄弱点
            },
            {
                id: 2,
                type: 'practice',
                title: '隐函数求导专项练习',
                source: '题库精选',
                questionCount: 50,
                difficulty: '中等',
                rating: 4.6,
                matched: true
            },
            {
                id: 3,
                type: 'article',
                title: '提高计算准确性的5个技巧',
                source: '学习方法',
                readTime: '8分钟',
                rating: 4.7,
                matched: true
            }
        ]
    },

    // 6️⃣ AI学情分析数据
    aiAnalysis: AI_LEARNING_ANALYSIS_DATA
};

// 导出类型定义（用于TypeScript类型检查）
export type LearningReportData = typeof LEARNING_REPORT_DATA;

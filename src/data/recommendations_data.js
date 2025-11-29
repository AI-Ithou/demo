/**
 * 建议页面数据
 */
export const getRecommendationsData = () => ({
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
            expectedImprovement: '+20%',
            completed: false
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
            expectedImprovement: '+15%',
            completed: false
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
            expectedImprovement: '+25%',
            completed: false
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
            expectedImprovement: '维持高效状态',
            completed: false
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
            matched: true
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
});

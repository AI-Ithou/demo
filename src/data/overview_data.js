/**
 * 统计报告页面数据
 */
export const getOverviewData = () => ({
    // 学生基础信息
    studentInfo: {
        name: '李明同学',
        avatar: '👨‍🎓',
        grade: '高二',
        subject: '数学',
        currentTopic: '微积分基础'
    },

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
    },

    // 学习表现趋势
    performanceTrends: {
        daily: [
            { date: '11-19', accuracy: 88, timeMinutes: 75, questionsCompleted: 25 },
            { date: '11-20', accuracy: 92, timeMinutes: 80, questionsCompleted: 28 },
            { date: '11-22', accuracy: 91, timeMinutes: 78, questionsCompleted: 26 },
            { date: '11-23', accuracy: 93, timeMinutes: 85, questionsCompleted: 30 },
            { date: '11-24', accuracy: 94, timeMinutes: 82, questionsCompleted: 29 },
            { date: '11-25', accuracy: 95, timeMinutes: 90, questionsCompleted: 32 }
        ],
        keyMetrics: {
            avgAccuracy: 88,
            accuracyTrend: '+12%',
            totalTime: 1260,
            timeTrend: '+28%',
            totalQuestions: 425,
            questionsTrend: '+35%',
            bestStreak: 12,
            currentStreak: 12
        }
    }
});

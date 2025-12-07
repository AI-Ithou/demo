// 学生挂科率数据
const FAIL_RATE_DATA = {
    // 总体挂科率
    overall: {
        rate: 12.5, // 挂科率12.5%
        trend: 'down', // 趋势：down下降, up上升, stable稳定
        previousRate: 18.2, // 上次挂科率
        improvement: 5.7 // 改善幅度
    },

    // 挂科科目详情
    failedSubjects: [
        {
            id: 'math-1',
            name: '高等数学',
            failRate: 25,
            status: 'critical', // critical严重, warning警告, normal正常
            lastExamScore: 58,
            passingScore: 60,
            weakPoints: ['导数应用', '定积分计算', '微分方程'],
            recommendedActions: [
                '重点复习导数与微分相关章节',
                '完成10道定积分练习题',
                '参加微分方程专题辅导'
            ]
        },
        {
            id: 'physics-1',
            name: '大学物理',
            failRate: 15,
            status: 'warning',
            lastExamScore: 62,
            passingScore: 60,
            weakPoints: ['电磁学', '光学'],
            recommendedActions: [
                '观看电磁学视频课程',
                '完成光学实验报告',
                '参加物理答疑课'
            ]
        }
    ],

    // 各学期挂科趋势
    semesterTrend: [
        { semester: '大一上', failRate: 22, subjects: 1 },
        { semester: '大一下', failRate: 18, subjects: 1 },
        { semester: '大二上', failRate: 15, subjects: 2 },
        { semester: '大二下', failRate: 12.5, subjects: 1 }
    ],

    // 挂科科目分类统计
    categoryStats: [
        { category: '数学类', count: 1, rate: 25, color: '#ef4444' },
        { category: '物理类', count: 1, rate: 15, color: '#f59e0b' },
        { category: '计算机类', count: 0, rate: 0, color: '#10b981' },
        { category: '英语类', count: 0, rate: 0, color: '#10b981' }
    ],

    // AI分析与建议
    aiAnalysis: {
        summary: '你的整体学习状态良好，挂科率呈下降趋势。主要问题集中在数理基础课程，需要加强基础概念理解和计算能力训练。',
        strengths: [
            '学习态度积极，挂科率持续下降',
            '计算机和英语类课程表现优秀',
            '能够及时发现并改进薄弱环节'
        ],
        weaknesses: [
            '数学基础薄弱，需要系统性复习',
            '物理概念理解不够深入',
            '做题量偏少，缺乏练习'
        ],
        recommendations: [
            {
                priority: 'high',
                action: '每天至少完成5道高等数学练习题',
                expectedImprovement: '预计可提升15分'
            },
            {
                priority: 'high',
                action: '参加数学和物理一对一辅导',
                expectedImprovement: '强化薄弱知识点'
            },
            {
                priority: 'medium',
                action: '组建学习小组，互相讨论难题',
                expectedImprovement: '提升理解深度'
            }
        ]
    },

    // 补考计划
    retakeSchedule: [
        {
            subject: '高等数学',
            retakeDate: '2024-12-20',
            daysLeft: 13,
            preparationStatus: 'in-progress', // not-started, in-progress, ready
            studyProgress: 65,
            targetScore: 75
        }
    ]
};

export default FAIL_RATE_DATA;

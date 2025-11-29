/**
 * 报告详情页面数据
 */
export const getDetailsData = () => ({
    // 能力雷达数据
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

    // 知识地图数据
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
            }
        ],
        nextRecommended: {
            module: '导数应用',
            topic: '最值问题',
            reason: '这是当前模块的薄弱点，掌握后可以显著提升整体进度'
        }
    },

    // 每周对比数据
    weeklyComparison: [
        { week: '第1周', score: 72, questions: 45, time: 180 },
        { week: '第2周', score: 78, questions: 68, time: 240 },
        { week: '第3周', score: 82, questions: 92, time: 310 },
        { week: '第4周', score: 86, questions: 115, time: 380 },
        { week: '本周', score: 92, questions: 105, time: 450 }
    ]
});

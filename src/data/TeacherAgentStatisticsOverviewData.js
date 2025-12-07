// TeacherAgentStatisticsOverview 数据：用于智能体大盘的炫酷指标与 Excel 导出配置
export const teacherAgentStatisticsOverviewData = {
    impactHighlights: [
        {
            title: '课堂伴学',
            value: '18,460',
            unit: '次',
            trend: '+12%',
            subtitle: '近7日课堂答疑与跟读',
            gradient: 'from-sky-400 via-blue-500 to-indigo-500'
        },
        {
            title: '作业诊断',
            value: '9,240',
            unit: '份',
            trend: '+8%',
            subtitle: '自动批改与订正推送',
            gradient: 'from-indigo-500 via-purple-500 to-pink-500'
        },
        {
            title: '夜间高频提问',
            value: '3,126',
            unit: '条',
            trend: '+5%',
            subtitle: '20:00 - 22:00 互动峰值',
            gradient: 'from-amber-400 via-orange-500 to-red-500'
        }
    ],
    adoptionMatrix: [
        { segment: '高一年级', activeRate: 86, satisfaction: 4.7, delta: '+6%' },
        { segment: '高二年级', activeRate: 78, satisfaction: 4.6, delta: '+3%' },
        { segment: '高三年级', activeRate: 64, satisfaction: 4.4, delta: '+5%' },
        { segment: '竞赛班级', activeRate: 92, satisfaction: 4.9, delta: '+9%' }
    ],
    excelColumns: [
        { key: 'name', label: '智能体' },
        { key: 'usage', label: '总使用次数' },
        { key: 'avgRating', label: '平均评分' },
        { key: 'totalRatings', label: '评价人数' },
        { key: 'totalComments', label: '留言数' },
        { key: 'fiveStarRatio', label: '五星占比(%)' },
        { key: 'peakHour', label: '高频时段' }
    ]
};

export default teacherAgentStatisticsOverviewData;

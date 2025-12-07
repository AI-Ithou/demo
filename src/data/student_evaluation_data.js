// 学生评价系统Mock数据

// 评价类型
export const evaluationTypes = [
    { id: 'participation', name: '课堂参与', baseScore: 5, icon: '🙋', color: 'blue' },
    { id: 'homework', name: '作业完成', baseScore: 10, icon: '📝', color: 'green' },
    { id: 'discussion', name: '讨论发言', baseScore: 5, icon: '💬', color: 'purple' },
    { id: 'performance', name: '课堂表现', baseScore: 8, icon: '⭐', color: 'orange' },
    { id: 'teamwork', name: '小组协作', baseScore: 6, icon: '🤝', color: 'pink' },
    { id: 'creativity', name: '创新思维', baseScore: 10, icon: '💡', color: 'yellow' }
];

// 评分规则
export const scoreRules = {
    participationBase: 5, // 参与基础分
    bonusMin: -10, // 最小额外加分
    bonusMax: 20, // 最大额外加分
    excellentThreshold: 90, // 优秀分数线
    goodThreshold: 75, // 良好分数线
    passThreshold: 60 // 及格分数线
};

// Mock学生数据
export const studentsData = [
    {
        id: 's001',
        name: '张晓明',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangxiaoming',
        totalScore: 285,
        participationScore: 150,
        bonusScore: 135,
        evaluationCount: 32,
        rank: 1,
        level: 'excellent',
        recentActivity: '2小时前'
    },
    {
        id: 's002',
        name: '李思雨',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisiyu',
        totalScore: 268,
        participationScore: 145,
        bonusScore: 123,
        evaluationCount: 30,
        rank: 2,
        level: 'excellent',
        recentActivity: '5小时前'
    },
    {
        id: 's003',
        name: '王浩然',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wanghaoran',
        totalScore: 245,
        participationScore: 140,
        bonusScore: 105,
        evaluationCount: 28,
        rank: 3,
        level: 'good',
        recentActivity: '1天前'
    },
    {
        id: 's004',
        name: '刘婷婷',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liutingting',
        totalScore: 232,
        participationScore: 135,
        bonusScore: 97,
        evaluationCount: 27,
        rank: 4,
        level: 'good',
        recentActivity: '3小时前'
    },
    {
        id: 's005',
        name: '陈志强',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenzhiqiang',
        totalScore: 218,
        participationScore: 130,
        bonusScore: 88,
        evaluationCount: 26,
        rank: 5,
        level: 'good',
        recentActivity: '6小时前'
    },
    {
        id: 's006',
        name: '赵美玲',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaomeiling',
        totalScore: 195,
        participationScore: 120,
        bonusScore: 75,
        evaluationCount: 24,
        rank: 6,
        level: 'pass',
        recentActivity: '2天前'
    },
    {
        id: 's007',
        name: '孙建国',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunjianguo',
        totalScore: 188,
        participationScore: 115,
        bonusScore: 73,
        evaluationCount: 23,
        rank: 7,
        level: 'pass',
        recentActivity: '8小时前'
    },
    {
        id: 's008',
        name: '周雪梅',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhouxuemei',
        totalScore: 176,
        participationScore: 110,
        bonusScore: 66,
        evaluationCount: 22,
        rank: 8,
        level: 'pass',
        recentActivity: '1天前'
    }
];

// Mock评价记录
export const evaluationsData = [
    {
        id: 'e001',
        studentId: 's001',
        teacherId: 't001',
        teacherName: '高田由',
        type: 'participation',
        baseScore: 5,
        bonusScore: 8,
        comment: '课堂积极举手发言，回答问题思路清晰，值得鼓励！',
        date: '2025-11-30T14:30:00',
        relatedActivity: '第三章讨论课',
        tags: ['积极', '清晰']
    },
    {
        id: 'e002',
        studentId: 's001',
        teacherId: 't001',
        teacherName: '高田由',
        type: 'homework',
        baseScore: 10,
        bonusScore: 15,
        comment: '作业完成度极高，有独到见解，展现了深入思考。',
        date: '2025-11-29T10:15:00',
        relatedActivity: '量子力学作业3',
        tags: ['优秀', '创新']
    },
    {
        id: 'e003',
        studentId: 's002',
        teacherId: 't001',
        teacherName: '高田由',
        type: 'discussion',
        baseScore: 5,
        bonusScore: 7,
        comment: '在小组讨论中积极发表观点，带动了团队氛围。',
        date: '2025-11-30T09:20:00',
        relatedActivity: '小组讨论：波粒二象性',
        tags: ['团队', '活跃']
    },
    {
        id: 'e004',
        studentId: 's003',
        teacherId: 't001',
        teacherName: '高田由',
        type: 'performance',
        baseScore: 8,
        bonusScore: 6,
        comment: '课堂表现良好，注意力集中，笔记完整。',
        date: '2025-11-29T15:45:00',
        relatedActivity: '第二章课堂',
        tags: ['认真']
    },
    {
        id: 'e005',
        studentId: 's004',
        teacherId: 't001',
        teacherName: '高田由',
        type: 'teamwork',
        baseScore: 6,
        bonusScore: 5,
        comment: '在小组实验中表现出色，与队友配合默契。',
        date: '2025-11-28T14:00:00',
        relatedActivity: '实验：双缝干涉',
        tags: ['协作']
    }
];

// 获取学生总评价数据
export const getStudentEvaluations = (studentId) => {
    return evaluationsData.filter(e => e.studentId === studentId);
};

// 计算学生总分
export const calculateTotalScore = (studentId) => {
    const evaluations = getStudentEvaluations(studentId);
    const participation = evaluations.reduce((sum, e) => sum + e.baseScore, 0);
    const bonus = evaluations.reduce((sum, e) => sum + e.bonusScore, 0);
    return { participation, bonus, total: participation + bonus };
};

// 获取评价统计
export const getEvaluationStats = () => {
    return {
        totalStudents: studentsData.length,
        totalEvaluations: evaluationsData.length,
        averageScore: Math.round(
            studentsData.reduce((sum, s) => sum + s.totalScore, 0) / studentsData.length
        ),
        activeRate: 87.5 // 活跃度百分比
    };
};

export default {
    evaluationTypes,
    scoreRules,
    studentsData,
    evaluationsData,
    getStudentEvaluations,
    calculateTotalScore,
    getEvaluationStats
};

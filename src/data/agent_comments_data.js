// 智能体留言评论数据
export const agentCommentsData = [
    // 数学小助手的留言
    {
        id: 'comment-001',
        agentId: 'agent-001',
        studentId: 'student-001',
        studentName: '张小明',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1',
        content: '数学小助手真的超级棒！解题思路特别清晰，每次遇到难题问它都能得到满意的解答。',
        rating: 5,
        createdAt: new Date('2024-12-05 14:30:00').getTime(),
        likes: 23,
        likedBy: [],
        replies: [
            {
                id: 'reply-001',
                teacherId: 'teacher-001',
                teacherName: '高田由',
                content: '谢谢你的认可！很高兴能帮助到你的学习。',
                createdAt: new Date('2024-12-05 16:20:00').getTime()
            }
        ]
    },
    {
        id: 'comment-002',
        agentId: 'agent-001',
        studentId: 'student-002',
        studentName: '李华',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2',
        content: '讲解得很详细，还会引导我自己思考，对培养数学思维很有帮助！',
        rating: 5,
        createdAt: new Date('2024-12-06 10:15:00').getTime(),
        likes: 18,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-003',
        agentId: 'agent-001',
        studentId: 'student-003',
        studentName: '王小红',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student3',
        content: '有时候解答得太快了，希望能更详细一些。但总体来说非常不错！',
        rating: 4,
        createdAt: new Date('2024-12-07 09:30:00').getTime(),
        likes: 12,
        likedBy: [],
        replies: []
    },

    // 语文导师的留言
    {
        id: 'comment-004',
        agentId: 'agent-002',
        studentId: 'student-004',
        studentName: '刘芳',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student4',
        content: '语文导师对古诗词的赏析真是太棒了，让我对古诗词有了新的理解！',
        rating: 5,
        createdAt: new Date('2024-12-04 15:45:00').getTime(),
        likes: 27,
        likedBy: [],
        replies: [
            {
                id: 'reply-002',
                teacherId: 'teacher-001',
                teacherName: '高田由',
                content: '古诗词是中华文化的瑰宝，很高兴你能喜欢！',
                createdAt: new Date('2024-12-04 18:30:00').getTime()
            }
        ]
    },
    {
        id: 'comment-005',
        agentId: 'agent-002',
        studentId: 'student-005',
        studentName: '陈晨',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student5',
        content: '作文批改很专业，给出的建议都很实用，我的写作水平提升了不少。',
        rating: 5,
        createdAt: new Date('2024-12-06 11:20:00').getTime(),
        likes: 21,
        likedBy: [],
        replies: []
    },

    // 英语伙伴的留言
    {
        id: 'comment-006',
        agentId: 'agent-003',
        studentId: 'student-006',
        studentName: '赵磊',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student6',
        content: 'English partner is awesome! The conversation practice really helps improve my speaking skills.',
        rating: 5,
        createdAt: new Date('2024-12-03 16:00:00').getTime(),
        likes: 32,
        likedBy: [],
        replies: [
            {
                id: 'reply-003',
                teacherId: 'teacher-001',
                teacherName: '高田由',
                content: 'Great to hear that! Keep practicing and you\'ll get even better!',
                createdAt: new Date('2024-12-03 19:15:00').getTime()
            }
        ]
    },
    {
        id: 'comment-007',
        agentId: 'agent-003',
        studentId: 'student-007',
        studentName: '孙雨',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student7',
        content: '语法讲解特别清楚，还有很多实用的例句，学习起来轻松多了！',
        rating: 5,
        createdAt: new Date('2024-12-05 13:45:00').getTime(),
        likes: 25,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-008',
        agentId: 'agent-003',
        studentId: 'student-008',
        studentName: '周洁',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student8',
        content: '互动性很强，感觉像在和真人对话一样，对提升口语很有帮助！',
        rating: 5,
        createdAt: new Date('2024-12-07 10:30:00').getTime(),
        likes: 19,
        likedBy: [],
        replies: []
    },

    // 物理专家的留言
    {
        id: 'comment-009',
        agentId: 'agent-004',
        studentId: 'student-009',
        studentName: '吴强',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student9',
        content: '用生活实例讲解物理现象，让抽象的概念变得容易理解了！',
        rating: 5,
        createdAt: new Date('2024-12-04 14:20:00').getTime(),
        likes: 16,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-010',
        agentId: 'agent-004',
        studentId: 'student-010',
        studentName: '郑美',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student10',
        content: '公式推导讲得很详细，不过有些地方还是有点难懂，希望能更通俗一些。',
        rating: 4,
        createdAt: new Date('2024-12-06 15:30:00').getTime(),
        likes: 11,
        likedBy: [],
        replies: [
            {
                id: 'reply-004',
                teacherId: 'teacher-001',
                teacherName: '高田由',
                content: '感谢你的反馈，我们会继续优化讲解方式！',
                createdAt: new Date('2024-12-06 17:45:00').getTime()
            }
        ]
    },

    // 化学达人的留言
    {
        id: 'comment-011',
        agentId: 'agent-005',
        studentId: 'student-011',
        studentName: '冯涛',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student11',
        content: '实验操作指导很专业，特别是安全提示很到位，学到了很多！',
        rating: 5,
        createdAt: new Date('2024-12-05 11:00:00').getTime(),
        likes: 14,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-012',
        agentId: 'agent-005',
        studentId: 'student-012',
        studentName: '褚欣',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student12',
        content: '化学方程式的讲解很清晰，配平方法很实用，赞！',
        rating: 4,
        createdAt: new Date('2024-12-07 13:15:00').getTime(),
        likes: 9,
        likedBy: [],
        replies: []
    },

    // 历史学者的留言
    {
        id: 'comment-013',
        agentId: 'agent-006',
        studentId: 'student-013',
        studentName: '卫杰',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student13',
        content: '讲历史故事特别生动，把枯燥的历史变得有趣了，很喜欢！',
        rating: 5,
        createdAt: new Date('2024-12-04 10:30:00').getTime(),
        likes: 20,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-014',
        agentId: 'agent-006',
        studentId: 'student-014',
        studentName: '蒋丽',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student14',
        content: '时间轴梳理很有用，帮我理清了历史事件的脉络。',
        rating: 4,
        createdAt: new Date('2024-12-06 16:45:00').getTime(),
        likes: 13,
        likedBy: [],
        replies: []
    },
    {
        id: 'comment-015',
        agentId: 'agent-006',
        studentId: 'student-015',
        studentName: '韩冰',
        studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student15',
        content: '对历史文化的讲解很深入，让我对历史有了更深的理解！',
        rating: 5,
        createdAt: new Date('2024-12-07 14:00:00').getTime(),
        likes: 17,
        likedBy: [],
        replies: []
    }
];

export default agentCommentsData;

// TeacherAgentCommentsPage 数据：用于评论审核的默认状态与快捷话术
export const teacherAgentCommentsPageData = {
    auditStatusMap: {
        'comment-001': { status: 'approved', remark: '正向反馈，保持稳定答疑节奏' },
        'comment-002': { status: 'approved', remark: '学习体验优秀，继续维持' },
        'comment-003': { status: 'pending', remark: '' },
        'comment-004': { status: 'approved', remark: '文化素养反馈积极' },
        'comment-005': { status: 'pending', remark: '' },
        'comment-006': { status: 'approved', remark: '口语互动认可' },
        'comment-007': { status: 'approved', remark: '语法讲解好评' },
        'comment-008': { status: 'approved', remark: '互动性佳' },
        'comment-009': { status: 'approved', remark: '实验类好评' },
        'comment-010': { status: 'pending', remark: '' },
        'comment-011': { status: 'approved', remark: '安全提示到位' },
        'comment-012': { status: 'pending', remark: '' },
        'comment-013': { status: 'approved', remark: '讲述生动' },
        'comment-014': { status: 'pending', remark: '' },
        'comment-015': { status: 'approved', remark: '文化理解到位' }
    },
    auditTemplates: [
        { key: 'pass', label: '通过 - 正向反馈', remark: '内容积极，无敏感信息，准予展示' },
        { key: 'optimize', label: '建议优化后通过', remark: '建议补充具体问题描述，避免泛泛而谈' },
        { key: 'reject', label: '驳回 - 规避风险', remark: '包含可能误导/不当表述，建议修改后再提交' }
    ]
};

export default teacherAgentCommentsPageData;

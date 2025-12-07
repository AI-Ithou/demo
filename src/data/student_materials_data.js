// 学生端资料数据
const STUDENT_MATERIALS_DATA = {
    // 资料列表
    materials: [
        {
            id: 'mat-001',
            name: 'Python基础语法PPT',
            type: 'ppt',
            size: '2.5 MB',
            uploadDate: '2024-11-20',
            knowledgePoints: ['变量与数据类型', '运算符与表达式', '输入输出函数'],
            description: 'Python编程基础第一章课件，包含基本语法和示例代码',
            viewCount: 156,
            downloadCount: 89,
            difficulty: 'beginner', // beginner, intermediate, advanced
            tags: ['基础', '入门', '必学']
        },
        {
            id: 'mat-002',
            name: '循环结构详解视频',
            type: 'video',
            duration: '25:30',
            uploadDate: '2024-11-22',
            knowledgePoints: ['for循环', 'while循环', '循环控制(break/continue)'],
            description: '详细讲解Python中的循环结构，包含大量实例演示',
            viewCount: 234,
            downloadCount: 0,
            difficulty: 'beginner',
            tags: ['视频', '循环', '实例']
        },
        {
            id: 'mat-003',
            name: '函数编程练习题集',
            type: 'pdf',
            size: '1.8 MB',
            uploadDate: '2024-11-25',
            knowledgePoints: ['函数定义与调用', '参数传递', '返回值'],
            description: '100道函数编程练习题，含详细答案解析',
            viewCount: 198,
            downloadCount: 156,
            difficulty: 'intermediate',
            tags: ['练习题', '函数', '进阶']
        },
        {
            id: 'mat-004',
            name: '条件语句思维导图',
            type: 'image',
            size: '0.5 MB',
            uploadDate: '2024-11-18',
            knowledgePoints: ['条件语句(if-elif-else)'],
            description: '条件语句知识点思维导图，清晰呈现逻辑关系',
            viewCount: 89,
            downloadCount: 67,
            difficulty: 'beginner',
            tags: ['思维导图', '可视化']
        },
        {
            id: 'mat-005',
            name: '数据结构完整教程',
            type: 'pdf',
            size: '5.2 MB',
            uploadDate: '2024-11-30',
            knowledgePoints: ['列表(List)', '元组(Tuple)', '字典(Dictionary)'],
            description: 'Python数据结构完整教程，从基础到进阶',
            viewCount: 312,
            downloadCount: 234,
            difficulty: 'intermediate',
            tags: ['数据结构', '教程', '全面']
        },
        {
            id: 'mat-006',
            name: '编程规范与最佳实践',
            type: 'doc',
            size: '1.2 MB',
            uploadDate: '2024-12-01',
            knowledgePoints: ['变量与数据类型', '函数定义与调用'],
            description: 'Python编程规范和最佳实践指南',
            viewCount: 145,
            downloadCount: 98,
            difficulty: 'intermediate',
            tags: ['规范', '最佳实践']
        }
    ],

    // 知识点分类（用于筛选）
    knowledgePointCategories: [
        { id: 'kp-1', name: '变量与数据类型', materialsCount: 2, chapter: '第一章' },
        { id: 'kp-2', name: '运算符与表达式', materialsCount: 1, chapter: '第一章' },
        { id: 'kp-3', name: '输入输出函数', materialsCount: 1, chapter: '第一章' },
        { id: 'kp-4', name: '条件语句(if-elif-else)', materialsCount: 1, chapter: '第二章' },
        { id: 'kp-5', name: 'for循环', materialsCount: 1, chapter: '第二章' },
        { id: 'kp-6', name: 'while循环', materialsCount: 1, chapter: '第二章' },
        { id: 'kp-7', name: '循环控制(break/continue)', materialsCount: 1, chapter: '第二章' },
        { id: 'kp-8', name: '函数定义与调用', materialsCount: 2, chapter: '第三章' },
        { id: 'kp-9', name: '参数传递', materialsCount: 1, chapter: '第三章' },
        { id: 'kp-10', name: '返回值', materialsCount: 1, chapter: '第三章' },
        { id: 'kp-11', name: '列表(List)', materialsCount: 1, chapter: '第四章' },
        { id: 'kp-12', name: '元组(Tuple)', materialsCount: 1, chapter: '第四章' },
        { id: 'kp-13', name: '字典(Dictionary)', materialsCount: 1, chapter: '第四章' }
    ],

    // 热门资料
    popularMaterials: ['mat-005', 'mat-002', 'mat-003'],

    // 最近浏览
    recentlyViewed: ['mat-002', 'mat-001', 'mat-004'],

    // 推荐资料（基于学习进度）
    recommended: [
        {
            materialId: 'mat-002',
            reason: '你正在学习循环结构，这个视频能帮助你更好理解',
            priority: 'high'
        },
        {
            materialId: 'mat-003',
            reason: '即将进入函数学习阶段，提前预习',
            priority: 'medium'
        }
    ]
};

export default STUDENT_MATERIALS_DATA;

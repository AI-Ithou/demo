// 教案配置常量定义

/**
 * 学段配置
 */
export const GRADE_LEVELS = [
    {
        id: 'primary',
        label: '小学',
        ageRange: '6-12岁',
        features: '趣味性、互动性强',
        languageStyle: '简单易懂、生动形象',
        knowledgeDepth: '浅显直观',
        icon: '🎒'
    },
    {
        id: 'junior',
        label: '初中',
        ageRange: '12-15岁',
        features: '逻辑性、系统性',
        languageStyle: '准确规范、适度严谨',
        knowledgeDepth: '系统基础',
        icon: '📚'
    },
    {
        id: 'high_school',
        label: '高中',
        ageRange: '15-18岁',
        features: '抽象性、应用性',
        languageStyle: '严谨专业、层次分明',
        knowledgeDepth: '深入拓展',
        icon: '🎓'
    },
    {
        id: 'university',
        label: '大学',
        ageRange: '18岁以上',
        features: '研究性、实践性',
        languageStyle: '学术规范、专业术语',
        knowledgeDepth: '专业深入',
        icon: '🏛️'
    },
    {
        id: 'vocational',
        label: '职业培训',
        ageRange: '成人',
        features: '实用性、技能性',
        languageStyle: '实操导向、案例丰富',
        knowledgeDepth: '应用为主',
        icon: '🔧'
    }
];

/**
 * 学科分类配置
 */
export const SUBJECTS = [
    {
        id: 'mathematics',
        label: '数学',
        category: 'science',
        categoryLabel: '理科',
        teachingMethod: '演绎推理、实验验证',
        resourceType: '公式推导、实验视频',
        icon: '🔢'
    },
    {
        id: 'physics',
        label: '物理',
        category: 'science',
        categoryLabel: '理科',
        teachingMethod: '演绎推理、实验验证',
        resourceType: '公式推导、实验视频',
        icon: '⚛️'
    },
    {
        id: 'chemistry',
        label: '化学',
        category: 'science',
        categoryLabel: '理科',
        teachingMethod: '演绎推理、实验验证',
        resourceType: '公式推导、实验视频',
        icon: '🧪'
    },
    {
        id: 'architecture',
        label: '建筑',
        category: 'engineering',
        categoryLabel: '工科',
        teachingMethod: '工程实践、案例分析',
        resourceType: 'CAD图纸、施工视频',
        icon: '🏗️'
    },
    {
        id: 'mechanical',
        label: '机械',
        category: 'engineering',
        categoryLabel: '工科',
        teachingMethod: '工程实践、案例分析',
        resourceType: 'CAD图纸、施工视频',
        icon: '⚙️'
    },
    {
        id: 'electrical',
        label: '电气',
        category: 'engineering',
        categoryLabel: '工科',
        teachingMethod: '工程实践、案例分析',
        resourceType: 'CAD图纸、施工视频',
        icon: '⚡'
    },
    {
        id: 'chinese',
        label: '语文',
        category: 'liberal_arts',
        categoryLabel: '文科',
        teachingMethod: '阅读理解、讨论辩论',
        resourceType: '文献资料、视频讲座',
        icon: '📖'
    },
    {
        id: 'history',
        label: '历史',
        category: 'liberal_arts',
        categoryLabel: '文科',
        teachingMethod: '阅读理解、讨论辩论',
        resourceType: '文献资料、视频讲座',
        icon: '📜'
    },
    {
        id: 'politics',
        label: '政治',
        category: 'liberal_arts',
        categoryLabel: '文科',
        teachingMethod: '阅读理解、讨论辩论',
        resourceType: '文献资料、视频讲座',
        icon: '🏛️'
    },
    {
        id: 'music',
        label: '音乐',
        category: 'arts',
        categoryLabel: '艺体',
        teachingMethod: '技能训练、作品鉴赏',
        resourceType: '示范视频、作品库',
        icon: '🎵'
    },
    {
        id: 'art',
        label: '美术',
        category: 'arts',
        categoryLabel: '艺体',
        teachingMethod: '技能训练、作品鉴赏',
        resourceType: '示范视频、作品库',
        icon: '🎨'
    },
    {
        id: 'pe',
        label: '体育',
        category: 'arts',
        categoryLabel: '艺体',
        teachingMethod: '技能训练、作品鉴赏',
        resourceType: '示范视频、作品库',
        icon: '⚽'
    }
];

/**
 * 教材版本配置
 */
export const TEXTBOOK_VERSIONS = [
    { id: 'renmin', label: '人教版' },
    { id: 'beijing_normal', label: '北师大版' },
    { id: 'jiangsu', label: '苏教版' },
    { id: 'shanghai', label: '沪教版' },
    { id: 'zhejiang', label: '浙教版' },
    { id: 'custom', label: '自编教材' }
];

/**
 * 语气风格配置
 */
export const TONE_STYLES = [
    {
        id: 'standard',
        label: '标准规范',
        scenario: '正式教学、教案归档',
        features: '符合教育部规范，用语准确',
        example: '通过本节课学习，学生能够掌握...',
        icon: '📋'
    },
    {
        id: 'concise',
        label: '简洁明了',
        scenario: '快速备课、新手教师',
        features: '省略冗余表述，突出要点',
        example: '知识点：函数概念；目标：掌握定义',
        icon: '✂️'
    },
    {
        id: 'detailed',
        label: '详细指导',
        scenario: '公开课、观摩课',
        features: '详细阐述教学意图与步骤',
        example: '在导入环节，教师通过展示生活中的实例，引导学生思考函数关系，设计意图是...',
        icon: '📝'
    },
    {
        id: 'vivid',
        label: '活泼生动',
        scenario: '小学、兴趣课程',
        features: '多用比喻、故事，语言亲和',
        example: '小朋友们，今天我们要一起探索数字王国的秘密...',
        icon: '🎈'
    },
    {
        id: 'academic',
        label: '学术严谨',
        scenario: '大学、专业课程',
        features: '学术术语规范，逻辑严密',
        example: '本课程旨在系统阐述XX理论的核心范式...',
        icon: '🎓'
    }
];

/**
 * 详细程度配置
 */
export const DETAIL_LEVELS = [
    {
        id: 'brief',
        label: '简洁版',
        description: '仅包含核心要素，适合快速备课',
        estimatedPages: '3-5页'
    },
    {
        id: 'moderate',
        label: '标准版',
        description: '包含常规教学要素，适合日常使用',
        estimatedPages: '6-10页'
    },
    {
        id: 'comprehensive',
        label: '完整版',
        description: '详细完备，适合公开课和存档',
        estimatedPages: '12-15页'
    }
];

/**
 * 模块配置 - 11个核心模块
 */
export const LESSON_MODULES = {
    basicInfo: {
        id: 'basicInfo',
        name: '基本信息',
        level: 'required',
        defaultEnabled: true,
        canDisable: false,
        description: '标题、课程、教师等基础信息',
        order: 1
    },
    teachingGoals: {
        id: 'teachingGoals',
        name: '教学目标',
        level: 'required',
        defaultEnabled: true,
        canDisable: false,
        description: '核心教学目标',
        order: 2,
        configs: {
            dimensions: ['knowledge', 'process', 'emotion'],
            strategy: 'standard' // standard / custom
        }
    },
    teachingFlow: {
        id: 'teachingFlow',
        name: '教学流程',
        level: 'required',
        defaultEnabled: true,
        canDisable: false,
        description: '教学过程设计',
        order: 3,
        configs: {
            phases: 4, // 环节数量
            strategy: 'standard' // standard / custom
        }
    },
    keyPoints: {
        id: 'keyPoints',
        name: '教学重难点',
        level: 'recommended',
        defaultEnabled: true,
        canDisable: true,
        description: '重点难点分析',
        order: 4,
        configs: {
            highlightsCount: 4,
            difficultiesCount: 2,
            strategy: 'auto' // auto / manual
        }
    },
    homework: {
        id: 'homework',
        name: '作业设计',
        level: 'recommended',
        defaultEnabled: true,
        canDisable: true,
        description: '课后作业',
        order: 5,
        configs: {
            levels: ['basic', 'extended', 'practical']
        }
    },
    preparation: {
        id: 'preparation',
        name: '教学准备',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '教师学生环境准备',
        order: 6
    },
    activities: {
        id: 'activities',
        name: '课堂活动',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '详细活动设计',
        order: 7,
        configs: {
            types: ['experiment', 'discussion', 'case_study'],
            count: 2
        }
    },
    boardDesign: {
        id: 'boardDesign',
        name: '板书设计',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '板书框架',
        order: 8,
        configs: {
            complexity: 'concise' // concise / detailed
        }
    },
    resources: {
        id: 'resources',
        name: '教学资源',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '资源清单',
        order: 9,
        configs: {
            types: ['video', 'practice', 'reading']
        }
    },
    assessment: {
        id: 'assessment',
        name: '教学评估',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '评估方案',
        order: 10,
        configs: {
            methods: ['qa', 'test', 'project']
        }
    },
    reflection: {
        id: 'reflection',
        name: '教学反思',
        level: 'optional',
        defaultEnabled: false,
        canDisable: true,
        description: '反思预留区',
        order: 11,
        configs: {
            preset: 'blank' // blank / guided
        }
    }
};

/**
 * 模块预设配置
 */
export const MODULE_PRESETS = {
    brief: {
        id: 'brief',
        label: '简洁版',
        description: '仅核心模块',
        modules: ['basicInfo', 'teachingGoals', 'teachingFlow']
    },
    standard: {
        id: 'standard',
        label: '标准版',
        description: '常规教学必备',
        modules: ['basicInfo', 'teachingGoals', 'teachingFlow', 'keyPoints', 'homework']
    },
    comprehensive: {
        id: 'comprehensive',
        label: '完整版',
        description: '包含所有模块',
        modules: Object.keys(LESSON_MODULES)
    },
    open_class: {
        id: 'open_class',
        label: '公开课配置',
        description: '适合公开课和观摩课',
        modules: ['basicInfo', 'teachingGoals', 'keyPoints', 'preparation', 'teachingFlow', 'activities', 'boardDesign', 'assessment', 'reflection']
    },
    review_class: {
        id: 'review_class',
        label: '复习课配置',
        description: '适合复习和巩固',
        modules: ['basicInfo', 'teachingGoals', 'keyPoints', 'teachingFlow', 'homework', 'assessment']
    }
};

/**
 * 创建方式配置
 */
export const CREATE_METHODS = {
    standard: {
        id: 'standard',
        label: '标准创建',
        icon: '📝',
        description: '三步骤向导创建',
        estimatedTime: '3-5分钟',
        features: ['完整配置', '适合常规课程']
    },
    title: {
        id: 'title',
        label: '标题创建',
        icon: '⚡',
        description: '快速生成教案框架',
        estimatedTime: '30秒',
        features: ['AI智能解析', '快速启动']
    },
    text: {
        id: 'text',
        label: '文本创建',
        icon: '📄',
        description: '从已有文档生成',
        estimatedTime: '1分钟',
        features: ['复用已有内容', '智能提取']
    },
    chapter: {
        id: 'chapter',
        label: '章节创建',
        icon: '📚',
        description: '按教材章节生成',
        estimatedTime: '45秒',
        features: ['标准化', '教材对应']
    },
    outline: {
        id: 'outline',
        label: '大纲创建',
        icon: '🎯',
        description: '自定义教案结构',
        estimatedTime: '2分钟',
        features: ['精细控制', '灵活定制']
    }
};

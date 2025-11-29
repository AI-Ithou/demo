// 资源类型定义
export const RESOURCE_TYPES = {
    ppt: {
        name: 'PPT课件',
        icon: '📊',
        color: '#f97316',
        bgColor: '#fff7ed'
    },
    document: {
        name: '文档资料',
        icon: '📄',
        color: '#3b82f6',
        bgColor: '#eff6ff'
    },
    h5: {
        name: 'H5互动',
        icon: '🎮',
        color: '#8b5cf6',
        bgColor: '#f5f3ff'
    },
    agent: {
        name: 'AI智能体',
        icon: '🤖',
        color: '#06b6d4',
        bgColor: '#ecfeff'
    },
    video: {
        name: '视频讲解',
        icon: '🎥',
        color: '#ef4444',
        bgColor: '#fef2f2'
    },
    exercise: {
        name: '练习题库',
        icon: '✏️',
        color: '#10b981',
        bgColor: '#f0fdf4'
    }
};

// 示例资源库（供知识点绑定）
export const SAMPLE_RESOURCES = [
    {
        id: 'res-001',
        type: 'ppt',
        title: '集合概念入门.pptx',
        url: '/resources/ppt/set-intro.pptx',
        size: '2.5MB',
        preview: 'https://via.placeholder.com/400x300?text=PPT+Preview',
        uploadDate: '2025-11-20',
        author: '张老师'
    },
    {
        id: 'res-002',
        type: 'h5',
        title: '集合可视化工具',
        url: 'https://set-visualizer.example.com',
        description: '交互式集合运算演示，支持文氏图可视化',
        preview: 'https://via.placeholder.com/400x300?text=H5+Interactive',
        uploadDate: '2025-11-21',
        author: '李老师'
    },
    {
        id: 'res-003',
        type: 'agent',
        title: '集合学习助手',
        url: '/agents/set-assistant',
        capabilities: ['智能答疑', '练习生成', '知识检测', '错题分析'],
        description: 'AI驱动的集合学习助手，24小时在线辅导',
        preview: 'https://via.placeholder.com/400x300?text=AI+Agent',
        uploadDate: '2025-11-22',
        author: 'AI系统'
    },
    {
        id: 'res-004',
        type: 'video',
        title: '函数概念精讲视频',
        url: 'https://video.example.com/function-intro',
        duration: '25:30',
        description: '系统讲解函数的概念、定义域、值域',
        preview: 'https://via.placeholder.com/400x300?text=Video+Lecture',
        uploadDate: '2025-11-18',
        author: '王老师'
    },
    {
        id: 'res-005',
        type: 'exercise',
        title: '函数基础练习题库',
        url: '/exercises/function-basic',
        questionCount: 50,
        difficulty: 'basic',
        description: '涵盖函数概念的各类基础练习题',
        preview: 'https://via.placeholder.com/400x300?text=Exercise+Bank',
        uploadDate: '2025-11-19',
        author: '题库系统'
    },
    {
        id: 'res-006',
        type: 'ppt',
        title: '三角函数图像详解.pptx',
        url: '/resources/ppt/trigonometry.pptx',
        size: '3.8MB',
        preview: 'https://via.placeholder.com/400x300?text=Trig+PPT',
        uploadDate: '2025-11-23',
        author: '赵老师'
    }
];

export default {
    RESOURCE_TYPES,
    SAMPLE_RESOURCES
};

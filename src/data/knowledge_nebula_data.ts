export const INITIAL_NEBULA_MESSAGES = [
    {
        id: 1,
        sender: 'teacher',
        content: '能力评估完成。现在我们来具体看看知识点的掌握情况。'
    },
    {
        id: 2,
        sender: 'teacher',
        content: '屏幕右侧是本次评估涉及的核心知识点星云。请将你认为**完全掌握**的知识点拖入绿色区域，**需要巩固**的拖入橙色区域。'
    }
];

export const KNOWLEDGE_NODES = [
    { id: 'k1', label: '函数概念', status: 'mastered', size: 80, x: 50, y: 50 },
    { id: 'k2', label: '一元二次方程', status: 'mastered', size: 70, x: 150, y: 120 },
    { id: 'k3', label: '三角函数图像', status: 'fuzzy', size: 90, x: 250, y: 60 },
    { id: 'k4', label: '数列通项', status: 'unknown', size: 60, x: 100, y: 200 },
    { id: 'k5', label: '复合函数', status: 'fuzzy', size: 75, x: 300, y: 180 },
    { id: 'k6', label: '导数应用', status: 'unknown', size: 85, x: 200, y: 250 },
    { id: 'k7', label: '向量运算', status: 'mastered', size: 65, x: 50, y: 300 },
];

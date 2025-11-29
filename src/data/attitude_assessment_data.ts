export const INITIAL_ATTITUDE_MESSAGES = [
    {
        id: 1,
        sender: 'teacher',
        content: '知识点评估结束。最后，我想了解一下你的学习状态。'
    },
    {
        id: 2,
        sender: 'teacher',
        content: '当你连续几次没有达到目标时，你会如何看待？'
    }
];

export const ATTITUDE_KEYWORDS = [
    { id: 'a1', text: '沮丧', type: 'negative', size: 'text-4xl', x: 20, y: 30 },
    { id: 'a2', text: '寻求帮助', type: 'positive', size: 'text-3xl', x: 60, y: 20 },
    { id: 'a3', text: '坚持不懈', type: 'positive', size: 'text-5xl', x: 40, y: 50 },
    { id: 'a4', text: '自我怀疑', type: 'negative', size: 'text-2xl', x: 10, y: 70 },
    { id: 'a5', text: '分析原因', type: 'neutral', size: 'text-3xl', x: 70, y: 60 },
    { id: 'a6', text: '焦虑', type: 'negative', size: 'text-xl', x: 80, y: 40 },
    { id: 'a7', text: '调整策略', type: 'positive', size: 'text-2xl', x: 30, y: 80 },
];

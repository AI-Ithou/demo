export const INITIAL_MESSAGES = [
    {
        id: 1,
        sender: 'teacher',
        content: '你好，同学！我是你的专属数字老师。很高兴能陪你开启这段学习旅程。'
    },
    {
        id: 2,
        sender: 'teacher',
        content: '为了为你量身定制最适合的学习计划，我们需要先进行一次深入的摸底评估。'
    },
    {
        id: 3,
        sender: 'teacher',
        content: '你希望本次评估侧重哪些方面呢？请从下方选择，或者直接告诉我你的想法。'
    }
];

export const GOAL_OPTIONS = [
    {
        id: 'skill',
        title: '技能突破',
        description: '针对特定解题技巧进行强化训练',
        icon: 'Zap'
    },
    {
        id: 'knowledge',
        title: '知识点巩固',
        description: '查漏补缺，夯实基础概念',
        icon: 'Book'
    },
    {
        id: 'style',
        title: '探索学习风格',
        description: '了解适合自己的学习方式与习惯',
        icon: 'Compass'
    }
];

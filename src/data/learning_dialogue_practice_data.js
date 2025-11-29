// 随堂练习数据 - 各知识点的练习题库

const learningPracticeData = {
    // 波粒二象性练习题
    'wave-particle-duality': {
        nodeId: 'node-3',
        topic: '波粒二象性',
        exercises: [
            {
                id: 'practice-1',
                type: 'choice',
                difficulty: 'easy',
                question: '以下哪个实验最能证明光的波动性?',
                options: [
                    'A. 光电效应实验',
                    'B. 双缝干涉实验',
                    'C. 康普顿散射实验',
                    'D. 黑体辐射实验'
                ],
                correctAnswer: 1, // 索引从0开始
                explanation: '双缝干涉实验中,光通过两个狭缝后在屏幕上形成明暗相间的干涉条纹,这是典型的波动现象。光电效应和康普顿散射则证明了光的粒子性。',
                points: 10,
                timeLimit: 60, // 秒
                tags: ['基础概念', '实验']
            },
            {
                id: 'practice-2',
                type: 'choice',
                difficulty: 'medium',
                question: '在双缝干涉实验中,如果在狭缝处放置探测器来观察电子通过哪个缝,会发生什么?',
                options: [
                    'A. 干涉条纹变得更清晰',
                    'B. 干涉条纹消失,变成两条亮纹',
                    'C. 干涉条纹位置发生移动',
                    'D. 没有任何变化'
                ],
                correctAnswer: 1,
                explanation: '观测行为会导致波函数坍缩,电子从叠加态变为确定态。此时电子的行为像粒子,只通过一个缝,因此干涉消失,屏幕上只出现两条对应两个缝的亮纹。这是量子测量的经典例子。',
                points: 15,
                timeLimit: 90,
                tags: ['测量问题', '波函数坍缩']
            },
            {
                id: 'practice-3',
                type: 'choice',
                difficulty: 'hard',
                question: '关于波粒二象性,以下说法正确的是:',
                options: [
                    'A. 微观粒子有时是波,有时是粒子',
                    'B. 微观粒子既是波又是粒子',
                    'C. 微观粒子既不是经典的波,也不是经典的粒子',
                    'D. 波粒二象性只适用于光子,不适用于电子'
                ],
                correctAnswer: 2,
                explanation: '正确答案是C。微观粒子既不是经典意义上的波,也不是经典意义上的粒子,而是一种全新的量子客体。它在不同的实验条件下会表现出波动性或粒子性,但本质上是量子态的统一描述。选项D错误,因为所有微观粒子(包括电子、质子等)都具有波粒二象性。',
                points: 20,
                timeLimit: 120,
                tags: ['深度理解', '概念辨析']
            },
            {
                id: 'practice-4',
                type: 'true-false',
                difficulty: 'easy',
                question: '光的波粒二象性是由爱因斯坦首先提出的。',
                correctAnswer: false,
                explanation: '这个说法不完全准确。爱因斯坦在1905年提出了光量子假说,解释了光电效应,强调了光的粒子性。但"波粒二象性"这个完整概念是在德布罗意(1924年)提出物质波假说后才逐渐形成的。可以说爱因斯坦为波粒二象性奠定了基础,但不是首先提出这个完整概念的人。',
                points: 10,
                timeLimit: 45,
                tags: ['科学史', '基础知识']
            },
            {
                id: 'practice-5',
                type: 'fill-blank',
                difficulty: 'medium',
                question: '德布罗意关系式为 λ = h/p,其中 h 是______,p 是______。',
                blanks: ['普朗克常数', '动量'],
                acceptableAnswers: [
                    ['普朗克常数', '动量'],
                    ['普朗克常量', '粒子动量'],
                    ['h常数', '动量']
                ],
                explanation: '德布罗意关系式 λ = h/p 描述了粒子的波长与其动量的关系。其中 h 是普朗克常数(6.626×10⁻³⁴ J·s),p 是粒子的动量。这个公式表明,任何运动的粒子都具有波动性,其波长与动量成反比。',
                points: 15,
                timeLimit: 90,
                tags: ['公式', '物理量']
            }
        ],
        practiceSets: [
            {
                id: 'set-1',
                title: '基础巩固练习',
                description: '针对波粒二象性的基本概念进行练习',
                exerciseIds: ['practice-1', 'practice-4'],
                difficulty: 'easy',
                estimatedTime: 5 // 分钟
            },
            {
                id: 'set-2',
                title: '进阶理解练习',
                description: '深入理解测量问题和波函数坍缩',
                exerciseIds: ['practice-2', 'practice-5'],
                difficulty: 'medium',
                estimatedTime: 8
            },
            {
                id: 'set-3',
                title: '综合应用练习',
                description: '综合运用所学知识,辨析复杂概念',
                exerciseIds: ['practice-3', 'practice-2'],
                difficulty: 'hard',
                estimatedTime: 10
            }
        ]
    },

    // 不确定性原理练习题
    'uncertainty-principle': {
        nodeId: 'node-4',
        topic: '不确定性原理',
        exercises: [
            {
                id: 'practice-6',
                type: 'choice',
                difficulty: 'medium',
                question: '海森堡不确定性原理 ΔxΔp ≥ ℏ/2 说明了什么?',
                options: [
                    'A. 我们的测量技术还不够精确',
                    'B. 粒子的位置和动量本身就是不确定的',
                    'C. 只要改进仪器就能同时精确测量位置和动量',
                    'D. 这个原理只在理论上成立,实际中可以突破'
                ],
                correctAnswer: 1,
                explanation: '不确定性原理揭示的是量子世界的本质特征,而不是测量技术的限制。粒子在被测量前,其位置和动量本身就处于不确定的叠加态。这是量子力学的基本原理,无法通过改进仪器来突破。',
                points: 15,
                timeLimit: 90,
                tags: ['核心原理', '概念理解']
            }
        ],
        practiceSets: []
    }
};

// 辅助函数:根据知识点获取练习题
export const getPracticeByTopic = (topicKey) => {
    return learningPracticeData[topicKey] || null;
};

// 辅助函数:根据难度筛选练习题
export const filterPracticeByDifficulty = (topicKey, difficulty) => {
    const practice = learningPracticeData[topicKey];
    if (!practice) return [];
    return practice.exercises.filter(ex => ex.difficulty === difficulty);
};

// 辅助函数:根据掌握程度推荐练习
export const recommendPractice = (topicKey, masteryLevel) => {
    const practice = learningPracticeData[topicKey];
    if (!practice) return null;

    let recommendedSet = null;

    switch (masteryLevel) {
        case 'level_1':
        case 'level_2':
            // 推荐基础练习
            recommendedSet = practice.practiceSets.find(set => set.difficulty === 'easy');
            break;
        case 'level_3_low':
            // 推荐进阶练习
            recommendedSet = practice.practiceSets.find(set => set.difficulty === 'medium');
            break;
        case 'level_3_high':
        case 'level_4':
            // 推荐综合练习
            recommendedSet = practice.practiceSets.find(set => set.difficulty === 'hard');
            break;
        default:
            recommendedSet = practice.practiceSets[0];
    }

    if (recommendedSet) {
        // 返回练习集和对应的题目
        const exercises = recommendedSet.exerciseIds.map(id =>
            practice.exercises.find(ex => ex.id === id)
        ).filter(Boolean);

        return {
            ...recommendedSet,
            exercises
        };
    }

    return null;
};

// 辅助函数:检查答案
export const checkAnswer = (topicKey, exerciseId, userAnswer) => {
    const practice = learningPracticeData[topicKey];
    if (!practice) return null;

    const exercise = practice.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return null;

    let isCorrect = false;

    if (exercise.type === 'choice' || exercise.type === 'true-false') {
        isCorrect = userAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'fill-blank') {
        // 填空题需要检查是否在可接受答案列表中
        isCorrect = exercise.acceptableAnswers.some(acceptable =>
            JSON.stringify(acceptable) === JSON.stringify(userAnswer)
        );
    }

    return {
        isCorrect,
        explanation: exercise.explanation,
        points: isCorrect ? exercise.points : 0
    };
};

export default learningPracticeData;

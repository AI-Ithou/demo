// 评测数据 - 综合评测题库和能力分析

const learningAssessmentData = {
    // 波粒二象性评测
    'wave-particle-duality': {
        nodeId: 'node-3',
        topic: '波粒二象性',
        assessments: [
            {
                id: 'assessment-1',
                title: '波粒二象性基础评测',
                description: '评估你对波粒二象性基本概念的掌握程度',
                difficulty: 'beginner',
                timeLimit: 600, // 10分钟
                passingScore: 60,
                questions: [
                    {
                        id: 'q1',
                        type: 'choice',
                        question: '以下哪个现象证明了光的粒子性?',
                        options: [
                            'A. 光的干涉',
                            'B. 光的衍射',
                            'C. 光电效应',
                            'D. 光的偏振'
                        ],
                        correctAnswer: 2,
                        points: 20,
                        dimension: 'concept' // 概念理解维度
                    },
                    {
                        id: 'q2',
                        type: 'choice',
                        question: '在双缝实验中,逐个发射电子,最终会形成什么图样?',
                        options: [
                            'A. 两条亮纹',
                            'B. 干涉条纹',
                            'C. 随机分布',
                            'D. 单条亮纹'
                        ],
                        correctAnswer: 1,
                        points: 20,
                        dimension: 'experiment' // 实验理解维度
                    },
                    {
                        id: 'q3',
                        type: 'choice',
                        question: '波粒二象性适用于:',
                        options: [
                            'A. 仅适用于光子',
                            'B. 仅适用于电子',
                            'C. 适用于所有微观粒子',
                            'D. 适用于所有物体'
                        ],
                        correctAnswer: 2,
                        points: 20,
                        dimension: 'concept'
                    },
                    {
                        id: 'q4',
                        type: 'true-false',
                        question: '观测行为会影响量子系统的状态。',
                        correctAnswer: true,
                        points: 20,
                        dimension: 'measurement' // 测量问题维度
                    },
                    {
                        id: 'q5',
                        type: 'choice',
                        question: '德布罗意波长公式 λ = h/p 中,当粒子动量增大时,波长会:',
                        options: [
                            'A. 增大',
                            'B. 减小',
                            'C. 不变',
                            'D. 先增大后减小'
                        ],
                        correctAnswer: 1,
                        points: 20,
                        dimension: 'application' // 应用能力维度
                    }
                ]
            },
            {
                id: 'assessment-2',
                title: '波粒二象性进阶评测',
                description: '深入评估你对波粒二象性的理解和应用能力',
                difficulty: 'advanced',
                timeLimit: 900, // 15分钟
                passingScore: 70,
                questions: [
                    {
                        id: 'q6',
                        type: 'choice',
                        question: '在双缝实验中加入"延迟选择"装置后,结果说明:',
                        options: [
                            'A. 粒子可以预知未来的测量',
                            'B. 测量的选择影响过去的状态',
                            'C. 量子态在测量时才确定',
                            'D. 实验装置有问题'
                        ],
                        correctAnswer: 2,
                        points: 25,
                        dimension: 'advanced-concept'
                    },
                    {
                        id: 'q7',
                        type: 'choice',
                        question: '互补原理指出:',
                        options: [
                            'A. 波动性和粒子性可以同时观测',
                            'B. 波动性和粒子性是互斥的',
                            'C. 波动性和粒子性是同一本质的不同表现',
                            'D. 波动性和粒子性互相补充,共同描述量子客体'
                        ],
                        correctAnswer: 3,
                        points: 25,
                        dimension: 'advanced-concept'
                    },
                    {
                        id: 'q8',
                        type: 'choice',
                        question: '如果用可见光观测电子,会发生什么?',
                        options: [
                            'A. 可以精确测量电子位置',
                            'B. 光子会改变电子的动量',
                            'C. 电子会被光子湮灭',
                            'D. 无法观测到电子'
                        ],
                        correctAnswer: 1,
                        points: 25,
                        dimension: 'measurement'
                    },
                    {
                        id: 'q9',
                        type: 'choice',
                        question: '宏观物体不表现波动性的原因是:',
                        options: [
                            'A. 宏观物体不遵守量子力学',
                            'B. 德布罗意波长太小,无法观测',
                            'C. 宏观物体没有动量',
                            'D. 波粒二象性只适用于微观粒子'
                        ],
                        correctAnswer: 1,
                        points: 25,
                        dimension: 'application'
                    }
                ]
            }
        ],
        // 能力维度定义
        dimensions: [
            {
                id: 'concept',
                name: '概念理解',
                description: '对基本概念的理解程度',
                weight: 0.25
            },
            {
                id: 'experiment',
                name: '实验理解',
                description: '对实验现象和原理的理解',
                weight: 0.25
            },
            {
                id: 'measurement',
                name: '测量问题',
                description: '对量子测量问题的认识',
                weight: 0.2
            },
            {
                id: 'application',
                name: '应用能力',
                description: '运用知识解决问题的能力',
                weight: 0.15
            },
            {
                id: 'advanced-concept',
                name: '深度理解',
                description: '对高级概念的掌握',
                weight: 0.15
            }
        ]
    },

    // 不确定性原理评测
    'uncertainty-principle': {
        nodeId: 'node-4',
        topic: '不确定性原理',
        assessments: [
            {
                id: 'assessment-3',
                title: '不确定性原理基础评测',
                description: '评估你对海森堡不确定性原理的理解',
                difficulty: 'intermediate',
                timeLimit: 600,
                passingScore: 65,
                questions: [
                    {
                        id: 'q10',
                        type: 'choice',
                        question: '不确定性原理的本质是:',
                        options: [
                            'A. 测量仪器不够精确',
                            'B. 观测会干扰被测系统',
                            'C. 量子世界的内在性质',
                            'D. 人类认知的局限'
                        ],
                        correctAnswer: 2,
                        points: 25,
                        dimension: 'concept'
                    }
                ]
            }
        ],
        dimensions: [
            {
                id: 'concept',
                name: '概念理解',
                description: '对不确定性原理的理解',
                weight: 0.4
            },
            {
                id: 'mathematics',
                name: '数学应用',
                description: '数学公式的理解和应用',
                weight: 0.3
            },
            {
                id: 'philosophy',
                name: '哲学思考',
                description: '对量子哲学问题的认识',
                weight: 0.3
            }
        ]
    }
};

// 辅助函数:获取评测数据
export const getAssessmentByTopic = (topicKey) => {
    return learningAssessmentData[topicKey] || null;
};

// 辅助函数:根据难度获取评测
export const getAssessmentByDifficulty = (topicKey, difficulty) => {
    const assessment = learningAssessmentData[topicKey];
    if (!assessment) return null;
    return assessment.assessments.find(a => a.difficulty === difficulty);
};

// 辅助函数:评分和能力分析
export const analyzeAssessment = (topicKey, assessmentId, userAnswers) => {
    const topicData = learningAssessmentData[topicKey];
    if (!topicData) return null;

    const assessment = topicData.assessments.find(a => a.id === assessmentId);
    if (!assessment) return null;

    let totalScore = 0;
    let maxScore = 0;
    const dimensionScores = {};
    const dimensionMaxScores = {};

    // 初始化维度分数
    topicData.dimensions.forEach(dim => {
        dimensionScores[dim.id] = 0;
        dimensionMaxScores[dim.id] = 0;
    });

    // 计算分数
    assessment.questions.forEach((question, index) => {
        maxScore += question.points;
        dimensionMaxScores[question.dimension] += question.points;

        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) {
            totalScore += question.points;
            dimensionScores[question.dimension] += question.points;
        }
    });

    // 计算各维度百分比
    const dimensionPercentages = {};
    Object.keys(dimensionScores).forEach(dimId => {
        const maxDimScore = dimensionMaxScores[dimId];
        dimensionPercentages[dimId] = maxDimScore > 0
            ? (dimensionScores[dimId] / maxDimScore) * 100
            : 0;
    });

    const percentage = (totalScore / maxScore) * 100;
    const passed = percentage >= assessment.passingScore;

    // 生成能力分析
    const analysis = generateAbilityAnalysis(dimensionPercentages, topicData.dimensions);

    return {
        totalScore,
        maxScore,
        percentage: percentage.toFixed(1),
        passed,
        dimensionScores: dimensionPercentages,
        analysis,
        recommendation: generateRecommendation(percentage, dimensionPercentages)
    };
};

// 生成能力分析文本
const generateAbilityAnalysis = (dimensionPercentages, dimensions) => {
    const analysis = [];

    Object.entries(dimensionPercentages).forEach(([dimId, percentage]) => {
        const dimension = dimensions.find(d => d.id === dimId);
        if (!dimension) return;

        let level = '';
        if (percentage >= 80) level = '优秀';
        else if (percentage >= 60) level = '良好';
        else if (percentage >= 40) level = '及格';
        else level = '需加强';

        analysis.push({
            dimension: dimension.name,
            percentage: percentage.toFixed(1),
            level,
            description: dimension.description
        });
    });

    return analysis;
};

// 生成学习建议
const generateRecommendation = (totalPercentage, dimensionPercentages) => {
    if (totalPercentage >= 85) {
        return {
            level: 'excellent',
            message: '恭喜!你已经完全掌握了这个知识点,可以进入下一章学习。',
            nextStep: 'next_topic'
        };
    } else if (totalPercentage >= 70) {
        return {
            level: 'good',
            message: '你的掌握程度不错,但还有提升空间。建议做一些进阶练习。',
            nextStep: 'advanced_practice'
        };
    } else if (totalPercentage >= 60) {
        return {
            level: 'pass',
            message: '你已经理解了基本概念,建议通过更多练习来巩固。',
            nextStep: 'more_practice'
        };
    } else {
        // 找出最薄弱的维度
        const weakestDim = Object.entries(dimensionPercentages)
            .sort((a, b) => a[1] - b[1])[0];

        return {
            level: 'need_improvement',
            message: `你在某些方面还需要加强,特别是${weakestDim[0]}方面。建议重新学习相关内容。`,
            nextStep: 'review',
            focusArea: weakestDim[0]
        };
    }
};

export default learningAssessmentData;

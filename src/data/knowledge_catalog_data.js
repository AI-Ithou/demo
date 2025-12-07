// 知识点目录数据
const KNOWLEDGE_CATALOG_DATA = {
    // 课程列表
    courses: [
        {
            id: 'python-basic',
            name: 'Python编程基础',
            icon: '🐍',
            color: 'blue',
            progress: 75,
            totalPoints: 45,
            masteredPoints: 34,
            chapters: [
                {
                    id: 'ch1',
                    name: '第一章：Python入门',
                    status: 'completed', // completed, learning, locked
                    progress: 100,
                    knowledgePoints: [
                        {
                            id: 'kp-1-1',
                            name: '变量与数据类型',
                            status: 'mastered', // mastered, learning, weak, not-started
                            masteryLevel: 95,
                            studyTime: 120, // 分钟
                            exercises: { total: 20, completed: 20, correct: 19 },
                            lastStudy: '2024-12-05',
                            resources: ['视频课程', '练习题', 'AI答疑']
                        },
                        {
                            id: 'kp-1-2',
                            name: '运算符与表达式',
                            status: 'mastered',
                            masteryLevel: 88,
                            studyTime: 90,
                            exercises: { total: 15, completed: 15, correct: 13 },
                            lastStudy: '2024-12-04',
                            resources: ['视频课程', '练习题']
                        },
                        {
                            id: 'kp-1-3',
                            name: '输入输出函数',
                            status: 'mastered',
                            masteryLevel: 92,
                            studyTime: 60,
                            exercises: { total: 10, completed: 10, correct: 10 },
                            lastStudy: '2024-12-03',
                            resources: ['视频课程', '代码示例']
                        }
                    ]
                },
                {
                    id: 'ch2',
                    name: '第二章：控制结构',
                    status: 'learning',
                    progress: 60,
                    knowledgePoints: [
                        {
                            id: 'kp-2-1',
                            name: '条件语句(if-elif-else)',
                            status: 'mastered',
                            masteryLevel: 90,
                            studyTime: 100,
                            exercises: { total: 18, completed: 18, correct: 16 },
                            lastStudy: '2024-12-06',
                            resources: ['视频课程', '练习题', 'AI答疑']
                        },
                        {
                            id: 'kp-2-2',
                            name: 'for循环',
                            status: 'learning',
                            masteryLevel: 70,
                            studyTime: 80,
                            exercises: { total: 20, completed: 15, correct: 12 },
                            lastStudy: '2024-12-06',
                            resources: ['视频课程', '练习题', 'AI答疑', '错题本']
                        },
                        {
                            id: 'kp-2-3',
                            name: 'while循环',
                            status: 'learning',
                            masteryLevel: 65,
                            studyTime: 60,
                            exercises: { total: 15, completed: 10, correct: 7 },
                            lastStudy: '2024-12-05',
                            resources: ['视频课程', '练习题']
                        },
                        {
                            id: 'kp-2-4',
                            name: '循环控制(break/continue)',
                            status: 'weak',
                            masteryLevel: 45,
                            studyTime: 40,
                            exercises: { total: 12, completed: 8, correct: 4 },
                            lastStudy: '2024-12-04',
                            resources: ['视频课程', '练习题', 'AI答疑', '专项辅导']
                        }
                    ]
                },
                {
                    id: 'ch3',
                    name: '第三章：函数与模块',
                    status: 'learning',
                    progress: 40,
                    knowledgePoints: [
                        {
                            id: 'kp-3-1',
                            name: '函数定义与调用',
                            status: 'learning',
                            masteryLevel: 60,
                            studyTime: 70,
                            exercises: { total: 15, completed: 10, correct: 7 },
                            lastStudy: '2024-12-06',
                            resources: ['视频课程', '练习题', 'AI答疑']
                        },
                        {
                            id: 'kp-3-2',
                            name: '参数传递',
                            status: 'not-started',
                            masteryLevel: 0,
                            studyTime: 0,
                            exercises: { total: 12, completed: 0, correct: 0 },
                            lastStudy: null,
                            resources: ['视频课程', '练习题']
                        },
                        {
                            id: 'kp-3-3',
                            name: '返回值',
                            status: 'not-started',
                            masteryLevel: 0,
                            studyTime: 0,
                            exercises: { total: 10, completed: 0, correct: 0 },
                            lastStudy: null,
                            resources: ['视频课程']
                        }
                    ]
                },
                {
                    id: 'ch4',
                    name: '第四章：数据结构',
                    status: 'locked',
                    progress: 0,
                    knowledgePoints: [
                        {
                            id: 'kp-4-1',
                            name: '列表(List)',
                            status: 'not-started',
                            masteryLevel: 0,
                            studyTime: 0,
                            exercises: { total: 25, completed: 0, correct: 0 },
                            lastStudy: null,
                            resources: ['视频课程', '练习题', 'AI答疑']
                        },
                        {
                            id: 'kp-4-2',
                            name: '元组(Tuple)',
                            status: 'not-started',
                            masteryLevel: 0,
                            studyTime: 0,
                            exercises: { total: 15, completed: 0, correct: 0 },
                            lastStudy: null,
                            resources: ['视频课程', '练习题']
                        },
                        {
                            id: 'kp-4-3',
                            name: '字典(Dictionary)',
                            status: 'not-started',
                            masteryLevel: 0,
                            studyTime: 0,
                            exercises: { total: 20, completed: 0, correct: 0 },
                            lastStudy: null,
                            resources: ['视频课程', '练习题', 'AI答疑']
                        }
                    ]
                }
            ]
        }
    ],

    // 学习统计
    statistics: {
        totalKnowledgePoints: 45,
        masteredPoints: 34,
        learningPoints: 7,
        weakPoints: 1,
        notStartedPoints: 3,
        totalStudyTime: 780, // 分钟
        avgMasteryLevel: 75
    },

    // AI推荐学习路径
    recommendedPath: [
        {
            id: 'kp-2-4',
            name: '循环控制(break/continue)',
            reason: '当前掌握度较低，建议优先加强',
            priority: 'high'
        },
        {
            id: 'kp-3-1',
            name: '函数定义与调用',
            reason: '继续当前学习进度',
            priority: 'medium'
        },
        {
            id: 'kp-3-2',
            name: '参数传递',
            reason: '下一个待学习知识点',
            priority: 'medium'
        }
    ]
};

export default KNOWLEDGE_CATALOG_DATA;

// 学生作业数据
const STUDENT_HOMEWORK_DATA = {
    // 作业列表
    homeworkList: [
        {
            id: 'hw-001',
            title: 'Python基础练习 - 第一章',
            course: 'Python编程基础',
            dueDate: '2024-12-15',
            status: 'submitted', // pending, in-progress, submitted, graded
            score: 95,
            totalScore: 100,
            submittedDate: '2024-12-06',
            type: 'image', // image, text, code
            questions: 10,
            completedQuestions: 10
        },
        {
            id: 'hw-002',
            title: '循环结构编程作业',
            course: 'Python编程基础',
            dueDate: '2024-12-20',
            status: 'in-progress',
            score: null,
            totalScore: 100,
            submittedDate: null,
            type: 'image',
            questions: 8,
            completedQuestions: 5
        },
        {
            id: 'hw-003',
            title: '函数与模块综合练习',
            course: 'Python编程基础',
            dueDate: '2024-12-25',
            status: 'pending',
            score: null,
            totalScore: 100,
            submittedDate: null,
            type: 'image',
            questions: 12,
            completedQuestions: 0
        }
    ],

    // 当前作业详情（用于作业详情页）
    currentHomework: {
        id: 'hw-002',
        title: '循环结构编程作业',
        course: 'Python编程基础',
        dueDate: '2024-12-20',
        description: '完成以下关于for循环和while循环的编程题目',
        questions: [
            {
                id: 'q1',
                number: 1,
                text: '使用for循环打印1到100的所有偶数',
                points: 10,
                status: 'completed',
                answer: {
                    type: 'image',
                    imageUrl: null, // 从localStorage获取
                    recognizedText: 'for i in range(2, 101, 2):\n    print(i)',
                    recognizedAt: '2024-12-06 10:30'
                }
            },
            {
                id: 'q2',
                number: 2,
                text: '使用while循环计算1到50的和',
                points: 10,
                status: 'completed',
                answer: null
            },
            {
                id: 'q3',
                number: 3,
                text: '编写程序打印九九乘法表',
                points: 15,
                status: 'in-progress',
                answer: null
            },
            {
                id: 'q4',
                number: 4,
                text: '使用循环找出1到100之间的所有质数',
                points: 20,
                status: 'not-started',
                answer: null
            }
        ]
    },

    // 图片识别历史
    recognitionHistory: [
        {
            id: 'rec-001',
            homeworkId: 'hw-002',
            questionId: 'q1',
            imageUrl: 'data:image/png;base64,...', // 实际应该从localStorage获取
            recognizedText: 'for i in range(2, 101, 2):\n    print(i)',
            confidence: 95,
            timestamp: '2024-12-06 10:30:25',
            status: 'success'
        }
    ],

    // 学习统计
    statistics: {
        totalHomework: 15,
        completedHomework: 8,
        averageScore: 92,
        onTimeRate: 87, // 按时完成率
        totalPoints: 1500,
        earnedPoints: 1380
    },

    // AI识别模拟数据库（用于模拟不同代码的识别结果）
    mockRecognitionDatabase: [
        {
            keywords: ['for', 'range', 'print'],
            result: 'for i in range(1, 101):\n    print(i)',
            confidence: 92
        },
        {
            keywords: ['while', 'sum'],
            result: 'total = 0\ni = 1\nwhile i <= 50:\n    total += i\n    i += 1\nprint(total)',
            confidence: 88
        },
        {
            keywords: ['def', 'function'],
            result: 'def calculate(x, y):\n    return x + y',
            confidence: 95
        }
    ]
};

export default STUDENT_HOMEWORK_DATA;

// 学生路径分配和管理数据

// 模拟学生数据
export const MOCK_STUDENTS = [
    {
        id: 's001',
        name: '张三',
        studentId: '2024001',
        class: '高一(3)班',
        avatar: 'https://ui-avatars.com/api/?name=张三&background=3b82f6&color=fff',
        abilities: {
            algebra: 65,      // 代数能力
            geometry: 72,     // 几何能力
            analysis: 58,     // 分析能力
            overall: 65       // 综合能力
        },
        learningStyle: 'visual',  // 视觉型
        targetScore: 75
    },
    {
        id: 's002',
        name: '李四',
        studentId: '2024002',
        class: '高一(3)班',
        avatar: 'https://ui-avatars.com/api/?name=李四&background=10b981&color=fff',
        abilities: {
            algebra: 82,
            geometry: 78,
            analysis: 85,
            overall: 82
        },
        learningStyle: 'logical',  // 逻辑型
        targetScore: 90
    },
    {
        id: 's003',
        name: '王五',
        studentId: '2024003',
        class: '高一(3)班',
        avatar: 'https://ui-avatars.com/api/?name=王五&background=f59e0b&color=fff',
        abilities: {
            algebra: 55,
            geometry: 62,
            analysis: 50,
            overall: 56
        },
        learningStyle: 'practical',  // 实战型
        targetScore: 70
    },
    {
        id: 's004',
        name: '赵六',
        studentId: '2024004',
        class: '高一(3)班',
        avatar: 'https://ui-avatars.com/api/?name=赵六&background=ef4444&color=fff',
        abilities: {
            algebra: 92,
            geometry: 90,
            analysis: 88,
            overall: 90
        },
        learningStyle: 'logical',
        targetScore: 100
    },
    {
        id: 's005',
        name: '孙七',
        studentId: '2024005',
        class: '高一(3)班',
        avatar: 'https://ui-avatars.com/api/?name=孙七&background=8b5cf6&color=fff',
        abilities: {
            algebra: 88,
            geometry: 92,
            analysis: 85,
            overall: 88
        },
        learningStyle: 'visual',
        targetScore: 95
    }
];

// 学生路径分配数据
export const STUDENT_PATH_ASSIGNMENTS = [
    {
        studentId: 's001',
        pathId: 'path-basic',  // 对应PathManager中的路径ID
        pathName: '基础班路径',
        assignedDate: '2025-11-01',
        progress: {
            completedNodes: ['1.1.1', '1.1.2'],
            currentNode: '1.2.1',
            totalNodes: 6,
            percentage: 33
        },
        estimatedCompletion: '2025-12-15',
        actualHoursSpent: 15,
        // 新增：详细学习轨迹日志
        activityLogs: [
            {
                id: 'log-001',
                type: 'study',
                timestamp: '2025-11-29 14:30',
                title: '学习知识点：1.2.1 函数的概念',
                duration: '45分钟',
                details: '观看了概念讲解视频，阅读了教材重点',
                status: 'completed'
            },
            {
                id: 'log-002',
                type: 'exercise',
                timestamp: '2025-11-29 15:15',
                title: '完成练习：函数概念基础测验',
                score: 85,
                totalScore: 100,
                details: '共20题，答对17题',
                status: 'completed'
            },
            {
                id: 'log-003',
                type: 'resource',
                timestamp: '2025-11-28 10:00',
                title: '查看资源：集合间的基本关系.pptx',
                duration: '20分钟',
                details: '重点复习了子集和真子集的概念',
                status: 'completed'
            },
            {
                id: 'log-004',
                type: 'study',
                timestamp: '2025-11-28 09:00',
                title: '完成知识点：1.1.2 集合间的基本关系',
                duration: '60分钟',
                details: '系统学习了该节点所有内容',
                status: 'completed'
            },
            {
                id: 'log-005',
                type: 'agent',
                timestamp: '2025-11-27 16:30',
                title: 'AI辅导：集合运算疑难解答',
                duration: '15分钟',
                details: '向AI助手询问了关于补集的运算规则',
                status: 'completed'
            },
            {
                id: 'log-006',
                type: 'study',
                timestamp: '2025-11-27 14:00',
                title: '完成知识点：1.1.1 集合的含义与表示',
                duration: '50分钟',
                details: '完成了第一章第一节的学习',
                status: 'completed'
            },
            {
                id: 'log-007',
                type: 'system',
                timestamp: '2025-11-01 09:00',
                title: '路径分配',
                details: '老师分配了"基础班学习路径"',
                status: 'info'
            }
        ]
    },
    {
        studentId: 's002',
        pathId: 'path-advanced',
        pathName: '提高班路径',
        assignedDate: '2025-11-01',
        progress: {
            completedNodes: ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '2.1.1'],
            currentNode: '2.1.2',
            totalNodes: 12,
            percentage: 58
        },
        estimatedCompletion: '2025-12-20',
        actualHoursSpent: 48
    },
    {
        studentId: 's003',
        pathId: 'path-basic',
        pathName: '基础班路径',
        assignedDate: '2025-11-05',
        progress: {
            completedNodes: ['1.1.1'],
            currentNode: '1.1.2',
            totalNodes: 6,
            percentage: 17
        },
        estimatedCompletion: '2025-12-18',
        actualHoursSpent: 8
    },
    {
        studentId: 's004',
        pathId: 'path-competition',
        pathName: '竞赛培优路径',
        assignedDate: '2025-11-01',
        progress: {
            completedNodes: ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '2.1.1', '2.1.2', '2.2.1', '2.2.2'],
            currentNode: '3.1.1',
            totalNodes: 16,
            percentage: 62
        },
        estimatedCompletion: '2025-12-25',
        actualHoursSpent: 85
    },
    {
        studentId: 's005',
        pathId: 'path-competition',
        pathName: '竞赛培优路径',
        assignedDate: '2025-11-01',
        progress: {
            completedNodes: ['1.1.1', '1.1.2', '1.1.3', '1.2.1', '1.2.2', '1.2.3', '2.1.1', '2.1.2'],
            currentNode: '2.2.1',
            totalNodes: 16,
            percentage: 50
        },
        estimatedCompletion: '2025-12-28',
        actualHoursSpent: 72
    }
];

// 学生路径管理类
export class StudentPathManager {
    // 获取所有学生路径分配
    static getAllAssignments() {
        const saved = localStorage.getItem('studentPathAssignments');
        return saved ? JSON.parse(saved) : STUDENT_PATH_ASSIGNMENTS;
    }

    // 为学生分配路径
    static assignPath(studentId, pathId, pathName) {
        const assignments = this.getAllAssignments();
        const existing = assignments.find(a => a.studentId === studentId);

        if (existing) {
            existing.pathId = pathId;
            existing.pathName = pathName;
            existing.assignedDate = new Date().toISOString();
        } else {
            assignments.push({
                studentId,
                pathId,
                pathName,
                assignedDate: new Date().toISOString(),
                progress: {
                    completedNodes: [],
                    currentNode: null,
                    totalNodes: 0,
                    percentage: 0
                },
                estimatedCompletion: null,
                actualHoursSpent: 0
            });
        }

        localStorage.setItem('studentPathAssignments', JSON.stringify(assignments));
        return assignments;
    }

    // 更新学生进度
    static updateProgress(studentId, progressData) {
        const assignments = this.getAllAssignments();
        const assignment = assignments.find(a => a.studentId === studentId);

        if (assignment) {
            assignment.progress = { ...assignment.progress, ...progressData };
            localStorage.setItem('studentPathAssignments', JSON.stringify(assignments));
        }

        return assignments;
    }

    // 获取学生信息
    static getStudent(studentId) {
        return MOCK_STUDENTS.find(s => s.id === studentId);
    }

    // 获取班级统计
    static getClassStats() {
        const assignments = this.getAllAssignments();
        const pathDistribution = {};

        assignments.forEach(a => {
            if (!pathDistribution[a.pathName]) {
                pathDistribution[a.pathName] = 0;
            }
            pathDistribution[a.pathName]++;
        });

        const avgProgress = assignments.reduce((sum, a) => sum + a.progress.percentage, 0) / assignments.length;

        return {
            totalStudents: assignments.length,
            pathDistribution,
            avgProgress: Math.round(avgProgress)
        };
    }
}

export default {
    MOCK_STUDENTS,
    STUDENT_PATH_ASSIGNMENTS,
    StudentPathManager
};

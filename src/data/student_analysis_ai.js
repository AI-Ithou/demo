// 学生学情AI分析数据和生成器

import { MOCK_STUDENTS } from './student_path_data';

// AI学情分析结果模拟
export const STUDENT_ANALYSIS_REPORTS = {
    's001': {
        studentId: 's001',
        generatedAt: '2025-11-29 18:30',

        // 学习状态评估
        learningStatus: {
            overall: 'good', // excellent, good, average, needsImprovement
            score: 78,
            comment: '该学生学习态度端正，能够按时完成学习任务，但在理论理解深度上还有提升空间。',
            trends: [
                { date: '2025-11-01', score: 65 },
                { date: '2025-11-08', score: 68 },
                { date: '2025-11-15', score: 72 },
                { date: '2025-11-22', score: 76 },
                { date: '2025-11-29', score: 78 }
            ]
        },

        // 挂科率数据
        failureData: {
            totalCourses: 12,  // 总课程数
            failedCount: 2,  // 挂科数量
            failedSubjects: ['高等数学', '物理学'],  // 挂科科目
            warningCount: 1,  // 预警科目数
            warningSubjects: ['化学']  // 预警科目
        },

        // 能力维度分析
        abilities: {
            algebra: { score: 70, level: '中等', comment: '代数运算基础扎实，但在抽象代数概念理解上需要加强' },
            geometry: { score: 60, level: '一般', comment: '空间想象能力较弱，建议多做几何图形题' },
            analysis: { score: 65, level: '中等', comment: '逻辑分析能力尚可，需要提高综合题的解题思路' },
            computation: { score: 75, level: '良好', comment: '计算准确度高，速度较快' },
            application: { score: 55, level: '待提升', comment: '应用题理解能力需要加强，建议多练习实际问题建模' }
        },

        // 薄弱环节诊断
        weaknesses: [
            {
                id: 'w1',
                type: 'knowledge',
                severity: 'high',
                title: '函数概念理解不够深入',
                description: '在函数的概念和映射关系理解上存在困难，经常混淆定义域和值域',
                affectedTopics: ['1.2.1 函数的概念', '1.2.3 函数的基本性质'],
                suggestion: '建议重点复习函数的定义，通过大量实例加深理解'
            },
            {
                id: 'w2',
                type: 'skill',
                severity: 'medium',
                title: '几何图形空间想象能力弱',
                description: '立体几何题目正确率偏低，对空间关系把握不准',
                affectedTopics: ['平面向量', '立体几何'],
                suggestion: '使用3D模型辅助学习，多做空间图形的绘制练习'
            },
            {
                id: 'w3',
                type: 'habit',
                severity: 'low',
                title: '学习时间分配不均',
                description: '周末学习时间明显减少，导致知识遗忘',
                affectedTopics: [],
                suggestion: '建议制定周学习计划，保持每日学习节奏'
            }
        ],

        // AI个性化建议
        recommendations: [
            {
                id: 'r1',
                category: 'learning',
                priority: 'high',
                title: '加强函数概念理解',
                content: '该学生在函数的概念理解上存在明显薄弱环节。建议采用以下方法：\n1. 重新学习函数的定义，理解映射的本质\n2. 通过生活中的实例（如温度变化、价格函数）加深理解\n3. 完成20道函数概念判断题',
                estimatedTime: '3小时',
                resources: ['函数概念讲解视频', '函数概念练习题库', 'AI函数助手']
            },
            {
                id: 'r2',
                category: 'practice',
                priority: 'high',
                title: '强化几何空间训练',
                content: '空间想象能力需要通过大量练习来提升：\n1. 每天完成2-3道立体几何题\n2. 使用GeoGebra等3D软件辅助学习\n3. 绘制空间图形草图',
                estimatedTime: '每天30分钟',
                resources: ['立体几何可视化工具', '空间图形题库']
            },
            {
                id: 'r3',
                category: 'path',
                priority: 'medium',
                title: '调整学习路径顺序',
                content: '建议暂缓学习"函数的基本性质"，先巩固"函数的概念"和"函数的表示法"',
                estimatedTime: '-',
                resources: []
            },
            {
                id: 'r4',
                category: 'habit',
                priority: 'low',
                title: '优化学习时间分配',
                content: '建议制定固定的学习时间表，保持学习节奏的连续性',
                estimatedTime: '-',
                resources: ['学习计划模板']
            }
        ],

        // 学习预测
        prediction: {
            nextWeekProgress: 15, // 预计下周进度提升百分比
            estimatedCompletion: '2025-12-10',
            riskLevel: 'low', // low, medium, high
            riskFactors: ['周末学习时间不足'],
            suggestions: '按照当前进度，预计可以按时完成路径。建议保持当前的学习节奏，重点攻克函数概念部分。'
        }
    }
};

// AI学情分析生成器
export class StudentAnalysisAI {
    // 生成学生学情分析报告
    static generateReport(studentId) {
        // 如果已有报告，直接返回
        if (STUDENT_ANALYSIS_REPORTS[studentId]) {
            return STUDENT_ANALYSIS_REPORTS[studentId];
        }

        // 否则生成新报告（简化版）
        const student = MOCK_STUDENTS.find(s => s.id === studentId);
        if (!student) return null;

        return {
            studentId,
            generatedAt: new Date().toISOString(),
            learningStatus: {
                overall: 'average',
                score: student.abilities.overall,
                comment: 'AI分析生成中...',
                trends: []
            },
            failureData: {
                totalCourses: 12,
                failedCount: Math.floor(Math.random() * 3),
                failedSubjects: ['高等数学', '物理学'].slice(0, Math.floor(Math.random() * 2)),
                warningCount: Math.floor(Math.random() * 3),
                warningSubjects: ['化学', '英语'].slice(0, Math.floor(Math.random() * 2))
            },
            abilities: {
                algebra: { score: student.abilities.algebra, level: '待评估', comment: '数据收集中' },
                geometry: { score: student.abilities.geometry, level: '待评估', comment: '数据收集中' },
                analysis: { score: student.abilities.analysis, level: '待评估', comment: '数据收集中' }
            },
            weaknesses: [],
            recommendations: [],
            prediction: {
                riskLevel: 'low',
                suggestions: '数据积累中，暂无预测'
            }
        };
    }

    // 批量生成班级报告
    static generateClassReports(studentIds) {
        return studentIds.map(id => this.generateReport(id));
    }
}

export default {
    STUDENT_ANALYSIS_REPORTS,
    StudentAnalysisAI
};

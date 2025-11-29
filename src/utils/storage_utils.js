import { LEARNING_REPORT_DATA } from '../data/learning_report_data';

const STORAGE_KEY = 'learning_report_data';

/**
 * 浏览器缓存工具类 - 管理学习报告数据
 */
export class StorageUtils {
    /**
     * 获取学习数据,如果不存在则初始化
     */
    static getLearningData() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
            // 首次加载,使用默认数据初始化
            this.saveLearningData(LEARNING_REPORT_DATA);
            return LEARNING_REPORT_DATA;
        } catch (error) {
            console.error('获取学习数据失败:', error);
            return LEARNING_REPORT_DATA;
        }
    }

    /**
     * 保存学习数据到 localStorage
     */
    static saveLearningData(data) {
        try {
            const dataWithTimestamp = {
                ...data,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
            return true;
        } catch (error) {
            console.error('保存学习数据失败:', error);
            return false;
        }
    }

    /**
     * 更新学习进度
     */
    static updateProgress(moduleId, progress) {
        const data = this.getLearningData();
        const module = data.knowledgeMap.modules.find(m => m.id === moduleId);
        if (module) {
            module.progress = progress;
            // 根据进度更新状态
            if (progress >= 95) {
                module.status = 'mastered';
            } else if (progress > 0) {
                module.status = 'learning';
            }
            this.saveLearningData(data);
        }
    }

    /**
     * 添加成就
     */
    static addAchievement(achievement) {
        const data = this.getLearningData();
        const exists = data.overview.achievements.find(a => a.id === achievement.id);
        if (!exists) {
            data.overview.achievements.push({
                ...achievement,
                unlocked: true,
                date: new Date().toISOString().split('T')[0]
            });
            this.saveLearningData(data);
        }
    }

    /**
     * 更新能力分数
     */
    static updateAbilityScore(dimension, score) {
        const data = this.getLearningData();
        const ability = data.abilityRadar.current.find(a => a.dimension === dimension);
        if (ability) {
            ability.score = score;
            this.saveLearningData(data);
        }
    }

    /**
     * 标记建议为已完成
     */
    static markRecommendationComplete(recommendationId) {
        const data = this.getLearningData();
        const recommendation = data.recommendations.actionItems.find(r => r.id === recommendationId);
        if (recommendation) {
            recommendation.completed = true;
            recommendation.completedDate = new Date().toISOString();
            this.saveLearningData(data);
        }
    }

    /**
     * 添加学习记录
     */
    static addLearningRecord(record) {
        const data = this.getLearningData();
        const today = new Date().toISOString().split('T')[0];
        const dateStr = today.substring(5); // MM-DD 格式

        const existingRecord = data.performanceTrends.daily.find(d => d.date === dateStr);
        if (existingRecord) {
            // 更新今天的记录
            Object.assign(existingRecord, record);
        } else {
            // 添加新记录
            data.performanceTrends.daily.push({
                date: dateStr,
                ...record
            });
        }
        this.saveLearningData(data);
    }

    /**
     * 更新连续打卡天数
     */
    static updateStreak() {
        const data = this.getLearningData();
        data.overview.streakDays += 1;
        if (data.overview.streakDays > data.performanceTrends.keyMetrics.bestStreak) {
            data.performanceTrends.keyMetrics.bestStreak = data.overview.streakDays;
        }
        this.saveLearningData(data);
    }

    /**
     * 导出数据为 JSON
     */
    static exportData() {
        const data = this.getLearningData();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `learning_report_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * 导入数据
     */
    static importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            this.saveLearningData(data);
            return true;
        } catch (error) {
            console.error('导入数据失败:', error);
            return false;
        }
    }

    /**
     * 清除所有数据
     */
    static clearData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /**
     * 重置为默认数据
     */
    static resetToDefault() {
        this.saveLearningData(LEARNING_REPORT_DATA);
    }

    // ==================== 错题本管理方法 ====================

    /**
     * 获取错题数据
     */
    static getErrorQuestions() {
        try {
            const stored = localStorage.getItem('error_questions_data');
            if (stored) {
                return JSON.parse(stored);
            }
            // 首次加载需要导入初始数据
            return null;
        } catch (error) {
            console.error('获取错题数据失败:', error);
            return null;
        }
    }

    /**
     * 保存错题数据
     */
    static saveErrorQuestions(data) {
        try {
            localStorage.setItem('error_questions_data', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存错题数据失败:', error);
            return false;
        }
    }

    /**
     * 初始化错题数据（首次使用）
     */
    static initializeErrorQuestions(initialData) {
        if (!this.getErrorQuestions()) {
            this.saveErrorQuestions(initialData);
        }
    }

    /**
     * 筛选错题
     * @param {Object} filters - { subject, difficulty, status }
     */
    static filterErrorQuestions(filters = {}) {
        const data = this.getErrorQuestions();
        if (!data) return [];

        let filtered = [...data.questions];

        if (filters.subject && filters.subject !== 'all') {
            filtered = filtered.filter(q => q.subject === filters.subject);
        }

        if (filters.difficulty && filters.difficulty !== 'all') {
            filtered = filtered.filter(q => q.difficulty === filters.difficulty);
        }

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(q => q.status === filters.status);
        }

        if (filters.knowledgePoint) {
            filtered = filtered.filter(q => q.knowledgePoint === filters.knowledgePoint);
        }

        return filtered;
    }

    /**
     * 更新错题状态
     */
    static updateQuestionStatus(questionId, status) {
        const data = this.getErrorQuestions();
        if (!data) return false;

        const question = data.questions.find(q => q.id === questionId);
        if (question) {
            question.status = status;
            question.lastReviewDate = new Date().toISOString();

            // 更新统计数据
            this.recalculateErrorStatistics(data);
            this.saveErrorQuestions(data);

            // 同步到学习报告
            this.syncErrorsToReport();
            return true;
        }
        return false;
    }

    /**
     * 添加重做记录
     */
    static addRetryRecord(questionId, userAnswer) {
        const data = this.getErrorQuestions();
        if (!data) return false;

        const question = data.questions.find(q => q.id === questionId);
        if (question) {
            const isCorrect = userAnswer.trim() === question.correctAnswer.trim();

            question.retryHistory.push({
                date: new Date().toISOString(),
                answer: userAnswer,
                isCorrect
            });
            question.retryCount = question.retryHistory.length;
            question.lastReviewDate = new Date().toISOString();

            // 如果答对，自动更新状态
            if (isCorrect) {
                const correctCount = question.retryHistory.filter(r => r.isCorrect).length;
                if (correctCount >= 2) {
                    question.status = 'mastered';
                } else {
                    question.status = 'reviewing';
                }
            }

            // 更新统计和同步
            this.recalculateErrorStatistics(data);
            this.saveErrorQuestions(data);
            this.syncErrorsToReport();

            return { success: true, isCorrect };
        }
        return { success: false };
    }

    /**
     * 标记为优先/取消优先
     */
    static togglePriority(questionId) {
        const data = this.getErrorQuestions();
        if (!data) return false;

        const question = data.questions.find(q => q.id === questionId);
        if (question) {
            question.isPriority = !question.isPriority;
            this.saveErrorQuestions(data);
            return true;
        }
        return false;
    }

    /**
     * 重新计算错题统计数据
     */
    static recalculateErrorStatistics(data) {
        const stats = {
            totalErrors: data.questions.length,
            masteredCount: 0,
            reviewingCount: 0,
            notReviewedCount: 0,
            bySubject: {},
            byDifficulty: {},
            byKnowledgePoint: {}
        };

        data.questions.forEach(q => {
            // 状态统计
            if (q.status === 'mastered') stats.masteredCount++;
            else if (q.status === 'reviewing') stats.reviewingCount++;
            else stats.notReviewedCount++;

            // 科目统计
            stats.bySubject[q.subject] = (stats.bySubject[q.subject] || 0) + 1;

            // 难度统计
            stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;

            // 知识点统计
            if (!stats.byKnowledgePoint[q.knowledgePoint]) {
                stats.byKnowledgePoint[q.knowledgePoint] = {
                    count: 0,
                    correctRate: 0,
                    mastery: 0
                };
            }
            const kp = stats.byKnowledgePoint[q.knowledgePoint];
            kp.count++;

            // 计算该知识点的正确率
            if (q.retryHistory.length > 0) {
                const correctCount = q.retryHistory.filter(r => r.isCorrect).length;
                kp.correctRate = Math.round((correctCount / q.retryHistory.length) * 100);
            }

            // 计算掌握度
            if (q.status === 'mastered') {
                kp.mastery = 100;
            } else if (q.status === 'reviewing') {
                kp.mastery = 50 + (kp.correctRate / 2);
            } else {
                kp.mastery = 0;
            }
        });

        data.statistics = stats;
    }

    /**
     * 将错题数据同步到学习报告
     * 更新薄弱知识点、能力分数等
     */
    static syncErrorsToReport() {
        const errorData = this.getErrorQuestions();
        const reportData = this.getLearningData();

        if (!errorData || !reportData) return;

        // 更新薄弱知识点
        const weakPoints = Object.entries(errorData.statistics.byKnowledgePoint)
            .filter(([_, stats]) => stats.mastery < 70)
            .sort((a, b) => a[1].mastery - b[1].mastery)
            .slice(0, 5)
            .map(([name, stats]) => ({
                name,
                score: stats.mastery
            }));

        // 更新能力雷达中的薄弱维度
        reportData.abilityRadar.weakestDimensions = weakPoints.slice(0, 3).map(p => p.name);

        // 根据错题情况调整能力分数
        // 例如：数学相关错题影响"概念理解"和"计算能力"
        const mathErrors = errorData.questions.filter(q =>
            q.subject === '数学' && q.status !== 'mastered'
        ).length;

        if (mathErrors > 0) {
            // 降低概念理解和计算能力的分数
            const conceptAbility = reportData.abilityRadar.current.find(a => a.dimension === '概念理解');
            const calcAbility = reportData.abilityRadar.current.find(a => a.dimension === '计算能力');

            if (conceptAbility) {
                conceptAbility.score = Math.max(60, 95 - mathErrors * 5);
            }
            if (calcAbility) {
                calcAbility.score = Math.max(65, 90 - mathErrors * 4);
            }
        }

        this.saveLearningData(reportData);
    }

    /**
     * 获取知识点相关的错题
     */
    static getQuestionsByKnowledgePoint(knowledgePoint) {
        return this.filterErrorQuestions({ knowledgePoint });
    }
}

export default StorageUtils;

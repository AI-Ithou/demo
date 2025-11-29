// AI智能学习小组推荐系统

import { MOCK_STUDENTS } from './student_path_data';

// 分组策略类型
export const GROUP_STRATEGIES = {
    mentor: {
        id: 'mentor',
        name: '传帮带分组',
        description: '强弱搭配，互帮互助，共同进步',
        icon: '🤝',
        color: '#3b82f6'
    },
    collaborative: {
        id: 'collaborative',
        name: '强强联合分组',
        description: '同水平组队，激发竞争力',
        icon: '🏆',
        color: '#f59e0b'
    },
    balanced: {
        id: 'balanced',
        name: '均衡分组',
        description: '各组水平均衡，公平竞争',
        icon: '⚖️',
        color: '#10b981'
    }
};

// AI分组推荐器
export class AIGroupRecommender {
    // 传帮带分组算法
    static generateMentorGroups(students, groupSize = 3) {
        // 按能力排序
        const sorted = [...students].sort((a, b) => b.abilities.overall - a.abilities.overall);

        const groups = [];
        const groupCount = Math.ceil(students.length / groupSize);

        for (let i = 0; i < groupCount; i++) {
            const group = {
                id: `group-mentor-${i + 1}`,
                name: `第${i + 1}小组`,
                type: 'mentor',
                members: [],
                pairings: [],
                stats: {}
            };

            // 每组配置1个导师（高能力）+ 若干学员
            const mentorIndex = i % sorted.length;
            const mentor = sorted[mentorIndex];

            group.members.push({
                ...mentor,
                role: 'mentor'
            });

            // 选择学员（低能力）
            const learnerCount = groupSize - 1;
            const learnerStartIndex = sorted.length - 1 - (i * learnerCount);

            for (let j = 0; j < learnerCount; j++) {
                const learnerIndex = Math.max(0, learnerStartIndex - j);
                if (learnerIndex !== mentorIndex && sorted[learnerIndex] && !this.isInGroups(sorted[learnerIndex].id, groups)) {
                    const learner = sorted[learnerIndex];
                    group.members.push({
                        ...learner,
                        role: 'learner'
                    });

                    // 配对
                    group.pairings.push({
                        mentor: mentor.id,
                        mentorName: mentor.name,
                        learner: learner.id,
                        learnerName: learner.name,
                        abilityGap: mentor.abilities.overall - learner.abilities.overall,
                        focusAreas: this.identifyFocusAreas(learner)
                    });
                }
            }

            // 计算组统计
            group.stats = this.calculateGroupStats(group);

            if (group.members.length > 1) {
                groups.push(group);
            }
        }

        return groups;
    }

    // 强强联合分组算法
    static generateCollaborativeGroups(students, groupSize = 3) {
        // 按能力排序
        const sorted = [...students].sort((a, b) => b.abilities.overall - a.abilities.overall);

        const groups = [];
        let currentGroup = null;

        sorted.forEach((student, index) => {
            if (index % groupSize === 0) {
                currentGroup = {
                    id: `group-collab-${groups.length + 1}`,
                    name: index < groupSize ? '高级学习组' : index < groupSize * 2 ? '中级学习组' : '基础学习组',
                    type: 'collaborative',
                    members: [],
                    sharedGoals: [],
                    stats: {}
                };
                groups.push(currentGroup);
            }

            currentGroup.members.push({
                ...student,
                role: 'member'
            });
        });

        // 为每组设置共同目标
        groups.forEach((group, index) => {
            const avgAbility = group.members.reduce((sum, m) => sum + m.abilities.overall, 0) / group.members.length;

            if (avgAbility >= 85) {
                group.sharedGoals = ['竞赛准备', '深度学习', '拓展提高'];
            } else if (avgAbility >= 70) {
                group.sharedGoals = ['巩固提升', '典型例题', '同步提高'];
            } else {
                group.sharedGoals = ['基础巩固', '查漏补缺', '稳步提升'];
            }

            group.stats = this.calculateGroupStats(group);
        });

        return groups;
    }

    // 辅助函数：检查学生是否已在组中
    static isInGroups(studentId, groups) {
        return groups.some(group =>
            group.members.some(member => member.id === studentId)
        );
    }

    // 识别学生弱项
    static identifyFocusAreas(student) {
        const areas = [];
        if (student.abilities.algebra < 70) areas.push('代数运算');
        if (student.abilities.geometry < 70) areas.push('几何图形');
        if (student.abilities.analysis < 70) areas.push('逻辑分析');
        return areas.length > 0 ? areas : ['全面提升'];
    }

    // 计算组统计信息
    static calculateGroupStats(group) {
        const abilities = group.members.map(m => m.abilities.overall);
        const avgAbility = abilities.reduce((sum, a) => sum + a, 0) / abilities.length;
        const maxAbility = Math.max(...abilities);
        const minAbility = Math.min(...abilities);

        return {
            avgAbility: Math.round(avgAbility),
            maxAbility,
            minAbility,
            abilityRange: maxAbility - minAbility,
            memberCount: group.members.length,
            compatibilityScore: this.calculateCompatibility(group)
        };
    }

    // 计算匹配度
    static calculateCompatibility(group) {
        // 简化算法：基于能力差距和成员数量
        const { abilityRange, memberCount } = group.stats || { abilityRange: 0, memberCount: 0 };

        if (group.type === 'mentor') {
            // 传帮带：适度差距最好（15-30分）
            const idealGap = 22;
            const gapScore = 1 - Math.abs(abilityRange - idealGap) / 50;
            return Math.max(0.5, Math.min(1, gapScore));
        } else {
            // 强强联合：差距越小越好
            const rangeScore = 1 - (abilityRange / 100);
            return Math.max(0.7, rangeScore);
        }
    }

    // 生成推荐方案
    static generateRecommendations(strategy = 'mentor') {
        const students = MOCK_STUDENTS;

        let groups = [];
        if (strategy === 'mentor') {
            groups = this.generateMentorGroups(students);
        } else if (strategy === 'collaborative') {
            groups = this.generateCollaborativeGroups(students);
        }

        return {
            strategy,
            groups,
            timestamp: new Date().toISOString(),
            totalStudents: students.length,
            groupCount: groups.length
        };
    }
}

export default {
    GROUP_STRATEGIES,
    AIGroupRecommender
};

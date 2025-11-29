// AI学情分析数据
export const AI_LEARNING_ANALYSIS_DATA = {
    // 综合学情分析
    comprehensiveAnalysis: {
        // AI头像和名称
        aiAvatar: '🤖',
        aiName: 'AI学习导师',

        // 整体评价
        overallAssessment: {
            level: 'excellent', // excellent, good, average, needs_improvement
            score: 88,
            summary: '李明同学本周学习表现优秀!你在导数定义这个核心知识点上取得了重大突破,从65%提升到92%,展现出了很强的学习能力和毅力。',
            emoji: '🌟'
        },

        // 学习状态评估
        learningState: {
            status: 'progressive', // progressive, stable, fluctuating, declining
            statusText: '稳步进步',
            description: '学习节奏稳定,正确率持续提升,保持了良好的学习习惯',
            color: 'emerald'
        },

        // 关键发现(3-5个亮点)
        keyFindings: [
            {
                id: 1,
                type: 'strength',
                icon: '💪',
                title: '逻辑推理能力突出',
                content: '在逻辑推理维度得分92分,高于平均水平18%,这是你的核心优势',
                color: 'blue'
            },
            {
                id: 2,
                type: 'progress',
                icon: '📈',
                title: '学习效率显著提升',
                content: '近两周正确率从78%提升到92%,进步速度超过85%的同学',
                color: 'green'
            },
            {
                id: 3,
                type: 'weakness',
                icon: '⚠️',
                title: '计算准确性需加强',
                content: '计算准确性72分,是当前最薄弱环节,建议加强基础计算训练',
                color: 'orange'
            },
            {
                id: 4,
                type: 'habit',
                icon: '🔥',
                title: '学习习惯优秀',
                content: '连续打卡12天,学习时长稳定在每日60-90分钟,习惯养成良好',
                color: 'purple'
            }
        ],

        // 优势分析
        strengths: [
            {
                dimension: '逻辑推理',
                score: 92,
                description: '能够快速理解复杂概念,建立知识间的联系',
                suggestion: '可以尝试更高难度的综合题型'
            },
            {
                dimension: '概念理解',
                score: 85,
                description: '对数学概念的本质理解深刻',
                suggestion: '继续保持深度思考的学习方式'
            },
            {
                dimension: '学习态度',
                score: 95,
                description: '学习积极性高,自主学习能力强',
                suggestion: '可以尝试总结学习方法分享给同学'
            }
        ],

        // 改进建议
        improvements: [
            {
                dimension: '计算准确性',
                currentScore: 72,
                targetScore: 85,
                priority: 'high',
                suggestions: [
                    '每天进行10分钟专项计算训练',
                    '建立错题本,总结易错计算类型',
                    '养成验算习惯,特别是复杂计算'
                ],
                estimatedTime: '2周',
                expectedImprovement: '+13分'
            },
            {
                dimension: '解题速度',
                currentScore: 68,
                targetScore: 80,
                priority: 'medium',
                suggestions: [
                    '熟练掌握常用公式和解题模板',
                    '定时练习,培养时间意识',
                    '学习快速审题技巧'
                ],
                estimatedTime: '3周',
                expectedImprovement: '+12分'
            }
        ],

        // 学习建议(3-5条核心建议)
        recommendations: [
            {
                id: 1,
                priority: 'high',
                icon: '🎯',
                title: '重点突破最值问题',
                reason: '当前掌握度35%,是导数应用的核心知识点',
                actions: [
                    '观看专题视频教程(15分钟)',
                    '完成基础练习10题',
                    '尝试中等难度题目5题'
                ],
                expectedResult: '预计掌握度提升至60%以上',
                timeframe: '本周内完成'
            },
            {
                id: 2,
                priority: 'high',
                icon: '🧮',
                title: '加强计算基本功',
                reason: '计算准确性影响整体做题效率',
                actions: [
                    '每日10分钟计算专项训练',
                    '整理个人易错计算类型',
                    '重点练习导数计算和化简'
                ],
                expectedResult: '计算准确性提升至85分',
                timeframe: '持续2周'
            },
            {
                id: 3,
                priority: 'medium',
                icon: '📚',
                title: '巩固隐函数求导',
                reason: '掌握度45%,需要加强理解',
                actions: [
                    '复习隐函数求导基本原理',
                    '练习典型题目15题',
                    '总结常见题型和解题套路'
                ],
                expectedResult: '掌握度提升至70%',
                timeframe: '3天内完成'
            }
        ],

        // 预测性分析
        prediction: {
            shortTerm: {
                period: '未来1周',
                expectedProgress: 73,
                confidence: 85,
                description: '按照当前学习节奏,预计整体掌握度将达到73%',
                milestones: [
                    '完成导数应用模块',
                    '最值问题掌握度达到60%',
                    '计算准确性提升5分'
                ]
            },
            longTerm: {
                period: '未来1月',
                expectedProgress: 82,
                confidence: 75,
                description: '保持当前学习强度,有望在月底前达到82%的整体掌握度',
                milestones: [
                    '完成微积分基础全部模块',
                    '进入积分学学习',
                    '班级排名进入前10'
                ]
            },
            goalAchievement: {
                goal: '达到90%掌握度',
                estimatedDate: '2025-12-20',
                probability: 78,
                requiredEffort: '需要保持当前学习强度,并额外增加20%练习量'
            }
        },

        // 对比分析
        comparison: {
            vsLastWeek: {
                progressChange: '+5%',
                accuracyChange: '+7%',
                timeChange: '+15分钟',
                trend: 'improving',
                summary: '各项指标全面提升,学习状态持续向好'
            },
            vsClassAverage: {
                progressDiff: '+12%',
                accuracyDiff: '+8%',
                ranking: 15,
                percentile: 88,
                summary: '整体表现优于班级平均水平,位于前12%'
            },
            vsTopStudents: {
                gap: '8%',
                mainDifference: '计算速度和准确性',
                catchUpPlan: '重点提升计算能力,预计4周可缩小差距',
                summary: '与顶尖学生主要差距在计算基本功'
            }
        },

        // 鼓励语
        encouragement: {
            message: '你的进步速度非常快!继续保持这个学习节奏,相信你很快就能达成目标。记住,每一次练习都是在为成功铺路!💪',
            nextMilestone: '下一个目标:整体掌握度突破75%',
            motivationalQuote: '"成功不是偶然,而是每天进步一点点的必然结果。"'
        }
    },

    // 详细维度分析(用于Details页面)
    dimensionAnalysis: {
        // 能力维度深度分析
        abilities: [
            {
                dimension: '概念理解',
                score: 85,
                trend: 'up',
                analysis: '你对数学概念的理解能力很强,能够抓住概念的本质。建议在此基础上,多做一些概念应用题,将理解转化为解题能力。',
                strengths: ['能快速理解新概念', '善于建立概念间联系', '理解深度较好'],
                improvements: ['可以尝试用自己的话解释概念', '多做概念辨析题'],
                resources: ['《概念理解专题》视频课程', '概念应用练习题库']
            },
            {
                dimension: '公式运用',
                score: 78,
                trend: 'up',
                analysis: '公式运用能力中等偏上,但在复杂场景下的公式选择还需加强。建议系统整理常用公式,并多做综合应用题。',
                strengths: ['基本公式掌握牢固', '简单应用熟练'],
                improvements: ['加强公式变形训练', '提高公式选择能力', '练习复杂场景应用'],
                resources: ['公式速查手册', '公式应用专项练习']
            },
            {
                dimension: '逻辑推理',
                score: 92,
                trend: 'stable',
                analysis: '逻辑推理是你的核心优势!推理过程清晰,逻辑严密。可以尝试一些竞赛题或难题,进一步提升这方面的能力。',
                strengths: ['推理过程严密', '逻辑思维清晰', '善于发现规律'],
                improvements: ['可以尝试更复杂的证明题', '学习多种证明方法'],
                resources: ['数学竞赛题库', '逻辑推理进阶课程']
            },
            {
                dimension: '计算准确',
                score: 72,
                trend: 'up',
                analysis: '计算准确性是当前最需要提升的能力。建议每天进行专项计算训练,建立错题本,总结易错点。',
                strengths: ['基础计算掌握'],
                improvements: ['加强复杂计算训练', '养成验算习惯', '提高计算速度'],
                resources: ['计算专项训练营', '易错计算题集']
            },
            {
                dimension: '解题速度',
                score: 68,
                trend: 'up',
                analysis: '解题速度偏慢,主要原因是计算不够熟练和解题思路不够清晰。建议多做限时训练,熟悉常见题型。',
                strengths: ['解题思路基本正确'],
                improvements: ['熟练掌握解题模板', '提高计算速度', '加强限时训练'],
                resources: ['限时训练题库', '解题技巧课程']
            },
            {
                dimension: '创新思维',
                score: 75,
                trend: 'up',
                analysis: '创新思维能力不错,能够尝试多种解题方法。建议多接触一题多解的题目,培养发散思维。',
                strengths: ['愿意尝试不同方法', '思维较为灵活'],
                improvements: ['多做开放性题目', '学习多种解题技巧'],
                resources: ['一题多解专题', '创新思维训练']
            }
        ],

        // 知识点深度分析
        knowledgePoints: {
            mastered: {
                count: 8,
                topics: ['极限定义', '极限运算', '无穷小理论', '连续性', '导数定义', '基本求导', '单调性', '复合函数求导'],
                analysis: '这些知识点掌握扎实,可以作为学习新知识的基础。建议定期复习,保持熟练度。'
            },
            learning: {
                count: 5,
                topics: ['隐函数求导', '高阶导数', '极值问题', '最值问题', '曲线凹凸性'],
                analysis: '这些知识点正在学习中,需要加强练习。建议每个知识点至少完成20道练习题。',
                focusPoints: ['最值问题(35%)', '隐函数求导(45%)']
            },
            weak: {
                count: 2,
                topics: ['最值问题', '曲线凹凸性'],
                analysis: '这是当前的薄弱知识点,需要重点突破。建议先看视频教程理解原理,再进行大量练习。',
                urgency: 'high'
            },
            locked: {
                count: 25,
                nextToUnlock: '积分学',
                unlockCondition: '完成导数应用模块(当前42%)',
                estimatedUnlockDate: '2025-12-05'
            }
        }
    }
};

export default AI_LEARNING_ANALYSIS_DATA;

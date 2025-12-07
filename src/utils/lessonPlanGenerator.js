// AI教案生成引擎 - 重构版
import { KNOWLEDGE_POINTS_LIBRARY } from '../data/knowledge_points_library';
import { KNOWLEDGE_RESOURCE_BINDINGS } from '../data/knowledge_resource_bindings';

/**
 * 生成教案唯一ID
 */
export const generateLessonPlanId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `lp_${timestamp}_${random}`;
};

/**
 * 生成教学目标
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} difficulty - 难度级别
 * @param {String} teachingStyle - 教学风格
 * @param {String} classFormat - 课堂形式
 * @returns {Array} 教学目标数组
 */
export const generateTeachingGoals = (knowledgePoints, difficulty, teachingStyle = 'academic', classFormat = 'lecture') => {
    const goals = [];
    
    // 知识与技能目标
    const knowledgeGoal = {
        type: 'knowledge',
        content: knowledgePoints.map(kp => {
            if (difficulty === 'simple') {
                return `掌握${kp.name}的基本概念和定义`;
            } else if (difficulty === 'medium') {
                return `理解${kp.name}的原理，能够分析和解决相关问题`;
            } else {
                return `深入理解${kp.name}的内涵与外延，能够在实际场景中灵活运用`;
            }
        }).join('；')
    };
    goals.push(knowledgeGoal);
    
    // 过程与方法目标 - 根据教学风格和课堂形式定制
    let processContent = '';
    if (classFormat === 'discussion') {
        processContent = '通过小组讨论和协作学习，培养批判性思维和沟通表达能力';
    } else if (classFormat === 'experiment') {
        processContent = '通过动手实验和实践探索，培养观察分析和动手操作能力';
    } else if (classFormat === 'mixed') {
        processContent = '通过讲授、讨论、实践相结合的方式，培养综合学习能力和问题解决能力';
    } else {
        if (difficulty === 'simple') {
            processContent = '通过教师讲解和示例演示，初步掌握基本学习方法';
        } else if (difficulty === 'medium') {
            processContent = '通过案例分析和练习巩固，形成系统的思维方法和解题策略';
        } else {
            processContent = '通过深度探究和综合应用，培养创新思维和独立研究能力';
        }
    }
    
    const processGoal = {
        type: 'process',
        content: processContent
    };
    goals.push(processGoal);
    
    // 情感态度与价值观目标
    const emotionGoal = {
        type: 'emotion',
        content: '激发对本学科的学习兴趣，培养严谨求实的学习态度，树立终身学习的意识'
    };
    goals.push(emotionGoal);
    
    return goals;
};

/**
 * 分析重难点
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} studentLevel - 学生基础水平
 * @returns {Object} 重难点对象
 */
export const analyzeKeyPoints = (knowledgePoints, studentLevel = 'medium') => {
    const highlights = [];
    const difficulties = [];
    const strategies = [];
    
    knowledgePoints.forEach(kp => {
        // 提取教学重点
        highlights.push(`${kp.name}的核心概念和基本原理`);
        if (kp.tags && kp.tags.length > 0) {
            highlights.push(...kp.tags.slice(0, 2));
        }
        
        // 根据知识点难度和学生水平识别难点
        const isAdvanced = kp.difficulty === 'advanced';
        const isIntermediate = kp.difficulty === 'intermediate';
        const isWeakStudent = studentLevel === 'weak' || studentLevel === 'toAssess';
        
        if (isAdvanced || (isIntermediate && isWeakStudent)) {
            difficulties.push(`${kp.name}的深入理解与灵活应用`);
            
            // 针对性的突破策略
            if (isWeakStudent) {
                strategies.push(`通过基础练习和一对一辅导，帮助学生理解${kp.name}`);
            } else if (isAdvanced) {
                strategies.push(`通过综合案例分析和实践应用，突破${kp.name}的难点`);
            } else {
                strategies.push(`通过典型例题讲解和变式训练，掌握${kp.name}的应用方法`);
            }
        }
    });
    
    return {
        highlights: [...new Set(highlights)].slice(0, 6),
        difficulties: [...new Set(difficulties)].slice(0, 4),
        strategies: [...new Set(strategies)].slice(0, 4)
    };
};

/**
 * 生成教学准备
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} classFormat - 课堂形式
 * @returns {Object} 教学准备对象
 */
export const generatePreparation = (knowledgePoints, classFormat = 'lecture') => {
    const preparation = {
        teacher: [
            '准备PPT教学课件',
            '准备相关知识点的教学视频和案例素材',
            '设计课堂练习题和作业'
        ],
        student: [
            `预习${knowledgePoints.map(kp => kp.name).join('、')}相关内容`,
            '复习前置知识点',
            '准备笔记本和学习工具'
        ],
        environment: [
            '检查多媒体设备是否正常',
            '确保网络连接稳定'
        ]
    };
    
    // 根据课堂形式添加特定准备
    if (classFormat === 'experiment') {
        preparation.teacher.push('准备实验器材和实验指导书');
        preparation.student.push('穿戴实验服和防护装备');
        preparation.environment.push('检查实验室安全设施');
    } else if (classFormat === 'discussion') {
        preparation.teacher.push('准备讨论话题和小组任务单');
        preparation.student.push('分组并明确小组角色分工');
        preparation.environment.push('调整座位布局，便于小组讨论');
    } else if (classFormat === 'mixed') {
        preparation.teacher.push('准备多种教学形式的材料和工具');
        preparation.environment.push('灵活调整教室布局');
    }
    
    return preparation;
};

/**
 * 生成板书设计
 * @param {String} title - 教案标题
 * @param {Array} knowledgePoints - 知识点列表
 * @param {Object} keyPoints - 重难点对象
 * @returns {Object} 板书设计对象
 */
export const generateBoardDesign = (title, knowledgePoints, keyPoints) => {
    const boardDesign = {
        title: title,
        framework: knowledgePoints.map(kp => kp.name),
        keyPoints: keyPoints.highlights.slice(0, 4),
        examples: [
            '示例1：基础概念应用',
            '示例2：典型问题解析'
        ]
    };
    
    return boardDesign;
};

/**
 * 生成作业设计
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} difficulty - 难度级别
 * @returns {Object} 作业设计对象
 */
export const generateHomework = (knowledgePoints, difficulty) => {
    const homework = {
        basic: [],
        extended: [],
        practical: [],
        requirements: '',
        submission: '下次上课前提交，可通过纸质或电子版形式'
    };
    
    // 基础巩固题
    knowledgePoints.forEach((kp, index) => {
        homework.basic.push(`基础题${index + 1}：关于${kp.name}的概念理解题`);
        homework.basic.push(`基础题${index + 2}：关于${kp.name}的简单应用题`);
    });
    
    // 拓展提高题
    if (difficulty === 'medium' || difficulty === 'hard') {
        knowledgePoints.forEach((kp, index) => {
            homework.extended.push(`拓展题${index + 1}：${kp.name}的综合应用问题`);
        });
    }
    
    // 实践应用题
    if (difficulty === 'hard') {
        homework.practical.push('实践题：结合实际场景，设计一个小项目或案例分析');
    }
    
    // 作业要求
    if (difficulty === 'simple') {
        homework.requirements = '按时完成基础题，书写工整，步骤完整';
    } else if (difficulty === 'medium') {
        homework.requirements = '完成基础题和拓展题，注重解题思路的展示，鼓励多种解法';
    } else {
        homework.requirements = '全面完成各类题型，尤其是实践应用题，需要有创新性和批判性思考';
    }
    
    return homework;
};
/**
 * 设计教学流程 (增强版 - 包含教师和学生活动、设计意图)
 * @param {Number} duration - 课时数（分钟）
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} classFormat - 课堂形式
 * @param {String} studentLevel - 学生水平
 * @returns {Array} 教学流程数组
 */
export const designTeachingFlow = (duration, knowledgePoints, classFormat = 'lecture', studentLevel = 'medium') => {
    const flow = [];
    
    // 计算各环节时长
    const introTime = Math.round(duration * 0.1);
    const teachTime = Math.round(duration * 0.45);
    const practiceTime = Math.round(duration * 0.35);
    const summaryTime = duration - introTime - teachTime - practiceTime;
    
    // 导入环节
    flow.push({
        phase: '导入',
        duration: introTime,
        teacherActivities: [
            '通过问题或案例引入课题',
            '激发学生兴趣，明确学习目标'
        ],
        studentActivities: [
            '回顾旧知，思考问题',
            '积极参与课堂互动'
        ],
        designIntent: '通过情境创设激发学习动机，为新课学习做好准备'
    });
    
    // 讲授环节
    const teachActivities = knowledgePoints.map(kp => `讲解${kp.name}的核心概念和原理`);
    const teachStudentActivities = classFormat === 'discussion' 
        ? ['小组讨论知识点', '分享学习心得']
        : classFormat === 'experiment'
        ? ['观察实验演示', '动手操作实验']
        : ['认真听讲，做好笔记', '积极提问和回答问题'];
    
    flow.push({
        phase: '讲授',
        duration: teachTime,
        teacherActivities: [
            ...teachActivities,
            '结合示例进行讲解',
            '引导学生理解和掌握'
        ],
        studentActivities: teachStudentActivities,
        designIntent: '通过系统讲解和示范，帮助学生构建知识体系'
    });
    
    // 练习环节
    const practiceActivities = studentLevel === 'weak'
        ? ['完成基础练习题', '小组互相讨论和帮助']
        : studentLevel === 'excellent'
        ? ['完成综合练习题', '独立探索和解决问题']
        : ['完成课堂练习', '小组讨论交流'];
    
    flow.push({
        phase: '练习',
        duration: practiceTime,
        teacherActivities: [
            '布置课堂练习题',
            '巡视指导，及时纠错',
            '选取典型问题进行讲解'
        ],
        studentActivities: practiceActivities,
        designIntent: '通过及时练习巩固所学知识，及时发现和解决问题'
    });
    
    // 总结环节
    flow.push({
        phase: '总结',
        duration: summaryTime,
        teacherActivities: [
            '引导学生总结本节课重点',
            '布置课后作业',
            '预告下节课内容'
        ],
        studentActivities: [
            '总结本节课所学内容',
            '记录作业要求',
            '提出疑问和建议'
        ],
        designIntent: '帮助学生梳理知识体系，延伸学习内容'
    });
    
    return flow;
};

/**
 * 设计课堂活动 (增强版 - 添加预期效果)
 * @param {Array} knowledgePoints - 知识点列表
 * @param {String} teachingStyle - 教学风格
 * @param {String} classFormat - 课堂形式
 * @returns {Array} 课堂活动数组
 */
export const designClassActivities = (knowledgePoints, teachingStyle = 'academic', classFormat = 'lecture') => {
    const activities = [];
    const kpCount = knowledgePoints.length;
    
    // 根据知识点数量和课堂形式确定活动数量
    const activityCount = classFormat === 'mixed' 
        ? (kpCount <= 2 ? 2 : 3)
        : (kpCount <= 2 ? 1 : kpCount <= 5 ? 2 : 3);
    
    for (let i = 0; i < activityCount; i++) {
        let activity = {};
        
        // 根据教学风格和课堂形式设计活动
        if (classFormat === 'experiment' || teachingStyle === 'visual') {
            activity = {
                type: '实验演示',
                steps: [
                    '明确实验目的和步骤',
                    '分组准备实验材料',
                    '执行实验并记录数据',
                    '观察分析实验现象',
                    '总结实验结论并汇报'
                ],
                time: 18,
                expectedOutcome: '学生能够通过实验加深对知识点的理解，提高动手能力'
            };
        } else if (classFormat === 'discussion' || teachingStyle === 'academic') {
            activity = {
                type: '小组讨论',
                steps: [
                    '分组并明确讨论主题',
                    '小组内部讨论交流',
                    '整理总结小组观点',
                    '各组代表分享成果',
                    '教师点评和总结升华'
                ],
                time: 15,
                expectedOutcome: '学生能够通过讨论培养批判性思维，提高表达和协作能力'
            };
        } else if (teachingStyle === 'logical') {
            activity = {
                type: '逻辑推理',
                steps: [
                    '提出需要解决的问题',
                    '分析问题的关键要素',
                    '运用知识进行逻辑推导',
                    '得出结论并验证',
                    '总结推理过程和方法'
                ],
                time: 12,
                expectedOutcome: '学生能够掌握逻辑推理方法，培养理性思维能力'
            };
        } else {
            // 混合式或默认活动
            activity = {
                type: '案例分析',
                steps: [
                    '阅读和理解案例背景',
                    '分析案例中的问题',
                    '运用所学知识提出解决方案',
                    '小组讨论和完善方案',
                    '展示和评价各组方案'
                ],
                time: 14,
                expectedOutcome: '学生能够将知识应用于实际问题，提高问题解决能力'
            };
        }
        
        activities.push(activity);
    }
    
    return activities;
};

/**
 * 整理教学资源
 * @param {Array} knowledgePointIds - 知识点ID列表
 * @returns {Array} 教学资源数组
 */
export const organizeResources = (knowledgePointIds) => {
    const resources = [];
    
    // KNOWLEDGE_RESOURCE_BINDINGS 是对象不是数组，需要根据知识点ID查找
    knowledgePointIds.forEach(kpId => {
        // 从KNOWLEDGE_RESOURCE_BINDINGS对象中获取资源ID数组
        const resourceIds = KNOWLEDGE_RESOURCE_BINDINGS[kpId] || [];
        
        resourceIds.forEach((resourceId, index) => {
            resources.push({
                type: index % 3 === 0 ? 'video' : index % 3 === 1 ? 'practice' : 'reading',
                name: `${kpId}相关资源${index + 1}`,
                url: `#resource-${resourceId}`,
                description: `知识点${kpId}的辅助学习资源`
            });
        });
    });
    
    // 如果没有绑定资源，添加默认资源
    if (resources.length === 0) {
        resources.push(
            { type: 'video', name: '教学视频', url: '#', description: '知识点讲解视频' },
            { type: 'practice', name: '练习题集', url: '#', description: '配套练习题' },
            { type: 'reading', name: '参考资料', url: '#', description: '扩展阅读材料' }
        );
    }
    
    return resources;
};

/**
 * 设计评估方案 (增强版 - 添加反馈机制)
 * @param {String} difficulty - 难度级别
 * @returns {Object} 评估方案对象
 */
export const designAssessment = (difficulty) => {
    return {
        methods: ['课堂问答', '练习测验', '小组评价', '作业批改'],
        criteria: {
            excellent: difficulty === 'simple' ? '75分以上，正确率高85%' : difficulty === 'medium' ? '85分以上，理解深刻' : '90分以上，能灵活运用',
            good: difficulty === 'simple' ? '60-75分，正确率高70%' : difficulty === 'medium' ? '70-85分，基本掌握' : '80-90分，较好掌握',
            needImprovement: difficulty === 'simple' ? '60分以下，需要加强练习' : difficulty === 'medium' ? '70分以下，需要补强' : '80分以下，需要重点辅导'
        },
        feedbackMechanism: '及时批改作业并反馈，对学习困难的学生进行个别辅导，鼓励学生相互帮助和讨论',
        feedback: [
            '及时批改作业并反馈',
            '针对性辅导薄弱环节',
            '鼓励学生自主学习'
        ]
    };
};

/**
 * 生成富文本内容 (重构版 - 包含11个模块)
 * @param {Object} lessonPlan - 教案对象
 * @returns {String} HTML格式的富文本内容
 */
export const generateHTMLContent = (lessonPlan) => {
    let html = '';
    
    // 1. 基本信息
    html += '<h2>一、基本信息</h2>';
    html += '<table style="width:100%; border-collapse:collapse; margin-bottom:20px;">';
    html += '<tr><td style="padding:8px; border:1px solid #ddd; width:25%;"><strong>教案标题</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.title + '</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>课程名称</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.courseName + '</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>授课教师</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.metadata.author + '</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>授课班级</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.basicInfo.className + '</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>学生人数</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.metadata.studentCount + '人</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>课时安排</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.metadata.duration + '分钟</td></tr>';
    html += '<tr><td style="padding:8px; border:1px solid #ddd;"><strong>授课日期</strong></td><td style="padding:8px; border:1px solid #ddd;">' + lessonPlan.basicInfo.teachingDate + '</td></tr>';
    html += '</table>';
    
    // 2. 教学目标
    if (lessonPlan.teachingGoals) {
        html += '<h2>二、教学目标</h2>';
        lessonPlan.teachingGoals.forEach((goal, idx) => {
            const typeMap = { knowledge: '知识与技能', process: '过程与方法', emotion: '情感态度与价值观' };
            html += `<p><strong>${idx + 1}. ${typeMap[goal.type] || '目标'}</strong>：${goal.content}</p>`;
        });
    }
    
    // 3. 教学重难点
    if (lessonPlan.keyPoints) {
        html += '<h2>三、教学重难点</h2>';
        html += '<h3>教学重点</h3>';
        html += '<ul>';
        lessonPlan.keyPoints.highlights.forEach(h => {
            html += `<li>${h}</li>`;
        });
        html += '</ul>';
        
        html += '<h3>教学难点</h3>';
        html += '<ul>';
        lessonPlan.keyPoints.difficulties.forEach(d => {
            html += `<li>${d}</li>`;
        });
        html += '</ul>';
        
        if (lessonPlan.keyPoints.strategies && lessonPlan.keyPoints.strategies.length > 0) {
            html += '<h3>突破策略</h3>';
            html += '<ul>';
            lessonPlan.keyPoints.strategies.forEach(s => {
                html += `<li>${s}</li>`;
            });
            html += '</ul>';
        }
    }
    
    // 4. 教学准备
    if (lessonPlan.preparation) {
        html += '<h2>四、教学准备</h2>';
        html += '<h3>教师准备</h3>';
        html += '<ul>';
        lessonPlan.preparation.teacher.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        
        html += '<h3>学生准备</h3>';
        html += '<ul>';
        lessonPlan.preparation.student.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        
        html += '<h3>环境准备</h3>';
        html += '<ul>';
        lessonPlan.preparation.environment.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    // 5. 教学过程设计
    if (lessonPlan.teachingFlow) {
        html += '<h2>五、教学过程设计</h2>';
        lessonPlan.teachingFlow.forEach((phase, idx) => {
        html += `<h3>环节${idx + 1}：${phase.phase}（${phase.duration}分钟）</h3>`;
        
        if (phase.teacherActivities && phase.teacherActivities.length > 0) {
            html += '<p><strong>教师活动：</strong></p><ul>';
            phase.teacherActivities.forEach(activity => {
                html += `<li>${activity}</li>`;
            });
            html += '</ul>';
        }
        
        if (phase.studentActivities && phase.studentActivities.length > 0) {
            html += '<p><strong>学生活动：</strong></p><ul>';
            phase.studentActivities.forEach(activity => {
                html += `<li>${activity}</li>`;
            });
            html += '</ul>';
        }
        
        if (phase.designIntent) {
            html += `<p><strong>设计意图：</strong>${phase.designIntent}</p>`;
        }
        
        // 向后兼容旧版本
        if (phase.activities && phase.activities.length > 0 && !phase.teacherActivities) {
            html += '<ul>';
            phase.activities.forEach(activity => {
                html += `<li>${activity}</li>`;
            });
            html += '</ul>';
        }
    });
    }
    
    // 6. 课堂活动设计
    if (lessonPlan.activities && lessonPlan.activities.length > 0) {
        html += '<h2>六、课堂活动设计</h2>';
        lessonPlan.activities.forEach((activity, idx) => {
            html += `<h3>活动${idx + 1}：${activity.type}（${activity.time}分钟）</h3>`;
            html += '<p><strong>活动步骤：</strong></p><ul>';
            activity.steps.forEach(step => {
                html += `<li>${step}</li>`;
            });
            html += '</ul>';
            if (activity.expectedOutcome) {
                html += `<p><strong>预期效果：</strong>${activity.expectedOutcome}</p>`;
            }
        });
    }
    
    // 7. 板书设计
    if (lessonPlan.boardDesign) {
        html += '<h2>七、板书设计</h2>';
        html += `<p><strong>主标题：</strong>${lessonPlan.boardDesign.title}</p>`;
        
        if (lessonPlan.boardDesign.framework && lessonPlan.boardDesign.framework.length > 0) {
            html += '<p><strong>知识框架：</strong></p><ul>';
            lessonPlan.boardDesign.framework.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (lessonPlan.boardDesign.keyPoints && lessonPlan.boardDesign.keyPoints.length > 0) {
            html += '<p><strong>重点标注：</strong></p><ul>';
            lessonPlan.boardDesign.keyPoints.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (lessonPlan.boardDesign.examples && lessonPlan.boardDesign.examples.length > 0) {
            html += '<p><strong>示例展示：</strong></p><ul>';
            lessonPlan.boardDesign.examples.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
    }
    
    // 8. 教学资源
    if (lessonPlan.resources) {
        html += '<h2>八、教学资源</h2>';
        html += '<ul>';
        lessonPlan.resources.forEach(resource => {
            html += `<li><strong>${resource.name}</strong>（${resource.type}）：${resource.description}</li>`;
        });
        html += '</ul>';
    }
    
    // 9. 作业设计
    if (lessonPlan.homework) {
        html += '<h2>九、作业设计</h2>';
        
        if (lessonPlan.homework.basic && lessonPlan.homework.basic.length > 0) {
            html += '<h3>基础巩固题</h3><ul>';
            lessonPlan.homework.basic.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (lessonPlan.homework.extended && lessonPlan.homework.extended.length > 0) {
            html += '<h3>拓展提高题</h3><ul>';
            lessonPlan.homework.extended.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (lessonPlan.homework.practical && lessonPlan.homework.practical.length > 0) {
            html += '<h3>实践应用题</h3><ul>';
            lessonPlan.homework.practical.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (lessonPlan.homework.requirements) {
            html += `<p><strong>作业要求：</strong>${lessonPlan.homework.requirements}</p>`;
        }
        
        if (lessonPlan.homework.submission) {
            html += `<p><strong>提交方式：</strong>${lessonPlan.homework.submission}</p>`;
        }
    }
    
    // 10. 教学评估
    if (lessonPlan.assessment) {
        html += '<h2>十、教学评估</h2>';
        html += '<p><strong>评估方式：</strong>' + lessonPlan.assessment.methods.join('、') + '</p>';
        html += '<p><strong>评估标准：</strong></p>';
        html += '<ul>';
        html += `<li>优秀：${lessonPlan.assessment.criteria.excellent}</li>`;
        html += `<li>良好：${lessonPlan.assessment.criteria.good}</li>`;
        html += `<li>需改进：${lessonPlan.assessment.criteria.needImprovement}</li>`;
        html += '</ul>';
        
        if (lessonPlan.assessment.feedbackMechanism) {
            html += `<p><strong>反馈机制：</strong>${lessonPlan.assessment.feedbackMechanism}</p>`;
        }
    }
    
    // 11. 教学反思
    if (lessonPlan.reflection) {
        html += '<h2>十一、教学反思</h2>';
        html += '<p><em>（请在授课后填写）</em></p>';
        html += '<p><strong>教学效果评价：</strong></p>';
        html += '<p style="min-height:60px; border:1px solid #ddd; padding:10px; background:#f9f9f9;"></p>';
        html += '<p><strong>学生反馈记录：</strong></p>';
        html += '<p style="min-height:60px; border:1px solid #ddd; padding:10px; background:#f9f9f9;"></p>';
        html += '<p><strong>改进建议：</strong></p>';
        html += '<p style="min-height:60px; border:1px solid #ddd; padding:10px; background:#f9f9f9;"></p>';
    }
    
    return html;
};

/**
 * AI教案生成主函数 (重构版 - 包含11个核心模块)
 * @param {Object} params - 生成参数
 * @returns {Object} 完整的教案对象
 */
export const generateLessonPlan = (params) => {
    const {
        courseId,
        courseName,
        title,
        author,
        studentCount,
        duration = 45,
        knowledgePointIds = [],
        difficulty = 'medium',
        teachingStyle = 'academic',
        classFormat = 'lecture',
        studentLevel = 'medium',
        className = '',
        teachingDate = null,
        pathId = null,
        // 新增参数
        gradeLevel = 'high_school',
        subject = 'mathematics',
        textbook = 'renmin',
        toneStyle = 'standard',
        detailLevel = 'moderate',
        enabledModules = ['basicInfo', 'teachingGoals', 'teachingFlow', 'keyPoints', 'homework'],
        moduleConfigs = {},
        createMethod = 'standard',
        templateId = null
    } = params;
    
    // 获取知识点详情
    const knowledgePoints = knowledgePointIds.map(id => 
        KNOWLEDGE_POINTS_LIBRARY.find(kp => kp.id === id)
    ).filter(Boolean);
    
    if (knowledgePoints.length === 0) {
        throw new Error('至少需要选择一个知识点');
    }
    
    // 根据启用的模块生成对应内容
    const teachingGoals = enabledModules.includes('teachingGoals') 
        ? generateTeachingGoals(knowledgePoints, difficulty, teachingStyle, classFormat, gradeLevel)
        : null;
    
    const keyPoints = enabledModules.includes('keyPoints')
        ? analyzeKeyPoints(knowledgePoints, studentLevel)
        : null;
    
    const preparation = enabledModules.includes('preparation')
        ? generatePreparation(knowledgePoints, classFormat)
        : null;
    
    const teachingFlow = enabledModules.includes('teachingFlow')
        ? designTeachingFlow(duration, knowledgePoints, classFormat, studentLevel)
        : null;
    
    const activities = enabledModules.includes('activities')
        ? designClassActivities(knowledgePoints, teachingStyle, classFormat)
        : null;
    
    const boardDesign = enabledModules.includes('boardDesign')
        ? generateBoardDesign(title, knowledgePoints, keyPoints || { highlights: [] })
        : null;
    
    const resources = enabledModules.includes('resources')
        ? organizeResources(knowledgePointIds)
        : null;
    
    const homework = enabledModules.includes('homework')
        ? generateHomework(knowledgePoints, difficulty)
        : null;
    
    const assessment = enabledModules.includes('assessment')
        ? designAssessment(difficulty)
        : null;
    
    const reflection = enabledModules.includes('reflection')
        ? { effectiveness: '', studentFeedback: '', improvements: '' }
        : null;
    
    // 组装教案对象 - 包含11个核心模块
    const lessonPlan = {
        id: generateLessonPlanId(),
        courseId,
        courseName,
        title,
        version: 1,
        status: 'draft',
        
        // 元数据信息
        metadata: {
            author,
            studentCount,
            duration,
            difficulty,
            teachingStyle,
            classFormat,
            studentLevel,
            pathId,
            // 新增元数据
            gradeLevel,
            subject,
            textbook,
            toneStyle,
            detailLevel,
            enabledModules,
            moduleConfigs,
            createMethod,
            templateId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: null
        },
        
        // 1. 基本信息
        basicInfo: {
            className: className || `${courseName}班`,
            teachingDate: teachingDate || new Date().toISOString().split('T')[0]
        },
        
        knowledgePointIds,
        
        // 2. 教学目标
        teachingGoals,
        
        // 3. 教学重难点
        keyPoints,
        
        // 4. 教学准备
        preparation,
        
        // 5. 教学过程设计
        teachingFlow,
        
        // 6. 课堂活动设计
        activities,
        
        // 7. 板书设计
        boardDesign,
        
        // 8. 教学资源
        resources,
        
        // 9. 作业设计
        homework,
        
        // 10. 教学评估
        assessment,
        
        // 11. 教学反思预留
        reflection,
        
        // 完整HTML内容(用于预览和编辑)
        content: ''
    };
    
    // 生成HTML内容
    lessonPlan.content = generateHTMLContent(lessonPlan);
    
    return lessonPlan;
};

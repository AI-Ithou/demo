/**
 * 章节知识库配置
 * 按学段、学科、教材版本组织的章节数据
 */

/**
 * 章节数据结构示例
 * {
 *   chapterId: 唯一标识
 *   number: 章节编号
 *   title: 章节标题
 *   knowledgePoints: 关联知识点ID列表
 *   difficulty: 推荐难度
 *   estimatedHours: 预计课时
 *   teachingAdvice: 教学建议
 *   resources: 推荐资源
 * }
 */

// 高中数学 - 人教版
export const HIGH_SCHOOL_MATH_RENMIN = {
    id: 'high_school_math_renmin',
    gradeLevel: 'high_school',
    subject: 'mathematics',
    textbook: 'renmin',
    label: '高中数学（人教版）',
    chapters: [
        {
            chapterId: 'hsm_r_c1',
            number: '第一章',
            title: '集合与常用逻辑用语',
            sections: [
                {
                    sectionId: 'hsm_r_c1_s1',
                    number: '1.1',
                    title: '集合的概念',
                    knowledgePoints: ['k1'],
                    difficulty: 'simple',
                    estimatedHours: 2,
                    teachingAdvice: '强调集合的基本概念，通过实例帮助学生理解元素与集合的关系',
                    resources: ['视频：集合的概念', '练习：集合基础题']
                },
                {
                    sectionId: 'hsm_r_c1_s2',
                    number: '1.2',
                    title: '集合间的基本关系',
                    knowledgePoints: ['k1'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '重点讲解子集、真子集、集合相等的概念',
                    resources: ['课件：集合关系', '习题：集合运算']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c2',
            number: '第二章',
            title: '一元二次函数、方程和不等式',
            sections: [
                {
                    sectionId: 'hsm_r_c2_s1',
                    number: '2.1',
                    title: '等式性质与不等式性质',
                    knowledgePoints: ['k2', 'k5'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '通过数轴和图像直观展示不等式性质',
                    resources: ['动画：不等式性质', '练习题']
                },
                {
                    sectionId: 'hsm_r_c2_s2',
                    number: '2.2',
                    title: '基本不等式',
                    knowledgePoints: ['k5'],
                    difficulty: 'medium',
                    estimatedHours: 3,
                    teachingAdvice: '重点讲解基本不等式的应用和证明方法',
                    resources: ['例题讲解', '拓展阅读']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c3',
            number: '第三章',
            title: '函数的概念与性质',
            sections: [
                {
                    sectionId: 'hsm_r_c3_s1',
                    number: '3.1',
                    title: '函数的概念及其表示',
                    knowledgePoints: ['k1', 'k8'],
                    difficulty: 'medium',
                    estimatedHours: 3,
                    teachingAdvice: '强调函数三要素：定义域、值域、对应关系',
                    resources: ['课件：函数概念', '互动练习']
                },
                {
                    sectionId: 'hsm_r_c3_s2',
                    number: '3.2',
                    title: '函数的基本性质',
                    knowledgePoints: ['k8'],
                    difficulty: 'hard',
                    estimatedHours: 4,
                    teachingAdvice: '重点讲解单调性、奇偶性、周期性',
                    resources: ['图像演示', '综合练习']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c4',
            number: '第四章',
            title: '指数函数与对数函数',
            sections: [
                {
                    sectionId: 'hsm_r_c4_s1',
                    number: '4.1',
                    title: '指数函数',
                    knowledgePoints: ['k8'],
                    difficulty: 'medium',
                    estimatedHours: 3,
                    teachingAdvice: '通过实际问题引入指数函数的应用',
                    resources: ['视频教学', '应用案例']
                },
                {
                    sectionId: 'hsm_r_c4_s2',
                    number: '4.2',
                    title: '对数函数',
                    knowledgePoints: ['k8'],
                    difficulty: 'hard',
                    estimatedHours: 3,
                    teachingAdvice: '对比指数函数与对数函数的关系',
                    resources: ['对比图表', '例题精讲']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c5',
            number: '第五章',
            title: '三角函数',
            sections: [
                {
                    sectionId: 'hsm_r_c5_s1',
                    number: '5.1',
                    title: '任意角和弧度制',
                    knowledgePoints: ['k6'],
                    difficulty: 'simple',
                    estimatedHours: 2,
                    teachingAdvice: '强调角度制与弧度制的转换',
                    resources: ['动画演示', '转换练习']
                },
                {
                    sectionId: 'hsm_r_c5_s2',
                    number: '5.2',
                    title: '三角函数的图像与性质',
                    knowledgePoints: ['k6'],
                    difficulty: 'hard',
                    estimatedHours: 4,
                    teachingAdvice: '通过图像变换理解三角函数性质',
                    resources: ['交互图像', '综合练习']
                },
                {
                    sectionId: 'hsm_r_c5_s3',
                    number: '5.3',
                    title: '三角恒等变换',
                    knowledgePoints: ['k16'],
                    difficulty: 'hard',
                    estimatedHours: 3,
                    teachingAdvice: '重点讲解和差角公式、二倍角公式',
                    resources: ['公式推导', '应用题库']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c6',
            number: '第六章',
            title: '平面向量及其应用',
            sections: [
                {
                    sectionId: 'hsm_r_c6_s1',
                    number: '6.1',
                    title: '平面向量的概念',
                    knowledgePoints: ['k3'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '通过物理中的位移、力等实例引入向量',
                    resources: ['物理应用案例', '概念练习']
                },
                {
                    sectionId: 'hsm_r_c6_s2',
                    number: '6.2',
                    title: '平面向量的运算',
                    knowledgePoints: ['k3'],
                    difficulty: 'hard',
                    estimatedHours: 4,
                    teachingAdvice: '强调向量加减法、数量积的几何意义',
                    resources: ['几何画板', '运算练习']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c7',
            number: '第七章',
            title: '复数',
            sections: [
                {
                    sectionId: 'hsm_r_c7_s1',
                    number: '7.1',
                    title: '复数的概念',
                    knowledgePoints: ['k8'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '从方程无解引入复数的必要性',
                    resources: ['历史背景', '概念讲解']
                }
            ]
        },
        {
            chapterId: 'hsm_r_c8',
            number: '第八章',
            title: '立体几何初步',
            sections: [
                {
                    sectionId: 'hsm_r_c8_s1',
                    number: '8.1',
                    title: '空间几何体',
                    knowledgePoints: ['k9'],
                    difficulty: 'medium',
                    estimatedHours: 3,
                    teachingAdvice: '利用模型帮助学生建立空间观念',
                    resources: ['3D模型', '空间想象训练']
                },
                {
                    sectionId: 'hsm_r_c8_s2',
                    number: '8.2',
                    title: '空间点、直线、平面之间的位置关系',
                    knowledgePoints: ['k9'],
                    difficulty: 'hard',
                    estimatedHours: 4,
                    teachingAdvice: '重点讲解平行与垂直的判定和性质',
                    resources: ['定理证明', '综合应用']
                }
            ]
        }
    ]
};

// 大学建筑材料 - 自编教材
export const UNIVERSITY_ARCHITECTURE_CUSTOM = {
    id: 'university_architecture_custom',
    gradeLevel: 'university',
    subject: 'architecture',
    textbook: 'custom',
    label: '建筑材料与构造',
    chapters: [
        {
            chapterId: 'uac_c1',
            number: '第一章',
            title: '建筑材料的基本性质',
            sections: [
                {
                    sectionId: 'uac_c1_s1',
                    number: '1.1',
                    title: '材料的物理性质',
                    knowledgePoints: ['k4'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '结合实际材料样品进行讲解',
                    resources: ['材料样品', '实验视频']
                },
                {
                    sectionId: 'uac_c1_s2',
                    number: '1.2',
                    title: '材料的力学性质',
                    knowledgePoints: ['k4'],
                    difficulty: 'hard',
                    estimatedHours: 3,
                    teachingAdvice: '通过实验演示材料的强度、刚度',
                    resources: ['力学实验', '数据分析']
                }
            ]
        },
        {
            chapterId: 'uac_c2',
            number: '第二章',
            title: '混凝土',
            sections: [
                {
                    sectionId: 'uac_c2_s1',
                    number: '2.1',
                    title: '混凝土的组成材料',
                    knowledgePoints: ['k10'],
                    difficulty: 'medium',
                    estimatedHours: 2,
                    teachingAdvice: '讲解水泥、骨料、外加剂的作用',
                    resources: ['材料展示', '配比案例']
                },
                {
                    sectionId: 'uac_c2_s2',
                    number: '2.2',
                    title: '混凝土的性能',
                    knowledgePoints: ['k10'],
                    difficulty: 'hard',
                    estimatedHours: 4,
                    teachingAdvice: '重点讲解工作性、强度、耐久性',
                    resources: ['性能测试', '工程案例']
                }
            ]
        },
        {
            chapterId: 'uac_c3',
            number: '第三章',
            title: '砌体材料',
            sections: [
                {
                    sectionId: 'uac_c3_s1',
                    number: '3.1',
                    title: '砖和砌块',
                    knowledgePoints: ['k4'],
                    difficulty: 'simple',
                    estimatedHours: 2,
                    teachingAdvice: '介绍各类砖和砌块的特点',
                    resources: ['实物样品', '应用场景']
                }
            ]
        },
        {
            chapterId: 'uac_c4',
            number: '第四章',
            title: '钢材',
            sections: [
                {
                    sectionId: 'uac_c4_s1',
                    number: '4.1',
                    title: '建筑钢材的性能',
                    knowledgePoints: ['k4'],
                    difficulty: 'hard',
                    estimatedHours: 3,
                    teachingAdvice: '强调钢材的力学性能和工艺性能',
                    resources: ['钢材标准', '性能测试']
                }
            ]
        }
    ]
};

// 章节库索引
export const CHAPTER_LIBRARY = {
    high_school_math_renmin: HIGH_SCHOOL_MATH_RENMIN,
    university_architecture_custom: UNIVERSITY_ARCHITECTURE_CUSTOM
};

/**
 * 根据学段、学科、教材版本获取章节数据
 */
export const getChapterData = (gradeLevel, subject, textbook) => {
    const key = `${gradeLevel}_${subject}_${textbook}`;
    return CHAPTER_LIBRARY[key] || null;
};

/**
 * 根据章节ID获取章节信息
 */
export const getChapterById = (chapterId) => {
    for (const chapterSet of Object.values(CHAPTER_LIBRARY)) {
        const chapter = chapterSet.chapters.find(c => c.chapterId === chapterId);
        if (chapter) {
            return chapter;
        }
        
        for (const ch of chapterSet.chapters) {
            if (ch.sections) {
                const section = ch.sections.find(s => s.sectionId === chapterId);
                if (section) {
                    return section;
                }
            }
        }
    }
    return null;
};

/**
 * 获取所有可用的教材组合
 */
export const getAvailableTextbooks = () => {
    return Object.values(CHAPTER_LIBRARY).map(lib => ({
        id: lib.id,
        gradeLevel: lib.gradeLevel,
        subject: lib.subject,
        textbook: lib.textbook,
        label: lib.label
    }));
};

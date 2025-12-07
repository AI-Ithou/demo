// Word和PPT文档导出工具
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle } from 'docx';
import pptxgen from 'pptxgenjs';
import { saveAs } from 'file-saver';

/**
 * PPT模板配置
 */
export const PPT_TEMPLATES = {
    classic: {
        id: 'classic',
        name: '经典商务',
        colors: {
            primary: '2E5090',
            secondary: '4472C4',
            accent: '70AD47',
            text: '333333',
            background: 'FFFFFF'
        },
        fonts: {
            title: { face: '微软雅黑', size: 44, bold: true, color: '2E5090' },
            subtitle: { face: '微软雅黑', size: 28, color: '4472C4' },
            body: { face: '微软雅黑', size: 20, color: '333333' }
        }
    },
    modern: {
        id: 'modern',
        name: '现代简约',
        colors: {
            primary: '6366F1',
            secondary: '8B5CF6',
            accent: 'EC4899',
            text: '1F2937',
            background: 'F9FAFB'
        },
        fonts: {
            title: { face: '微软雅黑', size: 44, bold: true, color: '6366F1' },
            subtitle: { face: '微软雅黑', size: 28, color: '8B5CF6' },
            body: { face: '微软雅黑', size: 20, color: '1F2937' }
        }
    },
    academic: {
        id: 'academic',
        name: '学术风格',
        colors: {
            primary: '374151',
            secondary: '6B7280',
            accent: '9CA3AF',
            text: '111827',
            background: 'FFFFFF'
        },
        fonts: {
            title: { face: '宋体', size: 44, bold: true, color: '374151' },
            subtitle: { face: '宋体', size: 28, color: '6B7280' },
            body: { face: '宋体', size: 20, color: '111827' }
        }
    },
    vibrant: {
        id: 'vibrant',
        name: '活力青春',
        colors: {
            primary: 'F59E0B',
            secondary: 'EF4444',
            accent: '10B981',
            text: '1F2937',
            background: 'FEF3C7'
        },
        fonts: {
            title: { face: '微软雅黑', size: 44, bold: true, color: 'F59E0B' },
            subtitle: { face: '微软雅黑', size: 28, color: 'EF4444' },
            body: { face: '微软雅黑', size: 20, color: '1F2937' }
        }
    },
    tech: {
        id: 'tech',
        name: '科技未来',
        colors: {
            primary: '7C3AED',
            secondary: '3B82F6',
            accent: '06B6D4',
            text: '0F172A',
            background: 'E0E7FF'
        },
        fonts: {
            title: { face: '微软雅黑', size: 44, bold: true, color: '7C3AED' },
            subtitle: { face: '微软雅黑', size: 28, color: '3B82F6' },
            body: { face: '微软雅黑', size: 20, color: '0F172A' }
        }
    }
};

/**
 * 导出Word文档
 * @param {Object} lessonPlan - 教案数据
 * @returns {Promise} 导出Promise
 */
export const exportToWord = async (lessonPlan) => {
    try {
        if (!lessonPlan || !lessonPlan.metadata) {
            throw new Error('教案数据不完整');
        }

        const sections = [];
        
        // 封面页
        const coverPage = {
            properties: {
                page: {
                    margin: {
                        top: 1440,
                        right: 1440,
                        bottom: 1440,
                        left: 1440
                    }
                }
            },
            children: [
                new Paragraph({
                    text: lessonPlan.title || '未命名教案',
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 2000, after: 1000 }
                }),
                new Paragraph({
                    text: `课程：${lessonPlan.courseName || ''}`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    text: `授课教师：${lessonPlan.metadata?.author || ''}`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    text: `课时：${lessonPlan.metadata?.duration || 45}分钟`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    text: `版本：V${lessonPlan.version || 1}`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    text: new Date(lessonPlan.metadata?.createdAt || Date.now()).toLocaleDateString('zh-CN'),
                    alignment: AlignmentType.CENTER
                })
            ]
        };
        sections.push(coverPage);
        
        // 基本信息
        if (lessonPlan.basicInfo) {
            const basicInfoSection = {
                children: [
                    new Paragraph({  
                        text: '一、基本信息',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    }),
                    new Paragraph({
                        text: `授课班级：${lessonPlan.basicInfo.className || ''}`,
                        spacing: { before: 100 }
                    }),
                    new Paragraph({
                        text: `学生人数：${lessonPlan.metadata.studentCount || ''}人`,
                        spacing: { before: 100 }
                    }),
                    new Paragraph({
                        text: `授课日期：${lessonPlan.basicInfo.teachingDate || ''}`,
                        spacing: { before: 100 }
                    })
                ]
            };
            sections.push(basicInfoSection);
        }
        
        // 教学目标
        const goalsSection = {
            children: [
                new Paragraph({
                    text: '二、教学目标',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                })
            ]
        };
        
        if (lessonPlan.teachingGoals && lessonPlan.teachingGoals.length > 0) {
            lessonPlan.teachingGoals.forEach((goal, idx) => {
                const typeMap = { knowledge: '知识与技能', process: '过程与方法', emotion: '情感态度与价值观' };
                goalsSection.children.push(
                    new Paragraph({
                        spacing: { before: 200, after: 100 },
                        children: [
                            new TextRun({
                                text: `${idx + 1}. ${typeMap[goal.type] || '目标'}：${goal.content || ''}`,
                                font: '宋体'
                            })
                        ]
                    })
                );
            });
        }
        sections.push(goalsSection);
        
        // 教学重难点
        const keyPointsSection = {
            children: [
                new Paragraph({
                    text: '三、教学重难点',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                }),
                new Paragraph({
                    text: '教学重点：',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 }
                })
            ]
        };
        
        lessonPlan.keyPoints.highlights.forEach(h => {
            keyPointsSection.children.push(
                new Paragraph({
                    text: `• ${h}`,
                    spacing: { before: 100 }
                })
            );
        });
        
        keyPointsSection.children.push(
            new Paragraph({
                text: '教学难点：',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 }
            })
        );
        
        lessonPlan.keyPoints.difficulties.forEach(d => {
            keyPointsSection.children.push(
                new Paragraph({
                    text: `• ${d}`,
                    spacing: { before: 100 }
                })
            );
        });
        
        sections.push(keyPointsSection);
        
        // 教学准备
        if (lessonPlan.preparation) {
            const prepSection = {
                children: [
                    new Paragraph({
                        text: '四、教学准备',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    }),
                    new Paragraph({
                        text: '教师准备：',
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    })
                ]
            };
            
            lessonPlan.preparation.teacher.forEach(item => {
                prepSection.children.push(
                    new Paragraph({
                        text: `• ${item}`,
                        spacing: { before: 100 }
                    })
                );
            });
            
            prepSection.children.push(
                new Paragraph({
                    text: '学生准备：',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 }
                })
            );
            
            lessonPlan.preparation.student.forEach(item => {
                prepSection.children.push(
                    new Paragraph({
                        text: `• ${item}`,
                        spacing: { before: 100 }
                    })
                );
            });
            
            prepSection.children.push(
                new Paragraph({
                    text: '环境准备：',
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 }
                })
            );
            
            lessonPlan.preparation.environment.forEach(item => {
                prepSection.children.push(
                    new Paragraph({
                        text: `• ${item}`,
                        spacing: { before: 100 }
                    })
                );
            });
            
            sections.push(prepSection);
        }
        
        // 教学流程
        const flowSection = {
            children: [
                new Paragraph({
                    text: '五、教学流程',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                })
            ]
        };
        
        lessonPlan.teachingFlow.forEach((phase, idx) => {
            flowSection.children.push(
                new Paragraph({
                    text: `环节${idx + 1}：${phase.phase}（${phase.duration}分钟）`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 }
                })
            );
            
            phase.activities.forEach(activity => {
                flowSection.children.push(
                    new Paragraph({
                        text: `• ${activity}`,
                        spacing: { before: 100 }
                    })
                );
            });
        });
        
        sections.push(flowSection);
        
        // 课堂活动
        if (lessonPlan.activities && lessonPlan.activities.length > 0) {
            const activitiesSection = {
                children: [
                    new Paragraph({
                        text: '四、课堂活动设计',
                        heading: HeadingLevel.HEADING_1,
                        spacing: { before: 400, after: 200 }
                    })
                ]
            };
            
            lessonPlan.activities.forEach((activity, idx) => {
                activitiesSection.children.push(
                    new Paragraph({
                        text: `活动${idx + 1}：${activity.type}（${activity.time}分钟）`,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    })
                );
                
                activity.steps.forEach((step, stepIdx) => {
                    activitiesSection.children.push(
                        new Paragraph({
                            text: `${stepIdx + 1}. ${step}`,
                            spacing: { before: 100 }
                        })
                    );
                });
            });
            
            sections.push(activitiesSection);
        }
        
        // 教学资源
        const resourcesSection = {
            children: [
                new Paragraph({
                    text: '五、教学资源',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                })
            ]
        };
        
        lessonPlan.resources.forEach(resource => {
            resourcesSection.children.push(
                new Paragraph({
                    text: `• ${resource.name}（${resource.type}）：${resource.description}`,
                    spacing: { before: 100 }
                })
            );
        });
        
        sections.push(resourcesSection);
        
        // 评估方案
        const assessmentSection = {
            children: [
                new Paragraph({
                    text: '六、评估与反馈',
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                }),
                new Paragraph({
                    text: `评估方式：${lessonPlan.assessment.methods.join('、')}`,
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    text: '评估标准：',
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    text: `• 优秀：${lessonPlan.assessment.criteria.excellent}`,
                    spacing: { before: 100 }
                }),
                new Paragraph({
                    text: `• 良好：${lessonPlan.assessment.criteria.good}`,
                    spacing: { before: 100 }
                }),
                new Paragraph({
                    text: `• 需改进：${lessonPlan.assessment.criteria.needImprovement}`,
                    spacing: { before: 100 }
                })
            ]
        };
        
        sections.push(assessmentSection);
        
        // 创建文档
        const doc = new Document({
            sections: sections,
            creator: lessonPlan.metadata?.author || 'AI教案生成系统',
            title: lessonPlan.title || '教案',
            description: '由AI教案生成系统自动生成'
        });
        
        // 生成并下载
        const blob = await Packer.toBlob(doc);
        const fileName = `${lessonPlan.title || '教案'}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.docx`;
        saveAs(blob, fileName);
        
        return { success: true, fileName };
    } catch (error) {
        console.error('Word导出失败:', error);
        return { success: false, error: error.message };
    }
};

/**
 * 导出PPT文档
 * @param {Object} lessonPlan - 教案数据
 * @param {String} templateId - 模板ID
 * @returns {Promise} 导出Promise
 */
export const exportToPPT = async (lessonPlan, templateId = 'classic') => {
    try {
        const template = PPT_TEMPLATES[templateId] || PPT_TEMPLATES.classic;
        const pres = new pptxgen();
        
        // 设置布局
        pres.layout = 'LAYOUT_16x9';
        pres.author = lessonPlan.metadata.author;
        pres.title = lessonPlan.title;
        
        // 标题页
        let slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText(lessonPlan.title, {
            x: 0.5,
            y: 2,
            w: 9,
            h: 1.5,
            fontSize: template.fonts.title.size,
            bold: template.fonts.title.bold,
            color: template.fonts.title.color,
            align: 'center',
            fontFace: template.fonts.title.face
        });
        slide.addText(`${lessonPlan.courseName}`, {
            x: 0.5,
            y: 3.8,
            w: 9,
            h: 0.5,
            fontSize: 24,
            color: template.fonts.subtitle.color,
            align: 'center',
            fontFace: template.fonts.subtitle.face
        });
        slide.addText(`授课教师：${lessonPlan.metadata.author}`, {
            x: 0.5,
            y: 4.5,
            w: 9,
            h: 0.4,
            fontSize: 18,
            color: template.fonts.body.color,
            align: 'center'
        });
        
        // 目录页
        slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText('目录', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: template.fonts.title.size,
            bold: true,
            color: template.fonts.title.color,
            fontFace: template.fonts.title.face
        });
        
        const tocItems = [
            '1. 教学目标',
            '2. 教学重难点',
            '3. 教学流程',
            '4. 课堂活动',
            '5. 教学资源',
            '6. 评估方案'
        ];
        
        slide.addText(tocItems.join('\n'), {
            x: 1.5,
            y: 2,
            w: 7,
            h: 3,
            fontSize: 24,
            color: template.fonts.body.color,
            lineSpacing: 40
        });
        
        // 教学目标页
        slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText('教学目标', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: template.fonts.subtitle.size,
            bold: true,
            color: template.fonts.subtitle.color,
            fontFace: template.fonts.subtitle.face
        });
        
        const goalsText = lessonPlan.teachingGoals.map((goal, idx) => {
            const typeMap = { knowledge: '知识与技能', process: '过程与方法', emotion: '情感态度与价值观' };
            return `${idx + 1}. ${typeMap[goal.type]}：${goal.content}`;
        }).join('\n\n');
        
        slide.addText(goalsText, {
            x: 0.8,
            y: 1.5,
            w: 8.4,
            h: 4,
            fontSize: 18,
            color: template.fonts.body.color,
            lineSpacing: 30
        });
        
        // 重难点页
        slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText('教学重难点', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: template.fonts.subtitle.size,
            bold: true,
            color: template.fonts.subtitle.color,
            fontFace: template.fonts.subtitle.face
        });
        
        slide.addText('教学重点', {
            x: 0.8,
            y: 1.5,
            w: 8,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: template.colors.primary
        });
        
        slide.addText(lessonPlan.keyPoints.highlights.map(h => `• ${h}`).join('\n'), {
            x: 1.2,
            y: 2.1,
            w: 7.6,
            h: 1.5,
            fontSize: 16,
            color: template.fonts.body.color,
            lineSpacing: 28
        });
        
        slide.addText('教学难点', {
            x: 0.8,
            y: 3.8,
            w: 8,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: template.colors.secondary
        });
        
        slide.addText(lessonPlan.keyPoints.difficulties.map(d => `• ${d}`).join('\n'), {
            x: 1.2,
            y: 4.4,
            w: 7.6,
            h: 1.5,
            fontSize: 16,
            color: template.fonts.body.color,
            lineSpacing: 28
        });
        
        // 教学流程页
        lessonPlan.teachingFlow.forEach((phase, idx) => {
            slide = pres.addSlide();
            slide.background = { color: template.colors.background };
            slide.addText(`教学流程 - ${phase.phase}`, {
                x: 0.5,
                y: 0.5,
                w: 9,
                h: 0.8,
                fontSize: template.fonts.subtitle.size,
                bold: true,
                color: template.fonts.subtitle.color,
                fontFace: template.fonts.subtitle.face
            });
            
            slide.addText(`时长：${phase.duration}分钟`, {
                x: 0.8,
                y: 1.5,
                w: 8,
                h: 0.4,
                fontSize: 18,
                color: template.colors.accent
            });
            
            slide.addText(phase.activities.map(a => `• ${a}`).join('\n'), {
                x: 0.8,
                y: 2.2,
                w: 8.4,
                h: 3.5,
                fontSize: 18,
                color: template.fonts.body.color,
                lineSpacing: 32
            });
        });
        
        // 课堂活动页
        if (lessonPlan.activities && lessonPlan.activities.length > 0) {
            lessonPlan.activities.forEach((activity, idx) => {
                slide = pres.addSlide();
                slide.background = { color: template.colors.background };
                slide.addText(`课堂活动${idx + 1}：${activity.type}`, {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 0.8,
                    fontSize: template.fonts.subtitle.size,
                    bold: true,
                    color: template.fonts.subtitle.color,
                    fontFace: template.fonts.subtitle.face
                });
                
                slide.addText(`活动时长：${activity.time}分钟`, {
                    x: 0.8,
                    y: 1.5,
                    w: 8,
                    h: 0.4,
                    fontSize: 18,
                    color: template.colors.accent
                });
                
                slide.addText(activity.steps.map((s, si) => `${si + 1}. ${s}`).join('\n'), {
                    x: 0.8,
                    y: 2.2,
                    w: 8.4,
                    h: 3.5,
                    fontSize: 18,
                    color: template.fonts.body.color,
                    lineSpacing: 32
                });
            });
        }
        
        // 教学资源页
        slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText('教学资源', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: template.fonts.subtitle.size,
            bold: true,
            color: template.fonts.subtitle.color,
            fontFace: template.fonts.subtitle.face
        });
        
        const resourcesText = lessonPlan.resources.map(r => 
            `• ${r.name}（${r.type}）\n  ${r.description}`
        ).join('\n\n');
        
        slide.addText(resourcesText, {
            x: 0.8,
            y: 1.5,
            w: 8.4,
            h: 4,
            fontSize: 16,
            color: template.fonts.body.color,
            lineSpacing: 28
        });
        
        // 评估方案页
        slide = pres.addSlide();
        slide.background = { color: template.colors.background };
        slide.addText('评估与反馈', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: template.fonts.subtitle.size,
            bold: true,
            color: template.fonts.subtitle.color,
            fontFace: template.fonts.subtitle.face
        });
        
        const assessmentText = `评估方式：${lessonPlan.assessment.methods.join('、')}

评估标准：
• 优秀：${lessonPlan.assessment.criteria.excellent}
• 良好：${lessonPlan.assessment.criteria.good}
• 需改进：${lessonPlan.assessment.criteria.needImprovement}`;
        
        slide.addText(assessmentText, {
            x: 0.8,
            y: 1.5,
            w: 8.4,
            h: 4,
            fontSize: 18,
            color: template.fonts.body.color,
            lineSpacing: 32
        });
        
        // 生成并下载 - 使用write方法替代writeFile以兼容浏览器
        const pptxBlob = await pres.write({ outputType: 'blob' });
        const fileName = `${lessonPlan.title || '教案'}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.pptx`;
        saveAs(pptxBlob, fileName);
        
        return { success: true, fileName };
    } catch (error) {
        console.error('PPT导出失败:', error);
        return { success: false, error: error.message };
    }
};

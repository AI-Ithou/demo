/**
 * AI解析工具模块
 * 提供标题解析、文本提取等AI辅助功能
 */

import { KNOWLEDGE_POINTS_LIBRARY } from '../data/knowledge_points_library';
import { GRADE_LEVELS, SUBJECTS } from '../data/lesson_plan_config';

/**
 * 标题解析器
 * 从教案标题中智能提取学段、学科、难度、知识点等信息
 */
export const parseTitleToConfig = (title) => {
    if (!title || title.trim().length === 0) {
        throw new Error('标题不能为空');
    }

    const result = {
        title,
        gradeLevel: null,
        subject: null,
        difficulty: 'medium',
        knowledgePointIds: [],
        confidence: {
            gradeLevel: 0,
            subject: 0,
            difficulty: 0,
            knowledgePoints: 0
        }
    };

    const gradeLevelMatch = identifyGradeLevel(title);
    if (gradeLevelMatch) {
        result.gradeLevel = gradeLevelMatch.id;
        result.confidence.gradeLevel = gradeLevelMatch.confidence;
    }

    const subjectMatch = identifySubject(title);
    if (subjectMatch) {
        result.subject = subjectMatch.id;
        result.confidence.subject = subjectMatch.confidence;
    }

    const difficultyMatch = identifyDifficulty(title);
    if (difficultyMatch) {
        result.difficulty = difficultyMatch.level;
        result.confidence.difficulty = difficultyMatch.confidence;
    }

    const knowledgePointMatches = matchKnowledgePoints(title, result.subject);
    if (knowledgePointMatches.length > 0) {
        result.knowledgePointIds = knowledgePointMatches.map(m => m.id);
        result.confidence.knowledgePoints = 
            knowledgePointMatches.reduce((sum, m) => sum + m.confidence, 0) / knowledgePointMatches.length;
    }

    return result;
};

const identifyGradeLevel = (title) => {
    const patterns = [
        { keywords: ['小学', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], id: 'primary', confidence: 0.95 },
        { keywords: ['初中', '初一', '初二', '初三', '七年级', '八年级', '九年级'], id: 'junior', confidence: 0.95 },
        { keywords: ['高中', '高一', '高二', '高三'], id: 'high_school', confidence: 0.95 },
        { keywords: ['大学', '本科', '研究生', '硕士', '博士'], id: 'university', confidence: 0.95 },
        { keywords: ['职业', '培训', '成人', '职教'], id: 'vocational', confidence: 0.85 }
    ];

    for (const pattern of patterns) {
        for (const keyword of pattern.keywords) {
            if (title.includes(keyword)) {
                return { id: pattern.id, confidence: pattern.confidence };
            }
        }
    }

    return null;
};

const identifySubject = (title) => {
    const patterns = [
        { keywords: ['数学', '代数', '几何', '微积分', '函数', '方程'], id: 'mathematics', confidence: 0.9 },
        { keywords: ['物理', '力学', '电磁', '光学', '热学'], id: 'physics', confidence: 0.9 },
        { keywords: ['化学', '有机', '无机', '化学反应', '元素'], id: 'chemistry', confidence: 0.9 },
        { keywords: ['生物', '细胞', '遗传', '生态', '进化'], id: 'biology', confidence: 0.9 },
        { keywords: ['建筑', '材料', '构造', '结构', '施工', '混凝土', '钢筋'], id: 'architecture', confidence: 0.9 },
        { keywords: ['计算机', '编程', 'Python', 'Java', '算法', '数据结构'], id: 'computer_science', confidence: 0.9 },
        { keywords: ['语文', '文学', '写作', '阅读', '古诗'], id: 'chinese', confidence: 0.9 },
        { keywords: ['英语', 'English', '英文', '语法', '单词'], id: 'english', confidence: 0.9 },
        { keywords: ['历史', '中国历史', '世界历史', '古代', '近代'], id: 'history', confidence: 0.9 },
        { keywords: ['地理', '地图', '气候', '地形', '自然'], id: 'geography', confidence: 0.9 },
        { keywords: ['政治', '思想', '哲学', '法律', '政治学'], id: 'politics', confidence: 0.9 },
        { keywords: ['艺术', '美术', '绘画', '音乐', '舞蹈'], id: 'arts', confidence: 0.85 }
    ];

    for (const pattern of patterns) {
        for (const keyword of pattern.keywords) {
            if (title.includes(keyword)) {
                return { id: pattern.id, confidence: pattern.confidence };
            }
        }
    }

    return null;
};

const identifyDifficulty = (title) => {
    const patterns = {
        simple: { keywords: ['基础', '入门', '初步', '简单', '认识', '了解'], confidence: 0.85 },
        medium: { keywords: ['理解', '掌握', '应用', '综合'], confidence: 0.75 },
        hard: { keywords: ['高级', '进阶', '深入', '拓展', '探究', '综合应用'], confidence: 0.85 }
    };

    for (const [level, pattern] of Object.entries(patterns)) {
        for (const keyword of pattern.keywords) {
            if (title.includes(keyword)) {
                return { level, confidence: pattern.confidence };
            }
        }
    }

    return { level: 'medium', confidence: 0.5 };
};

const matchKnowledgePoints = (title, subjectId = null) => {
    const matches = [];
    
    for (const kp of KNOWLEDGE_POINTS_LIBRARY) {
        let score = 0;
        
        if (title.includes(kp.name)) {
            score += 1.0;
        }
        
        for (const tag of kp.tags) {
            if (title.includes(tag)) {
                score += 0.5;
            }
        }
        
        const descKeywords = extractKeywords(kp.description);
        for (const keyword of descKeywords) {
            if (title.includes(keyword) && keyword.length >= 2) {
                score += 0.3;
            }
        }
        
        if (score > 0) {
            matches.push({
                id: kp.id,
                name: kp.name,
                confidence: Math.min(score, 1.0),
                score
            });
        }
    }
    
    return matches.sort((a, b) => b.score - a.score).slice(0, 5);
};

export const extractConfigFromText = (text) => {
    if (!text || text.trim().length === 0) {
        throw new Error('文本不能为空');
    }

    const result = {
        courseName: null,
        title: null,
        className: null,
        duration: 45,
        gradeLevel: null,
        subject: null,
        difficulty: 'medium',
        teachingStyle: 'academic',
        classFormat: 'lecture',
        studentLevel: 'medium',
        knowledgePointIds: [],
        textSummary: text.substring(0, 200) + (text.length > 200 ? '...' : '')
    };

    const courseNameMatch = text.match(/(?:课程|科目)[：:]\s*([^\n。，]+)/);
    if (courseNameMatch) {
        result.courseName = courseNameMatch[1].trim();
    }

    const titleMatch = text.match(/(?:标题|题目|主题|课题)[：:]\s*([^\n。，]+)/);
    if (titleMatch) {
        result.title = titleMatch[1].trim();
    } else {
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        if (lines.length > 0 && lines[0].length < 50) {
            result.title = lines[0].trim();
        }
    }

    const classMatch = text.match(/(?:班级|年级)[：:]\s*([^\n。，]+)/);
    if (classMatch) {
        result.className = classMatch[1].trim();
    }

    const durationMatch = text.match(/(\d+)\s*(?:分钟|课时|min)/);
    if (durationMatch) {
        result.duration = parseInt(durationMatch[1]);
    }

    const gradeLevelMatch = identifyGradeLevel(text);
    if (gradeLevelMatch) {
        result.gradeLevel = gradeLevelMatch.id;
    }

    const subjectMatch = identifySubject(text);
    if (subjectMatch) {
        result.subject = subjectMatch.id;
    }

    const difficultyMatch = identifyDifficulty(text);
    result.difficulty = difficultyMatch.level;

    const activityPatterns = {
        experiment: ['实验', '动手', '操作', '演示'],
        discussion: ['讨论', '交流', '辩论', '分组'],
        lecture: ['讲授', '讲解', '介绍', '说明'],
        mixed: ['综合', '多样', '结合']
    };

    for (const [format, keywords] of Object.entries(activityPatterns)) {
        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                result.classFormat = format;
                break;
            }
        }
    }

    const knowledgePointMatches = matchKnowledgePoints(text, result.subject);
    if (knowledgePointMatches.length > 0) {
        result.knowledgePointIds = knowledgePointMatches.map(m => m.id);
    }

    return result;
};

export const parseChapterInfo = (chapterId, chapterTitle, chapterData) => {
    return {
        chapterId,
        title: chapterTitle,
        knowledgePointIds: chapterData.knowledgePoints || [],
        difficulty: chapterData.difficulty || 'medium',
        estimatedHours: chapterData.estimatedHours || 2,
        teachingAdvice: chapterData.teachingAdvice || '',
        resources: chapterData.resources || []
    };
};

const extractKeywords = (text) => {
    const stopWords = ['的', '是', '和', '在', '了', '有', '等', '及', '与', '以', '为', '对', '从', '到'];
    return text.split(/[，。、；！？\s]+/).filter(w => w.length >= 2 && !stopWords.includes(w)).slice(0, 10);
};

export const generateTitleSuggestions = (config) => {
    const suggestions = [];
    const { gradeLevel, subject, knowledgePointIds } = config;

    const gradeLevelLabel = gradeLevel ? GRADE_LEVELS.find(g => g.id === gradeLevel)?.label : '';
    const subjectLabel = subject ? SUBJECTS.find(s => s.id === subject)?.label : '';
    const knowledgePoints = knowledgePointIds.map(id => KNOWLEDGE_POINTS_LIBRARY.find(kp => kp.id === id)).filter(kp => kp).slice(0, 2);

    if (gradeLevelLabel && subjectLabel && knowledgePoints.length > 0) {
        suggestions.push(`${gradeLevelLabel}${subjectLabel}：${knowledgePoints[0].name}`);
        suggestions.push(`${knowledgePoints[0].name}教学设计`);
        suggestions.push(`${subjectLabel}${knowledgePoints[0].name}教案`);
    }

    if (knowledgePoints.length >= 2) {
        suggestions.push(`${knowledgePoints[0].name}与${knowledgePoints[1].name}`);
    }

    return suggestions.slice(0, 5);
};

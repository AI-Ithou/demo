import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle, Loader, Download, FileText, X, Lightbulb, Presentation, Save, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GradientButton } from '../components/uiverse';
import { KNOWLEDGE_POINTS_LIBRARY, KNOWLEDGE_CATEGORIES } from '../data/knowledge_points_library';
import { GRADE_LEVELS, SUBJECTS, TEXTBOOK_VERSIONS, TONE_STYLES, DETAIL_LEVELS, LESSON_MODULES, MODULE_PRESETS } from '../data/lesson_plan_config';
import { getChapterData, getAvailableTextbooks } from '../data/chapter_library';
import { parseTitleToConfig, extractConfigFromText, generateTitleSuggestions } from '../utils/aiParser';
import { generateLessonPlan } from '../utils/lessonPlanGenerator';
import { saveLessonPlan } from '../utils/lessonPlanStorage';
import { exportToWord, exportToPPT, PPT_TEMPLATES } from '../utils/documentExporter';
import { createTemplate, saveTemplate } from '../utils/templateManager';
import { message, Tag } from 'antd';

const LessonPlanCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [showPPTOutline, setShowPPTOutline] = useState(false);
    const [isGeneratingPPT, setIsGeneratingPPT] = useState(false);
    const [pptOutline, setPptOutline] = useState([]);
    const [showTemplateSaveDialog, setShowTemplateSaveDialog] = useState(false);

    // 从模板页面传递的数据
    useEffect(() => {
        if (location.state?.formData) {
            setFormData(prevData => ({
                ...prevData,
                ...location.state.formData
            }));
            message.success('已应用模板配置');
        }
    }, [location.state]);

    // 表单数据
    const [formData, setFormData] = useState({
        courseId: searchParams.get('courseId') || 'course_001',
        courseName: '建筑材料与构造',
        title: '',
        author: '王睿',
        studentCount: 30,
        duration: 45,
        knowledgePointIds: [],
        difficulty: 'medium',
        teachingStyle: 'academic',
        classFormat: 'lecture',      // 课堂形式
        studentLevel: 'medium',       // 学生水平
        className: '',                // 班级
        teachingDate: new Date().toISOString().split('T')[0], // 授课日期
        pathId: searchParams.get('pathId') || null,
        // 新增参数
        gradeLevel: 'high_school',    // 学段
        subject: 'mathematics',       // 学科
        textbook: 'renmin',           // 教材版本
        toneStyle: 'standard',        // 语气风格
        detailLevel: 'moderate',      // 详细程度
        enabledModules: ['basicInfo', 'teachingGoals', 'teachingFlow', 'keyPoints', 'homework'], // 启用模块
        moduleConfigs: {},            // 模块配置
        createMethod: 'standard',     // 创建方式
        templateId: null              // 应用的模板ID
    });

    const [searchKP, setSearchKP] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showModuleSelector, setShowModuleSelector] = useState(false);

    // 创建方式状态
    const [createMethod, setCreateMethod] = useState('standard'); // standard/title/text/chapter
    const [titleInput, setTitleInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [aiParsing, setAiParsing] = useState(false);
    const [parseResult, setParseResult] = useState(null);

    const steps = [
        { id: 1, title: '基础配置', desc: '填写课程和教案基本信息' },
        { id: 2, title: '智能配置', desc: '选择知识点和教学参数' },
        { id: 3, title: 'AI生成与编辑', desc: '生成教案并在线编辑' }
    ];

    const difficulties = [
        { id: 'simple', label: '简单', desc: '适合基础薄弱的学生', color: 'green' },
        { id: 'medium', label: '中等', desc: '适合有一定基础的学生', color: 'blue' },
        { id: 'hard', label: '困难', desc: '适合基础扎实的学生', color: 'red' }
    ];

    const teachingStyles = [
        { id: 'visual', label: '视觉型', desc: '侧重演示和实验', icon: '👁️' },
        { id: 'academic', label: '学术型', desc: '侧重讨论和练习', icon: '📚' },
        { id: 'logical', label: '逻辑型', desc: '侧重推理和分析', icon: '🧠' }
    ];

    // 新增: 课堂形式
    const classFormats = [
        { id: 'lecture', label: '讲授式', desc: '以教师讲解为主', icon: '📚' },
        { id: 'discussion', label: '讨论式', desc: '以小组讨论为主', icon: '💬' },
        { id: 'experiment', label: '实验式', desc: '以动手实验为主', icon: '🧪' },
        { id: 'mixed', label: '混合式', desc: '多种形式结合', icon: '🎯' }
    ];

    // 新增: 学生水平
    const studentLevels = [
        { id: 'toAssess', label: '待评估', desc: '尚未进行评估' },
        { id: 'weak', label: '薄弱', desc: '基础知识掌握不牢' },
        { id: 'medium', label: '中等', desc: '基础知识较好' },
        { id: 'good', label: '良好', desc: '基础知识扎实' },
        { id: 'excellent', label: '优秀', desc: '基础知识非常扎实' }
    ];

    const filteredKPs = KNOWLEDGE_POINTS_LIBRARY.filter(kp => {
        const matchSearch = searchKP === '' || kp.name.includes(searchKP) || kp.tags.some(tag => tag.includes(searchKP));
        const matchCategory = categoryFilter === 'all' || kp.difficulty === categoryFilter;
        return matchSearch && matchCategory;
    });

    const handleNext = () => {
        if (currentStep === 1 && !formData.title.trim()) {
            message.error('请输入教案标题');
            return;
        }
        if (currentStep === 2 && formData.knowledgePointIds.length === 0) {
            message.error('请至少选择一个知识点');
            return;
        }
        if (currentStep === 2) {
            // 步骤2完成后直接生成
            handleGenerate();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleKPToggle = (kpId) => {
        setFormData(prev => ({
            ...prev,
            knowledgePointIds: prev.knowledgePointIds.includes(kpId)
                ? prev.knowledgePointIds.filter(id => id !== kpId)
                : [...prev.knowledgePointIds, kpId]
        }));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setCurrentStep(3);

        // 模拟生成过程
        setTimeout(() => {
            try {
                const plan = generateLessonPlan(formData);
                setGeneratedPlan(plan);
                setIsGenerating(false);
                message.success('教案生成成功！');
            } catch (error) {
                message.error({
                    content: `生成失败：${error.message}`,
                    duration: 5
                });
                console.error('教案生成错误:', error);
                setIsGenerating(false);
                setCurrentStep(2);
            }
        }, 2000);
    };

    const handleSave = () => {
        try {
            saveLessonPlan(generatedPlan);
            message.success({
                content: '教案保存成功！',
                duration: 2,
                onClose: () => navigate('/teacher/lesson-plans')
            });
        } catch (error) {
            message.error(`保存失败：${error.message || '未知错误'}`);
            console.error('保存教案错误:', error);
        }
    };

    // 保存为模板
    const handleSaveAsTemplate = () => {
        setShowTemplateSaveDialog(true);
    };

    // 确认保存模板
    const handleConfirmSaveTemplate = (templateData) => {
        try {
            // 确定模板类型
            const hasOutline = formData.knowledgePointIds.length > 0;
            const hasContent = generatedPlan !== null;
            const type = hasContent ? 'mixed' : hasOutline ? 'outline' : 'parameter';

            // 提取配置
            const config = {
                gradeLevel: formData.gradeLevel,
                subject: formData.subject,
                textbook: formData.textbook,
                toneStyle: formData.toneStyle,
                detailLevel: formData.detailLevel,
                enabledModules: formData.enabledModules,
                moduleConfigs: formData.moduleConfigs,
                difficulty: formData.difficulty,
                teachingStyle: formData.teachingStyle,
                classFormat: formData.classFormat,
                studentLevel: formData.studentLevel,
                knowledgePointIds: formData.knowledgePointIds
            };

            // 创建模板
            const template = createTemplate(
                templateData.name,
                type,
                config,
                {
                    category: templateData.category,
                    description: templateData.description,
                    author: formData.author,
                    tags: templateData.tags || []
                }
            );

            // 保存模板
            saveTemplate(template);
            message.success('模板保存成功！');
            setShowTemplateSaveDialog(false);
        } catch (error) {
            message.error(error.message || '保存模板失败');
        }
    };

    const handleEdit = () => {
        navigate(`/teacher/lesson-plans/edit/${generatedPlan.id}`);
    };

    const handleExportWord = async () => {
        if (!generatedPlan) return;

        setIsExporting(true);
        setShowExportMenu(false);
        message.loading('正在生成Word文档...');

        try {
            const result = await exportToWord(generatedPlan);
            if (result.success) {
                message.success(`Word文档导出成功！文件名：${result.fileName}`);
            } else {
                message.error('导出失败：' + result.error);
            }
        } catch (error) {
            message.error('导出失败：' + error.message);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportPPT = async () => {
        if (!generatedPlan) return;

        setIsExporting(true);
        setShowExportMenu(false);
        message.loading('正在生成PPT文档...');

        try {
            const result = await exportToPPT(generatedPlan, 'classic');
            if (result.success) {
                message.success(`PPT文档导出成功！文件名：${result.fileName}`);
            } else {
                message.error('导出失败：' + result.error);
            }
        } catch (error) {
            message.error('导出失败：' + error.message);
        } finally {
            setIsExporting(false);
        }
    };

    // 生成PPT大纲
    const handleGeneratePPTOutline = () => {
        if (!generatedPlan) return;

        setIsGeneratingPPT(true);
        message.loading('AI正在分析教案并生成PPT大纲...');

        // 模拟AI生成过程
        setTimeout(() => {
            // 基于教案内容生成PPT大纲
            const outline = generatePPTOutlineFromLesson(generatedPlan);
            setPptOutline(outline);
            setShowPPTOutline(true);
            setIsGeneratingPPT(false);
            message.success('PPT大纲生成成功！');
        }, 2000);
    };

    // 从教案生成PPT大纲
    const generatePPTOutlineFromLesson = (lesson) => {
        const slides = [];
        let slideNumber = 1;

        // 封面页
        slides.push({
            slide: slideNumber++,
            type: 'cover',
            title: lesson.title,
            subtitle: lesson.courseName,
            notes: '开场白：介绍本节课的主题和学习目标'
        });

        // 目录页
        const tocContent = [];
        if (lesson.teachingGoals) tocContent.push('1. 教学目标');
        if (lesson.keyPoints) tocContent.push('2. 教学重难点');
        if (lesson.teachingFlow) tocContent.push('3. 教学流程');
        if (lesson.resources) tocContent.push('4. 教学资源');

        slides.push({
            slide: slideNumber++,
            type: 'content',
            title: '目录',
            content: tocContent,
            notes: '概述本节课的主要内容结构'
        });

        // 教学目标页
        if (lesson.teachingGoals && lesson.teachingGoals.length > 0) {
            const goalContent = lesson.teachingGoals.map(g => {
                const typeMap = { knowledge: '知识与技能', process: '过程与方法', emotion: '情感态度与价值观' };
                return `${typeMap[g.type] || '目标'}：${g.content}`;
            });
            slides.push({
                slide: slideNumber++,
                type: 'content',
                title: '教学目标',
                content: goalContent,
                notes: '重点讲解：本节课的核心学习目标'
            });
        }

        // 教学重难点页
        if (lesson.keyPoints) {
            slides.push({
                slide: slideNumber++,
                type: 'content',
                title: '教学重点',
                content: lesson.keyPoints.highlights || [],
                notes: '强调学生需要掌握的核心知识点'
            });

            slides.push({
                slide: slideNumber++,
                type: 'content',
                title: '教学难点',
                content: lesson.keyPoints.difficulties || [],
                notes: '提前准备应对策略，帮助学生克服困难'
            });
        }

        // 教学流程页
        if (lesson.teachingFlow && lesson.teachingFlow.length > 0) {
            lesson.teachingFlow.forEach((phase, idx) => {
                slides.push({
                    slide: slideNumber++,
                    type: 'content',
                    title: `${phase.phase}（${phase.duration}分钟）`,
                    content: phase.activities || [],
                    notes: `教学建议：注意时间控制，关注学生反馈`
                });
            });
        }

        // 互动环节
        slides.push({
            slide: slideNumber++,
            type: 'interactive',
            title: '互动环节：思考与讨论',
            content: [
                '结合本节课内容，思考实际应用',
                '小组讨论，分享学习心得'
            ],
            notes: '引导学生讨论，培养思维能力'
        });

        // 课堂小结
        if (lesson.keyPoints) {
            slides.push({
                slide: slideNumber++,
                type: 'summary',
                title: '课堂小结',
                content: [
                    '回顾本节课重点内容',
                    ...lesson.keyPoints.highlights.slice(0, 3)
                ],
                notes: '总结本节课重点内容，加深印象'
            });
        }

        // 课后作业
        slides.push({
            slide: slideNumber++,
            type: 'homework',
            title: '课后作业',
            content: [
                '1. 完成课后练习题',
                '2. 预习下节课内容',
                '3. 拓展阅读相关资料'
            ],
            notes: '布置作业，预告下节课内容'
        });

        return slides;
    };

    // 打开模板管理
    const handleOpenTemplates = () => {
        navigate('/teacher/templates');
    };

    // 标题创建 - AI解析
    const handleTitleParse = async () => {
        if (!titleInput.trim()) {
            message.error('请输入教案标题');
            return;
        }

        setAiParsing(true);
        message.loading('AI正在解析标题...');

        setTimeout(() => {
            try {
                const result = parseTitleToConfig(titleInput);
                setParseResult(result);

                // 应用解析结果
                setFormData(prev => ({
                    ...prev,
                    title: result.title,
                    gradeLevel: result.gradeLevel || prev.gradeLevel,
                    subject: result.subject || prev.subject,
                    difficulty: result.difficulty,
                    knowledgePointIds: result.knowledgePointIds
                }));

                message.success(`AI解析完成！识别到 ${result.knowledgePointIds.length} 个知识点`);
                setAiParsing(false);
            } catch (error) {
                message.error('解析失败：' + error.message);
                setAiParsing(false);
            }
        }, 1500);
    };

    // 文本创建 - AI提取
    const handleTextExtract = async () => {
        if (!textInput.trim()) {
            message.error('请输入或粘贴文本内容');
            return;
        }

        setAiParsing(true);
        message.loading('AI正在提取信息...');

        setTimeout(() => {
            try {
                const result = extractConfigFromText(textInput);
                setParseResult(result);

                // 应用提取结果
                setFormData(prev => ({
                    ...prev,
                    title: result.title || prev.title,
                    courseName: result.courseName || prev.courseName,
                    className: result.className || prev.className,
                    duration: result.duration,
                    gradeLevel: result.gradeLevel || prev.gradeLevel,
                    subject: result.subject || prev.subject,
                    difficulty: result.difficulty,
                    teachingStyle: result.teachingStyle,
                    classFormat: result.classFormat,
                    studentLevel: result.studentLevel,
                    knowledgePointIds: result.knowledgePointIds
                }));

                message.success(`AI提取完成！识别到 ${result.knowledgePointIds.length} 个知识点`);
                setAiParsing(false);
            } catch (error) {
                message.error('提取失败：' + error.message);
                setAiParsing(false);
            }
        }, 2000);
    };

    // 章节创建 - 加载章节数据
    const handleChapterSelect = (chapter) => {
        setSelectedChapter(chapter);

        // 应用章节配置
        setFormData(prev => ({
            ...prev,
            title: chapter.title,
            knowledgePointIds: chapter.knowledgePoints || [],
            difficulty: chapter.difficulty || 'medium',
            duration: (chapter.estimatedHours || 2) * 45
        }));

        message.success(`已加载章节：${chapter.title}`);
    };

    // 导出PPT（从大纲）
    const handleExportPPTFromOutline = async () => {
        if (!pptOutline || pptOutline.length === 0) return;

        setIsExporting(true);
        message.loading('正在生成PPT文档...');

        try {
            const result = await exportToPPT(generatedPlan, 'classic');
            if (result.success) {
                message.success(`PPT文档导出成功！文件名：${result.fileName}`);
                setShowPPTOutline(false);
            } else {
                message.error('导出失败：' + result.error);
            }
        } catch (error) {
            message.error('导出失败：' + error.message);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 头部 */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">创建AI教案</h1>
                            <p className="text-sm text-slate-600">按步骤填写信息，智能生成教案</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* 步骤指示器 */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step, idx) => (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${currentStep >= step.id
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'bg-gray-200 text-gray-500'
                                            }`}
                                    >
                                        {currentStep > step.id ? <CheckCircle size={24} /> : step.id}
                                    </div>
                                    <div className={`mt-2 text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{step.desc}</div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-4 rounded ${currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* 步骤内容 */}
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* 创建方式选择器 */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">选择创建方式</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <button
                                        onClick={() => setCreateMethod('standard')}
                                        className={`p-4 rounded-xl border-2 transition-all ${createMethod === 'standard'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">📝</div>
                                        <div className="font-bold text-gray-800">标准创建</div>
                                        <div className="text-xs text-gray-600 mt-1">按步骤填写信息</div>
                                    </button>
                                    <button
                                        onClick={() => setCreateMethod('title')}
                                        className={`p-4 rounded-xl border-2 transition-all ${createMethod === 'title'
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">⚡</div>
                                        <div className="font-bold text-gray-800">标题创建</div>
                                        <div className="text-xs text-gray-600 mt-1">AI智能解析</div>
                                    </button>
                                    <button
                                        onClick={() => setCreateMethod('text')}
                                        className={`p-4 rounded-xl border-2 transition-all ${createMethod === 'text'
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">📋</div>
                                        <div className="font-bold text-gray-800">文本创建</div>
                                        <div className="text-xs text-gray-600 mt-1">粘贴文本提取</div>
                                    </button>
                                    <button
                                        onClick={() => setCreateMethod('chapter')}
                                        className={`p-4 rounded-xl border-2 transition-all ${createMethod === 'chapter'
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">📖</div>
                                        <div className="font-bold text-gray-800">章节创建</div>
                                        <div className="text-xs text-gray-600 mt-1">基于教材章节</div>
                                    </button>
                                </div>
                            </div>

                            {/* 标题创建界面 */}
                            {createMethod === 'title' && (
                                <GlassCard variant="standard" className="p-8 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">标题创建</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">输入教案标题 *</label>
                                            <input
                                                type="text"
                                                value={titleInput}
                                                onChange={(e) => setTitleInput(e.target.value)}
                                                placeholder="例如：高中数学函数基础教案"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </div>
                                        <button
                                            onClick={handleTitleParse}
                                            disabled={aiParsing}
                                            className="btn-primary w-full"
                                        >
                                            {aiParsing ? (
                                                <>
                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                    AI解析中...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    AI智能解析
                                                </>
                                            )}
                                        </button>
                                        {parseResult && (
                                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="text-sm text-green-800">
                                                    <div>✅ 识别到 {parseResult.knowledgePointIds.length} 个知识点</div>
                                                    {parseResult.gradeLevel && <div>🏫 学段：{GRADE_LEVELS.find(g => g.id === parseResult.gradeLevel)?.label}</div>}
                                                    {parseResult.subject && <div>📚 学科：{SUBJECTS.find(s => s.id === parseResult.subject)?.label}</div>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            )}

                            {/* 文本创建界面 */}
                            {createMethod === 'text' && (
                                <GlassCard variant="standard" className="p-8 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">文本创建</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">粘贴或输入文本内容 *</label>
                                            <textarea
                                                value={textInput}
                                                onChange={(e) => setTextInput(e.target.value)}
                                                placeholder="粘贴已有的教案文本、教学计划或相关内容..."
                                                rows={8}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>
                                        <button
                                            onClick={handleTextExtract}
                                            disabled={aiParsing}
                                            className="btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                        >
                                            {aiParsing ? (
                                                <>
                                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                                    AI提取中...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    AI智能提取
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </GlassCard>
                            )}

                            {/* 章节创建界面 */}
                            {createMethod === 'chapter' && (
                                <GlassCard variant="standard" className="p-8 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">章节创建</h3>
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-4">🚧</div>
                                        <div>章节数据库正在完善中...</div>
                                        <div className="text-sm mt-2">您可以选择其他创建方式</div>
                                    </div>
                                </GlassCard>
                            )}

                            {/* 标准配置表单 */}
                            <GlassCard variant="standard" className="p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">基础配置</h2>
                                <div className="space-y-6">
                                    {/* 学段和学科选择 */}
                                    <div className="grid grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">学段 *</label>
                                            <select
                                                value={formData.gradeLevel}
                                                onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {GRADE_LEVELS.map(level => (
                                                    <option key={level.id} value={level.id}>
                                                        {level.icon} {level.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">学科 *</label>
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {SUBJECTS.map(subject => (
                                                    <option key={subject.id} value={subject.id}>
                                                        {subject.icon} {subject.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">教材版本</label>
                                            <select
                                                value={formData.textbook}
                                                onChange={(e) => setFormData({ ...formData, textbook: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {TEXTBOOK_VERSIONS.map(version => (
                                                    <option key={version.id} value={version.id}>
                                                        {version.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">教案标题 *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="例如：混凝土材料性能教案"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">课程名称</label>
                                        <input
                                            type="text"
                                            value={formData.courseName}
                                            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">授课教师</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">授课班级</label>
                                        <input
                                            type="text"
                                            value={formData.className}
                                            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                                            placeholder="例如：高一(3)班"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">学生人数</label>
                                        <input
                                            type="number"
                                            value={formData.studentCount}
                                            onChange={(e) => setFormData({ ...formData, studentCount: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">课时（分钟）</label>
                                        <select
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value={45}>45分钟</option>
                                            <option value={90}>90分钟</option>
                                            <option value={135}>135分钟</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">授课日期</label>
                                        <input
                                            type="date"
                                            value={formData.teachingDate}
                                            onChange={(e) => setFormData({ ...formData, teachingDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* 教案模块选择 */}
                                    <div className="col-span-2 pt-4 border-t border-slate-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="block text-sm font-medium text-gray-700">教案模块配置</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowModuleSelector(true)}
                                                className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                                            >
                                                <Sparkles size={16} />
                                                自定义模块
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.enabledModules.map(moduleId => {
                                                const module = LESSON_MODULES[moduleId];
                                                if (!module) return null;
                                                return (
                                                    <span key={moduleId} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                                        {module.name}
                                                    </span>
                                                );
                                            })}
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                                                共 {formData.enabledModules.length} 个模块
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <GlassCard variant="standard" className="p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">智能配置</h2>

                                {/* 知识点选择 */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">知识点选择</h3>
                                    {/* 搜索和筛选 */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <input
                                            type="text"
                                            placeholder="搜索知识点..."
                                            value={searchKP}
                                            onChange={(e) => setSearchKP(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setCategoryFilter('all')}
                                                className={`px-4 py-2 rounded-lg font-medium ${categoryFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                                            >
                                                全部
                                            </button>
                                            <button
                                                onClick={() => setCategoryFilter('basic')}
                                                className={`px-4 py-2 rounded-lg font-medium ${categoryFilter === 'basic' ? 'bg-green-500 text-white' : 'bg-white border border-gray-200'}`}
                                            >
                                                基础
                                            </button>
                                            <button
                                                onClick={() => setCategoryFilter('intermediate')}
                                                className={`px-4 py-2 rounded-lg font-medium ${categoryFilter === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                                            >
                                                进阶
                                            </button>
                                            <button
                                                onClick={() => setCategoryFilter('advanced')}
                                                className={`px-4 py-2 rounded-lg font-medium ${categoryFilter === 'advanced' ? 'bg-red-500 text-white' : 'bg-white border border-gray-200'}`}
                                            >
                                                高级
                                            </button>
                                        </div>
                                    </div>

                                    {/* 已选知识点 */}
                                    {formData.knowledgePointIds.length > 0 && (
                                        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                                            <div className="text-sm font-medium text-blue-800 mb-2">
                                                已选择 {formData.knowledgePointIds.length} 个知识点
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.knowledgePointIds.map(id => {
                                                    const kp = KNOWLEDGE_POINTS_LIBRARY.find(k => k.id === id);
                                                    return kp ? (
                                                        <span key={id} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                                            {kp.name}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* 知识点列表 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                                        {filteredKPs.map(kp => (
                                            <div
                                                key={kp.id}
                                                onClick={() => handleKPToggle(kp.id)}
                                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.knowledgePointIds.includes(kp.id)
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-bold text-gray-800">{kp.name}</h4>
                                                    {formData.knowledgePointIds.includes(kp.id) && (
                                                        <CheckCircle size={20} className="text-blue-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{kp.description}</p>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className={`px-2 py-1 rounded ${kp.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                                                        kp.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {kp.category}
                                                    </span>
                                                    <span className="text-gray-500">{kp.estimatedHours}学时</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 教学参数配置 */}
                                <div className="space-y-8">
                                    {/* 难度级别 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">难度级别</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {difficulties.map(diff => (
                                                <div
                                                    key={diff.id}
                                                    onClick={() => setFormData({ ...formData, difficulty: diff.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.difficulty === diff.id
                                                        ? `border-${diff.color}-500 bg-${diff.color}-50`
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <h4 className={`font-bold text-lg mb-2 ${formData.difficulty === diff.id ? `text-${diff.color}-600` : 'text-gray-800'}`}>
                                                        {diff.label}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{diff.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 教学风格 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">教学风格</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {teachingStyles.map(style => (
                                                <div
                                                    key={style.id}
                                                    onClick={() => setFormData({ ...formData, teachingStyle: style.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.teachingStyle === style.id
                                                        ? 'border-purple-500 bg-purple-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-2">{style.icon}</div>
                                                    <h4 className={`font-bold text-lg mb-2 ${formData.teachingStyle === style.id ? 'text-purple-600' : 'text-gray-800'}`}>
                                                        {style.label}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{style.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 课堂形式 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">课堂形式</label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {classFormats.map(format => (
                                                <div
                                                    key={format.id}
                                                    onClick={() => setFormData({ ...formData, classFormat: format.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.classFormat === format.id
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-3xl mb-2">{format.icon}</div>
                                                    <h4 className={`font-bold mb-1 ${formData.classFormat === format.id ? 'text-indigo-600' : 'text-gray-800'}`}>
                                                        {format.label}
                                                    </h4>
                                                    <p className="text-xs text-gray-600">{format.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 学生水平 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">学生基础水平</label>
                                        <div className="grid grid-cols-5 gap-4">
                                            {studentLevels.map(level => (
                                                <div
                                                    key={level.id}
                                                    onClick={() => setFormData({ ...formData, studentLevel: level.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.studentLevel === level.id
                                                        ? 'border-emerald-500 bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <h4 className={`font-bold mb-1 ${formData.studentLevel === level.id ? 'text-emerald-600' : 'text-gray-800'}`}>
                                                        {level.label}
                                                    </h4>
                                                    <p className="text-xs text-gray-600">{level.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 语气风格 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">语气风格</label>
                                        <div className="grid grid-cols-5 gap-4">
                                            {TONE_STYLES.map(tone => (
                                                <div
                                                    key={tone.id}
                                                    onClick={() => setFormData({ ...formData, toneStyle: tone.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.toneStyle === tone.id
                                                        ? 'border-pink-500 bg-pink-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-2xl mb-2">{tone.icon}</div>
                                                    <h4 className={`font-bold mb-1 text-sm ${formData.toneStyle === tone.id ? 'text-pink-600' : 'text-gray-800'}`}>
                                                        {tone.label}
                                                    </h4>
                                                    <p className="text-xs text-gray-600">{tone.scenario}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 详细程度 */}
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-800 mb-4">详细程度</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {DETAIL_LEVELS.map(level => (
                                                <div
                                                    key={level.id}
                                                    onClick={() => setFormData({ ...formData, detailLevel: level.id })}
                                                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.detailLevel === level.id
                                                        ? 'border-cyan-500 bg-cyan-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <h4 className={`font-bold text-lg mb-2 ${formData.detailLevel === level.id ? 'text-cyan-600' : 'text-gray-800'}`}>
                                                        {level.label}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mb-2">{level.description}</p>
                                                    <p className="text-xs text-gray-500">{level.estimatedPages}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 模块选择器 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="block text-lg font-semibold text-gray-800">教案模块</label>
                                            <div className="flex gap-2">
                                                {Object.keys(MODULE_PRESETS).map(presetId => {
                                                    const preset = MODULE_PRESETS[presetId];
                                                    return (
                                                        <button
                                                            key={presetId}
                                                            onClick={() => setFormData({ ...formData, enabledModules: preset.modules })}
                                                            className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                            title={preset.description}
                                                        >
                                                            {preset.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {Object.values(LESSON_MODULES).sort((a, b) => a.order - b.order).map(module => (
                                                <div
                                                    key={module.id}
                                                    onClick={() => {
                                                        if (!module.canDisable) return;
                                                        const newModules = formData.enabledModules.includes(module.id)
                                                            ? formData.enabledModules.filter(m => m !== module.id)
                                                            : [...formData.enabledModules, module.id];
                                                        setFormData({ ...formData, enabledModules: newModules });
                                                    }}
                                                    className={`p-3 border-2 rounded-lg transition-all ${!module.canDisable
                                                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-60'
                                                        : formData.enabledModules.includes(module.id)
                                                            ? 'border-blue-500 bg-blue-50 cursor-pointer'
                                                            : 'border-gray-200 cursor-pointer hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-bold text-sm text-gray-800">{module.name}</h4>
                                                        {formData.enabledModules.includes(module.id) && (
                                                            <CheckCircle size={16} className="text-blue-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                                                    <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded ${module.level === 'required' ? 'bg-red-100 text-red-700' :
                                                        module.level === 'recommended' ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {module.level === 'required' ? '必选' : module.level === 'recommended' ? '推荐' : '可选'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <GlassCard variant="standard" className="p-8">
                                {isGenerating ? (
                                    <div className="text-center py-12">
                                        <Loader className="animate-spin mx-auto text-blue-500 mb-4" size={48} />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">AI正在生成教案...</h3>
                                        <p className="text-gray-600">请稍候，预计需要5-10秒</p>
                                    </div>
                                ) : generatedPlan ? (
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                                            <CheckCircle size={32} className="text-green-500" />
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800">教案生成成功！</h2>
                                                <p className="text-sm text-gray-600">您可以保存或编辑这份教案</p>
                                            </div>
                                        </div>

                                        {/* 教案预览 - 优化排版 */}
                                        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm mb-6">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                                    <FileText size={20} className="text-blue-600" />
                                                    教案预览
                                                </h3>
                                            </div>
                                            <div className="p-8 max-h-[500px] overflow-y-auto">
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: generatedPlan.content }}
                                                    className="prose prose-slate max-w-none
                                                        prose-headings:text-gray-800 
                                                        prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-blue-200
                                                        prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-blue-700
                                                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
                                                        prose-ul:my-4 prose-ul:space-y-2
                                                        prose-li:text-gray-700 prose-li:leading-relaxed
                                                        prose-strong:text-gray-900 prose-strong:font-semibold"
                                                />
                                            </div>
                                        </div>

                                        {/* 操作按钮区 - 固定布局防止遮挡 */}
                                        <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-8 px-8 border-t border-gray-200 mt-6">
                                            <div className="flex gap-4">
                                                <GradientButton
                                                    variant="primary"
                                                    size="large"
                                                    onClick={handleSave}
                                                    className="flex-1"
                                                >
                                                    保存到教案列表
                                                </GradientButton>
                                                <button
                                                    onClick={handleSaveAsTemplate}
                                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 font-medium"
                                                >
                                                    <Save size={20} />
                                                    保存为模板
                                                </button>
                                                <button
                                                    onClick={handleExportWord}
                                                    disabled={isExporting}
                                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                                >
                                                    <FileText size={20} />
                                                    {isExporting ? '生成中...' : '生成Word教案'}
                                                </button>
                                                <button
                                                    onClick={handleGeneratePPTOutline}
                                                    disabled={isExporting}
                                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                                >
                                                    <Sparkles size={20} />
                                                    生成PPT大纲
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 text-center mt-2">先生成大纲预览，确认后再生成PPT文件</p>
                                        </div>
                                    </div>
                                ) : null}
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 底部操作栏 */}
                {currentStep < 3 && (
                    <div className="flex justify-between mt-8">
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 1}
                                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <ArrowLeft size={20} />
                                上一步
                            </button>
                            <button
                                onClick={handleOpenTemplates}
                                className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            >
                                <FolderOpen size={20} />
                                模板库
                            </button>
                            {currentStep === 2 && (
                                <button
                                    onClick={handleSaveAsTemplate}
                                    className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                                >
                                    <Save size={20} />
                                    保存配置为模板
                                </button>
                            )}
                        </div>
                        <GradientButton
                            variant="primary"
                            size="large"
                            onClick={handleNext}
                        >
                            {currentStep === 2 ? (
                                <>
                                    <Sparkles size={20} className="mr-2" />
                                    生成教案
                                </>
                            ) : (
                                <>
                                    下一步
                                    <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </GradientButton>
                    </div>
                )}
            </main>

            {/* PPT大纲预览弹窗 */}
            <AnimatePresence>
                {showPPTOutline && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPPTOutline(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* 弹窗头部 */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <Presentation size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            AI生成的PPT大纲
                                            <Tag color="purple">共{pptOutline.length}张</Tag>
                                        </h3>
                                        <p className="text-sm text-slate-500">基于当前教案内容智能生成，可直接导出为PPT</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleExportPPTFromOutline}
                                        disabled={isExporting}
                                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Download size={16} />
                                        {isExporting ? '生成中...' : '一键生成AI PPT'}
                                    </button>
                                    <button
                                        onClick={() => setShowPPTOutline(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* 大纲内容 */}
                            <div className="p-6 max-h-[calc(90vh-140px)] overflow-auto">
                                <div className="space-y-4">
                                    {pptOutline.map((slide, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-slate-50 rounded-xl p-5 border-2 border-slate-200 hover:border-purple-300 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* 幻灯片编号 */}
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                                    {slide.slide}
                                                </div>

                                                {/* 幻灯片内容 */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                                                            {slide.title}
                                                        </h4>
                                                        <Tag color={slide.type === 'cover' ? 'purple' : slide.type === 'summary' ? 'green' : slide.type === 'interactive' ? 'orange' : slide.type === 'homework' ? 'blue' : 'default'}>
                                                            {slide.type === 'cover' ? '封面' : slide.type === 'summary' ? '总结' : slide.type === 'interactive' ? '互动' : slide.type === 'homework' ? '作业' : '内容'}
                                                        </Tag>
                                                    </div>

                                                    {slide.subtitle && (
                                                        <p className="text-slate-600 mb-2">{slide.subtitle}</p>
                                                    )}

                                                    {slide.content && slide.content.length > 0 && (
                                                        <ul className="space-y-1 mb-3">
                                                            {slide.content.map((item, i) => (
                                                                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                                    <span className="text-purple-500 mt-1">•</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {slide.notes && (
                                                        <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                                                            <Lightbulb size={14} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                                                            <p className="text-xs text-yellow-800">
                                                                <strong>教学建议：</strong>{slide.notes}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* 弹窗底部 */}
                            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Sparkles size={16} className="text-purple-500" />
                                    <span>此大纲由AI根据教案内容自动生成，建议预计{Math.ceil(pptOutline.length * 1.5)}分钟讲授</span>
                                </div>
                                <button
                                    onClick={() => setShowPPTOutline(false)}
                                    className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                                >
                                    关闭
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 模板保存对话框 */}
            <AnimatePresence>
                {showTemplateSaveDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowTemplateSaveDialog(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* 对话框头部 */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <Save size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">保存为模板</h3>
                                        <p className="text-sm text-slate-500">将当前配置保存为模板，方便下次快速创建</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowTemplateSaveDialog(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* 对话框内容 */}
                            <div className="p-6">
                                <TemplateSaveForm
                                    onSave={handleConfirmSaveTemplate}
                                    onCancel={() => setShowTemplateSaveDialog(false)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// 模板保存表单组件
const TemplateSaveForm = ({ onSave, onCancel }) => {
    const [templateName, setTemplateName] = useState('');
    const [templateDescription, setTemplateDescription] = useState('');
    const [templateCategory, setTemplateCategory] = useState('daily');
    const [templateTags, setTemplateTags] = useState('');

    const categories = [
        { id: 'daily', label: '日常教学' },
        { id: 'exam', label: '考试复习' },
        { id: 'project', label: '项目实践' },
        { id: 'activity', label: '活动课程' },
        { id: 'other', label: '其他' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!templateName.trim()) {
            message.error('请输入模板名称');
            return;
        }

        const tags = templateTags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        onSave({
            name: templateName,
            description: templateDescription,
            category: templateCategory,
            tags
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    模板名称 *
                </label>
                <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="例如：高中数学标准模板"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    模板描述
                </label>
                <textarea
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="简要描述这个模板的用途和特点"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    模板分类
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setTemplateCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${templateCategory === cat.id
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    模板标签
                </label>
                <input
                    type="text"
                    value={templateTags}
                    onChange={(e) => setTemplateTags(e.target.value)}
                    placeholder="用逗号分隔，例如：数学,高中,基础"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">标签可以帮助您更快地找到这个模板</p>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                    取消
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-medium"
                >
                    保存模板
                </button>
            </div>
        </form>
    );
};

export default LessonPlanCreate;
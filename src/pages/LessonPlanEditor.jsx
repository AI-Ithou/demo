import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Download, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard, GradientButton } from '../components/uiverse';
import { getLessonPlanById, saveLessonPlan, updateLessonPlanStatus } from '../utils/lessonPlanStorage';
import { exportToWord, exportToPPT, PPT_TEMPLATES } from '../utils/documentExporter';

const LessonPlanEditor = () => {
    const navigate = useNavigate();
    const { planId } = useParams();
    const [lessonPlan, setLessonPlan] = useState(null);
    const [editMode, setEditMode] = useState('preview'); // 'preview' or 'edit'
    const [expandedModules, setExpandedModules] = useState({
        basicInfo: true,
        teachingGoals: true,
        keyPoints: true,
        preparation: false,
        teachingFlow: true,
        activities: false,
        boardDesign: false,
        resources: false,
        homework: false,
        assessment: false,
        reflection: false
    });
    const [editingModule, setEditingModule] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showPPTTemplates, setShowPPTTemplates] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [content, setContent] = useState('');
    const contentRef = useRef(null);
    const autoSaveTimer = useRef(null);

    useEffect(() => {
        const plan = getLessonPlanById(planId);
        if (!plan) {
            alert('教案不存在');
            navigate('/teacher/lesson-plans');
            return;
        }
        setLessonPlan(plan);
        setContent(plan.content || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planId]);

    // 自动保存
    useEffect(() => {
        if (lessonPlan) {
            if (autoSaveTimer.current) {
                clearTimeout(autoSaveTimer.current);
            }
            autoSaveTimer.current = setTimeout(() => {
                handleAutoSave();
            }, 30000); // 30秒自动保存
        }
        
        return () => {
            if (autoSaveTimer.current) {
                clearTimeout(autoSaveTimer.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonPlan]);
    
    const toggleModule = (moduleName) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleName]: !prev[moduleName]
        }));
    };
    
    const handleModuleEdit = (moduleName, newValue) => {
        setLessonPlan(prev => ({
            ...prev,
            [moduleName]: newValue
        }));
    };

    const handleContentChange = (e) => {
        const newContent = e.currentTarget.innerHTML;
        setContent(newContent);
        if (lessonPlan) {
            setLessonPlan(prev => ({
                ...prev,
                content: newContent
            }));
        }
    };

    const handleAutoSave = () => {
        if (!lessonPlan) return;
        
        try {
            saveLessonPlan(lessonPlan);
            setLastSaved(new Date());
        } catch (error) {
            console.error('自动保存失败:', error);
        }
    };

    const handleSave = () => {
        if (!lessonPlan) return;
        
        setIsSaving(true);
        
        try {
            saveLessonPlan(lessonPlan);
            setLastSaved(new Date());
            alert('保存成功！');
        } catch (error) {
            alert('保存失败：' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = () => {
        const confirmed = window.confirm('确定要发布这个教案吗？');
        if (confirmed) {
            handleSave();
            updateLessonPlanStatus(planId, 'published');
            alert('教案已发布！');
            navigate('/teacher/lesson-plans');
        }
    };

    const handleExportWord = async () => {
        if (!lessonPlan) return;
        
        setShowExportMenu(false);
        
        try {
            const result = await exportToWord(lessonPlan);
            if (result.success) {
                alert('Word文档导出成功！');
            } else {
                alert('导出失败：' + result.error);
            }
        } catch (error) {
            alert('导出失败：' + error.message);
        }
    };

    const handleExportPPT = async (templateId = 'classic') => {
        if (!lessonPlan) return;
        
        setShowExportMenu(false);
        
        try {
            const result = await exportToPPT(lessonPlan, templateId);
            if (result.success) {
                alert('PPT文档导出成功！');
            } else {
                alert('导出失败：' + result.error);
            }
        } catch (error) {
            alert('导出失败：' + error.message);
        }
    };

    if (!lessonPlan) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 mb-4">加载中...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 顶部工具栏 */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <button
                                onClick={() => navigate('/teacher/lesson-plans')}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <input
                                type="text"
                                value={lessonPlan?.title || ''}
                                onChange={(e) => setLessonPlan(prev => ({ ...prev, title: e.target.value }))}
                                className="text-xl font-bold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded flex-1 max-w-md"
                            />
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                lessonPlan.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                                lessonPlan.status === 'published' ? 'bg-green-100 text-green-700' :
                                'bg-orange-100 text-orange-700'
                            }`}>
                                {lessonPlan.status === 'draft' ? '草稿' : lessonPlan.status === 'published' ? '已发布' : '已归档'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {lastSaved && (
                                <span className="text-xs text-gray-500">
                                    上次保存：{lastSaved.toLocaleTimeString('zh-CN')}
                                </span>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save size={18} />
                                {isSaving ? '保存中...' : '保存'}
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowExportMenu(!showExportMenu)}
                                    className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Download size={18} />
                                    导出
                                </button>
                                {showExportMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        <button
                                            onClick={handleExportWord}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                                        >
                                            <FileText size={18} />
                                            导出为Word
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowExportMenu(false);
                                                setShowPPTTemplates(true);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                                        >
                                            <FileText size={18} />
                                            导出为PPT
                                        </button>
                                    </div>
                                )}
                            </div>
                            <GradientButton
                                variant="primary"
                                size="medium"
                                onClick={handlePublish}
                            >
                                <CheckCircle size={18} className="mr-2" />
                                发布
                            </GradientButton>
                        </div>
                    </div>
                </div>
            </header>

            {/* PPT模板选择弹窗 */}
            {showPPTTemplates && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">选择PPT模板</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            {Object.values(PPT_TEMPLATES).map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => handleExportPPT(template.id)}
                                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all group"
                                >
                                    <div
                                        className="w-full h-24 rounded-lg mb-3"
                                        style={{ backgroundColor: `#${template.colors.background}` }}
                                    >
                                        <div
                                            className="w-full h-1/2"
                                            style={{ backgroundColor: `#${template.colors.primary}` }}
                                        />
                                    </div>
                                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600">{template.name}</h4>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowPPTTemplates(false)}
                            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            取消
                        </button>
                    </motion.div>
                </div>
            )}

            {/* 主要内容区域 */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* 左侧大纲导航 */}
                    <div className="col-span-3">
                        <GlassCard variant="standard" className="p-6 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4">教案大纲</h3>
                            <nav className="space-y-2 text-sm">
                                <a href="#goals" className="block text-gray-600 hover:text-blue-600 py-1">教学目标</a>
                                <a href="#keypoints" className="block text-gray-600 hover:text-blue-600 py-1">教学重难点</a>
                                <a href="#flow" className="block text-gray-600 hover:text-blue-600 py-1">教学流程</a>
                                <a href="#activities" className="block text-gray-600 hover:text-blue-600 py-1">课堂活动</a>
                                <a href="#resources" className="block text-gray-600 hover:text-blue-600 py-1">教学资源</a>
                                <a href="#assessment" className="block text-gray-600 hover:text-blue-600 py-1">评估方案</a>
                            </nav>
                        </GlassCard>
                    </div>

                    {/* 中间编辑区域 */}
                    <div className="col-span-6">
                        <GlassCard variant="standard" className="p-8">
                            <div
                                ref={contentRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={handleContentChange}
                                dangerouslySetInnerHTML={{ __html: content }}
                                className="min-h-screen prose max-w-none focus:outline-none"
                                style={{
                                    lineHeight: '1.8',
                                    fontSize: '16px'
                                }}
                            />
                        </GlassCard>
                    </div>

                    {/* 右侧属性面板 */}
                    <div className="col-span-3">
                        <GlassCard variant="standard" className="p-6 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4">教案信息</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-gray-500 mb-1">课程</div>
                                    <div className="text-gray-800 font-medium">{lessonPlan.courseName}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">授课教师</div>
                                    <div className="text-gray-800 font-medium">{lessonPlan.metadata.author}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">课时</div>
                                    <div className="text-gray-800 font-medium">{lessonPlan.metadata.duration}分钟</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">难度</div>
                                    <div className="text-gray-800 font-medium">
                                        {lessonPlan.metadata.difficulty === 'simple' ? '简单' :
                                         lessonPlan.metadata.difficulty === 'medium' ? '中等' : '困难'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">版本</div>
                                    <div className="text-gray-800 font-medium">V{lessonPlan.version}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">创建时间</div>
                                    <div className="text-gray-800 font-medium">
                                        {new Date(lessonPlan.metadata.createdAt).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">更新时间</div>
                                    <div className="text-gray-800 font-medium">
                                        {new Date(lessonPlan.metadata.updatedAt).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LessonPlanEditor;

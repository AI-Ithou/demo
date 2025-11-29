import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit, Sparkles, FileText, Check, X, ChevronDown, ChevronUp, ChevronRight, Folder, FolderOpen, BookOpen as BookIcon } from 'lucide-react';

const KnowledgeAssessmentConfig = () => {
    const navigate = useNavigate();

    // 状态管理
    const [selectedKnowledge, setSelectedKnowledge] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('basic');
    const [config, setConfig] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState(['chapter1', 'chapter2']); // 默认展开

    // 知识点树状结构数据
    const knowledgeTree = [
        {
            id: 'chapter1',
            name: '第一章 量子力学基础',
            type: 'folder',
            children: [
                { id: 'kp1-1', name: '1.1 波粒二象性', type: 'node' },
                { id: 'kp1-2', name: '1.2 不确定性原理', type: 'node' },
                { id: 'kp1-3', name: '1.3 德布罗意波', type: 'node' }
            ]
        },
        {
            id: 'chapter2',
            name: '第二章 薛定谔方程',
            type: 'folder',
            children: [
                { id: 'kp2-1', name: '2.1 薛定谔方程的建立', type: 'node' },
                { id: 'kp2-2', name: '2.2 波函数的物理意义', type: 'node' },
                {
                    id: 'section2-3',
                    name: '2.3 定态薛定谔方程',
                    type: 'folder',
                    children: [
                        { id: 'kp2-3-1', name: '2.3.1 一维无限深势阱', type: 'node' },
                        { id: 'kp2-3-2', name: '2.3.2 谐振子', type: 'node' }
                    ]
                }
            ]
        },
        {
            id: 'chapter3',
            name: '第三章 量子力学进阶',
            type: 'folder',
            children: [
                { id: 'kp3-1', name: '3.1 量子纠缠', type: 'node' },
                { id: 'kp3-2', name: '3.2 量子隧穿', type: 'node' },
                { id: 'kp3-3', name: '3.3 量子测量', type: 'node' }
            ]
        }
    ];

    // Mock资料数据
    const resourcesData = [
        { id: 'r1', name: '量子力学入门PPT.pdf', type: 'pdf', size: '2.5MB' },
        { id: 'r2', name: '波粒二象性实验视频.mp4', type: 'video', size: '45MB' },
        { id: 'r3', name: '量子力学教材第三章.pdf', type: 'pdf', size: '8.3MB' },
        { id: 'r4', name: '薛定谔方程推导.doc', type: 'doc', size: '1.2MB' },
        { id: 'r5', name: '前沿论文-量子计算.pdf', type: 'pdf', size: '3.7MB' }
    ];

    // 难度层级配置
    const difficultyLevels = {
        basic: {
            name: '基础巩固',
            color: 'blue',
            targetStudents: '完全不会、本知识点不会',
            passingScore: 60
        },
        standard: {
            name: '标准掌握',
            color: 'green',
            targetStudents: '本知识点会一些',
            passingScore: 70
        },
        advanced: {
            name: '进阶挑战',
            color: 'purple',
            targetStudents: '本知识点会很多',
            passingScore: 80
        },
        extension: {
            name: '拓展提升',
            color: 'orange',
            targetStudents: '完全掌握',
            passingScore: 85
        }
    };

    // 加载配置
    useEffect(() => {
        const saved = localStorage.getItem('assessmentConfig');
        if (saved) {
            setConfig(JSON.parse(saved));
        }
    }, []);

    // 切换文件夹展开/折叠
    const toggleFolder = (folderId) => {
        setExpandedFolders(prev =>
            prev.includes(folderId)
                ? prev.filter(id => id !== folderId)
                : [...prev, folderId]
        );
    };

    // 渲染树节点
    const renderTreeNode = (node, level = 0) => {
        if (node.type === 'folder') {
            const isExpanded = expandedFolders.includes(node.id);
            const Icon = isExpanded ? FolderOpen : Folder;

            return (
                <div key={node.id}>
                    <button
                        onClick={() => toggleFolder(node.id)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                        style={{ paddingLeft: `${level * 12 + 12}px` }}
                    >
                        <ChevronRight
                            size={14}
                            className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                        <Icon size={16} className="text-amber-600" />
                        <span className="font-medium text-slate-700">{node.name}</span>
                    </button>
                    {isExpanded && node.children && (
                        <div>
                            {node.children.map(child => renderTreeNode(child, level + 1))}
                        </div>
                    )}
                </div>
            );
        } else {
            // 叶子节点（知识点）
            const isSelected = selectedKnowledge === node.id;
            return (
                <button
                    key={node.id}
                    onClick={() => setSelectedKnowledge(node.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${isSelected
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 font-medium'
                            : 'text-slate-700 hover:bg-slate-50 border-2 border-transparent'
                        }`}
                    style={{ paddingLeft: `${level * 12 + 12}px` }}
                >
                    <div className="w-[14px]"></div> {/* 占位符对齐 */}
                    <BookIcon size={14} className={isSelected ? 'text-blue-600' : 'text-slate-400'} />
                    <span>{node.name}</span>
                </button>
            );
        }
    };

    // 获取当前知识点名称
    const getKnowledgePointName = (id) => {
        const findInTree = (nodes) => {
            for (const node of nodes) {
                if (node.id === id && node.type === 'node') return node.name;
                if (node.children) {
                    const found = findInTree(node.children);
                    if (found) return found;
                }
            }
            return null;
        };
        return findInTree(knowledgeTree) || '未选择';
    };

    // 保存配置
    const saveConfig = () => {
        localStorage.setItem('assessmentConfig', JSON.stringify(config));
        alert('配置已保存！');
    };

    // 获取当前配置
    const getCurrentConfig = () => {
        if (!selectedKnowledge) return null;
        return config[selectedKnowledge]?.[selectedDifficulty] || {
            linkedResources: [],
            questions: [],
            passingScore: difficultyLevels[selectedDifficulty].passingScore,
            timeLimit: 30
        };
    };

    // 更新当前配置
    const updateCurrentConfig = (updates) => {
        setConfig(prev => ({
            ...prev,
            [selectedKnowledge]: {
                ...prev[selectedKnowledge],
                [selectedDifficulty]: {
                    ...getCurrentConfig(),
                    ...updates
                }
            }
        }));
    };

    // 切换资料关联
    const toggleResource = (resourceId) => {
        const current = getCurrentConfig();
        const linkedResources = current.linkedResources || [];
        const updated = linkedResources.includes(resourceId)
            ? linkedResources.filter(id => id !== resourceId)
            : [...linkedResources, resourceId];
        updateCurrentConfig({ linkedResources: updated });
    };

    // AI生成题目
    const generateQuestions = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newQuestions = [
                {
                    id: Date.now() + '_1',
                    type: 'multiple-choice',
                    question: `关于${getKnowledgePointName(selectedKnowledge)}，以下说法正确的是？`,
                    options: ['只有光具有波粒二象性', '所有微观粒子都具有波粒二象性', '波粒二象性只在宏观世界存在', '波粒二象性违反能量守恒'],
                    correctAnswer: 1,
                    score: 10,
                    difficulty: selectedDifficulty,
                    sourceResource: getCurrentConfig().linkedResources[0] || null
                },
                {
                    id: Date.now() + '_2',
                    type: 'true-false',
                    question: '德布罗意波长与粒子动量成反比。',
                    correctAnswer: true,
                    score: 5,
                    difficulty: selectedDifficulty,
                    sourceResource: getCurrentConfig().linkedResources[0] || null
                },
                {
                    id: Date.now() + '_3',
                    type: 'short-answer',
                    question: '请简述双缝干涉实验如何证明了光的波粒二象性。',
                    correctAnswer: '当光通过双缝时产生干涉条纹，证明了波动性；而单个光子也能通过双缝并在屏幕上形成点，证明了粒子性。',
                    score: 15,
                    difficulty: selectedDifficulty,
                    sourceResource: getCurrentConfig().linkedResources[1] || null
                }
            ];

            const current = getCurrentConfig();
            updateCurrentConfig({
                questions: [...(current.questions || []), ...newQuestions]
            });
            setIsGenerating(false);
        }, 2000);
    };

    // 删除题目
    const deleteQuestion = (questionId) => {
        const current = getCurrentConfig();
        updateCurrentConfig({
            questions: current.questions.filter(q => q.id !== questionId)
        });
    };

    // 添加新题目
    const addNewQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'multiple-choice',
            question: '新题目',
            options: ['选项A', '选项B', '选项C', '选项D'],
            correctAnswer: 0,
            score: 10,
            difficulty: selectedDifficulty
        };

        const current = getCurrentConfig();
        updateCurrentConfig({
            questions: [...(current.questions || []), newQuestion]
        });
    };

    const currentConfig = getCurrentConfig();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">知识点评测配置</h1>
                            <p className="text-xs text-slate-500">个性化自适应评测题库管理</p>
                        </div>
                    </div>
                    <button
                        onClick={saveConfig}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        保存配置
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* 左侧：知识点目录树 */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-slate-800">知识点目录</h3>
                                <button className="text-xs text-blue-600 hover:text-blue-700">
                                    全部展开
                                </button>
                            </div>
                            <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                                {knowledgeTree.map(node => renderTreeNode(node, 0))}
                            </div>
                        </div>
                    </div>

                    {/* 中间和右侧：配置区域 */}
                    {selectedKnowledge ? (
                        <>
                            {/* 中间：难度层级和资料 */}
                            <div className="col-span-4">
                                {/* 难度层级选择 */}
                                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                                    <h3 className="text-sm font-bold text-slate-800 mb-3">难度层级</h3>
                                    <div className="space-y-2">
                                        {Object.entries(difficultyLevels).map(([key, level]) => (
                                            <button
                                                key={key}
                                                onClick={() => setSelectedDifficulty(key)}
                                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${selectedDifficulty === key
                                                        ? `bg-${level.color}-50 border-${level.color}-300`
                                                        : 'border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-slate-800">{level.name}</span>
                                                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                                                        及格: {level.passingScore}分
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-600">
                                                    目标学生：{level.targetStudents}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 关联资料 */}
                                <div className="bg-white rounded-xl border border-slate-200 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold text-slate-800">关联学习资料</h3>
                                        <span className="text-xs text-slate-500">
                                            {currentConfig?.linkedResources?.length || 0} 个资料
                                        </span>
                                    </div>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {resourcesData.map(resource => {
                                            const isLinked = currentConfig?.linkedResources?.includes(resource.id);
                                            return (
                                                <label
                                                    key={resource.id}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${isLinked
                                                            ? 'bg-blue-50 border-blue-200'
                                                            : 'border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isLinked}
                                                        onChange={() => toggleResource(resource.id)}
                                                        className="w-4 h-4"
                                                    />
                                                    <FileText size={16} className="text-slate-600" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-slate-800 truncate">
                                                            {resource.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {resource.type.toUpperCase()} · {resource.size}
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* 右侧：题目配置 */}
                            <div className="col-span-5">
                                <div className="bg-white rounded-xl border border-slate-200 p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-slate-800">评测题目</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={generateQuestions}
                                                disabled={isGenerating || !currentConfig?.linkedResources?.length}
                                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                                            >
                                                <Sparkles size={16} />
                                                {isGenerating ? 'AI生成中...' : 'AI生成题目'}
                                            </button>
                                            <button
                                                onClick={addNewQuestion}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                                            >
                                                <Plus size={16} />
                                                添加题目
                                            </button>
                                        </div>
                                    </div>

                                    {/* 题目列表 */}
                                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                        {currentConfig?.questions?.length > 0 ? (
                                            currentConfig.questions.map((q, index) => {
                                                const isExpanded = expandedQuestion === q.id;
                                                return (
                                                    <div
                                                        key={q.id}
                                                        className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-200 transition-all"
                                                    >
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                                                                    {index + 1}
                                                                </span>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${q.type === 'multiple-choice' ? 'bg-blue-100 text-blue-700' :
                                                                                q.type === 'true-false' ? 'bg-green-100 text-green-700' :
                                                                                    'bg-purple-100 text-purple-700'
                                                                            }`}>
                                                                            {q.type === 'multiple-choice' ? '选择题' :
                                                                                q.type === 'true-false' ? '判断题' : '简答题'}
                                                                        </span>
                                                                        <span className="text-xs text-slate-500">{q.score}分</span>
                                                                    </div>
                                                                    <div className="text-sm text-slate-800 font-medium">
                                                                        {q.question}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                                                                    className="p-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                                >
                                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteQuestion(q.id)}
                                                                    className="p-1 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {isExpanded && (
                                                            <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                                                                {q.type === 'multiple-choice' && q.options && (
                                                                    <div className="space-y-1">
                                                                        {q.options.map((opt, i) => (
                                                                            <div key={i} className={`text-sm px-3 py-2 rounded ${i === q.correctAnswer ? 'bg-green-50 text-green-700 font-medium' : 'text-slate-600'
                                                                                }`}>
                                                                                {String.fromCharCode(65 + i)}. {opt}
                                                                                {i === q.correctAnswer && <Check size={14} className="inline ml-2" />}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                {q.type === 'true-false' && (
                                                                    <div className="text-sm">
                                                                        <span className="text-slate-600">正确答案：</span>
                                                                        <span className="font-medium text-green-600">
                                                                            {q.correctAnswer ? '正确' : '错误'}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {q.type === 'short-answer' && (
                                                                    <div className="text-sm">
                                                                        <div className="text-slate-600 mb-1">参考答案：</div>
                                                                        <div className="text-slate-800 bg-slate-50 p-2 rounded">
                                                                            {q.correctAnswer}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {q.sourceResource && (
                                                                    <div className="text-xs text-slate-500">
                                                                        来源：{resourcesData.find(r => r.id === q.sourceResource)?.name || '未知资料'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center py-12 text-slate-400">
                                                <FileText size={48} className="mx-auto mb-3 opacity-50" />
                                                <p>暂无题目</p>
                                                <p className="text-sm">点击"AI生成题目"或"添加题目"开始配置</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* 配置摘要 */}
                                    {currentConfig?.questions?.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-sm">
                                            <div className="flex gap-4">
                                                <span className="text-slate-600">
                                                    题目数：<span className="font-bold text-slate-800">{currentConfig.questions.length}</span>
                                                </span>
                                                <span className="text-slate-600">
                                                    总分：<span className="font-bold text-slate-800">
                                                        {currentConfig.questions.reduce((sum, q) => sum + q.score, 0)}
                                                    </span>
                                                </span>
                                            </div>
                                            <span className="text-slate-600">
                                                及格分：<span className="font-bold text-blue-600">
                                                    {currentConfig.passingScore}
                                                </span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-span-9 flex items-center justify-center">
                            <div className="text-center text-slate-400">
                                <FileText size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">请从左侧选择一个知识点</p>
                                <p className="text-sm">然后开始配置个性化评测题库</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default KnowledgeAssessmentConfig;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, ChevronDown, BookOpen, AlertCircle, Sparkles, Clock } from 'lucide-react';
import { KNOWLEDGE_TREE, flattenKnowledgeTree, getNodePath } from '../data/knowledge_tree';
import { PathManager, LearningPath, AIAnalyzer } from '../data/learning_path_config';
import { SAMPLE_RESOURCES, RESOURCE_TYPES } from '../data/resource_library';
import { getResourcesForKnowledge } from '../data/knowledge_resource_bindings';

const TeacherPathEditor = () => {
    const navigate = useNavigate();
    const { pathId } = useParams();
    const isNewPath = pathId === 'new';

    // 路径基本信息
    const [pathName, setPathName] = useState('');
    const [pathDescription, setPathDescription] = useState('');

    // 知识点选择
    const [selectedKnowledgePoints, setSelectedKnowledgePoints] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState(['math-hs']); // 默认展开根节点

    // AI分析结果
    const [aiAnalysis, setAiAnalysis] = useState(null);

    // 加载现有路径
    useEffect(() => {
        if (!isNewPath) {
            const path = PathManager.getPath(pathId);
            if (path) {
                setPathName(path.name);
                setPathDescription(path.description);

                // 通过ID恢复知识点
                const flatPoints = flattenKnowledgeTree(KNOWLEDGE_TREE);
                const selected = flatPoints.filter(fp => path.knowledgePoints.includes(fp.id));
                setSelectedKnowledgePoints(selected);

                if (path.aiSuggestions) {
                    setAiAnalysis(path.aiSuggestions);
                }
            }
        }
    }, [pathId, isNewPath]);

    // 当选中知识点变化时，运行AI分析
    useEffect(() => {
        if (selectedKnowledgePoints.length > 0) {
            const analysis = AIAnalyzer.analyze(selectedKnowledgePoints, KNOWLEDGE_TREE);
            setAiAnalysis(analysis);
        } else {
            setAiAnalysis(null);
        }
    }, [selectedKnowledgePoints]);

    // 切换节点展开/收起
    const toggleNode = (nodeId) => {
        setExpandedNodes(prev =>
            prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
        );
    };

    // 选择/取消知识点
    const toggleKnowledgePoint = (kp) => {
        setSelectedKnowledgePoints(prev => {
            const exists = prev.find(p => p.id === kp.id);
            if (exists) {
                return prev.filter(p => p.id !== kp.id);
            } else {
                return [...prev, kp];
            }
        });
    };

    // 渲染树节点
    const renderTreeNode = (node) => {
        const isExpanded = expandedNodes.includes(node.id);
        const hasChildren = node.children && node.children.length > 0;
        const isLeaf = node.level === 3; // 叶子节点（实际知识点）
        const isSelected = selectedKnowledgePoints.find(kp => kp.id === node.id);

        return (
            <div key={node.id} className="select-none">
                <div className="flex items-center gap-2 py-1.5 hover:bg-slate-50 rounded px-2 -mx-2">
                    {/* 展开/收起图标 */}
                    {hasChildren && (
                        <button
                            onClick={() => toggleNode(node.id)}
                            className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                        >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                    )}
                    {!hasChildren && <span className="w-5"></span>}

                    {/* 复选框（只对叶子节点显示） */}
                    {isLeaf && (
                        <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => toggleKnowledgePoint(node)}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                    )}
                    {!isLeaf && <span className="w-4"></span>}

                    {/* 节点名称 */}
                    <span
                        className={`flex-1 text-sm ${isLeaf ? 'text-slate-700 cursor-pointer hover:text-purple-600' : 'font-medium text-slate-800'
                            } ${isSelected ? 'text-purple-600 font-medium' : ''}`}
                        onClick={() => isLeaf && toggleKnowledgePoint(node)}
                    >
                        {node.name}
                    </span>

                    {/* 叶子节点的标签 */}
                    {isLeaf && node.estimatedHours && (
                        <span className="text-xs text-slate-400">{node.estimatedHours}h</span>
                    )}
                </div>

                {/* 子节点 */}
                {hasChildren && isExpanded && (
                    <div className="ml-4 border-l-2 border-slate-100 pl-2 mt-1">
                        {node.children.map(child => renderTreeNode(child))}
                    </div>
                )}
            </div>
        );
    };

    // 保存路径
    const handleSave = () => {
        if (!pathName.trim()) {
            alert('请输入路径名称');
            return;
        }

        if (selectedKnowledgePoints.length === 0) {
            alert('请至少选择一个知识点');
            return;
        }

        const path = new LearningPath({
            id: isNewPath ? undefined : pathId,
            name: pathName,
            description: pathDescription,
            knowledgePoints: selectedKnowledgePoints.map(kp => kp.id),
            order: aiAnalysis?.recommendedOrder || selectedKnowledgePoints.map(kp => kp.id),
            aiSuggestions: aiAnalysis
        });

        PathManager.savePath(path);
        navigate('/teacher/path');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/teacher/path')}
                                className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">
                                    {isNewPath ? '创建学习路径' : '编辑学习路径'}
                                </h1>
                                <p className="text-sm text-slate-500">选择知识点并配置学习顺序</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={!pathName.trim() || selectedKnowledgePoints.length === 0}
                            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Check size={20} />
                            保存路径
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 基本信息 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">基本信息</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                路径名称 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={pathName}
                                onChange={(e) => setPathName(e.target.value)}
                                placeholder="例如：基础班学习路径"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                路径描述
                            </label>
                            <textarea
                                value={pathDescription}
                                onChange={(e) => setPathDescription(e.target.value)}
                                placeholder="描述这个学习路径的目标和适用人群"
                                rows={3}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 主要内容区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 左侧：知识点选择器 */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-800">选择知识点</h2>
                            <span className="text-sm text-slate-500">
                                已选择 <span className="font-bold text-purple-600">{selectedKnowledgePoints.length}</span> 个
                            </span>
                        </div>

                        {/* 树状选择器 */}
                        <div className="border border-slate-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                            {renderTreeNode(KNOWLEDGE_TREE)}
                        </div>

                        {/* 已选知识点列表 */}
                        {selectedKnowledgePoints.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-slate-800 mb-3">已选知识点</h3>
                                <div className="space-y-3">
                                    {selectedKnowledgePoints.map((kp, index) => {
                                        const resources = getResourcesForKnowledge(kp.id, SAMPLE_RESOURCES);

                                        return (
                                            <div
                                                key={kp.id}
                                                className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                                            >
                                                {/* 知识点基本信息 */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-sm font-bold text-slate-800">{kp.name}</span>
                                                        <span className="text-xs text-slate-500">{kp.estimatedHours}h</span>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleKnowledgePoint(kp)}
                                                        className="text-slate-400 hover:text-red-600 transition-colors"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>

                                                {/* 关联资源 */}
                                                {resources && resources.length > 0 && (
                                                    <div className="mt-3 pt-3 border-t border-purple-200">
                                                        <div className="text-xs text-purple-700 font-medium mb-2">
                                                            📚 关联资源 ({resources.length}个)
                                                        </div>
                                                        <div className="space-y-2">
                                                            {resources.map(resource => {
                                                                const typeInfo = RESOURCE_TYPES[resource.type];
                                                                return (
                                                                    <div
                                                                        key={resource.id}
                                                                        className="flex items-center gap-2 p-2 bg-white rounded-lg text-xs"
                                                                    >
                                                                        <span className="text-base">{typeInfo.icon}</span>
                                                                        <div className="flex-1">
                                                                            <div className="font-medium text-slate-700">
                                                                                {resource.title}
                                                                            </div>
                                                                            {resource.description && (
                                                                                <div className="text-slate-500 text-xs mt-0.5">
                                                                                    {resource.description.substring(0, 40)}...
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <span
                                                                            className="px-2 py-1 rounded text-xs font-medium"
                                                                            style={{
                                                                                backgroundColor: typeInfo.bgColor,
                                                                                color: typeInfo.color
                                                                            }}
                                                                        >
                                                                            {typeInfo.name}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 无资源提示 */}
                                                {(!resources || resources.length === 0) && (
                                                    <div className="mt-3 pt-3 border-t border-purple-200 text-xs text-purple-600">
                                                        暂无关联资源
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 右侧：AI分析 */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* AI分析卡片 */}
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={20} />
                                <h3 className="font-bold">AI 智能分析</h3>
                            </div>

                            {aiAnalysis ? (
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-purple-100 mb-1">难度评级</div>
                                        <div className="text-2xl font-bold">{aiAnalysis.difficulty}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-purple-100 mb-1">预估总学时</div>
                                        <div className="text-2xl font-bold">{aiAnalysis.totalHours} 小时</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-purple-100 mb-1">推荐资源</div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {aiAnalysis.resourceTypes.map((resource, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-white/20 rounded text-xs">
                                                    {resource}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-purple-100 text-sm">
                                    选择知识点后查看AI分析结果
                                </div>
                            )}
                        </div>

                        {/* 警告信息 */}
                        {aiAnalysis?.warnings && aiAnalysis.warnings.length > 0 && (
                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-orange-800 space-y-1">
                                        {aiAnalysis.warnings.map((warning, idx) => (
                                            <div key={idx}>• {warning}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 提示信息 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                                <BookOpen size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 space-y-1">
                                    <div className="font-bold mb-2">使用提示</div>
                                    <div>• 点击章节名称展开/收起</div>
                                    <div>• 勾选知识点添加到路径</div>
                                    <div>• AI会自动分析难度和推荐学习顺序</div>
                                    <div>• 保存后可在路径列表中管理</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherPathEditor;

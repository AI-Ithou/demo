import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Settings, BookOpen, AlertCircle, Eye, Plus, Trash2 } from 'lucide-react';
import { KNOWLEDGE_POINTS_LIBRARY, KNOWLEDGE_CATEGORIES, DIFFICULTY_INFO } from '../data/knowledge_points_library';

const TeacherPathConfiguration = () => {
    const navigate = useNavigate();

    // 状态管理
    const [selectedKnowledgePoints, setSelectedKnowledgePoints] = useState([]);
    const [difficultyAssignments, setDifficultyAssignments] = useState({
        simple: [],
        medium: [],
        hard: []
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [filterCategory, setFilterCategory] = useState('all');

    // 从localStorage加载已保存的配置
    useEffect(() => {
        const saved = localStorage.getItem('coursePathConfig');
        if (saved) {
            const config = JSON.parse(saved);
            setSelectedKnowledgePoints(config.selectedKnowledgePoints || []);
            setDifficultyAssignments(config.difficultyAssignments || {
                simple: [],
                medium: [],
                hard: []
            });
        }
    }, []);

    // 切换知识点选择
    const toggleKnowledgePoint = (kpId) => {
        setSelectedKnowledgePoints(prev => {
            if (prev.includes(kpId)) {
                // 取消选择时，也从难度分配中移除
                setDifficultyAssignments(prevAssign => ({
                    simple: prevAssign.simple.filter(id => id !== kpId),
                    medium: prevAssign.medium.filter(id => id !== kpId),
                    hard: prevAssign.hard.filter(id => id !== kpId)
                }));
                return prev.filter(id => id !== kpId);
            } else {
                return [...prev, kpId];
            }
        });
    };

    // 分配知识点到难度
    const assignToDifficulty = (difficulty, kpId) => {
        setDifficultyAssignments(prev => {
            const newAssign = { ...prev };

            // 从其他难度中移除
            Object.keys(newAssign).forEach(key => {
                newAssign[key] = newAssign[key].filter(id => id !== kpId);
            });

            // 添加到目标难度
            if (!newAssign[difficulty].includes(kpId)) {
                newAssign[difficulty] = [...newAssign[difficulty], kpId];
            }

            return newAssign;
        });
    };

    // 从难度中移除知识点
    const removeFromDifficulty = (difficulty, kpId) => {
        setDifficultyAssignments(prev => ({
            ...prev,
            [difficulty]: prev[difficulty].filter(id => id !== kpId)
        }));
    };

    // 保存配置
    const handleSave = () => {
        const config = {
            selectedKnowledgePoints,
            difficultyAssignments,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('coursePathConfig', JSON.stringify(config));
        alert('学习路径配置已保存！学生将看到对应的学习路径。');
        navigate(-1);
    };

    // 获取筛选后的知识点
    const filteredKnowledgePoints = filterCategory === 'all'
        ? KNOWLEDGE_POINTS_LIBRARY
        : KNOWLEDGE_POINTS_LIBRARY.filter(kp => kp.category === filterCategory);

    // 计算统计信息
    const getStats = (difficulty) => {
        const assigned = difficultyAssignments[difficulty];
        const totalHours = assigned.reduce((sum, kpId) => {
            const kp = KNOWLEDGE_POINTS_LIBRARY.find(k => k.id === kpId);
            return sum + (kp?.estimatedHours || 0);
        }, 0);
        return {
            count: assigned.length,
            hours: totalHours
        };
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                                    <Settings className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">学习路径配置</h1>
                                    <p className="text-sm text-slate-500">选择知识点并分配到不同难度</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={selectedKnowledgePoints.length === 0}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Check size={20} />
                            保存配置
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 步骤指示器 */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 1 ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-500'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>1</div>
                        <span className="font-medium">选择知识点</span>
                    </div>
                    <div className="w-8 h-0.5 bg-slate-200"></div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 2 ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-500'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>2</div>
                        <span className="font-medium">分配难度</span>
                    </div>
                </div>

                {/* 步骤1: 选择知识点 */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">从知识点库中选择</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    已选择 <span className="font-bold text-blue-600">{selectedKnowledgePoints.length}</span> 个知识点
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setFilterCategory('all')}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                                >
                                    全部
                                </button>
                                {KNOWLEDGE_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilterCategory(cat.name)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 知识点网格 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredKnowledgePoints.map(kp => {
                                const isSelected = selectedKnowledgePoints.includes(kp.id);
                                const categoryInfo = KNOWLEDGE_CATEGORIES.find(c => c.name === kp.category);

                                return (
                                    <div
                                        key={kp.id}
                                        onClick={() => toggleKnowledgePoint(kp.id)}
                                        className={`relative p-4 rounded-xl cursor-pointer transition-all ${isSelected
                                            ? 'bg-blue-50 border-2 border-blue-500 shadow-lg'
                                            : 'bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-md'
                                            }`}
                                    >
                                        {/* 选中标记 */}
                                        {isSelected && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}

                                        {/* 类别标签 */}
                                        <div
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold mb-3"
                                            style={{ backgroundColor: categoryInfo?.color + '20', color: categoryInfo?.color }}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryInfo?.color }}></div>
                                            {kp.category}
                                        </div>

                                        <h3 className="font-bold text-slate-800 mb-2">{kp.name}</h3>
                                        <p className="text-xs text-slate-600 mb-3 line-clamp-2">{kp.description}</p>

                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span>⏱️ {kp.estimatedHours}小时</span>
                                            <div className="flex gap-1">
                                                {kp.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 继续按钮 */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setCurrentStep(2)}
                                disabled={selectedKnowledgePoints.length === 0}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                下一步：分配难度
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* 步骤2: 分配难度 */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">为不同难度分配知识点</h2>
                                <p className="text-sm text-slate-500 mt-1">点击知识点选择难度级别</p>
                            </div>
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
                            >
                                返回选择
                            </button>
                        </div>

                        {/* 未分配的知识点 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <BookOpen size={20} />
                                待分配知识点
                                <span className="text-sm font-normal text-slate-500">
                                    ({selectedKnowledgePoints.filter(id =>
                                        !Object.values(difficultyAssignments).flat().includes(id)
                                    ).length} 个)
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {selectedKnowledgePoints
                                    .filter(id => !Object.values(difficultyAssignments).flat().includes(id))
                                    .map(kpId => {
                                        const kp = KNOWLEDGE_POINTS_LIBRARY.find(k => k.id === kpId);
                                        return (
                                            <div key={kpId} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                                <span className="flex-1 text-sm font-medium text-slate-700">
                                                    {kp?.name}
                                                </span>
                                                <select
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            assignToDifficulty(e.target.value, kpId);
                                                        }
                                                    }}
                                                    className="px-3 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    defaultValue=""
                                                >
                                                    <option value="">选择难度</option>
                                                    <option value="simple" style={{ color: DIFFICULTY_INFO.simple.color }}>
                                                        简单
                                                    </option>
                                                    <option value="medium" style={{ color: DIFFICULTY_INFO.medium.color }}>
                                                        中等
                                                    </option>
                                                    <option value="hard" style={{ color: DIFFICULTY_INFO.hard.color }}>
                                                        困难
                                                    </option>
                                                </select>
                                            </div>
                                        );
                                    })}
                                {selectedKnowledgePoints.filter(id =>
                                    !Object.values(difficultyAssignments).flat().includes(id)
                                ).length === 0 && (
                                        <div className="col-span-full text-center py-6 text-slate-400">
                                            <Check size={48} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">所有知识点已分配</p>
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* 难度分配区域 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(DIFFICULTY_INFO).map(([key, info]) => {
                                const stats = getStats(key);
                                const isInRange = stats.count >= info.recommendedCount.min && stats.count <= info.recommendedCount.max;

                                return (
                                    <div key={key} className="bg-white rounded-xl border-2 border-slate-200 p-6">
                                        {/* 难度标题 */}
                                        <div className="mb-4">
                                            <div
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold mb-2"
                                                style={{ backgroundColor: info.color + '20', color: info.color }}
                                            >
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }}></div>
                                                {info.label}难度
                                            </div>
                                            <p className="text-xs text-slate-500">{info.description}</p>
                                        </div>

                                        {/* 统计信息 */}
                                        <div className="bg-slate-50 rounded-lg p-3 mb-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-slate-600">知识点数量</span>
                                                <span className={`font-bold ${isInRange ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                    {stats.count} / {info.recommendedCount.min}-{info.recommendedCount.max}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">预估学时</span>
                                                <span className="font-bold text-slate-800">{stats.hours} 小时</span>
                                            </div>
                                        </div>

                                        {/* 知识点列表 */}
                                        <div className="space-y-2 min-h-[100px]">
                                            {difficultyAssignments[key].map((kpId, index) => {
                                                const kp = KNOWLEDGE_POINTS_LIBRARY.find(k => k.id === kpId);
                                                return (
                                                    <div
                                                        key={kpId}
                                                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-slate-400">{index + 1}</span>
                                                            <span className="text-sm font-medium text-slate-700">{kp?.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromDifficulty(key, kpId)}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={14} className="text-slate-400 hover:text-red-600" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            {difficultyAssignments[key].length === 0 && (
                                                <div className="text-center py-8 text-slate-400 text-sm">
                                                    未分配知识点
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 提示信息 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-blue-900 mb-2">配置提示</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• 简单难度建议选择3-5个基础知识点</li>
                                        <li>• 中等难度建议选择6-10个知识点，包含基础和进阶</li>
                                        <li>• 困难难度建议选择10个以上知识点，涵盖所有难度级别</li>
                                        <li>• 使用待分配区域的下拉菜单选择知识点的难度级别</li>
                                        <li>• 点击已分配知识点的 ✕ 可移除该知识点</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TeacherPathConfiguration;

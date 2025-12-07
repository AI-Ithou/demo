import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, BookOpen, Clock, AlertCircle, Copy, FileText } from 'lucide-react';
import { PathManager } from '../data/learning_path_config';

const TeacherPathManager = () => {
    const navigate = useNavigate();
    const [paths, setPaths] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    // 加载路径列表
    useEffect(() => {
        loadPaths();
    }, []);

    const loadPaths = () => {
        const allPaths = PathManager.getAllPaths();
        setPaths(allPaths);
    };

    // 删除路径
    const handleDelete = (pathId) => {
        PathManager.deletePath(pathId);
        loadPaths();
        setShowDeleteConfirm(null);
    };

    // 复制路径
    const handleDuplicate = (pathId) => {
        PathManager.duplicatePath(pathId);
        loadPaths();
    };

    // 格式化日期
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
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
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">学习地图管理</h1>
                                    <p className="text-sm text-slate-500">创建和管理多个学习地图</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/teacher/path/edit/new')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            创建新路径
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-100 text-sm font-medium">总路径数</span>
                            <BookOpen size={20} className="text-blue-100" />
                        </div>
                        <div className="text-3xl font-bold">{paths.length}</div>
                        <p className="text-blue-100 text-xs mt-1">已创建的学习地图</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-100 text-sm font-medium">总知识点</span>
                            <BookOpen size={20} className="text-emerald-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {paths.reduce((sum, p) => sum + (p.knowledgePoints?.length || 0), 0)}
                        </div>
                        <p className="text-emerald-100 text-xs mt-1">所有路径包含的知识点</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-100 text-sm font-medium">平均学时</span>
                            <Clock size={20} className="text-orange-100" />
                        </div>
                        <div className="text-3xl font-bold">
                            {paths.length > 0
                                ? Math.round(
                                    paths.reduce((sum, p) => sum + (p.aiSuggestions?.totalHours || 0), 0) /
                                    paths.length
                                )
                                : 0}
                        </div>
                        <p className="text-orange-100 text-xs mt-1">每个路径平均学时</p>
                    </div>
                </div>

                {/* 路径列表 */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">所有学习地图</h2>

                    {paths.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                            <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-800 mb-2">还没有创建任何学习地图</h3>
                            <p className="text-slate-500 mb-6">点击上方"创建新地图"开始配置您的第一个学习地图</p>
                            <button
                                onClick={() => navigate('/teacher/path/edit/new')}
                                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                            >
                                <Plus size={20} />
                                创建新路径
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paths.map((path) => (
                                <div
                                    key={path.id}
                                    className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all"
                                >
                                    {/* 路径头部 */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">{path.name}</h3>
                                            <p className="text-sm text-slate-600 line-clamp-2">{path.description || '暂无描述'}</p>
                                        </div>
                                        {path.aiSuggestions && (
                                            <span
                                                className="px-3 py-1 rounded-lg text-xs font-bold ml-3"
                                                style={{
                                                    backgroundColor:
                                                        path.aiSuggestions.difficulty === '基础'
                                                            ? '#10b98120'
                                                            : path.aiSuggestions.difficulty === '中等'
                                                                ? '#3b82f620'
                                                                : '#f43f5e20',
                                                    color:
                                                        path.aiSuggestions.difficulty === '基础'
                                                            ? '#10b981'
                                                            : path.aiSuggestions.difficulty === '中等'
                                                                ? '#3b82f6'
                                                                : '#f43f5e'
                                                }}
                                            >
                                                {path.aiSuggestions.difficulty}
                                            </span>
                                        )}
                                    </div>

                                    {/* 统计信息 */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <BookOpen size={14} className="text-slate-400" />
                                                <span className="text-xs text-slate-500">知识点</span>
                                            </div>
                                            <div className="text-xl font-bold text-slate-800">
                                                {path.knowledgePoints?.length || 0}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock size={14} className="text-slate-400" />
                                                <span className="text-xs text-slate-500">预估学时</span>
                                            </div>
                                            <div className="text-xl font-bold text-slate-800">
                                                {path.aiSuggestions?.totalHours || 0}h
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI推荐资源 */}
                                    {path.aiSuggestions?.resourceTypes && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-1">
                                                {path.aiSuggestions.resourceTypes.slice(0, 3).map((resource, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium"
                                                    >
                                                        {resource}
                                                    </span>
                                                ))}
                                                {path.aiSuggestions.resourceTypes.length > 3 && (
                                                    <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded text-xs">
                                                        +{path.aiSuggestions.resourceTypes.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 日期 */}
                                    <div className="text-xs text-slate-400 mb-4">
                                        创建于 {formatDate(path.createdAt)}
                                        {path.updatedAt !== path.createdAt && ` • 更新于 ${formatDate(path.updatedAt)}`}
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/teacher/path/edit/${path.id}`)}
                                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                                        >
                                            <Edit2 size={14} />
                                            编辑
                                        </button>
                                        <button
                                            onClick={() => navigate(`/teacher/lesson-plans/create?pathId=${path.id}`)}
                                            className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2 text-sm font-medium"
                                            title="生成教案"
                                        >
                                            <FileText size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDuplicate(path.id)}
                                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm font-medium"
                                            title="复制路径"
                                        >
                                            <Copy size={14} />
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(path.id)}
                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium"
                                            title="删除路径"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* 删除确认对话框 */}
                                    {showDeleteConfirm === path.id && (
                                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                                                <div className="flex items-start gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <AlertCircle size={20} className="text-red-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-800 mb-1">确认删除</h3>
                                                        <p className="text-sm text-slate-600">
                                                            确定要删除路径"{path.name}"吗？此操作无法撤销。
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setShowDeleteConfirm(null)}
                                                        className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                                    >
                                                        取消
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(path.id)}
                                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                                    >
                                                        删除
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TeacherPathManager;

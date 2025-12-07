import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Search, Filter, Download, Edit, Trash2, Copy, ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard, GradientButton } from '../components/uiverse';
import { getAllLessonPlans, deleteLessonPlan, duplicateLessonPlan, searchLessonPlans, getLessonPlanStats, updateLessonPlanStatus } from '../utils/lessonPlanStorage';
import { exportToWord, exportToPPT } from '../utils/documentExporter';

const LessonPlanManager = () => {
    const navigate = useNavigate();
    const [lessonPlans, setLessonPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [stats, setStats] = useState({ total: 0, draft: 0, published: 0, archived: 0 });
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [showExportMenu, setShowExportMenu] = useState(null);

    useEffect(() => {
        loadLessonPlans();
    }, []);

    useEffect(() => {
        filterPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, statusFilter, lessonPlans]);

    const loadLessonPlans = () => {
        const plans = getAllLessonPlans();
        setLessonPlans(plans);
        setStats(getLessonPlanStats());
    };

    const filterPlans = () => {
        const filters = statusFilter !== 'all' ? { status: statusFilter } : {};
        const results = searchLessonPlans(searchKeyword, filters);
        setFilteredPlans(results);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('确定要删除这个教案吗？此操作不可恢复。');
        if (confirmed) {
            deleteLessonPlan(id);
            loadLessonPlans();
        }
    };

    const handleDuplicate = (id) => {
        const newPlan = duplicateLessonPlan(id);
        if (newPlan) {
            loadLessonPlans();
            alert('教案复制成功！');
        }
    };

    const handleExport = async (plan, format) => {
        setShowExportMenu(null);
        try {
            if (format === 'word') {
                const result = await exportToWord(plan);
                if (result.success) {
                    alert('Word文档导出成功！');
                } else {
                    alert('导出失败：' + result.error);
                }
            } else if (format === 'ppt') {
                const result = await exportToPPT(plan, 'classic');
                if (result.success) {
                    alert('PPT文档导出成功！');
                } else {
                    alert('导出失败：' + result.error);
                }
            }
        } catch (error) {
            alert('导出失败：' + error.message);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        updateLessonPlanStatus(id, newStatus);
        loadLessonPlans();
    };

    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-700',
            published: 'bg-green-100 text-green-700',
            archived: 'bg-orange-100 text-orange-700'
        };
        return colors[status] || colors.draft;
    };

    const getStatusText = (status) => {
        const texts = {
            draft: '草稿',
            published: '已发布',
            archived: '已归档'
        };
        return texts[status] || '未知';
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 头部 */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">AI教案管理</h1>
                                <p className="text-sm text-slate-600">智能生成、编辑和管理教案</p>
                            </div>
                        </div>
                        <GradientButton
                            variant="primary"
                            size="large"
                            shimmer={true}
                            onClick={() => navigate('/teacher/lesson-plans/create')}
                        >
                            <Sparkles size={20} className="mr-2" />
                            创建新教案
                        </GradientButton>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* 统计卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    {[
                        { label: '总教案数', value: stats.total, color: 'blue', icon: FileText },
                        { label: '草稿', value: stats.draft, color: 'gray', icon: Edit },
                        { label: '已发布', value: stats.published, color: 'green', icon: Sparkles },
                        { label: '已归档', value: stats.archived, color: 'orange', icon: Calendar }
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        const colorMap = {
                            blue: 'from-blue-500 to-blue-600',
                            gray: 'from-gray-500 to-gray-600',
                            green: 'from-green-500 to-green-600',
                            orange: 'from-orange-500 to-orange-600'
                        };
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard variant="standard" hover={true} className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center`}>
                                            <Icon className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
                                    <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 搜索和筛选栏 */}
                <GlassCard variant="standard" className="p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="搜索教案标题或课程名称..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {['all', 'draft', 'published', 'archived'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        statusFilter === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    {status === 'all' ? '全部' : getStatusText(status)}
                                </button>
                            ))}
                        </div>
                    </div>
                </GlassCard>

                {/* 教案列表 */}
                {filteredPlans.length === 0 ? (
                    <GlassCard variant="standard" className="p-12 text-center">
                        <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">暂无教案</h3>
                        <p className="text-gray-600 mb-6">点击上方按钮创建您的第一个教案</p>
                    </GlassCard>
                ) : (
                    <div className="space-y-4">
                        {filteredPlans.map((plan, idx) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <GlassCard variant="standard" hover={true} className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3
                                                    className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
                                                    onClick={() => navigate(`/teacher/lesson-plans/edit/${plan.id}`)}
                                                >
                                                    {plan.title}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(plan.status)}`}>
                                                    {getStatusText(plan.status)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                                <span>课程：{plan.courseName}</span>
                                                <span>作者：{plan.metadata.author}</span>
                                                <span>课时：{plan.metadata.duration}分钟</span>
                                                <span>版本：V{plan.version}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>创建：{new Date(plan.metadata.createdAt).toLocaleString('zh-CN')}</span>
                                                <span>更新：{new Date(plan.metadata.updatedAt).toLocaleString('zh-CN')}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate(`/teacher/lesson-plans/edit/${plan.id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="编辑"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDuplicate(plan.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="复制"
                                            >
                                                <Copy size={18} />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowExportMenu(showExportMenu === plan.id ? null : plan.id)}
                                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="导出"
                                                >
                                                    <Download size={18} />
                                                </button>
                                                {showExportMenu === plan.id && (
                                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                        <button
                                                            onClick={() => handleExport(plan, 'word')}
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                                        >
                                                            导出Word
                                                        </button>
                                                        <button
                                                            onClick={() => handleExport(plan, 'ppt')}
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                                        >
                                                            导出PPT
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(plan.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="删除"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LessonPlanManager;

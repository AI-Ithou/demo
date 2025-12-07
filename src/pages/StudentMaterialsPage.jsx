import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye, Download, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import KNOWLEDGE_POINTS_LIST from '../data/knowledge_points_list';

const StudentMaterialsPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams(); // 获取课程ID
    const [selectedKnowledge, setSelectedKnowledge] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock资料数据（实际应该从教师端数据源读取）
    const materials = [
        {
            id: 1,
            title: 'Python基础语法讲义.pdf',
            type: 'PDF',
            size: '3.2MB',
            uploadTime: '2024-01-15',
            knowledgePoints: ['kp1', 'kp2'], // 关联的知识点ID
            description: 'Python语法基础知识讲解',
            downloads: 156,
            views: 328
        },
        {
            id: 2,
            title: '循环结构详解PPT',
            type: 'PPT',
            size: '8.5MB',
            uploadTime: '2024-01-14',
            knowledgePoints: ['kp3', 'kp5'],
            description: '循环结构和函数调用详细讲解',
            downloads: 89,
            views: 192
        },
        {
            id: 3,
            title: '数据结构应用视频',
            type: '视频',
            size: '45.3MB',
            uploadTime: '2024-01-12',
            knowledgePoints: ['kp7', 'kp8'],
            description: '列表、字典等数据结构的应用演示',
            downloads: 234,
            views: 567
        },
        {
            id: 4,
            title: '函数编程练习题',
            type: 'PDF',
            size: '1.2MB',
            uploadTime: '2024-01-10',
            knowledgePoints: ['kp4', 'kp6'],
            description: '函数定义、参数传递练习题集',
            downloads: 145,
            views: 289
        }
    ];

    // 根据知识点ID获取知识点名称
    const getKnowledgePointName = (kpId) => {
        const kp = KNOWLEDGE_POINTS_LIST.find(k => k.id === kpId);
        return kp ? kp.name : kpId;
    };

    // 筛选资料
    const filteredMaterials = materials.filter(material => {
        const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesKnowledge = selectedKnowledge === 'all' ||
            material.knowledgePoints.includes(selectedKnowledge);
        return matchesSearch && matchesKnowledge;
    });

    // 获取文件类型颜色
    const getTypeColor = (type) => {
        const colors = {
            'PDF': 'bg-red-50 text-red-600 border-red-200',
            'PPT': 'bg-orange-50 text-orange-600 border-orange-200',
            '视频': 'bg-purple-50 text-purple-600 border-purple-200',
            'Excel': 'bg-green-50 text-green-600 border-green-200'
        };
        return colors[type] || 'bg-gray-50 text-gray-600 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-bold">返回</span>
                        </button>
                        <div className="h-6 w-px bg-slate-300"></div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                                <BookOpen size={24} className="text-cyan-500" />
                                学习资料库
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">按知识点查找学习资料</p>
                        </div>
                    </div>

                    {/* 搜索栏 */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="搜索资料..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* 左侧 - 知识点筛选 */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-24">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter size={18} className="text-cyan-600" />
                                <h3 className="font-bold text-slate-800">按知识点筛选</h3>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedKnowledge('all')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${selectedKnowledge === 'all'
                                            ? 'bg-cyan-50 text-cyan-600 font-bold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    全部资料 ({materials.length})
                                </button>

                                {KNOWLEDGE_POINTS_LIST.map((kp) => {
                                    const count = materials.filter(m => m.knowledgePoints.includes(kp.id)).length;
                                    if (count === 0) return null;

                                    return (
                                        <button
                                            key={kp.id}
                                            onClick={() => setSelectedKnowledge(kp.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${selectedKnowledge === kp.id
                                                    ? 'bg-cyan-50 text-cyan-600 font-bold'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className="text-sm">{kp.name}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedKnowledge === kp.id
                                                    ? 'bg-cyan-100'
                                                    : 'bg-slate-100'
                                                }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 资料列表 */}
                    <div className="col-span-9">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            {filteredMaterials.length === 0 ? (
                                <div className="text-center py-12">
                                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                                    <p className="text-slate-500 mb-2">没有找到相关资料</p>
                                    <p className="text-sm text-slate-400">尝试更改筛选条件或搜索关键词</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredMaterials.map((material, idx) => (
                                        <motion.div
                                            key={material.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-cyan-300 transition-all group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    {/* 标题和类型 */}
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                                                            {material.title}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${getTypeColor(material.type)}`}>
                                                            {material.type}
                                                        </span>
                                                    </div>

                                                    {/* 描述 */}
                                                    <p className="text-sm text-slate-600 mb-3">
                                                        {material.description}
                                                    </p>

                                                    {/* 关联知识点标签 */}
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className="text-xs text-slate-500 font-medium">📌 知识点:</span>
                                                        {material.knowledgePoints.map((kpId) => (
                                                            <button
                                                                key={kpId}
                                                                onClick={() => setSelectedKnowledge(kpId)}
                                                                className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded-lg text-xs font-medium border border-cyan-200 hover:bg-cyan-100 transition-colors"
                                                            >
                                                                {getKnowledgePointName(kpId)}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* 元信息 */}
                                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                                        <span>📅 {material.uploadTime}</span>
                                                        <span>📦 {material.size}</span>
                                                        <span>👁️ {material.views} 浏览</span>
                                                        <span>📥 {material.downloads} 下载</span>
                                                    </div>
                                                </div>

                                                {/* 操作按钮 */}
                                                <div className="flex flex-col gap-2 ml-4">
                                                    <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2 text-sm font-bold">
                                                        <Eye size={16} />
                                                        预览
                                                    </button>
                                                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm font-bold">
                                                        <Download size={16} />
                                                        下载
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentMaterialsPage;

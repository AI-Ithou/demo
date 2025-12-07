import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2,
    FileText, Video, Image as ImageIcon, BookOpen, Lightbulb,
    ExternalLink, Download, Sparkles, RefreshCw, X, ZoomIn, ZoomOut,
    Presentation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Tooltip, message } from 'antd';

const TeachingPreviewMode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const resource = location.state?.resource;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(20); // Mock总页数
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showPPTOutline, setShowPPTOutline] = useState(false);
    const [isGeneratingPPT, setIsGeneratingPPT] = useState(false);

    // Mock AI推荐的相关资料（根据当前页面内容）
    const [aiRecommendations, setAiRecommendations] = useState([
        {
            id: 1,
            type: 'video',
            title: '波粒二象性实验演示视频',
            description: '双缝干涉实验的详细演示和解释',
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400',
            relevance: 95,
            duration: '8:30',
            tags: ['实验', '演示'],
            url: 'https://example.com/video.mp4'
        },
        {
            id: 2,
            type: 'image',
            title: '德布罗意波长公式推导图',
            description: '详细的数学推导过程图解',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
            relevance: 92,
            tags: ['公式', '推导'],
            url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800'
        },
        {
            id: 3,
            type: 'document',
            title: '量子力学发展史补充阅读',
            description: '从普朗克到薛定谔的历史脉络',
            thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
            relevance: 88,
            pages: 5,
            tags: ['历史', '背景'],
            url: 'https://example.com/doc.pdf'
        },
        {
            id: 4,
            type: 'h5',
            title: 'PhET量子波干涉模拟器',
            description: '交互式模拟实验，可调节参数观察现象',
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
            relevance: 97,
            tags: ['交互', '模拟'],
            url: 'https://phet.colorado.edu/sims/html/quantum-wave-interference/latest/quantum-wave-interference_zh_CN.html'
        },
        {
            id: 5,
            type: 'h5',
            title: 'Desmos数学绘图工具',
            description: '可视化数学函数和图形，辅助理解波函数',
            thumbnail: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=400',
            relevance: 89,
            tags: ['数学', '可视化'],
            url: 'https://www.desmos.com/calculator?lang=zh-CN'
        },
        {
            id: 6,
            type: 'case',
            title: '电子显微镜应用案例',
            description: '波粒二象性在现代科技中的实际应用',
            thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
            relevance: 85,
            tags: ['应用', '案例'],
            url: 'https://example.com/case.pdf'
        },
        {
            id: 7,
            type: 'h5',
            title: 'GeoGebra几何工具',
            description: '动态展示波的叠加和干涉现象',
            thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400',
            relevance: 86,
            tags: ['几何', '动态演示'],
            url: 'https://www.geogebra.org/classic?lang=zh_CN'
        },
        {
            id: 8,
            type: 'video',
            title: '诺贝尔奖获得者讲座片段',
            description: '关于量子力学基础的精彩讲解',
            thumbnail: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400',
            relevance: 90,
            duration: '12:15',
            tags: ['讲座', '深入'],
            url: 'https://example.com/lecture.mp4'
        }
    ]);

    // 根据页面变化模拟AI重新推荐
    useEffect(() => {
        // 模拟AI根据当前页面内容推荐相关资料
        console.log(`当前在第 ${currentPage} 页，AI正在分析内容并推荐相关资料...`);
    }, [currentPage]);

    // 刷新AI推荐
    const handleRefreshRecommendations = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            // 模拟重新生成推荐
            setAiRecommendations(prev => [...prev].sort(() => Math.random() - 0.5));
            setIsRefreshing(false);
        }, 1000);
    };

    // 生成PPT大纲
    const handleGeneratePPTOutline = () => {
        setIsGeneratingPPT(true);
        message.loading('AI正在分析文档并生成PPT大纲...');
        
        // 模拟AI生成过程
        setTimeout(() => {
            setShowPPTOutline(true);
            setIsGeneratingPPT(false);
            message.success('PPT大纲生成成功！');
        }, 2000);
    };

    // PPT大纲数据（基于当前文档内容AI生成）
    const pptOutline = [
        {
            slide: 1,
            type: 'cover',
            title: '波粒二象性',
            subtitle: '量子力学基础',
            notes: '开场白：介绍本节课的主题和学习目标'
        },
        {
            slide: 2,
            type: 'content',
            title: '目录',
            content: [
                '1. 光的波粒二象性',
                '2. 德布罗意假设',
                '3. 实验验证',
                '4. 应用与思考'
            ],
            notes: '概述本节课的主要内容结构'
        },
        {
            slide: 3,
            type: 'content',
            title: '1.1 光的波粒二象性',
            content: [
                '光的波动性：干涉、衍射现象',
                '光的粒子性：光电效应',
                '波粒二象性的统一：量子理论'
            ],
            images: ['双缝干涉实验图'],
            notes: '重点讲解：光既是波又是粒子，引入爱因斯坦光电效应理论'
        },
        {
            slide: 4,
            type: 'content',
            title: '1.2 德布罗意假设',
            content: [
                '1924年德布罗意提出大胆假设',
                '一切实物粒子都具有波粒二象性',
                '德布罗意波长公式：λ = h / p'
            ],
            formula: 'λ = h / p',
            notes: '强调：这是量子力学的重要基础，h为普朗克常数，p为动量'
        },
        {
            slide: 5,
            type: 'content',
            title: '公式详解',
            content: [
                'λ - 波长（米）',
                'h - 普朗克常数 (6.626×10⁻³⁴ J·s)',
                'p - 粒子动量 (kg·m/s)'
            ],
            notes: '通过具体数值帮助学生理解公式的物理意义'
        },
        {
            slide: 6,
            type: 'content',
            title: '1.3 实验验证',
            content: [
                '1927年戴维孙-革末实验',
                '电子衍射现象的观察',
                '证实了德布罗意假设的正确性'
            ],
            images: ['电子衍射实验装置', '衍射图样'],
            notes: '播放实验视频，展示电子的波动性'
        },
        {
            slide: 7,
            type: 'interactive',
            title: '互动环节：思考与讨论',
            content: [
                '为什么宏观物体的波动性难以观察？',
                '量子力学如何改变了我们对世界的认识？'
            ],
            notes: '引导学生讨论，培养科学思维'
        },
        {
            slide: 8,
            type: 'content',
            title: '现代应用',
            content: [
                '电子显微镜',
                '量子计算机',
                '半导体技术'
            ],
            notes: '联系实际应用，激发学习兴趣'
        },
        {
            slide: 9,
            type: 'summary',
            title: '课堂小结',
            content: [
                '光和实物粒子都具有波粒二象性',
                '德布罗意波长公式 λ = h / p',
                '实验验证了量子理论的正确性'
            ],
            notes: '总结本节课重点内容'
        },
        {
            slide: 10,
            type: 'homework',
            title: '课后作业',
            content: [
                '1. 计算电子的德布罗意波长',
                '2. 阅读：量子力学发展史',
                '3. 思考：量子纠缠现象'
            ],
            notes: '布置作业，预告下节课内容'
        }
    ];

    // 获取资源类型图标和颜色
    const getResourceTypeInfo = (type) => {
        const typeMap = {
            video: { icon: Video, label: '视频', color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
            image: { icon: ImageIcon, label: '图片', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
            document: { icon: FileText, label: '文档', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-600' },
            h5: { icon: ExternalLink, label: 'H5交互', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600' },
            case: { icon: BookOpen, label: '案例', color: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-600' }
        };
        return typeMap[type] || typeMap.document;
    };

    // 渲染推荐卡片
    const renderRecommendationCard = (item) => {
        const typeInfo = getResourceTypeInfo(item.type);
        const Icon = typeInfo.icon;

        return (
            <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedRecommendation(item)}
            >
                {/* 缩略图 */}
                <div className="relative h-32 overflow-hidden bg-slate-100">
                    <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 相关度标识 */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Sparkles size={10} />
                        {item.relevance}%
                    </div>
                    {/* 类型标识 */}
                    <div className={`absolute top-2 left-2 px-2 py-1 ${typeInfo.bgColor} backdrop-blur-sm rounded-lg flex items-center gap-1`}>
                        <Icon size={12} className={typeInfo.textColor} />
                        <span className={`text-xs font-medium ${typeInfo.textColor}`}>{typeInfo.label}</span>
                    </div>
                    {/* 时长/页数 */}
                    {item.duration && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                            {item.duration}
                        </div>
                    )}
                    {item.pages && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                            {item.pages}页
                        </div>
                    )}
                </div>

                {/* 内容 */}
                <div className="p-3">
                    <h3 className="font-bold text-sm text-slate-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                        {item.description}
                    </p>
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                            <Tag key={idx} className="text-xs m-0">{tag}</Tag>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* 顶部工具栏 */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800">
                                {resource?.title || '文档预览 - AI辅助教学模式'}
                            </h1>
                            <p className="text-xs text-slate-500">双屏模式：左侧文档预览 | 右侧AI智能推荐</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* PPT大纲生成按钮 */}
                        <button
                            onClick={handleGeneratePPTOutline}
                            disabled={isGeneratingPPT}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Presentation size={18} />
                            {isGeneratingPPT ? 'AI生成中...' : '生成PPT大纲'}
                        </button>
                        
                        {/* 缩放控制 */}
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                                className="p-1.5 hover:bg-white rounded transition-colors"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <span className="text-sm font-medium text-slate-600 px-2 min-w-[50px] text-center">
                                {zoomLevel}%
                            </span>
                            <button
                                onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
                                className="p-1.5 hover:bg-white rounded transition-colors"
                            >
                                <ZoomIn size={16} />
                            </button>
                        </div>

                        {/* 全屏切换 */}
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 主内容区域 - 双屏布局 */}
            <div className="flex h-[calc(100vh-73px)]">
                {/* 左侧：文档预览区 */}
                <div className="flex-1 flex flex-col bg-white border-r border-slate-200">
                    {/* 文档内容 */}
                    <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-50">
                        <div 
                            className="bg-white shadow-xl rounded-lg overflow-hidden"
                            style={{ 
                                transform: `scale(${zoomLevel / 100})`,
                                transformOrigin: 'center',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {/* Mock文档内容 */}
                            <div className="w-[210mm] min-h-[297mm] p-16 bg-white">
                                <h1 className="text-4xl font-bold text-slate-800 mb-6">第一章 波粒二象性</h1>
                                <div className="space-y-4 text-slate-700 leading-relaxed">
                                    <p className="text-lg">
                                        <strong>1.1 光的波粒二象性</strong>
                                    </p>
                                    <p>
                                        光既具有波动性，又具有粒子性，这种性质称为光的波粒二象性。
                                        这是量子力学的基本概念之一，由爱因斯坦在解释光电效应时提出。
                                    </p>
                                    <p className="text-lg mt-8">
                                        <strong>1.2 德布罗意假设</strong>
                                    </p>
                                    <p>
                                        1924年，德布罗意提出了一个大胆的假设：不仅光具有波粒二象性，
                                        一切实物粒子也都具有波粒二象性。
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                                        <p className="font-mono text-center text-xl">
                                            λ = h / p
                                        </p>
                                        <p className="text-sm text-slate-600 text-center mt-2">
                                            德布罗意波长公式
                                        </p>
                                    </div>
                                    <p>
                                        其中，λ表示波长，h是普朗克常数，p是粒子的动量。
                                    </p>
                                    <p className="text-lg mt-8">
                                        <strong>1.3 实验验证</strong>
                                    </p>
                                    <p>
                                        德布罗意假设很快就得到了实验验证。1927年，戴维孙和革末进行了
                                        电子衍射实验，证实了电子的波动性。
                                    </p>
                                </div>
                                <div className="mt-8 text-sm text-slate-400 text-center">
                                    第 {currentPage} 页 / 共 {totalPages} 页
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 底部翻页控制 */}
                    <div className="border-t border-slate-200 bg-white px-6 py-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 rounded-lg transition-colors"
                            >
                                <ChevronLeft size={18} />
                                上一页
                            </button>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-600">
                                    第 <input 
                                        type="number" 
                                        value={currentPage}
                                        onChange={(e) => {
                                            const page = parseInt(e.target.value);
                                            if (page >= 1 && page <= totalPages) {
                                                setCurrentPage(page);
                                            }
                                        }}
                                        className="w-16 px-2 py-1 border border-slate-300 rounded text-center"
                                    /> 页
                                </span>
                                <span className="text-sm text-slate-400">共 {totalPages} 页</span>
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 rounded-lg transition-colors"
                            >
                                下一页
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 右侧：AI推荐区 */}
                <div className="w-[480px] flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
                    {/* 推荐区标题 */}
                    <div className="px-6 py-4 bg-white border-b border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-800">AI智能推荐</h2>
                                    <p className="text-xs text-slate-500">根据当前页面内容推荐相关资料</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRefreshRecommendations}
                                disabled={isRefreshing}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <RefreshCw 
                                    size={16} 
                                    className={`text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <Tag color="purple">第{currentPage}页相关</Tag>
                            <Tag color="blue">{aiRecommendations.length}个推荐</Tag>
                        </div>
                    </div>

                    {/* 推荐列表 */}
                    <div className="flex-1 overflow-auto p-4 space-y-3">
                        <AnimatePresence mode="popLayout">
                            {aiRecommendations.map(item => renderRecommendationCard(item))}
                        </AnimatePresence>
                    </div>

                    {/* 底部提示 */}
                    <div className="px-6 py-3 bg-white border-t border-slate-200">
                        <div className="flex items-start gap-2 text-xs text-slate-500">
                            <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                            <p>
                                AI会根据您当前浏览的页面内容，实时推荐相关的视频、图片、案例等补充资料，
                                帮助学生更好地理解知识点。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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
                                        <p className="text-sm text-slate-500">基于当前文档内容智能生成，可直接导出为PPT</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            message.success('PPT大纲已复制到剪贴板！');
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                    >
                                        <Download size={16} />
                                        导出PPT
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
                                                        <Tag color={slide.type === 'cover' ? 'purple' : slide.type === 'summary' ? 'green' : slide.type === 'interactive' ? 'orange' : 'blue'}>
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
                                                    
                                                    {slide.formula && (
                                                        <div className="bg-white border border-purple-200 rounded-lg p-3 mb-3">
                                                            <p className="text-center font-mono text-lg text-purple-600">{slide.formula}</p>
                                                        </div>
                                                    )}
                                                    
                                                    {slide.images && slide.images.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            {slide.images.map((img, i) => (
                                                                <Tag key={i} icon={<ImageIcon size={12} />} color="blue">{img}</Tag>
                                                            ))}
                                                        </div>
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
                                    <span>此大纲由AI根据文档内容自动生成，您可以根据实际需要进行调整</span>
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

            {/* 推荐资源预览弹窗 */}
            <AnimatePresence>
                {selectedRecommendation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedRecommendation(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* 弹窗头部 */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const typeInfo = getResourceTypeInfo(selectedRecommendation.type);
                                        const Icon = typeInfo.icon;
                                        return (
                                            <div className={`w-10 h-10 ${typeInfo.bgColor} rounded-lg flex items-center justify-center`}>
                                                <Icon size={20} className={typeInfo.textColor} />
                                            </div>
                                        );
                                    })()}
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">{selectedRecommendation.title}</h3>
                                        <p className="text-sm text-slate-500">{selectedRecommendation.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedRecommendation(null)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* 弹窗内容 */}
                            <div className="p-6 max-h-[calc(90vh-140px)] overflow-auto">
                                {selectedRecommendation.type === 'h5' ? (
                                    <div className="w-full h-[600px] bg-slate-50 rounded-lg overflow-hidden">
                                        <iframe
                                            src={selectedRecommendation.url}
                                            className="w-full h-full border-0"
                                            title={selectedRecommendation.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                                        />
                                    </div>
                                ) : selectedRecommendation.type === 'video' ? (
                                    <div className="bg-black rounded-lg overflow-hidden">
                                        <video 
                                            controls 
                                            className="w-full"
                                            poster={selectedRecommendation.thumbnail}
                                        >
                                            <source src={selectedRecommendation.url} type="video/mp4" />
                                        </video>
                                    </div>
                                ) : selectedRecommendation.type === 'image' ? (
                                    <img 
                                        src={selectedRecommendation.thumbnail} 
                                        alt={selectedRecommendation.title}
                                        className="w-full rounded-lg"
                                    />
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText size={64} className="mx-auto text-slate-300 mb-4" />
                                        <p className="text-slate-500 mb-4">文档预览</p>
                                        <a
                                            href={selectedRecommendation.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            <Download size={18} />
                                            下载查看
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* 弹窗底部 */}
                            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedRecommendation.tags.map((tag, idx) => (
                                        <Tag key={idx}>{tag}</Tag>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={selectedRecommendation.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <ExternalLink size={16} />
                                        新窗口打开
                                    </a>
                                    <button
                                        onClick={() => setSelectedRecommendation(null)}
                                        className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                                    >
                                        关闭
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeachingPreviewMode;

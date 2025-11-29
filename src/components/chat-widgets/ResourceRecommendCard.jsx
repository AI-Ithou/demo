import React from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Image, Star, Clock, Eye, ChevronRight } from 'lucide-react';

/**
 * 资源推荐卡片组件 - 展示视频、文章、图表等学习资源
 */
const ResourceRecommendCard = ({ resources, onSelectResource }) => {
    if (!resources || resources.length === 0) return null;

    // 资源类型图标
    const getResourceIcon = (resource) => {
        if (resource.type === 'video' || resource.duration) return Play;
        if (resource.type === 'article' || resource.readTime) return FileText;
        if (resource.type === 'diagram' || resource.thumbnail) return Image;
        return FileText;
    };

    // 难度颜色
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'from-green-500 to-emerald-600';
            case 'intermediate': return 'from-yellow-500 to-orange-600';
            case 'advanced': return 'from-red-500 to-pink-600';
            default: return 'from-blue-500 to-purple-600';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-3"
        >
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* 顶部装饰 */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                <div className="p-6">
                    {/* 标题 */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/50">
                            <Star size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">精选学习资源</h3>
                            <p className="text-xs text-slate-400">为你推荐 {resources.length} 个优质资源</p>
                        </div>
                    </div>

                    {/* 资源列表 */}
                    <div className="space-y-3">
                        {resources.map((resource, index) => {
                            const Icon = getResourceIcon(resource);
                            const isVideo = resource.duration;
                            const isArticle = resource.readTime;

                            return (
                                <motion.div
                                    key={resource.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => onSelectResource?.(resource)}
                                    className="group relative bg-slate-900/50 hover:bg-slate-800/70 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                                >
                                    {/* 悬停发光效果 */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative flex gap-4">
                                        {/* 缩略图或图标 */}
                                        {resource.thumbnail ? (
                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                                <img
                                                    src={resource.thumbnail}
                                                    alt={resource.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                                />
                                                {isVideo && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                            <Play size={14} className="text-white fill-white ml-0.5" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className={`w-24 h-24 rounded-lg bg-gradient-to-br ${getDifficultyColor(resource.difficulty)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                <Icon size={32} className="text-white" />
                                            </div>
                                        )}

                                        {/* 资源信息 */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-white mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                                {resource.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                                                {resource.description}
                                            </p>

                                            {/* 元信息 */}
                                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                                {resource.difficulty && (
                                                    <span className={`px-2 py-0.5 rounded-full ${resource.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                                                            resource.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {resource.difficulty === 'beginner' ? '入门' :
                                                            resource.difficulty === 'intermediate' ? '进阶' : '高级'}
                                                    </span>
                                                )}
                                                {isVideo && (
                                                    <>
                                                        <span className="flex items-center gap-1 text-slate-500">
                                                            <Clock size={12} />
                                                            {resource.duration}
                                                        </span>
                                                        {resource.views && (
                                                            <span className="flex items-center gap-1 text-slate-500">
                                                                <Eye size={12} />
                                                                {resource.views}
                                                            </span>
                                                        )}
                                                        {resource.rating && (
                                                            <span className="flex items-center gap-1 text-yellow-500">
                                                                <Star size={12} fill="currentColor" />
                                                                {resource.rating}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                {isArticle && (
                                                    <span className="flex items-center gap-1 text-slate-500">
                                                        <Clock size={12} />
                                                        {resource.readTime}
                                                    </span>
                                                )}
                                                {resource.tags && resource.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 箭头图标 */}
                                        <div className="flex items-center">
                                            <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 底部提示 */}
                    <div className="mt-4 text-center text-xs text-slate-500">
                        点击任意资源开始学习
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResourceRecommendCard;

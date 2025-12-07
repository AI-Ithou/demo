import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, MessageCircle, Users } from 'lucide-react';
import { GlassCard } from './uiverse';

/**
 * 智能体卡片组件
 * @param {Object} agent - 智能体数据
 * @param {Object} statistics - 统计数据
 * @param {string} variant - 变体类型 'teacher' | 'student'
 * @param {Function} onClick - 点击事件
 */
const AgentCard = ({ agent, statistics, variant = 'student', onClick }) => {
    const colorMap = {
        blue: { gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-glow-blue', bg: 'bg-blue-50' },
        purple: { gradient: 'from-purple-500 to-pink-500', glow: 'shadow-glow-purple', bg: 'bg-purple-50' },
        green: { gradient: 'from-green-500 to-emerald-500', glow: 'shadow-glow-green', bg: 'bg-green-50' },
        orange: { gradient: 'from-orange-500 to-amber-500', glow: 'shadow-glow-orange', bg: 'bg-orange-50' },
        cyan: { gradient: 'from-cyan-500 to-teal-500', glow: 'shadow-glow-cyan', bg: 'bg-cyan-50' },
        amber: { gradient: 'from-amber-500 to-yellow-500', glow: 'shadow-glow-amber', bg: 'bg-amber-50' }
    };

    const colors = colorMap[agent.color] || colorMap.blue;

    // 渲染星星评分
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            );
        }
        if (hasHalfStar) {
            stars.push(
                <Star key="half" size={14} className="fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            );
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} size={14} className="text-gray-300" />
            );
        }
        return stars;
    };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <GlassCard
                onClick={onClick}
                variant="standard"
                hover={true}
                className="cursor-pointer overflow-hidden group h-full"
            >
                {/* 头像和背景 */}
                <div className="relative -m-6 mb-0 h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-24 h-24 object-contain drop-shadow-2xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        />
                    </div>
                    {/* 状态标识 */}
                    {agent.isActive && (
                        <div className="absolute top-4 right-4">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-gray-700">在线</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 内容区域 */}
                <div className="p-6 space-y-4">
                    {/* 名称和专业 */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                            {agent.name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {agent.specialty.slice(0, 3).map((spec, idx) => (
                                <span
                                    key={idx}
                                    className={`px-2.5 py-1 ${colors.bg} text-gray-700 rounded-lg text-xs font-medium`}
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {agent.description}
                    </p>

                    {/* 统计信息 */}
                    {statistics && (
                        <div className="pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-3">
                                {/* 评分 */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                        {renderStars(parseFloat(statistics.averageRating) || 0)}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <span className="font-bold text-gray-800">
                                            {statistics.averageRating || '0.0'}
                                        </span>
                                        <span>({statistics.totalRatings || 0})</span>
                                    </div>
                                </div>

                                {/* 使用次数 */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                                        <TrendingUp size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">使用次数</div>
                                        <div className="text-sm font-bold text-gray-800">
                                            {statistics.totalUsage || 0}
                                        </div>
                                    </div>
                                </div>

                                {variant === 'teacher' && (
                                    <>
                                        {/* 留言数 */}
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center`}>
                                                <MessageCircle size={16} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">留言数</div>
                                                <div className="text-sm font-bold text-gray-800">
                                                    {statistics.totalComments || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 能力标签 */}
                    {agent.capabilities && (
                        <div className="pt-2">
                            <div className="flex flex-wrap gap-1.5">
                                {agent.capabilities.slice(0, 3).map((capability, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                                        {capability}
                                    </span>
                                ))}
                                {agent.capabilities.length > 3 && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                        +{agent.capabilities.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 悬浮效果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
            </GlassCard>
        </motion.div>
    );
};

export default AgentCard;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * 统计数据卡片组件 - 带数字动画
 */
const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    trendValue,
    color = 'blue',
    delay = 0
}) => {
    const [displayValue, setDisplayValue] = useState(0);

    // 数字动画效果
    useEffect(() => {
        const numericValue = typeof value === 'string' ? parseInt(value) : value;
        if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
        }

        let start = 0;
        const duration = 1000; // 1秒
        const increment = numericValue / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    const colorClasses = {
        blue: 'from-blue-600 to-cyan-600',
        orange: 'from-orange-600 to-amber-600',
        green: 'from-emerald-600 to-teal-600',
        purple: 'from-purple-600 to-pink-600',
        red: 'from-rose-600 to-red-600'
    };

    const bgClasses = {
        blue: 'bg-blue-50',
        orange: 'bg-orange-50',
        green: 'bg-emerald-50',
        purple: 'bg-purple-50',
        red: 'bg-rose-50'
    };

    const iconColorClasses = {
        blue: 'text-blue-600',
        orange: 'text-orange-600',
        green: 'text-emerald-600',
        purple: 'text-purple-600',
        red: 'text-rose-600'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1"
        >
            {/* 背景装饰 */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-[0.03] rounded-bl-full`} />

            {/* 图标 */}
            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${bgClasses[color]} flex items-center justify-center`}>
                    {Icon && <Icon className={iconColorClasses[color]} size={24} />}
                </div>

                {/* 趋势指示器 */}
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${trend === 'up'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                        {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {trendValue}
                    </div>
                )}
            </div>

            {/* 数据 */}
            <div className="relative z-10">
                <div className="text-sm text-slate-500 mb-1 font-medium">{label}</div>
                <div className={`text-3xl font-black bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
                    {displayValue}
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;

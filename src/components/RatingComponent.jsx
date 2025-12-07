import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * 星级评分组件
 * @param {number} rating - 当前评分 0-5
 * @param {boolean} editable - 是否可编辑
 * @param {Function} onChange - 评分变化回调
 * @param {number} size - 星星大小
 * @param {boolean} showValue - 是否显示数值
 */
const RatingComponent = ({
    rating = 0,
    editable = false,
    onChange,
    size = 24,
    showValue = true
}) => {
    const [hoverRating, setHoverRating] = React.useState(0);
    const [currentRating, setCurrentRating] = React.useState(rating);

    React.useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const handleClick = (value) => {
        if (!editable) return;
        setCurrentRating(value);
        onChange?.(value);
    };

    const handleMouseEnter = (value) => {
        if (!editable) return;
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        if (!editable) return;
        setHoverRating(0);
    };

    const displayRating = editable ? (hoverRating || currentRating) : currentRating;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((value) => {
                    const isFilled = value <= displayRating;
                    const isHalf = !isFilled && value - 0.5 <= displayRating;

                    return (
                        <motion.button
                            key={value}
                            type="button"
                            onClick={() => handleClick(value)}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onMouseLeave={handleMouseLeave}
                            disabled={!editable}
                            whileHover={editable ? { scale: 1.2 } : {}}
                            whileTap={editable ? { scale: 0.9 } : {}}
                            className={`${editable ? 'cursor-pointer' : 'cursor-default'} transition-transform`}
                        >
                            <Star
                                size={size}
                                className={`transition-all duration-200 ${isFilled
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : isHalf
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : editable && hoverRating >= value
                                                ? 'fill-yellow-200 text-yellow-200'
                                                : 'fill-transparent text-gray-300'
                                    }`}
                                style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : {}}
                            />
                        </motion.button>
                    );
                })}
            </div>
            {showValue && (
                <span className="text-sm font-semibold text-gray-700 tabular-nums min-w-[2rem]">
                    {displayRating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default RatingComponent;

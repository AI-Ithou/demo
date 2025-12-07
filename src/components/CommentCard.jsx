import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Reply, MoreVertical } from 'lucide-react';
import { GlassCard } from './uiverse';
import RatingComponent from './RatingComponent';

/**
 * 留言卡片组件
 * @param {Object} comment - 留言数据
 * @param {Function} onLike - 点赞回调
 * @param {Function} onReply - 回复回调
 * @param {Function} onDelete - 删除回调
 * @param {boolean} showActions - 是否显示操作按钮
 * @param {string} currentUserId - 当前用户ID
 * @param {boolean} selectable - 是否展示选择框
 * @param {boolean} selected - 是否被选中
 * @param {Function} onSelectToggle - 选择切换回调
 * @param {boolean} showAuditStatus - 是否展示审核状态
 */
const CommentCard = ({
    comment,
    onLike,
    onReply,
    onDelete,
    showActions = true,
    currentUserId,
    selectable = false,
    selected = false,
    onSelectToggle,
    showAuditStatus = false
}) => {
    const [showReplyInput, setShowReplyInput] = React.useState(false);
    const [replyText, setReplyText] = React.useState('');
    const [showMenu, setShowMenu] = React.useState(false);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return '刚刚';
        if (minutes < 60) return `${minutes}分钟前`;
        if (hours < 24) return `${hours}小时前`;
        if (days < 30) return `${days}天前`;

        return date.toLocaleDateString('zh-CN');
    };

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply?.(comment.id, replyText);
            setReplyText('');
            setShowReplyInput(false);
        }
    };

    const isLiked = comment.likedBy?.includes(currentUserId);
    const auditStatusMap = {
        approved: { label: '已通过', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        rejected: { label: '已驳回', color: 'bg-red-50 text-red-600 border-red-100' },
        pending: { label: '待审核', color: 'bg-amber-50 text-amber-600 border-amber-100' }
    };
    const auditInfo = auditStatusMap[comment.auditStatus] || auditStatusMap.pending;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <GlassCard variant="standard" className="p-6 space-y-4">
                {/* 用户信息 */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        {selectable && (
                            <label className="pt-1">
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => onSelectToggle?.(comment.id)}
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                            </label>
                        )}
                        <img
                            src={comment.studentAvatar}
                            alt={comment.studentName}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-800">
                                    {comment.studentName}
                                </span>
                                {comment.rating && (
                                    <RatingComponent
                                        rating={comment.rating}
                                        size={14}
                                        showValue={false}
                                        editable={false}
                                    />
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                                {formatTime(comment.createdAt)}
                            </span>
                        </div>
                        {showAuditStatus && (
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${auditInfo.color}`}>
                                {auditInfo.label}
                            </span>
                        )}
                    </div>

                    {/* 更多菜单 */}
                    {showActions && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <MoreVertical size={16} className="text-gray-500" />
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <button
                                        onClick={() => {
                                            onDelete?.(comment.id);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        删除留言
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 留言内容 */}
                <div className="text-gray-700 leading-relaxed pl-13">
                    {comment.content}
                </div>
                {showAuditStatus && comment.auditRemark && (
                    <div className="pl-13 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                        审核备注：{comment.auditRemark}
                    </div>
                )}

                {/* 操作按钮 */}
                {showActions && (
                    <div className="flex items-center gap-4 pl-13 pt-2">
                        <motion.button
                            onClick={() => onLike?.(comment.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${isLiked
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ThumbsUp
                                size={14}
                                className={isLiked ? 'fill-blue-600' : ''}
                            />
                            <span className="text-xs font-medium">
                                {comment.likes > 0 ? comment.likes : '赞'}
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={() => setShowReplyInput(!showReplyInput)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Reply size={14} />
                            <span className="text-xs font-medium">回复</span>
                        </motion.button>
                    </div>
                )}

                {/* 回复输入框 */}
                {showReplyInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-13 space-y-2"
                    >
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="写下你的回复..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition-all"
                            rows={3}
                        />
                        <div className="flex items-center gap-2 justify-end">
                            <button
                                onClick={() => {
                                    setShowReplyInput(false);
                                    setReplyText('');
                                }}
                                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                取消
                            </button>
                            <button
                                onClick={handleReplySubmit}
                                disabled={!replyText.trim()}
                                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                回复
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 回复列表 */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-13 space-y-3 pt-3 border-t border-gray-100">
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                                    教
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-gray-800 text-sm">
                                            {reply.teacherName}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatTime(reply.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {reply.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </GlassCard>
        </motion.div>
    );
};

export default CommentCard;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, X, Filter, SortDesc } from 'lucide-react';
import { GlassCard } from '../components/uiverse';
import CommentCard from '../components/CommentCard';
import {
    getAgentById,
    getAgentComments,
    addReply,
    likeComment,
    deleteComment
} from '../utils/agentStorage';

const TeacherAgentComments = () => {
    const navigate = useNavigate();
    const { agentId } = useParams();
    const [agent, setAgent] = useState(null);
    const [comments, setComments] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('latest'); // latest, oldest, mostLiked, highestRating

    useEffect(() => {
        loadData();
    }, [agentId]);

    useEffect(() => {
        filterAndSortComments();
    }, [comments, searchTerm, filterRating, sortBy]);

    const loadData = () => {
        const agentData = getAgentById(agentId);
        const commentsData = getAgentComments(agentId);
        setAgent(agentData);
        setComments(commentsData);
    };

    const filterAndSortComments = () => {
        let filtered = [...comments];

        // 搜索过滤
        if (searchTerm) {
            filtered = filtered.filter(comment =>
                comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 评分过滤
        if (filterRating !== 'all') {
            filtered = filtered.filter(comment => comment.rating === parseInt(filterRating));
        }

        // 排序
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return b.createdAt - a.createdAt;
                case 'oldest':
                    return a.createdAt - b.createdAt;
                case 'mostLiked':
                    return b.likes - a.likes;
                case 'highestRating':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return 0;
            }
        });

        setFilteredComments(filtered);
    };

    const handleReply = (commentId, replyText) => {
        addReply(commentId, {
            teacherId: 'teacher-001',
            teacherName: '高田由',
            content: replyText
        });
        loadData();
    };

    const handleLike = (commentId) => {
        likeComment(commentId, 'teacher-001');
        loadData();
    };

    const handleDelete = (commentId) => {
        if (window.confirm('确定要删除这条留言吗？')) {
            deleteComment(commentId);
            loadData();
        }
    };

    if (!agent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">加载中...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* 头部 */}
            <header className="bg-white/75 backdrop-blur-2xl border-b border-gray-200/30 shadow-glass sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => navigate('/teacher/agents')}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            whileHover={{ x: -4 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </motion.button>
                        <div className="flex items-center gap-4 flex-1">
                            <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{agent.name} - 留言板</h1>
                                <p className="text-gray-600 mt-1">
                                    共 {comments.length} 条留言
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* 搜索和筛选 */}
                <GlassCard variant="standard" className="p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 搜索框 */}
                        <div className="flex-1 relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="搜索留言内容或学生姓名..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* 评分筛选 */}
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-500" />
                            <select
                                value={filterRating}
                                onChange={(e) => setFilterRating(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                <option value="all">全部评分</option>
                                <option value="5">5星</option>
                                <option value="4">4星</option>
                                <option value="3">3星</option>
                                <option value="2">2星</option>
                                <option value="1">1星</option>
                            </select>
                        </div>

                        {/* 排序 */}
                        <div className="flex items-center gap-2">
                            <SortDesc size={20} className="text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                            >
                                <option value="latest">最新</option>
                                <option value="oldest">最早</option>
                                <option value="mostLiked">最多赞</option>
                                <option value="highestRating">最高评分</option>
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {/* 留言列表 */}
                <div className="space-y-4">
                    {filteredComments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            onLike={handleLike}
                            onReply={handleReply}
                            onDelete={handleDelete}
                            showActions={true}
                            currentUserId="teacher-001"
                        />
                    ))}
                </div>

                {filteredComments.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            {searchTerm || filterRating !== 'all' ? '没有找到匹配的留言' : '暂无留言'}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TeacherAgentComments;

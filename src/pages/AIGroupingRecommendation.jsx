import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Users, TrendingUp, Award } from 'lucide-react';
import { AIGroupRecommender, GROUP_STRATEGIES } from '../data/ai_group_recommender';
import { MOCK_STUDENTS } from '../data/student_path_data';

const AIGroupingRecommendation = () => {
    const navigate = useNavigate();
    const [selectedStrategy, setSelectedStrategy] = useState('mentor');
    const [recommendation, setRecommendation] = useState(null);

    // 生成推荐
    const handleGenerate = () => {
        const result = AIGroupRecommender.generateRecommendations(selectedStrategy);
        setRecommendation(result);
    };

    // 采纳分组
    const handleAdopt = (group) => {
        alert(`已采纳分组: ${group.name}`);
        // TODO: 保存到localStorage或后端
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
                                    <Sparkles className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800">AI智能学习小组推荐</h1>
                                    <p className="text-sm text-slate-500">基于学生能力的智能分组建议</p>
                                </div>
                            </div>
                        </div>
                        {!recommendation && (
                            <button
                                onClick={handleGenerate}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-xl transition-all shadow-lg flex items-center gap-2"
                            >
                                <Sparkles size={20} />
                                生成AI推荐
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* 策略选择 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">选择分组策略</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(GROUP_STRATEGIES).slice(0, 2).map(strategy => (
                            <div
                                key={strategy.id}
                                onClick={() => setSelectedStrategy(strategy.id)}
                                className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${selectedStrategy === strategy.id
                                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                                    : 'border-slate-200 hover:border-purple-300 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: strategy.color + '20' }}
                                    >
                                        {strategy.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800">{strategy.name}</h3>
                                        {selectedStrategy === strategy.id && (
                                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center absolute top-4 right-4">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600">{strategy.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 推荐结果 */}
                {recommendation && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">
                                AI推荐方案 - {GROUP_STRATEGIES[recommendation.strategy].name}
                            </h2>
                            <span className="text-sm text-slate-500">
                                共 {recommendation.groupCount} 个小组
                            </span>
                        </div>

                        {recommendation.groups.map((group, index) => (
                            <div
                                key={group.id}
                                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all"
                            >
                                {/* 组头部 */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">{group.name}</h3>
                                            <p className="text-sm text-slate-500">{group.members.length}名成员</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm text-slate-500">匹配度</span>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-lg ${i < Math.round(group.stats.compatibilityScore * 5)
                                                            ? 'text-yellow-500'
                                                            : 'text-slate-300'
                                                            }`}
                                                    >
                                                        ⭐
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">
                                            {(group.stats.compatibilityScore * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                {/* 组统计 */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-blue-600 mb-1">平均能力</div>
                                        <div className="text-xl font-bold text-blue-700">{group.stats.avgAbility}</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-green-600 mb-1">最高能力</div>
                                        <div className="text-xl font-bold text-green-700">{group.stats.maxAbility}</div>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-orange-600 mb-1">最低能力</div>
                                        <div className="text-xl font-bold text-orange-700">{group.stats.minAbility}</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-purple-600 mb-1">能力差距</div>
                                        <div className="text-xl font-bold text-purple-700">{group.stats.abilityRange}</div>
                                    </div>
                                </div>

                                {/* 成员列表 */}
                                <div className="space-y-3 mb-6">
                                    {group.members.map(member => {
                                        const student = MOCK_STUDENTS.find(s => s.id === member.id);
                                        return (
                                            <div
                                                key={member.id}
                                                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
                                            >
                                                <img
                                                    src={student?.avatar}
                                                    alt={member.name}
                                                    className="w-12 h-12 rounded-full border-2 border-white shadow"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-800">{member.name}</h4>
                                                        {member.role === 'mentor' && (
                                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                                                导师
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                                                        <span>综合能力: {member.abilities.overall}</span>
                                                        <span>学习风格: {member.learningStyle === 'visual' ? '视觉型' : member.learningStyle === 'logical' ? '逻辑型' : '实战型'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* 配对信息（传帮带） */}
                                {group.pairings && group.pairings.length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                        <h4 className="font-bold text-blue-900 mb-3">配对关系</h4>
                                        <div className="space-y-2">
                                            {group.pairings.map((pairing, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm">
                                                    <span className="font-medium text-blue-800">{pairing.mentorName}</span>
                                                    <span className="text-blue-600">→</span>
                                                    <span className="text-blue-700">{pairing.learnerName}</span>
                                                    <span className="text-xs text-blue-600">
                                                        (辅导: {pairing.focusAreas.join(', ')})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 共同目标（强强联合） */}
                                {group.sharedGoals && group.sharedGoals.length > 0 && (
                                    <div className="bg-purple-50 rounded-xl p-4 mb-6">
                                        <h4 className="font-bold text-purple-900 mb-3">共同目标</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {group.sharedGoals.map((goal, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-purple-200 text-purple-800 rounded-lg text-sm font-medium"
                                                >
                                                    {goal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 操作按钮 */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAdopt(group)}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-xl transition-all"
                                    >
                                        采纳分组
                                    </button>
                                    <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                                        调整成员
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 空状态 */}
                {!recommendation && (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                        <Sparkles size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 mb-2">选择分组策略并生成AI推荐</h3>
                        <p className="text-slate-500 mb-6">AI将分析学生能力、学习风格和目标，推荐最优分组方案</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AIGroupingRecommendation;

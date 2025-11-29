import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, Clock, ArrowRight } from 'lucide-react';

/**
 * 随堂练习卡片组件 - 交互式练习题展示
 */
const PracticeCard = ({ practiceSet, onComplete, onSkip }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    if (!practiceSet || !practiceSet.exercises || practiceSet.exercises.length === 0) {
        return null;
    }

    const currentQuestion = practiceSet.exercises[currentQuestionIndex];
    const totalQuestions = practiceSet.exercises.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // 处理答案选择
    const handleAnswer = (answer) => {
        if (showResult) return;

        setUserAnswers({
            ...userAnswers,
            [currentQuestion.id]: answer
        });
    };

    // 提交当前题目
    const handleSubmit = () => {
        const userAnswer = userAnswers[currentQuestion.id];
        if (userAnswer === undefined) return;

        const isCorrect = userAnswer === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(score + currentQuestion.points);
        }

        setShowResult(true);

        // 2秒后自动进入下一题
        setTimeout(() => {
            if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowResult(false);
            } else {
                // 完成所有题目
                onComplete?.({
                    score,
                    totalScore: practiceSet.exercises.reduce((sum, q) => sum + q.points, 0),
                    answers: userAnswers
                });
            }
        }, 2000);
    };

    const userAnswer = userAnswers[currentQuestion.id];
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-3"
        >
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* 顶部装饰 */}
                <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

                <div className="p-6">
                    {/* 头部信息 */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/50">
                                <Trophy size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{practiceSet.title}</h3>
                                <p className="text-xs text-slate-400">
                                    题目 {currentQuestionIndex + 1}/{totalQuestions} · {practiceSet.estimatedTime}分钟
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onSkip}
                            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            跳过
                        </button>
                    </div>

                    {/* 进度条 */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-400">完成进度</span>
                            <span className="text-xs font-bold text-amber-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        </div>
                    </div>

                    {/* 题目内容 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* 题目 */}
                            <div className="bg-slate-900/50 rounded-xl p-5 mb-4 border border-white/5">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="text-2xl font-bold text-amber-500">Q</span>
                                    <p className="flex-1 text-sm text-white leading-relaxed pt-1">
                                        {currentQuestion.question}
                                    </p>
                                </div>

                                {/* 标签 */}
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                            currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                        }`}>
                                        {currentQuestion.difficulty === 'easy' ? '简单' :
                                            currentQuestion.difficulty === 'medium' ? '中等' : '困难'}
                                    </span>
                                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                                        {currentQuestion.points} 分
                                    </span>
                                    {currentQuestion.timeLimit && (
                                        <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full text-xs flex items-center gap-1">
                                            <Clock size={10} />
                                            {currentQuestion.timeLimit}秒
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 选项 */}
                            {currentQuestion.type === 'choice' && (
                                <div className="space-y-3 mb-5">
                                    {currentQuestion.options.map((option, index) => {
                                        const isSelected = userAnswer === index;
                                        const isCorrectOption = index === currentQuestion.correctAnswer;

                                        let buttonClass = 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 text-slate-300';

                                        if (showResult) {
                                            if (isCorrectOption) {
                                                buttonClass = 'bg-green-500/20 border-green-500/50 text-green-300';
                                            } else if (isSelected && !isCorrectOption) {
                                                buttonClass = 'bg-red-500/20 border-red-500/50 text-red-300';
                                            } else {
                                                buttonClass = 'bg-slate-700/20 border-slate-600/30 text-slate-500';
                                            }
                                        } else if (isSelected) {
                                            buttonClass = 'bg-amber-500/20 border-amber-500/50 text-amber-300';
                                        }

                                        return (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={showResult}
                                                whileHover={!showResult ? { scale: 1.01 } : {}}
                                                whileTap={!showResult ? { scale: 0.99 } : {}}
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${buttonClass}`}
                                            >
                                                <span className="text-sm font-medium">{option}</span>
                                                {showResult && isCorrectOption && (
                                                    <CheckCircle size={20} className="text-green-400" />
                                                )}
                                                {showResult && isSelected && !isCorrectOption && (
                                                    <XCircle size={20} className="text-red-400" />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* 判断题 */}
                            {currentQuestion.type === 'true-false' && (
                                <div className="flex gap-3 mb-5">
                                    {[true, false].map((value) => {
                                        const isSelected = userAnswer === value;
                                        const isCorrectOption = value === currentQuestion.correctAnswer;

                                        let buttonClass = 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 text-slate-300';

                                        if (showResult) {
                                            if (isCorrectOption) {
                                                buttonClass = 'bg-green-500/20 border-green-500/50 text-green-300';
                                            } else if (isSelected) {
                                                buttonClass = 'bg-red-500/20 border-red-500/50 text-red-300';
                                            }
                                        } else if (isSelected) {
                                            buttonClass = 'bg-amber-500/20 border-amber-500/50 text-amber-300';
                                        }

                                        return (
                                            <button
                                                key={value.toString()}
                                                onClick={() => handleAnswer(value)}
                                                disabled={showResult}
                                                className={`flex-1 p-4 rounded-xl border-2 transition-all font-bold ${buttonClass}`}
                                            >
                                                {value ? '正确 ✓' : '错误 ✗'}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* 解析 */}
                            {showResult && currentQuestion.explanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-slate-900/70 rounded-xl p-4 mb-5 border border-white/5"
                                >
                                    <div className="flex items-start gap-2">
                                        {isCorrect ? (
                                            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <h4 className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                                {isCorrect ? '回答正确!' : '回答错误'}
                                            </h4>
                                            <p className="text-xs text-slate-300 leading-relaxed">
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* 提交按钮 */}
                    {!showResult && (
                        <button
                            onClick={handleSubmit}
                            disabled={userAnswer === undefined}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {currentQuestionIndex < totalQuestions - 1 ? '提交并继续' : '提交答案'}
                            <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PracticeCard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Award, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * 评测卡片组件 - 综合评测和能力分析
 * 注意: 简化版,不使用雷达图以避免额外依赖
 */

/**
 * 评测卡片组件 - 综合评测和能力分析
 */
const AssessmentCard = ({ assessment, onComplete, onSkip }) => {
    const [currentStep, setCurrentStep] = useState('intro'); // intro, testing, result
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [result, setResult] = useState(null);

    if (!assessment) return null;

    // 开始评测
    const handleStart = () => {
        setCurrentStep('testing');
        setTimeRemaining(assessment.timeLimit);

        // 启动计时器
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 回答问题
    const handleAnswer = (answer) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);

        // 自动进入下一题
        if (currentQuestionIndex < assessment.questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 300);
        }
    };

    // 完成评测
    const handleFinish = () => {
        // 计算分数和能力分析
        let totalScore = 0;
        let maxScore = 0;
        const dimensionScores = {};

        assessment.questions.forEach((q, index) => {
            maxScore += q.points;
            const isCorrect = userAnswers[index] === q.correctAnswer;
            if (isCorrect) {
                totalScore += q.points;
                dimensionScores[q.dimension] = (dimensionScores[q.dimension] || 0) + q.points;
            }
        });

        const percentage = (totalScore / maxScore) * 100;
        const passed = percentage >= assessment.passingScore;

        setResult({
            totalScore,
            maxScore,
            percentage: percentage.toFixed(1),
            passed,
            dimensionScores
        });

        setCurrentStep('result');
        onComplete?.(result);
    };

    // 格式化时间
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // 介绍页面
    if (currentStep === 'intro') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl mt-3"
            >
                <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                                <Target size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{assessment.title}</h3>
                                <p className="text-sm text-slate-400">{assessment.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">
                                    {assessment.questions.length}
                                </div>
                                <div className="text-xs text-slate-400">题目数量</div>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-center">
                                <div className="text-2xl font-bold text-cyan-400 mb-1">
                                    {Math.floor(assessment.timeLimit / 60)}
                                </div>
                                <div className="text-xs text-slate-400">分钟时长</div>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 text-center">
                                <div className="text-2xl font-bold text-teal-400 mb-1">
                                    {assessment.passingScore}%
                                </div>
                                <div className="text-xs text-slate-400">及格分数</div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-blue-300 leading-relaxed">
                                    <p className="font-bold mb-1">评测说明:</p>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>评测开始后将自动计时,请合理安排时间</li>
                                        <li>每题只有一次作答机会,请仔细思考后选择</li>
                                        <li>评测结束后将生成详细的能力分析报告</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onSkip}
                                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-sm transition-all"
                            >
                                稍后再测
                            </button>
                            <button
                                onClick={handleStart}
                                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 flex items-center justify-center gap-2"
                            >
                                开始评测
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // 测试页面
    if (currentStep === 'testing') {
        const currentQuestion = assessment.questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-2xl mt-3"
            >
                <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                    <div className="p-6">
                        {/* 顶部信息栏 */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-400">
                                    {currentQuestionIndex + 1} / {assessment.questions.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                                <Clock size={14} className="text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-400">
                                    {formatTime(timeRemaining)}
                                </span>
                            </div>
                        </div>

                        {/* 进度条 */}
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* 题目 */}
                        <div className="bg-slate-900/50 rounded-xl p-5 mb-5 border border-white/5">
                            <p className="text-base text-white leading-relaxed mb-3">
                                {currentQuestion.question}
                            </p>
                            <span className="text-xs text-emerald-400 font-medium">
                                {currentQuestion.points} 分
                            </span>
                        </div>

                        {/* 选项 */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = userAnswers[currentQuestionIndex] === index;

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                            : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 text-slate-300'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{option}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* 完成按钮 */}
                        {currentQuestionIndex === assessment.questions.length - 1 && userAnswers[currentQuestionIndex] !== undefined && (
                            <button
                                onClick={handleFinish}
                                className="w-full mt-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
                            >
                                完成评测
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    // 结果页面 (简化版,不使用雷达图以避免依赖问题)
    if (currentStep === 'result' && result) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl mt-3"
            >
                <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className={`h-1 ${result.passed ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`} />

                    <div className="p-6">
                        {/* 结果标题 */}
                        <div className="text-center mb-6">
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${result.passed
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/50'
                                : 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-900/50'
                                }`}>
                                {result.passed ? (
                                    <CheckCircle2 size={40} className="text-white" />
                                ) : (
                                    <TrendingUp size={40} className="text-white" />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {result.passed ? '评测通过!' : '继续加油!'}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {result.passed ? '你已经很好地掌握了这个知识点' : '还有提升空间,继续努力'}
                            </p>
                        </div>

                        {/* 分数展示 */}
                        <div className="bg-slate-900/50 rounded-xl p-6 mb-6 border border-white/5 text-center">
                            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                                {result.percentage}%
                            </div>
                            <div className="text-sm text-slate-400">
                                {result.totalScore} / {result.maxScore} 分
                            </div>
                        </div>

                        {/* 建议 */}
                        <div className={`rounded-xl p-4 mb-6 ${result.passed
                            ? 'bg-emerald-500/10 border border-emerald-500/30'
                            : 'bg-orange-500/10 border border-orange-500/30'
                            }`}>
                            <div className="flex items-start gap-3">
                                <Award size={20} className={result.passed ? 'text-emerald-400' : 'text-orange-400'} />
                                <div className="flex-1">
                                    <h4 className={`text-sm font-bold mb-1 ${result.passed ? 'text-emerald-400' : 'text-orange-400'}`}>
                                        学习建议
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        {result.passed
                                            ? '恭喜!你已经完全掌握了这个知识点,可以进入下一章学习。'
                                            : '建议重新学习相关内容,并多做练习来巩固理解。'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => onComplete?.(result)}
                            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
                        >
                            继续学习
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return null;
};

export default AssessmentCard;

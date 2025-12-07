import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, FileImage, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentHomeworkPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [activeTab, setActiveTab] = useState('todo'); // todo, submitted
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [wholePaperMode, setWholePaperMode] = useState(false);
    const fileInputRef = useRef(null);

    // Mock作业数据
    const [homework, setHomework] = useState({
        id: 1,
        title: 'Python基础练习 - 第3次作业',
        dueDate: '2024-01-20',
        totalScore: 100,
        questions: [
            {
                id: 'q1',
                number: 1,
                content: '请编写一个Python程序，计算1到100的所有偶数之和。',
                score: 20,
                answer: null, // 学生答案
                imageUrl: null, // 上传的图片
                recognizedText: null, // AI识别的文本
                status: 'todo' // todo, uploaded, recognized
            },
            {
                id: 'q2',
                number: 2,
                content: '定义一个函数，接受一个列表作为参数，返回列表中的最大值和最小值。',
                score: 25,
                answer: null,
                imageUrl: null,
                recognizedText: null,
                status: 'todo'
            },
            {
                id: 'q3',
                number: 3,
                content: '编写程序实现冒泡排序算法，并对列表[64, 34, 25, 12, 22, 11, 90]进行排序。',
                score: 30,
                answer: null,
                imageUrl: null,
                recognizedText: null,
                status: 'todo'
            },
            {
                id: 'q4',
                number: 4,
                content: '使用递归实现斐波那契数列的第n项。',
                score: 25,
                answer: null,
                imageUrl: null,
                recognizedText: null,
                status: 'todo'
            }
        ],
        submittedAt: null
    });

    // 模拟AI识别
    const simulateAIRecognition = (questionId) => {
        setIsRecognizing(true);

        setTimeout(() => {
            const mockCode = `def solution():
    # 这是AI识别的代码
    result = sum(i for i in range(1, 101) if i % 2 == 0)
    return result

print(solution())`;

            setHomework(prev => ({
                ...prev,
                questions: prev.questions.map(q =>
                    q.id === questionId
                        ? {
                            ...q,
                            recognizedText: mockCode,
                            answer: mockCode,
                            status: 'recognized'
                        }
                        : q
                )
            }));

            setIsRecognizing(false);
            setSelectedQuestion(null);
        }, 2000);
    };

    // 处理单题图片上传
    const handleQuestionImageUpload = (questionId, event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setHomework(prev => ({
                ...prev,
                questions: prev.questions.map(q =>
                    q.id === questionId
                        ? { ...q, imageUrl: e.target.result, status: 'uploaded' }
                        : q
                )
            }));

            setSelectedQuestion(questionId);
            // 自动触发AI识别
            simulateAIRecognition(questionId);
        };
        reader.readAsDataURL(file);
    };

    // 处理整卷上传
    const handleWholePaperUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsRecognizing(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            // 模拟AI自动分配到各题
            setTimeout(() => {
                const mockAnswers = [
                    'sum = 0\nfor i in range(1, 101):\n    if i % 2 == 0:\n        sum += i\nprint(sum)',
                    'def find_max_min(lst):\n    return max(lst), min(lst)',
                    'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr',
                    'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)'
                ];

                setHomework(prev => ({
                    ...prev,
                    questions: prev.questions.map((q, idx) => ({
                        ...q,
                        imageUrl: e.target.result,
                        recognizedText: mockAnswers[idx],
                        answer: mockAnswers[idx],
                        status: 'recognized'
                    }))
                }));

                setIsRecognizing(false);
                setWholePaperMode(false);
            }, 3000);
        };
        reader.readAsDataURL(file);
    };

    // 提交作业
    const handleSubmitHomework = () => {
        const answeredCount = homework.questions.filter(q => q.answer).length;
        if (answeredCount === 0) {
            alert('请至少完成一道题目');
            return;
        }

        if (window.confirm(`确定提交作业吗？已完成 ${answeredCount}/${homework.questions.length} 题`)) {
            setHomework(prev => ({
                ...prev,
                submittedAt: new Date().toISOString()
            }));
        }
    };

    const completedCount = homework.questions.filter(q => q.status === 'recognized').length;
    const progress = (completedCount / homework.questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="font-bold">返回</span>
                            </button>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {homework.title}
                                </h1>
                                <p className="text-sm text-slate-500">截止日期: {homework.dueDate} | 总分: {homework.totalScore}分</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {!homework.submittedAt && (
                                <button
                                    onClick={() => {
                                        setWholePaperMode(true);
                                        fileInputRef.current?.click();
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <FileImage size={18} />
                                    整卷上传
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={wholePaperMode ? handleWholePaperUpload : null}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* 进度条 */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">完成进度</span>
                            <span className="font-bold text-purple-600">{completedCount}/{homework.questions.length} 题</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* AI识别loading */}
            <AnimatePresence>
                {isRecognizing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
                            <div className="flex flex-col items-center">
                                <Loader className="w-16 h-16 text-purple-600 animate-spin mb-4" />
                                <h3 className="text-xl font-bold text-slate-800 mb-2">AI正在识别中...</h3>
                                <p className="text-slate-500 text-sm text-center">
                                    {wholePaperMode ? '正在识别整份试卷并自动分配到各题目' : '正在识别图片中的代码和文字'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {homework.submittedAt ? (
                    /* 已提交状态 */
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8 text-center">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">作业已提交!</h2>
                        <p className="text-slate-600 mb-4">
                            提交时间: {new Date(homework.submittedAt).toLocaleString('zh-CN')}
                        </p>
                        <p className="text-sm text-slate-500">
                            已完成 {completedCount}/{homework.questions.length} 题，等待老师批改
                        </p>
                    </div>
                ) : (
                    /* 题目列表 */
                    <div className="space-y-6">
                        {homework.questions.map((question, idx) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-white rounded-2xl shadow-lg border-2 p-6 ${question.status === 'recognized'
                                        ? 'border-green-300'
                                        : question.status === 'uploaded'
                                            ? 'border-purple-300'
                                            : 'border-slate-200'
                                    }`}
                            >
                                {/* 题目头部 */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold">
                                                第 {question.number} 题
                                            </span>
                                            <span className="text-sm text-slate-500">{question.score}分</span>
                                            {question.status === 'recognized' && (
                                                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                                    <CheckCircle size={16} />
                                                    已识别
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-800 font-medium">{question.content}</p>
                                    </div>
                                </div>

                                {/* 图片上传区域 */}
                                {!question.imageUrl ? (
                                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleQuestionImageUpload(question.id, e)}
                                            className="hidden"
                                            id={`upload-${question.id}`}
                                        />
                                        <label
                                            htmlFor={`upload-${question.id}`}
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-12 h-12 text-purple-400 mb-3" />
                                            <p className="text-sm font-medium text-slate-700 mb-1">点击上传答案图片</p>
                                            <p className="text-xs text-slate-500">支持手写或打印的代码截图</p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* 上传的图片 */}
                                        <div className="relative rounded-xl overflow-hidden border-2 border-purple-200">
                                            <img
                                                src={question.imageUrl}
                                                alt="答案"
                                                className="w-full max-h-96 object-contain bg-gray-50"
                                            />
                                            <button
                                                onClick={() => {
                                                    setHomework(prev => ({
                                                        ...prev,
                                                        questions: prev.questions.map(q =>
                                                            q.id === question.id
                                                                ? { ...q, imageUrl: null, recognizedText: null, answer: null, status: 'todo' }
                                                                : q
                                                        )
                                                    }));
                                                }}
                                                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                                            >
                                                重新上传
                                            </button>
                                        </div>

                                        {/* AI识别结果 */}
                                        {question.recognizedText && (
                                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CheckCircle className="text-green-600" size={20} />
                                                    <h4 className="font-bold text-green-800">AI识别结果</h4>
                                                </div>
                                                <pre className="bg-slate-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                                                    <code>{question.recognizedText}</code>
                                                </pre>
                                                <p className="text-xs text-green-600 mt-2">
                                                    ✓ 识别完成，可以继续下一题或修改答案
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* 提交按钮 */}
                        <div className="flex items-center justify-center gap-4 pt-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-8 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
                            >
                                暂存草稿
                            </button>
                            <button
                                onClick={handleSubmitHomework}
                                disabled={completedCount === 0}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${completedCount === 0
                                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                                    }`}
                            >
                                提交作业 ({completedCount}/{homework.questions.length})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentHomeworkPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { KNOWLEDGE_LIST_DATA, LIST_COMMENTARY } from '../data/knowledge_list_data';
import { CheckCircle, AlertCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

const KnowledgeListPage = () => {
    const navigate = useNavigate();

    const getStatusConfig = (status) => {
        switch (status) {
            case 'mastered':
                return { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', label: '熟练' };
            case 'fuzzy':
                return { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', label: '良好' };
            case 'unknown':
                return { icon: HelpCircle, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', label: '待加强' };
            default:
                return { icon: HelpCircle, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', label: '未知' };
        }
    };

    const handleNext = () => {
        navigate('/attitude-assessment');
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-8 max-w-6xl mx-auto">
            {/* Left: List View */}
            <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                    知识掌握度清单
                </h2>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 space-y-3">
                    {KNOWLEDGE_LIST_DATA.map((item, index) => {
                        const config = getStatusConfig(item.status);
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center justify-between p-4 rounded-xl border ${config.border} ${config.bg} hover:bg-opacity-80 transition-colors`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full bg-white ${config.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-800">{item.label}</h3>
                                        <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.score}%` }}
                                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                className={`h-full rounded-full ${item.status === 'mastered' ? 'bg-emerald-500' : item.status === 'fuzzy' ? 'bg-amber-500' : 'bg-slate-400'}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-sm font-bold ${config.color}`}>
                                    {config.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Commentary & Next Step */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-xl relative flex-1"
                >
                    <div className="absolute -top-6 left-8">
                        <DigitalTeacherAvatar size="md" state="speaking" />
                    </div>

                    <div className="mt-12">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Sparkles className="text-yellow-500" size={20} />
                            老师点评
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            “{LIST_COMMENTARY}”
                        </p>
                    </div>
                </motion.div>

                <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                >
                    下一步：态度评估
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default KnowledgeListPage;

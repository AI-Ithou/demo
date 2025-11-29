import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import DigitalTeacherAvatar from '../components/DigitalTeacherAvatar';
import { ABILITY_DATA, RADAR_COMMENTARY } from '../data/ability_radar_data';
import { ArrowRight, Sparkles } from 'lucide-react';

const AbilityRadarPage = () => {
    const navigate = useNavigate();
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        // Animate chart appearance
        setTimeout(() => setShowChart(true), 500);
    }, []);

    const handleNext = () => {
        navigate('/knowledge-nebula');
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] gap-8 max-w-5xl mx-auto">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">学习能力画像</h2>
                <p className="text-slate-500">基于刚才的对话与思维步骤分析</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 w-full">
                {/* Radar Chart */}
                <div className="flex-1 w-full h-[400px] relative flex items-center justify-center bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-indigo-50/50 blur-3xl rounded-full" />

                    {showChart && (
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_DATA}>
                                <PolarGrid stroke="#cbd5e1" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 14 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="能力值"
                                    dataKey="A"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fill="#818cf8"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Commentary Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="w-full md:w-1/3 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-xl relative"
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
                            “{RADAR_COMMENTARY}”
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <button
                            onClick={handleNext}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                        >
                            下一步：知识点评估
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AbilityRadarPage;

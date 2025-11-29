import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UiverseCard, UiverseButton } from '../components/uiverse';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { difficulty, userType } = location.state || { difficulty: 'medium', userType: 'logical' };

    const handleNavigate = (section) => {
        navigate('/report', { state: { difficulty, userType, scrollTo: section } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl text-slate-800">炎枢平台</span>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-slate-600 hover:text-slate-900 transition-colors"><BellOutlined style={{ fontSize: '20px' }} /></button>
                    <button className="text-slate-600 hover:text-slate-900 transition-colors"><SettingOutlined style={{ fontSize: '20px' }} /></button>
                    <Avatar size={40} icon={<UserOutlined />} className="bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer" />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
                        欢迎回来,同学!
                    </h1>
                    <p className="text-slate-600 text-lg">
                        当前模式:{difficulty === 'hard' ? '困难' : difficulty === 'simple' ? '简单' : '中等'} |
                        学习风格:{userType === 'visual' ? '视觉型' : userType === 'academic' ? '实战型' : '逻辑型'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Learning Path */}
                    <UiverseCard variant="glass" hoverable>
                        <div className="p-6">
                            <div className="h-40 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
                                    alt="Learning Path"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">我的学习路径</h3>
                            <p className="text-slate-600 text-xs leading-relaxed mb-6 h-8 line-clamp-2">
                                查看你的专属AI定制学习旅程。
                            </p>
                            <UiverseButton
                                variant="gradient"
                                size="medium"
                                onClick={() => navigate('/my-learning-path')}
                                className="w-full"
                            >
                                进入学习路径
                            </UiverseButton>
                        </div>
                    </UiverseCard>

                    {/* Card 2: Learning Trajectory */}
                    <UiverseCard variant="glass" hoverable>
                        <div className="p-6">
                            <div className="h-40 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
                                    alt="History"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">我的学习轨迹</h3>
                            <p className="text-slate-600 text-xs leading-relaxed mb-6 h-8 line-clamp-2">
                                回顾你的历史学习足迹与行为明细。
                            </p>
                            <UiverseButton
                                variant="animated"
                                size="medium"
                                onClick={() => navigate('/my-learning-trajectory')}
                                className="w-full"
                            >
                                查看学习轨迹
                            </UiverseButton>
                        </div>
                    </UiverseCard>

                    {/* Card 3: Report */}
                    <UiverseCard variant="glass" hoverable>
                        <div className="p-6">
                            <div className="h-40 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                                    alt="Report"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">我的学习报告</h3>
                            <p className="text-slate-600 text-xs leading-relaxed mb-6 h-8 line-clamp-2">
                                分析你的学习数据,评估当前表现。
                            </p>
                            <UiverseButton
                                variant="primary"
                                size="medium"
                                onClick={() => navigate('/learning-report/overview')}
                                className="w-full"
                            >
                                查看详细报告
                            </UiverseButton>
                        </div>
                    </UiverseCard>

                    {/* Card 4: Error Log (New) */}
                    <UiverseCard variant="glass" hoverable>
                        <div className="p-6">
                            <div className="h-40 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop"
                                    alt="Error Log"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">AI 错题本</h3>
                            <p className="text-slate-600 text-xs leading-relaxed mb-6 h-8 line-clamp-2">
                                智能诊断薄弱点,个性化推荐补救。
                            </p>
                            <UiverseButton
                                variant="primary"
                                size="medium"
                                onClick={() => navigate('/error-log')}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 border-none"
                            >
                                进入错题本
                            </UiverseButton>
                        </div>
                    </UiverseCard>
                </div>
            </main>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

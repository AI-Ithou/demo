import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Space } from 'antd';
import { RocketOutlined, ThunderboltOutlined, FireOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Header from '../components/Header';

const { Title, Text } = Typography;

const GoalSetting = () => {
    const navigate = useNavigate();

    const goals = [
        {
            id: 'simple',
            title: '简单模式',
            description: '轻松入门，打好基础',
            icon: <RocketOutlined className="text-4xl text-green-500" />,
            color: 'hover:border-green-500 hover:shadow-green-100',
            bg: 'bg-green-50',
        },
        {
            id: 'medium',
            title: '中等模式',
            description: '循序渐进，稳步提升',
            icon: <ThunderboltOutlined className="text-4xl text-blue-500" />,
            color: 'hover:border-blue-500 hover:shadow-blue-100',
            bg: 'bg-blue-50',
        },
        {
            id: 'hard',
            title: '困难模式',
            description: '挑战自我，突破极限',
            icon: <FireOutlined className="text-4xl text-red-500" />,
            color: 'hover:border-red-500 hover:shadow-red-100',
            bg: 'bg-red-50',
        },
    ];

    const handleSelect = (level) => {
        // In a real app, we might save the selected level here
        console.log('Selected level:', level);
        navigate('/goal-selection', { state: { level } });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-4xl w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 flex items-center text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeftOutlined className="mr-2" /> 返回
                    </button>

                    <div className="text-center mb-12">
                        <Title level={2} style={{ marginBottom: '1rem' }}>设定你的学习目标</Title>
                        <Text type="secondary" className="text-lg">选择适合你的挑战难度，开启个性化学习之旅</Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {goals.map((goal) => (
                            <div
                                key={goal.id}
                                onClick={() => handleSelect(goal.id)}
                                className={`
                  cursor-pointer bg-white rounded-2xl p-8 border-2 border-transparent transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1
                  ${goal.color}
                  flex flex-col items-center text-center group
                `}
                            >
                                <div className={`w-20 h-20 rounded-full ${goal.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {goal.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h3>
                                <p className="text-gray-500">{goal.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalSetting;

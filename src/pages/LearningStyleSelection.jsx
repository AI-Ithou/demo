import React from 'react';
import { RobotOutlined, FormOutlined } from '@ant-design/icons';
import ProgressBar from '../components/ProgressBar';
import SelectionCard from '../components/SelectionCard';

const LearningStyleSelection = () => {
    const handleChatClick = () => {
        console.log('Selected: Chat with AI');
    };

    const handleQuestionnaireClick = () => {
        console.log('Selected: Questionnaire');
    };

    return (
        <main className="flex-1 flex flex-col items-center py-12 px-4 w-full max-w-7xl mx-auto">
            <ProgressBar />

            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                    选择一种方式，让我更好地了解你
                </h1>
                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    你可以与我自由对话，或完成一份快速问卷。AI将分析你的语言习惯、思考模式和学习偏好，
                    <br className="hidden md:block" />
                    为后续的个性化摸底提供依据。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
                <SelectionCard
                    icon={<RobotOutlined style={{ fontSize: '32px', color: '#2563EB' }} />}
                    title="与 AI 对话"
                    description="通过开放式对话，展现你的个性和思维方式。"
                    buttonText="开始对话"
                    buttonType="primary"
                    onClick={handleChatClick}
                />
                <SelectionCard
                    icon={<FormOutlined style={{ fontSize: '32px', color: '#2563EB' }} />}
                    title="填写问卷"
                    description="通过结构化问题，快速定位你的学习偏好。"
                    buttonText="开始问卷"
                    buttonType="default"
                    onClick={handleQuestionnaireClick}
                />
            </div>

            <p className="text-slate-400 text-sm text-center">
                你可以选择完成其中一项，或两项都完成以获得更精准的分析结果。
            </p>
        </main>
    );
};

export default LearningStyleSelection;

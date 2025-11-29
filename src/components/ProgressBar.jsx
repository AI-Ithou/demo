import React from 'react';
import { Progress } from 'antd';

const ProgressBar = () => {
    return (
        <div className="w-full max-w-3xl mb-16">
            <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="font-bold text-slate-900">Step 1/3:</span>
                <span className="text-slate-500">了解你的学习风格</span>
            </div>
            <Progress
                percent={33.3}
                showInfo={false}
                strokeColor="#2563EB"
                trailColor="#E2E8F0"
                size="small"
            />
        </div>
    );
};

export default ProgressBar;

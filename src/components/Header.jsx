import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Header = () => {
    return (
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2563EB" />
                    <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-bold text-lg text-slate-900">炎枢平台</span>
            </div>
            <Button
                type="text"
                shape="circle"
                icon={<QuestionCircleOutlined style={{ fontSize: '20px', color: '#64748B' }} />}
                aria-label="帮助"
            />
        </header>
    );
};

export default Header;

import React from 'react';
import { UiverseCard, UiverseButton } from './uiverse';

const SelectionCard = ({ icon, title, description, buttonText, buttonType = 'primary', onClick }) => {
    return (
        <UiverseCard variant="border-gradient" hoverable className="max-w-sm">
            <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
                <p className="text-slate-600 mb-8 text-base leading-relaxed flex-grow">
                    {description}
                </p>
                <UiverseButton
                    variant={buttonType === 'default' ? 'secondary' : 'primary'}
                    size="large"
                    onClick={onClick}
                    className="w-full"
                >
                    {buttonText}
                </UiverseButton>
            </div>
        </UiverseCard>
    );
};

export default SelectionCard;

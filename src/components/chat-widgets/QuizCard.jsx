import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { UiverseButton } from '../uiverse';

const QuizCard = ({ question, options, correctAnswer, onAnswer, onSkip }) => {
    const [selected, setSelected] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (index) => {
        if (isSubmitted) return;
        setSelected(index);
    };

    const handleSubmit = () => {
        if (selected === null) return;
        setIsSubmitted(true);
        onAnswer(selected === correctAnswer);
    };

    return (
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-lg w-full max-w-md mt-2">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-800 flex-1 text-lg">{question}</h4>
                <button
                    onClick={onSkip}
                    className="text-xs text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 ml-2 whitespace-nowrap transition-colors"
                >
                    跳过
                </button>
            </div>
            <div className="space-y-3">
                {options.map((option, index) => {
                    let stateClass = "border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-300";
                    if (selected === index) {
                        stateClass = "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100";
                    }
                    if (isSubmitted) {
                        if (index === correctAnswer) {
                            stateClass = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100";
                        } else if (selected === index && index !== correctAnswer) {
                            stateClass = "border-rose-500 bg-rose-50 text-rose-700 shadow-md shadow-rose-100";
                        } else {
                            stateClass = "opacity-50 bg-slate-50";
                        }
                    }

                    return (
                        <motion.button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-medium ${stateClass}`}
                            whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                            whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                        >
                            <span>{option}</span>
                            {isSubmitted && index === correctAnswer && <CheckCircle size={20} className="flex-shrink-0" />}
                            {isSubmitted && selected === index && index !== correctAnswer && <XCircle size={20} className="flex-shrink-0" />}
                        </motion.button>
                    );
                })}
            </div>
            {!isSubmitted && (
                <UiverseButton
                    variant="gradient"
                    size="medium"
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="mt-6 w-full"
                >
                    提交答案
                </UiverseButton>
            )}
        </div>
    );
};

export default QuizCard;

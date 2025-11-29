import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const LogicGameCard = ({ onComplete, onSkip }) => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, showing, playing, success, fail

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newSeq = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));
        setSequence(newSeq);
        setUserSequence([]);
        setStatus('showing');
        playSequence(newSeq);
    };

    const playSequence = async (seq) => {
        for (let i = 0; i < seq.length; i++) {
            await new Promise(r => setTimeout(r, 500));
            highlightButton(seq[i]);
            await new Promise(r => setTimeout(r, 500));
        }
        setStatus('playing');
    };

    const highlightButton = (index) => {
        const btn = document.getElementById(`game-btn-${index}`);
        if (btn) {
            btn.classList.add('ring-4', 'ring-indigo-400', 'scale-110');
            setTimeout(() => {
                btn.classList.remove('ring-4', 'ring-indigo-400', 'scale-110');
            }, 300);
        }
    };

    const handleClick = (index) => {
        if (status !== 'playing') return;

        highlightButton(index);
        const newSeq = [...userSequence, index];
        setUserSequence(newSeq);

        if (newSeq[newSeq.length - 1] !== sequence[newSeq.length - 1]) {
            setStatus('fail');
            return;
        }

        if (newSeq.length === sequence.length) {
            setStatus('success');
            onComplete && onComplete(true);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm w-full max-w-xs mt-2">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-800">记忆力挑战</h4>
                <div className="flex gap-2">
                    <button onClick={onSkip} className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-100">
                        跳过
                    </button>
                    <button onClick={startNewGame} className="text-slate-400 hover:text-indigo-600">
                        <RefreshCw size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {[0, 1, 2, 3].map((i) => (
                    <button
                        key={i}
                        id={`game-btn-${i}`}
                        onClick={() => handleClick(i)}
                        className={`
              h-16 rounded-lg transition-all duration-200
              ${i === 0 ? 'bg-rose-400' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-emerald-400' : 'bg-amber-400'}
              hover:opacity-80 active:scale-95
            `}
                    />
                ))}
            </div>

            <div className="text-center text-sm font-medium h-6">
                {status === 'showing' && <span className="text-indigo-500">请记住顺序...</span>}
                {status === 'playing' && <span className="text-slate-500">轮到你了！</span>}
                {status === 'success' && <span className="text-emerald-500">太棒了！挑战成功！</span>}
                {status === 'fail' && <span className="text-rose-500">哎呀，错了。再试一次？</span>}
            </div>
        </div>
    );
};

export default LogicGameCard;

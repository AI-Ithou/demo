import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoCard = ({ title, duration, onComplete, onSkip }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const hasCompleted = React.useRef(false);

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            // Simulate video playing
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        if (!hasCompleted.current) {
                            hasCompleted.current = true;
                            onComplete && onComplete();
                        }
                        return 100;
                    }
                    return prev + 1; // Fast forward for demo
                });
            }, 50);
        }
    };

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden w-full max-w-md mt-2 shadow-md group relative">
            <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
                {/* Placeholder for actual video */}
                <div className="text-slate-500 text-sm">Video Placeholder</div>

                {/* Play Button Overlay */}
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 text-white hover:scale-110 transition-transform">
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </div>
                </button>
            </div>

            {/* Controls */}
            <div className="p-3 bg-slate-900 text-white">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium truncate">{title}</h4>
                    <button onClick={onSkip} className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/10">
                        跳过
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-xs text-slate-400">{duration}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;

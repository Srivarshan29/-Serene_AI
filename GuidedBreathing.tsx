
import React, { useState, useEffect } from 'react';
import type { Theme } from './types.ts';

const GuidedBreathing: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [breathingState, setBreathingState] = useState<'idle' | 'in' | 'hold' | 'out'>('idle');
    const [isBreathing, setIsBreathing] = useState(false);

    // Breathing cycle logic for 4-7-8
    useEffect(() => {
        if (!isBreathing) {
            setBreathingState('idle');
            return;
        }

        let timer: ReturnType<typeof setTimeout>;

        const cycle = () => {
            setBreathingState('in'); // 4 seconds
            timer = setTimeout(() => {
                setBreathingState('hold'); // 7 seconds
                timer = setTimeout(() => {
                    setBreathingState('out'); // 8 seconds
                    timer = setTimeout(cycle, 8000); // Restart after exhale
                }, 7000);
            }, 4000);
        };
        
        cycle(); // Start the first cycle
        
        return () => clearTimeout(timer);
    }, [isBreathing]);

    const breathingTexts: Record<string, string> = {
        idle: 'Ready?',
        in: 'Breathe In...',
        hold: 'Hold...',
        out: 'Breathe Out...',
    };
    
    const themeClasses: Record<Theme, { base: string, highlight: string, button: string, buttonHover: string }> = {
        teal: { base: '#0D9488', highlight: '#2DD4BF', button: 'bg-teal-600', buttonHover: 'hover:bg-teal-500' },
        blue: { base: '#2563EB', highlight: '#60A5FA', button: 'bg-blue-600', buttonHover: 'hover:bg-blue-500' },
        rose: { base: '#E11D48', highlight: '#F472B6', button: 'bg-rose-600', buttonHover: 'hover:bg-rose-500' },
        amber: { base: '#D97706', highlight: '#FBBF24', button: 'bg-amber-600', buttonHover: 'hover:bg-amber-500' },
    };
    const currentTheme = themeClasses[theme];
    
    const getCircleStyle = (state: typeof breathingState) => {
        const baseStyle = {
            transition: 'all ease-in-out',
            background: `radial-gradient(circle, ${currentTheme.highlight} 0%, ${currentTheme.base} 70%)`,
        };
        switch(state) {
            case 'in': return { ...baseStyle, transitionDuration: '4s', transform: 'scale(1.5)', opacity: 1 };
            case 'hold': return { ...baseStyle, transitionDuration: '0.5s', transform: 'scale(1.5)', opacity: 1 };
            case 'out': return { ...baseStyle, transitionDuration: '8s', transform: 'scale(1)', opacity: 0.7 };
            default: return { ...baseStyle, transitionDuration: '1s', transform: 'scale(1)', opacity: 0.7 };
        }
    }

    return (
        <div className="p-4 sm:p-8 h-full flex flex-col items-center justify-center text-center bg-slate-800">
             <style>{`
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px ${currentTheme.base}, 0 0 30px ${currentTheme.highlight};
                    }
                    50% {
                        box-shadow: 0 0 30px ${currentTheme.base}, 0 0 50px ${currentTheme.highlight};
                    }
                }
            `}</style>
            
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-4">Guided Breathing</h2>
                <p className="text-slate-400 mb-8">
                    Follow the 4-7-8 breathing technique to calm your nervous system. Inhale for 4 seconds, hold for 7, and exhale for 8.
                </p>

                <div className="h-64 flex items-center justify-center my-8">
                     <div className="relative w-48 h-48">
                        <div 
                            className="absolute inset-0 rounded-full" 
                            style={{ 
                                ...getCircleStyle(isBreathing ? breathingState : 'idle'),
                                animation: breathingState === 'hold' && isBreathing ? `pulse-glow 3.5s infinite ease-in-out` : 'none',
                             }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-2xl font-bold text-white transition-opacity duration-500">
                                {breathingTexts[isBreathing ? breathingState : 'idle']}
                            </p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsBreathing(!isBreathing)}
                    className={`${currentTheme.button} ${currentTheme.buttonHover} text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg`}
                >
                    {isBreathing ? 'Stop Session' : 'Start Session'}
                </button>
            </div>
        </div>
    );
};

export default GuidedBreathing;

import React, { useState, useMemo } from 'react';
import type { Mood, View, MoodEntry, JournalEntry, ChatMessage, Theme } from './types.ts';
import { generateAffirmation } from './services/geminiService.ts';
import { SoundscapesIcon } from './Icons.tsx';

const IconLightbulb: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.09 16.05A6.47 6.47 0 0 1 12 18a6.47 6.47 0 0 1-3.09-1.95M12 2a7 7 0 0 0-7 7c0 1.76.64 3.39 1.73 4.69L12 22l5.27-8.31A7.002 7.002 0 0 0 19 9a7 7 0 0 0-7-7z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
);

const IconSparkles: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
);

const Sanctuary: React.FC<{
    moods: MoodEntry[];
    chatHistory: ChatMessage[];
    journalEntries: JournalEntry[];
    setCurrentView: (view: View) => void;
    theme: Theme;
}> = ({ moods, chatHistory, journalEntries, setCurrentView, theme }) => {
    const [affirmation, setAffirmation] = useState<string>('');
    const [loadingAffirmation, setLoadingAffirmation] = useState(false);
    const [activeColor, setActiveColor] = useState('bg-slate-800');
    const [activeColorHex, setActiveColorHex] = useState('#1e293b');

    const themeClasses: Record<Theme, { text: string, bg: string, hoverBg: string }> = {
        teal: { text: 'text-teal-400', bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500' },
        blue: { text: 'text-blue-400', bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500' },
        rose: { text: 'text-rose-400', bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500' },
        amber: { text: 'text-amber-400', bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500' },
    };
    const currentTheme = themeClasses[theme];

    const latestMood = useMemo(() => {
        if (moods.length === 0) return 'Neutral';
        return moods.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].mood;
    }, [moods]);

    const handleGenerateAffirmation = async () => {
        setLoadingAffirmation(true);
        setAffirmation('');
        try {
            const newAffirmation = await generateAffirmation(chatHistory, moods, journalEntries);
            setAffirmation(newAffirmation);
        } catch (error) {
            setAffirmation(error instanceof Error ? error.message : "Could not generate an affirmation right now.");
        } finally {
            setLoadingAffirmation(false);
        }
    };

    const MOOD_LIGHTING: Record<Mood, { color: string; colorHex: string, name: string; }> = {
        Ecstatic: { color: 'bg-amber-400', colorHex: '#FBBF24', name: 'Golden Hour' },
        Happy: { color: 'bg-emerald-400', colorHex: '#34D399', name: 'Lush Meadow' },
        Neutral: { color: 'bg-sky-400', colorHex: '#38BDF8', name: 'Clear Sky' },
        Sad: { color: 'bg-slate-500', colorHex: '#64748B', name: 'Twilight Mist' },
        Anxious: { color: 'bg-violet-500', colorHex: '#8B5CF6', name: 'Lavender Calm' },
        Angry: { color: 'bg-rose-500', colorHex: '#F43F5E', name: 'Warm Ember' },
    };
    
    const suggestedLighting = MOOD_LIGHTING[latestMood];
    const allLightingOptions = Object.values(MOOD_LIGHTING);

    return (
        <div className={`p-4 sm:p-8 space-y-8 h-full overflow-y-auto transition-colors duration-1000 ${activeColor}`}>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Bio-Adaptive Sanctuary</h2>
                <p className="text-slate-300 mt-2 max-w-2xl mx-auto">
                    Your personal space that adapts to you. Let's create a calming environment based on your current state.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Dynamic Lighting */}
                <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-lg flex flex-col border border-slate-700/50">
                    <div className="flex items-center mb-4">
                        <IconLightbulb className="w-8 h-8 text-amber-300 mr-3" />
                        <h3 className="text-xl font-bold text-white">Dynamic Lighting</h3>
                    </div>
                    <p className="text-slate-400 mb-4">Change the ambient lighting of your sanctuary. Based on your mood of <span className="font-bold" style={{color: suggestedLighting.colorHex}}>{latestMood}</span>, we suggest the '{suggestedLighting.name}' theme.</p>
                    <div className="flex-grow flex items-center justify-center p-4 bg-black/20 rounded-lg">
                        <div style={{width: '150px', height: '150px', backgroundColor: activeColorHex, boxShadow: `0 0 35px ${activeColorHex}`, transition: 'all 1s ease'}} className="rounded-full"></div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-slate-400 mb-2">Select a theme:</p>
                        <div className="flex flex-wrap gap-2">
                            {allLightingOptions.map(opt => (
                                <button key={opt.name} onClick={() => {setActiveColor(opt.color); setActiveColorHex(opt.colorHex)}} className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-slate-700 hover:opacity-100 transition-opacity ${activeColorHex === opt.colorHex ? 'opacity-100 ring-2 ring-white' : 'opacity-70'}`}>
                                    <span className={`w-3 h-3 rounded-full inline-block mr-2 ${opt.color}`}></span>
                                    {opt.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Adaptive Soundscapes */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                        <div className="flex items-center mb-4">
                            <SoundscapesIcon />
                            <h3 className="text-xl font-bold text-white ml-3">Adaptive Soundscapes</h3>
                        </div>
                        <p className="text-slate-400 mb-4">Enhance your environment with calming, royalty-free audio.</p>
                        <button onClick={() => setCurrentView('soundscapes')} className={`w-full ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-4 rounded-lg transition-colors`}>
                            Explore Soundscapes
                        </button>
                    </div>

                    {/* Smart Mirror Affirmations */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                        <div className="flex items-center mb-4">
                            <IconSparkles className={`w-6 h-6 ${currentTheme.text} mr-3`} />
                            <h3 className="text-xl font-bold text-white">Smart Mirror</h3>
                        </div>
                        <p className="text-slate-400 mb-4">Generate a personalized affirmation based on your recent activity.</p>
                        <button onClick={handleGenerateAffirmation} disabled={loadingAffirmation} className={`w-full ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600`}>
                            {loadingAffirmation ? 'Generating...' : 'Reflect Affirmation'}
                        </button>
                        <div className="mt-4 min-h-[5rem] flex items-center justify-center p-2 bg-black/20 rounded-lg">
                            {loadingAffirmation ? <div className="text-slate-400 animate-pulse">...</div> : 
                            <p className={`text-center text-lg italic ${currentTheme.text}`}>"{affirmation || 'Your affirmation will appear here.'}"</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sanctuary;

import React, { useState } from 'react';
import type { Mood, MoodEntry, JournalEntry, ChatMessage, Theme } from './types.ts';
import { MOODS } from './types.ts';
import { generateMoodImage, predictMood } from './services/geminiService.ts';

const MoodVisualizer: React.FC<{
    moods: MoodEntry[];
    setMoods: (moods: React.SetStateAction<MoodEntry[]>) => void;
    journalEntries: JournalEntry[];
    chatHistory: ChatMessage[];
    theme: Theme;
}> = ({ moods, setMoods, journalEntries, chatHistory, theme }) => {
    const [generatingImage, setGeneratingImage] = useState(false);
    const [moodImage, setMoodImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    const [isPredicting, setIsPredicting] = useState(false);
    const [predictedMood, setPredictedMood] = useState<Mood | null>(null);
    const [predictionError, setPredictionError] = useState<string | null>(null);
    
    const themeClasses: Record<Theme, { bg: string, hoverBg: string }> = {
        teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500' },
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500' },
        rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500' },
        amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500' },
    };
    const currentTheme = themeClasses[theme];

    const handleMoodSelect = (mood: Mood) => {
        setMoods(prev => [...prev, { id: Date.now().toString(), mood, date: new Date().toISOString() }]);
        handleGenerateImage(mood);
        setPredictedMood(null);
    };

    const handleGenerateImage = async (mood: Mood) => {
        setGeneratingImage(true);
        setMoodImage(null);
        setImageError(null);
        try {
            const latestJournal = journalEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            const image = await generateMoodImage(mood, latestJournal?.content || "");
            setMoodImage(image);
        } catch (error) {
            setImageError(error instanceof Error ? error.message : "Could not generate the image.");
        } finally {
            setGeneratingImage(false);
        }
    };
    
    const handlePredictMood = async () => {
        const userChatMessages = chatHistory.filter(m => m.role === 'user').slice(-5).map(m => m.text).join('\n');
        const latestJournal = journalEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        
        const textToAnalyze = userChatMessages.trim() || latestJournal?.content;

        if (!textToAnalyze) {
            setPredictionError("You need a recent chat conversation or a journal entry to analyze your mood.");
            return;
        }
        
        setIsPredicting(true);
        setPredictionError(null);
        setPredictedMood(null);
        
        try {
            const mood = await predictMood(textToAnalyze);
            
            if (mood) {
                setPredictedMood(mood);
            } else {
                setPredictionError("Sorry, I couldn't determine the mood from your recent activity. Please select one manually.");
            }
        } catch (error) {
            setPredictionError(error instanceof Error ? error.message : "An error occurred during mood prediction.");
        } finally {
            setIsPredicting(false);
        }
    };

    const MOOD_COLORS: Record<Mood, { text: string; border: string; }> = {
        Ecstatic: { text: 'text-amber-400', border: 'hover:border-amber-500' },
        Happy: { text: 'text-emerald-400', border: 'hover:border-emerald-500' },
        Neutral: { text: 'text-sky-400', border: 'hover:border-sky-500' },
        Sad: { text: 'text-slate-400', border: 'hover:border-slate-500' },
        Anxious: { text: 'text-violet-400', border: 'hover:border-violet-500' },
        Angry: { text: 'text-rose-500', border: 'hover:border-rose-500' },
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Mood Visualizer</h2>
            
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-2">AI Mood Prediction</h3>
                <p className="text-slate-400 mb-4">Let AI analyze your recent chat conversation to suggest your current mood.</p>
                
                {isPredicting ? (
                    <div className="flex items-center justify-center h-10">
                        <p className="text-slate-300 animate-pulse">Analyzing...</p>
                    </div>
                ) : predictedMood ? (
                    <div className="text-center p-4 bg-slate-700 rounded-lg">
                        <p className="text-slate-300">Based on your chat, AI suggests you might be feeling: <strong className={`font-bold ${MOOD_COLORS[predictedMood].text}`}>{predictedMood}</strong></p>
                        <p className="text-sm text-slate-400 my-2">Is this correct?</p>
                        <div className="flex justify-center gap-4 mt-3">
                             <button onClick={() => handleMoodSelect(predictedMood)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg">Yes, that's right</button>
                             <button onClick={() => setPredictedMood(null)} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg">No, I'll choose</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handlePredictMood} disabled={chatHistory.length === 0 && journalEntries.length === 0} className={`${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed`}>
                        Analyze Recent Activity
                    </button>
                )}
                {predictionError && <p className="text-rose-400 mt-3 text-sm">{predictionError}</p>}
                {(chatHistory.length === 0 && journalEntries.length === 0) && <p className="text-slate-500 mt-3 text-sm">Chat with the AI or write a journal entry to enable this feature.</p>}
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Or, select your mood manually:</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {MOODS.map(mood => (
                    <button key={mood} onClick={() => handleMoodSelect(mood)} className={`flex flex-col items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700/50 border border-slate-700 ${MOOD_COLORS[mood].border} transition-all duration-200 group transform hover:-translate-y-1`}>
                        <span className={`text-5xl mb-2 transition-transform duration-200 group-hover:scale-110`}>{
                            { Ecstatic: '🤩', Happy: '😊', Neutral: '😐', Sad: '😢', Anxious: '😟', Angry: '😠' }[mood]
                        }</span>
                        <span className={`font-medium text-slate-300 group-hover:text-white ${MOOD_COLORS[mood].text}`}>{mood}</span>
                    </button>
                ))}
            </div>
            
            <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <h3 className="text-xl font-bold mb-4">AI Emotional Art</h3>
                <p className="text-slate-400 mb-4">Based on your selected mood and latest journal entry, we can generate a unique piece of art representing your emotional state.</p>
                {generatingImage ? (
                    <div className="w-full h-64 flex items-center justify-center bg-slate-700 rounded-lg">
                        <p className="text-slate-300 animate-pulse">Generating your masterpiece...</p>
                    </div>
                ) : imageError ? (
                    <div className="w-full h-64 flex items-center justify-center bg-rose-900/20 rounded-lg text-rose-400 p-4 text-center">
                        <p>{imageError}</p>
                    </div>
                ) : moodImage ? (
                     <img src={moodImage} alt="AI generated mood visualization" className="w-full h-auto max-w-md mx-auto rounded-lg shadow-lg"/>
                ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-slate-700 rounded-lg">
                        <p className="text-slate-400">Select or predict a mood to create your visualization.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoodVisualizer;
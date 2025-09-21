
import React, { useState } from 'react';
import type { Habit, ChatMessage, MoodEntry, JournalEntry, Theme } from './types.ts';
import { getHabitSuggestions } from './services/geminiService.ts';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const HabitTracker: React.FC<{
    habits: Habit[];
    setHabits: (habits: React.SetStateAction<Habit[]>) => void;
    moods: MoodEntry[];
    journalEntries: JournalEntry[];
    chatHistory: ChatMessage[];
    theme: Theme;
}> = ({ habits, setHabits, moods, journalEntries, chatHistory, theme }) => {
    const [newHabit, setNewHabit] = useState('');
    const [suggestedHabits, setSuggestedHabits] = useState<string[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [suggestionError, setSuggestionError] = useState<string | null>(null);
    const today = getTodayDateString();

    const themeClasses: Record<Theme, { bg: string, hoverBg: string, ring: string, text: string }> = {
        teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', ring: 'focus:ring-teal-500', text: 'text-teal-400' },
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', ring: 'focus:ring-blue-500', text: 'text-blue-400' },
        rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', ring: 'focus:ring-rose-500', text: 'text-rose-400' },
        amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', ring: 'focus:ring-amber-500', text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];

    const addHabit = (name: string) => {
        if (!name.trim() || habits.some(h => h.name.toLowerCase() === name.toLowerCase())) return;
        setHabits(prev => [...prev, { id: Date.now().toString(), name, completedDates: [] }]);
    };
    
    const handleAddHabit = () => {
        addHabit(newHabit);
        setNewHabit('');
    }

    const handleGetSuggestions = async () => {
        setIsLoadingSuggestions(true);
        setSuggestionError(null);
        setSuggestedHabits([]);
        try {
            const latestMood = moods.length > 0 ? moods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].mood : null;
            const suggestions = await getHabitSuggestions(chatHistory, moods, journalEntries, latestMood);
            // Filter out habits that already exist
            const newSuggestions = suggestions.filter(s => !habits.some(h => h.name.toLowerCase() === s.toLowerCase()));
            setSuggestedHabits(newSuggestions);
            if (newSuggestions.length === 0 && suggestions.length > 0) {
                setSuggestionError("Found some suggestions, but you're already tracking them. Great job!");
            }
        } catch (error) {
            setSuggestionError(error instanceof Error ? error.message : "Could not fetch suggestions at this time.");
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const toggleHabit = (id: string) => {
        setHabits(prev => prev.map(habit => {
            if (habit.id === id) {
                const completed = habit.completedDates.includes(today);
                return {
                    ...habit,
                    completedDates: completed
                        ? habit.completedDates.filter(d => d !== today)
                        : [...habit.completedDates, today],
                };
            }
            return habit;
        }));
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Habit Tracker</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newHabit}
                    onChange={e => setNewHabit(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddHabit()}
                    placeholder="Add a new habit (e.g., Meditate for 10 mins)"
                    className={`flex-grow bg-slate-700 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                />
                <button onClick={handleAddHabit} className={`${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors`}>Add</button>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-2">Personalized AI Suggestions</h3>
                <p className="text-slate-400 mb-4">Get habit ideas based on your recent activity and mood.</p>
                <button onClick={handleGetSuggestions} disabled={isLoadingSuggestions} className={`bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed`}>
                    {isLoadingSuggestions ? 'Analyzing...' : 'Get Suggestions'}
                </button>
                {suggestionError && <p className="text-rose-400 mt-3 text-sm">{suggestionError}</p>}
                {suggestedHabits.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {suggestedHabits.map((suggestion, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex items-center justify-between">
                                <span className="text-slate-200">{suggestion}</span>
                                <button onClick={() => {
                                        addHabit(suggestion);
                                        setSuggestedHabits(current => current.filter(s => s !== suggestion));
                                    }}
                                    className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Your Habits for Today</h3>
                {habits.map(habit => (
                    <div key={habit.id} className="bg-slate-800 rounded-lg p-4 flex items-center justify-between border border-slate-700/50">
                        <span className="text-lg text-slate-200">{habit.name}</span>
                        <button onClick={() => toggleHabit(habit.id)} className={`w-28 text-center py-2 rounded-lg text-sm font-bold transition-colors ${habit.completedDates.includes(today) ? 'bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                            {habit.completedDates.includes(today) ? 'Done!' : 'Mark Done'}
                        </button>
                    </div>
                ))}
                {habits.length === 0 && <p className="text-slate-400 text-center py-4">Add a habit to get started!</p>}
            </div>
        </div>
    );
};

export default HabitTracker;
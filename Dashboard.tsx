
import React, { useMemo } from 'react';
import type { MoodEntry, Habit, JournalEntry, Theme, FoodLogEntry, View } from './types.ts';
import { HabitIcon, JournalIcon, MoodIcon, NutritionIcon } from './Icons.tsx';

interface DashboardProps {
    moods: MoodEntry[];
    habits: Habit[];
    journalEntries: JournalEntry[];
    foodLogs: FoodLogEntry[];
    theme: Theme;
    username: string | null;
    setCurrentView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ moods, habits, journalEntries, foodLogs, theme, username, setCurrentView }) => {
    
    const themeClasses: Record<Theme, { text: string; from: string; to: string; shadow: string, border: string }> = {
        teal: { text: 'text-teal-300', from: 'from-teal-500', to: 'to-teal-600', shadow: 'shadow-teal-500/20', border: 'border-teal-500/50' },
        blue: { text: 'text-blue-300', from: 'from-blue-500', to: 'to-blue-600', shadow: 'shadow-blue-500/20', border: 'border-blue-500/50' },
        rose: { text: 'text-rose-300', from: 'from-rose-500', to: 'to-rose-600', shadow: 'shadow-rose-500/20', border: 'border-rose-500/50' },
        amber: { text: 'text-amber-300', from: 'from-amber-500', to: 'to-amber-600', shadow: 'shadow-amber-500/20', border: 'border-amber-500/50' },
    };
    const currentTheme = themeClasses[theme];

    const weeklyMoods = useMemo(() => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return moods.filter(m => new Date(m.date) > oneWeekAgo).length;
    }, [moods]);

    const weeklyFoodLogs = useMemo(() => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return foodLogs.filter(f => new Date(f.date) > oneWeekAgo).length;
    }, [foodLogs]);

    const totalJournalEntries = journalEntries.length;
    const habitsCurrentlyTracked = habits.length;


    const canAnalyzeNutrition = useMemo(() => foodLogs.length >= 2 && moods.length >= 2, [foodLogs, moods]);

    const summaryData = [
        { icon: <MoodIcon />, value: weeklyMoods, label: "Moods Logged (7 Days)" },
        { icon: <NutritionIcon />, value: weeklyFoodLogs, label: "Foods Logged (7 Days)" },
        { icon: <JournalIcon />, value: totalJournalEntries, label: "Total Journal Entries" },
        { icon: <HabitIcon />, value: habitsCurrentlyTracked, label: "Habits Currently Tracked" }
    ];

    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-white">Welcome, <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.from} ${currentTheme.to}`}>{username || 'User'}</span>!</h2>
                    <p className="text-slate-400 mt-1">Here is your wellness summary.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {summaryData.map((item, index) => (
                        <div key={index} className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center flex flex-col items-center justify-center transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-300">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 bg-slate-700/50 ${currentTheme.text}`}>
                                {item.icon}
                            </div>
                            <p className={`text-4xl md:text-5xl font-bold ${currentTheme.text} my-2`}>{item.value}</p>
                            <p className="text-slate-300 text-sm">{item.label}</p>
                        </div>
                    ))}
                </div>

                 <div className="mt-8">
                    <div className={`bg-gradient-to-br from-slate-800/50 to-slate-900/40 backdrop-blur-sm p-6 rounded-xl border ${currentTheme.border} shadow-lg`}>
                        <h3 className="text-xl font-bold text-white mb-4">AI Health Coach</h3>
                        {canAnalyzeNutrition ? (
                            <>
                                <p className="text-slate-300 mb-4">
                                    You've logged enough data to get a personalized Diet & Mood Report. See how your nutrition might be affecting your well-being.
                                </p>
                                <button 
                                    onClick={() => setCurrentView('nutrition')}
                                    className={`bg-gradient-to-r ${currentTheme.from} ${currentTheme.to} text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg ${currentTheme.shadow} transform hover:scale-105`}
                                >
                                    Get My Report
                                </button>
                            </>
                        ) : (
                            <p className="text-slate-300">
                                Log at least 2 food items and 2 moods to unlock your personalized "Diet & Mood Report" from our AI Health Coach. You can start by using the <button onClick={() => setCurrentView('nutrition')} className={`${currentTheme.text} hover:underline font-semibold bg-transparent`}>Nutrition Tracker</button>.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
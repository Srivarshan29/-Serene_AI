
import React, { useMemo } from 'react';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { MoodEntry, Habit, Mood, Theme } from './types.ts';
import { MOODS } from './types.ts';

// A custom tooltip with the app's theme
const CustomTooltip = ({ active, payload, label, unit = '' }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg text-sm shadow-lg">
                <p className="label text-slate-300 font-semibold">{`${label}`}</p>
                {payload.map((p: any, index: number) => (
                    <p key={index} style={{ color: p.color || p.stroke || p.fill }}>
                        {`${p.name}: ${p.value.toFixed(1)}${unit}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


const Analytics: React.FC<{ moods: MoodEntry[], habits: Habit[], theme: Theme }> = ({ moods, habits, theme }) => {
    
    const themeColors: Record<Theme, { line: string, bar: string, gradientFrom: string, gradientTo: string }> = {
        teal: { line: '#5eead4', bar: '#14b8a6', gradientFrom: '#2dd4bf', gradientTo: '#0d9488' },
        blue: { line: '#93c5fd', bar: '#3b82f6', gradientFrom: '#60a5fa', gradientTo: '#2563eb' },
        rose: { line: '#f9a8d4', bar: '#ec4899', gradientFrom: '#f472b6', gradientTo: '#db2777' },
        amber: { line: '#fcd34d', bar: '#f59e0b', gradientFrom: '#fbbf24', gradientTo: '#d97706' },
    };
    const currentTheme = themeColors[theme];
    
    const moodData = useMemo(() => {
        const moodsByDate: Record<string, Mood[]> = moods.reduce((acc, entry) => {
            const dateKey = entry.date.split('T')[0];
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(entry.mood);
            return acc;
        }, {} as Record<string, Mood[]>);

        const moodMap: Record<Mood, number> = { Ecstatic: 5, Happy: 4, Neutral: 3, Sad: 2, Anxious: 1, Angry: 0 };

        const data = Object.entries(moodsByDate).map(([date, dailyMoods]) => {
            const totalScore = dailyMoods.reduce((sum, mood) => sum + moodMap[mood], 0);
            const averageMood = totalScore / dailyMoods.length;
            const displayDate = new Date(date + 'T00:00:00Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
            return {
                date: displayDate,
                originalDate: date,
                averageMood: averageMood,
            };
        });
        return data.sort((a, b) => new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()).slice(-30);
    }, [moods]);

    const habitData = useMemo(() => habits.map(habit => {
        if (habit.completedDates.length === 0) {
            return { name: habit.name, rate: 0 };
        }
        const sortedDates = habit.completedDates.map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime());
        const firstDay = sortedDates[0];
        const today = new Date();
        const diffTime = Math.max(today.getTime() - firstDay.getTime(), 0);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; 
        const rate = (habit.completedDates.length / diffDays) * 100;

        return {
            name: habit.name.length > 15 ? `${habit.name.substring(0, 12)}...` : habit.name,
            rate: Math.min(rate, 100),
        };
    }), [habits]);


    const moodDistribution = useMemo(() => {
        const counts: Record<Mood, number> = { Ecstatic: 0, Happy: 0, Neutral: 0, Sad: 0, Anxious: 0, Angry: 0 };
        moods.forEach(m => counts[m.mood]++);
        return MOODS.map(mood => ({ name: mood, value: counts[mood] })).filter(d => d.value > 0);
    }, [moods]);

    const COLORS = ['#fcd34d', '#86efac', '#93c5fd', '#94a3b8', '#c4b5fd', '#fca5a5'];

    if (moods.length === 0 && habits.length === 0) {
        return <div className="p-8 text-center text-slate-400">Log some moods and habits to see your analytics here!</div>;
    }

    const totalMoods = moods.length;

    return (
        <div className="p-4 sm:p-8 space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Your Wellness Analytics</h2>
            
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold mb-4 text-white">Mood Over Time (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={moodData}>
                        <defs>
                            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={currentTheme.gradientFrom} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={currentTheme.gradientTo} stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="1 4" stroke="#475569" vertical={false} />
                        <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tickFormatter={val => ['Angry', '', 'Sad', 'Neutral', 'Happy', 'Ecstatic'][val]} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="averageMood" stroke={currentTheme.line} strokeWidth={2} name="Avg Mood" fillOpacity={1} fill="url(#moodGradient)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4 text-white">Habit Completion Rate</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={habitData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                             <defs>
                                <linearGradient id="habitGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={currentTheme.gradientFrom} stopOpacity={0.9}/>
                                    <stop offset="100%" stopColor={currentTheme.gradientTo} stopOpacity={0.7}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="1 4" stroke="#475569" vertical={false} />
                            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={12} unit="%" domain={[0, 100]} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip unit="%" />} />
                            <Bar dataKey="rate" name="Completion Rate" fill="url(#habitGradient)" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700/50">
                    <h3 className="text-xl font-bold mb-4 text-white">Mood Distribution</h3>
                     <div className="relative w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                 <Pie 
                                    data={moodDistribution} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={70} 
                                    outerRadius={110} 
                                    fill="#8884d8" 
                                    paddingAngle={5}
                                    cornerRadius={8}
                                 >
                                    {moodDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[MOODS.indexOf(entry.name as Mood) % COLORS.length]} stroke="none" />)}
                                 </Pie>
                                 <Tooltip content={<CustomTooltip />} />
                                 <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
                             </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">{totalMoods}</span>
                            <span className="text-sm text-slate-400">Total Logs</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
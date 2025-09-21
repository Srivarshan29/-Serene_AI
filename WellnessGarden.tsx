
import React, { useMemo } from 'react';
import type { MoodEntry, Habit, JournalEntry, Mood } from './types.ts';

const MoodFlower: React.FC<{ mood: Mood | null; colors: { primary: string; secondary: string } }> = ({ mood, colors }) => {
    switch (mood) {
        case 'Ecstatic':
        case 'Happy':
            return ( // Sunflower-like
                <g>
                    <circle cx="12" cy="12" r="3" fill={colors.secondary} />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(r => (
                        <ellipse key={r} cx="12" cy="5" rx="3" ry="5" fill={colors.primary} transform={`rotate(${r} 12 12)`}/>
                    ))}
                </g>
            );
        case 'Sad':
            return ( // Drooping bellflower
                <g transform="translate(0 4)">
                    <path d="M 8 8 C 8 14, 16 14, 16 8 L 14 8 C 14 12, 10 12, 10 8 Z" fill={colors.primary} />
                    <path d="M11 14 L 12 16 L 13 14" stroke={colors.secondary} strokeWidth="1" fill="none" />
                </g>
            );
        case 'Anxious':
             return ( // Spiky, tense flower
                <g>
                    <circle cx="12" cy="12" r="2" fill={colors.secondary} />
                    {[0, 60, 120, 180, 240, 300].map(r => (
                        <path key={r} d="M12 12 L 12 2 L 13 12 Z" fill={colors.primary} transform={`rotate(${r} 12 12)`} />
                    ))}
                </g>
            );
        case 'Angry':
             return ( // Sharp, pointed flower
                <g>
                     <circle cx="12" cy="12" r="3" fill={colors.secondary} />
                    {[0, 72, 144, 216, 288].map(r => (
                        <path key={r} d="M12 12 L 6 4 L 18 4 Z" fill={colors.primary} transform={`rotate(${r} 12 12) translate(0 -2)`} />
                    ))}
                </g>
            );
        case 'Neutral':
        default:
            return ( // Simple, basic flower
                <g>
                    <circle cx="12" cy="12" r="4" fill={colors.primary} />
                    <circle cx="12" cy="12" r="2" fill={colors.secondary} />
                </g>
            );
    }
};

const WellnessGarden: React.FC<{ moods: MoodEntry[]; habits: Habit[]; journalEntries: JournalEntry[] }> = ({ moods, habits, journalEntries }) => {
    const score = useMemo(() => {
        const moodScore = moods.filter(m => ['Happy', 'Ecstatic'].includes(m.mood)).length;
        const habitScore = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
        const journalScore = journalEntries.length;
        return moodScore + habitScore + journalScore;
    }, [moods, habits, journalEntries]);

    const latestMood = useMemo(() => {
        if (moods.length === 0) return null;
        return moods.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].mood;
    }, [moods]);

    const MOOD_GARDEN_COLORS: Record<Mood, { primary: string; secondary: string }> = {
        Ecstatic: { primary: '#FBBF24', secondary: '#FDE68A' },
        Happy: { primary: '#EC4899', secondary: '#FBCFE8' },
        Neutral: { primary: '#38BDF8', secondary: '#E0F2FE' },
        Sad: { primary: '#64748B', secondary: '#CBD5E1' },
        Anxious: { primary: '#8B5CF6', secondary: '#DDD6FE' },
        Angry: { primary: '#E11D48', secondary: '#FECDD3' },
    };
    
    const gardenColors = latestMood ? MOOD_GARDEN_COLORS[latestMood] : MOOD_GARDEN_COLORS['Neutral'];

    const getPlantStage = () => {
        if (score > 30) return 5;
        if (score > 15) return 4;
        if (score > 5) return 3;
        if (score > 1) return 2;
        if (score > 0) return 1;
        return 0;
    };
    const stage = getPlantStage();
    const stageInfo = [
        { text: "Your garden is waiting. Log a mood, habit, or journal entry to plant a seed.", svg: <path d="M12 2L12 4" stroke="brown" strokeWidth="2" strokeLinecap="round"/> },
        { text: "A seed has been planted! Keep up your wellness activities.", svg: <><circle cx="12" cy="18" r="2" fill="saddlebrown"/><path d="M12 16 V 12" stroke="#22C55E" strokeWidth="2"/></>},
        { text: "A sprout appears! Your consistency is helping it grow.", svg: <><circle cx="12" cy="20" r="3" fill="saddlebrown"/><path d="M12 17 V 10" stroke="#22C55E" strokeWidth="2"/><path d="M12 12 C 10 11 10 13 12 14" stroke="#22C55E" strokeWidth="2" fill="none"/><path d="M12 12 C 14 11 14 13 12 14" stroke="#22C55E" strokeWidth="2" fill="none"/></>},
        { text: "Your plant is growing leaves. Great job!", svg: <><path d="M10 22 H 14" stroke="saddlebrown" strokeWidth="4" strokeLinecap="round"/><path d="M12 20 V 6" stroke="#22C55E" strokeWidth="2"/><path d="M12 12 C 8 10 8 14 12 14" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><path d="M12 12 C 16 10 16 14 12 14" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><path d="M12 8 C 9 7 9 9 12 9" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><path d="M12 8 C 15 7 15 9 12 9" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/></> },
        { text: "Look at that! Your plant is flowering!", svg: <><path d="M10 22 H 14" stroke="saddlebrown" strokeWidth="4" strokeLinecap="round"/><path d="M12 20 V 10" stroke="#22C55E" strokeWidth="2"/><path d="M12 14 C 8 12 8 16 12 16" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><path d="M12 14 C 16 12 16 16 12 14" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><g transform="translate(0 -2) scale(1.5)"><MoodFlower mood={latestMood} colors={gardenColors} /></g></> },
        { text: "Your garden is thriving! A beautiful testament to your dedication.", svg: <><path d="M10 22 H 14" stroke="saddlebrown" strokeWidth="4" strokeLinecap="round"/><path d="M12 20 V 10" stroke="#22C55E" strokeWidth="2"/><path d="M12 16 C 8 14 8 18 12 18" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><path d="M12 16 C 16 14 16 18 12 18" stroke="#22C55E" strokeWidth="2" fill="#86EFAC"/><g transform="scale(1.2) translate(4 -4)"><MoodFlower mood={latestMood} colors={gardenColors} /></g><g transform="scale(0.8) translate(10 6)"><MoodFlower mood={latestMood} colors={gardenColors} /></g><g transform="scale(0.8) translate(22 6)"><MoodFlower mood={latestMood} colors={gardenColors} /></g></> },
    ];
    
    return (
        <div className="p-8 text-center flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Your Wellness Garden</h2>
            <p className="text-gray-400 mb-2 max-w-xl">{stageInfo[stage].text}</p>
            {latestMood && <p className="text-gray-400 mb-8">Today's flowers reflect your feeling of <span className="font-bold" style={{color: gardenColors.primary}}>{latestMood}</span>.</p>}

            <div className="w-80 h-80 bg-gray-800/50 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-64 h-64">
                    {stageInfo[stage].svg}
                </svg>
            </div>
            <p className="mt-8 text-lg font-bold text-indigo-400">Wellness Score: {score}</p>
        </div>
    );
};

export default WellnessGarden;
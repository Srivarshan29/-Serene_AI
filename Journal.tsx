
import React, { useState } from 'react';
import type { JournalEntry, Theme } from './types.ts';

const Journal: React.FC<{
    entries: JournalEntry[];
    setEntries: (entries: React.SetStateAction<JournalEntry[]>) => void;
    theme: Theme;
}> = ({ entries, setEntries, theme }) => {
    const [newEntry, setNewEntry] = useState('');

    const themeClasses: Record<Theme, { bg: string, hoverBg: string, ring: string }> = {
        teal: { bg: 'bg-teal-500', hoverBg: 'hover:bg-teal-600', ring: 'focus:ring-teal-500' },
        blue: { bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', ring: 'focus:ring-blue-500' },
        rose: { bg: 'bg-rose-500', hoverBg: 'hover:bg-rose-600', ring: 'focus:ring-rose-500' },
        amber: { bg: 'bg-amber-500', hoverBg: 'hover:bg-amber-600', ring: 'focus:ring-amber-500' },
    };
    const currentTheme = themeClasses[theme];

    const addEntry = () => {
        if (!newEntry.trim()) return;
        setEntries(prev => [{ id: Date.now().toString(), content: newEntry, date: new Date().toISOString() }, ...prev]);
        setNewEntry('');
    };
    
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Your Private Journal</h2>
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700/50">
                <textarea
                    value={newEntry}
                    onChange={e => setNewEntry(e.target.value)}
                    placeholder="What's on your mind?"
                    className={`w-full h-40 bg-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                ></textarea>
                <button onClick={addEntry} className={`mt-4 ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors`}>Save Entry</button>
            </div>
            <div className="space-y-4">
                {entries.map(entry => (
                    <div key={entry.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                        <p className="text-slate-300 whitespace-pre-wrap">{entry.content}</p>
                        <p className="text-xs text-slate-500 mt-2">{new Date(entry.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journal;
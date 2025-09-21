

import React from 'react';
import type { Theme } from './types.ts';

const THEMES: { id: Theme, name: string, color: string }[] = [
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'rose', name: 'Rose', color: 'bg-rose-500' },
    { id: 'amber', name: 'Amber', color: 'bg-amber-500' },
];

const Settings: React.FC<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}> = ({ theme, setTheme }) => {

    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>

            <div className="space-y-8 max-w-2xl">
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-2">Theme Selection</h3>
                    <p className="text-slate-400 mb-4">
                        Personalize the look and feel of your app.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {THEMES.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all border ${theme === t.id ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white border-transparent' : 'border-slate-700 hover:bg-slate-700'}`}
                            >
                                <span className={`w-5 h-5 rounded-full mr-3 ${t.color}`}></span>
                                <span className="font-medium text-white">{t.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

import React from 'react';
import type { View, Persona, Theme } from './types.ts';
import { NAV_ITEMS, PERSONAS } from './constants.ts';
import { ICONS, LogoutIcon } from './Icons.tsx';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentView: View;
    setCurrentView: (view: View) => void;
    persona: Persona;
    setPersona: (persona: Persona) => void;
    theme: Theme;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setCurrentView, persona, setPersona, theme, setIsLoggedIn }) => {
    const CloseIcon = ICONS['close'];

    const themeClasses: Record<Theme, { text: string, bg: string, border: string, ring: string }> = {
        teal: { text: 'text-teal-300', bg: 'bg-teal-500/10', border: 'border-teal-400', ring: 'focus:ring-teal-400' },
        blue: { text: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-400', ring: 'focus:ring-blue-400' },
        rose: { text: 'text-rose-300', bg: 'bg-rose-500/10', border: 'border-rose-400', ring: 'focus:ring-rose-400' },
        amber: { text: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-400', ring: 'focus:ring-amber-400' },
    };
    
    return (
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-900 to-[#111827] p-4 flex flex-col border-r border-slate-700/50 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className={`p-2 bg-slate-800 rounded-lg border border-slate-700`}>
                        <svg className={`w-8 h-8 ${themeClasses[theme].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Serene AI</h1>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-white">
                    <CloseIcon />
                </button>
            </div>

            <div className="mb-8">
                <label htmlFor="persona" className="block text-sm font-medium text-slate-400 mb-2">AI Persona</label>
                <select id="persona" value={persona} onChange={e => setPersona(e.target.value as Persona)} className={`w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 ${themeClasses[theme].ring}`}>
                    {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            <nav className="flex-grow space-y-1">
                {NAV_ITEMS.map(({ id, label }) => {
                    const Icon = ICONS[id];
                    const isActive = currentView === id;
                    return (
                        <button
                            key={id}
                            onClick={() => {
                                setCurrentView(id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${isActive ? `bg-slate-700/50 ${themeClasses[theme].text} shadow-inner shadow-black/20 border-l-4 ${themeClasses[theme].border}` : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}`}
                        >
                            <Icon />
                            <span className={`ml-4 font-semibold ${isActive ? 'text-white' : ''}`}>{label}</span>
                        </button>
                    );
                })}
            </nav>
            <div className="mt-auto">
                 <div className="text-center text-xs text-slate-500 mt-4 border-t border-slate-700/50 pt-4">
                    <p>Serene AI is a supportive tool, not a replacement for professional medical advice.</p>
                </div>
                <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center p-3 mt-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                    <LogoutIcon />
                    <span className="ml-4 font-semibold">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
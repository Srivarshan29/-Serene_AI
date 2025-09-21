
import React, { useState } from 'react';
import type { Theme } from './types.ts';

interface AuthScreenProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
    theme: Theme;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ setIsLoggedIn, theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const handleAuthAction = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful login/signup regardless of input
        setIsLoggedIn(true);
    };
    
    const themeClasses: Record<Theme, { from: string, to: string, ring: string, text: string }> = {
        teal: { from: 'from-teal-500', to: 'to-teal-600', ring: 'focus:ring-teal-400', text: 'text-teal-400' },
        blue: { from: 'from-blue-500', to: 'to-blue-600', ring: 'focus:ring-blue-400', text: 'text-blue-400' },
        rose: { from: 'from-rose-500', to: 'to-rose-600', ring: 'focus:ring-rose-400', text: 'text-rose-400' },
        amber: { from: 'from-amber-500', to: 'to-amber-600', ring: 'focus:ring-amber-400', text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-[#111827] text-slate-100 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <div className={`inline-block p-3 bg-slate-800/50 border-2 ${currentTheme.to}/20 border-slate-700 rounded-2xl mb-4`}>
                         <svg className={`w-12 h-12 ${currentTheme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Serene AI</h1>
                </div>
                <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-8 rounded-xl shadow-2xl shadow-black/30">
                    <h2 className="text-3xl font-bold text-white text-center mb-2">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-slate-400 text-center mb-6">Access your personal wellness companion.</p>
                    
                    <form onSubmit={handleAuthAction} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-300 block mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-3 bg-slate-700/80 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-300 block mb-2">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full p-3 bg-slate-700/80 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className={`w-full font-bold py-3 px-4 rounded-lg text-white bg-gradient-to-r ${currentTheme.from} ${currentTheme.to} transition-all hover:shadow-lg hover:shadow-black/20`}>
                            {isLoginView ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                    
                    <div className="text-center mt-6">
                        <button onClick={() => setIsLoginView(!isLoginView)} className={`text-sm ${currentTheme.text} hover:underline`}>
                            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
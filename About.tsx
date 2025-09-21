
import React from 'react';
import { ICONS } from './Icons.tsx';
import type { Theme } from './types.ts';

const About: React.FC<{ theme: Theme }> = ({ theme }) => {
    const themeClasses: Record<Theme, { text: string, bg: string }> = {
        teal: { text: 'text-teal-400', bg: 'bg-teal-500' },
        blue: { text: 'text-blue-400', bg: 'bg-blue-500' },
        rose: { text: 'text-rose-400', bg: 'bg-rose-500' },
        amber: { text: 'text-amber-400', bg: 'bg-amber-500' },
    };
    const currentTheme = themeClasses[theme];

    const features = [
        { icon: ICONS['chat'], name: "AI Chat", description: "Engage with specialized AI personas (CBT, Jungian, etc.) in a safe, therapeutic space." },
        { icon: ICONS['mood'], name: "Mood Visualizer", description: "Track and visualize your emotional state with AI-powered art generation." },
        { icon: ICONS['journal'], name: "Journaling", description: "A private space for your thoughts, with AI prompts to inspire reflection." },
        { icon: ICONS['habits'], name: "Habit Tracker", description: "Build positive routines with personalized AI-driven habit suggestions." },
        { icon: ICONS['analytics'], name: "Analytics", description: "Gain insights into your wellness journey with detailed charts and graphs." },
        { icon: ICONS['garden'], name: "Wellness Garden", description: "A gamified garden that grows and changes based on your mood and activities." },
        { icon: ICONS['personality'], name: "Personality Insights", description: "Take an in-depth assessment to understand your unique strengths." },
        { icon: ICONS['soundscapes'], name: "Soundscapes", description: "Listen to adaptive, royalty-free music to help you relax, focus, or feel uplifted." },
        { icon: ICONS['sanctuary'], name: "Bio-Adaptive Sanctuary", description: "A simulated smart environment that adapts lighting and sound to your mood." },
        { icon: ICONS['doctor'], name: "Find a Doctor", description: "Use Google Search to locate mental health professionals in your area." },
    ];
    
    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <div className={`inline-block p-3 ${currentTheme.bg} rounded-2xl mb-4`}>
                         <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </div>
                    <h2 className="text-4xl font-bold text-white">About Serene AI</h2>
                    <p className="text-lg text-gray-300 mt-2">Your Personal Wellness Companion</p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg mt-8">
                    <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                    <p className="text-gray-300">
                        Serene AI is designed to be a safe, supportive, and insightful companion on your mental wellness journey. We leverage the power of advanced AI to provide personalized tools that help you understand your emotions, build healthy habits, and cultivate mindfulness. Our goal is to make mental wellness support more accessible, engaging, and tailored to your individual needs.
                    </p>
                </div>

                <div className="mt-8">
                     <h3 className="text-2xl font-bold text-white mb-4 text-center">Core Features</h3>
                     <div className="grid md:grid-cols-2 gap-4">
                        {features.map(feature => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.name} className="bg-gray-800/50 p-4 rounded-lg flex items-start">
                                    <div className={`${currentTheme.text} mr-4 mt-1 flex-shrink-0`}><Icon /></div>
                                    <div>
                                        <h4 className="font-bold text-white">{feature.name}</h4>
                                        <p className="text-sm text-gray-400">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                </div>

                <div className="mt-8 bg-yellow-900/30 border border-yellow-500 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">Important Disclaimer</h3>
                    <p className="text-yellow-200">
                        Serene AI is intended for wellness support and self-help. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or experienced in this application.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
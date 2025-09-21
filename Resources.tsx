
import React from 'react';
import type { Theme } from './types.ts';

const Resources: React.FC<{ theme: Theme }> = ({ theme }) => {
    const themeClasses: Record<Theme, { text: string }> = {
        teal: { text: 'text-teal-400' },
        blue: { text: 'text-blue-400' },
        rose: { text: 'text-rose-400' },
        amber: { text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];
    
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Helpful Resources</h2>
            <div className="space-y-4">
                <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className={`text-xl font-bold ${currentTheme.text}`}>Crisis Support</h3>
                    <p className="text-gray-300 mt-2">If you are in crisis or need immediate help, please reach out to these 24/7 resources:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-300">
                        <li>National Suicide Prevention Lifeline: 988</li>
                        <li>Crisis Text Line: Text HOME to 741741</li>
                    </ul>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className={`text-xl font-bold ${currentTheme.text}`}>Find a Therapist</h3>
                    <p className="text-gray-300 mt-2">Finding a professional to talk to is a great step. Here are some resources to find a therapist near you:</p>
                     <ul className="list-disc list-inside mt-2 text-gray-300">
                        <li>Psychology Today Therapist Finder</li>
                        <li>National Alliance on Mental Illness (NAMI)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Resources;
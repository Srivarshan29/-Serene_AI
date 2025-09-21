

import React, { useState } from 'react';
import type { ThoughtRecord, Theme } from './types.ts';
import { analyzeDistortions, reframeThought } from './services/geminiService.ts';

const COGNITIVE_DISTORTION_DEFINITIONS: Record<string, string> = {
    "All-or-Nothing Thinking (Black-and-White Thinking)": "Viewing situations in only two categories instead of on a continuum. (e.g., 'If I'm not a total success, I'm a failure.')",
    "Overgeneralization": "Seeing a single negative event as a never-ending pattern of defeat. (e.g., 'I failed this test, so I'll fail all of them.')",
    "Mental Filter": "Dwelling on the negatives and ignoring the positives. (e.g., Focusing on one critical comment and ignoring all the praise.)",
    "Disqualifying the Positive": "Insisting that your positive qualities or accomplishments don't count.",
    "Jumping to Conclusions (Mind Reading, Fortune Telling)": "Making negative interpretations without actual evidence. Mind reading is assuming what others think; fortune telling is predicting a negative outcome.",
    "Magnification (Catastrophizing) and Minimization": "Exaggerating the importance of negative things (catastrophizing) or shrinking the importance of positive things.",
    "Emotional Reasoning": "Assuming that your negative emotions necessarily reflect the way things really are. (e.g., 'I feel it, therefore it must be true.')",
    "Should Statements": "Using 'shoulds' and 'shouldn'ts' as a way to motivate yourself, which can lead to guilt or frustration.",
    "Labeling and Mislabeling": "An extreme form of overgeneralization. Instead of describing an error, you attach a negative label to yourself. (e.g., 'I'm a loser.')",
    "Personalization": "Blaming yourself for something you weren't entirely responsible for, or taking things personally that aren't about you."
};


const CognitiveRestructuring: React.FC<{
    thoughtRecords: ThoughtRecord[];
    setThoughtRecords: (records: React.SetStateAction<ThoughtRecord[]>) => void;
    theme: Theme;
}> = ({ thoughtRecords, setThoughtRecords, theme }) => {
    const [step, setStep] = useState(1);
    const [negativeThought, setNegativeThought] = useState('');
    const [identifiedDistortions, setIdentifiedDistortions] = useState<string[]>([]);
    const [reframedThought, setReframedThought] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedDistortion, setExpandedDistortion] = useState<string | null>(null);

    const themeClasses: Record<Theme, { bg: string, hoverBg: string, ring: string, text: string }> = {
        teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', ring: 'focus:ring-teal-500', text: 'text-teal-400' },
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', ring: 'focus:ring-blue-500', text: 'text-blue-400' },
        rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', ring: 'focus:ring-rose-500', text: 'text-rose-400' },
        amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', ring: 'focus:ring-amber-500', text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];

    const handleNextStep = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (step === 1) {
                const distortions = await analyzeDistortions(negativeThought);
                setIdentifiedDistortions(distortions);
                setStep(2);
            } else if (step === 2) {
                const reframed = await reframeThought(negativeThought, identifiedDistortions);
                setReframedThought(reframed);
                setStep(3);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const saveRecord = () => {
        const newRecord: ThoughtRecord = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            negativeThought,
            distortions: identifiedDistortions,
            reframedThought,
        };
        setThoughtRecords(prev => [newRecord, ...prev]);
        reset();
    };

    const reset = () => {
        setStep(1);
        setNegativeThought('');
        setIdentifiedDistortions([]);
        setReframedThought('');
        setError(null);
    };
    
    const renderStepContent = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Step 1: Identify the Negative Thought</h3>
                        <p className="text-slate-400 mb-4">What's a specific negative or automatic thought that's been bothering you? Write it down as it occurred to you.</p>
                        <textarea
                            value={negativeThought}
                            onChange={(e) => setNegativeThought(e.target.value)}
                            placeholder="e.g., 'I messed up that presentation, so now everyone thinks I'm incompetent.'"
                            className={`w-full h-24 bg-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                        />
                        <button onClick={handleNextStep} disabled={isLoading || !negativeThought.trim()} className={`mt-4 ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600`}>
                            {isLoading ? 'Analyzing...' : 'Analyze Thought'}
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Step 2: Identify Cognitive Distortions</h3>
                        <p className="text-slate-400 mb-4">The AI has identified the following potential cognitive distortions in your thought. Click on each to learn more.</p>
                        <div className="space-y-2 mb-4">
                            {identifiedDistortions.map(d => (
                                <div key={d} className="bg-slate-700/50 rounded-lg p-3">
                                    <button onClick={() => setExpandedDistortion(expandedDistortion === d ? null : d)} className="w-full text-left font-semibold text-slate-200">
                                        {d}
                                    </button>
                                    {expandedDistortion === d && (
                                        <p className="text-sm text-slate-400 mt-2 border-t border-slate-600 pt-2">
                                            {COGNITIVE_DISTORTION_DEFINITIONS[d] || "No definition available."}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                         <button onClick={handleNextStep} disabled={isLoading} className={`mt-4 ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600`}>
                            {isLoading ? 'Reframing...' : 'Reframe Thought'}
                        </button>
                    </div>
                );
            case 3:
                 return (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Step 3: Reframe the Thought</h3>
                        <p className="text-slate-400 mb-4">Here is a more balanced, alternative way to look at the situation, suggested by the AI:</p>
                        <div className="bg-slate-700/50 p-4 rounded-lg italic text-slate-200 mb-4">
                            "{reframedThought}"
                        </div>
                        <div className="flex gap-4">
                            <button onClick={saveRecord} className={`bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors`}>
                                Save Record
                            </button>
                            <button onClick={reset} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Start Over
                            </button>
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Cognitive Restructuring (CBT)</h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Thought Record Exercise</h3>
                    {error && <div className="text-red-400 bg-red-900/20 p-3 rounded-lg mb-4">{error}</div>}
                    {renderStepContent()}
                </div>

                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Your Past Records</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                         {thoughtRecords.length > 0 ? thoughtRecords.map(record => (
                            <div key={record.id} className="bg-slate-700/50 p-4 rounded-lg">
                                <p className="text-xs text-slate-500 mb-2">{new Date(record.date).toLocaleString()}</p>
                                <p className="text-slate-400 mb-1"><strong className="text-slate-300">Negative Thought:</strong> "{record.negativeThought}"</p>
                                <p className="text-slate-400 mb-2"><strong className="text-slate-300">Distortions:</strong> {record.distortions.join(', ')}</p>
                                <p className={`italic ${currentTheme.text}`}><strong className="text-slate-300 not-italic">Reframed Thought:</strong> "{record.reframedThought}"</p>
                            </div>
                         )) : <p className="text-slate-400 text-center">Your saved thought records will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CognitiveRestructuring;

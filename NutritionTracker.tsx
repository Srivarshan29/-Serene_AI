
import React, { useState } from 'react';
import type { FoodLogEntry, MoodEntry, Theme } from './types.ts';
import { analyzeNutritionAndMood } from './services/geminiService.ts';

interface NutritionAnalysis {
    summary: string;
    nutrientSuggestions: string[];
    substanceImpact: string;
    supplementIdeas: string[];
    disclaimer: string;
}

const NutritionTracker: React.FC<{
    foodLogs: FoodLogEntry[];
    setFoodLogs: (logs: React.SetStateAction<FoodLogEntry[]>) => void;
    moods: MoodEntry[];
    theme: Theme;
}> = ({ foodLogs, setFoodLogs, moods, theme }) => {
    const [foodName, setFoodName] = useState('');
    const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Snack');
    const [containsCaffeine, setContainsCaffeine] = useState(false);
    const [containsAlcohol, setContainsAlcohol] = useState(false);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const themeClasses: Record<Theme, { bg: string, hoverBg: string, ring: string, text: string }> = {
        teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', ring: 'focus:ring-teal-500', text: 'text-teal-400' },
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', ring: 'focus:ring-blue-500', text: 'text-blue-400' },
        rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', ring: 'focus:ring-rose-500', text: 'text-rose-400' },
        amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', ring: 'focus:ring-amber-500', text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];

    const handleAddLog = (e: React.FormEvent) => {
        e.preventDefault();
        if (!foodName.trim()) return;
        const newLog: FoodLogEntry = {
            id: Date.now().toString(),
            name: foodName.trim(),
            date: new Date().toISOString(),
            mealType,
            containsCaffeine,
            containsAlcohol
        };
        setFoodLogs(prev => [newLog, ...prev]);
        setFoodName('');
        setContainsCaffeine(false);
        setContainsAlcohol(false);
    };

    const handleGetAnalysis = async () => {
        setIsLoadingAnalysis(true);
        setError(null);
        setAnalysis(null);
        try {
            let resultString = await analyzeNutritionAndMood(foodLogs, moods);
            
            if (resultString.includes('```json')) {
                resultString = resultString.split('```json')[1].split('```')[0].trim();
            } else if (resultString.startsWith('```')) {
                resultString = resultString.substring(3, resultString.length - 3).trim();
            }
            
            const resultJson = JSON.parse(resultString);
            setAnalysis(resultJson);
        } catch (err) {
            console.error(err);
            setError("Failed to generate analysis. The AI may be busy, or there might be an issue with the data format. Please try again.");
        }
        setIsLoadingAnalysis(false);
    };
    
    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Nutrition & Mental Health Tracker</h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                    <div className="bg-slate-800/50 p-6 rounded-lg mb-8 border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">Log Your Meal or Drink</h3>
                        <form onSubmit={handleAddLog} className="space-y-4">
                            <div>
                                <label htmlFor="foodName" className="block text-sm font-medium text-slate-300 mb-1">Food / Drink Name</label>
                                <input
                                    id="foodName"
                                    type="text"
                                    value={foodName}
                                    onChange={e => setFoodName(e.target.value)}
                                    placeholder="e.g., Coffee, Avocado Toast"
                                    className={`w-full p-2 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="mealType" className="block text-sm font-medium text-slate-300 mb-1">Meal Type</label>
                                <select id="mealType" value={mealType} onChange={e => setMealType(e.target.value as any)} className={`w-full p-2 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 ${currentTheme.ring}`}>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                    <option>Snack</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" checked={containsCaffeine} onChange={e => setContainsCaffeine(e.target.checked)} className={`w-4 h-4 rounded ${currentTheme.ring} text-teal-500`}/> Contains Caffeine</label>
                                <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" checked={containsAlcohol} onChange={e => setContainsAlcohol(e.target.checked)} className={`w-4 h-4 rounded ${currentTheme.ring} text-teal-500`}/> Contains Alcohol</label>
                            </div>
                            <button type="submit" className={`w-full font-bold py-2 px-4 rounded-lg text-white ${currentTheme.bg} ${currentTheme.hoverBg} transition-colors`}>Add Log</button>
                        </form>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Logs</h3>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {foodLogs.slice(0, 10).map(log => (
                                <li key={log.id} className="text-slate-300 bg-slate-700/50 p-2 rounded-md">
                                    <strong>{log.name}</strong> ({log.mealType})
                                    {(log.containsCaffeine || log.containsAlcohol) && <span className="text-xs text-amber-400 ml-2">{log.containsCaffeine && 'Caffeine '}{log.containsAlcohol && 'Alcohol'}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">AI Diet & Mood Report</h3>
                    <p className="text-slate-400 mb-4">When you're ready, let the AI analyze your recent food and mood logs to find potential connections.</p>
                    <button onClick={handleGetAnalysis} disabled={isLoadingAnalysis || foodLogs.length < 2 || moods.length < 2} className={`w-full ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed`}>
                        {isLoadingAnalysis ? 'Analyzing...' : 'Generate Report'}
                    </button>
                    {(foodLogs.length < 2 || moods.length < 2) && <p className="text-xs text-slate-500 mt-2 text-center">Log at least 2 food items and 2 moods to enable analysis.</p>}

                    {isLoadingAnalysis && <div className="text-center mt-4 text-slate-300 animate-pulse">Generating your personalized report...</div>}
                    {error && <div className="text-red-400 mt-4">{error}</div>}
                    {analysis && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                            <div><h4 className={`font-semibold ${currentTheme.text}`}>Summary:</h4><p className="text-slate-300 text-sm">{analysis.summary}</p></div>
                            <div><h4 className={`font-semibold ${currentTheme.text}`}>Nutrient Suggestions:</h4><ul className="list-disc list-inside text-sm text-slate-300">{analysis.nutrientSuggestions.map((s,i) => <li key={i}>{s}</li>)}</ul></div>
                            <div><h4 className={`font-semibold ${currentTheme.text}`}>Substance Impact:</h4><p className="text-slate-300 text-sm">{analysis.substanceImpact}</p></div>
                            <div><h4 className={`font-semibold ${currentTheme.text}`}>Supplement Ideas:</h4><ul className="list-disc list-inside text-sm text-slate-300">{analysis.supplementIdeas.map((s,i) => <li key={i}>{s}</li>)}</ul></div>
                            <p className="text-xs text-slate-500 italic mt-4">{analysis.disclaimer}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NutritionTracker;
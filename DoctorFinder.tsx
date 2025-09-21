
import React, { useState, useMemo } from 'react';
import { findDoctors } from './services/geminiService.ts';
import type { GroundingSource, Theme, DoctorInfo } from './types.ts';
import { MapPinIcon, DoctorIcon } from './Icons.tsx';

interface DoctorFinderProps {
    theme: Theme;
}

const parseDoctorResults = (text: string): DoctorInfo[] => {
    if (!text) return [];

    const entries = text.split(/^\s*\d+\.\s*|\s*-\s*|\s*\*\s*/m).filter(entry => entry.trim().length > 10);

    return entries.map(entry => {
        const nameMatch = entry.match(/^(?:Name|Professional):\s*(.*)/im);
        const clinicMatch = entry.match(/Clinic:\s*(.*)/im);
        const contactMatch = entry.match(/Contact:\s*(.*)/im);
        const descMatch = entry.match(/Description:\s*([\s\S]*)/im);

        const lines = entry.trim().split('\n');
        const defaultName = lines[0] || 'Name not found';

        return {
            name: nameMatch ? nameMatch[1].trim() : defaultName,
            clinic: clinicMatch ? clinicMatch[1].trim() : 'Clinic not found',
            contact: contactMatch ? contactMatch[1].trim() : 'Contact not found',
            description: descMatch ? descMatch[1].trim() : entry.trim(),
        };
    });
};


export const DoctorFinder: React.FC<DoctorFinderProps> = ({ theme }) => {
    const [location, setLocation] = useState('');
    const [doctorResults, setDoctorResults] = useState<DoctorInfo[]>([]);
    const [sources, setSources] = useState<GroundingSource[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location.trim()) {
            setError("Please enter a location to search.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setDoctorResults([]);
        setSources([]);

        try {
            const response = await findDoctors(location.trim());
            const parsed = parseDoctorResults(response.text);
            setDoctorResults(parsed);
            setSources(response.sources);
        } catch (err: any) {
            console.error("Failed to find doctors:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const themeClasses: Record<Theme, { ring: string, bg: string, hoverBg: string, text: string }> = {
        teal: { ring: 'focus:ring-teal-500', bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', text: 'text-teal-400' },
        blue: { ring: 'focus:ring-blue-500', bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', text: 'text-blue-400' },
        rose: { ring: 'focus:ring-rose-500', bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', text: 'text-rose-400' },
        amber: { ring: 'focus:ring-amber-500', bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', text: 'text-amber-400' },
    };
    const currentTheme = themeClasses[theme];

    return (
        <div className="p-6 h-full flex flex-col bg-slate-800 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Find a Mental Health Professional</h2>
            <p className="text-slate-400 mb-6">Enter your city or zip code to find therapists, psychologists, and psychiatrists near you, powered by Google Search.</p>
            
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city, state, or zip code..."
                    disabled={isLoading}
                    className={`flex-1 bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring} transition-colors duration-300`}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`${currentTheme.bg} text-white font-semibold rounded-lg px-4 py-2 ${currentTheme.hoverBg} disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                        </>
                    ) : (
                        <>
                            <MapPinIcon className="w-5 h-5 mr-2" />
                            Search
                        </>
                    )}
                </button>
            </form>

            <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                {error && <div className="text-red-400 text-center p-4">{error}</div>}
                
                {doctorResults.length > 0 && (
                    <div className="space-y-4 animate-fade-in">
                        {doctorResults.map((doctor, index) => (
                             <div key={index} className="bg-slate-700/50 p-6 rounded-lg border border-slate-600/50">
                                {doctor.name !== 'Name not found' && <h3 className="text-xl font-bold text-white">{doctor.name}</h3>}
                                {doctor.clinic !== 'Clinic not found' && <p className={`${currentTheme.text} font-semibold`}>{doctor.clinic}</p>}
                                {doctor.contact !== 'Contact not found' && <p className="text-slate-300 mt-2">{doctor.contact}</p>}
                                <p className="text-slate-400 mt-3 whitespace-pre-wrap border-t border-slate-600/50 pt-3">{doctor.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {sources.length > 0 && (
                     <div className="mt-6 border-t border-slate-700 pt-4 animate-fade-in">
                        <h3 className="text-lg font-semibold text-white mb-2">Sources</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {sources.map((source, index) => source.web?.uri && (
                                <li key={index}>
                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className={`${currentTheme.text} hover:underline`}>
                                        {source.web.title || source.web.uri}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!isLoading && doctorResults.length === 0 && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <DoctorIcon />
                        <p className="mt-4">Your search results will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorFinder;
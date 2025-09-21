import React, { useState, useEffect, useRef } from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{children}</svg>
);

const Soundscapes: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
    const [activeTheme, setActiveTheme] = useState<string>('relax');

    const themes: Record<string, { gradient: string; icon: React.ReactNode; songs: any[] }> = {
        relax: {
            gradient: 'from-teal-900 to-gray-900',
            icon: <IconWrapper><path d="M13 10V3L4 14h7v7l9-11h-7z" /></IconWrapper>,
            songs: [
                { name: "Peaceful Mind", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
                { name: "Calm Waves", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
                { name: "Gentle Melody", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
                { name: "Quiet Contemplation", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
                { name: "Serene Piano", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
                { name: "Forest Rain", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
            ]
        },
        focus: {
            gradient: 'from-blue-900 to-gray-900',
            icon: <IconWrapper><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>,
            songs: [
                 { name: "Focus Flow", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
                 { name: "Gentle Awakening", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
                 { name: "Deep Thought", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
                 { name: "Study Session", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
                 { name: "Digital Zen", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
                 { name: "Mindful Coding", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
                 { name: "Ambient Study", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
            ]
        },
        uplifting: {
            gradient: 'from-yellow-800 to-gray-900',
            icon: <IconWrapper><path d="M5 10l7-7 7 7M5 17l7-7 7 7" /></IconWrapper>,
            songs: [
                { name: "Morning Sun", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
                { name: "Bright Day", artist: "SoundHelix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
            ]
        }
    };

    const togglePlay = (songUrl: string) => {
        if (!audioRef.current) return;

        if (currentlyPlaying === songUrl) {
            audioRef.current.pause();
            setCurrentlyPlaying(null);
        } else {
            audioRef.current.src = songUrl;
            audioRef.current.play();
            setCurrentlyPlaying(songUrl);
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => setCurrentlyPlaying(null);
        
        audio?.addEventListener('ended', handleEnded);

        return () => {
            audio?.pause();
            audio?.removeEventListener('ended', handleEnded);
        };
    }, []);
    
    const currentGradient = themes[activeTheme]?.gradient || 'from-gray-900 to-gray-800';
    const songsToShow = themes[activeTheme]?.songs || [];

    return (
        <div className={`p-8 transition-all duration-500 bg-gradient-to-br ${currentGradient}`}>
            <div>
                <h2 className="text-3xl font-bold mb-2 text-white">Adaptive Soundscapes</h2>
                <p className="text-gray-300 mb-8">Select a mood to change the atmosphere and available royalty-free tracks.</p>
                <audio ref={audioRef} />

                <div className="flex justify-center gap-4 mb-10">
                    {Object.keys(themes).map(themeKey => (
                         <button 
                            key={themeKey}
                            onClick={() => setActiveTheme(themeKey)} 
                            className={`flex flex-col items-center justify-center w-32 h-32 p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${activeTheme === themeKey ? 'bg-white/20 border-2 border-white/50' : 'bg-white/5 hover:bg-white/10'}`}
                         >
                            {themes[themeKey].icon}
                            <span className="mt-2 text-white font-semibold capitalize">{themeKey}</span>
                         </button>
                    ))}
                </div>
                
                 <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
                     <h3 className="text-2xl font-bold mb-4 text-white capitalize">{activeTheme} Tracks</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {songsToShow.map(song => {
                            const isPlaying = currentlyPlaying === song.url;
                            return (
                                <div key={song.url} className={`p-4 rounded-lg flex items-center justify-between transition-colors ${isPlaying ? 'bg-indigo-500/50' : 'bg-white/10'}`}>
                                    <div>
                                       <p className="text-lg font-medium text-white">{song.name}</p>
                                       <p className="text-sm text-gray-300">{song.artist}</p>
                                    </div>
                                    <button 
                                        onClick={() => togglePlay(song.url)} 
                                        className={`w-32 px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center ${isPlaying ? 'bg-indigo-500 text-white animate-pulse-slow' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                                        aria-label={isPlaying ? `Pause ${song.name}` : `Play ${song.name}`}
                                    >
                                        {isPlaying ? (
                                             <IconWrapper><path d="M10 9v6m4-6v6" /></IconWrapper>
                                        ) : (
                                             <IconWrapper><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></IconWrapper>
                                        )}
                                        <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Soundscapes;
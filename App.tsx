
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.ts';
import type { View, Persona, MoodEntry, Habit, JournalEntry, ChatMessage, Theme, FoodLogEntry, ThoughtRecord } from './types.ts';
import { ICONS, PatientAvatar } from './Icons.tsx';
import Sidebar from './Sidebar.tsx';
import CrisisModal from './CrisisModal.tsx';
import Chat from './Chat.tsx';
import MoodVisualizer from './MoodTracker.tsx';
import Journal from './Journal.tsx';
import HabitTracker from './HabitTracker.tsx';
import Analytics from './Analytics.tsx';
import WellnessGarden from './WellnessGarden.tsx';
import AdvancedPersonalityAssessment from './AdvancedPersonalityAssessment.tsx';
import Resources from './Resources.tsx';
import Soundscapes from './Soundscapes.tsx';
import Sanctuary from './Sanctuary.tsx';
import DoctorFinder from './DoctorFinder.tsx';
import Settings from './Settings.tsx';
import About from './About.tsx';
import AuthScreen from './AuthScreen.tsx';
import Dashboard from './Dashboard.tsx';
import UserProfile from './UserProfile.tsx';
import NutritionTracker from './NutritionTracker.tsx';
import GuidedBreathing from './GuidedBreathing.tsx';
import CognitiveRestructuring from './CognitiveRestructuring.tsx';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('serene-isLoggedIn', false);
    const [currentView, setCurrentView] = useLocalStorage<View>('serene-view', 'dashboard');
    const [persona, setPersona] = useLocalStorage<Persona>('serene-persona', 'Supportive');
    const [theme, setTheme] = useLocalStorage<Theme>('serene-theme', 'teal');
    const [username, setUsername] = useLocalStorage<string | null>('serene-username', null);
    const [profilePicture, setProfilePicture] = useLocalStorage<string | null>('serene-profilePicture', null);
    const [showCrisisModal, setShowCrisisModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Data states
    const [moods, setMoods] = useLocalStorage<MoodEntry[]>('serene-moods', []);
    const [habits, setHabits] = useLocalStorage<Habit[]>('serene-habits', []);
    const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('serene-journal', []);
    const [chatHistory, setChatHistory] = useLocalStorage<ChatMessage[]>('serene-chat', []);
    const [foodLogs, setFoodLogs] = useLocalStorage<FoodLogEntry[]>('serene-foodlogs', []);
    const [thoughtRecords, setThoughtRecords] = useLocalStorage<ThoughtRecord[]>('serene-cbt-records', []);


    if (!isLoggedIn) {
        return <AuthScreen setIsLoggedIn={setIsLoggedIn} theme={theme} />;
    }

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard moods={moods} habits={habits} journalEntries={journalEntries} foodLogs={foodLogs} theme={theme} username={username} setCurrentView={setCurrentView} />;
            case 'chat': return <Chat history={chatHistory} setHistory={setChatHistory} persona={persona} setShowCrisisModal={setShowCrisisModal} theme={theme} profilePicture={profilePicture} />;
            case 'mood': return <MoodVisualizer moods={moods} setMoods={setMoods} journalEntries={journalEntries} chatHistory={chatHistory} theme={theme} />;
            case 'journal': return <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} />;
            case 'habits': return <HabitTracker habits={habits} setHabits={setHabits} moods={moods} journalEntries={journalEntries} chatHistory={chatHistory} theme={theme} />;
            case 'nutrition': return <NutritionTracker foodLogs={foodLogs} setFoodLogs={setFoodLogs} moods={moods} theme={theme} />;
            case 'analytics': return <Analytics moods={moods} habits={habits} theme={theme} />;
            case 'garden': return <WellnessGarden moods={moods} habits={habits} journalEntries={journalEntries} />;
            case 'personality': return <AdvancedPersonalityAssessment theme={theme} />;
            case 'resources': return <Resources theme={theme} />;
            case 'soundscapes': return <Soundscapes />;
            case 'guidedBreathing': return <GuidedBreathing theme={theme}/>;
            case 'cbt': return <CognitiveRestructuring thoughtRecords={thoughtRecords} setThoughtRecords={setThoughtRecords} theme={theme} />;
            case 'sanctuary': return <Sanctuary moods={moods} chatHistory={chatHistory} journalEntries={journalEntries} setCurrentView={setCurrentView} theme={theme} />;
            case 'doctor': return <DoctorFinder theme={theme} />;
            // FIX: Pass setProfilePicture prop to UserProfile component.
            case 'profile': return <UserProfile username={username} setUsername={setUsername} profilePicture={profilePicture} setProfilePicture={setProfilePicture} persona={persona} setPersona={setPersona} theme={theme} />;
            case 'settings': return <Settings theme={theme} setTheme={setTheme} />;
            case 'about': return <About theme={theme} />;
            default: return <Dashboard moods={moods} habits={habits} journalEntries={journalEntries} foodLogs={foodLogs} theme={theme} username={username} setCurrentView={setCurrentView} />;
        }
    };
    
    const MenuIcon = ICONS['menu'];

    return (
        <div className={`relative flex h-screen bg-gradient-to-b from-slate-900 to-[#111827] text-slate-100 font-sans`}>
            {showCrisisModal && <CrisisModal onClose={() => setShowCrisisModal(false)} />}
            
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden"></div>}

            <Sidebar 
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                persona={persona} 
                setPersona={setPersona} 
                theme={theme}
                setIsLoggedIn={setIsLoggedIn}
            />
            
            <main className="flex-1 flex flex-col bg-slate-800/50 overflow-hidden">
                 <header className={`flex-shrink-0 flex items-center justify-between h-16 px-6 bg-slate-900/60 backdrop-blur-lg border-b border-slate-700/60 z-20`}>
                     <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-300 hover:text-white md:hidden">
                         <MenuIcon />
                         <span className="sr-only">Open menu</span>
                     </button>
                     <div className="md:w-10"></div>

                     <button onClick={() => setCurrentView('profile')} className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-700/50 transition-colors">
                        <span className="text-white font-medium hidden sm:block pr-2">{username || 'User'}</span>
                        <div className="w-10 h-10 rounded-full ring-2 ring-slate-600">
                          <PatientAvatar className="w-full h-full" imageUrl={profilePicture} />
                        </div>
                    </button>
                </header>
                 <div className="flex-1 overflow-y-auto">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;
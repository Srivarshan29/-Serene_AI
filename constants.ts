
import type { View, Persona } from './types';

export const NAV_ITEMS: { id: View; label: string; }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'mood', label: 'Mood Visualizer' },
    { id: 'journal', label: 'Journal' },
    { id: 'habits', label: 'Habit Tracker' },
    { id: 'nutrition', label: 'Nutrition Tracker' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'garden', label: 'Wellness Garden' },
    { id: 'personality', label: 'Personality Insights' },
    { id: 'soundscapes', label: 'Soundscapes' },
    { id: 'guidedBreathing', label: 'Guided Breathing' },
    { id: 'cbt', label: 'Cognitive Restructuring' },
    { id: 'sanctuary', label: 'Sanctuary' },
    { id: 'doctor', label: 'Find a Doctor' },
    { id: 'resources', label: 'Resources' },
    { id: 'settings', label: 'Settings' },
    { id: 'about', label: 'About' },
];

export const PERSONAS: Persona[] = ['Supportive', 'CBT', 'Jungian', 'Lacanian'];

export const CRISIS_KEYWORDS: string[] = [
    'suicide', 'self-harm', 'kill myself', 'want to die', 'hopeless', 
    'end my life', 'self harm', 'cutting', 'overdose'
];

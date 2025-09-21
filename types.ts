
export type View = 'dashboard' | 'chat' | 'mood' | 'journal' | 'habits' | 'analytics' | 'garden' | 'personality' | 'resources' | 'soundscapes' | 'doctor' | 'sanctuary' | 'settings' | 'about' | 'profile' | 'nutrition' | 'guidedBreathing' | 'cbt';

export type Persona = 'CBT' | 'Jungian' | 'Lacanian' | 'Supportive';

export type Theme = 'teal' | 'blue' | 'rose' | 'amber';

export const MOODS = ['Ecstatic', 'Happy', 'Neutral', 'Sad', 'Anxious', 'Angry'] as const;
export type Mood = typeof MOODS[number];

export interface MoodEntry {
  id: string;
  mood: Mood;
  date: string;
}

export interface Habit {
  id:string;
  name: string;
  completedDates: string[];
}

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface FoodLogEntry {
  id: string;
  name: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  containsCaffeine: boolean;
  containsAlcohol: boolean;
}

export interface DoctorInfo {
  name: string;
  clinic: string;
  contact: string;
  description: string;
}

export interface ThoughtRecord {
    id: string;
    date: string;
    negativeThought: string;
    distortions: string[];
    reframedThought: string;
}

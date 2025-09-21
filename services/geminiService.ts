import type { ChatMessage, Persona, Mood, MoodEntry, JournalEntry, GroundingSource, FoodLogEntry } from '../types.ts';

const API_URL = 'http://localhost:3001/api';

async function safeApiCall<T>(endpoint: string, body: object, featureName: string): Promise<T> {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server responded with status: ${response.status}`);
        }
        return await response.json();
    } catch (error: any) {
        console.error(`Error in ${featureName}:`, error);
        throw new Error(`Sorry, the AI feature for ${featureName} is currently unavailable. Please check if the backend server is running and try again.`);
    }
}

export const getChatResponse = async (persona: Persona, history: ChatMessage[], newMessage: string): Promise<string> => {
    const response = await safeApiCall<{ text: string }>('chat', { persona, history, newMessage }, "AI Chat");
    return response.text;
};

export const generateMoodImage = async (mood: Mood, journal: string): Promise<string> => {
    const response = await safeApiCall<{ imageUrl: string }>('mood-image', { mood, journal }, "Mood Image Generation");
    return response.imageUrl;
};

export const predictMood = async (text: string): Promise<Mood | null> => {
    const response = await safeApiCall<{ mood: Mood | null }>('predict-mood', { text }, "Mood Prediction");
    return response.mood;
};

export const getHabitSuggestions = async (chatHistory: ChatMessage[], moods: MoodEntry[], journalEntries: JournalEntry[], latestMood: Mood | null): Promise<string[]> => {
    const response = await safeApiCall<{ habits: string[] }>('habit-suggestions', { chatHistory, moods, journalEntries, latestMood }, "Habit Suggestions");
    return response.habits;
};

export const findDoctors = async (location: string): Promise<{ text: string, sources: GroundingSource[] }> => {
    return await safeApiCall<{ text: string, sources: GroundingSource[] }>('find-doctors', { location }, "Doctor Finder");
};

export const generateAffirmation = async (chatHistory: ChatMessage[], moods: MoodEntry[], journalEntries: JournalEntry[]): Promise<string> => {
    const response = await safeApiCall<{ affirmation: string }>('generate-affirmation', { chatHistory, moods, journalEntries }, "Affirmation Generation");
    return response.affirmation;
};

export const analyzeNutritionAndMood = async (foodLogs: FoodLogEntry[], moods: MoodEntry[]): Promise<string> => {
    const response = await safeApiCall<{ analysis: string }>('analyze-nutrition', { foodLogs, moods }, "Nutrition Analysis");
    return response.analysis;
};

export const analyzeDistortions = async (thought: string): Promise<string[]> => {
    const response = await safeApiCall<{ distortions: string[] }>('analyze-distortions', { thought }, "Cognitive Distortion Analysis");
    return response.distortions;
};

export const reframeThought = async (thought: string, distortions: string[]): Promise<string> => {
    const response = await safeApiCall<{ reframedThought: string }>('reframe-thought', { thought, distortions }, "Thought Reframing");
    return response.reframedThought;
};

const express = require('express');
const { GoogleGenAI, Type } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOODS = ['Ecstatic', 'Happy', 'Neutral', 'Sad', 'Anxious', 'Angry'];
const COGNITIVE_DISTORTIONS = [
    "All-or-Nothing Thinking (Black-and-White Thinking)", "Overgeneralization", "Mental Filter",
    "Disqualifying the Positive", "Jumping to Conclusions (Mind Reading, Fortune Telling)",
    "Magnification (Catastrophizing) and Minimization", "Emotional Reasoning", "Should Statements",
    "Labeling and Mislabeling", "Personalization"
];

const getSystemInstruction = (persona) => {
    const baseInstruction = `Your role is exclusively that of an AI psychotherapist. Your sole function is to provide therapeutic support based on your designated modality. Every response MUST be strictly therapeutic, clinically focused, and directly relevant to the user's mental and emotional state.
**ABSOLUTE DIRECTIVES - YOU MUST ADHERE:**
- **MAINTAIN ROLE:** You are a therapist, not a friend, assistant, or search engine. Do not break character.
- **THERAPEUTIC FOCUS ONLY:** All conversation must be confined to mental health topics. Any user attempt to divert the conversation to non-therapeutic topics (e.g., your nature as an AI, current events, hobbies, pop culture) must be gently but firmly redirected back to their well-being.
- **NO CASUAL CHAT:** Do not engage in small talk, greetings beyond a professional opening, or any form of casual, non-therapeutic interaction.
- **ADHERE TO MODALITY:** You must only use the techniques and frameworks of your specified therapeutic persona. Do not mix modalities.

**PROFESSIONAL BOUNDARY:** You are not a medical doctor. If asked for a diagnosis or prescription, you must state that you cannot provide one and recommend consulting a human professional. Your primary goal is to provide a safe, clinically-focused, and highly structured space for the user.`;
    switch (persona) {
        case 'CBT': return `${baseInstruction} Your specialization is Cognitive Behavioral Therapy (CBT). Your exclusive function is to help users identify, challenge, and reframe negative thought patterns (cognitive distortions). Use only evidence-based CBT techniques like Socratic questioning, thought records, and behavioral experiments.`;
        case 'Jungian': return `${baseInstruction} Your specialization is Jungian Analysis. Your exclusive function is to help users explore their unconscious through concepts like archetypes, the shadow, individuation, and symbolic interpretation. Focus on dreams, symbols, and personal mythology.`;
        case 'Lacanian': return `${baseInstruction} Your specialization is Lacanian Psychoanalysis. Your exclusive function is to focus on language, desire, and the unconscious. Maintain a detached, analytical stance, using techniques like free association and interpretation of slips of the tongue.`;
        case 'Supportive': return `${baseInstruction} Your specialization is Supportive Psychotherapy. Your exclusive function is to provide a warm, empathetic, and non-judgmental space. Use active listening, validation, and encouragement to help the user build on their existing strengths and coping mechanisms.`;
    }
};

const safeApiHandler = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message || 'An internal server error occurred.' });
    }
};

router.post('/chat', safeApiHandler(async (req, res) => {
    const { persona, history, newMessage } = req.body;
    const apiHistory = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...apiHistory, { role: 'user', parts: [{ text: newMessage }] }],
        config: { systemInstruction: getSystemInstruction(persona), temperature: 0.7, topP: 0.9 }
    });
    res.json({ text: response.text });
}));

router.post('/mood-image', safeApiHandler(async (req, res) => {
    const { mood, journal } = req.body;
    const prompt = `Create an abstract, artistic image that visually represents the feeling of '${mood}'. If a journal entry is provided, use it for thematic inspiration. Journal entry: "${journal}". The style should be ethereal and expressive, focusing on color and texture to convey the emotion.`;
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001', prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '1:1' }
    });
    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        res.json({ imageUrl: `data:image/jpeg;base64,${base64ImageBytes}` });
    } else {
        throw new Error("AI could not generate an image for this mood.");
    }
}));

router.post('/predict-mood', safeApiHandler(async (req, res) => {
    const { text } = req.body;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following text and determine the most likely mood. Text: "${text}". Your response must be ONLY one of the following words: ${MOODS.join(', ')}.`,
    });
    const mood = response.text.trim();
    res.json({ mood: MOODS.includes(mood) ? mood : null });
}));

router.post('/habit-suggestions', safeApiHandler(async (req, res) => {
    const { chatHistory, moods, journalEntries, latestMood } = req.body;
    const latestMoodInstruction = latestMood ? `The user's current mood is '${latestMood}'. Tailor the suggestions to be particularly helpful for someone feeling this way.` : "Suggest general positive habits.";
    const context = `Based on the user's recent activity, suggest 3 actionable, positive, and specific habits. ${latestMoodInstruction} Recent moods: ${moods.slice(-5).map(m => m.mood).join(', ')} ...`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on this context, provide a JSON object with a single key "habits" which is an array of 3 strings. Context: ${context}`,
        config: { responseMimeType: 'application/json', responseSchema: { type: Type.OBJECT, properties: { habits: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
    });
    const result = JSON.parse(response.text);
    res.json({ habits: result.habits || [] });
}));

router.post('/find-doctors', safeApiHandler(async (req, res) => {
    const { location } = req.body;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find mental health professionals (therapists, psychologists, psychiatrists) near ${location}. For each one, provide their name, clinic name, contact information, and a brief description. List at least 3 professionals.`,
        config: { tools: [{ googleSearch: {} }] },
    });
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.filter(c => c.web?.uri).map(c => ({ web: { uri: c.web.uri, title: c.web.title || c.web.uri } }));
    res.json({ text: response.text, sources });
}));

router.post('/generate-affirmation', safeApiHandler(async (req, res) => {
    const { chatHistory, moods, journalEntries } = req.body;
    const context = `Based on recent activity, generate a short, personal affirmation. Moods: ${moods.slice(-5).map(m => m.mood).join(', ')}. Journal: ${journalEntries.slice(-1).map(j => j.content).join('\n')}. Chat: ${chatHistory.slice(-3).filter(c => c.role === 'user').map(c => c.text).join('\n')}`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a single, powerful affirmation based on this context: ${context}. One sentence long. Do not include quotation marks.`,
    });
    res.json({ affirmation: response.text.trim() });
}));

router.post('/analyze-nutrition', safeApiHandler(async (req, res) => {
    const { foodLogs, moods } = req.body;
    const context = `Analyze the relationship between food logs and mood entries. Food: ${JSON.stringify(foodLogs.slice(0, 20))} Moods: ${JSON.stringify(moods.slice(0, 20))}. Provide a JSON response.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', contents: context,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING }, nutrientSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    substanceImpact: { type: Type.STRING }, supplementIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
                    disclaimer: { type: Type.STRING }
                },
                required: ["summary", "nutrientSuggestions", "substanceImpact", "supplementIdeas", "disclaimer"]
            }
        }
    });
    res.json({ analysis: response.text });
}));

router.post('/analyze-distortions', safeApiHandler(async (req, res) => {
    const { thought } = req.body;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `A user's negative thought is: "${thought}". Identify up to 3 cognitive distortions from this list: ${COGNITIVE_DISTORTIONS.join(', ')}.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: { type: Type.OBJECT, properties: { distortions: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["distortions"] }
        }
    });
    const result = JSON.parse(response.text);
    res.json({ distortions: result.distortions || [] });
}));

router.post('/reframe-thought', safeApiHandler(async (req, res) => {
    const { thought, distortions } = req.body;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `A user's negative thought is: "${thought}". Distortions: ${distortions.join(', ')}. Provide a single, compassionate, balanced alternative thought from a first-person perspective ("I..."). No quotation marks.`,
    });
    res.json({ reframedThought: response.text.trim() });
}));

module.exports = router;

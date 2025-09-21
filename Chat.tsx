
import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, Persona, Theme } from './types.ts';
import { CRISIS_KEYWORDS } from './constants.ts';
import { getChatResponse } from './services/geminiService.ts';
import { SendIcon, DoctorAvatar, PatientAvatar, MicOnIcon, MicOffIcon, SpeechOnIcon, SpeechOffIcon } from './Icons.tsx';

const Chat: React.FC<{
    history: ChatMessage[];
    setHistory: (history: ChatMessage[]) => void;
    persona: Persona;
    setShowCrisisModal: (show: boolean) => void;
    theme: Theme;
    profilePicture: string | null;
}> = ({ history, setHistory, persona, setShowCrisisModal, theme, profilePicture }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSynthesizing, setIsSynthesizing] = useState(false); // Tracks if TTS is actively speaking
    const recognitionRef = useRef<any>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const themeClasses: Record<Theme, { from: string, to: string, text: string, ring: string, glowColor: string }> = {
        teal: { from: 'from-teal-500', to: 'to-teal-600', text: 'text-teal-300', ring: 'ring-teal-500', glowColor: '#14b8a6'},
        blue: { from: 'from-blue-500', to: 'to-blue-600', text: 'text-blue-300', ring: 'ring-blue-500', glowColor: '#3b82f6'},
        rose: { from: 'from-rose-500', to: 'to-rose-600', text: 'text-rose-300', ring: 'ring-rose-500', glowColor: '#ec4899'},
        amber: { from: 'from-amber-500', to: 'to-amber-600', text: 'text-amber-300', ring: 'ring-amber-500', glowColor: '#f59e0b'},
    };
    const currentTheme = themeClasses[theme];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [history]);
    
    useEffect(() => {
        if(history.length === 0){
             setHistory([{role: 'model', text: `Hello! I'm Serene, your personal wellness companion. How are you feeling today?`}]);
        }
    }, [history, setHistory]);

    // Initialize speech synthesis utterance instance once
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.onstart = () => setIsSynthesizing(true);
            utterance.onend = () => setIsSynthesizing(false);
            utterance.onerror = (e) => {
                console.error('Speech synthesis error.', e);
                setIsSynthesizing(false);
            };
            utteranceRef.current = utterance;
        }
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Effect to handle speaking text
    useEffect(() => {
        const lastMessage = history[history.length - 1];
        const synth = window.speechSynthesis;

        if (isSpeaking && lastMessage?.role === 'model' && utteranceRef.current && synth) {
             if (synth.speaking && utteranceRef.current.text === lastMessage.text) {
                return; // Avoid restarting if it's already speaking the same message
            }
            synth.cancel();
            utteranceRef.current.text = lastMessage.text;
            synth.speak(utteranceRef.current);
        } else if (synth) {
            synth.cancel();
        }
    }, [history, isSpeaking]);


    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';
            
            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
            
            recognitionRef.current.onend = () => {
                 setIsListening(false);
            }
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };


    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const lowercasedInput = input.toLowerCase();
        if (CRISIS_KEYWORDS.some(keyword => lowercasedInput.includes(keyword))) {
            setShowCrisisModal(true);
        }

        const newHistory: ChatMessage[] = [...history, { role: 'user', text: input }];
        setHistory(newHistory);
        setInput('');
        setLoading(true);

        try {
            const responseText = await getChatResponse(persona, newHistory, input);
            setHistory([...newHistory, { role: 'model', text: responseText }]);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
            setHistory([...newHistory, { role: 'model', text: `Sorry, I encountered an error: ${errorMessage}` }]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-slate-800/50">
             <style>{`
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 12px 0px var(--glow-color);
                    }
                    50% {
                        box-shadow: 0 0 24px 6px var(--glow-color);
                    }
                }
                .pulsating-glow {
                    animation: pulse-glow 2.5s infinite ease-in-out;
                }
            `}</style>
            <div className={`p-4 border-b border-slate-700/60 flex justify-around items-center bg-slate-900/60 backdrop-blur-md`}>
                <div className="text-center">
                    <div 
                        className={`relative rounded-full p-1 ${isListening ? 'pulsating-glow' : ''}`}
                        style={{ '--glow-color': isListening ? currentTheme.glowColor : 'transparent' } as React.CSSProperties}
                    >
                        <PatientAvatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto" imageUrl={profilePicture} />
                    </div>
                    <p className="mt-2 font-bold text-lg text-slate-200">You</p>
                </div>
                <div className={`text-4xl font-bold ${currentTheme.text}`}>&harr;</div>
                <div className="text-center">
                    <div 
                        className={`relative rounded-full p-1 ${(loading || isSynthesizing) ? 'pulsating-glow' : ''}`}
                        style={{ '--glow-color': (loading || isSynthesizing) ? currentTheme.glowColor : 'transparent' } as React.CSSProperties}
                    >
                        <DoctorAvatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto" />
                    </div>
                    <p className="mt-2 font-bold text-lg text-slate-200">{persona} Persona</p>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {history.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full ring-2 ring-slate-700 overflow-hidden">
                           {msg.role === 'model' ? <DoctorAvatar className="w-full h-full" /> : <PatientAvatar className="w-full h-full" imageUrl={profilePicture} />}
                        </div>
                        <div className={`max-w-xl p-4 rounded-2xl shadow-md ${msg.role === 'user' ? `bg-gradient-to-br ${currentTheme.from} ${currentTheme.to} text-white rounded-br-none` : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 rounded-bl-none'}`}>
                           <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-end gap-3 flex-row">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full ring-2 ring-slate-700 overflow-hidden">
                           <DoctorAvatar className="w-full h-full" />
                        </div>
                        <div className="max-w-xl p-4 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 rounded-bl-none flex items-center">
                            <div className="animate-pulse flex space-x-2">
                                <div className={`w-3 h-3 bg-slate-400 rounded-full`}></div>
                                <div className={`w-3 h-3 bg-slate-400 rounded-full animation-delay-200`}></div>
                                <div className={`w-3 h-3 bg-slate-400 rounded-full animation-delay-400`}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700/60 bg-slate-900/50 backdrop-blur-sm">
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-lg flex items-center p-2 gap-2">
                    <button onClick={() => setIsSpeaking(!isSpeaking)} className={`p-2 rounded-full transition-colors ${isSpeaking ? `${currentTheme.text} bg-slate-700` : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                        {isSpeaking ? <SpeechOnIcon /> : <SpeechOffIcon />}
                    </button>
                    <button onClick={toggleListening} className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500 animate-pulse bg-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                         {isListening ? <MicOnIcon /> : <MicOffIcon />}
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder={isListening ? "Listening..." : "Type your message..."}
                        className="flex-grow bg-transparent text-white placeholder-slate-400 focus:outline-none px-2"
                        disabled={loading}
                    />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className={`p-3 bg-gradient-to-br ${currentTheme.from} ${currentTheme.to} rounded-full text-white disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-black/30 transition-all`}>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

import React, { useState, useRef, useEffect } from 'react';
import type { Persona, Theme } from './types.ts';
import { PERSONAS } from './constants.ts';

const IconCamera: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
);
const IconCheck: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);


const UserProfile: React.FC<{
    username: string | null;
    setUsername: (name: string | null) => void;
    profilePicture: string | null;
    setProfilePicture: (pic: string | null) => void;
    persona: Persona;
    setPersona: (p: Persona) => void;
    theme: Theme;
}> = ({ username, setUsername, profilePicture, setProfilePicture, persona, setPersona, theme }) => {
    const [localUsername, setLocalUsername] = useState(username || '');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const themeClasses: Record<Theme, { bg: string, hoverBg: string, ring: string }> = {
        teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', ring: 'focus:ring-teal-500' },
        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', ring: 'focus:ring-blue-500' },
        rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', ring: 'focus:ring-rose-500' },
        amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', ring: 'focus:ring-amber-500' },
    };
    const currentTheme = themeClasses[theme];
    
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const startCamera = async () => {
        if (isCameraOpen) {
            stopCamera();
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
            setIsCameraOpen(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please ensure you have given permission in your browser settings.");
        }
    };

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setProfilePicture(dataUrl);
            stopCamera();
        }
    };

    const handleSave = () => {
        setUsername(localUsername.trim() ? localUsername.trim() : null);
        setSavedMessage('Profile saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    useEffect(() => {
        return () => {
            stopCamera(); // Cleanup on component unmount
        };
    }, []);

    return (
        <div className="p-4 sm:p-8 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">User Profile</h2>

            <div className="space-y-8 max-w-2xl">
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-2">Profile Picture</h3>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
                            {profilePicture ? <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-600"></div>}
                        </div>
                        <div className="space-y-2">
                             <button onClick={startCamera} className={`${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-4 rounded-lg flex items-center`}>
                                <IconCamera className="w-5 h-5 mr-2" />
                                {isCameraOpen ? 'Close Camera' : 'Open Camera'}
                             </button>
                             {profilePicture && <button onClick={() => setProfilePicture(null)} className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg">Clear Picture</button>}
                        </div>
                    </div>
                     {isCameraOpen && (
                        <div className="mt-4">
                            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg"></video>
                            <button onClick={takePicture} className={`w-full mt-2 ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-4 rounded-lg`}>Take Picture</button>
                        </div>
                    )}
                     <canvas ref={canvasRef} className="hidden"></canvas>
                </div>
            
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                    <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={localUsername}
                            onChange={(e) => setLocalUsername(e.target.value)}
                            className={`w-full p-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${currentTheme.ring}`}
                        />
                    </div>
                 </div>

                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                     <h3 className="text-xl font-bold text-white mb-4">Preferences</h3>
                     <div>
                        <label htmlFor="persona" className="block text-sm font-medium text-slate-300 mb-1">Default AI Persona</label>
                         <select id="persona" value={persona} onChange={e => setPersona(e.target.value as Persona)} className={`w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2 focus:ring-2 ${currentTheme.ring}`}>
                            {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                 </div>
                 
                 <div>
                    <button onClick={handleSave} className={`${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center`}>
                        <IconCheck className="w-5 h-5 mr-2" />
                        Save Profile
                    </button>
                    {savedMessage && <p className="text-green-400 mt-2 text-sm animate-fade-in">{savedMessage}</p>}
                 </div>
            </div>
        </div>
    );
};

export default UserProfile;
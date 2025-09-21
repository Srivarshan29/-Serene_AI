
import React from 'react';
import type { View } from './types.ts';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{children}</svg>
);
export const ChatIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></IconWrapper>;
export const MoodIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const JournalIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.747-8.368l-2.253 2.253a1 1 0 000 1.414l2.253 2.253M17.747 11.632l2.253-2.253a1 1 0 000-1.414l-2.253-2.253" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10M7 17h10M7 9h10M7 5h10" transform="translate(-1 1)"/></IconWrapper>;
export const HabitIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></IconWrapper>;
export const AnalyticsIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18" /></IconWrapper>;
export const GardenIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.832 15.328a.5.5 0 01-.707 0l-2-2a.5.5 0 01.707-.707l2 2a.5.5 0 010 .707zM16.168 15.328a.5.5 0 01-.707 0l-2-2a.5.5 0 01.707-.707l2 2a.5.5 0 010 .707zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 10a2 2 0 11-4 0 2 2 0 014 0z" /></IconWrapper>;
export const PersonalityIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></IconWrapper>;
export const ProfileIcon = PersonalityIcon;
export const ResourcesIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></IconWrapper>;
export const SoundscapesIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M18.364 2.636a12.728 12.728 0 010 18.128" /></IconWrapper>;
export const DoctorIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></IconWrapper>;
export const SanctuaryIcon = () => <IconWrapper><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M12 15.6l-3.3-1.9a1.2 1.2 0 0 1-.7-1V9l4-2.3 4 2.3v3.7c0 .4-.3.9-.7 1l-3.3 1.9z"></path></IconWrapper>;
export const SettingsIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></IconWrapper>;
export const AboutIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const DashboardIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></IconWrapper>;
export const LogoutIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></IconWrapper>;
export const NutritionIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a2 2 0 00-2 2v2a2 2 0 002 2h0a2 2 0 002-2v-2a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.55 13.55a8 8 0 11-13.1-4.33A8 8 0 0115 5.05a8 8 0 015.55 8.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 5.05a4 4 0 01-3-3" /></IconWrapper>;
export const GuidedBreathingIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 14.25h16.5M7.5 4.5l-3.75 3.75 3.75 3.75M16.5 19.5l3.75-3.75-3.75-3.75" /></IconWrapper>;
export const CbtIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-4v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconWrapper>;


export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></IconWrapper>;
export const SendIcon = () => <IconWrapper className="h-5 w-5"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></IconWrapper>;
const MenuIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></IconWrapper>;
const CloseIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></IconWrapper>;

export const MicOnIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></IconWrapper>;
export const MicOffIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M15.586 15.586a7 7 0 01-5.656 2.414h-.001a7 7 0 01-5.657-2.414m11.313 0a11.313 0 01-11.313 0m11.313 0l-2.828-2.828m-5.657 0l-2.828 2.828m0-11.314a4 4 0 015.656 0l2.828 2.828m0 0l-2.828 2.828m-5.657-5.657l-2.828-2.828" /></IconWrapper>;
export const SpeechOnIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0m2.828-2.828a12 12 0 010 16.97M5.636 21.121a12 12 0 010-16.97" /></IconWrapper>;
export const SpeechOffIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M13.25 15.25L10.75 12.75M10.75 15.25L13.25 12.75M17.5 9.5a5.5 5.5 0 00-11 0M7.5 13.5c-2.071 0-4-1.929-4-4s1.929-4 4-4 .5.5 1 1" /></IconWrapper>;

export const DoctorAvatar: React.FC<{ className?: string }> = ({ className }) => (
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={className}>
  <defs>
    <linearGradient id="coatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor:'#ffffff',stopOpacity:1}} />
      <stop offset="100%" style={{stopColor:'#f1f5f9',stopOpacity:1}} />
    </linearGradient>
    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor:'#fdbcb4',stopOpacity:1}} />
      <stop offset="100%" style={{stopColor:'#f4a69c',stopOpacity:1}} />
    </linearGradient>
    <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{stopColor:'#8b4513',stopOpacity:1}} />
      <stop offset="100%" style={{stopColor:'#5d2f0a',stopOpacity:1}} />
    </linearGradient>
  </defs>
  <circle cx="100" cy="120" r="90" fill="#e0f2fe" opacity="0.3">
    <animate attributeName="r" values="90;95;90" dur="4s" repeatCount="indefinite"/>
  </circle>
  <ellipse cx="100" cy="160" rx="50" ry="60" fill="url(#coatGradient)" stroke="#e2e8f0" strokeWidth="2">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2; 0,0" dur="3s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="60" cy="140" rx="15" ry="35" fill="url(#coatGradient)" stroke="#e2e8f0" strokeWidth="1" transform="rotate(-15 60 140)">
    <animateTransform attributeName="transform" type="rotate" values="-15 60 140; -10 60 140; -15 60 140" dur="2s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="140" cy="140" rx="15" ry="35" fill="url(#coatGradient)" stroke="#e2e8f0" strokeWidth="1" transform="rotate(15 140 140)">
    <animateTransform attributeName="transform" type="rotate" values="15 140 140; 10 140 140; 15 140 140" dur="2s" repeatCount="indefinite" begin="1s"/>
  </ellipse>
  <circle cx="55" cy="170" r="12" fill="url(#skinGradient)">
    <animateTransform attributeName="transform" type="translate" values="0,0; -1,1; 0,0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="145" cy="170" r="12" fill="url(#skinGradient)">
    <animateTransform attributeName="transform" type="translate" values="0,0; 1,1; 0,0" dur="2s" repeatCount="indefinite" begin="1s"/>
  </circle>
  <circle cx="100" cy="80" r="40" fill="url(#skinGradient)">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1; 0,0" dur="3s" repeatCount="indefinite"/>
  </circle>
  <path d="M 65 50 Q 60 35 70 30 Q 80 25 100 28 Q 120 25 130 30 Q 140 35 135 50 Q 133 60 125 65 Q 115 60 100 63 Q 85 60 75 65 Q 67 60 65 50" fill="url(#hairGradient)">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1; 0,0" dur="3s" repeatCount="indefinite"/>
  </path>
  <circle cx="88" cy="75" r="4" fill="#1f2937">
    <animate attributeName="r" values="4;1;4" dur="3s" repeatCount="indefinite" begin="2s"/>
  </circle>
  <circle cx="112" cy="75" r="4" fill="#1f2937">
    <animate attributeName="r" values="4;1;4" dur="3s" repeatCount="indefinite" begin="2s"/>
  </circle>
  <circle cx="89" cy="73" r="1.5" fill="#ffffff">
    <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" begin="2s"/>
  </circle>
  <circle cx="113" cy="73" r="1.5" fill="#ffffff">
    <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" begin="2s"/>
  </circle>
  <ellipse cx="100" cy="85" rx="3" ry="4" fill="#f4a69c"/>
  <path d="M 90 95 Q 100 105 110 95" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round">
    <animate attributeName="d" values="M 90 95 Q 100 105 110 95; M 90 95 Q 100 100 110 95; M 90 95 Q 100 105 110 95" dur="4s" repeatCount="indefinite"/>
  </path>
  <g>
    <circle cx="75" cy="120" r="12" fill="none" stroke="#4b5563" strokeWidth="4">
      <animateTransform attributeName="transform" type="translate" values="0,0; 1,0; 0,0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <path d="M 87 120 Q 95 110 105 115" stroke="#4b5563" strokeWidth="4" fill="none">
      <animate attributeName="d" values="M 87 120 Q 95 110 105 115; M 87 120 Q 95 112 105 117; M 87 120 Q 95 110 105 115" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M 105 115 Q 110 105 115 95" stroke="#4b5563" strokeWidth="3" fill="none"/>
    <path d="M 87 120 Q 85 105 80 95" stroke="#4b5563" strokeWidth="3" fill="none"/>
    <circle cx="80" cy="95" r="4" fill="#4b5563"/>
    <circle cx="115" cy="95" r="4" fill="#4b5563"/>
  </g>
  <circle cx="100" cy="135" r="3" fill="#cbd5e1">
    <animate attributeName="fill" values="#cbd5e1; #94a3b8; #cbd5e1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="100" cy="150" r="3" fill="#cbd5e1">
    <animate attributeName="fill" values="#cbd5e1; #94a3b8; #cbd5e1" dur="2s" repeatCount="indefinite" begin="0.5s"/>
  </circle>
  <circle cx="100" cy="165" r="3" fill="#cbd5e1">
    <animate attributeName="fill" values="#cbd5e1; #94a3b8; #cbd5e1" dur="2s" repeatCount="indefinite" begin="1s"/>
  </circle>
  <g transform="translate(120, 125)">
    <circle r="8" fill="#dc2626" opacity="0.9">
      <animate attributeName="opacity" values="0.9; 1; 0.9" dur="2s" repeatCount="indefinite"/>
    </circle>
    <rect x="-1" y="-4" width="2" height="8" fill="white"/>
    <rect x="-4" y="-1" width="8" height="2" fill="white"/>
  </g>
  <circle cx="40" cy="60" r="2" fill="#3b82f6" opacity="0.6">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,-40" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6; 0; 0.6" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="160" cy="80" r="1.5" fill="#10b981" opacity="0.6">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-30; 0,-60" dur="5s" repeatCount="indefinite" begin="2s"/>
    <animate attributeName="opacity" values="0.6; 0; 0.6" dur="5s" repeatCount="indefinite" begin="2s"/>
  </circle>
</svg>
);

export const PatientAvatar: React.FC<{ className?: string, imageUrl?: string | null }> = ({ className, imageUrl }) => {
    if (imageUrl) {
        return (
            <div className={`rounded-full overflow-hidden bg-gray-700 ${className}`}>
                <img src={imageUrl} alt="User profile" className="w-full h-full object-cover" />
            </div>
        );
    }
    return (
        <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#3b82f6',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#1d4ed8',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#fdbcb4',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#f4a69c',stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#2d1b10',stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#1a0f08',stopOpacity:1}} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="120" r="90" fill="#dcfce7" opacity="0.3">
            <animate attributeName="r" values="90;93;90" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <ellipse cx="100" cy="160" rx="45" ry="60" fill="url(#shirtGradient)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,1; 0,0" dur="2.5s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="65" cy="140" rx="12" ry="30" fill="url(#shirtGradient)" transform="rotate(-10 65 140)">
            <animateTransform attributeName="transform" type="rotate" values="-10 65 140; -5 65 140; -10 65 140" dur="3s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="135" cy="140" rx="12" ry="30" fill="url(#shirtGradient)" transform="rotate(10 135 140)">
            <animateTransform attributeName="transform" type="rotate" values="10 135 140; 5 135 140; 10 135 140" dur="3s" repeatCount="indefinite" begin="1.5s"/>
          </ellipse>
          <circle cx="62" cy="165" r="10" fill="url(#skinGradient)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -0.5,0.5; 0,0" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="138" cy="165" r="10" fill="url(#skinGradient)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0.5,0.5; 0,0" dur="3s" repeatCount="indefinite" begin="1.5s"/>
          </circle>
          <circle cx="100" cy="80" r="38" fill="url(#skinGradient)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-0.5; 0,0" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <path d="M 68 55 Q 65 40 72 35 Q 82 30 90 32 Q 100 28 110 32 Q 118 30 128 35 Q 135 40 132 55 Q 130 65 125 70 L 75 70 Q 70 65 68 55" fill="url(#hairGradient)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-0.5; 0,0" dur="2.5s" repeatCount="indefinite"/>
          </path>
          <circle cx="88" cy="75" r="4" fill="#1f2937">
            <animate attributeName="cy" values="75; 76; 75" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="112" cy="75" r="4" fill="#1f2937">
            <animate attributeName="cy" values="75; 76; 75" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="89" cy="73" r="1.5" fill="#ffffff">
            <animate attributeName="cy" values="73; 74; 73" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="113" cy="73" r="1.5" fill="#ffffff">
            <animate attributeName="cy" values="73; 74; 73" dur="4s" repeatCount="indefinite"/>
          </circle>
          <ellipse cx="88" cy="68" rx="6" ry="2" fill="#2d1b10">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-0.5; 0,0" dur="3s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="112" cy="68" rx="6" ry="2" fill="#2d1b10">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-0.5; 0,0" dur="3s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="100" cy="85" rx="2.5" ry="4" fill="#f4a69c"/>
          <path d="M 88 95 Q 100 105 112 95" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round">
            <animate attributeName="d" values="M 88 95 Q 100 105 112 95; M 88 95 Q 100 102 112 95; M 88 95 Q 100 105 112 95" dur="3s" repeatCount="indefinite"/>
          </path>
          <path d="M 75 120 L 85 130 L 100 125 L 115 130 L 125 120" stroke="#1d4ed8" strokeWidth="3" fill="none">
            <animate attributeName="stroke-width" values="3; 2.5; 3" dur="2s" repeatCount="indefinite"/>
          </path>
          <circle cx="100" cy="140" r="2.5" fill="#fbbf24">
            <animate attributeName="fill" values="#fbbf24; #f59e0b; #fbbf24" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="155" r="2.5" fill="#fbbf24">
            <animate attributeName="fill" values="#fbbf24; #f59e0b; #fbbf24" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
          </circle>
          <g transform="translate(125, 130)">
            <path d="M 0 4 C 0 2, -2 0, -4 0 C -6 0, -8 2, -8 4 C -8 6, 0 12, 0 12 S 8 6, 8 4 C 8 2, 6 0, 4 0 C 2 0, 0 2, 0 4 Z" fill="#ef4444">
              <animate attributeName="fill" values="#ef4444; #dc2626; #ef4444" dur="1.5s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="scale" values="1; 1.2; 1" dur="1.5s" repeatCount="indefinite"/>
            </path>
          </g>
          <g opacity="0.7">
            <g transform="translate(50, 100)">
              <rect x="-1" y="-4" width="2" height="8" fill="#10b981">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="3s" repeatCount="indefinite"/>
              </rect>
              <rect x="-4" y="-1" width="8" height="2" fill="#10b981">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="3s" repeatCount="indefinite"/>
              </rect>
            </g>
            <g transform="translate(150, 90)">
              <rect x="-0.5" y="-3" width="1" height="6" fill="#3b82f6">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,0" dur="4s" repeatCount="indefinite" begin="1s"/>
              </rect>
              <rect x="-3" y="-0.5" width="6" height="1" fill="#3b82f6">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,0" dur="4s" repeatCount="indefinite" begin="1s"/>
              </rect>
            </g>
          </g>
          <circle cx="100" cy="140" r="25" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="25; 28; 25" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3; 0.1; 0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
          <g opacity="0.6">
            <circle cx="30" cy="50" r="1" fill="#fbbf24">
              <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="translate" values="0,0; 2,-2; 0,0" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="170" cy="70" r="1.5" fill="#f97316">
              <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2.5s" repeatCount="indefinite" begin="1s"/>
              <animateTransform attributeName="transform" type="translate" values="0,0; -2,-3; 0,0" dur="2.5s" repeatCount="indefinite" begin="1s"/>
            </circle>
          </g>
        </svg>
    );
};


export const ICONS: Record<View | 'menu' | 'close', React.FC> = {
    dashboard: DashboardIcon,
    chat: ChatIcon,
    mood: MoodIcon,
    journal: JournalIcon,
    habits: HabitIcon,
    analytics: AnalyticsIcon,
    garden: GardenIcon,
    personality: PersonalityIcon,
    resources: ResourcesIcon,
    soundscapes: SoundscapesIcon,
    sanctuary: SanctuaryIcon,
    doctor: DoctorIcon,
    profile: ProfileIcon,
    settings: SettingsIcon,
    about: AboutIcon,
    nutrition: NutritionIcon,
    guidedBreathing: GuidedBreathingIcon,
    cbt: CbtIcon,
    menu: MenuIcon,
    close: CloseIcon
};
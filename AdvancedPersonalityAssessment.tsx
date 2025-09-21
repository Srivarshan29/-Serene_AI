
import React, { useState } from 'react';
import type { Theme } from './types.ts';

// Inline SVG icons to replace lucide-react dependencies
const IconRotateCcw: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>
);
const IconUser: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const IconBrain: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.94.549A2.5 2.5 0 0 1 7 17.5V14a2.5 2.5 0 0 1 2.5-2.5h1A2.5 2.5 0 0 1 13 9V7a2.5 2.5 0 0 1 2.5-2.5h1A2.5 2.5 0 0 1 19 7v2a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5V9a2.5 2.5 0 0 1-2.5-2.5V4.5A2.5 2.5 0 0 1 9.5 2z"></path></svg>
);
const IconHeart: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const IconCheckCircle: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const AdvancedPersonalityAssessment: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const themeClasses: Record<Theme, { bg: string, hoverBg: string, text: string }> = {
    teal: { bg: 'bg-teal-600', hoverBg: 'hover:bg-teal-500', text: 'text-teal-400' },
    blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-500', text: 'text-blue-400' },
    rose: { bg: 'bg-rose-600', hoverBg: 'hover:bg-rose-500', text: 'text-rose-400' },
    amber: { bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-500', text: 'text-amber-400' },
  };
  const currentTheme = themeClasses[theme];

  const questions = [
    // E/I Questions (7 questions)
    {
      id: 1,
      question: "In social situations, I typically find myself:",
      options: [
        { text: "Actively seeking out new people to meet and talk with", score: 4, type: "E" },
        { text: "Engaging with several people but taking some breaks", score: 2, type: "E" },
        { text: "Comfortable with either approach depending on my mood", score: 0, type: "NEUTRAL" },
        { text: "Preferring to have deeper conversations with fewer people", score: -2, type: "I" },
        { text: "Feeling most comfortable observing or talking with one close friend", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 2,
      question: "After a long day, I feel most restored by:",
      options: [
        { text: "Going out with friends or engaging in social activities", score: 4, type: "E" },
        { text: "Doing something social but low-key with close friends", score: 2, type: "E" },
        { text: "It depends on what kind of day I've had", score: 0, type: "NEUTRAL" },
        { text: "Having quiet time with a book, movie, or hobby", score: -2, type: "I" },
        { text: "Being completely alone to recharge in solitude", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 3,
      question: "When working on a project, I prefer to:",
      options: [
        { text: "Constantly discuss ideas and get feedback from others", score: 4, type: "E" },
        { text: "Share ideas regularly but also work independently", score: 2, type: "E" },
        { text: "Balance independent work with occasional collaboration", score: 0, type: "NEUTRAL" },
        { text: "Work mostly alone and share ideas when they're developed", score: -2, type: "I" },
        { text: "Work entirely independently and present finished results", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 4,
      question: "In group discussions, I tend to:",
      options: [
        { text: "Speak up immediately and think out loud as I talk", score: 4, type: "E" },
        { text: "Share thoughts readily after a moment of consideration", score: 2, type: "E" },
        { text: "Contribute when I have something specific to add", score: 0, type: "NEUTRAL" },
        { text: "Listen carefully and speak when asked or when certain", score: -2, type: "I" },
        { text: "Prefer to listen and reflect, rarely speaking up", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 5,
      question: "My ideal weekend would involve:",
      options: [
        { text: "Multiple social events and activities with different groups", score: 4, type: "E" },
        { text: "One or two social activities with friends or family", score: 2, type: "E" },
        { text: "A mix of social time and personal time", score: 0, type: "NEUTRAL" },
        { text: "Mostly quiet activities with maybe one low-key social event", score: -2, type: "I" },
        { text: "Peaceful solitude with personal hobbies and minimal social contact", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 6,
      question: "When facing a personal problem, I'm most likely to:",
      options: [
        { text: "Immediately call friends or family to talk through it", score: 4, type: "E" },
        { text: "Discuss it with one or two trusted people", score: 2, type: "E" },
        { text: "Think about it first, then maybe discuss with others", score: 0, type: "NEUTRAL" },
        { text: "Reflect on it privately before seeking any outside input", score: -2, type: "I" },
        { text: "Work through it entirely on my own", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },
    {
      id: 7,
      question: "At parties or social gatherings, I usually:",
      options: [
        { text: "Feel energized and could stay until the very end", score: 4, type: "E" },
        { text: "Enjoy myself but start to feel tired after a few hours", score: 2, type: "E" },
        { text: "Have fun but need to pace myself with breaks", score: 0, type: "NEUTRAL" },
        { text: "Enjoy it for a while but prefer to leave on the earlier side", score: -2, type: "I" },
        { text: "Feel drained quickly and look for opportunities to leave early", score: -4, type: "I" }
      ],
      dichotomy: "E/I",
    },

    // S/N Questions (7 questions)
    {
      id: 8,
      question: "When learning something new, I prefer to start with:",
      options: [
        { text: "Specific examples, facts, and step-by-step procedures", score: 4, type: "S" },
        { text: "Some concrete examples along with general principles", score: 2, type: "S" },
        { text: "A balance of specific examples and broader concepts", score: 0, type: "NEUTRAL" },
        { text: "The big picture and underlying theories first", score: -2, type: "N" },
        { text: "Abstract concepts and future possibilities", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 9,
      question: "I am more naturally drawn to:",
      options: [
        { text: "Practical, real-world applications and concrete results", score: 4, type: "S" },
        { text: "Useful applications with some theoretical interest", score: 2, type: "S" },
        { text: "Both practical applications and theoretical concepts", score: 0, type: "NEUTRAL" },
        { text: "Theoretical concepts with potential future applications", score: -2, type: "N" },
        { text: "Abstract theories and imaginative possibilities", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 10,
      question: "When giving directions, I tend to:",
      options: [
        { text: "Give specific landmarks, street names, and distances", score: 4, type: "S" },
        { text: "Provide clear landmarks with some general directions", score: 2, type: "S" },
        { text: "Mix specific details with general directional guidance", score: 0, type: "NEUTRAL" },
        { text: "Describe general areas and patterns of movement", score: -2, type: "N" },
        { text: "Give conceptual directions and expect others to figure out details", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 11,
      question: "I prefer books, movies, and stories that are:",
      options: [
        { text: "Realistic, based on actual events or plausible scenarios", score: 4, type: "S" },
        { text: "Mostly realistic with some creative or dramatic elements", score: 2, type: "S" },
        { text: "Either realistic or fantastical depending on my mood", score: 0, type: "NEUTRAL" },
        { text: "Imaginative with creative possibilities and symbolism", score: -2, type: "N" },
        { text: "Highly imaginative, abstract, or futuristic", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 12,
      question: "When planning, I focus more on:",
      options: [
        { text: "Concrete details, specific steps, and immediate requirements", score: 4, type: "S" },
        { text: "Important details with some consideration of broader goals", score: 2, type: "S" },
        { text: "Both immediate needs and longer-term objectives", score: 0, type: "NEUTRAL" },
        { text: "Overall vision with key milestones and possibilities", score: -2, type: "N" },
        { text: "Big picture possibilities and future potential", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 13,
      question: "I trust more in:",
      options: [
        { text: "Direct experience and proven methods", score: 4, type: "S" },
        { text: "Experience combined with some innovative approaches", score: 2, type: "S" },
        { text: "Both experience and intuition equally", score: 0, type: "NEUTRAL" },
        { text: "Intuition backed up by some evidence", score: -2, type: "N" },
        { text: "Hunches, insights, and future possibilities", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },
    {
      id: 14,
      question: "In conversations, I'm more interested in discussing:",
      options: [
        { text: "Current events, practical matters, and real experiences", score: 4, type: "S" },
        { text: "Current topics with some exploration of implications", score: 2, type: "S" },
        { text: "A variety of topics both concrete and abstract", score: 0, type: "NEUTRAL" },
        { text: "Ideas, possibilities, and future trends", score: -2, type: "N" },
        { text: "Theoretical concepts and imaginative scenarios", score: -4, type: "N" }
      ],
      dichotomy: "S/N",
    },

    // T/F Questions (7 questions)
    {
      id: 15,
      question: "When making important decisions, I primarily rely on:",
      options: [
        { text: "Objective analysis, logic, and factual evidence", score: 4, type: "T" },
        { text: "Logical analysis while considering some personal factors", score: 2, type: "T" },
        { text: "A balance of logical analysis and personal values", score: 0, type: "NEUTRAL" },
        { text: "Personal values while considering logical implications", score: -2, type: "F" },
        { text: "Personal values, feelings, and impact on relationships", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 16,
      question: "In conflicts or disagreements, I tend to focus on:",
      options: [
        { text: "Facts, logical arguments, and who is objectively right", score: 4, type: "T" },
        { text: "Being right while trying to maintain civility", score: 2, type: "T" },
        { text: "Finding a solution that addresses both facts and feelings", score: 0, type: "NEUTRAL" },
        { text: "Understanding all perspectives and finding common ground", score: -2, type: "F" },
        { text: "Maintaining harmony and ensuring everyone feels heard", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 17,
      question: "When someone asks for my advice, I usually:",
      options: [
        { text: "Help them analyze the situation logically and systematically", score: 4, type: "T" },
        { text: "Offer logical solutions while acknowledging their feelings", score: 2, type: "T" },
        { text: "Provide both logical guidance and emotional support", score: 0, type: "NEUTRAL" },
        { text: "Listen empathetically and help them explore their feelings", score: -2, type: "F" },
        { text: "Focus primarily on emotional support and understanding", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 18,
      question: "I feel more successful when I'm seen as:",
      options: [
        { text: "Competent, efficient, and intellectually capable", score: 4, type: "T" },
        { text: "Capable and fair-minded", score: 2, type: "T" },
        { text: "Both competent and caring", score: 0, type: "NEUTRAL" },
        { text: "Understanding and supportive", score: -2, type: "F" },
        { text: "Caring, empathetic, and emotionally supportive", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 19,
      question: "When evaluating ideas or proposals, I first consider:",
      options: [
        { text: "Logical consistency, evidence, and objective merit", score: 4, type: "T" },
        { text: "Merit and feasibility with some consideration of impact", score: 2, type: "T" },
        { text: "Both logical merit and potential human impact", score: 0, type: "NEUTRAL" },
        { text: "How it affects people while considering its logical merit", score: -2, type: "F" },
        { text: "Impact on people, values alignment, and harmony", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 20,
      question: "In team settings, I naturally tend to:",
      options: [
        { text: "Focus on efficiency, task completion, and objective standards", score: 4, type: "T" },
        { text: "Balance task focus with attention to team dynamics", score: 2, type: "T" },
        { text: "Pay equal attention to tasks and team relationships", score: 0, type: "NEUTRAL" },
        { text: "Ensure good team relationships while working toward goals", score: -2, type: "F" },
        { text: "Prioritize team harmony and everyone's emotional well-being", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },
    {
      id: 21,
      question: "When criticized, my first reaction is usually to:",
      options: [
        { text: "Analyze whether the criticism is logically valid", score: 4, type: "T" },
        { text: "Consider the merit while noting how it was delivered", score: 2, type: "T" },
        { text: "Evaluate both the content and emotional impact", score: 0, type: "NEUTRAL" },
        { text: "Consider how it makes me feel and the relationship impact", score: -2, type: "F" },
        { text: "Focus on the emotional impact and relationship implications", score: -4, type: "F" }
      ],
      dichotomy: "T/F",
    },

    // J/P Questions (7 questions)
    {
      id: 22,
      question: "I prefer my daily life to be:",
      options: [
        { text: "Highly structured with detailed plans and schedules", score: 4, type: "J" },
        { text: "Generally planned with some flexibility for changes", score: 2, type: "J" },
        { text: "Balanced between structure and spontaneity", score: 0, type: "NEUTRAL" },
        { text: "Loosely structured with plenty of room for spontaneity", score: -2, type: "P" },
        { text: "Completely flexible and spontaneous", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 23,
      question: "When starting a new project, I typically:",
      options: [
        { text: "Create a detailed plan with timelines before beginning", score: 4, type: "J" },
        { text: "Make a general plan and adjust as needed", score: 2, type: "J" },
        { text: "Do some planning but stay open to changing direction", score: 0, type: "NEUTRAL" },
        { text: "Start with a loose idea and develop it as I go", score: -2, type: "P" },
        { text: "Jump in and figure it out completely as I proceed", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 24,
      question: "My ideal work environment would have:",
      options: [
        { text: "Clear deadlines, structured processes, and predictable schedules", score: 4, type: "J" },
        { text: "Reasonable structure with some flexibility", score: 2, type: "J" },
        { text: "A balance of structure and adaptability", score: 0, type: "NEUTRAL" },
        { text: "Flexibility with loose guidelines and adaptable timelines", score: -2, type: "P" },
        { text: "Maximum flexibility and freedom to work as inspiration strikes", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 25,
      question: "When making vacation plans, I prefer to:",
      options: [
        { text: "Plan everything in advance with reservations and itineraries", score: 4, type: "J" },
        { text: "Plan major elements but leave some details flexible", score: 2, type: "J" },
        { text: "Plan some key things and leave room for spontaneous activities", score: 0, type: "NEUTRAL" },
        { text: "Book basic travel and figure out activities when I arrive", score: -2, type: "P" },
        { text: "Go with minimal planning and see what opportunities arise", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 26,
      question: "I feel most comfortable when:",
      options: [
        { text: "Things are decided, settled, and I know what to expect", score: 4, type: "J" },
        { text: "I have plans but can adjust them if needed", score: 2, type: "J" },
        { text: "I have some structure but options remain open", score: 0, type: "NEUTRAL" },
        { text: "Multiple options are available and nothing is set in stone", score: -2, type: "P" },
        { text: "Everything is open-ended with maximum flexibility", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 27,
      question: "My approach to deadlines is typically to:",
      options: [
        { text: "Complete tasks well ahead of schedule", score: 4, type: "J" },
        { text: "Finish with some time to spare for review", score: 2, type: "J" },
        { text: "Complete tasks on time with steady progress", score: 0, type: "NEUTRAL" },
        { text: "Work steadily but often finish close to the deadline", score: -2, type: "P" },
        { text: "Work best under pressure and often finish at the last minute", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    },
    {
      id: 28,
      question: "My living/working space tends to be:",
      options: [
        { text: "Highly organized with everything in its designated place", score: 4, type: "J" },
        { text: "Generally tidy and organized", score: 2, type: "J" },
        { text: "Organized enough to find what I need when I need it", score: 0, type: "NEUTRAL" },
        { text: "Somewhat disorganized but I know where things are", score: -2, type: "P" },
        { text: "Chaotic but creative - organized chaos that works for me", score: -4, type: "P" }
      ],
      dichotomy: "J/P",
    }
  ];

  const typeDescriptions: Record<string, any> = {
    ENTJ: {
      name: "The Commander",
      nickname: "Natural Leader",
      description: "Strategic, decisive, and ambitious natural-born leaders. You excel at organizing people and resources to achieve long-term objectives. Your combination of vision and execution makes you effective at turning ideas into reality.",
      strengths: ["Strategic thinking", "Natural leadership", "Efficiency and productivity", "Confident decision-making", "Long-term planning", "Inspiring others toward goals"],
      challenges: ["May seem intimidating to others", "Can be impatient with inefficiency", "Sometimes overlook personal feelings", "May struggle with work-life balance"],
      careers: ["CEO/Executive", "Project Manager", "Management Consultant", "Lawyer", "Investment Banker", "Entrepreneur"],
      relationships: "You bring leadership and vision to relationships but may need to remember to show warmth and consideration for others' emotional needs.",
      percentage: "2-4% of population"
    },
    ENTP: {
      name: "The Debater",
      nickname: "Innovative Visionary",
      description: "Innovative, creative, and intellectually curious. You love exploring new possibilities, challenging conventional thinking, and engaging in stimulating debates. Your quick wit and adaptability make you excellent at generating creative solutions.",
      strengths: ["Innovation and creativity", "Adaptability", "Charisma and communication", "Quick thinking", "Seeing possibilities", "Intellectual curiosity"],
      challenges: ["May struggle with follow-through", "Can be perceived as argumentative", "Difficulty with routine tasks", "Sometimes neglects details"],
      careers: ["Entrepreneur", "Marketing Professional", "Journalist", "Consultant", "Inventor", "Psychologist"],
      relationships: "You bring excitement and intellectual stimulation to relationships but may need to work on following through on commitments and being attentive to partners' emotional needs.",
      percentage: "2-3% of population"
    },
    ENFJ: {
      name: "The Protagonist",
      nickname: "Inspiring Teacher",
      description: "Charismatic, empathetic leaders who are genuinely interested in helping others reach their potential. You have a natural ability to understand and motivate people, making you effective at bringing out the best in others.",
      strengths: ["Empathy and understanding", "Communication skills", "Inspiring and motivating others", "Organized and goal-oriented", "Reading people well", "Creating harmony"],
      challenges: ["May neglect own needs", "Can be overly sensitive to criticism", "Sometimes take on too much responsibility", "May struggle with difficult decisions affecting others"],
      careers: ["Teacher", "Counselor", "Human Resources", "Non-profit Leader", "Sales", "Public Relations"],
      relationships: "You are naturally caring and supportive in relationships, though you may need to ensure you're taking care of your own needs and setting appropriate boundaries.",
      percentage: "3-4% of population"
    },
    ENFP: {
      name: "The Campaigner",
      nickname: "Enthusiastic Free Spirit",
      description: "Enthusiastic, creative, and sociable free spirits who see life as full of exciting possibilities. Your warmth and imagination inspire others, and you excel at connecting with people and generating new ideas.",
      strengths: ["Enthusiasm and energy", "Creativity and imagination", "People skills", "Flexibility and adaptability", "Seeing potential in others", "Generating ideas"],
      challenges: ["Difficulty with routine tasks", "May struggle with focus", "Sometimes overcommit", "Can be disorganized"],
      careers: ["Marketing", "Journalism", "Psychology", "Art/Creative Fields", "Public Relations", "Entrepreneurship"],
      relationships: "You bring warmth, enthusiasm, and creativity to relationships but may need to work on follow-through and giving partners space for independence.",
      percentage: "6-8% of population"
    },
    ESTJ: {
      name: "The Executive",
      nickname: "Efficient Organizer",
      description: "Organized, hardworking, and results-oriented. You excel at managing people and processes, bringing order to chaos, and ensuring that goals are met efficiently. Your practical approach and reliability make you a natural administrator.",
      strengths: ["Organization and efficiency", "Reliability and responsibility", "Leadership abilities", "Practical problem-solving", "Goal achievement", "Creating structure"],
      challenges: ["May be inflexible", "Can be too focused on rules", "Sometimes dismissive of others' feelings", "May struggle with change"],
      careers: ["Management", "Business Administration", "Finance", "Military Officer", "Government", "Operations"],
      relationships: "You bring stability and commitment to relationships but may need to be more flexible and attentive to emotional aspects of partnership.",
      percentage: "8-12% of population"
    },
    ESTP: {
      name: "The Entrepreneur",
      nickname: "Energetic Problem-Solver",
      description: "Energetic, adaptable, and pragmatic. You thrive in the moment and excel at crisis management and hands-on problem solving. Your ability to think on your feet and connect with others makes you effective in dynamic situations.",
      strengths: ["Adaptability and flexibility", "Practical problem-solving", "People skills", "Crisis management", "Living in the moment", "Hands-on learning"],
      challenges: ["May struggle with long-term planning", "Can be impatient with theory", "Sometimes act impulsively", "Difficulty with abstract concepts"],
      careers: ["Sales", "Emergency Services", "Sports/Athletics", "Entertainment", "Real Estate", "Skilled Trades"],
      relationships: "You bring energy and spontaneity to relationships but may need to work on long-term commitment and planning for the future.",
      percentage: "4-6% of population"
    },
    ESFJ: {
      name: "The Consul",
      nickname: "Caring Supporter",
      description: "Warm, caring, and cooperative. You have a natural talent for bringing out the best in others and creating harmonious environments. Your empathy and organizational skills make you excellent at supporting and nurturing others.",
      strengths: ["Empathy and caring", "Cooperation and teamwork", "Reliability", "Attention to others' needs", "Creating harmony", "Practical helpfulness"],
      challenges: ["May neglect own needs", "Can be overly sensitive to criticism", "Sometimes avoid conflict", "May be too focused on others' approval"],
      careers: ["Healthcare", "Education", "Social Work", "Human Resources", "Customer Service", "Event Planning"],
      relationships: "You are naturally nurturing and supportive in relationships but may need to ensure you're communicating your own needs and maintaining independence.",
      percentage: "9-13% of population"
    },
    ESFP: {
      name: "The Entertainer",
      nickname: "Spontaneous Performer",
      description: "Spontaneous, enthusiastic, and people-focused. You bring joy and energy to situations, excel at connecting with others, and have a natural ability to live in and enjoy the present moment.",
      strengths: ["Enthusiasm and optimism", "People skills", "Flexibility and spontaneity", "Aesthetic appreciation", "Practical helpfulness", "Living in the moment"],
      challenges: ["May avoid long-term planning", "Can be sensitive to criticism", "Sometimes struggle with abstract theory", "May have difficulty saying no"],
      careers: ["Entertainment", "Healthcare", "Sales", "Hospitality", "Art/Design", "Social Work"],
      relationships: "You bring warmth and fun to relationships but may need to work on discussing serious topics and planning for the future together.",
      percentage: "4-9% of population"
    },
    INTJ: {
      name: "The Architect",
      nickname: "Strategic Mastermind",
      description: "Strategic, independent, and insightful. You excel at seeing the big picture and developing comprehensive plans to achieve your vision. Your combination of intuition and logical thinking makes you highly effective at complex problem-solving.",
      strengths: ["Strategic thinking", "Independence", "Competence and knowledge", "Vision and insight", "Logical analysis", "Long-term planning"],
      challenges: ["May seem aloof or arrogant", "Can be overly critical", "Sometimes struggle with teamwork", "May neglect relationships"],
      careers: ["Strategy Consulting", "Engineering", "Research", "Architecture", "Law", "Technology"],
      relationships: "You bring depth and loyalty to relationships but may need to work on expressing emotions and being more flexible with others' different approaches.",
      percentage: "1-3% of population"
    },
    INTP: {
      name: "The Thinker",
      nickname: "Logical Innovator",
      description: "Logical, innovative, and intellectually curious. You're driven to understand how systems work and love exploring theoretical concepts. Your analytical mind and creative problem-solving make you excellent at developing new ideas.",
      strengths: ["Logic and analysis", "Innovation and creativity", "Independence", "Intellectual curiosity", "Problem-solving", "Theoretical thinking"],
      challenges: ["May struggle with follow-through", "Can be socially awkward", "Sometimes procrastinate", "May seem insensitive to others"],
      careers: ["Research Scientist", "Software Development", "Philosophy", "Mathematics", "Engineering", "Writing"],
      relationships: "You bring intellectual depth and loyalty to relationships but may need to work on emotional expression and practical relationship maintenance.",
      percentage: "3-5% of population"
    },
    INFJ: {
      name: "The Advocate",
      nickname: "Insightful Idealist",
      description: "Creative, principled, and deeply committed to helping others. You have strong intuitive insights about people and situations, combined with a desire to make a meaningful positive impact on the world.",
      strengths: ["Insight and intuition", "Empathy and understanding", "Principled thinking", "Creativity", "Long-term vision", "Helping others grow"],
      challenges: ["May be overly idealistic", "Can be sensitive to criticism", "Sometimes struggle with practical details", "May neglect own needs"],
      careers: ["Counseling", "Writing", "Non-profit Work", "Psychology", "Education", "Healthcare"],
      relationships: "You bring deep understanding and commitment to relationships but may need to communicate your needs more clearly and be patient with others' different approaches.",
      percentage: "1-2% of population"
    },
    INFP: {
      name: "The Mediator",
      nickname: "Passionate Idealist",
      description: "Caring, creative, and guided by strong personal values. You're driven by a desire to help others and make the world a better place. Your empathy and authenticity create deep connections with others.",
      strengths: ["Empathy and understanding", "Strong values", "Creativity", "Adaptability", "Seeing potential in others", "Authenticity"],
      challenges: ["Can be too idealistic", "Dislike dealing with data", "Overly sensitive", "May struggle to be organized"],
      careers: ["Writing", "Art", "Counseling", "Social Work", "Psychology"],
      relationships: "You are a deeply caring partner but may need to set boundaries to protect your energy.",
      percentage: "4-5% of population"
    },
    ISFJ: { name: "The Protector", nickname: "Dedicated Defender", description: "Conscientious, warm, and responsible individuals dedicated to caring for others. You are highly attuned to the needs of those around you.", strengths: ["Supportive and reliable", "Detail-oriented", "Loyal and patient", "Caring and empathetic"], challenges: ["Overly humble", "Neglect own needs", "Dislike conflict", "Resistant to change"], careers: ["Healthcare", "Social Work", "Teaching", "Administration"], relationships: "A deeply committed partner, but you must express your own needs.", percentage: "9-14% of population" },
    ISFP: { name: "The Artist", nickname: "Charming Adventurer", description: "Quiet, friendly, and sensitive individuals with a strong aesthetic sense. You live in the present moment and enjoy new experiences.", strengths: ["Artistic and creative", "Charming", "Adaptable", "Loyal to values"], challenges: ["Fiercely independent", "Dislike long-term planning", "Overly sensitive"], careers: ["Artist/Musician", "Designer", "Chef", "Social Worker"], relationships: "Spontaneous and caring, but may need to address conflicts directly.", percentage: "5-9% of population" },
    ISTJ: { name: "The Inspector", nickname: "Reliable Realist", description: "Responsible, practical, and dependable individuals who value tradition and order. You are meticulous and thorough.", strengths: ["Responsible", "Detail-oriented", "Logical", "Organized"], challenges: ["Inflexible", "Resistant to new ideas", "Can seem insensitive"], careers: ["Accounting", "Law", "Logistics", "Data Analysis"], relationships: "A loyal partner who values commitment, but may need to be more open to spontaneity.", percentage: "11-16% of population" },
    ISTP: { name: "The Crafter", nickname: "Virtuoso Problem-Solver", description: "Observant, adaptable, and analytical individuals who excel at understanding how things work. You are a hands-on learner.", strengths: ["Practical problem-solving", "Adaptable", "Excellent in a crisis", "Resourceful"], challenges: ["Overly private", "Easily bored", "Dislike commitment", "May seem detached"], careers: ["Mechanic/Engineer", "Pilot", "Paramedic", "Software Developer"], relationships: "An independent partner who values freedom and shared experiences.", percentage: "4-6% of population" }
  };

  const handleResponse = (option: any) => {
    setResponses([...responses, { ...option, dichotomy: questions[currentQuestion].dichotomy }]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults([...responses, { ...option, dichotomy: questions[currentQuestion].dichotomy }]);
      setShowResults(true);
    }
  };

  const calculateResults = (finalResponses: any[]) => {
    const scores = { 'E/I': 0, 'S/N': 0, 'T/F': 0, 'J/P': 0 };
    finalResponses.forEach(res => {
        scores[res.dichotomy as keyof typeof scores] += res.score;
    });

    const ei = scores['E/I'] >= 0 ? 'E' : 'I';
    const sn = scores['S/N'] >= 0 ? 'S' : 'N';
    const tf = scores['T/F'] >= 0 ? 'T' : 'F';
    const jp = scores['J/P'] >= 0 ? 'J' : 'P';
    const type = `${ei}${sn}${tf}${jp}`;
    
    setAssessmentData(typeDescriptions[type]);
  };
  
  const resetTest = () => {
      setCurrentQuestion(0);
      setResponses([]);
      setShowResults(false);
      setAssessmentData(null);
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && assessmentData) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
            <p className={`${currentTheme.text} font-semibold`}>{assessmentData.nickname}</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white my-2">{assessmentData.name} ({Object.keys(typeDescriptions).find(key => typeDescriptions[key] === assessmentData)})</h2>
            <p className="text-lg text-gray-300">{assessmentData.description}</p>
            <p className="text-sm text-gray-500 mt-2">{assessmentData.percentage}</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center"><IconCheckCircle className="w-5 h-5 mr-2 text-green-400"/> Strengths</h3>
                    <ul className="space-y-2">
                        {assessmentData.strengths.map((s: string, i: number) => <li key={i} className="flex items-start"><span className="text-green-400 mr-2 mt-1">&#10003;</span><span className="text-gray-300">{s}</span></li>)}
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center"><IconBrain className="w-5 h-5 mr-2 text-yellow-400"/> Challenges</h3>
                    <ul className="space-y-2">
                         {assessmentData.challenges.map((c: string, i: number) => <li key={i} className="flex items-start"><span className="text-yellow-400 mr-2 mt-1">&#8226;</span><span className="text-gray-300">{c}</span></li>)}
                    </ul>
                </div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center"><IconUser className="w-5 h-5 mr-2 text-blue-400"/> Career Paths</h3>
                <div className="flex flex-wrap gap-2">
                    {assessmentData.careers.map((c: string, i: number) => <span key={i} className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm">{c}</span>)}
                </div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center"><IconHeart className="w-5 h-5 mr-2 text-red-400"/> In Relationships</h3>
                <p className="text-gray-300">{assessmentData.relationships}</p>
            </div>
        </div>
         <button onClick={resetTest} className={`mt-8 mx-auto flex items-center ${currentTheme.bg} ${currentTheme.hoverBg} text-white font-bold py-2 px-6 rounded-lg transition-colors`}>
            <IconRotateCcw className="w-5 h-5 mr-2"/>
            Take Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-2xl bg-gray-800/50 rounded-xl shadow-2xl p-6 sm:p-8">
            <div className="mb-6">
                 <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Advanced Personality Assessment</h2>
                 <p className="text-center text-gray-400 mt-2">Discover your unique strengths and tendencies.</p>
                 <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                    <div className={`${currentTheme.bg} h-2.5 rounded-full`} style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>
                <p className="text-sm text-gray-400 text-right mt-1">{currentQuestion + 1} / {questions.length}</p>
            </div>

            <div className="text-center">
                <p className="text-lg sm:text-xl font-medium text-gray-200 mb-6 min-h-[3em]">{questions[currentQuestion].question}</p>
                <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleResponse(option)}
                            className={`w-full text-left p-4 bg-gray-700 rounded-lg ${currentTheme.hoverBg} hover:scale-105 transform transition-all duration-200 ease-in-out`}
                        >
                           <span className="text-white">{option.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdvancedPersonalityAssessment;
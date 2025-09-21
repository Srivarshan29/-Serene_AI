import React from 'react';

const CrisisModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-slate-900/80 border border-rose-500/50 rounded-lg p-8 max-w-lg text-center text-white shadow-2xl shadow-rose-500/20 backdrop-blur-lg">
            <h2 className="text-3xl font-bold mb-4 text-rose-300">It sounds like you're going through a lot.</h2>
            <p className="mb-6 text-slate-300">Please know that help is available. If you are in immediate danger, please call 911. For immediate support, you can reach out to:</p>
            <ul className="space-y-3 text-lg">
                <li><strong>National Suicide Prevention Lifeline:</strong> <a href="tel:988" className="text-rose-400 hover:underline font-semibold">988</a></li>
                <li><strong>Crisis Text Line:</strong> Text HOME to <a href="sms:741741" className="text-rose-400 hover:underline font-semibold">741741</a></li>
            </ul>
            <p className="mt-6 text-sm text-slate-400">Remember, you are not alone, and there is support for you.</p>
            <button onClick={onClose} className="mt-8 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-rose-500/20">
                Close
            </button>
        </div>
    </div>
);

export default CrisisModal;
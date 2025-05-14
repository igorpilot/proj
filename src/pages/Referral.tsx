import { Link } from 'react-router-dom';

export default function Referral() {
    const user = JSON.parse(localStorage.getItem('tgUser') || '{}');
    const referralLink = `https://t.me/your_bot_name?start=${user?.id}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-pink-950 flex flex-col items-center justify-center p-4 text-center text-white">
            <h2 className="text-2xl font-semibold mb-4">🤝 Invite Friends</h2>
            <p className="mb-2">Share this link to earn rewards:</p>
            <input
                className="w-full max-w-sm p-2 rounded bg-white shadow text-sm text-center mb-4"
                readOnly
                value={referralLink}
                onClick={(e) => (e.target as HTMLInputElement).select()}
            />
        </div>
    );
}
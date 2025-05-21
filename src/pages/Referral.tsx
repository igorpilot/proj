import { Link } from 'react-router-dom';
import {useContext} from "react";
import {Context} from "../index";

export default function Referral() {
    const { store } = useContext(Context);
    const referralLink = `https://t.me/JetTicketBot?start=${store.user?.telegramId || ''}`;

    const handleShare = async () => {
        const tg = window.Telegram?.WebApp as any;

        try {
            if (tg?.initData && tg?.shareLink) {
                tg.shareLink(referralLink, "🔥 Приєднуйся до мене в грі JetTicket та отримай бонус!");
            } else if (navigator.share) {
                await navigator.share({
                    title: "JetTicket 🎮",
                    text: "🔥 Приєднуйся до мене в грі JetTicket!",
                    url: referralLink
                });
            } else {
                await navigator.clipboard.writeText(referralLink);
                alert("Посилання скопійовано 📋");
            }
        } catch (error) {
            console.error("Помилка поширення:", error);
            // Fallback для старих браузерів
            const input = document.createElement('input');
            input.value = referralLink;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            alert("Посилання скопійовано 📋");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-pink-950 flex flex-col items-center justify-center p-4 text-center text-white">
            <h2 className="text-2xl font-semibold mb-4">🤝 Invite Friends</h2>
            <p className="mb-4">Натисни кнопку нижче, щоб поділитися реферальним посиланням:</p>

            <button
                onClick={handleShare}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded shadow"
            >
                Поділитися в Telegram
            </button>

            {/* Додатковий елемент для відображення посилання */}
            <div className="mt-4 p-2 bg-pink-800 rounded break-all max-w-full">
                {referralLink}
            </div>
        </div>
    );
}

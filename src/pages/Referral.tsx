import { Link } from 'react-router-dom';
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {FriendCard, FriendEmpty} from "../components/FriendCard";

export default function Referral() {
    const { store } = useContext(Context);
    const referralLink = `https://t.me/JetTicketBot?start=ref_${store.user?.telegramId}`;

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
    useEffect(() => {
        const fetchfriends = async() =>{
            await store.getFriends(store.user.telegramId)
        }
        fetchfriends()
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 p-2 text-white">
            <div className="max-w-md mx-auto bg-pink-800/50 rounded-2xl p-2 shadow-xl backdrop-blur-sm">
                <div className="text-center mb-3">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
                        🎉 Запрошуй друзів
                    </h2>
                    <div className="bg-pink-900/80 rounded-xl p-2">
                        <p className="text-lg font-semibold">Ви отримуєте за кожного друга:</p>
                        <div className="flex justify-center gap-6 mt-2">
                            <div className="flex items-center">
                                <span className="text-yellow-300 mr-1">+1000</span> монет
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-300 mr-1">+1</span> USDT
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-300 mr-1">+50</span>/год
                            </div>
                        </div>
                    </div>
                    <div className="bg-pink-900/80 rounded-xl p-2 mb-4">
                        <p className="text-lg font-semibold">Друг отримує:</p>
                        <div className="flex justify-center gap-6 mt-2">
                            <div className="flex items-center">
                                <span className="text-yellow-300 mr-1">1000</span> монет
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-300 mr-1">5</span> USDT
                            </div>
                        </div>
                    </div>
                    {/*<div className="bg-pink-700/60 rounded-xl p-2">*/}
                    {/*    <p className="text-sm">Друг отримує: <span className="font-bold">1000 монет + 5 USDT</span></p>*/}
                    {/*</div>*/}
                </div>

                {/* Кнопка поширення */}
                <button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] mb-2 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24"
                         fill="currentColor">
                        <path
                            d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5m16 1V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                    </svg>
                    Поділитися посиланням
                </button>

                {/* Реферальне посилання */}
                <div className="mb-8">
                <p className="text-sm opacity-80 mb-2">Ваше реферальне посилання:</p>
                    <div className="relative">
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="w-full bg-pink-900/70 border border-pink-700 rounded-lg py-2 px-4 pr-12 text-sm truncate"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(referralLink);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
                            title="Копіювати"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Список друзів */}
                <div className="bg-pink-900/40 rounded-xl p-1">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Ваші друзі ({store.friends?.length || 0})
                    </h3>

                    {store.friends?.length > 0 ? (
                        <div className="space-y-3">
                            {store.friends.map((friend, index) => <FriendCard key={index} friend={friend} index={index}/>)}
                        </div>
                    ) : <FriendEmpty/>}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 mb-10 justify-center text-center">
                    <div className="bg-pink-900/50 rounded-lg p-3">
                        <p className="text-sm opacity-80">Зароблено монет</p>
                        <p className="text-xl font-bold text-yellow-300">{(store.friends?.length * 1000) || 0}</p>
                    </div>
                    <div className="bg-pink-900/50 rounded-lg p-3 justify-center text-center">
                        <p className="text-sm opacity-80">Зароблено USDT</p>
                        <p className="text-xl font-bold text-green-300">{store.friends?.length || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import {FC, useContext, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {LotteryGame} from "./LotteryGame";
import {Context} from "../index";
import {NotEnoughMoneyModal} from "./NotEnoughMoneyModal";
import {ConfirmLotteryModal} from "./ConfirmLotteryModal";

type Props = {
    lottery: any;
    onClose: () => void;
};



export const CardOverview: FC<Props> = ({ lottery, onClose }) => {
    const { store } = useContext(Context);
    const [showGame, setShowGame] = useState(false);
    const [notMoney, setNotMoney] = useState(false);
    const [confirmMode, setConfirmMode] = useState(false);
    const startGame =async ()=>{
        await store.ticketUsed(lottery)
            .then(()=>setShowGame(true))
    }
    const buyHandler = async () => {
        if (store.user.balance >= lottery.cost) {
            setConfirmMode(true);
        } else {
            setNotMoney(true);
        }
    };

    const handlePlayOrSave = async (action: "play" | "save") => {
        try {
            await store.ticketUse(lottery, action);
            if (action === "play") setShowGame(true);
            else onClose();
            setConfirmMode(false)
        } catch (e) {
            console.error("Ticket save error", e);
        }
    };
    const handlerSendFriend = async ()=>{
        const referralLink = `🎟 Я дарую тобі лотерейку в JetTicket! Натисни та вигравай 🎁 https://t.me/JetTicketBot?start=gift_lottery-${store.user.telegramId}-${lottery.id}-${Date.now().toString(20)}`
        console.log(referralLink)
        const tg = window.Telegram?.WebApp as any;
        try {
            if(lottery.origin !== "purchased") {
                await store.ticketUse(lottery, "save");
            }
            if (tg?.initData && tg?.shareLink) {
                const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('🎟 Я дарую тобі лотерейку в JetTicket! Натисни та вигравай 🎁')}`;
                window.open(shareUrl, '_blank');

            } else if (navigator.share) {
                await navigator.share({
                    title: "JetTicket 🎮",
                    text: "🔥 Я дарую тобі лотерейку в JetTicket! Натисни та грай:",
                    url: referralLink,
                });
            } else {
                await navigator.clipboard.writeText(referralLink);
                alert("Посилання скопійовано 📋");
            }
        } catch (error) {
            console.error("Помилка поширення:", error);
        } finally {

        }
    }
    const numericTiers = lottery.rewardTiers.filter((t:any) => typeof t.amount === "number");
    const minReward = Math.min(...numericTiers.map((t:any) => t.amount!));
    const maxReward = Math.max(...numericTiers.map((t:any) => t.amount!));

    return (
        <>
            <AnimatePresence>
                {notMoney && <NotEnoughMoneyModal onClose={() => setNotMoney(false)} />}
                {confirmMode && (
                    <ConfirmLotteryModal
                        onClose={() => setConfirmMode(false)}
                        onPlay={() => handlePlayOrSave("play")}
                        onSave={() => handlePlayOrSave("save")}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-pink-900 text-white rounded-3xl p-6 w-[90%] max-w-md shadow-2xl relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-white text-xl"
                        >
                            ✖
                        </button>

                        {showGame ? (
                            <LotteryGame
                                lottery={lottery}
                                onWin={(amount) => console.log("Виграш:", amount)}
                            />
                        ) : (
                            <>
                                <img
                                    src={lottery.image}
                                    alt={lottery.name}
                                    className="h-32 object-cover mx-auto rounded-2xl shadow mb-4"
                                />
                                <h2 className="text-2xl font-bold text-center mb-2">{lottery.name}</h2>
                                <p className="text-sm text-center italic text-pink-200 mb-4">
                                    {lottery.description}
                                </p>
                                <p className="text-sm mb-2">
                                    🎟️ Вартість
                                    участі: <strong>{lottery.cost} {lottery.type === "coin" ? 'coins' : "usdt"}</strong>
                                </p>
                                <p className="text-sm mb-2">
                                    + <strong>{lottery.hourlyProfit} монет за годину</strong>
                                </p>
                                <p className="text-sm mb-2">
                                    🏆 Можна
                                    виграти: <strong>{minReward}–{maxReward} {lottery.type === "coin" ? 'coins' : "usdt"}</strong>
                                </p>
                                <p className="text-sm mb-4">📜 Правила: {lottery.rules}</p>

                                <div className="flex justify-around gap-2 mt-6">
                                    {lottery.origin === "purchased" && (
                                        <>
                                            <button
                                                className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                                                onClick={startGame}
                                            >
                                                🎮 Грати зараз
                                            </button>
                                            <button
                                                className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                                                onClick={handlerSendFriend}
                                            >
                                                🎁 Подарувати другу
                                            </button>
                                        </>
                                    )}

                                    {lottery.origin === "received" && (
                                        <button
                                            className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                                            onClick={startGame}
                                        >
                                            🎮 Грати зараз
                                        </button>
                                    )}

                                    {!lottery.origin && (
                                        <>
                                            <button
                                                className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                                                onClick={buyHandler}
                                            >
                                                Купити
                                            </button>
                                            <button
                                                className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                                                onClick={handlerSendFriend}
                                            >
                                                Подарувати другу
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

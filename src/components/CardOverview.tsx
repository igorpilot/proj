import {FC, useContext, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {LotteryGame} from "./LotteryGame";
import {Context} from "../index";
import {NotEnoughMoneyModal} from "./NotEnoughMoneyModal";

type Props = {
    lottery: any;
    onClose: () => void;
};

export const CardOverview: FC<Props> = ({ lottery, onClose }) => {
    const { store } = useContext(Context);
    const [showGame, setShowGame] = useState(false);
    const [notMoney, setNotMoney] = useState(false);

    const buyHandler = async () => {
        if (store.user.balance >= lottery.cost) {
            try {
                await store.useTicket(lottery).then(() => setShowGame(true));
            } catch (e) {
                console.error("Ticket use error", e);
            }
        } else {
            setNotMoney(true);
        }
    };

    // Нові обчислення
    const numericTiers = lottery.rewardTiers.filter((t:any) => typeof t.amount === "number");
    const minReward = Math.min(...numericTiers.map((t:any) => t.amount!));
    const maxReward = Math.max(...numericTiers.map((t:any) => t.amount!));

    return (
        <>
            <AnimatePresence>
                {notMoney && <NotEnoughMoneyModal onClose={() => setNotMoney(false)} />}
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
                                    🎟️ Вартість участі: <strong>{lottery.cost} монет</strong>
                                </p>
                                <p className="text-sm mb-2">
                                    + <strong>{lottery.hourlyProfit} монет за годину</strong>
                                </p>
                                <p className="text-sm mb-2">
                                    🏆 Можна виграти: <strong>{minReward}–{maxReward} монет</strong>
                                </p>
                                <p className="text-sm mb-4">📜 Правила: {lottery.rules}</p>

                                <div className="flex justify-around gap-2 mt-6">
                                    <button
                                        className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                                        onClick={buyHandler}
                                    >
                                        Купити
                                    </button>
                                    <button className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition">
                                        Подарувати другу
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

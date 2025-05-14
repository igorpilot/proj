import { AnimatePresence, motion } from "framer-motion";
import {FC, useState} from "react";
interface Props {
    passiveIncome: number,
    setShowOfflineReward: any
}
export const CollectPassiveCoins: FC<Props> = ({ setShowOfflineReward, passiveIncome }) => {

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-yellow-100 text-black rounded-3xl p-6 w-[90%] max-w-md shadow-2xl relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        onClick={() => setShowOfflineReward(false)}
                        className="absolute top-3 right-4 text-black text-xl"
                    >
                        ✖
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Вітаємо!</h2>
                        <p className="text-lg font-medium mb-4">
                            Поки ви були відсутні, ви отримали{" "}
                            <span className="text-yellow-600 font-bold">{passiveIncome}</span> монет.
                        </p>

                        <button
                            onClick={() => setShowOfflineReward(false)}
                            className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition"
                        >
                            Забрати монети
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
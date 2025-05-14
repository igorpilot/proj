import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    onClose: () => void;
}

export const NotEnoughMoneyModal: FC<Props> = ({ onClose }) => {
    return (

        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-red-900 text-white rounded-3xl p-6 w-[90%] max-w-xs shadow-xl relative text-center"
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

                    <div className="text-3xl mb-2">😢</div>
                    <h3 className="text-xl font-bold mb-2">Недостатньо монет</h3>
                    <p className="text-sm text-pink-200 mb-4">
                        Поповни баланс, щоб придбати цю лотерею.
                    </p>

                    <button
                        onClick={onClose}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl transition"
                    >
                        Добре
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

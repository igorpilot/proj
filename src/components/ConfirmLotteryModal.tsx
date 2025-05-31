import { AnimatePresence, motion } from "framer-motion";
import {FC} from "react";

interface  ConfirmLotteryModalProps {
    onClose: () => void;
    onPlay: () => void;
    onSave: () => void;
}
export const ConfirmLotteryModal:FC<ConfirmLotteryModalProps> = ({ onClose, onPlay, onSave }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-purple-900 text-white rounded-3xl p-6 w-[90%] max-w-xs shadow-xl relative text-center"
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

                    <div className="text-3xl mb-2">🎯</div>
                    <h3 className="text-xl font-bold mb-2">Що робити з лотереєю?</h3>
                    <p className="text-sm text-pink-200 mb-4">
                        Стерти зараз чи зберегти на потім?
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={onPlay}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl transition"
                        >
                            Стерти зараз
                        </button>
                        <button
                            onClick={onSave}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-xl transition"
                        >
                            Зберегти
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

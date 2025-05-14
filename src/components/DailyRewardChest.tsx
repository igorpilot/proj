import {useContext, useEffect, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CloseIcon from '@mui/icons-material/Close';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

export const DailyRewardChest = observer(() => {
    const{store}=useContext(Context);
    const [opened, setOpened] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpen  =async () => {
        //const audio = new Audio('/sounds/chest-open.mp3');
        //audio.play();
        await store.dailyReward(store.user.telegramId, store.user.balance)
        setOpened(true);
        setModalVisible(true);
    };
    useEffect(() => {
        if (store.user.lastDailyReward) {
            const lastRewardDate = new Date(store.user.lastDailyReward);
            const now = new Date();

            const isSameDay =
                lastRewardDate.getFullYear() === now.getFullYear() &&
                lastRewardDate.getMonth() === now.getMonth() &&
                lastRewardDate.getDate() === now.getDate();

            if (isSameDay) {
                setOpened(true); // вже відкривав
            }
        }
    }, [store.user.lastDailyReward]);
    return (
        <>
            <div className="bg-yellow-100/10 rounded-2xl p-4 text-center text-white shadow-lg border border-yellow-300">
                {!opened ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="flex flex-col items-center gap-2 mx-auto"
                    >
                        <motion.img
                            src="/coffer-closed.png"
                            alt="Скриня закрита"
                            className="w-32 h-32 animate-bounce"
                            initial={{ rotate: -2 }}
                            animate={{ rotate: [ -2, 2, -2 ] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        />
                        <span className="font-bold text-xl">Відкрити щоденну скриню</span>
                    </motion.button>
                ) : (
                    <div className="flex flex-col items-center gap-2 mx-auto">
                        <motion.img
                            src="/coffer-opened.png"
                            alt="Скриня відкрита"
                            className="w-32 h-32 animate-pulse"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: [0.9, 1.05, 0.9] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        />
                        <div className="text-lg font-semibold text-green-300 animate-pulse">
                            🎉 Ви вже отримали 50 монет сьогодні!
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {modalVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6 rounded-3xl text-center shadow-2xl max-w-sm w-full relative"
                        >
                            <button
                                className="absolute top-2 right-2 text-yellow-800 hover:text-red-500"
                                onClick={() => setModalVisible(false)}
                            >
                                <CloseIcon />
                            </button>

                            <img
                                src="/coffer-opened.png"
                                alt="Скриня відкрита"
                                className="w-24 h-24 mx-auto mb-4 animate-bounce"
                            />
                            <h2 className="text-2xl font-bold text-yellow-900 mb-2">Скриня відкрита!</h2>
                            <p className="text-lg text-yellow-800">
                                🎉 Ви отримали <span className="font-bold">50 монет</span>!
                            </p>

                            <button
                                onClick={() => setModalVisible(false)}
                                className="mt-6 bg-yellow-700 text-white px-4 py-2 rounded-xl hover:bg-yellow-800 transition"
                            >
                                Закрити
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

});

import {useContext, useEffect, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

export const DailyRewardChest = observer(() => {
    const{store}=useContext(Context);
    const [opened, setOpened] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpen  = async () => {
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
                setOpened(true);
            }
        }
    }, [store.user.lastDailyReward]);
    return (
        <div className="bg-yellow-900/50 rounded-2xl p-2 text-center border border-yellow-400/30">
            {!opened ? (
                <motion.button
                    onClick={handleOpen}
                    className="w-full flex flex-col items-center gap-2"
                    whileTap={{scale: 0.95}}
                >
                    <motion.img
                        src="/coffer-closed.png"
                        className="w-24 h-24"
                        animate={{rotate: [-3, 3, -3], y: [0, -5, 0]}}
                        transition={{repeat: Infinity, duration: 2}}
                    />
                    <span className="font-bold text-yellow-300">Відкрити нагороду</span>
                </motion.button>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <motion.img
                        src="/coffer-opened.png"
                        className="w-24 h-24"
                        animate={{scale: [0.95, 1.05, 0.95]}}
                        transition={{repeat: Infinity, duration: 2}}
                    />
                    <p className="text-yellow-200 text-sm">🎉 Вже отримано сьогодні</p>
                </div>
            )}

            <AnimatePresence>
                {modalVisible && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
                        onClick={() => setModalVisible(false)}
                    >
                        <motion.div
                            className="bg-yellow-100 p-5 rounded-2xl text-center max-w-xs w-full"
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            exit={{scale: 0.8}}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src="/coffer-opened.png" className="w-28 h-28 mx-auto mb-3"/>
                            <h3 className="text-2xl font-bold text-yellow-900 mb-1">+50 монет</h3>
                            <button
                                onClick={() => setModalVisible(false)}
                                className="mt-4 bg-yellow-600 text-white px-5 py-2 rounded-lg font-medium"
                            >
                                Закрити
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

});

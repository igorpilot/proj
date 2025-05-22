import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

export const TipOfTheDay = () => {
    const tips = [
        "Спробуйте подарувати квиток другу — отримаєте бонус!",
        "Щоденні нагороди збільшуються при послідовному зборі",
        "Учасники з більшою кількістю друзів отримують спеціальні нагороди",
        "Перемагайте у щотижневих турнірах для отримання ексклюзивних призів"
    ];

    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
        >
            <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">💡</div>
                <div>
                    <div className="font-medium mb-1">Порада</div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTip}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-white/80"
                        >
                            {tips[currentTip]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

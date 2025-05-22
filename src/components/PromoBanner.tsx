import { motion } from "framer-motion";

export const PromoBanner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 text-white p-2 rounded-2xl shadow-lg border border-pink-300/30 backdrop-blur-sm"
        >
            <div className="flex items-center justify-center gap-2">
                <div className="text-2xl">🎁</div>
                <div>
                    <div className="font-bold text-sm">ТИЖДЕНЬ ФОРТУНИ</div>
                    <div className="text-s opacity-90">Подвійні виграші в лотереях!</div>
                </div>
            </div>
        </motion.div>
    );
};

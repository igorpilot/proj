import {useContext, useEffect, useState} from "react";
import { motion } from "framer-motion";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const THREE_HOURS = 0.15 * 60 * 60 * 1000 // мілісекунди

export const CoinRewardButton = observer(() => {
    const { store } = useContext(Context);
    const user = store.user;

    const [lastClaim, setLastClaim] = useState(() => {
        const saved = localStorage.getItem("lastClaim");
        return saved ? parseInt(saved) : 0;
    });


    const [canClaim, setCanClaim] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => {
        return THREE_HOURS - (Date.now() - lastClaim);
    });

    const [isClaimed, setIsClaimed] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = Date.now();
            const diff = now - lastClaim;

            if (diff >= THREE_HOURS) {
                setCanClaim(true);
                setTimeLeft(0);
            } else {
                setTimeLeft(THREE_HOURS - diff);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [lastClaim]);

    const claimCoins = async () => {
        await store.claimCoins(store.user)
        const now = Date.now();
        setLastClaim(now);
        setCanClaim(false);
        setTimeLeft(THREE_HOURS);
        setIsClaimed(true);


        localStorage.setItem("lastClaim", now.toString());
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    useEffect(() => {
        if (isClaimed) {
            const timer = setTimeout(() => setIsClaimed(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isClaimed]);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3 bg-black/20 rounded-full px-4 py-2 border border-white/10">
                <div className="text-yellow-300 text-xl">💰</div>
                <div className="text-center">
                    <div className="text-xs text-white/70">Ваш баланс</div>
                    <div className="font-bold text-xl text-yellow-300">{user.balance}</div>
                </div>
            </div>

            <motion.div
                onClick={canClaim ? claimCoins : undefined}
                whileHover={canClaim ? { scale: 1.05 } : {}}
                whileTap={canClaim ? { scale: 0.95 } : {}}
                className={`relative ${!canClaim ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <motion.div
                    animate={canClaim ? {
                        rotate: [0, 5, -5, 0],
                        y: [0, -5, 0]
                    } : {}}
                    transition={canClaim ? {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3
                    } : {}}
                >
                    <img
                        src="/coin.png"
                        alt="Coin Button"
                        className="w-48 h-48 drop-shadow-lg"
                        style={{ filter: canClaim ? "drop-shadow(0 0 12px rgba(255, 215, 0, 0.6))" : "grayscale(60%)" }}
                    />
                </motion.div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                    <div className={`text-2xl font-bold ${canClaim ? "text-yellow-300" : "text-white/70"}`}>
                        {canClaim ? "+100" : formatTime(timeLeft)}
                    </div>
                    {isClaimed && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text-green-300 font-bold text-lg"
                        >
                            +100 🎉
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {canClaim && <div className={`text-center px-4 py-2 rounded-full ${canClaim ? "bg-yellow-500/10 text-yellow-300" : "bg-white/5 text-white/60"} text-sm font-medium`}>
                 Натисніть, щоб отримати монети!
            </div>}
        </div>
    );
});


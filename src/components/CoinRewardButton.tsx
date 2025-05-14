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
        <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-yellow-300 text-xl font-bold flex items-center gap-2">
                <MonetizationOnIcon className="text-4xl" />
                <span>{user.balance} coins</span>
            </div>

            <motion.div
                onClick={canClaim ? claimCoins : undefined}
                whileTap={{ scale: canClaim ? 0.95 : 1 }}
                className={`relative w-64 h-64 cursor-pointer transition-all ${
                    !canClaim ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <img
                    src="/coin.png"
                    alt="Coin Button"
                    className="w-full h-full object-contain"
                    style={{ filter: canClaim ? "none" : "grayscale(100%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-yellow-200 font-bold text-2xl pointer-events-none">
                    {canClaim ? "+100" : formatTime(timeLeft)}
                </div>
            </motion.div>

            <p className="text-yellow-300 text-sm text-center">
                {canClaim ? "Натисни, щоб отримати 100 монет!" : "Зачекай поки згенеруються монети"}
            </p>
        </div>
    );
});


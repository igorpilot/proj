import {FC, useContext, useEffect, useState} from "react";
import {ScratchCardGame} from "./ScratchCardGame";
import {Context} from "../index";

interface LotteryCardProps {
    lottery:any
    onWin?: (amount: number) => void;
}

export const LotteryGame: FC<LotteryCardProps> = ({ lottery, onWin }) => {
    const { store } = useContext(Context);
    const [revealed, setRevealed] = useState(false);
    const [result, setResult] = useState<number | string | null>(null);
    const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
    const [winNumbers, setWinNumbers] = useState<number[]>([]);

    useEffect(() => {
        const totalNumbers = lottery.numberCount;
        const winCount = Math.max(1, Math.floor(Math.random() * 3) + 1); // 1–3 winning numbers

        // Генерація виграшних чисел
        const winSet = new Set<number>();
        while (winSet.size < winCount) {
            winSet.add(Math.floor(Math.random() * 90) + 10);
        }
        const winArr = Array.from(winSet);

        const isWinning = Math.random() >= lottery.failChance;

        const generatedSet = new Set<number>();
        if (isWinning) {
            // Додаємо одне з виграшних чисел
            generatedSet.add(winArr[Math.floor(Math.random() * winArr.length)]);
        }

        while (generatedSet.size < totalNumbers) {
            const n = Math.floor(Math.random() * 90) + 10;
            generatedSet.add(n);
        }

        const generated = Array.from(generatedSet).sort(() => Math.random() - 0.5);

        setGeneratedNumbers(generated);
        setWinNumbers(winArr);
    }, [lottery]);

    const handleReveal = () => {
        const isWinner = generatedNumbers.some(num => winNumbers.includes(num));

        let reward = 0;

        if (isWinner) {
            const roll = Math.random();
            let acc = 0;
            for (const tier of lottery.rewardTiers) {
                acc += tier.chance;
                if (roll <= acc) {
                    reward = tier.amount ?? tier.item ?? 0;
                    break;
                }
            }

                store.setUser({
                    ...store.user,
                    balance: store.user.balance + reward,
                });

        }

        setResult(reward);
        onWin?.(reward);
        setRevealed(true);
    };

    return (
        <div className="w-full h-[90vh] flex items-center justify-center">
            {!revealed ? (
                <ScratchCardGame
                    coverImage={lottery.image}
                    winNumbers={winNumbers}
                    numbers={generatedNumbers}
                    onScratchComplete={handleReveal}
                />
            ) : (
                <div className="text-center w-full max-w-md p-6 bg-yellow-300 rounded-2xl shadow text-black">
                    {result && result !== 0 ? (
                        <>
                            <div className="text-2xl mb-2">🏆 Вітаємо!</div>
                            <div className="text-4xl font-bold text-green-700">
                                {typeof result === "number" ? `+${result} монет` : `🎁 ${result}`}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-xl mb-1">😢 Не пощастило!</div>
                            <div className="text-sm">Спробуй ще раз</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
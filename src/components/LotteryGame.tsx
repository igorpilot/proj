import {FC, useContext, useEffect, useState} from "react";
import {ScratchCardGame} from "./ScratchCardGame";
import {Context} from "../index";

interface LotteryCardProps {
    lottery:any
    maxWin: number;
    onWin?: (amount: number) => void;
}

export const LotteryGame: FC<LotteryCardProps> = ({ lottery, onWin }) => {
    const {store}= useContext(Context)
    const [revealed, setRevealed] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
    const [winNumbers, setWinNumbers] = useState<number[]>([]);

    useEffect(() => {
        const totalNumbers = lottery.numberCount;
        const winCount = Math.max(1, Math.floor(Math.random() * 3) + 1); // завжди є 1–3 виграшних числа

        // 1. Генеруємо унікальні виграшні числа
        const winNumbersSet = new Set<number>();
        while (winNumbersSet.size < winCount) {
            winNumbersSet.add(Math.floor(Math.random() * 90) + 10);
        }
        const winNumbersArr = Array.from(winNumbersSet);

        // 2. Визначаємо, чи гравець виграє (чи хоч одне виграшне число потрапить у заховані)
        const isWinning = Math.random() < lottery.chance;

        // 3. Генеруємо заховані числа
        const generatedSet = new Set<number>();
        if (isWinning) {
            // Вставляємо випадкове виграшне число
            const winningNumber = winNumbersArr[Math.floor(Math.random() * winNumbersArr.length)];
            generatedSet.add(winningNumber);
        }

        // Додаємо випадкові числа до потрібної кількості
        while (generatedSet.size < totalNumbers) {
            const num = Math.floor(Math.random() * 90) + 10;
            generatedSet.add(num);
        }

        const generated = Array.from(generatedSet).sort(() => Math.random() - 0.5); // трохи перемішуємо

        setGeneratedNumbers(generated);
        setWinNumbers(winNumbersArr);
    }, [lottery]);


    const handleReveal = () => {
        const isWinner = generatedNumbers.some(num => winNumbers.includes(num)); // перевіряємо збіг

        const reward = isWinner
            ? Math.floor(Math.random() * (lottery.rewardRange[1] - lottery.rewardRange[0] + 1)) + lottery.rewardRange[0]
            : 0;

        setResult(reward);
        if (reward > 0) {
            store.setUser({
                ...store.user,
                balance: store.user.balance + reward,
            });
        }
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
                    {result && result > 0 ? (
                        <>
                            <div className="text-2xl mb-2">🏆 Вітаємо!</div>
                            <div className="text-4xl font-bold text-green-700">+{result} монет</div>
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
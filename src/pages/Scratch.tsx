import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Scratch() {
    const [coins, setCoins] = useState(20);
    const [ticket, setTicket] = useState<number[]>([]);
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setCoins((c) => c + 1), 10000);
        return () => clearInterval(interval);
    }, []);

    const buyTicket = () => {
        if (coins < 5) return alert('Not enough coins');
        setCoins((c) => c - 5);
        const nums = Array.from({ length: 3 }, () => Math.ceil(Math.random() * 9));
        setTicket(nums);
        const win = nums.every((n) => n === nums[0]);
        setResult(win ? '🎉 You won 20 coins!' : '😢 Try again!');
        if (win) setCoins((c) => c + 20);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-pink-950 flex flex-col items-center justify-center p-4 text-white">
            <h2 className="text-2xl font-semibold mb-2">🎟️ Scratch Your Ticket</h2>
            <div className="mb-4">💰 Coins: {coins}</div>
            <button onClick={buyTicket} className="bg-blue-500 text-white px-4 py-2 rounded-xl mb-4">
                Buy Ticket (5 coins)
            </button>
            <div className="flex gap-4 text-3xl">
                {ticket.map((n, i) => (
                    <div key={i} className="bg-pink-600 px-5 py-3 rounded shadow t">
                        {n}
                    </div>
                ))}
            </div>
            {result && <p className="mt-3 text-lg">{result}</p>}
        </div>
    );
}
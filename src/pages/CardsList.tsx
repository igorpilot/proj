import { Badge } from "../components/Badge";
import {FC, useContext, useState} from "react";
import {Card} from "../components/Card";
import {CardOverview} from "../components/CardOverview";
import {Context} from "../index";

export const lotteries = [
    {
        id: 'goldRush',
        type: 'coin',
        name: '💰 Gold Rush',
        description: 'Спробуй свою удачу у золотій лихоманці!',
        image: '/goldRush.png',
        imageLogo: '/goldRush-logo.png',
        rules: 'Сотри одне з трьох полів. Якщо випаде "💰", отримуєш нагороду.',
        cost: 500,
        hourlyProfit: 50,
        experience: 50,
        numberCount: 3,
        failChance: 0.2,
        rewardTiers: [
            { amount: 500, chance: 0.6 },
            { amount: 1000, chance: 0.5 },
            { amount: 2500, chance: 0.5 },
            { amount: 5000, chance: 0.5 }
        ]
    },
    {
        id: 'luckyClover',
        name: '🍀 Lucky Clover',
        description: 'Класична лотерея з веселим дизайном. Більше шансів на виграш!',
        image: '/luckyClover.png',
        imageLogo: '/luckyClover-logo.png',
        rules: 'Сотри одне поле. Якщо випаде "🍀", отримаєш нагороду.',
        cost: 200,
        hourlyProfit: 20,
        experience: 20,
        numberCount: 4,
        type: 'coin',
        failChance: 0.3,
        rewardTiers: [
            { amount: 200, chance: 0.6 },
            { amount: 500, chance: 0.5 },
            { amount: 1000, chance: 0.5 },
            { amount: 2000, chance: 0.5 }
        ]
    },
    {
        id: 'cosmicSpin',
        name: '🌌 Cosmic Spin',
        description: 'Галактична лотерея для справжніх мрійників.',
        image: '/cosmicSpin.png',
        imageLogo: '/cosmicSpin-logo.png',
        rules: 'Оберни колесо — і отримай монети, токени або навіть унікальні предмети.',
        cost: 10000,
        hourlyProfit: 100,
        experience: 100,
        numberCount: 4,
        type: 'coin',
        failChance: 0.25,
        rewardTiers: [
            { amount: 10000, chance: 0.5 },
            { amount: 25000, chance: 0.5 },
            { amount: 50000, chance: 0.5 },
            { amount: 100000, chance: 0.5 },

        ]
    },
    {
        id: 'fruitJackpot',
        name: '🍓 Fruit Jackpot',
        description: 'Фруктовий рай! Якщо випаде три однакові фрукти — ти виграв!',
        image: '/fruitJackpot.png',
        imageLogo: '/fruitJackpot-logo.png',
        rules: 'Обери 3 з 6 фруктів. Якщо всі однакові — отримаєш супернагороду!',
        cost: 300,
        hourlyProfit: 30,
        experience: 30,
        numberCount: 6,
        type: 'coin',
        failChance: 0.5,
        rewardTiers: [
            { amount: 300, chance: 0.6 },
            { amount: 1000, chance: 0.5 },
            { amount: 1500, chance: 0.5 },
            { amount: 3000, chance: 0.5 }
        ]
    },
    {
        id: 'mysteryBox',
        name: '🎁 Mystery Box',
        description: 'Ніхто не знає, що всередині... Подарунок або нічого?',
        image: '/mysteryBox.png',
        imageLogo: '/mysteryBox-logo.png',
        rules: 'Купи коробку — відкрий. Може бути великий виграш або порожня коробка.',
        cost: 400,
        hourlyProfit: 40,
        experience: 40,
        numberCount: 8,
        type: 'coin',
        failChance: 0.4,
        rewardTiers: [
            { amount: 400, chance: 0.6 },
            { amount: 1000, chance: 0.5 },
            { amount: 2000, chance: 0.5 },
            { amount: 4000, chance: 0.5 }
        ]
    },
    {
        id: 'cryptoIce',
        type: 'usdt',
        name: '🧊 Crypto Ice',
        description: 'Заморожений виграш чекає тебе. Розбий лід!',
        image: '/cryptoIce.png',
        imageLogo: '/cryptoIce-logo.png',
        rules: 'Зітри кубики льоду',
        cost: 5,
        hourlyProfit: 50,
        experience: 50,
        numberCount: 4,
        failChance: 0.3,
        rewardTiers: [
            { amount: 5, chance: 0.5 },
            { amount: 10, chance: 0.4 },
            { amount: 25, chance: 0.3 },
            { amount: 100, chance: 0.1 }
        ]
    },
    {
        id: 'stellarFortune',
        type: 'usdt',
        name: '🌌 Stellar Fortune',
        description: 'Зітри зірку — може, саме ця зірка принесе тобі щастя!',
        image: '/stellarFortune.png',
        imageLogo: '/stellarFortune-logo.png',
        rules: 'Зітри зірку. У ній може бути від 10 до 500 USDT!',
        cost: 10,
        hourlyProfit: 100,
        experience: 100,
        numberCount: 5,
        failChance: 0.5,
        rewardTiers: [
            { amount: 10, chance: 0.4 },
            { amount: 50, chance: 0.3 },
            { amount: 200, chance: 0.2 },
            { amount: 300, chance: 0.1 }
        ]
    },
    {
        id: 'usdtInferno',
        type: 'usdt',
        name: '🔥 USDT Inferno',
        description: 'Гаряча лотерея з палаючим шансом виграти великий куш!',
        image: '/usdtInferno.png',
        imageLogo: '/usdtInferno-logo.png',
        rules: 'Зітри вогняні поля.',
        cost: 20,
        hourlyProfit: 200,
        experience: 200,
        numberCount: 4,
        failChance: 0.4,
        rewardTiers: [
            { amount: 20, chance: 0.4 },
            { amount: 50, chance: 0.3 },
            { amount: 100, chance: 0.2 },
            { amount: 500, chance: 0.1 }
        ]
    },
    {
        id: 'redEnvelope',
        type: 'usdt',
        name: '🧧 Red Envelope',
        description: 'Китайська традиція з сюрпризом. Але не всі конверти виграшні!',
        image: '/redEnvelope.png',
        imageLogo: '/redEnvelope-logo.png',
        rules: 'Удача посміхнеться найхоробрішим.',
        cost: 50,
        hourlyProfit: 500,
        experience: 500,
        numberCount: 6,
        failChance: 0.6,
        rewardTiers: [
            { amount: 50, chance: 0.3 },
            { amount: 100, chance: 0.3 },
            { amount: 500, chance: 0.2 },
            { amount: 1000, chance: 0.2 }
        ]
    },
    {
        id: 'diamondVault',
        type: 'usdt',
        name: '💎 Diamond Vault',
        description: 'Секретний сейф із багатством. Але лише один із ключів справжній!',
        image: '/diamondVault.png',
        imageLogo: '/diamondVault-logo.png',
        rules: 'Зітри ключі.',
        cost: 100,
        hourlyProfit: 1000,
        experience: 1000,
        numberCount: 3,
        failChance: 0.7,
        rewardTiers: [
            { amount: 100, chance: 0.2 },
            { amount: 150, chance: 0.2 },
            { amount: 500, chance: 0.1 },
            { amount: 1000, chance: 0.05 }
        ]
    },
    {
        id: 'birthdayBlast',
        type: 'gift',
        name: '🎂 Birthday Blast',
        description: 'Сюрприз до дня народження! Подаруй друзям шанс зірвати куш 🎉',
        image: '/birthdayBlast.png',
        imageLogo: '/birthdayBlast-logo.png',
        rules: 'Сотри 3 числа. Якщо збігаються з виграшними — отримаєш подарунок!',
        cost: 5,
        hourlyProfit: 100,
        experience: 100,
        numberCount: 3,
        failChance: 0.3,
        rewardTiers: [
            { amount: 5, chance: 0.5 },
            { amount: 10, chance: 0.3 },
            { amount: 50, chance: 0.2 },
            { amount: 100, chance: 0.1 }
        ]
    },
    {
        id: 'secretSurprise',
        type: 'gift',
        name: '🎁 Secret Surprise',
        description: 'Несподіванка для друга — відкрий та дізнайся, що всередині!',
        image: '/secretSurprise.png',
        imageLogo: '/secretSurprise-logo.png',
        rules: 'Сотри 4 числа. Якщо серед них є виграшне — отримаєш бонус!',
        cost: 5,
        hourlyProfit: 100,
        experience: 100,
        numberCount: 4,
        failChance: 0.35,
        rewardTiers: [
            { amount: 5, chance: 0.5 },
            { amount: 10, chance: 0.3 },
            { amount: 20, chance: 0.15 },
            { amount: 100, chance: 0.05 }
        ]
    },
    {
        id: 'friendlyFlame',
        type: 'gift',
        name: '🔥 Friendly Flame',
        description: 'Запали емоції! Надішли лотерею тому, хто заслуговує на удачу!',
        image: '/friendlyFlame.png',
        imageLogo: '/friendlyFlame-logo.png',
        rules: 'Сотри 3 числа. Якщо хоча б два однакові — виграш твій!',
        cost: 10,
        hourlyProfit: 200,
        experience: 200,
        numberCount: 3,
        failChance: 0.4,
        rewardTiers: [
            { amount: 10, chance: 0.5 },
            { amount: 20, chance: 0.3 },
            { amount: 50, chance: 0.15 },
            { amount: 100, chance: 0.05 }
        ]
    },
    {
        id: 'justBecause',
        type: 'gift',
        name: '🌈 Just Because',
        description: 'Без причини — просто подарунок. Бо іноді так треба 💛',
        image: '/justBecause.png',
        imageLogo: '/justBecause-logo.png',
        rules: 'Сотри 5 чисел. Якщо збігаються з секретним кодом — ти виграв!',
        cost: 20,
        hourlyProfit: 500,
        experience: 500,
        numberCount: 5,
        failChance: 0.5,
        rewardTiers: [
            { amount: 20, chance: 0.5 },
            { amount: 50, chance: 0.3 },
            { amount: 100, chance: 0.15 },
            { amount: 500, chance: 0.05 }
        ]
    },
    {
        id: 'thanksCard',
        type: 'gift',
        name: '💌 Thanks Card',
        description: 'Хочеш подякувати комусь особливому? Зроби це через лотерею 🙌',
        image: '/thanksCard.png',
        imageLogo: '/thanksCard-logo.png',
        rules: 'Сотри 4 цифри. Якщо випаде подяка — отримаєш бонус!',
        cost: 50,
        hourlyProfit: 1000,
        experience: 1000,
        numberCount: 4,
        failChance: 0.35,
        rewardTiers: [
            { amount: 50, chance: 0.5 },
            { amount: 100, chance: 0.3 },
            { amount: 150, chance: 0.15 },
            { amount: 1000, chance: 0.05 }
        ]
    }





];

export const CardsList: FC = () => {
    const { store } = useContext(Context);
    const [selected, setSelected] = useState<null | (typeof lotteries[0] & { origin?: string })>(null);
    const [filter, setFilter] = useState<"coin" | "usdt" | "gift" | "saved">("coin");
    const [savedType, setSavedType] = useState<"purchased" | "received">("purchased");

    const getSavedLotteries = () => {
        if (!store.user) return [];

        if (savedType === "purchased") {
            const counts: Record<string, number> = {};
            store.user.lotteries.purchased.forEach((id: string) => {
                counts[id] = (counts[id] || 0) + 1;
            });

            return Object.entries(counts)
                .map(([id, count]) => {
                    const lottery = lotteries.find((l) => l.id === id);
                    return lottery ? { ...lottery, count } : null;
                })
                .filter(Boolean);
        }

        if (savedType === "received") {
            const counts: Record<string, { count: number; from: string }> = {};

            const unUsed = store.user.lotteries.received.filter((entry: any) => !entry.used);

            unUsed.forEach((entry: { id: string; from: string }) => {
                const key = JSON.stringify({ id: entry.id, from: entry.from });
                if (!counts[key]) {
                    counts[key] = { count: 1, from: entry.from };
                } else {
                    counts[key].count += 1;
                }
            });

            return Object.entries(counts)
                .map(([key, value]) => {
                    const { id, from } = JSON.parse(key);
                    const lottery = lotteries.find((l) => l.id === id);
                    return lottery ? { ...lottery, count: value.count, from } : null;
                })
                .filter(Boolean);
        }

        return [];
    };

    const purchasedCount = store.user?.lotteries.purchased.length || 0;
    const receivedCount = store.user?.lotteries.received.filter(c=>c.used === false).length || 0;
    const totalSaved = purchasedCount + receivedCount;

    const filtered =
        filter === "saved"
            ? getSavedLotteries()
            : lotteries.filter((lottery) => lottery.type === filter);

    return (
        <div className="bg-gradient-to-b from-pink-900 to-purple-900 min-h-screen p-2 pb-20">
            {/* Головні фільтри */}
            <div className="flex justify-around mb-3">
                {[
                    { label: "💰Монети", value: "coin" },
                    { label: "🪙USDT", value: "usdt" },
                    { label: "🎁Подарунки", value: "gift" },
                ].map((btn) => (
                    <button
                        key={btn.value}
                        onClick={() => setFilter(btn.value as any)}
                        className={`px-1 py-1 rounded-full text-sm font-medium transition ${
                            filter === btn.value ? "bg-yellow-400 text-black" : "bg-white/20 text-white"
                        }`}
                    >
                        {btn.label}
                    </button>
                ))}

                {/* Кнопка "Збережені" з бейджиком */}
                <div className="relative">
                    <button
                        onClick={() => setFilter("saved")}
                        className={`px-1 py-1 rounded-full text-sm font-medium transition ${
                            filter === "saved" ? "bg-yellow-400 text-black" : "bg-white/20 text-white"
                        }`}
                    >
                        ✅Збережені
                    </button>
                    <Badge count={totalSaved} />
                </div>
            </div>

            {filter === "saved" && (
                <div className="flex justify-center gap-4 mb-3">
                    <div className="relative">
                        <button
                            onClick={() => setSavedType("purchased")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                savedType === "purchased" ? "bg-yellow-300 text-black" : "bg-white/20 text-white"
                            }`}
                        >
                            Куплені
                        </button>
                        <Badge count={purchasedCount} />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setSavedType("received")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                savedType === "received" ? "bg-yellow-300 text-black" : "bg-white/20 text-white"
                            }`}
                        >
                            Отримані
                        </button>
                        <Badge count={receivedCount} />
                    </div>
                </div>
            )}

            {/* Список лотерей */}
            <div className="grid grid-cols-2 gap-1">
                {filtered
                    .sort((a: any, b: any) => a.cost - b.cost)
                    .map((lottery: any) => (
                        <div
                            key={lottery.id}
                            onClick={() => setSelected({ ...lottery, origin: filter === "saved" ? savedType : null })}
                        >
                            <Card lottery={lottery} count={lottery.count} from={lottery.from} />
                        </div>
                    ))}
            </div>

            {selected && <CardOverview lottery={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

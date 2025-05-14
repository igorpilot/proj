import {FC, useState} from "react";
import {Card} from "../components/Card";
import {CardOverview} from "../components/CardOverview";
export const lotteries = [
    {
        id: 'gold-rush',
        name: '💰 Gold Rush',
        description: 'Спробуй свою удачу у золотій лихоманці! Можеш виграти до 1000 монет за одне стирання.',
        image: '/goldRush.png',
        imageLogo: '/goldRush-logo.png',
        rules: 'Сотри одне з трьох полів. Якщо в тебе випаде "💰", отримуєш від 100 до 1000 монет.',
        cost: 500,
        hourlyProfit: 50,
        rewardRange: [100, 1000],
        numberCount: 3,
        chance: 0.5
    },
    {
        id: 'lucky-clover',
        name: '🍀 Lucky Clover',
        description: 'Класична лотерея з веселим дизайном. Більше шансів на виграш!',
        image: '/luckyClover.png',
        imageLogo: '/luckyClover-logo.png',
        rules: 'Сотри одне поле. Якщо випаде "🍀", отримаєш випадкову нагороду від 20 до 200 монет.',
        cost: 200,
        hourlyProfit: 20,
        rewardRange: [20, 200],
        numberCount: 4,
        chance: 0.2
    },
    {
        id: 'cosmic-spin',
        name: '🌌 Cosmic Spin',
        description: 'Галактична лотерея для справжніх мрійників. Можеш виграти рідкісні бонуси.',
        image: '/cosmicSpin.png',
        imageLogo: '/cosmicSpin-logo.png',
        rules: 'Оберни колесо — і отримай монети, токени або навіть унікальні предмети.',
        cost: 10000,
        hourlyProfit: 100,
        rewardRange: [50, 500],
        numberCount: 4,
        chance: 0.6,
        rarePrizes: ['🚀 Boost x2', '🪐 Premium Ticket']
    },
    {
        id: 'fruit-jackpot',
        name: '🍓 Fruit Jackpot',
        description: 'Фруктовий рай! Якщо випаде три однакові фрукти — ти виграв!',
        image: '/fruitJackpot.png',
        imageLogo: '/fruitJackpot-logo.png',
        rules: 'Обери 3 з 6 фруктів. Якщо всі однакові — отримаєш супернагороду!',
        cost: 300,
        hourlyProfit: 30,
        rewardRange: [50, 300],
        numberCount: 6,
        chance: 0.3
    },
    {
        id: 'mystery-box',
        name: '🎁 Mystery Box',
        description: 'Ніхто не знає, що всередині... Подарунок або нічого?',
        image: '/mysteryBox.png',
        imageLogo: '/mysteryBox-logo.png',
        rules: 'Купи коробку — відкрий. Може бути великий виграш або порожня коробка.',
        cost: 400,
        hourlyProfit: 40,
        rewardRange: [0, 500],
        numberCount: 8,
        chance: 0.4
    }
];

export const CardsList:FC=()=>{
    const [selected, setSelected] = useState<null | typeof lotteries[0]>(null);
    return (<div className="bg-gradient-to-b from-pink-900 to-pink-950 min-h-screen p-2 pb-20">
        <div className="grid grid-cols-2 gap-1">
            {lotteries.sort((a, b) => a.cost - b.cost).map((lottery) => (
                <div key={lottery.id} onClick={() => setSelected(lottery)}>
                    <Card lottery={lottery}/>
                </div>
            ))}
        </div>
        {selected && (
            <CardOverview lottery={selected} onClose={() => setSelected(null)} />
        )}
    </div>)
}
import {PromoBanner} from "../components/PromoBanner";
import {DailyRewardChest} from "../components/DailyRewardChest";
import {TipOfTheDay} from "../components/TipOfTheDay";
import {CoinRewardButton} from "../components/CoinRewardButton";


const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 p-4 pb-24 flex flex-col gap-6 text-white">
            {/* Верхній блок з нагородами та банером */}
            <div className="grid grid-cols-2 gap-2">
                <DailyRewardChest />
                <PromoBanner />
            </div>

            {/* Основна кнопка винагороди */}
            <CoinRewardButton />

            {/* Додаткові елементи */}
            <TipOfTheDay />

            {/* Нижній відступ для мобільних пристроїв */}
            <div className="h-16"></div>
        </div>
    );
};
export default Home
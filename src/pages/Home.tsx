import {PromoBanner} from "../components/PromoBanner";
import {DailyRewardChest} from "../components/DailyRewardChest";
import {TipOfTheDay} from "../components/TipOfTheDay";
import {CoinRewardButton} from "../components/CoinRewardButton";


const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-pink-950 p-4 pb-20 flex flex-col gap-6 text-white">
            <DailyRewardChest />
            <CoinRewardButton />
            <PromoBanner />

            <TipOfTheDay />
        </div>
    );
};
export default Home
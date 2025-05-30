import {FC} from "react";

interface Props {
    lottery: any
}
export const Card: FC<Props> = ({ lottery }) => {
    // Отримуємо максимум серед amount (ігноруємо item-нагороди)
    const maxReward = Math.max(
        ...lottery.rewardTiers
            .filter((tier:any) => typeof tier.amount === "number")
            .map((tier:any) => tier.amount!)
    );

    return (
        <div className="bg-pink-800 rounded-2xl shadow-lg p-1 w-full flex flex-col text-white hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-start">
                <img
                    src={lottery.imageLogo}
                    alt={lottery.name}
                    className="w-16 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-start ml-2">
                    <h3 className="text-sm font-semibold leading-tight">{lottery.name}</h3>
                    <p className="text-xs mt-1 text-yellow-100">
                        🏆 До: <span className="font-semibold">{maxReward} монет</span>
                    </p>
                </div>
            </div>

            <hr className="border-t border-white/20 my-2" />

            <p className="text-xs text-center">
                🎟️ Вартість: <span className="font-semibold">{lottery.cost} монет</span>
            </p>
        </div>
    );
};
import {FC} from "react";

interface Props {
    lottery: any;
    count?: number;
    from?: string;
}

export const Card: FC<Props> = ({ lottery, count, from }) => {
    const maxReward = Math.max(
        ...lottery.rewardTiers
            .filter((tier: any) => typeof tier.amount === "number")
            .map((tier: any) => tier.amount!)
    );

    return (
        <div className="bg-pink-800 rounded-2xl shadow-lg p-2 w-full flex flex-col text-white hover:scale-[1.03] transition-transform duration-300 relative">
            {/* Лейбли зверху */}
            {(count || from) && (
                <div className="absolute top-1 left-1 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-xl shadow">
                    {from ? `🎁 від: ${from}` : `x${count}`}
                </div>
            )}

            <div className="flex items-center gap-2">
                <img
                    src={lottery.imageLogo}
                    alt={lottery.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                />
                <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-sm font-bold leading-tight">{lottery.name}</h3>
                    <p className="text-xs text-yellow-100 mt-1">
                        🏆 До: <span className="font-semibold">{maxReward} {lottery.type === "coin" ? "coins" : "usdt"}</span>
                    </p>
                    <p className="text-xs text-yellow-200 mt-1">
                        Ціна: {lottery.cost} {lottery.type === "coin" ? "coins" : "usdt"}
                    </p>
                </div>
            </div>
        </div>
    );
};

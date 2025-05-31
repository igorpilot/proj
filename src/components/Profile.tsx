import {FC, useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {LevelProgressBar} from "./LevelProgressBar";

export const Profile: FC = observer(() => {
    const { store } = useContext(Context);
    const user = store.user;

    return (
        <div className="bg-gradient-to-r from-pink-700 to-pink-800 text-white shadow-md p-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img
                    src={user.photoUrl}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full border-2 border-white shadow"
                />
                <div>
                    <h2 className="text-lg font-semibold">{user.firstName}</h2>
                    {/* 🆕 Прогрес левела */}
                    <LevelProgressBar
                        level={user.level}
                        experience={user.experience}
                        xpRequired={store.xpRequired}
                    />
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm">💰 <span className="font-bold">{user.balance}</span> coins</p>
                <p className="text-sm">💰 <span className="font-bold">{user.usdt}</span> USDT</p>
                <p className="text-sm">⚡ +{user.hourlyProfit}/hr</p>
            </div>
        </div>
    );
});
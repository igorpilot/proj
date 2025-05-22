import {FC} from "react";

interface FriendCardProps {
    friend: any;
    index: number;
}
export const FriendCard: FC<FriendCardProps> = ({friend, index}) => {
    return (
        <div key={index}
             className="flex items-center bg-pink-800/50 rounded-lg p-3 hover:bg-pink-700/60 transition-colors">
            <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {friend.photoUrl ? (
                        <img
                            src={friend.photoUrl}
                            alt={friend.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/40';
                                e.currentTarget.alt = 'Фото не знайдено';
                            }}
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-pink-600 flex items-center justify-center text-lg font-bold">
                            {friend.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                    )}
                </div>
                <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-pink-800"></div>
            </div>
            <div className="ml-3 flex-1 text-left">
                <p className="font-medium">{friend.username || `Користувач ${index + 1}`}</p>
                <p className="text-xs opacity-70">Зареєстрований: {new Date(friend.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-yellow-300">{friend.hourlyProfit}</p>
                <p className="text-xs">/hr</p>
            </div>
        </div>
)
}
export const FriendEmpty: FC = () => {
    return (
<div className="text-center py-6 text-pink-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
    </svg>
    <p>У вас поки немає друзів</p>
    <p className="text-sm mt-1">Запросіть друзів та отримуйте бонуси!</p>
</div>)}
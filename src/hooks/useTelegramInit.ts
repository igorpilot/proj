import { useEffect, useState } from 'react';
interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

const useTelegramInit = () => {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            const userData = tg.initDataUnsafe?.user;

            if (userData) {
                setUser(userData);
                localStorage.setItem('tgUser', JSON.stringify(userData));
            }
        }
    }, []);

    return user;
};

export default useTelegramInit;
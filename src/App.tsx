import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Referral from './pages/Referral';
import useTelegramInit from './hooks/useTelegramInit';
import {NavBar} from "./components/Navbar";
import {Profile} from "./components/Profile";
import {TasksList} from "./pages/TasksList";
import {CardsList} from "./pages/CardsList";
import {useCallback, useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {CollectPassiveCoins} from "./components/CollectPassiveCoins";
import {API_URL} from "./store/store";


const App = observer(() => {
    const [showOfflineReward, setShowOfflineReward] = useState(false);
    const [passiveIncome, setPassiveIncome] = useState(0);
    const { store } = useContext(Context);
    const tg = window.Telegram.WebApp as any;

    // Сила відправки даних при закритті
    const sendLogoutData = useCallback(async () => {
        if (!store.user?.telegramId) return;

        console.log("Спроба відправити дані логауту...");

        try {
            // Дублюючий механізм відправки
            const sendWithFetch = async () => {
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: store.user.telegramId,
                        balance: store.user.balance
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    keepalive: true
                });
            };

            // Паралельно пробуємо два методи
            await Promise.race([
                sendWithFetch(),
                new Promise((resolve) => {
                    if (navigator.sendBeacon) {
                        const blob = new Blob(
                            [JSON.stringify({ userInfo: store.user })],
                            { type: 'application/json' }
                        );

                        navigator.sendBeacon(`${API_URL}/logout`, blob);
                        resolve(true);
                    }
                    resolve(false);
                })
            ]);

            console.log("Дані логауту успішно відправлені");
        } catch (error) {
            console.error("Помилка при відправці даних:", error);
        }
    }, [store.user]);

    // Основний ефект для підписки на події
    useEffect(() => {
        // Telegram події
        const handleTelegramClose = () => {
            console.log("Telegram WebApp закривається!");
            sendLogoutData();
        };

        tg.onEvent('viewportChanged', (e:any) => {
            if (e.is_state_stable === false) {
                handleTelegramClose();
            }
        });

        // Стандартні браузерні події
        window.addEventListener('pagehide', sendLogoutData);
        window.addEventListener('beforeunload', sendLogoutData);

        // Додаткова перестраховка - інтервал для збереження даних
        const saveInterval = setInterval(() => {
            if (store.user?.telegramId) {
                localStorage.setItem('last_activity', Date.now().toString());
            }
        }, 30000);

        return () => {
            tg.offEvent('viewportChanged');
            window.removeEventListener('pagehide', sendLogoutData);
            window.removeEventListener('beforeunload', sendLogoutData);
            clearInterval(saveInterval);
        };
    }, [sendLogoutData, tg]);

    // Ініціалізація Telegram
    useTelegramInit();

    useEffect(() => {
        tg.ready();
        const userData = tg.initDataUnsafe?.user;
        const hash = tg.initData;

        if (userData && hash) {
            store.authFromTelegram({
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                username: userData.username,
                photo_url: userData.photo_url,
                hash: hash,
            });
        } else {
            console.warn("⚠️ Дані користувача Telegram не знайдено");
            store.isLoading = false;
        }
    }, []);

    // Інші ефекти залишаємо без змін
    useEffect(() => {
        if (store.isAuth) {
            const fetchPassiveIncome = async () => {
                await store.collectPassiveIncome(store.user.telegramId);
                if (store.passiveProfit > 0) {
                    setPassiveIncome(store.passiveProfit);
                    setShowOfflineReward(true);
                }
            };
            fetchPassiveIncome();
        }
    }, [store.isAuth]);

    useEffect(() => {
        const interval = setInterval(() => {
            store.setUser({
                ...store.user,
                balance: parseFloat((store.user.balance + store.user.hourlyProfit / 360).toFixed(2))
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (store.isLoading) return <div>Loading...</div>;
    if (!store.isAuth) return <div>Not authenticated</div>;

    return (<Router>
            {showOfflineReward && <CollectPassiveCoins passiveIncome={passiveIncome} setShowOfflineReward={setShowOfflineReward}/>}
            <div className="flex flex-col h-screen ">
                <div className="shrink-0">
                    <Profile/>
                </div>
                <div className="flex-1 overflow-y-auto">

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cards" element={<CardsList/>}/>
                        <Route path="/friends" element={<Referral/>}/>
                        <Route path="/earn" element={<TasksList/>}/>
                    </Routes>


                </div>
                <div className="shrink-0">
                    <NavBar/>
                </div>
            </div>
        </Router>
    );
});

export default App;

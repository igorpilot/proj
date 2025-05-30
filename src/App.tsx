import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Referral from './pages/Referral';
import useTelegramInit from './hooks/useTelegramInit';
import {NavBar} from "./components/Navbar";
import {Profile} from "./components/Profile";
import {TasksList} from "./pages/TasksList";
import {CardsList} from "./pages/CardsList";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {CollectPassiveCoins} from "./components/CollectPassiveCoins";
import {API_URL} from "./store/store";
import Loading from "./pages/Loading";


const App = observer(() => {
    const [showOfflineReward, setShowOfflineReward] = useState(false);
    const [passiveIncome, setPassiveIncome] = useState(0);
    const {store} = useContext(Context);
    const tg = window.Telegram.WebApp as any;
    const [initError, setInitError] = useState<string | null>(null);

    useTelegramInit();

    useEffect(() => {
        if (!tg) {
            setInitError("Telegram WebApp not available");
            store.isLoading = false;
            return;
        }
        const initApp = async () => {
            try {
        tg.ready();
        tg.expand();
        const userData = tg.initDataUnsafe.user;
        console.log(userData);
        const hash = tg.initData;

//if (userData && hash) {
        if (userData) {
            await store.authFromTelegram({
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                username: userData.username,
                photo_url: userData.photo_url,
                hash: hash,
            });
        } else {
            console.warn("⚠️ Дані користувача Telegram не знайдено");
        }
            } catch (e) {
                console.error("Initialization error:", e);
                setInitError("Failed to initialize");
                store.isLoading = false;
            }}

            initApp();
    }, []);

    // Інші ефекти залишаємо без змін
    useEffect(() => {
        if (store.isAuth && store.user.telegramId) {
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
        const syncInterval = setInterval(() => {
            if (store.isAuth) {
                store.updateUser(store.user)
                    .then(() => console.log("✅ Баланс синхронізовано"))
                    .catch(err => console.error("❌ Помилка синхронізації:", err));
            }
        }, 10000);

        return () => clearInterval(syncInterval);
    }, []);
    useEffect(() => {
            const interval = setInterval(() => {
                if (store.isAuth) {
                store.setUser({
                    ...store.user,
                    balance: parseFloat((store.user.balance + store.user.hourlyProfit / 3600).toFixed(2))
                }); }
            }, 1000);
            return () => clearInterval(interval);

    }, []);
    if (initError) {
        return <div className="p-4 text-red-500 text-center">{initError}</div>;
    }
    if (store.isLoading) return <Loading/>;
    if (!store.isAuth) return <div>Not authenticated</div>;
    return (<Router>
            {showOfflineReward &&
                <CollectPassiveCoins passiveIncome={passiveIncome} setShowOfflineReward={setShowOfflineReward}/>}
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

import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {IUser} from "../models/IUser";


export const API_URL = 'https://telegramback-4wjh.onrender.com/api'
//http://localhost:5000/api
export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = true;
    passiveProfit = 0

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
        this.isAuth = true;
    }
    setPassiveProfit(number: number) {
        this.passiveProfit = number;
    }

    async authFromTelegram(telegramUser: any) {
        try {
            const res = await axios.post(`${API_URL}/telegram-auth`, telegramUser);

            runInAction(() => {
                this.setUser(res.data);
            });
        } catch (e) {
            console.error("❌ Auth error:", e);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
    async claimCoins(userId: string, actuallyBalance: number) {
        try {
            const res =await axios.post(`${API_URL}/claim-coins`, {userId, actuallyBalance});
            this.setUser(res.data);

        } catch (e) {
            console.error(e);

        }
    }
    async dailyReward(userId: string, actuallyBalance: number) {
        try {
            const res = await axios.post(`${API_URL}/dailyReward`, {userId, actuallyBalance});
            this.setUser(res.data);
        } catch (e) {
            console.error(e);
        }
    }
    async collectPassiveIncome(userId: string) {
        try {
            const res =await axios.post(`${API_URL}/collectPassiveIncome`, {userId});
            console.log("📥 Сервер повернув:", res.data);
            this.setUser({...this.user, balance:res.data.balance});
            this.setPassiveProfit(res.data.passiveProfit);
        } catch (e) {
            console.error(e);

        }
    }
}

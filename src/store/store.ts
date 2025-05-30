import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IUser} from "../models/IUser";
import {ITask} from "../models/ITask";


export const API_URL = 'https://telegramback-4wjh.onrender.com/api'
const $api = axios.create({
        baseURL: API_URL,
        withCredentials: true
    }
)
//"http://localhost:5000/api"
//'https://telegramback-4wjh.onrender.com/api'

export default class Store {
    user = {} as IUser;
    friends = [] as IUser[];
    tasks = [] as ITask[];
    isAuth = false;
    isLoading = true;
    passiveProfit = 0

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: Partial<IUser>) {
        this.user = {...this.user, ...user};
        this.isAuth = true;
    }

    setFriends(friends: IUser[]) {
        this.friends = friends;
    }

    setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }

    setPassiveProfit(number: number) {
        this.passiveProfit = number;
    }

    async authFromTelegram(telegramUser: any) {
        try {
            const res = await $api.post(`/telegram-auth`, telegramUser);
            this.setUser(res.data);
            this.getFriends(res.data.telegramId);
            this.getTasks()
        } catch (e) {
            console.error("❌ Auth error:", e);
        } finally {
            this.isLoading = false;
        }
    }

    async updateUser(userInfo: IUser) {
        try {
            const res = await $api.put(`/update`, {userInfo});
        } catch (e) {
            console.error("updateUser", e);
        }
    }

    async getFriends(telegramId: any) {
        try {
            const res = await $api.get(`/friends/${telegramId}`,);
            this.setFriends(res.data);

        } catch (e) {
            console.error(e);

        }
    }

    async getTasks() {
        try {
            const res = await $api.get(`/tasks`);
            this.setTasks(res.data);

        } catch (e) {
            console.error(e);

        }
    }

    async claimCoins(userInfo: any) {
        try {
            const res = await $api.post(`/claim-coins`, {userInfo});
            this.setUser(res.data);

        } catch (e) {
            console.error(e);

        }
    }

    async dailyReward(userId: string, actuallyBalance: number) {
        try {
            const res = await $api.post(`/dailyReward`, {userId, actuallyBalance});
            this.setUser(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    async collectPassiveIncome(userId: string) {
        try {
            const res = await $api.post(`/collectPassiveIncome`, {userId});
            this.setUser({balance: res.data.balance});
            this.setPassiveProfit(res.data.passiveProfit);
        } catch (e) {
            console.error(e);

        }
    }

    async postTask(task: ITask) {
        try {
            const res = await $api.post(`/task`, {task});
            console.log(res.data);

        } catch (e) {
            console.error(e);
        }
    }

    async checkTask(task: ITask) {
        try {
            const res = await $api.post(`/checkTask/${this.user.telegramId}`, {task});

            this.setUser(res.data.user);
        } catch (e) {
            console.error(e);
        }
    }

    async useTicket(lottery:any) {
        try {
            const res = await $api.post(`/useTicket/${this.user.telegramId}`, {lottery});
            this.setUser(res.data.user);
        } catch (e) {
            console.error(e)
        }

    }
}

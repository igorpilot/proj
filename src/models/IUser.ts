
export interface IUser {
    telegramId: string
    username: string
    firstName: string
    lastName: string
    photoUrl: string
    balance: number
    hourlyProfit: number
    usdt: number
    friends: string[]
    completedTasks: string[]
    level: number
    experience: number
    lastActiveAt: any
    consecutiveLoginDays: number
    ticketsUsedToday: number
    lastTicketUseDate: any
    lastClaim: any,
    lastDailyReward: any
    history: any[]
    referralFrom: string | null
    createdAt: any
    updatedAt:any
    lotteries: {
        purchased: string[],
        received: {
            id: string;
            from: string;
            date: Date;
            giftId: string,
            used: boolean
        }[]
    }
}
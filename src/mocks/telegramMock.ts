declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void;
                initDataUnsafe?: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                    };
                };
            };
        };
    }
}
export {}
export const setupTelegramMock = () => {
    if (!window.Telegram) {
        window.Telegram = {
            WebApp: {
                ready: () => console.log("Telegram WebApp mock ready"),
                initDataUnsafe: {
                    user: {
                        id: 999999,
                        first_name: "Local",
                        last_name: "Dev",
                        username: "localdev",
                        language_code: "en",
                    },
                },
            },
        };
    }
};

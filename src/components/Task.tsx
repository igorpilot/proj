import {FC} from "react";

type TaskProps = {
    task: {
        id: number;
        title: string;
        description: string;
        reward: number;
        completed: boolean;
    };
};

export const Task: FC<TaskProps> = ({ task }) => {
    return (
        <div className={`bg-pink-800 text-white rounded-2xl p-4 shadow-lg w-full flex flex-col gap-2 transition-all ${task.completed ? 'opacity-50' : 'hover:scale-105'}`}>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm text-pink-200">{task.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-yellow-300 font-semibold">💰 {task.reward} coins</span>
                <button
                    className={`px-4 py-1 rounded-xl text-sm ${
                        task.completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300 text-pink-900'
                    }`}
                    disabled={task.completed}
                >
                    {task.completed ? 'Completed' : 'Claim'}
                </button>
            </div>
        </div>
    );
};
import {FC, useContext} from "react";
import {Context} from "../index";
import {ITask} from "../models/ITask";
import {observer} from "mobx-react-lite";

type TaskProps = {
    task: ITask
};

export const Task: FC<TaskProps> = observer(({ task}) => {
    const {store}=useContext(Context)
    const completed = store.user.completedTasks.includes(task.id);
    const onClick = () => {
      store.checkTask(task)
    }

    return (
        <div className={`bg-pink-800 text-white rounded-2xl p-4 shadow-lg w-full flex flex-col gap-2 transition-all ${completed ? 'opacity-50' : 'hover:scale-105'}`}>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm text-pink-200">{task.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-yellow-300 font-semibold">💰{task.reward} coins +{task.experience}XP</span>
                {!completed && task.type === "tickets" && <span className="text-yellow-300 font-semibold"> {store.user.ticketsUsedToday}/{task.number}</span>}
                {!completed && task.type === "friends" && <span className="text-yellow-300 font-semibold"> {store.user.friends.length}/{task.number}</span>}
                {!completed && task.type === "login" && <span className="text-yellow-300 font-semibold"> {store.user.consecutiveLoginDays}/{task.number}</span>}
                <button
                    className={`px-4 py-1 rounded-xl text-sm ${
                        completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300 text-pink-900'
                    }`}
                    disabled={completed}
                    onClick={onClick}
                >
                    {completed ? 'Completed' : 'Claim'}
                </button>
            </div>
        </div>
    );
});
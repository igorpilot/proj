import { FC } from "react";
import {ITask} from "../models/ITask";

interface Props {
    task: ITask;
    type: string;
    onClick: () => void;
}

export const TaskDeckPreview: FC<Props> = ({ task, type, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer h-40 w-full max-w-md mx-auto"
        >
            {/* Background cards that simulate a deck */}
            <div className="absolute top-0 left-0 w-full h-full transform rotate-[-4deg] translate-x-2 translate-y-1 bg-pink-600 rounded-2xl shadow-lg opacity-80" />
            <div className="absolute top-0 left-0 w-full h-full transform rotate-[0deg] translate-x-1 translate-y-0.5 bg-pink-700 rounded-2xl shadow-lg opacity-90" />
            <div className="absolute top-0 left-0 w-full h-full transform rotate-[3deg] -translate-x-1 bg-pink-800 rounded-2xl shadow-lg" />

            {/* Main card */}
            <div className="relative flex flex-col justify-between bg-pink-900 text-white rounded-2xl p-4 shadow-xl z-10 h-full border-2 border-pink-500/30 hover:border-pink-400/50 transition-all">
                <div>
                    <h3 className="text-lg font-bold line-clamp-1">{task.title}</h3>
                    <p className="text-sm text-pink-200 line-clamp-2 mt-1">{task.description}</p>
                </div>
                <div>
                    <div className="mt-2 text-yellow-300 font-semibold flex items-center">
                        💰
                        {task.reward} coins
                    </div>
                    <div className="text-xs text-right text-pink-300 capitalize mt-1 font-medium">
                        {type} tasks
                    </div>
                </div>
            </div>
        </div>
    );
};

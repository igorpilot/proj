import {FC} from "react";
import { Task } from "../components/Task";
const mockTasks = [
    {
        id: 1,
        title: "Invite a Friend",
        description: "Get rewarded for each new friend you invite!",
        reward: 50,
        completed: false,
    },
    {
        id: 2,
        title: "Scratch 3 Tickets",
        description: "Try your luck by scratching 3 tickets today.",
        reward: 30,
        completed: true,
    },
    {
        id: 3,
        title: "Login 5 Days in a Row",
        description: "Stay active and earn daily rewards.",
        reward: 100,
        completed: false,
    },
];
export const TasksList: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 p-6">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">🧩Tasks</h2>
            <div className="flex flex-col gap-4">
                {mockTasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};
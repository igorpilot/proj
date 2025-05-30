import {FC, useContext, useState} from "react";
import { Task } from "../components/Task";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ITask} from "../models/ITask";
import {TaskDeckPreview} from "../components/TaskDeckPreview";
import { motion } from "framer-motion";
const tasks = [
    {
        id: 1,
        type: "friends",
        number: 1,
        title: "Invite 1 Friend",
        description: "Invite your first friend and earn your first bonus!",
        reward: 50
    },
    {
        id: 13,
        type: "friends",
        number: 3,
        title: "Invite 3 Friends",
        description: "Bring more friends into the game and earn bigger rewards.",
        reward: 500
    },
    {
        id: 15,
        type: "friends",
        number: 5,
        title: "Invite 5 Friends",
        description: "The more friends, the merrier. Keep inviting!",
        reward: 1000
    },
    {
        id: 110,
        type: "friends",
        number: 10,
        title: "Invite 10 Friends",
        description: "You're building a team! Invite 10 friends.",
        reward: 10000
    },
    {
        id: 115,
        type: "friends",
        number: 15,
        title: "Invite 15 Friends",
        description: "You’re unstoppable! Keep inviting more people.",
        reward: 20000
    },
    {
        id: 120,
        type: "friends",
        number: 20,
        title: "Invite 20 Friends",
        description: "Legendary inviter status achieved. Enjoy your reward!",
        reward: 50000,
    },
    {
        id: 23,
        type: "tickets",
        number: 3,
        title: "Scratch 3 Tickets",
        description: "Try your luck and scratch 3 tickets today.",
        reward: 100,
    },
    {
        id: 210,
        type: "tickets",
        number: 10,
        title: "Scratch 10 Tickets",
        description: "You’re on fire! Scratch 10 tickets to earn more.",
        reward: 1000,
    },
    {
        id: 35,
        type: "login",
        number: 5,
        title: "Login 5 Days in a Row",
        description: "Keep coming back and enjoy the rewards.",
        reward: 5000,
    },
    {
        id: 36,
        type: "login",
        number: 10,
        title: "Login 10 Days in a Row",
        description: "Daily dedication pays off! 10 days, 1 reward.",
        reward: 10000,
    }
];
export const TasksList: FC = observer(() => {
    const { store } = useContext(Context);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const groupedTasks = store.tasks.reduce((groups: Record<string, ITask[]>, task) => {
        if (!groups[task.type]) groups[task.type] = [];
        groups[task.type].push(task);
        return groups;
    }, {});

    const handleSelectType = (type: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setSelectedType(type);
            setIsTransitioning(false);
        }, 300);
    };

    const handleBackClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setSelectedType(null);
            setIsTransitioning(false);
        }, 300);
    };

    const sortedAndFilteredTasks = (tasks: ITask[]) => {
        const completed = store.user.completedTasks;
        return [...tasks].sort((a, b) => {
            const aCompleted = completed.includes(a.id);
            const bCompleted = completed.includes(b.id);
            if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
            return a.reward - b.reward;
        });
    };

    const getPreviewTask = (tasks: ITask[]) => {
        const uncompletedTasks = tasks.filter(task => !store.user.completedTasks.includes(task.id));
        const sorted = [...uncompletedTasks].sort((a, b) => a.reward - b.reward);

        const fallback = [...tasks].sort((a, b) => a.reward - b.reward)[0];
        const task = sorted[0] || fallback;

        return {
            ...task,
            title: task.title.length > 20
                ? task.title.substring(0, 17) + '...'
                : task.title,
            description: task.description.length > 60
                ? task.description.substring(0, 57) + '...'
                : task.description,
            reward: task.reward
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-900 to-purple-900 p-6 pb-24">
            <h2 className="text-white text-3xl font-bold mb-8 text-center relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                    🧩 Task Collection
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-pink-400 rounded-full opacity-70"></div>
            </h2>

            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {!selectedType ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {Object.entries(groupedTasks).map(([type, tasks]) => {
                            const previewTask = getPreviewTask(tasks);
                            return (
                                <div
                                    key={type}
                                    className="relative hover:scale-[1.02] transition-transform duration-200"
                                    onClick={() => handleSelectType(type)}
                                >
                                    <div className="absolute -inset-1 bg-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>
                                    <TaskDeckPreview
                                        task={previewTask}
                                        type={type}
                                        onClick={() => handleSelectType(type)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <button
                            onClick={handleBackClick}
                            className="flex items-center text-pink-200 hover:text-white mb-6 group transition-colors"
                        >
                            <svg
                                className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-lg font-medium">All Categories</span>
                        </button>

                        <div className="bg-gradient-to-r from-pink-800/30 to-purple-800/30 rounded-2xl p-3 backdrop-blur-sm border border-pink-700/50 mb-4">
                            <h3 className="text-2xl text-white font-bold mb-1 capitalize flex items-center">
                                <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
                                    {selectedType} Tasks
                                </span>
                                <span className="ml-2 text-sm bg-pink-700/50 text-pink-100 px-2 py-1 rounded-full">
                                    {groupedTasks[selectedType].length} tasks
                                </span>
                            </h3>
                            <p className="text-pink-200">Complete tasks to earn rewards and level up!</p>
                        </div>

                        <div className="space-y-4">
                            {sortedAndFilteredTasks(groupedTasks[selectedType]).map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-900/90 to-transparent pointer-events-none"></div>
        </div>
    );
});
import React from "react";

interface LevelProgressBarProps {
    level: number;
    experience: number;
    xpRequired: number;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ level, experience, xpRequired }) => {
    const progress = Math.min((experience / xpRequired) * 100, 100);

    return (
        <div className="w-full mt-1">
            <div className="text-xs text-yellow-100 mb-1">
                Level {level} – {experience}/{xpRequired} XP
            </div>
            <div className="w-full h-3 bg-yellow-100/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

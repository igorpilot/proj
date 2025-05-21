import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-900 to-pink-950">
            <img
                src="/coin.png"
                alt="Loading Coin"
                className="w-48 h-48 animate-spinY [transform-style:preserve-3d]"
            />
            <div className="mt-4 text-xl font-bold text-yellow-600">Loading...</div>
        </div>
    );
};

export default Loading;
import React, { useRef, useEffect, useState } from "react";

interface ScratchCardProps {
    coverImage: string;
    numbers: number[];
    winNumbers: number[];
    bgColor?: string;
    onScratchComplete?: () => void;
}

export const ScratchCardGame: React.FC<ScratchCardProps> = ({
                                                                coverImage,
                                                                numbers = [],
                                                                winNumbers = [],
                                                                bgColor = "#FFD700",
                                                                onScratchComplete,
                                                            }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const revealedRef = useRef(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // <-- обов'язково
        setIsDrawing(true);
        document.body.style.overflow = 'hidden'; // Заборона scroll
    };
    const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // <-- обов'язково
        setIsDrawing(false);
        document.body.style.overflow = ''; // Відновити scroll
    };
    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        checkScratchProgress();
    };

    const checkScratchProgress = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] === 0) transparent++;
        }

        const percent = (transparent / (data.length / 4)) * 100;
        if (percent > 50 && !revealedRef.current) {
            revealedRef.current = true;
            setTimeout(() => onScratchComplete?.(), 300);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        // Встановлюємо фізичні пікселі канвасу відповідно до реального розміру
        canvas.width = rect.width;
        canvas.height = rect.height;

        const img = new Image();
        img.src = coverImage;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setImageLoaded(true);
        };
    }, [coverImage]);

    return (
        <div className="relative w-full h-full flex flex-col px-4 py-6">
            {/* Заголовок з виграшними числами */}
            <div className="mb-4 text-center text-lg font-medium text-black">
                🎯 Шукай ці числа:{" "}
                <span className="font-bold text-red-600">
        {winNumbers.join(", ") || "Немає"}
      </span>
            </div>

            {/* Контейнер для scratch-карти */}
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
                {/* Контент з числами */}
                {imageLoaded ? (
                    <div
                        className="absolute top-0 left-0 w-full h-full grid grid-cols-3 gap-2 p-4 items-center justify-center"
                        style={{ backgroundColor: bgColor }}
                    >
                        {numbers.map((num, index) => (
                            <div
                                key={index}
                                className={`aspect-square flex items-center justify-center rounded-full text-white font-bold text-xl shadow ${
                                    winNumbers.includes(num) ? "bg-green-600" : "bg-gray-800"
                                }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-black text-lg font-semibold">
                        Завантаження...
                    </div>
                )}

                {/* Canvas для стирання */}
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    className="absolute top-0 left-0 w-full h-full touch-none"
                    onMouseDown={handleStart}
                    onMouseUp={handleEnd}
                    onMouseMove={handleMove}
                    onTouchStart={handleStart}
                    onTouchEnd={handleEnd}
                    onTouchMove={handleMove}
                />
            </div>
        </div>
    );
};

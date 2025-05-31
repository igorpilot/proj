import {FC} from "react";

export const Badge: FC<{ count: number }> = ({ count }) => (
    count > 0 ? (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {count}
        </span>
    ) : null
);

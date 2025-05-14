import {FC} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PaidIcon from '@mui/icons-material/Paid';



export const NavBar: FC = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Main', icon: <HomeIcon fontSize="medium" />, path: '/' },
        { label: 'Lottery', icon: <ConfirmationNumberIcon fontSize="medium" />, path: '/cards' },
        { label: 'Friends', icon: <Diversity3Icon fontSize="medium" />, path: '/friends' },
        { label: 'Earn', icon: <PaidIcon fontSize="medium" />, path: '/earn' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-700 to-pink-800 text-white shadow-lg z-50">
            <div className="flex justify-around items-center h-16 px-4">
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-200"
                    >
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
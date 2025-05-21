/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                swing: {
                    '0%, 100%': { transform: 'rotate(-15deg)' },
                    '50%': { transform: 'rotate(15deg)' },
                },
                spinY: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '50%': { transform: 'rotateY(180deg)' },
                    '100%': { transform: 'rotateY(0deg)' },
                },
            },
            animation: {
                swing: 'swing 1s infinite ease-in-out',
                spinY: 'spinY 3s infinite ease-in-out',
            },
        },
    },
    plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "venture-green": "#00A987",
                "venture-black": "#000000",
                "venture-gray": "#EBEBEB",
                "venture-white": "#FFFFFF",
                "venture-darkgray": "#979797",
                "venture-red": "#FF0000",
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        9998: 9998,
      },
      colors: {
        "venture-green": "#00A987",
        "venture-green-hovered": "#06C9A2",
        "venture-black": "#000000",
        "venture-gray": "#EBEBEB",
        "venture-white": "#FFFFFF",
        "venture-darkgray": "#979797",
        "venture-red": "#FF0000",
        "venture-red-hovered": "#FF3700",
      },
      backgroundImage: {
        KayakHomeHeader: "url(/src/assets/images/KayakHomeHeader.png)",
        TripHeader: "url(/src/assets/images/TripHeader.png)",
        nycMini: "url(/src/assets/images/nycMini.png)",
        MailBox: "url(/src/assets/images/Mailbox.jpg)",
        BgAboutUs: "url(/src/assets/images/BgAboutUs.png)",
        Avatar: "url(/src/assets/images/Avatar.png)",
      },
    },
  },
  plugins: [],
};

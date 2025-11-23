import localFont from "next/font/local";
import {Barlow} from "next/font/google";

export const oughter = localFont({
    src: [
        {
            path: "../../public/fonts/Oughter.otf",
            weight: "400",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-oughter",
});

export const barlow = Barlow({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-barlow",
    weight: ["300", "400", "500", "600", "700"]
});

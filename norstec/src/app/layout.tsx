import type { Metadata } from "next";
import "../styles/globals.css"
import React from "react";
import { oughter, barlow } from "@/assets/fonts"
import Navbar from "@/components/static/Navbar/Navbar";

export const metadata: Metadata = {
    icons: {
        icon: [
            { url: "/images/NORSTEC.png", sizes: "32x32", type: "image/png" },
            { url: "/images/NORSTECVECTOR.svg", type: "image/svg+xml" },
        ],
        apple: "/images/NORSTECIOS.png",
    },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${oughter.variable} ${barlow.variable}`}>
        <head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
            />
            <link
                rel="stylesheet"
                href="https://sibforms.com/forms/end-form/build/sib-styles.css"
            />
            <title>NORSTEC</title>
        </head>
        <body>
            <Navbar />
            {children}
        </body>
        </html>
    );
}
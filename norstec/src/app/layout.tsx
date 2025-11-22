import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NORSTEC",
    description: "NORSTEC website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
                />
                <title>NORSTEC</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
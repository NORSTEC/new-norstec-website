"use client";

import type { HomePage } from "@/app/types/pages/homePage";
import Hero from "@/app/components/Hero";
import "./globals.css";


interface ClientHomePageProps {
    data: HomePage;
}

export default function ClientHomePage({ data }: ClientHomePageProps) {
    if (!data) {
        return <p>Failed to load homepage.</p>;
    }
    return (
        <>
            <Hero />
            <main>
            </main>
        </>
    );
}

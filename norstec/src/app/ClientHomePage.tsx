"use client";

import type {
    HomePage,
} from "@/app/types/pages/homePage";


interface ClientHomePageProps {
    data: HomePage;
}

export default function ClientHomePage({ data }: ClientHomePageProps) {
    if (!data) {
        return <p>Failed to load homepage.</p>;
    }
    return (
        <main>
        </main>
    );
}

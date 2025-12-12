"use client";

import { AboutPage } from "@/types/pages/aboutPage";

interface AboutPageProps {
    page: AboutPage;
}

export default function ClientAboutPage({ page }: AboutPageProps) {
    return (
        <main>
            {page.sections.map((section) => (
                <div key={section._id}>
                    {section._type}
                </div>
            ))}
        </main>
    );
}

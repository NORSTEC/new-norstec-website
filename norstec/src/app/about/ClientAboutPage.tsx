"use client";

import { AboutPage } from "@/app/types/pages/aboutPage";

interface AboutPageProps {
    page: AboutPage;
}

export default function AboutPageClient({ page }: AboutPageProps) {
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

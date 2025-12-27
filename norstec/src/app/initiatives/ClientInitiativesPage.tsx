"use client";

import type { InitiativesPage } from "@/types/pages/initiativesPage";
import SectionInitiatives from "@/components/sections/SectionInitiatives";

interface ClientInitiativesPageProps {
    data: InitiativesPage;
}

function renderInitiativesSection(section: InitiativesPage["sections"][number]) {
    switch (section._type) {
        case "sectionInitiatives":
            return <SectionInitiatives key={section._id} section={section} />;
        default:
            return null;
    }
}

export default function ClientInitiativesPage({ data }: ClientInitiativesPageProps) {
    const sections = data.sections ?? [];

    if (!sections.length) {
        return <main className="mobile-container py-16">No initiatives content published yet.</main>;
    }

    return (
        <main>
            {sections.map((section) => renderInitiativesSection(section))}
        </main>
    );
}

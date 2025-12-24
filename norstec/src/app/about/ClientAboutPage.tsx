"use client";

import { AboutPage } from "@/types/pages/aboutPage";
import SectionBarList from "@/components/sections/SectionBarList";

interface AboutPageProps {
    page: AboutPage;
}

export default function ClientAboutPage({ page }: AboutPageProps) {
    return (
        <main>
            {page.sections.map((section) => {
                if (section._type === "sectionBarList") {
                    return (
                        <SectionBarList
                            key={section._id}
                            section={section}
                        />
                    );
                }

                return null;
            })}
        </main>
    );
}

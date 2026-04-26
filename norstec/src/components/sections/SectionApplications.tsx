"use client";

import {ApplicationCard} from "@/app/join/JoinCard";
import {SectionApplications} from "@/types/sections/sectionApplication";
import {Application} from "@/types/application/application";
import StripesVertical from "@/components/items/stripes/StripesVertical";

type Props = {
    section: SectionApplications;
    className?: string;
};


export default function SectionApplication({
                                                section,
                                                className = "",
                                            }: Props) {
    const title = section.title?.trim();
    const safeApplications = (section.applications ?? []).filter(
        (application): application is Application =>
            Boolean(application && application._id)
    );

    return (
        <section className={`section ${className}`}>
            <StripesVertical side={"right"} />
            <div className="desktop-container">
                <div className="relative z-10 w-full xl:h-[calc(100vh-10rem)] xl:flex xl:flex-col">
                    {title ? (
                        <h2 className="mb-8 text-h2 uppercase">
                            {title}
                            <span aria-hidden className="star-inline" />
                        </h2>
                    ) : null}

                    <div className="xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
                        <div
                            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-30 sm:gap-5 xl:gap-0">
                            {safeApplications.map((application) => (
                                <ApplicationCard
                                    key={application._id}
                                    application={application}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

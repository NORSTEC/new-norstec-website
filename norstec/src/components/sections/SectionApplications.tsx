"use client";

import {ApplicationCard} from "@/app/join/JoinCard";
import {SectionApplications} from "@/types/sections/sectionApplication";
import ChemtrailsRight from "../items/stripes/chemtrails/ChemtrailsRight";
import {Application} from "@/types/application/application";

type Props = {
    section: SectionApplications;
    className?: string;
};


export default function SectionApplication({
                                                section,
                                                className = "",
                                            }: Props) {
    const safeApplications = (section.applications ?? []).filter(
        (application): application is Application =>
            Boolean(application && application._id)
    );


    const chunked = safeApplications.reduce<typeof safeApplications[]>(
        (acc, _, i) =>
            i % 4 === 0 ? [...acc, safeApplications.slice(i, i + 4)] : acc,
        []
    );

    return (
        <>
            {chunked.map((group, index) => (
                <section key={index} className={`section  ${className}`}>
                  <ChemtrailsRight />
                    <div className="mobile-container flex-1 flex items-center justify-center">
                        <div
                            className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-30 sm:gap-5 xl:gap-0">

                            {group.map((application) => (
                                <ApplicationCard
                                    key={application._id}
                                    application={application}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}

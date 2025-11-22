import type { SectionTable as SectionTableType } from "@/app/types/sections/sectionTable";
import StripesVertical from "@/app/components/items/StripesVertical";
import Table from "@/app/components/items/Table";

type SectionTableProps = {
    section: SectionTableType;
};

export default function SectionTable({ section }: SectionTableProps) {
    const { title, columns, rows } = section;

    return (
        <section className="relative min-h-screen flex flex-col xl:h-screen snap-start">
            <StripesVertical
                className="hidden md:flex pr-[7vw] 3xl:pr-[15rem]"
                side="right"
            />

            <div className="bg-egg md:py-10 flex justify-end">
                <h2 className="text-h2 md:w-[40rem] lg:w-[45rem] 2xl:w-[60rem] italic">
                    {title}
                </h2>
            </div>
            <div className="hidden lg:flex px-[20px] md:px-[40px] lg:mr-[24vw] relative z-10 flex-1 pb-10">
                <Table columns={columns} rows={rows} />
            </div>
        </section>
    );
}
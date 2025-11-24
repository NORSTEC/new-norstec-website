import type { SectionTable as SectionTableType } from "@/types/sections/sectionTable";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import Table from "@/components/items/table/Table";
import CollapsibleList from "@/components/items/table/CollapsibleList";

type SectionTableProps = {
    section: SectionTableType;
};

export default function SectionTable({ section }: SectionTableProps) {
    const { title, columns, rows } = section;

    return (
        <section className="flex flex-col section">
            <StripesVertical
                className="flex pr-[7vw] 3xl:pr-[15rem]"
                side="right"
            />

            <div className="bg-egg md:py-10 flex justify-end">
                <h2 className="text-h2 md:w-[40rem] lg:w-[45rem] 2xl:w-[60rem] italic">
                    {title}
                </h2>
            </div>
            <div className="hidden lg:flex px-[20px] md:px-[40px] lg:mr-[24vw] 2xl:mr-[35rem] 3xl:mr-[40rem] relative z-10 flex-1 pb-10">
                <Table columns={columns} rows={rows} />
            </div>
            <div className="lg:hidden mr-[24vw] md:px-[40px]">
                <CollapsibleList columns={columns} rows={rows} />
            </div>
        </section>
    );
}
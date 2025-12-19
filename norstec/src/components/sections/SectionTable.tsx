import type { SectionTable as SectionTableType } from "@/types/sections/sectionTable";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import Table from "@/components/items/table/Table";
import CollapsibleList from "@/components/items/table/CollapsibleList";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";

type SectionTableProps = {
    section: SectionTableType;
};

export default function SectionTable({ section }: SectionTableProps) {
    const { title, columns, rows } = section;

    return (
        <section className="flex flex-col justify-between section stripes-right">
            <StripesCornerBottomRight />

            <div>
                <h2 className="text-h2 italic">
                    {title}
                </h2>
            </div>
            <div className="hidden lg:flex">
                <Table columns={columns} rows={rows} />
            </div>
            <div className="lg:hidden">
                <CollapsibleList columns={columns} rows={rows} />
            </div>
        </section>
    );
}
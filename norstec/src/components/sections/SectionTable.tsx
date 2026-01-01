import type { SectionTable as SectionTableType } from "@/types/sections/sectionTable";
import Table from "@/components/items/table/Table";
import CollapsibleList from "@/components/items/table/CollapsibleList";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";
import StripesCornerTopRight from "@/components/items/stripes/StripesCornerTopRight";

type SectionTableProps = {
  section: SectionTableType;
  className?: string;
};

export default function SectionTable({ section, className = "" }: SectionTableProps) {
  const {
    title,
    columns,
    rows,
    showStripesCornerBottomRight = true,
    showStripesCornerTopRight = true,
  } = section;

  return (
    <section className={`flex flex-col gap-5 lg:gap-20 section mobile-container stripes-right ${className}`}>
      {showStripesCornerBottomRight && <StripesCornerBottomRight startDelay={0.5} />}
      {showStripesCornerTopRight && <StripesCornerTopRight />}

      <div>
        <h2 className="text-h2 uppercase">
          {title}
          <span aria-hidden className="star-inline" />
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

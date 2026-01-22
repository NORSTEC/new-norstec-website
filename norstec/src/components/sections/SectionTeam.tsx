import { PortableText } from "next-sanity";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import StripesCornerTopRight from "@/components/items/stripes/StripesCornerTopRight";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";
import TeamMemberCard from "@/components/items/team/TeamMemberCard";
import TeamCarousel from "@/components/items/team/TeamCarousel";
import { SectionTeam as SectionTeamType } from "@/types/sections/sectionTeam";

export default function SectionTeam({
  section,
  className = "",
}: {
  section: SectionTeamType;
  className?: string;
}) {
  const {
    members = [],
    showStripesCornerBottomRight = true,
    showStripesCornerTopRight = true,
    mobileGrid = false,
  } = section;

  const hasDesktopCarousel = members.length > 3;
  const mobileCarousel = !mobileGrid && members.length > 0;
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10";
  const contentClass = `${hasDesktopCarousel ? "" : "stripes-right py-0!"} flex flex-col gap-8 lg:gap-12`;
  const headingClass = hasDesktopCarousel ? "stripes-right py-0!" : "";

  return (
    <section className={`relative section mobile-container xl:px-0! ${className}`}>
      {showStripesCornerBottomRight && <StripesCornerBottomRight startDelay={0.5} />}
      {showStripesCornerTopRight && <StripesCornerTopRight />}
      <div className={contentClass}>
        <div className={headingClass}>
          {section.title ? (
            <h2 className="text-h2 uppercase">
              {section.title}
              <span aria-hidden className="star-inline" />
            </h2>
          ) : null}

          {section.body ? (
            <PortableText
              value={section.body}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-[1rem] last:mb-0">{children}</p>,
                },
              }}
            />
          ) : null}
        </div>

        {members.length ? (
          <>
            {/* Mobile */}
            {mobileCarousel ? (
              <div className="sm:hidden -mx-[1rem]" style={{ width: "calc(100% + 2rem)" }}>
                <TeamCarousel members={members} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:hidden">
                {members.map((entry) => (
                  <TeamMemberCard key={entry._key} entry={entry} variant="grid" />
                ))}
              </div>
            )}

            {/* Tablet/desktop grid until xl */}
            <div className={`hidden sm:grid ${gridClass} lg:pl-[5rem] lg:pr-[20rem] xl:pr-[22rem] 3xl:pr-[35rem] xl:px-0! ${hasDesktopCarousel ? "xl:hidden" : ""}`}>
              {members.map((entry) => (
                <TeamMemberCard key={entry._key} entry={entry} variant="grid" />
              ))}
            </div>

            {/* Large desktop carousel */}
            {hasDesktopCarousel ? (
              <div className="hidden xl:block">
                <TeamCarousel members={members} />
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-moody/60">No team members published yet.</p>
        )}
      </div>
    </section>
  );
}

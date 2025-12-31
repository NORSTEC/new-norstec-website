import { PortableText } from "next-sanity";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import TeamMemberCard from "@/components/items/team/TeamMemberCard";
import { SectionTeam as SectionTeamType } from "@/types/sections/sectionTeam";

export default function SectionTeam({ section }: { section: SectionTeamType }) {
  const members = section.members ?? [];

  return (
    <section className="relative section h-auto! mobile-container lg:px-0!">
      <StripesVertical side="right" />
      <div className="stripes-right py-0! flex flex-col gap-8 lg:gap-12">
        <div className="max-w-4xl space-y-3 lg:space-y-4">
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
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((entry) => (
              <TeamMemberCard key={entry._key} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="text-moody/60">No team members published yet.</p>
        )}
      </div>
    </section>
  );
}

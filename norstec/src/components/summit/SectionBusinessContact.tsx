import { PortableText } from "next-sanity";
import TeamMemberCard from "@/components/items/team/TeamMemberCard";
import type { SectionBusinessContact } from "@/types/sections/summit/sectionBusinessContact";

type Props = {
  section: SectionBusinessContact;
  className?: string;
};

export default function SectionBusinessContact({ section, className = "" }: Props) {
  const { title, body, buttonHref, buttonLabel, members = [] } = section;

  const showCta = Boolean(buttonHref && buttonLabel);
  const isExternal = (buttonHref ?? "").startsWith("http");

  return (
    <section className={`section desktop-container ${className}`}>
      <div className="flex flex-col">
        {title ? (
          <h2 className="text-h2 uppercase pb-2">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
        ) : null}

        <div className="pb-5">
          {body?.length ? (
            <PortableText
              value={body}
              components={{
                block: {
                  normal: ({ children }) => <p className="last:mb-0">{children}</p>,
                },
              }}
            />
          ) : null}
        </div>

        {showCta && (
          <a
            href={buttonHref}
            className="w-fit rounded-full px-4 py-1 transition-all border-2 border-moody cursor-pointer uppercase hover:bg-moody hover:text-egg"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {buttonLabel}
          </a>
        )}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-10 pt-5">
          {members.length ? (
            members.map((entry) => {
              const entryWithKey = {
                _key: entry._key ?? entry.member?._id ?? crypto.randomUUID(),
                member: entry.member,
              };

              return (
                <TeamMemberCard
                  key={entryWithKey._key}
                  entry={entryWithKey}
                  variant="grid"
                />
              );
            })
          ) : (
            <p className="col-span-full text-moody/60">No team members published yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

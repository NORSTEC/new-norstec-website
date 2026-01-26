import { PortableText } from "next-sanity";
import TeamMemberCard from "@/components/items/team/TeamMemberCard";
import { SectionInitiativeAdditionalPage as SectionType } from "@/types/sections/summit/sectionInitiativeAdditionalPage";

type Props = {
  section: SectionType;
  className?: string;
};

function Description({ value }: { value?: SectionType["description"] | SectionType["body"] | null }) {
  if (!value) return null;

  if (Array.isArray(value)) {
    return (
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-[1rem] last:mb-0 leading-relaxed">{children}</p>
            ),
          },
        }}
      />
    );
  }

  return <p className="leading-relaxed">{value}</p>;
}

export default function SectionInitiativeAdditionalPage({ section, className = "" }: Props) {
  const { title, description, body, buttonHref, buttonLabel, members = [] } = section;

  const showCta = Boolean(buttonHref && buttonLabel);
  const isExternal = (buttonHref ?? "").startsWith("http");
  const descriptionValue = description ?? body ?? null;

  return (
    <section className={`section mobile-container ${className}`}>
      <div className="flex flex-col gap-5 lg:gap-7">
        {title ? (
          <h2 className="text-h2 uppercase">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
        ) : null}

        <Description value={descriptionValue} />

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

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
          {members.length ? (
            members.map((entry) => (
              <TeamMemberCard key={entry._key ?? entry.member?._id ?? crypto.randomUUID()} entry={entry} variant="grid" />
            ))
          ) : (
            <p className="col-span-full text-moody/60">No team members published yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

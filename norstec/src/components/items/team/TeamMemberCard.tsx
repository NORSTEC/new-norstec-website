import Image from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import { SectionTeamMember } from "@/types/sections/sectionTeam";

type TeamMemberCardProps = {
  entry: SectionTeamMember;
  variant?: "grid" | "carousel";
};

function ContactIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  const isExternal = href.startsWith("http");

  const iconNode =
    icon === "linkedin" ? (
      <LinkedInGlyph />
    ) : (
      <span className="icon icon-20 icon-400 icon-filled">{icon}</span>
    );

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="inline-flex h-8 w-8 items-center justify-center border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg transition-all duration-200"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
    >
      {iconNode}
    </a>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      aria-hidden
      className="h-6 w-6 md:h-8 md:w-8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M6.4 9.2H8.6V18H6.4V9.2ZM7.5 5.5C8.2 5.5 8.8 6.1 8.8 6.8C8.8 7.5 8.2 8.1 7.5 8.1C6.8 8.1 6.2 7.5 6.2 6.8C6.2 6.1 6.8 5.5 7.5 5.5Z"
      />
      <path
        fill="currentColor"
        d="M10.6 9.2H12.7V10.3C13.1 9.6 13.9 9 15.1 9C17.2 9 17.8 10.4 17.8 12.4V18H15.6V12.9C15.6 11.8 15.4 10.9 14.3 10.9C13.2 10.9 12.9 11.7 12.9 12.8V18H10.6V9.2Z"
      />
    </svg>
  );
}

function formatPhone(value: string) {
  return value.replace(/\s+/g, "");
}

export default function TeamMemberCard({ entry, variant = "grid" }: TeamMemberCardProps) {
  const member = entry.member;

  if (!member) {
    return null;
  }

  const roleTitle = entry.role?.title;

  const photoUrl = imageBuilder(member.photo, {
    width: 900,
    height: 1100,
    fit: "crop",
  });

  const iconActions = [
    member.email
      ? {
          href: `mailto:${member.email}`,
          icon: "mail", 
          label: `Email ${member.name}`,
        }
      : null,
    member.phone
      ? {
          href: `tel:${formatPhone(member.phone)}`,
          icon: "call",
          label: `Call ${member.name}`,
        }
      : null,
    member.linkedin
      ? {
          href: member.linkedin,
          icon: "linkedin",
          label: `${member.name} on LinkedIn`,
        }
      : null,
  ].filter(Boolean) as Array<{ href: string; icon: string; label: string }>;

  const articleClass =
    variant === "carousel"
      ? "md:min-w-[17rem] md:w-[20vw] w-[14rem] rounded-3xl overflow-hidden"
      : "group w-full md:min-w-[17rem] md:w-[20vw]";

  return (
    <article className={articleClass}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl snap">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.photoAlt || member.name || "Team member"}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] "
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-moody/5 text-sm text-moody/60">
            Photo coming soon
          </div>
        )}

        {roleTitle ? (
          <span className="absolute left-1.5 md:left-3 top-3 rounded-full bg-moody px-2 md:px-3 py-1 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.08em] text-egg shadow-md backdrop-blur">
            {roleTitle}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 py-2">
          <h3 className=" font-semibold uppercase leading-tight">{member.name}</h3>
        <div className="flex flex-wrap items-center gap-2">
          {iconActions.map((action, idx) => (
            <ContactIcon key={`${action.label}-${idx}`} href={action.href} icon={action.icon} label={action.label} />
          ))}
        </div>
      </div>
    </article>
  );
}

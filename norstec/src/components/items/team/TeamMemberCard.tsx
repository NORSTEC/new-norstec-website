import Image from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import { SectionTeamMember } from "@/types/sections/sectionTeam";

type TeamMemberCardProps = {
  entry: SectionTeamMember;
};

function ContactPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full bg-moody text-egg px-3 py-1 text-sm font-semibold uppercase tracking-[0.05em] transition duration-150 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {label}
    </a>
  );
}

function formatPhone(value: string) {
  return value.replace(/\s+/g, "");
}

export default function TeamMemberCard({ entry }: TeamMemberCardProps) {
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

  const contactActions = [
    member.email ? { href: `mailto:${member.email}`, label: member.email } : null,
    member.phone ? { href: `tel:${formatPhone(member.phone)}`, label: member.phone } : null,
    member.linkedin ? { href: member.linkedin, label: "LinkedIn" } : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-moody/10 bg-egg shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-moody/5">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.photoAlt || member.name || "Team member"}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-moody/5 text-sm text-moody/60">
            Photo coming soon
          </div>
        )}

        {roleTitle ? (
          <span className="absolute left-3 top-3 rounded-full bg-moody/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-egg shadow-md backdrop-blur">
            {roleTitle}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-[1.1rem] font-semibold uppercase leading-tight">{member.name}</h3>
          {roleTitle ? (
            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-moody/70">
              {roleTitle}
            </p>
          ) : null}
        </div>

        {contactActions.length ? (
          <div className="flex flex-wrap gap-2">
            {contactActions.map((action, idx) => (
              <ContactPill key={`${action.label}-${idx}`} href={action.href} label={action.label} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-moody/60">Contact details coming soon.</p>
        )}
      </div>
    </article>
  );
}

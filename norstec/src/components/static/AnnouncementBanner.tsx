import Link from "next/link";
import type { Announcement } from "@/types/items/announcement";

interface AnnouncementBannerProps {
  announcement?: Announcement | null;
}

export default function AnnouncementBanner({
  announcement,
}: AnnouncementBannerProps) {
  if (!announcement?.isActive) {
    return null;
  }

  const isExternal = /^https?:\/\//.test(announcement.url);

  return (
    <aside className="fixed inset-x-0 top-0 z-60 h-10 bg-moody text-egg lg:h-12">
      <Link
        href={announcement.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group relative flex h-full items-center justify-center gap-2 overflow-hidden px-5 text-center text-sm lg:text-base"
      >
        {announcement.showIcon !== false && announcement.icon && (
          <span
            aria-hidden="true"
            className="material-symbols-outlined shrink-0 text-[1.2rem]"
          >
            {announcement.icon}
          </span>
        )}

        <span className="min-w-0 truncate">
          {announcement.text}
        </span>

        {announcement.showArrow !== false && (
          <span
            aria-hidden="true"
            className="material-symbols-outlined shrink-0 text-[1.25rem] transition-transform duration-200 group-hover:translate-x-1"
          >
            trending_flat
          </span>
        )}

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-1">
          <span className="flex-1 bg-sky" />
          <span className="flex-1 bg-beachball" />
          <span className="flex-1 bg-sun" />
          <span className="flex-1 bg-copper" />
        </span>
      </Link>
    </aside>
  );
}

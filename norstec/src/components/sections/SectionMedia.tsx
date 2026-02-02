import { SectionMedia as SectionMediaType } from "@/types/sections/sectionMedia";

type Props = {
  section: SectionMediaType;
  className?: string;
};

function toEmbedUrl(url: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (_) {
    return url;
  }
  return url;
}

export default function SectionMedia({ section, className = "" }: Props) {
  const items = section.items ?? [];

  return (
    <section className={`section mobile-container ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-h2">
          {section.title}
          <span aria-hidden className="star-inline" />
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 w-full">
        {items.map((item) => {
          const embed = toEmbedUrl(item.videoUrl);
          return (
            <div key={item._id} className="flex flex-col gap-3">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
                {embed ? (
                  <iframe
                    src={embed}
                    title={item.caption || "Media item"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <p className="p-4 text-sm text-egg/70">Invalid video URL</p>
                )}
              </div>
              {item.caption && <p className="text-sm text-egg/80">{item.caption}</p>}
            </div>
          );
        })}
      </div>

      {!items.length && <p className="text-egg/70">No media selected for this section.</p>}
    </section>
  );
}

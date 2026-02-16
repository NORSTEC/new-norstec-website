"use client";

import { MediaType } from "@/types/media";
import { useStripePalette } from "@/hooks/useStripePalette";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

const MEDIA: { type: MediaType; label: string }[] = [
  { type: "article", label: "Articles" },
  { type: "linkedin", label: "LinkedIn" },
  { type: "instagram", label: "Instagram" },
  { type: "youtube", label: "YouTube" },
];

export default function MobileMediaFilter({ selected, setSelected }: Props) {
  const { colors } = useStripePalette(); // [sky, beachball, sun, copper]
  const colorMap: Record<MediaType, string> = {
    article: colors[0],
    linkedin: colors[1],
    instagram: colors[2],
    youtube: colors[3],
    podcast: colors[0],
  };

  const toggle = (type: MediaType) =>
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  return (
    <div className="flex flex-wrap gap-3 md:gap-10 w-full xl:hidden items-center justify-center">
      {MEDIA.map(({ type, label }) => {
        const active = selected.includes(type);
        const color = colorMap[type];
        return (
          <button
            key={type}
            type="button"
            onClick={() => toggle(type)}
            className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-full transition duration-150 ease-out border md:text-lg`}
            style={{
              background: active ? color : "transparent",
              color: active ? "#0f1118" : color,
              borderColor: color,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

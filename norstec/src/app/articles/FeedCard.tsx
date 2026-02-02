"use client";

import { FeedItem } from "@/types/media";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const FeedCard = ({ item }: { item: FeedItem }) => {
  const router = useRouter();

  const cleanHTML = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const handleClick = () => {
    if (item.type === "article" && item.url) {
      router.push(item.url);
      return;
    }
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <article className="relative overflow-hidden rounded-4xl bg-egg hover:-translate-y-4 transition duration-200 cursor-pointer p-5 flex flex-col gap-4"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.08em] text-moody">
          {item.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-copper">
          {item.type}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border border-moody/10 bg-moody/5">
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          ) : (
            <Image
              src={"/images/landing.jpeg"}
              alt=""
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        {item.title && item.type !== "linkedin" && (
          <h2 className="text-xl font-semibold leading-tight">{cleanHTML(item.title)}</h2>
        )}
        {item.description && (
          <p className="text-sm text-moody/80 line-clamp-3">{cleanHTML(item.description)}</p>
        )}
        {item.title && item.type === "linkedin" && (
          <p className="text-sm text-moody/90 line-clamp-6">{cleanHTML(item.title)}</p>
        )}
      </div>
    </article>
  );
};

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
    <article
      className="relative overflow-hidden rounded-4xl bg-egg hover:scale-95  transition-all duration-200 cursor-pointer p-5 flex flex-col gap-4 border border-sky"
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
        <div className="w-full aspect-square overflow-hidden rounded-xl">
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
              width={400}
              height={400}
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

      <div className="space-y-2 ">
        {item.type === "instagram" || item.type === "linkedin" ? (
          item.title && <p className=" line-clamp-6 leading-7">{cleanHTML(item.title)}</p>
        ) : (
          <>
            {item.title && (
              <h2 className="text-[1.15rem] font-semibold leading-tight">
                {cleanHTML(item.title)}
              </h2>
            )}
            {item.description && (
              <p className="line-clamp-3 leading-7">{cleanHTML(item.description)}</p>
            )}
          </>
        )}
      </div>
    </article>
  );
};

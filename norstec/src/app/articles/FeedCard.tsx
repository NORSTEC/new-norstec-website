import { FeedItem } from "@/types/media";
import Image from "next/image";

export const FeedCard = ({ item }: { item: FeedItem }) => {

  const cleanHTML = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  return (
    <article className="relative overflow-hidden rounded-4xl bg-egg hover:-translate-y-4 transition duration-200 cursor-pointer"
      onClick={() => window.open(item.url, "_blank")}
    >
      <span className="absolute right-1.5 md:right-3 top-3 rounded-full bg-moody px-2 md:px-3 py-1 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.08em] text-egg shadow-md backdrop-blur">
        {item.createdAt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
      </span>
      <span className="absolute right-1.5 md:right-3 top-12 rounded-full bg-moody px-2 md:px-3 py-1 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.08em] text-egg shadow-md backdrop-blur">
        {item.type}
      </span>
      {item.image ? (
        <Image
          src={item.image}
          alt=""
          className="h-64 w-full object-cover"
          width={200}
          height={160}
        />
      ) :
        <Image
          src={"/images/landing.jpeg"}
          alt=""
          className="h-64 w-full object-cover"
          width={200}
          height={160}
        />
      }
      <div className="p-5 space-y-3">
        {item.title && item.type !== "linkedin" && (
          <h2 className="text-h2">{cleanHTML(item.title)}</h2>
        )}
        {item.description && (
          <p className="line-clamp-3">{cleanHTML(item.description)}</p>
        )}
        {item.title && item.type === "linkedin" && (
          <p className="line-clamp-6">{cleanHTML(item.title)}</p>
                  )}
      </div>
    </article>
  );
};

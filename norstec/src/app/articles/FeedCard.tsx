import { FeedItem } from "@/types/media";

export const FeedCard = ({ item }: { item: FeedItem }) => {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition">
      {item.image && (
        <img
          src={item.image}
          alt=""
          className="h-64 w-full object-cover"
        />
      )}

      <div className="p-5 space-y-3">
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {item.type}
        </span>

        {item.title && (
          <h3 className="text-lg font-semibold">{item.title}</h3>
        )}

        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {item.description}
          </p>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-blue-600"
          >
            Open →
          </a>
        )}
      </div>
    </article>
  );
};

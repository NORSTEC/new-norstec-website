import Link from "next/link";
import NextImage from "next/image";
import { SectionArticles as SectionArticlesType } from "@/types/sections/sectionArticles";
import { imageBuilder } from "@/utils/imageBuilder";

type Props = {
  section: SectionArticlesType;
  className?: string;
};

export default function SectionArticles({ section, className = "" }: Props) {
  const articles = section.articles ?? [];

  return (
    <section className={`section mobile-container ${className}`}>
      <div className="flex items-center justify-between w-full mb-6">
        {section.title ? (
          <h2 className="text-h2 flex items-center gap-2">
            {section.title}
            <span aria-hidden className="star-inline" />
          </h2>
        ) : (
          <span className="sr-only">Articles</span>
        )}
      </div>

      <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => {
          const href = `/articles/${article.slug?.current ?? ""}`;
          const coverSrc = imageBuilder(article.coverImage);
          const published =
            article.publishedAt &&
            new Date(article.publishedAt).toLocaleDateString("nb-NO", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

          return (
            <Link
              key={article._id}
              href={href}
              className="group rounded-3xl overflow-hidden border border-egg/10 bg-egg/5 backdrop-blur-sm hover:-translate-y-2 transition-all duration-200"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-moody">
                {coverSrc ? (
                  <NextImage
                    src={coverSrc}
                    alt={article.coverAlt || article.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                ) : null}
              </div>
              <div className="p-4 flex flex-col gap-2">
                {published && <p className="text-sm text-egg/70 uppercase tracking-wide">{published}</p>}
                <h3 className="text-xl font-semibold">{article.title}</h3>
                {article.excerpt && (
                  <p className="text-sm text-egg/80 line-clamp-2">{article.excerpt}</p>
                )}
                <span className="mt-2 inline-flex items-center gap-2 text-copper font-semibold">
                  Read article
                  <span className="icon icon-20 rotate-0 transition-transform group-hover:translate-x-1">trending_flat</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-egg/70 w-full">No articles yet. Add some in Sanity to show them here.</p>
      )}
    </section>
  );
}

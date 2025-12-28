'use client';
import { useEpisodes } from "@/hooks/useEpisodes";
import Image from "next/image";
import { useState } from "react";

type MediaType = "podcast" | "linkedin" | "youtube" | "articles" | "instagram" | "all";

const SpacePoddenView = () => {
    const [page, setPage] = useState(1);
    const limit = 6;

    const { episodes, loading, error } = useEpisodes({ page, limit });

    if (loading) return <p>Loading episodes...</p>;
    if (error) return <p>Error loading episodes: {error}</p>;

    const imageBaseUrl = "https://img.rss.com/spacepodden/160/";

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">SpacePodden Episodes</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                {episodes.map((episode) => (
                    <div className="flex flex-col" key={episode.guid}>
                        <div className="flex flex-col xl:flex-row w-full gap-4 h-auto">
                            <div className="w-[150px] h-[150px]">
                                <Image
                                    className="rounded-md"
                                    height="200"
                                    width="200"
                                    src={`${imageBaseUrl}${episode.episode_cover}`}
                                    alt={episode.title}
                                />
                            </div>
                            <div className="flex flex-col w-full min-h-[200px] transition-max-height duration-300 ease-in-out">
                                <h3 className="line-clamp-1">{episode.title}</h3>
                                <p className="whitespace-pre-wrap mb-2">
                                    S{episode.itunes_season},E{episode.itunes_episode} •{" "}
                                    {Math.floor(episode.itunes_duration / 60)}:
                                    {String(episode.itunes_duration % 60).padStart(2, "0")} •{" "}
                                    {new Date(episode.pub_date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <div
                                    className="whitespace-pre-wrap line-clamp-2 mb-4 max-h-16 overflow-hidden"
                                    dangerouslySetInnerHTML={{
                                        __html: episode.description
                                            .replace(/<\/p><p>/g, "\n\n")
                                            .replace(/<li>/g, "&bull; ")
                                            .replace(/<\/li>/g, "\n")
                                            .replace(
                                                /<a /g,
                                                '<a class="underline text-primary" target="_blank" ',
                                            ),
                                    }}
                                ></div>
                                <button
                                    className="text-primary hover:underline justify-start flex mb-2"
                                    onClick={(e) => {
                                        const descriptionElement = e.currentTarget.previousElementSibling;
                                        if (descriptionElement) {
                                            descriptionElement.classList.toggle("line-clamp-2");
                                            descriptionElement.classList.toggle("max-h-16");
                                            descriptionElement.classList.toggle("max-h-full");
                                            e.currentTarget.textContent =
                                                descriptionElement.classList.contains("line-clamp-2")
                                                    ? "Show more"
                                                    : "Show less";
                                        }
                                    }}
                                >
                                    Show more
                                </button>
                            </div>
                        </div>
                        <audio controls controlsList="nodownload" className="w-full">
                            <source src={episode.episode_asset_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </section>
            <div className="mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const MediaToggleButton = ({
    mediaType,
    currentType,
    setMediaType,
}: {
    mediaType: MediaType;
    currentType: MediaType;
    setMediaType: (type: MediaType) => void;
}) => {
    const isActive = mediaType === currentType;

    return (
        <button
            onClick={() => setMediaType(mediaType)}
            className={`px-4 py-2 rounded cursor-pointer ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
        >
            {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
        </button>
    );
};

export default function ClientArticlesPage() {
    const [mediaType, setMediaType] = useState<MediaType>("podcast");

    return (
        <main className="w-full px-4 md:px-8 mx-auto py-40 flex flex-col items-center justify-center gap-20">
            <section className="flex flex-row gap-2">
            {Array.from(new Set<MediaType>(["podcast", "linkedin", "youtube", "articles", "instagram", "all"])).map((type) => (
                <MediaToggleButton
                    key={type }
                    mediaType={type}
                    currentType={mediaType}
                    setMediaType={setMediaType}
                />
            ))}
            </section>
            {mediaType === "podcast" && <SpacePoddenView />}
        </main>
    );
}

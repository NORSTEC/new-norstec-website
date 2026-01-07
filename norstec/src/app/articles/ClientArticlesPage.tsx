'use client';
import { useState } from "react";
import SpacePoddenView from "./SpacepoddenView";
import InstagramView from "./InstagramView";
import LinkedinView from "./LinkedinView";

type MediaType = "podcast" | "linkedin" | "youtube" | "articles" | "instagram" | "all";


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
            className={`px-4 py-2 rounded cursor-pointer ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
        >
            {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
        </button>
    );
};

export default function ClientArticlesPage() {
    const [mediaType, setMediaType] = useState<MediaType>("linkedin");

    return (
        <main className="w-full px-4 md:px-8 mx-auto py-40 flex flex-col items-center justify-center gap-20">
            <section className="flex flex-row gap-2">
                {Array.from(new Set<MediaType>(["podcast", "linkedin", "youtube", "articles", "instagram", "all"])).map((type) => (
                    <MediaToggleButton
                        key={type}
                        mediaType={type}
                        currentType={mediaType}
                        setMediaType={setMediaType}
                    />
                ))}
            </section>
            {mediaType === "podcast" && <SpacePoddenView />}
            {mediaType === "linkedin" && (
                <LinkedinView />
            )}
            {mediaType === "instagram" && <InstagramView />}
        </main>
    );
}

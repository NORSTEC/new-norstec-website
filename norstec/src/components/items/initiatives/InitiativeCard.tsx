import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "@/utils/imageBuilder";
import { PortableText } from "next-sanity";
import {Initiative} from "@/types/items/initiative";

type InitiativeCardProps = Pick<
    Initiative,
    "title" | "summary" | "cover" | "coverAlt" | "slug"
>;

export default function InitiativeCard({
                                           title,
                                           summary,
                                           cover,
                                           coverAlt,
                                           slug,
                                       }: InitiativeCardProps) {
    const imageUrl = cover
        ? imageBuilder(cover, { width: 600, height: 800, fit: "crop" })
        : "";

    const altText =
        (coverAlt && coverAlt.trim().length > 0 ? coverAlt : title) ||
        "Initiative cover";

    const href = slug ? `/initiatives/${slug.current}` : undefined;

    const card = (
        <div className="w-[20vw] 2xl:w-[20rem] rounded-2xl bg-egg shadow hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden">
            <div className="relative w-full h-[40vh]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                        No image
                    </div>
                )}
            </div>

            <div className="p-3">
                <h3 className="font-semibold">{title}</h3>

                {summary && (
                    <div className="mt-2 text-sm">
                        <PortableText
                            value={summary}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="leading-6">
                                            {children}
                                        </p>
                                    ),
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );

    return href ? <Link href={href}>{card}</Link> : card;
}
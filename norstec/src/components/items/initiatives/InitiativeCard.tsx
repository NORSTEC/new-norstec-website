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
        <div className="md:min-w-[17rem] md:w-[20vw] w-[17rem] rounded-t-2xl bg-egg hover:shadow-lg hover:scale-95 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden">
            <div className="relative w-full md:h-[40vh] h-[20rem] md:max-h-[25rem]">
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

            <div className="p-3 border-b-2 border-r-2 border-l-2 border-moody rounded-b-2xl">
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
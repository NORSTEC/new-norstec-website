import { PortableText, type PortableTextBlock } from "next-sanity";
import StripesVertical from "@/app/components/items/StripesVertical";

type TextWithImageProps = {
    title: string;
    body: PortableTextBlock[];
};

export default function SectionTextImage({ title, body }: TextWithImageProps) {
    return (
        <section className="relative h-screen overflow-hidden">
            <StripesVertical className="hidden md:flex pl-[7vw] 3xl:pl-[15rem]"/>

                <div className="flex flex-col md:flex-row h-full items-start relative z-10 px-[20px] md:px-[40px]">
                    <div className="md:min-w-[30vw] bg-egg py-10">
                        {title && <h2 className="text-h2 italic">{title}</h2>}
                    </div>

                    <div className="py-10 bg-egg md:pl-[8vw] 2xl:pl-[2vw] max-w-[1300px]">
                        <PortableText value={body} />
                    </div>
                </div>
        </section>
    );
}
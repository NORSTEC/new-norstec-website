import {PortableText, PortableTextBlock} from "next-sanity";

type HeaderWithTextProps = {
    title: string;
    text: PortableTextBlock[];
};

export default function HeaderWithText({ title, text }: HeaderWithTextProps) {
    return (
        <section className="flex gap-7">
                <div className="min-w-[250px] md:min-w-[400px] xl:min-w-[450px]">
                    {title && (
                        <h2 className="text-h2 italic">
                            {title}
                        </h2>
                    )}
                </div>

                <div className=" ">
                    <PortableText value={text} />
                </div>
        </section>
    );
}
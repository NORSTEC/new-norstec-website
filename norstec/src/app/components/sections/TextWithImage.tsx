import HeaderWithText from "@/app/components/items/HeaderWithText";
import {PortableTextBlock} from "next-sanity";

type TextWithImageProps = {
    title: string;
    body: PortableTextBlock[];
};

export default function TextWithImage({
                                          title,
                                          body,
                                      }: TextWithImageProps) {

    return (
        <section className="h-screen container">
            <HeaderWithText title={title} text={body} />
        </section>
    );
}
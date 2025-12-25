import type { Metadata } from "next";
import {MetadataSection} from "@/types/metadata/metadata";


export default function mapAlternates(
    alternates: MetadataSection["alternates"]
): Metadata["alternates"] | undefined {
    if (!alternates) return undefined;

    const languages =
        alternates.languages?.reduce<Record<string, string>>(
            (acc, { locale, url }) => {
                acc[locale] = url;
                return acc;
            },
            {}
        );

    return {
        canonical: alternates.canonical,
        languages: languages && Object.keys(languages).length > 0
            ? languages
            : undefined,
    };
}

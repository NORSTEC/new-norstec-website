type ImageBuilderOptions = {
    width?: number;
    height?: number;
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
    format?: "webp" | "jpg" | "png" | false;
    quality?: number;
};


export const imageBuilder = (
    source?:
        | string
        | { asset?: { _ref?: string; _id?: string; url?: string | null } }
        | null,
    opts: ImageBuilderOptions = {},
): string => {
    if (!source) return "";

    const ref: string | undefined =
        typeof source === "string"
            ? source
            : source.asset?._ref || source.asset?._id || undefined;

    const directUrl =
        typeof source !== "string" && source.asset?.url
            ? source.asset.url
            : undefined;

    const applyParams = (url: URL) => {
        const width = opts.width ?? 1920;
        const height = opts.height ?? undefined;
        const quality = opts.quality ?? 90;
        const format = opts.format ?? "webp";

        url.searchParams.set("w", String(width));
        if (height) url.searchParams.set("h", String(height));
        if (opts.fit) url.searchParams.set("fit", opts.fit);
        if (format !== false) {
            url.searchParams.set("fm", format);
            url.searchParams.set("q", String(quality));
        }

        return url.toString();
    };

    if (directUrl) {
        try {
            return applyParams(new URL(directUrl));
        } catch {
            console.warn("Invalid direct image URL:", directUrl);
            return "";
        }
    }

    if (!ref || !ref.startsWith("image-")) {
        console.warn("Invalid Sanity image reference:", ref);
        return "";
    }

    const parts = ref.split("-");
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    const filename = `${id}-${dimensions}.${format}`;

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

    if (!projectId || !dataset) {
        console.warn("Missing Sanity project info for imageBuilder");
        return "";
    }

    const url = new URL(
        `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`,
    );

    return applyParams(url);
};

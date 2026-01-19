type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  format?: "webp" | "jpg" | "png" | false;
  quality?: number;
};

export const imageBuilder = (
    source?: string | { asset?: { _ref?: string; _id?: string; url?: string | null } } | null,
    opts: ImageBuilderOptions = {}
): string => {
  if (!source) return "";

  const ref =
      typeof source === "string"
          ? source
          : source.asset?._ref || source.asset?._id || undefined;

  const directUrl =
      typeof source !== "string" && source.asset?.url
          ? source.asset.url
          : undefined;

  const hasTransforms =
      opts.width !== undefined ||
      opts.height !== undefined ||
      opts.fit !== undefined ||
      opts.format !== undefined ||
      opts.quality !== undefined;

  const applyParams = (url: URL) => {
    if (!hasTransforms) return url.toString();

    if (opts.width !== undefined) {
      url.searchParams.set("w", String(opts.width));
    }

    if (opts.height !== undefined) {
      url.searchParams.set("h", String(opts.height));
    }

    if (opts.fit !== undefined) {
      url.searchParams.set("fit", opts.fit);
    }

    if (opts.format !== undefined && opts.format !== false) {
      url.searchParams.set("fm", opts.format);
    }

    if (opts.quality !== undefined) {
      url.searchParams.set("q", String(opts.quality));
    }

    return url.toString();
  };

  if (directUrl) {
    try {
      return applyParams(new URL(directUrl));
    } catch {
      return "";
    }
  }

  if (!ref || !ref.startsWith("image-")) {
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
    return "";
  }

  const url = new URL(
      `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`
  );

  return applyParams(url);
};

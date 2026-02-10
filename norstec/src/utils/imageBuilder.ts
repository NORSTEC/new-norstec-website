type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  format?: "webp" | "jpg" | "png" | false;
  quality?: number;
};

type ImageCrop = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type ImageHotspot = {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

type ImageSourceObject = {
  asset?: { _ref?: string; _id?: string; url?: string | null };
  crop?: ImageCrop | null;
  hotspot?: ImageHotspot | null;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const parseDimensionsFromRef = (ref?: string) => {
  if (!ref || !ref.startsWith("image-")) {
    return null;
  }

  const parts = ref.split("-");
  const dimensions = parts[2];
  if (!dimensions || !dimensions.includes("x")) {
    return null;
  }

  const [w, h] = dimensions.split("x");
  const width = Number.parseInt(w, 10);
  const height = Number.parseInt(h, 10);

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    return null;
  }

  return { width, height };
};

const getCropRect = (source: ImageSourceObject, ref?: string) => {
  if (!source.crop) return null;

  const dimensions = parseDimensionsFromRef(ref);
  if (!dimensions) return null;

  const cropLeft = clamp(source.crop.left ?? 0, 0, 1);
  const cropRight = clamp(source.crop.right ?? 0, 0, 1);
  const cropTop = clamp(source.crop.top ?? 0, 0, 1);
  const cropBottom = clamp(source.crop.bottom ?? 0, 0, 1);

  const safeWidthRatio = Math.max(0.0001, 1 - cropLeft - cropRight);
  const safeHeightRatio = Math.max(0.0001, 1 - cropTop - cropBottom);

  const left = Math.round(dimensions.width * cropLeft);
  const top = Math.round(dimensions.height * cropTop);
  const width = Math.max(1, Math.round(dimensions.width * safeWidthRatio));
  const height = Math.max(1, Math.round(dimensions.height * safeHeightRatio));

  return { left, top, width, height };
};

export const imageBuilder = (
    source?: string | ImageSourceObject | null,
    opts: ImageBuilderOptions = {}
): string => {
  if (!source) return "";

  const objectSource: ImageSourceObject | null =
      typeof source === "string" ? null : source;

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
    if (objectSource) {
      const cropRect = getCropRect(objectSource, ref);
      if (cropRect) {
        url.searchParams.set(
            "rect",
            `${cropRect.left},${cropRect.top},${cropRect.width},${cropRect.height}`
        );
      }

      if (
          opts.fit === "crop" &&
          opts.width !== undefined &&
          opts.height !== undefined &&
          objectSource.hotspot?.x !== undefined &&
          objectSource.hotspot?.y !== undefined
      ) {
        const x = clamp(objectSource.hotspot.x, 0, 1);
        const y = clamp(objectSource.hotspot.y, 0, 1);
        url.searchParams.set("crop", "focalpoint");
        url.searchParams.set("fp-x", String(x));
        url.searchParams.set("fp-y", String(y));
      }
    }

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

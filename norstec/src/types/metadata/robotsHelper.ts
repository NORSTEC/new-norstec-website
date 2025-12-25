/**
 * Matches the subset of Next.js RobotsInfo that we actually use
 * (Next.js does not export this type publicly)
 */
export interface GoogleBotRobots {
    noimageindex?: boolean;
    maxSnippet?: number;
    maxImagePreview?: "none" | "standard" | "large";
    maxVideoPreview?: number;
}

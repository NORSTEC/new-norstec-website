import { GoogleBotRobots } from "@/types/metadata/robotsHelper";
import { MetadataSection } from "@/types/metadata/metadata";

export default function mapGoogleBot(
  googleBot: MetadataSection["googleBot"]
): GoogleBotRobots | undefined {
  if (!googleBot) return undefined;

  return {
    noimageindex: googleBot.noImageIndex,
    maxSnippet: googleBot.maxSnippet,
    maxImagePreview: googleBot.maxImagePreview,
    maxVideoPreview: googleBot.maxVideoPreview,
  };
}

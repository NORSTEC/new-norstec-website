"use client";

import SectionSummitProgram from "@/components/summit/SectionSummitProgram";
import { StripePaletteProvider } from "@/hooks/useStripePalette";
import type { SectionSummitProgram as SectionSummitProgramType } from "@/types/sections/summit/sectionSummitProgram";

export default function ClientSummitProgramPage({
  section,
}: {
  section: SectionSummitProgramType;
}) {
  return (
    <StripePaletteProvider palette="summit">
      <main>
        <SectionSummitProgram section={section} />
      </main>
    </StripePaletteProvider>
  );
}

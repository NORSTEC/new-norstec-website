import React from "react";
import type { SectionSummitTimer } from "@/types/sections/summit/sectionSummitTimer";
import StripesCornerTopRight from "@/components/items/stripes/StripesCornerTopRight";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";

const SUMMIT_DATE = "2026-03-12T00:00:00Z";

export default function SectionSummitTimer({
  section,
  className = "",
}: {
  section: SectionSummitTimer;
  className?: string;
}) {
  const { buttonHref, buttonLabel } = section;
  const isExternal = buttonHref?.startsWith("http");

  const target = React.useMemo(() => new Date(SUMMIT_DATE), []);
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(target));

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className={`section relative flex items-center justify-center ${className}`}>
      <StripesCornerTopRight />
      <div className="mobile-container w-full flex flex-col items-center gap-20 ">
        <div className="flex flex-nowrap w-full justify-between gap-2 sm:gap-4 md:w-auto md:justify-center md:gap-6 lg:gap-10">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" pad />
          <TimeBlock value={timeLeft.minutes} label="Minutes" pad />
          <TimeBlock value={timeLeft.seconds} label="Seconds" pad />
        </div>

        {buttonHref && buttonLabel && (
          <a
            href={buttonHref}
            className="rounded-full px-4 py-1 transition-all border-2 border-moody cursor-pointer uppercase hover:bg-moody hover:text-egg text-lg"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label, pad }: { value: number; label: string; pad?: boolean }) {
  const display = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <div className="flex flex-col items-center whitespace-nowrap text-nowrap">
      <span
        className="text-[clamp(2rem,7vw,6rem)] font-bold leading-none inline-flex justify-center text-nowrap"
        style={{ fontVariantNumeric: "tabular-nums lining-nums", minWidth: "4ch" }}
      >
        {display}
      </span>
      <span className="mt-2 text-[clamp(1rem,3vw,3.5rem)] uppercase tracking-wide text-nowrap">
        {label}
      </span>
    </div>
  );
}

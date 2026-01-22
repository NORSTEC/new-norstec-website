"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useMemo, useState } from "react";
import TeamMemberCard from "@/components/items/team/TeamMemberCard";
import { SectionTeamMember } from "@/types/sections/sectionTeam";
import "@/styles/embla.css";

type TeamCarouselProps = {
  members: SectionTeamMember[];
};

export default function TeamCarousel({ members }: TeamCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enableEmbla, setEnableEmbla] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: "x",
      dragFree: true,
      skipSnaps: true,
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: false,
        speed: 0.75,
        stopOnInteraction: false,
        direction: "forward",
      }),
      WheelGesturesPlugin({ forceWheelAxis: "x" }),
    ]
  );

  const slides = useMemo(() => {
    if (!enableEmbla) return members;
    if (members.length < 5) {
      return [...members, ...members];
    }
    return members;
  }, [enableEmbla, members]);

  useEffect(() => {
    const check = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalWidth = Array.from(container.children).reduce(
        (acc, child) => acc + (child as HTMLElement).offsetWidth,
        0
      );

      const containerWidth = container.offsetWidth;

      const needsScroll = totalWidth > containerWidth;
      setEnableEmbla(needsScroll);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!enableEmbla) return;
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll) {
      requestAnimationFrame(() => autoScroll.play?.());
    }
  }, [enableEmbla, emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={enableEmbla ? emblaRef : undefined}>
        <div className="embla__container" ref={!enableEmbla ? containerRef : null}>
          {slides.map((entry, i) => {
            const key = entry._key ?? entry.member?._id ?? `team-slide-${i}`;

            return (
              <div
                className="embla__slide min-w-[16rem] md:min-w-[20rem] md:w-[25vw]"
                key={key}
              >
                <TeamMemberCard entry={entry} variant="carousel" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

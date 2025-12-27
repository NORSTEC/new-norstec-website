"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useMemo, useState } from "react";
import InitiativeCard from "./InitiativeCard";
import "@/styles/embla.css";
import { Initiative } from "@/types/items/initiative";

type InitiativesCarouselProps = {
  initiatives: Initiative[];
};

export default function InitiativesCarousel({ initiatives }: InitiativesCarouselProps) {
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
    if (!enableEmbla) return initiatives;
    if (initiatives.length < 5) {
      return [...initiatives, ...initiatives];
    }
    return initiatives;
  }, [enableEmbla, initiatives]);

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
    <div className="embla ">
      <div className="embla__viewport" ref={enableEmbla ? emblaRef : undefined}>
        <div className="embla__container " ref={!enableEmbla ? containerRef : null}>
          {slides.map((x, i) => {
            const key = x._id ?? x._key ?? x.slug?.current ?? `slide-${i}`;

            return (
              <div className="embla__slide min-w-[20rem] w-[25vw] " key={key}>
                <InitiativeCard {...x} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

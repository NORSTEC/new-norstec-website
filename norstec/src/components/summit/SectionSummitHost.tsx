import React from "react";
import HostCard from "./HostCard";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionSummitHost } from "@/types/sections/summit/sectionSummitHost";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "motion/react";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

type Props = {
  section: SectionSummitHost;
  className?: string;
};

type HostCardData = {
  _key: string;
  name: string;
  title?: string;
  bio?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function SectionSummitHost({ section, className = "" }: Props) {
  const { title, hosts = [] } = section;
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const normalizedHosts: HostCardData[] = (hosts ?? [])
    .filter((h): h is NonNullable<typeof h> => !!h && !!h._key)
    .map((host) => ({
      _key: host._key,
      name: host.name,
      title: host.title,
      bio: host.bio,
      imageSrc: imageBuilder(host.image, { width: 1200, quality: 90, fit: "max" }),
      imageAlt: host.imageAlt || host.name,
    }));

  const count = normalizedHosts.length;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"next" | "prev">("next");

  React.useEffect(() => {
    if (!count) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex((idx) => (idx >= count ? 0 : idx));
  }, [count]);

  const prevIndex = count ? (selectedIndex - 1 + count) % count : 0;
  const nextIndex = count ? (selectedIndex + 1) % count : 0;
  const active = normalizedHosts[selectedIndex];
  const prev = normalizedHosts[prevIndex];
  const next = normalizedHosts[nextIndex];

  const goPrev = () => {
    if (!count) return;
    setDirection("prev");
    setSelectedIndex((idx) => (idx - 1 + count) % count);
  };

  const goNext = () => {
    if (!count) return;
    setDirection("next");
    setSelectedIndex((idx) => (idx + 1) % count);
  };

  return (
    <section className={`section desktop-container ${className}`}>
      <ChemtrailsRight />
      {title && (
        <h2 className="text-h2 uppercase">
          {title}
          <span aria-hidden className="star-inline" />
        </h2>
      )}
      <div className="flex flex-col gap-5 h-full justify-center">
        {count === 0 ? (
          <p className="text-moody/70">No hosts published yet.</p>
        ) : isDesktop ? (
          <DesktopCarousel
            active={active}
            prev={prev}
            next={next}
            goPrev={goPrev}
            goNext={goNext}
            direction={direction}
          />
        ) : (
          <div className="flex flex-col gap-20">
            {normalizedHosts.map((host) => (
              <HostListCard key={host._key} host={host} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DesktopCarousel({
  active,
  prev,
  next,
  goPrev,
  goNext,
  direction,
}: {
  active?: HostCardData;
  prev?: HostCardData;
  next?: HostCardData;
  goPrev: () => void;
  goNext: () => void;
  direction: "next" | "prev";
}) {
  return (
    <div className="relative flex 3xl:items-center justify-center gap-4 xl:gap-16 ">
      <div className="hidden lg:flex items-center xl:gap-3">
        <div
          className="hidden lg:block w-[225px] xl:w-[300px] 3xl:w-[400px] transition-transform duration-300 hover:scale-95"
          onClick={goNext}
          style={{ transform: "perspective(1400px) rotateY(14deg) scale(0.9)" }}
        >
          {prev ? (
            <HostCard
              name={prev.name}
              title={prev.title}
              imageSrc={prev.imageSrc}
              imageAlt={prev.imageAlt}
              bio={prev.bio}
              interactive={false}
            />
          ) : null}
        </div>
        <button
          type="button"
          onClick={goNext}
          className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg  transition-all duration-200"
          aria-label="Previous host"
        >
          <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 rotate-[180deg]">
            trending_flat
          </span>
        </button>
      </div>

      <div className="w-[29vw] min-w-[350px] 3xl:w-[550px] transition-transform duration-300 transform-gpu">
        <AnimatePresence mode="popLayout" initial={false}>
          {active ? (
            <motion.div
              key={active._key}
              initial={{ opacity: 0, x: 0, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 0.9, 0.2, 1] }}
            >
              <HostCard
                name={active.name}
                title={active.title}
                imageSrc={active.imageSrc}
                imageAlt={active.imageAlt}
                bio={active.bio}
                interactive
              />
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="text-moody/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No hosts published yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg transition-all duration-200"
          aria-label="Next host"
        >
          <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200">
            trending_flat
          </span>
        </button>
        <div
          className="hidden lg:block w-[225px] xl:w-[300px] 3xl:w-[400px] transition-transform duration-300 hover:scale-95 cursor-pointer"
          onClick={goNext}
          style={{ transform: "perspective(1400px) rotateY(-14deg) scale(0.9)" }}
        >
          {next ? (
            <HostCard
              name={next.name}
              title={next.title}
              imageSrc={next.imageSrc}
              imageAlt={next.imageAlt}
              bio={next.bio}
              interactive={false}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function HostListCard({ host }: { host: HostCardData }) {
  return (
    <article className="group relative overflow-hidden bg-egg text-moody transition duration-300 ">
      <div className="relative flex gap-5 items-start pb-5">
        {host.imageSrc ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-moody/10 bg-moody/5">
            <img
              src={host.imageSrc}
              alt={host.imageAlt || host.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex-1 space-y-2">
          <h3 className="text-[1.2rem] lg:text-[1.35rem] font-semibold leading-tight">
            {host.name}
          </h3>
          {host.title && <p className=" text-moody/80">{host.title}</p>}
        </div>
      </div>
      {host.bio && <p className="text-sm text-moody/80 line-clamp-3">{host.bio}</p>}
    </article>
  );
}

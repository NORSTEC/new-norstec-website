import Image from "next/image";
import React from "react";

type HostCardProps = {
  name: string;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  bio?: string;
  interactive?: boolean;
};

export default function HostCard({
  name,
  title,
  imageSrc,
  imageAlt,
  bio,
  interactive = true,
}: HostCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className={`relative h-[65vh] max-h-[720px] w-full ${interactive ? "cursor-pointer" : "cursor-default"} select-none`}
      style={{ perspective: "1400px" }}
      onClick={interactive ? toggle : undefined}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-egg text-moody overflow-hidden shadow-2xl border-2 border-moody/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          {imageSrc ? (
            <div className="relative h-[75%] w-full overflow-hidden bg-moody/5">
              <Image
                src={imageSrc}
                alt={imageAlt || name}
                fill
                sizes="480px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-52 w-full bg-moody/10" />
          )}

          <div className="p-5 space-y-3">
            <h3 className="text-[1.25rem] font-semibold leading-tight">{name}</h3>
            {title && (
              <span className="inline-flex items-center gap-1 rounded-full bg-moody text-egg px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.08em]">
                {title}
              </span>
            )}
            {interactive && (
              <div className="text-[0.75rem] uppercase tracking-[0.08em] text-moody/60">
                Click card for more info
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-moody text-egg overflow-hidden border-2 border-egg/10 px-5 py-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col gap-4 h-full">
            <div>
              <h3 className="text-[1.25rem] font-semibold leading-tight mt-1">{name}</h3>
              {title && <p className="text-sm text-egg/70 mt-1">{title}</p>}
            </div>

            {bio ? (
              <div className="rounded-lg bg-egg/5 text-egg text-[0.98rem] leading-relaxed whitespace-pre-line max-h-[30rem] h-[50vh] overflow-auto p-3 border border-egg/10">
                {interactive && (
                  <div className="text-[0.7rem] uppercase tracking-[0.08em] text-egg/60 mb-2">
                    Scroll for full bio
                  </div>
                )}
                <p className="space-y-2">{bio}</p>
              </div>
            ) : (
              <p className="text-egg/60 text-sm">No additional information.</p>
            )}

            {interactive && (
              <div className="text-[0.75rem] uppercase tracking-[0.08em] text-egg/60">
                Click card to flip back
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

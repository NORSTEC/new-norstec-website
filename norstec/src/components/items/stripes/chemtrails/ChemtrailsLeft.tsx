"use client";
import React from "react";
import { motion } from "motion/react";

const MASK_COLOR = "#EDE8DA";
const STRIPE_DELAY = 0.1;
const DURATION = 0.5;

function Line({ className, color }: { className: string; color: string }) {
  return (
    <div
      className={className}
      style={{
        width: "var(--trap-width)",
        height: "300%",
        background: color,
        clipPath: "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
        WebkitClipPath: "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
      }}
    />
  );
}

function RevealMask({ show, delay }: { show: boolean; delay: number }) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: MASK_COLOR, zIndex: 999 }}
      initial={{ y: "0%" }}
      animate={{ y: show ? "100%" : "0%" }}
      transition={{ delay, duration: DURATION, ease: "easeOut" }}
    />
  );
}

export default function ChemtrailsLeft() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const target = el.closest("section") || el.closest(".section") || el.parentElement;

    if (!target) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden lg:block"
    >
      <div className="relative h-full w-full translate-x-[3rem] lg:translate-x-[5rem] xl:translate-x-[7rem] 3xl:translate-x-[15rem]">
        {/* Stripe 1 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 40 }}>
          <div
            className="absolute inset-0 [--rot:0deg]"
            style={{
              transform: "translate(0px, 0px) rotate(var(--rot))",
              transformOrigin: "top left",
            }}
          >
            <Line
              color="#1697B7"
              className="[--trap-width:262px] [--trap-cut:230px] xl:[--trap-width:510px] xl:[--trap-cut:474px] 3xl:[--trap-width:600px] 3xl:[--trap-cut:560px]"
            />
          </div>
          <RevealMask show={show} delay={0} />
        </div>

        {/* Stripe 2 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 30 }}>
          <div
            className="absolute inset-0 [--rot:-5deg] xl:[--rot:-11deg] 3xl:[--rot:-10deg] [--x:3rem] xl:[--x:3.55rem] 3xl:[--x:4.45rem]"
            style={{
              transform: "translateX(var(--x)) rotate(var(--rot))",
              transformOrigin: "top left",
            }}
          >
            <Line
              color="#30C3CD"
              className="[--trap-width:490px] [--trap-cut:458px] xl:[--trap-width:644px] xl:[--trap-cut:610px] 3xl:[--trap-width:743px] 3xl:[--trap-cut:704px]"
            />
          </div>
          <RevealMask show={show} delay={STRIPE_DELAY} />
        </div>

        {/* Stripe 3 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 20 }}>
          <div
            className="absolute inset-0 [--rot:-14deg] xl:[--rot:-25deg] 3xl:[--rot:-22deg] [--x:6rem] xl:[--x:7.10rem] 3xl:[--x:9rem]"
            style={{
              transform: "translateX(var(--x)) rotate(var(--rot))",
              transformOrigin: "top left",
            }}
          >
            <Line
              color="#F3AD78"
              className="[--trap-width:498px] [--trap-cut:468px] xl:[--trap-width:661px] xl:[--trap-cut:632px] 3xl:[--trap-width:751px] 3xl:[--trap-cut:717px]"
            />
          </div>
          <RevealMask show={show} delay={2 * STRIPE_DELAY} />
        </div>

        {/* Stripe 4 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10 }}>
          <div
            className="absolute inset-0 [--rot:-23deg] xl:[--rot:-40deg] 3xl:[--rot:-35deg] [--x:9rem] xl:[--x:10.65rem] 3xl:[--x:13.5rem]"
            style={{
              transform: "translateX(var(--x)) rotate(var(--rot))",
              transformOrigin: "top left",
            }}
          >
            <Line
              color="#E8804C"
              className="[--trap-width:500px] [--trap-cut:473px] xl:[--trap-width:483.5px] xl:[--trap-cut:460px] 3xl:[--trap-width:759px] 3xl:[--trap-cut:731px]"
            />
          </div>
          <RevealMask show={show} delay={3 * STRIPE_DELAY} />
        </div>
      </div>
    </div>
  );
}

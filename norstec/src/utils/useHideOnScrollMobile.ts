"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

type Options = {
    enabled: boolean;

    // Hvis du scroller i en container (overflow-y-auto), send inn ref
    containerRef?: RefObject<HTMLElement | null>;

    hideAfterPx?: number;  // ikke begynn å skjule før du har scrollet så langt ned
    hideDeltaPx?: number;  // hvor mye ned-bevegelse som kreves for å skjule
    showDeltaPx?: number;  // hvor mye opp-bevegelse som kreves for å vise igjen
    topSafePx?: number;    // alltid vis nær toppen
};

export function useHideOnScrollMobile({
                                          enabled,
                                          containerRef,
                                          hideAfterPx = 64,
                                          hideDeltaPx = 24,
                                          showDeltaPx = 10,
                                          topSafePx = 8,
                                      }: Options) {
    const scrollArgs = useMemo(() => {
        return containerRef?.current ? { container: containerRef } : {};
    }, [containerRef]);

    const { scrollY } = useScroll(scrollArgs);

    const [visible, setVisible] = useState(true);
    const visibleRef = useRef(true);

    const lastYRef = useRef(0);
    const downAccRef = useRef(0);
    const upAccRef = useRef(0);

    const setVisibleSafe = (v: boolean) => {
        visibleRef.current = v;
        setVisible(v);
        // når vi endrer state, nullstill akkumulatorer slik at terskler føles naturlige
        downAccRef.current = 0;
        upAccRef.current = 0;
    };

    useEffect(() => {
        const y = scrollY.get();
        lastYRef.current = y;
        downAccRef.current = 0;
        upAccRef.current = 0;

        if (!enabled) {
            setVisibleSafe(true);
            return;
        }

        setVisibleSafe(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    useMotionValueEvent(scrollY, "change", (y) => {
        if (!enabled) return;

        const lastY = lastYRef.current;
        const delta = y - lastY;
        lastYRef.current = y;

        // alltid vis helt øverst
        if (y <= topSafePx) {
            if (!visibleRef.current) setVisibleSafe(true);
            return;
        }

        // ikke vurder skjul før vi har passert terskel
        if (y < hideAfterPx) return;

        if (delta > 0) {
            // nedover
            downAccRef.current += delta;
            upAccRef.current = 0;

            if (visibleRef.current && downAccRef.current >= hideDeltaPx) {
                setVisibleSafe(false);
            }
            return;
        }

        if (delta < 0) {
            // oppover (delta er negativ)
            upAccRef.current += -delta;
            downAccRef.current = 0;

            // vis igjen så snart vi har scrollet opp nok
            if (!visibleRef.current && upAccRef.current >= showDeltaPx) {
                setVisibleSafe(true);
            }
        }
    });

    return visible;
}

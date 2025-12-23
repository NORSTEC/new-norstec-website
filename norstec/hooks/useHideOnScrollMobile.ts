"use client";

import {RefObject, useEffect, useMemo, useRef, useState} from "react";
import {useMotionValueEvent, useScroll} from "motion/react";

type Options = {
    enabled: boolean;

    containerRef?: RefObject<HTMLElement | null>;

    hideAfterPx?: number;
    hideDeltaPx?: number;
    showDeltaPx?: number;
    topSafePx?: number;
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
        downAccRef.current = 0;
        upAccRef.current = 0;
    };

    useEffect(() => {
        lastYRef.current = scrollY.get();
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

        if (y <= topSafePx) {
            if (!visibleRef.current) setVisibleSafe(true);
            return;
        }

        if (y < hideAfterPx) return;

        if (delta > 0) {
            downAccRef.current += delta;
            upAccRef.current = 0;

            if (visibleRef.current && downAccRef.current >= hideDeltaPx) {
                setVisibleSafe(false);
            }
            return;
        }

        if (delta < 0) {
            upAccRef.current += -delta;
            downAccRef.current = 0;

            if (!visibleRef.current && upAccRef.current >= showDeltaPx) {
                setVisibleSafe(true);
            }
        }
    });

    return visible;
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import mountainPoints from "../../../public/mountain-points.json";

type Point = {
    x: number;
    y: number;
    z: number;
};

const points = mountainPoints as Point[];

const COLORS = [
    "#E8804C", // copper
    "#F3AD78", // sun
    "#30C3CD", // beachball
    "#1697B7", // sky
];

export default function Mountain() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const state = useRef({
        rotX: 0,
        rotY: 0,
        last: 0,
    });

    const draw = useCallback((time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const scale = Math.min(w, h) * 0.45;

        const s = state.current;
        const dt = s.last ? (time - s.last) / 1000 : 0;
        s.last = time;

        s.rotY += dt * 0.08;
        s.rotX += dt * 0.04;

        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);
        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);

        for (const p of points) {
            let x = p.x * cosY - p.z * sinY;
            let z = p.x * sinY + p.z * cosY;

            let y = p.y * cosX - z * sinX;
            z = p.y * sinX + z * cosX;

            const fov = 2.2;
            const persp = fov / (fov + z);

            const sx = cx + x * scale * persp;
            const sy = cy + y * scale * persp;

            const yNorm = Math.min(1, Math.max(0, (y + 1) / 2));
            const colorIndex = Math.min(
                COLORS.length - 1,
                Math.floor(yNorm * COLORS.length)
            );

            ctx.beginPath();
            ctx.fillStyle = COLORS[colorIndex];
            ctx.arc(sx, sy, 5 * persp, 0, Math.PI * 2);
            ctx.fill();
        }

        rafRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(draw);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [draw]);

    return (
        <div className="w-full h-full section">
            <canvas ref={canvasRef} className="w-full h-full block"/>
        </div>
    );
}

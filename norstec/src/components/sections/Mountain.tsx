"use client";

import { useRef, useEffect, useCallback } from "react";
import mountainPoints from "../../../public/mountain-points.json";

type Point = {
    x: number;
    y: number;
    z: number;
};

const points = mountainPoints as Point[];

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
        const scale = Math.min(w, h) * 0.35;

        const s = state.current;
        const dt = s.last ? (time - s.last) / 1000 : 0;
        s.last = time;

        s.rotY += dt * 0.6;
        s.rotX += dt * 0.4;

        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);
        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);

        for (const p of points) {
            // rotate Y
            let x = p.x * cosY - p.z * sinY;
            let z = p.x * sinY + p.z * cosY;

            // rotate X
            let y = p.y * cosX - z * sinX;
            z = p.y * sinX + z * cosX;

            const fov = 2;
            const persp = fov / (fov + z);

            const sx = cx + x * scale * persp;
            const sy = cy + y * scale * persp;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${0.3 + persp * 0.4})`;
            ctx.arc(sx, sy, 0.8 * persp, 0, Math.PI * 2);
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
        <div className="w-full h-full bg-black">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}

import fs from "fs";
import path from "path";

/* ---------- simple 2D noise ---------- */
function hash(x: number, y: number) {
    return Math.sin(x * 127.1 + y * 311.7) * 43758.5453 % 1;
}

function noise(x: number, y: number) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;

    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);

    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);

    return (
        a * (1 - u) * (1 - v) +
        b * u * (1 - v) +
        c * (1 - u) * v +
        d * u * v
    );
}

/* ---------- mountain generation ---------- */

type Point = { x: number; y: number; z: number };

function generateMountain(
    size = 32,
    scale = 2
): Point[] {
    const points: Point[] = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const x = (i / size - 0.5) * scale;
            const z = (j / size - 0.5) * scale;

            const r = Math.sqrt(x * x + z * z);
            const falloff = Math.exp(-r * r * 2);

            let h = 0;
            h += noise(x * 2, z * 2) * 0.6;
            h += noise(x * 4, z * 4) * 0.3;
            h += noise(x * 8, z * 8) * 0.1;

            const y = h * falloff;

            points.push({ x, y, z });
            points.push({ x, y: -y, z }); // mirrored peak
        }
    }

    return points;
}

const points = generateMountain();

const outPath = path.join(
    process.cwd(),
    "public",
    "mountain-points.json"
);

fs.writeFileSync(outPath, JSON.stringify(points));
console.log(`Generated ${points.length} mountain points`);

import fs from "fs";
import path from "path";

type Point = {
    x: number;
    y: number;
    z: number;
};

function generateMountainPoints(
    radialSteps = 200,
    heightSteps = 80
): Point[] {
    const points: Point[] = [];

    for (let h = 0; h <= heightSteps; h++) {
        const height = h / heightSteps; // 0 → 1
        const radius = Math.exp(-height * height * 3);

        for (let a = 0; a < radialSteps; a++) {
            const angle = (a / radialSteps) * Math.PI * 2;

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // top peak
            points.push({ x, y: height, z });

            // mirrored bottom peak
            points.push({ x, y: -height, z });
        }
    }

    return points;
}

const points = generateMountainPoints();

const outPath = path.join(
    process.cwd(),
    "public",
    "mountain-points.json"
);

fs.writeFileSync(outPath, JSON.stringify(points));
console.log(`Mountain generated: ${points.length} points`);

import { useEffect, useState, useRef } from "react";
import "../../../../styles/globals.css";


export interface VintageStripesProps {
    color: string;
    lineFactor: number;
}


const VintageStripes: React.FC<VintageStripesProps> = ({
                                                           color,
                                                           lineFactor,
                                                       }) => {
    const [lineCount, setLineCount] = useState(15);
    const [lineDelay, setLineDelay] = useState(0.05);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newLineCount = Math.floor(width / lineFactor);
            setLineCount(newLineCount);
            setLineDelay(0.05 * (1920 / width));
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [lineFactor]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const lines = entry.target.querySelectorAll(".line");
                        lines.forEach((line, index) => {
                            (line as HTMLElement).classList.add("animate");
                            (line as HTMLElement).style.animationDelay =
                                `${index * lineDelay + 0.5}s`;
                        });
                    }
                });
            },
            { threshold: 0.5 },
        );

        const currentContainer = containerRef.current;
        if (currentContainer) observer.observe(currentContainer);

        return () => {
            if (currentContainer) observer.unobserve(currentContainer);
        };
    }, [lineCount, lineDelay]);

    return (
        <div className="w-full h-16 flex items-center py-16 md:hidden" ref={containerRef} >
      <span className="w-full mx-4 md:w-4/5 max-w-[1700px] md:mx-auto h-[70px] relative">
        {[...Array(lineCount)].map((_, i) => (
            <div
                key={i}
                className="absolute h-full w-4 line"
                style={{
                    left: `calc(${(i * 100) / lineCount}% + 21px)`,
                    transform: "rotate(35deg) skewY(-35deg)",
                    backgroundColor: color,
                }}

            />
        ))}
      </span>
        </div>
    );
};

export default VintageStripes;

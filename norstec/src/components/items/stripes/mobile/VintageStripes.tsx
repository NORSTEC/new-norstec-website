import { useEffect, useState, useRef } from "react";
import "../globals.css";
import {VintageStripe} from "@/types/items/vintageStripes"



const VintageStripes: React.FC<VintageStripe> = ({ color, lineFactor = 70 }) => {
    const [lineCount, setLineCount] = useState(15);
    const [lineDelay, setLineDelay] = useState(0.05);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newLineCount = Math.floor(width / lineFactor); // Adjust 50 to change the space between lines
            setLineCount(newLineCount);
            setLineDelay(0.05 * (1920 / width)); // Adjust delay based on screen width, smaller delay for larger displays
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, [lineCount, lineDelay]);

    return (
        <div className="w-full h-16 flex items-center" ref={containerRef}>
      <span className="w-full mx-4 md:w-4/5 max-w-[1700px] md:mx-auto h-[70px] relative">
        {[...Array(lineCount)].map((_, i) => (
            <div
                key={i}
                className="absolute h-full w-4 line"
                style={{
                    left: `calc(${(i * 100) / lineCount}% + 21px)`, // Adjust 1.5px to half of the width (3px) to center the lines
                    transform: "rotate(35deg) skewY(-35deg)",
                    opacity: 0,
                    backgroundColor: `var(--${color})`,
                }}
            ></div>
        ))}
      </span>
        </div>
    );
};

export default VintageStripes;

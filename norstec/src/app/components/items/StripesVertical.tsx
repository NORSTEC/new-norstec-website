type StripesVerticalProps = {
    className?: string;
    side?: "left" | "right";
};

const COLORS = ["bg-sky", "bg-beachball", "bg-sun", "bg-copper"];

export default function StripesVertical({
                                            className = "",
                                            side = "left",
                                        }: StripesVerticalProps) {
    return (
        <div
            className={`
                flex gap-[1.5vw] absolute inset-y-0 px-[20px] md:pl-[7vw] 3xl:pl-[15rem]
                -z-10 3xl:gap-[2rem]
                ${side === "left" ? "left-0" : "right-0"}
                ${className}
            `}
        >
            {COLORS.map((color, i) => (
                <span
                    key={i}
                    className={`w-[3vw] 3xl:w-[3rem] h-full ${color}`}
                />
            ))}
        </div>
    );
}
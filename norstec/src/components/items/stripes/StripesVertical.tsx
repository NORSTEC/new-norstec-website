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
                flex absolute inset-y-0 px-[20px] md:pl-[7vw] -z-10 h-full gap-[1rem] lg:gap-[1rem] xl:gap-[1.3rem] 3xl:gap-[2rem] pl-[3rem] lg:pl-[5rem] xl:pl-[7rem] 3xl:pl-[15rem]
                ${side === "left" ? "left-0" : "right-0"}
                ${className}
            `}
        >
            {COLORS.map((color, i) => (
                <span
                    key={i}
                    className={`h-full w-[1.5rem] lg:w-[2rem] xl:w-[2.25rem] 3xl:w-[2.5rem]  ${color}`}
                />
            ))}
        </div>
    );
}
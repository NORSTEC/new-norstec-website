"use client";
import React from "react";

function Line({ className, color }: { className: string; color: string }) {
    return (
        <div
            className={className}
            style={{
                width: "var(--trap-width)",
                height: "300%",
                background: color,
                clipPath:
                    "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
                WebkitClipPath:
                    "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
            }}
        />
    );
}

export default function Chemtrails() {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div
                className="
          relative h-full w-full
          translate-x-[3rem]
          lg:translate-x-[5rem]
          xl:translate-x-[7rem]
          3xl:translate-x-[15rem]
        "
            >
                {/* Lag 1 */}
                <div
                    className="
            absolute inset-0
            [--rot:0deg]
            xl:[--rot:0deg]
            3xl:[--rot:-2deg]
          "
                    style={{
                        transform: "translate(0px, 0px) rotate(var(--rot))",
                        transformOrigin: "top left",
                    }}
                >
                    <Line
                        color="#1697B7"
                        className="
              [--trap-width:260px] [--trap-cut:230px]
              xl:[--trap-width:510px] xl:[--trap-cut:474px]
              3xl:[--trap-width:400px] 3xl:[--trap-cut:364px]
            "
                    />
                </div>

                {/* Lag 2 */}
                <div
                    className="
            absolute inset-0
            [--rot:-13deg]
            xl:[--rot:-11deg]
            3xl:[--rot:-10deg]
          "
                    style={{
                        transform: "translate(3.55rem, 0px) rotate(var(--rot))",
                        transformOrigin: "top left",
                    }}
                >
                    <Line
                        color="#30C3CD"
                        className="
              [--trap-width:220px] [--trap-cut:180px]
              xl:[--trap-width:643px] xl:[--trap-cut:610px]
              3xl:[--trap-width:303px] 3xl:[--trap-cut:270px]
            "
                    />
                </div>

                {/* Lag 3 */}
                <div
                    className="
            absolute inset-0
            [--rot:-26deg]
            xl:[--rot:-25deg]
            3xl:[--rot:-22deg]
          "
                    style={{
                        transform: "translate(7.10rem, 0px) rotate(var(--rot))",
                        transformOrigin: "top left",
                    }}
                >
                    <Line
                        color="#F5B27A"
                        className="
              [--trap-width:240px] [--trap-cut:200px]
              xl:[--trap-width:660px] xl:[--trap-cut:632px]
              3xl:[--trap-width:290px] 3xl:[--trap-cut:260px]
            "
                    />
                </div>

                {/* Lag 4 */}
                <div
                    className="
            absolute inset-0
            [--rot:-39deg]
            xl:[--rot:-40deg]
            3xl:[--rot:-36deg]
          "
                    style={{
                        transform: "translate(10.65rem, 0px) rotate(var(--rot))",
                        transformOrigin: "top left",
                    }}
                >
                    <Line
                        color="#E8834D"
                        className="
              [--trap-width:360px] [--trap-cut:320px]
              xl:[--trap-width:483px] xl:[--trap-cut:460px]
              3xl:[--trap-width:660px] 3xl:[--trap-cut:580px]
            "
                    />
                </div>
            </div>
        </div>
    );
}
